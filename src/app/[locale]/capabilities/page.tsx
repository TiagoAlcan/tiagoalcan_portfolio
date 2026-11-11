import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageIntro } from "@/components/sections/PageIntro";
import { SkillsEvidence } from "@/components/sections/SkillsEvidence";
import { ArrowRight, trackIcons } from "@/components/ui/icons";
import { buttonStyles, MonoLabel, Section, Tag } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getProjects } from "@/lib/content/repository";
import { alternatesFor } from "@/lib/seo/metadata";
import { capabilities } from "@content/capabilities";
import { tracks } from "@content/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "capabilities" });
  return { title: t("title"), description: t("metaDescription"), alternates: alternatesFor("/capabilities", locale as Locale) };
}

export default async function CapabilitiesPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("capabilities");
  const s = await getTranslations("skills");
  const projects = await getProjects(locale);
  const titleOf = new Map(projects.map((p) => [p.slug, p.title]));

  return (
    <>
      <PageIntro label={t("label")} title={t("title")} lead={t("lead")} />

      <Section>
        <div className="shell grid gap-6 lg:grid-cols-2">
          {capabilities.map((cap) => {
            const Icon = trackIcons[cap.track];
            return (
              <article key={cap.track} className="flex flex-col rounded-(--radius-card) border border-edge bg-surface p-6 md:p-8" data-reveal>
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-fg/35 bg-page text-[1.3rem] text-fg">
                    <Icon />
                  </span>
                  <h2 className="text-h3 text-heading">{tracks[cap.track].label[locale]}</h2>
                </div>
                <h3 className="mt-6 font-mono text-[0.78rem] text-fg-muted">{t("problem")}</h3>
                <p className="mt-1.5">{cap.problem[locale]}</p>
                <h3 className="mt-6 font-mono text-[0.78rem] text-fg-muted">{t("builds")}</h3>
                <ul className="mt-2 grid gap-2">
                  {cap.builds[locale].map((item) => (
                    <li key={item} className="grid grid-cols-[1.25rem_1fr]">
                      <span aria-hidden="true" className="font-mono text-brand">
                        →
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {cap.stack.map((item) => (
                    <li key={item}>
                      <Tag className="bg-page">{item}</Tag>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6">
                  <Link href={{ pathname: "/projects/[slug]", params: { slug: cap.example } }} className={buttonStyles.text}>
                    {t("example", { title: titleOf.get(cap.example) ?? cap.example })}
                    <ArrowRight className="shrink-0" />
                  </Link>
                </p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="skills" aria-labelledby="skills-title" className="surface-alt scroll-mt-20">
        <div className="shell">
          <MonoLabel>{s("label")}</MonoLabel>
          <h2 id="skills-title" className="mt-3 text-h2 text-heading">
            {s("title")}
          </h2>
          <p className="measure mt-4 text-body-lg">{s("lead")}</p>
          <div className="mt-10">
            <SkillsEvidence locale={locale} />
          </div>
        </div>
      </Section>
    </>
  );
}
