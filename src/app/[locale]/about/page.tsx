import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Curiosities } from "@/components/sections/Curiosities";
import { PageIntro } from "@/components/sections/PageIntro";
import { ArrowUpRight, Download, trackIcons } from "@/components/ui/icons";
import { buttonStyles, MonoLabel, Section, Tag } from "@/components/ui/primitives";
import { Underline } from "@/components/ui/underline";
import type { Locale } from "@/i18n/routing";
import { TRACKS } from "@/lib/content/schema";
import { alternatesFor } from "@/lib/seo/metadata";
import { coursesByTrack, education, postgradPhases, shortCourses } from "@content/education";
import { languages, resume, stackByArea, tracks } from "@content/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "about" });
  return { title: t("title"), description: t("metaDescription"), alternates: alternatesFor("/about", locale as Locale) };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const a11y = await getTranslations("a11y");

  const method = [1, 2, 3].map((n) => ({ title: t(`method${n}Title`), body: t(`method${n}Body`) }));
  const role = [1, 2, 3, 4].map((n) => ({ title: t(`role${n}Title`), body: t(`role${n}Body`) }));

  return (
    <>
      <PageIntro label={t("label")} title={t("title")} lead={t("lead")} />

      <Section aria-labelledby="who-title">
        <div className="shell grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-14">
          <div>
            <MonoLabel index="01">{t("whoLabel")}</MonoLabel>
            <h2 id="who-title" className="mt-3 text-h2 text-heading">
              {t("whoTitle")}
            </h2>
          </div>
          <div className="text-body-lg">
            <p className="measure">{t("who1")}</p>
            <p className="measure mt-5">{t("who2")}</p>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="method-title" className="border-y border-edge bg-surface">
        <div className="shell">
          <MonoLabel index="02">{t("methodLabel")}</MonoLabel>
          <h2 id="method-title" className="mt-3 text-h2 text-heading">
            {t("methodTitle")}
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {method.map((step, i) => (
              <li key={step.title} data-reveal>
                <p className="font-mono text-[0.85rem] text-brand">{`0${i + 1}`}</p>
                <h3 className="mt-2 text-h3 text-heading">{step.title}</h3>
                <p className="mt-2 text-fg-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section aria-labelledby="role-title">
        <div className="shell">
          <MonoLabel index="03">{t("roleLabel")}</MonoLabel>
          <h2 id="role-title" className="mt-3 text-h2 text-heading">
            {t("roleTitle")}
          </h2>
          <p className="measure mt-5 text-body-lg">{t("roleIntro")}</p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {role.map((item, i) => (
              <li key={item.title} className="rounded-(--radius-card) border border-edge bg-surface p-6" data-reveal>
                <h3 className="text-h3 text-heading">
                  {i === 1 ? (
                    <Underline tone="marker" weight="brush" animate>
                      {item.title}
                    </Underline>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-2 text-fg-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section aria-labelledby="curiosity-title" className="dot-grid border-y border-edge">
        <div className="shell">
          <MonoLabel index="04">
            <span className="normal-case">$ {t("curiosityLabel")}</span>
          </MonoLabel>
          <h2 id="curiosity-title" className="mt-3 max-w-[24ch] text-h2 text-heading">
            {t("curiosityTitle")}
          </h2>
          <Curiosities />
        </div>
      </Section>

      <Section aria-labelledby="stack-title">
        <div className="shell">
          <MonoLabel index="05">{t("stackLabel")}</MonoLabel>
          <h2 id="stack-title" className="mt-3 text-h2 text-heading">
            {t("stackTitle")}
          </h2>
          <div className="mt-8 overflow-x-auto rounded-(--radius-card) border border-edge">
            <table className="w-full min-w-[640px] border-collapse text-left text-[0.95rem]">
              <thead className="bg-surface">
                <tr>
                  {[t("stackArea"), t("stackWork"), t("stackStudy")].map((h) => (
                    <th key={h} scope="col" className="mono-label px-5 py-3 font-normal text-fg-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stackByArea.map((row) => (
                  <tr key={row.area.en} className="border-t border-edge align-top">
                    <th scope="row" className="px-5 py-4 font-display text-[1.1rem] font-medium text-heading">
                      {row.area[locale]}
                    </th>
                    <td className="px-5 py-4">{row.work.join(" · ")}</td>
                    <td className="px-5 py-4 text-fg-muted">{row.study.join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="education-title" className="border-t border-edge bg-surface">
        <div className="shell">
          <MonoLabel index="06">{t("educationLabel")}</MonoLabel>
          <h2 id="education-title" className="mt-3 text-h2 text-heading">
            {t("educationTitle")}
          </h2>

          <ol className="mt-10 grid gap-5 lg:grid-cols-3">
            {education.map((entry) => (
              <li key={entry.id} className="flex flex-col rounded-(--radius-card) border border-edge bg-page p-6">
                <p className="font-mono text-[0.8rem] text-fg-muted">{entry.school}</p>
                <h3 className="mt-2 text-h3 text-heading">{entry.title[locale]}</h3>
                <p className="mt-2 font-mono text-[0.8rem] text-fg-muted">{entry.period[locale]}</p>
                <p className="mt-3 text-[0.95rem]">{entry.detail[locale]}</p>
                {entry.link ? (
                  <a href={entry.link.href} target="_blank" rel="noreferrer" className={`${buttonStyles.text} mt-auto pt-3 text-[0.95rem]`}>
                    {entry.link.label[locale]}
                    <ArrowUpRight />
                    <span className="sr-only">({a11y("external")})</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-h3 text-heading">{t("coursesTitle")}</h3>
              <dl className="mt-5 grid gap-6">
                {TRACKS.map((track) => {
                  const Icon = trackIcons[track];
                  return (
                    <div key={track}>
                      <dt className="flex items-center gap-2 font-semibold">
                        <Icon className="text-brand" />
                        {tracks[track].label[locale]}
                      </dt>
                      <dd className="mt-1.5 text-[0.92rem] leading-relaxed text-fg-muted">{coursesByTrack[track].join(" · ")}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className="grid content-start gap-10">
              <div>
                <h3 className="text-h3 text-heading">{t("postgradPhases")}</h3>
                <ol className="mt-5 grid gap-3">
                  {postgradPhases.map((p) => (
                    <li key={p.phase} className="grid grid-cols-[4.5rem_1fr] gap-3 text-[0.95rem]">
                      <span className="font-mono text-[0.8rem] leading-6 text-brand">{t("phase", { n: p.phase })}</span>
                      <span>{p.theme[locale]}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="text-h3 text-heading">{t("shortCoursesTitle")}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {shortCourses.map((c) => (
                    <li key={c}>
                      <Tag className="bg-page">{c}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-h3 text-heading">{t("languagesTitle")}</h3>
                <ul className="mt-4 grid gap-1.5">
                  {languages.map((l) => (
                    <li key={l.name.en}>
                      <span className="font-semibold">{l.name[locale]}</span>
                      <span className="text-fg-muted"> · {l.level[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-h3 text-heading">{t("cvTitle")}</h3>
                <p className="mt-3 max-w-[48ch] text-[0.95rem] text-fg-muted">{t("cvBody")}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {(locale === "en" ? (["en", "pt-BR"] as const) : (["pt-BR", "en"] as const)).map((lang, i) => (
                    <a key={lang} href={resume[lang]} download hrefLang={lang} className={i === 0 ? buttonStyles.primary : buttonStyles.secondary}>
                      <Download />
                      {t(lang === "en" ? "cvEn" : "cvPt")}
                      <span className="sr-only"> (PDF)</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
