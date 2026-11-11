import { getTranslations } from "next-intl/server";

import { Download } from "@/components/ui/icons";
import { buttonStyles, Tag } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/routing";
import { shortCourses } from "@content/education";
import { languages, resume } from "@content/site";

const inverseSecondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-(--radius-control) border border-on-inverse/45 px-5 text-[0.95rem] font-semibold text-on-inverse transition-colors duration-200 hover:border-on-inverse";

/** Short courses, languages and the résumé downloads. Shared by the home and About pages. */
export async function EducationExtras({ locale }: { locale: Locale }) {
  const t = await getTranslations("about");
  const order = locale === "en" ? (["en", "pt-BR"] as const) : (["pt-BR", "en"] as const);

  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.1fr] lg:gap-8">
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

      <div className="rounded-(--radius-card) bg-inverse p-6 text-on-inverse [--focus:var(--orange)] md:col-span-2 lg:col-span-1">
        <h3 className="text-h3 text-on-inverse">{t("cvTitle")}</h3>
        <p className="mt-3 max-w-[48ch] text-[0.95rem] text-on-inverse/80">{t("cvBody")}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
          {order.map((lang, i) => (
            <a
              key={lang}
              href={resume[lang]}
              download
              hrefLang={lang}
              className={i === 0 ? buttonStyles.primary : inverseSecondary}
            >
              <Download />
              {t(lang === "en" ? "cvEn" : "cvPt")}
              <span className="sr-only"> (PDF)</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
