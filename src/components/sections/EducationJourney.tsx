import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import {
  bootcampModules,
  coursesByTrack,
  education,
  learned,
  postgradPhases,
} from "@content/education";
import { tracks } from "@content/site";
import { TRACKS } from "@/lib/content/schema";
import { EducationExplorer, type EducationProgram } from "./EducationExplorer";

/** Builds the three programs in the page language and hands them to the interactive explorer. */
export async function EducationJourney({
  locale,
  cardClassName,
}: {
  locale: Locale;
  cardClassName?: string;
}) {
  const t = await getTranslations("education");
  const a11y = await getTranslations("a11y");
  const project = await getTranslations("project");

  const curriculum: Record<string, EducationProgram["curriculum"]> = {
    postgrad: {
      ordered: true,
      groups: [
        { items: postgradPhases.map((p) => ({ title: p.theme[locale] })) },
      ],
    },
    bootcamp: {
      ordered: true,
      groups: [
        {
          items: bootcampModules.map((m) => ({
            title: m.title[locale],
            note: `${t("weeks", { count: m.weeks })} · ${m.topics[locale]}`,
          })),
        },
      ],
    },
    bsc: {
      ordered: false,
      groups: TRACKS.map((track) => ({
        label: tracks[track].label[locale],
        items: coursesByTrack[track].map((title) => ({ title })),
      })),
    },
  };

  const programs: EducationProgram[] = education.map((entry) => ({
    id: entry.id,
    school: entry.school,
    title: entry.title[locale],
    period: entry.period[locale],
    detail: entry.detail[locale],
    inProgress: entry.inProgress,
    link: entry.link
      ? { label: entry.link.label[locale], href: entry.link.href }
      : undefined,
    curriculum: curriculum[entry.id],
    learned: learned[entry.id][locale],
  }));

  return (
    <EducationExplorer
      programs={programs}
      cardClassName={cardClassName}
      labels={{
        open: t("open"),
        close: t("close"),
        curriculum: t("curriculum"),
        learned: t("learned"),
        external: a11y("external"),
        inProgress: project("status.in-progress"),
        stampInProgress: project("stampInProgress"),
      }}
    />
  );
}
