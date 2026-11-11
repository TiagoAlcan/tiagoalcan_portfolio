import Image from "next/image";

import { cn } from "@/lib/utils";

const mono = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.06em" } as const;
const INK = "var(--text)";
const ACCENT = "var(--site-accent)";
const LINE = { stroke: INK, strokeOpacity: 0.3, strokeWidth: 1.2, fill: "none" } as const;

/** Covers drawn with the palette, for projects without a screenshot that can be shown. */
const art: Record<string, React.ReactNode> = {
  dashboard: (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${24 + i * 94} 22)`}>
          <rect width="84" height="46" rx="6" {...LINE} />
          <rect x="10" y="11" width="30" height="4" rx="2" fill={INK} opacity="0.3" />
          <rect x="10" y="24" width={[46, 34, 52][i]} height="10" rx="2" fill={i === 0 ? ACCENT : INK} opacity={i === 0 ? 1 : 0.75} />
        </g>
      ))}
      <rect x="24" y="80" width="272" height="98" rx="6" {...LINE} />
      <path d="M36 158 62 150 88 154 114 140 140 144 166 112 192 96 218 124 244 138 270 132 284 136V168H36Z" fill={ACCENT} opacity="0.14" />
      <path d="M36 158 62 150 88 154 114 140 140 144 166 112 192 96 218 124 244 138 270 132 284 136" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="192" cy="96" r="4" fill={ACCENT} />
      <text x="36" y="96" {...mono} fill={INK} opacity="0.6">
        tx/s · 5m
      </text>
    </>
  ),
  document: (
    <>
      <rect x="92" y="34" width="150" height="150" rx="5" fill="var(--surface)" stroke={INK} strokeOpacity="0.2" transform="rotate(4 167 109)" />
      <rect x="78" y="22" width="150" height="160" rx="5" fill="var(--bg)" stroke={INK} strokeOpacity="0.4" strokeWidth="1.2" />
      <rect x="92" y="38" width="70" height="8" rx="2" fill={INK} opacity="0.85" />
      <rect x="92" y="54" width="110" height="3" rx="1.5" fill={INK} opacity="0.3" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(92 ${74 + i * 30})`}>
          <text {...mono} fill={ACCENT} y="8">{`0${i + 1}`}</text>
          <rect x="20" y="1" width={[76, 92, 64][i]} height="5" rx="2" fill={INK} opacity="0.7" />
          <rect x="20" y="12" width="100" height="3" rx="1.5" fill={INK} opacity="0.25" />
        </g>
      ))}
      <path d="M186 162l8 8 16-18" fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  pipeline: (
    <>
      {["build", "test", "deploy"].map((label, i) => (
        <g key={label} transform={`translate(${28 + i * 96} 78)`}>
          <circle cx="36" cy="-22" r="9" fill={i === 2 ? ACCENT : "none"} stroke={i === 2 ? ACCENT : INK} strokeOpacity={i === 2 ? 1 : 0.5} strokeWidth="1.4" />
          <path d="M36-13V0" stroke={INK} strokeOpacity="0.4" strokeDasharray="2 3" />
          <rect width="72" height="50" rx="8" fill="var(--bg)" stroke={INK} strokeOpacity="0.45" strokeWidth="1.2" />
          <text x="36" y="30" textAnchor="middle" {...mono} fontSize="10" fill={INK}>
            {label}
          </text>
          {i < 2 ? <path d="M76 25h16m-5-5 5 5-5 5" fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /> : null}
        </g>
      ))}
      <text x="160" y="164" textAnchor="middle" {...mono} fill={INK} opacity="0.6">
        kubernetes
      </text>
      <path d="M40 150h240" stroke={INK} strokeOpacity="0.25" strokeDasharray="3 4" />
    </>
  ),
  aws: (
    <>
      <circle cx="160" cy="17" r="6" fill="none" stroke={INK} strokeOpacity="0.6" strokeWidth="1.3" />
      <path d="M160 23v8" stroke={INK} strokeOpacity="0.5" />
      <rect x="128" y="31" width="64" height="16" rx="8" fill={ACCENT} />
      <text x="160" y="42" textAnchor="middle" {...mono} fontSize="8" fill="var(--bg)">
        gateway
      </text>
      <rect x="18" y="60" width="284" height="126" rx="8" {...LINE} strokeDasharray="4 4" />
      <text x="28" y="74" {...mono} fontSize="8" fill={INK} opacity="0.65">
        VPC 10.0.0.0/16
      </text>
      <rect x="30" y="84" width="124" height="90" rx="6" fill="var(--bg)" stroke={INK} strokeOpacity="0.45" />
      <rect x="166" y="84" width="124" height="90" rx="6" fill="var(--bg)" stroke={INK} strokeOpacity="0.45" />
      <text x="40" y="98" {...mono} fontSize="7.5" fill={INK} opacity="0.65">
        public subnet
      </text>
      <text x="176" y="98" {...mono} fontSize="7.5" fill={INK} opacity="0.65">
        private subnet
      </text>
      <rect x="66" y="112" width="52" height="38" rx="5" fill={INK} opacity="0.88" />
      <text x="92" y="135" textAnchor="middle" {...mono} fill="var(--bg)">
        EC2
      </text>
      <rect x="202" y="112" width="52" height="38" rx="5" fill="none" stroke={ACCENT} strokeWidth="2" />
      <text x="228" y="135" textAnchor="middle" {...mono} fill={INK}>
        RDS
      </text>
      <path d="M160 47v20H92v41" fill="none" stroke={INK} strokeOpacity="0.5" />
      <path d="M118 131h80m-5-5 5 5-5 5" fill="none" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="160" y="164" textAnchor="middle" {...mono} fontSize="7.5" fill={INK} opacity="0.65">
        :5432
      </text>
    </>
  ),
  graph: (
    <>
      <g stroke={INK} strokeOpacity="0.35" strokeWidth="1.3">
        <path d="M160 100 78 52M160 100 248 60M160 100 92 154M160 100 236 150M78 52 40 104M248 60 290 112M92 154 40 104M236 150 290 112M78 52 160 28M248 60 160 28" fill="none" />
      </g>
      <g stroke={ACCENT} strokeWidth="2.6">
        <path d="M160 100 78 52M160 100 236 150" />
      </g>
      {[
        [78, 52],
        [248, 60],
        [92, 154],
        [236, 150],
        [40, 104],
        [290, 112],
        [160, 28],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="8" fill="var(--bg)" stroke={INK} strokeOpacity="0.6" strokeWidth="1.4" />
      ))}
      <circle cx="160" cy="100" r="15" fill={ACCENT} />
      <text x="112" y="68" {...mono} fill={INK}>
        0.62
      </text>
      <text x="206" y="134" {...mono} fill={INK}>
        0.31
      </text>
    </>
  ),
  bdd: (
    <>
      <rect x="30" y="26" width="260" height="148" rx="8" fill="var(--bg)" stroke={INK} strokeOpacity="0.4" strokeWidth="1.2" />
      {(
        [
          ["Given", 150],
          ["When", 170],
          ["Then", 120],
        ] as const
      ).map(([kw, w], i) => (
        <g key={kw} transform={`translate(48 ${58 + i * 38})`}>
          <text {...mono} fontSize="11" fontWeight="700" fill={ACCENT} y="8">
            {kw}
          </text>
          <rect x="52" y="1" width={w} height="6" rx="3" fill={INK} opacity="0.7" />
          <rect x="52" y="14" width={w - 40} height="3" rx="1.5" fill={INK} opacity="0.25" />
        </g>
      ))}
      <path d="M252 140l7 7 14-16" fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  load: (
    <>
      <rect x="24" y="26" width="176" height="148" rx="6" {...LINE} />
      {[18, 30, 44, 60, 78, 96].map((h, i) => (
        <rect key={i} x={38 + i * 26} y={160 - h} width="16" height={h} rx="2" fill={INK} opacity="0.55" />
      ))}
      <path d="M46 132 72 128 98 122 124 110 150 84 176 46" fill="none" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="176" cy="46" r="4" fill={ACCENT} />
      <text x="36" y="42" {...mono} fill={INK} opacity="0.6">
        p95 · users
      </text>
      <rect x="214" y="48" width="84" height="104" rx="6" fill="var(--bg)" stroke={INK} strokeOpacity="0.45" strokeWidth="1.2" />
      {["8 GB", "4 cores", "200 GB"].map((label, i) => (
        <g key={label} transform={`translate(226 ${72 + i * 30})`}>
          <circle cx="4" cy="-3" r="3.5" fill={i === 0 ? ACCENT : INK} opacity={i === 0 ? 1 : 0.6} />
          <text x="14" y="0" {...mono} fill={INK}>
            {label}
          </text>
        </g>
      ))}
    </>
  ),
  registry: (
    <>
      <circle cx="46" cy="100" r="10" fill="none" stroke={INK} strokeOpacity="0.6" strokeWidth="1.6" />
      <path d="M18 100h18m20 0h22m-5-5 5 5-5 5" fill="none" stroke={INK} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="46" y="128" textAnchor="middle" {...mono} fill={INK} opacity="0.65">
        commit
      </text>
      <rect x="86" y="72" width="88" height="56" rx="8" fill={ACCENT} />
      <text x="130" y="97" textAnchor="middle" {...mono} fill="var(--bg)">
        image
      </text>
      <text x="130" y="113" textAnchor="middle" {...mono} fontSize="10" fontWeight="700" fill="var(--bg)">
        :1.4.2
      </text>
      {["dev", "staging", "prod"].map((label, i) => (
        <g key={label}>
          <path d={`M174 100C200 100 200 ${48 + i * 52} 224 ${48 + i * 52}`} fill="none" stroke={INK} strokeOpacity="0.45" strokeWidth="1.3" />
          <rect x="224" y={32 + i * 52} width="72" height="32" rx="6" fill="var(--bg)" stroke={INK} strokeOpacity="0.45" strokeWidth="1.2" />
          <text x="260" y={52 + i * 52} textAnchor="middle" {...mono} fill={INK}>
            {label}
          </text>
        </g>
      ))}
    </>
  ),
  chart: (
    <>
      {["raw", "processed", "curated"].map((label, i) => (
        <g key={label} transform={`translate(26 ${36 + i * 46})`}>
          <rect width="104" height="34" rx="6" fill={i === 2 ? ACCENT : "var(--bg)"} stroke={i === 2 ? ACCENT : INK} strokeOpacity={i === 2 ? 1 : 0.45} strokeWidth="1.2" />
          <text x="52" y="21" textAnchor="middle" {...mono} fill={i === 2 ? "var(--bg)" : INK}>
            {label}
          </text>
          {i < 2 ? <path d="M52 36v8" stroke={INK} strokeOpacity="0.5" strokeWidth="1.4" /> : null}
        </g>
      ))}
      <path d="M134 145h34m-5-5 5 5-5 5" fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="178" y="36" width="118" height="126" rx="6" {...LINE} />
      {[40, 66, 52, 88, 72].map((h, i) => (
        <rect key={i} x={190 + i * 20} y={150 - h} width="12" height={h} rx="2" fill={i === 3 ? ACCENT : INK} opacity={i === 3 ? 1 : 0.6} />
      ))}
    </>
  ),
};

/** A project's cover: a real capture when there is one, a drawn one otherwise. */
export function ProjectCover({
  cover,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 560px, 92vw",
}: {
  cover: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (cover.startsWith("art:")) {
    const motif = art[cover.slice(4)] ?? art.dashboard;
    return (
      <div className={cn("dot-grid aspect-[16/10] w-full bg-surface", className)}>
        <svg viewBox="0 0 320 200" className="size-full" role="img" aria-label={alt}>
          {motif}
        </svg>
      </div>
    );
  }
  return (
    <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-surface", className)}>
      <Image src={cover} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}
