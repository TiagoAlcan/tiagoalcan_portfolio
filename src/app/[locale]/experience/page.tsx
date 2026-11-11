import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

import { PageIntro } from "@/components/sections/PageIntro";
import { ArrowRight } from "@/components/ui/icons";
import { buttonStyles, MonoLabel, Section, StatusDot, Tag } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo/metadata";
import { experience } from "@content/experience";

export async function generateMetadata({ params }: PageProps<"/[locale]/experience">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "experience" });
  return { title: t("title"), description: t("metaDescription"), alternates: alternatesFor("/experience", locale as Locale) };
}

export default async function ExperiencePage({ params }: PageProps<"/[locale]/experience">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("experience");
  const format = await getFormatter();
  const month = (ym: string) => format.dateTime(new Date(`${ym}-15T12:00:00Z`), { month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <>
      <PageIntro label={t("label")} title={t("title")} lead={t("lead")} />
      <Section>
        <div className="shell">
          <ol className="relative grid gap-14 border-l-2 border-edge pl-6 md:gap-20 md:pl-10">
            {experience.map((entry) => (
              <li key={entry.start} className="relative" data-reveal>
                <span aria-hidden="true" className={`absolute top-2 -left-[calc(1.5rem+7px)] size-3 rounded-full md:-left-[calc(2.5rem+7px)] ${entry.end ? "bg-fg-muted" : "bg-action"}`} />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <p className="font-mono text-[0.85rem] text-fg-muted">
                    <time dateTime={entry.start}>{month(entry.start)}</time>
                    <span aria-hidden="true"> → </span>
                    {entry.end ? <time dateTime={entry.end}>{month(entry.end)}</time> : t("present")}
                  </p>
                  {entry.end ? null : <StatusDot pulse label={t("present")} />}
                </div>
                <h2 className="mt-2 text-h2 text-heading">{entry.role[locale]}</h2>
                <p className="mt-1 text-fg-muted">
                  {entry.company} · {entry.mode[locale]}
                </p>

                <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
                  <div>
                    <MonoLabel>{t("highlights")}</MonoLabel>
                    <ul className="mt-4 grid gap-3.5">
                      {entry.highlights[locale].map((item) => (
                        <li key={item} className="measure grid grid-cols-[1.25rem_1fr]">
                          <span aria-hidden="true" className="font-mono text-brand">
                            →
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <MonoLabel>{t("stack")}</MonoLabel>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {entry.stack.map((item) => (
                        <li key={item}>
                          <Tag>{item}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <p className="measure mt-14 border-l-2 border-brand pl-4 text-[0.95rem] text-fg-muted">{t("clientNote")}</p>
          <p className="mt-8">
            <Link href="/projects" className={buttonStyles.text}>
              {t("projectsCta")}
              <ArrowRight />
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
