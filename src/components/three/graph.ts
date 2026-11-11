import { TRACKS, type Track } from "@/lib/content/schema";

export type GraphNode = { x: number; y: number; z: number; track: Track; hub: boolean };
export type Graph = { nodes: GraphNode[]; edges: [number, number][] };

/** Small deterministic PRNG so server SVG and client canvas draw the same graph. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CENTERS: Record<Track, [number, number, number]> = {
  software: [-3.4, 1.5, 0.2],
  devops: [3.3, 1.7, -0.4],
  data: [-2.9, -1.7, 0.5],
  ai: [3.5, -1.5, 0.1],
};

const dist = (a: GraphNode, b: GraphNode) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

/**
 * A service graph in four regions, one per track. `perCluster` scales the
 * detail: the canvas uses more nodes on desktop than on phones.
 */
export function buildGraph(perCluster = 9, seed = 2023): Graph {
  const rand = mulberry32(seed);
  const nodes: GraphNode[] = [];
  const edges: [number, number][] = [];
  const key = new Set<string>();
  const link = (a: number, b: number) => {
    if (a === b) return;
    const k = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (key.has(k)) return;
    key.add(k);
    edges.push([a, b]);
  };

  const hubs: number[] = [];
  for (const track of TRACKS) {
    const [cx, cy, cz] = CENTERS[track];
    const start = nodes.length;
    hubs.push(start);
    nodes.push({ x: cx, y: cy, z: cz, track, hub: true });
    for (let i = 1; i < perCluster; i++) {
      const angle = (i / (perCluster - 1)) * Math.PI * 2 + rand() * 0.7;
      const radius = 0.9 + rand() * 1.25;
      nodes.push({
        x: cx + Math.cos(angle) * radius * 1.15,
        y: cy + Math.sin(angle) * radius * 0.8,
        z: cz + (rand() - 0.5) * 2.2,
        track,
        hub: false,
      });
    }
    // Each node talks to its nearest neighbour and, sometimes, to the hub.
    for (let i = start + 1; i < nodes.length; i++) {
      let best = start;
      let bestD = Infinity;
      for (let j = start; j < nodes.length; j++) {
        if (j === i) continue;
        const d = dist(nodes[i], nodes[j]);
        if (d < bestD) {
          bestD = d;
          best = j;
        }
      }
      link(i, best);
      if (rand() > 0.45) link(i, start);
    }
  }

  // Regions are connected through their hubs: requests cross the whole system.
  link(hubs[0], hubs[1]);
  link(hubs[0], hubs[2]);
  link(hubs[1], hubs[3]);
  link(hubs[2], hubs[3]);
  link(hubs[0], hubs[3]);

  return { nodes, edges };
}
