"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";

import { TRACKS } from "@/lib/content/schema";
import { buildGraph } from "./graph";
import { highlightStore } from "./highlight-store";
import type { Tier } from "./pickTier";

type Palette = { node: THREE.Color; accent: THREE.Color; edge: THREE.Color };

/** The canvas reads the same tokens as the rest of the site, so a theme change repaints the graph. */
function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => new THREE.Color(cs.getPropertyValue(name).trim() || fallback);
  return { node: read("--text", "#04261e"), accent: read("--action-bg", "#f26716"), edge: read("--text", "#04261e") };
}

function Scene({ tier, themeKey, onSlow }: { tier: Exclude<Tier, "static">; themeKey: string; onSlow: () => void }) {
  const high = tier === "high";
  const graph = useMemo(() => buildGraph(high ? 9 : 5), [high]);
  const particleCount = high ? 46 : 16;
  const highlighted = useSyncExternalStore(highlightStore.subscribe, highlightStore.get, () => null);

  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const edgeMaterial = useRef<THREE.LineBasicMaterial>(null);
  const palette = useMemo(() => readPalette(), [themeKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const edgeGeometry = useMemo(() => {
    const positions = new Float32Array(graph.edges.length * 6);
    graph.edges.forEach(([a, b], i) => {
      const na = graph.nodes[a];
      const nb = graph.nodes[b];
      positions.set([na.x, na.y, na.z, nb.x, nb.y, nb.z], i * 6);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [graph]);

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        edge: (i * 7) % graph.edges.length,
        t: ((i * 37) % 100) / 100,
        speed: 0.18 + ((i * 13) % 10) / 40,
        forward: i % 3 !== 0,
      })),
    [graph, particleCount],
  );

  const scales = useRef<Float32Array>(new Float32Array(0));
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmp = useMemo(() => new THREE.Color(), []);
  const pointer = useThree((s) => s.pointer);
  const frames = useRef({ count: 0, total: 0, checked: false, skip: false });

  useEffect(() => {
    scales.current = new Float32Array(graph.nodes.length).fill(1);
  }, [graph]);

  useEffect(() => () => edgeGeometry.dispose(), [edgeGeometry]);

  useFrame((_, delta) => {
    // Frame-drop detection: if the first second and a half is slow, fall back to the static graph.
    const f = frames.current;
    if (!f.checked) {
      f.count += 1;
      f.total += delta;
      if (f.count === 90) {
        f.checked = true;
        if (f.total / f.count > 0.045) onSlow();
      }
    }
    // The low tier animates at half rate.
    if (!high) {
      f.skip = !f.skip;
      if (f.skip) return;
      delta *= 2;
    }
    const dt = Math.min(delta, 0.05);

    if (group.current) {
      const targetY = high ? pointer.x * 0.16 : 0;
      const targetX = high ? -pointer.y * 0.1 : 0;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
      group.current.rotation.z = Math.sin(performance.now() / 9000) * 0.03;
    }

    const mesh = nodesRef.current;
    if (mesh && scales.current.length === graph.nodes.length) {
      graph.nodes.forEach((n, i) => {
        const lit = highlighted !== null && n.track === highlighted;
        const dim = highlighted !== null && !lit;
        const target = (n.hub ? 1.9 : 1) * (lit ? 1.55 : dim ? 0.8 : 1);
        scales.current[i] += (target - scales.current[i]) * Math.min(1, dt * 8);
        dummy.position.set(n.x, n.y, n.z);
        dummy.scale.setScalar(scales.current[i]);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        tmp.copy(lit || (n.hub && highlighted === null) ? palette.accent : palette.node);
        if (dim) tmp.lerp(palette.edge, 0).multiplyScalar(1);
        mesh.setColorAt(i, tmp);
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    const pm = particlesRef.current;
    if (pm) {
      particles.forEach((p, i) => {
        p.t += p.speed * dt;
        if (p.t > 1) {
          p.t = 0;
          p.edge = (p.edge + 3 + i) % graph.edges.length;
        }
        const [a, b] = graph.edges[p.edge];
        const from = graph.nodes[p.forward ? a : b];
        const to = graph.nodes[p.forward ? b : a];
        dummy.position.set(from.x + (to.x - from.x) * p.t, from.y + (to.y - from.y) * p.t, from.z + (to.z - from.z) * p.t);
        const fade = Math.sin(p.t * Math.PI);
        dummy.scale.setScalar(0.35 + fade * 0.75);
        dummy.updateMatrix();
        pm.setMatrixAt(i, dummy.matrix);
      });
      pm.instanceMatrix.needsUpdate = true;
    }

    if (edgeMaterial.current) {
      const target = highlighted ? 0.1 : 0.2;
      edgeMaterial.current.opacity += (target - edgeMaterial.current.opacity) * 0.1;
    }
  });

  // Keep TRACKS referenced so region order stays tied to the content model.
  void TRACKS;

  return (
    <group ref={group}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial ref={edgeMaterial} color={palette.edge} transparent opacity={0.2} depthWrite={false} />
      </lineSegments>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, graph.nodes.length]} key={`n-${graph.nodes.length}`}>
        <sphereGeometry args={[0.085, high ? 16 : 8, high ? 16 : 8]} />
        <meshBasicMaterial transparent opacity={0.9} />
      </instancedMesh>
      <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]} key={`p-${particleCount}`}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={palette.accent} />
      </instancedMesh>
    </group>
  );
}

export default function HeroGraphCanvas({
  tier,
  active,
  themeKey,
  onSlow,
}: {
  tier: Exclude<Tier, "static">;
  active: boolean;
  themeKey: string;
  onSlow: () => void;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={tier === "high" ? [1, 2] : 1}
      gl={{ antialias: tier === "high", alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 9.5], fov: 44 }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.documentElement : undefined}
      eventPrefix="client"
    >
      <Scene tier={tier} themeKey={themeKey} onSlow={onSlow} />
    </Canvas>
  );
}
