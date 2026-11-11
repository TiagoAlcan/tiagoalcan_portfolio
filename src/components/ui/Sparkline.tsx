import { cn } from "@/lib/utils";

/** A single-stroke time series without axes. Decorative: the value it illustrates is always in text nearby. */
export function Sparkline({
  data,
  className,
  width = 240,
  height = 56,
}: {
  data: readonly number[];
  className?: string;
  width?: number;
  height?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pad = 4;
  const step = (width - pad * 2) / (data.length - 1);
  const points = data.map((v, i) => [pad + i * step, pad + (1 - (v - min) / span) * (height - pad * 2)] as const);
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
  const area = `${line}L${width - pad} ${height}L${pad} ${height}Z`;
  const peak = points[data.indexOf(max)];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("block w-full", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={area} fill="var(--site-accent)" opacity="0.12" />
      <path d={line} fill="none" stroke="var(--site-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <circle cx={peak[0]} cy={peak[1]} r="3" fill="var(--site-accent)" />
    </svg>
  );
}
