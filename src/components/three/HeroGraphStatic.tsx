import { cn } from "@/lib/utils";
import { buildGraph } from "./graph";

const graph = buildGraph(9);

/** Flat projection of the hero graph. Server-rendered; the fallback when WebGL or motion is off. */
export function HeroGraphStatic({ className }: { className?: string }) {
  const W = 1200;
  const H = 620;
  const px = (x: number) => W / 2 + x * 92;
  const py = (y: number) => H / 2 - y * 92;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("size-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="var(--text)" strokeOpacity="0.16" strokeWidth="1.2">
        {graph.edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={px(graph.nodes[a].x)} y1={py(graph.nodes[a].y)} x2={px(graph.nodes[b].x)} y2={py(graph.nodes[b].y)} />
        ))}
      </g>
      {graph.nodes.map((n, i) => (
        <circle
          key={i}
          cx={px(n.x)}
          cy={py(n.y)}
          r={n.hub ? 7 : 3.5 + (n.z + 1.2) * 0.9}
          fill={n.hub ? "var(--action-bg)" : "var(--text)"}
          fillOpacity={n.hub ? 0.9 : 0.34}
        />
      ))}
    </svg>
  );
}
