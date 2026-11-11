import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Highlight } from "@/components/ui/highlight";
import { MonoLabel } from "@/components/ui/primitives";
import { Sparkline } from "@/components/ui/Sparkline";
import { Squiggle } from "@/components/ui/squiggle";
import { Tape } from "@/components/ui/tape";
import { illustrativeSeries } from "@content/site";

/**
 * Compound components for case studies. The author picks which acts to use
 * and in what order inside the MDX; structure and semantics come ready.
 * docs/03-design-patterns.md, pattern 4.
 */

async function Act({ id, index, children }: { id: "context" | "process" | "result"; index: string; children: ReactNode }) {
  const t = await getTranslations("project");
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-10 md:py-14" data-reveal>
      {id !== "context" ? <Squiggle tone="marker" className="mb-10 w-28 text-brand md:mb-14" /> : null}
      <MonoLabel index={index}>{t(id)}</MonoLabel>
      <h2 id={`${id}-title`} className="mt-2 text-h2 text-heading">
        {t(`${id}Title`)}
      </h2>
      <div className="prose-case mt-6 text-body-lg">{children}</div>
    </section>
  );
}

const Context = ({ children }: { children: ReactNode }) => (
  <Act id="context" index="01">
    {children}
  </Act>
);

const Process = ({ children }: { children: ReactNode }) => (
  <Act id="process" index="02">
    {children}
  </Act>
);

const Result = ({ children }: { children: ReactNode }) => (
  <Act id="result" index="03">
    {children}
  </Act>
);

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 border-l-2 border-edge pl-5 first:mt-0">
      <h3 className="text-h3 text-heading">{title}</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export const CaseStudy = { Context, Process, Result, Step };

/** Highlighter swipe for one key phrase per section. */
export function Mark({ children }: { children: ReactNode }) {
  return (
    <Highlight tone="orange" animate>
      {children}
    </Highlight>
  );
}

export function Metrics({ children }: { children: ReactNode }) {
  return <div className="not-prose my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

/** A dashboard-style panel: title, value, an optional series. */
export async function MetricPanel({ label, value, hint, series = false }: { label: string; value: string; hint?: string; series?: boolean }) {
  const t = await getTranslations("project");
  return (
    <figure className="flex flex-col rounded-(--radius-card) border border-edge bg-surface p-5">
      <figcaption className="mono-label text-fg-muted">{label}</figcaption>
      <p className="mt-3 font-display text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-none font-medium text-heading">{value}</p>
      {hint ? <p className="mt-2 text-[0.9rem] leading-snug text-fg-muted">{hint}</p> : null}
      {series ? (
        <div className="mt-auto pt-4">
          <Sparkline data={illustrativeSeries} className="h-12" />
          <p className="mt-1 font-mono text-[0.68rem] text-fg-muted">{t("illustrative")}</p>
        </div>
      ) : null}
    </figure>
  );
}

/** Terminal window frame for commands, queries and file listings. */
export function Terminal({ title, lines }: { title: string; lines: string[] }) {
  return (
    <figure className="my-8 max-w-[68ch] overflow-hidden rounded-(--radius-card) bg-(--deep) text-(--cream)">
      <figcaption className="flex items-center gap-2 border-b border-(--cream)/15 px-4 py-2.5 font-mono text-[0.75rem] text-(--cream)/70">
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="size-2.5 rounded-full bg-(--cream)/25" />
          <i className="size-2.5 rounded-full bg-(--cream)/25" />
          <i className="size-2.5 rounded-full bg-(--orange)" />
        </span>
        {title}
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[0.82rem] leading-relaxed">
        <code className="border-0 bg-transparent p-0 text-inherit">
          {lines.map((line, i) => (
            <span key={i} className={line.trimStart().startsWith("#") ? "block text-(--cream)/55" : "block"}>
              {line || " "}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

/** A screen capture, taped to the page like a print on a wall. */
export function Shot({ src, alt, caption, width, height }: { src: string; alt: string; caption?: string; width: number; height: number }) {
  return (
    <figure className="relative my-10 max-w-3xl">
      <Tape aria-hidden="true" length={96} angle={-4} seed={src} className="absolute -top-3 left-10 z-10" />
      <div className="overflow-hidden rounded-[12px] border border-edge bg-page p-2 shadow-[0_18px_40px_-28px_rgb(0_0_0/0.7)]">
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 800px) 768px, 92vw" className="h-auto w-full rounded-[8px]" />
      </div>
      {caption ? <figcaption className="mt-3 font-hand text-[1.25rem] text-fg-muted">{caption}</figcaption> : null}
    </figure>
  );
}

export const mdxComponents = { CaseStudy, Mark, Metrics, MetricPanel, Terminal, Shot };
