"use client";

import { useTranslations } from "next-intl";

import { ArrowRight, trackIcons } from "@/components/ui/icons";
import { Tag } from "@/components/ui/primitives";
import { Stamp } from "@/components/ui/stamp";
import { Tape } from "@/components/ui/tape";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/content/schema";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";

export type TrackLabels = Record<Project["tracks"][number], string>;

/** The whole card is one link target. */
export function ProjectCard({ project, trackLabels, index = 0, priority = false }: { project: Project; trackLabels: TrackLabels; index?: number; priority?: boolean }) {
  const t = useTranslations("project");
  const tilt = index % 2 === 0 ? "-rotate-[0.6deg]" : "rotate-[0.5deg]";

  return (
    <article className="group relative h-full">
      <Link
        href={{ pathname: "/projects/[slug]", params: { slug: project.slug } }}
        className="flex h-full flex-col rounded-(--radius-card) border border-edge bg-surface p-4 transition-[transform,border-color] duration-300 ease-(--ease-out-soft) hover:-translate-y-1 hover:border-fg/40 md:p-5"
      >
        <div className={cn("relative mb-5 transition-transform duration-300 ease-(--ease-out-soft) group-hover:rotate-0", tilt)}>
          <Tape aria-hidden="true" length={84} angle={index % 2 === 0 ? -5 : 4} seed={project.slug} className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2" />
          <div className="overflow-hidden rounded-[10px] border border-edge bg-page p-1.5 shadow-[0_10px_24px_-18px_rgb(0_0_0/0.6)]">
            <ProjectCover cover={project.cover} alt={project.coverAlt} priority={priority} className="rounded-[6px]" />
          </div>
          {project.status === "in-progress" ? (
            <Stamp text={t("stampInProgress")} label={t("status.in-progress")} tilt={-8} className="absolute -right-2 -bottom-4 h-auto w-32 text-brand" />
          ) : null}
        </div>

        <h3 className="text-h3 text-heading">{project.title}</h3>
        <p className="mt-2 text-fg-muted">{project.outcome}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {project.tracks.map((track) => {
            const Icon = trackIcons[track];
            return (
              <Tag key={track}>
                <Icon />
                {trackLabels[track]}
              </Tag>
            );
          })}
          {project.status === "in-progress" ? <Tag>{t("status.in-progress")}</Tag> : null}
          <span className="ml-auto inline-flex items-center gap-1 text-[0.9rem] font-semibold text-fg">
            <span className="sr-only sm:not-sr-only">{t("read")}</span>
            <ArrowRight className="transition-transform duration-300 ease-(--ease-out-soft) group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
