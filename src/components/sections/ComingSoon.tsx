import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** A terminal window. Lines starting with "$ " are commands; the rest is output. */
export function Terminal({ title, lines, className }: { title: string; lines: string[]; className?: string }) {
  return (
    <figure className={cn("overflow-hidden rounded-(--radius-card) border border-(--cream)/15 bg-(--deep) text-(--cream) shadow-[0_18px_40px_-24px_rgb(0_0_0/0.6)]", className)}>
      <figcaption className="flex items-center gap-2 border-b border-(--cream)/15 px-4 py-2.5 font-mono text-[0.75rem] text-(--cream)/70">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-(--red)" />
          <span className="size-2.5 rounded-full bg-(--orange)" />
          <span className="size-2.5 rounded-full bg-(--cobalt-soft)" />
        </span>
        {title}
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[0.82rem] leading-relaxed whitespace-pre-wrap sm:p-5 sm:text-[0.9rem]">
        {lines.map((line, i) =>
          line.startsWith("$ ") ? (
            <span key={i} className="block">
              <span className="text-(--orange)">$</span>
              {line.slice(1)}
            </span>
          ) : (
            <span key={i} className="block text-(--cream)/75">
              {line || " "}
            </span>
          ),
        )}
        <span aria-hidden="true" className="logo-cursor inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-(--orange)" />
      </pre>
    </figure>
  );
}

/** A dashboard panel with nothing to show yet: a flat line at zero and the query behind it. */
export function NoDataPanel({ metric, range, empty, query, note }: { metric: string; range: string; empty: string; query: string; note: string }) {
  return (
    <figure className="rounded-(--radius-card) border border-edge bg-page p-5 sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[0.78rem] text-fg-muted">
        <span className="text-fg">{metric}</span>
        <span>{range}</span>
      </figcaption>
      <div className="relative mt-4">
        <svg viewBox="0 0 400 140" className="h-36 w-full" role="img" aria-label={empty} preserveAspectRatio="none">
          {[20, 50, 80, 110].map((y) => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="var(--site-border)" strokeDasharray="3 5" />
          ))}
          <line x1="0" x2="400" y1="128" y2="128" stroke="var(--accent-2)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="absolute inset-0 flex items-center justify-center font-display text-[1.6rem] text-heading">{empty}</p>
      </div>
      <p className="mt-3 font-mono text-[0.78rem] break-words text-fg-muted">
        <span className="text-accent2">{query}</span> · {note}
      </p>
    </figure>
  );
}

export function AlertCard({ state, name, rows }: { state: string; name: string; rows: [string, ReactNode][] }) {
  return (
    <div className="rounded-(--radius-card) border border-edge bg-page p-5 sm:p-6">
      <p className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-action px-3 py-1 font-mono text-[0.72rem] font-semibold text-on-action">
          <span aria-hidden="true" className="status-pulse size-2 rounded-full bg-on-action" />
          {state}
        </span>
        <span className="font-mono text-[0.95rem] font-semibold text-fg">{name}</span>
      </p>
      <dl className="mt-4 grid gap-2 font-mono text-[0.82rem]">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-2">
            <dt className="text-fg-muted">{k}</dt>
            <dd className="text-fg">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
