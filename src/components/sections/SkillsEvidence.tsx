import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getProjects } from "@/lib/content/repository";
import { cn } from "@/lib/utils";
import { skills, type SkillLevel } from "@content/skills";

const levelStyle: Record<SkillLevel, string> = {
  work: "bg-action text-on-action",
  both: "bg-accent2 text-page",
  project: "border border-fg/40 text-fg",
};

/** Each skill with where it was used: the job, a published case, or both. */
export async function SkillsEvidence({ locale, featuredOnly = false }: { locale: Locale; featuredOnly?: boolean }) {
  const t = await getTranslations("skills");
  const projects = await getProjects(locale);
  const titleOf = new Map(projects.map((p) => [p.slug, p.title]));
  const list = featuredOnly ? skills.filter((s) => s.featured) : skills;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((skill) => (
        <li key={skill.name} className="flex flex-col rounded-(--radius-card) border border-edge bg-page p-5" data-reveal>
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <h3 className="font-display text-[1.25rem] leading-tight font-medium text-heading">{skill.name}</h3>
            <span className={cn("rounded-full px-2.5 py-0.5 font-mono text-[0.7rem] leading-5 whitespace-nowrap", levelStyle[skill.level])}>
              {t(`level.${skill.level}`)}
            </span>
          </div>
          <p className="mt-2 text-[0.95rem] text-fg-muted">{skill.what[locale]}</p>
          <p className="mt-auto pt-4 text-[0.9rem]">
            <span className="font-mono text-[0.75rem] text-fg-muted">{t("evidence")} </span>
            {skill.evidence.map((ev, i) => (
              <span key={ev}>
                {i ? ", " : null}
                {ev === "experience" ? (
                  <Link href="/experience" className="font-medium underline decoration-brand decoration-2 underline-offset-[0.2em] hover:decoration-fg">
                    THCS
                  </Link>
                ) : (
                  <Link
                    href={{ pathname: "/projects/[slug]", params: { slug: ev } }}
                    className="font-medium underline decoration-brand decoration-2 underline-offset-[0.2em] hover:decoration-fg"
                  >
                    {titleOf.get(ev) ?? ev}
                  </Link>
                )}
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}
