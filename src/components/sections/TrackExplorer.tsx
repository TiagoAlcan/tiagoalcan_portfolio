"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { trackIcons } from "@/components/ui/icons";
import { highlightStore } from "@/components/three/highlight-store";
import { TRACKS, isTrack, type Project, type Track } from "@/lib/content/schema";
import type { TrackCopy } from "@/lib/content/tracks";
import { cn } from "@/lib/utils";
import { ProjectCard, type TrackLabels } from "./ProjectCard";


type ViewProps = {
  projects: Project[];
  copy: TrackCopy;
  active: Track | null;
  onSelect?: (track: Track | null) => void;
  columns?: 2 | 3;
};

/**
 * Four round toggle buttons plus the filtered grid. Rendered on the server as
 * the unfiltered list (the Suspense fallback), and again on the client once
 * the URL can be read. Without JavaScript every project is simply listed.
 */
export function TrackExplorerView({ projects, copy, active, onSelect, columns = 2 }: ViewProps) {
  const t = useTranslations("tracks");
  const param = t("param");
  const visible = active ? projects.filter((p) => p.tracks.includes(active)) : projects;
  const labels = Object.fromEntries(TRACKS.map((k) => [k, copy[k].label])) as TrackLabels;

  const select = (track: Track | null) => (event: React.MouseEvent) => {
    if (!onSelect) return;
    event.preventDefault();
    onSelect(track);
  };

  return (
    <div>
      <div role="group" aria-label={t("legend")} className="flex items-start justify-between gap-x-2 sm:justify-start sm:gap-x-8">
        {TRACKS.map((track) => {
          const Icon = trackIcons[track];
          const pressed = active === track;
          return (
            <a
              key={track}
              href={pressed ? "?" : `?${param}=${track}`}
              role="button"
              aria-pressed={pressed}
              onClick={select(pressed ? null : track)}
              onMouseEnter={() => highlightStore.set(track)}
              onMouseLeave={() => highlightStore.set(active)}
              onFocus={() => highlightStore.set(track)}
              onBlur={() => highlightStore.set(active)}
              className="group/track flex w-[4.6rem] flex-col items-center gap-2 text-center sm:w-24"
            >
              <span
                className={cn(
                  "flex size-16 items-center justify-center rounded-full border text-[1.5rem] transition-[background-color,border-color,transform,color] duration-200 ease-(--ease-out-soft) group-hover/track:-translate-y-0.5 sm:size-[4.5rem]",
                  pressed ? "border-action bg-action text-on-action" : "border-accent2/45 bg-tint text-accent2 group-hover/track:border-accent2",
                )}
              >
                <Icon />
              </span>
              <span className={cn("text-[0.85rem] leading-tight font-medium", pressed ? "text-fg" : "text-fg-muted")}>{copy[track].label}</span>
            </a>
          );
        })}
      </div>

      <div className="mt-6 min-h-[4.5rem]" aria-live="polite">
        <p className="measure text-body-lg text-fg">{active ? copy[active].tagline : t("allTagline")}</p>
        <p className="mt-1 font-mono text-[0.8rem] text-fg-muted">
          {active ? t("showing", { count: visible.length, track: copy[active].label }) : t("showingAll", { count: visible.length })}
        </p>
      </div>

      <ul className={cn("mt-8 grid gap-6 md:grid-cols-2", columns === 3 && "xl:grid-cols-3")}>
        {visible.map((project, i) => (
          <li key={project.slug}>
            <ProjectCard project={project} trackLabels={labels} index={i} priority={i < 2} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Reads the filter from the URL, so a filtered view can be shared and survives a reload. */
export function TrackExplorer(props: Omit<ViewProps, "active" | "onSelect">) {
  const t = useTranslations("tracks");
  const param = t("param");
  const searchParams = useSearchParams();
  const raw = searchParams.get(param);
  const active = isTrack(raw) ? raw : null;

  const onSelect = useCallback(
    (track: Track | null) => {
      const next = new URLSearchParams(window.location.search);
      if (track) next.set(param, track);
      else next.delete(param);
      const query = next.toString();
      window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
      highlightStore.set(track);
    },
    [param],
  );

  return <TrackExplorerView {...props} active={active} onSelect={onSelect} />;
}
