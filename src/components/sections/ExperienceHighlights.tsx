import { getFormatter, getTranslations } from "next-intl/server";

import { ArrowRight } from "@/components/ui/icons";
import { buttonStyles } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { experience } from "@content/experience";

/**
 * The professional timeline on the home page, set on the cobalt band.
 * Same entries as the Experience page, without the per-period stack.
 */
export async function ExperienceHighlights({ locale }: { locale: Locale }) {
  const t = await getTranslations("home");
  const e = await getTranslations("experience");
  const format = await getFormatter();
  const month = (ym: string) =>
    format.dateTime(new Date(`${ym}-15T12:00:00Z`), { month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-20 bg-band py-16 text-on-band [--focus:var(--cream)] md:py-24"
    >
      <div className="shell">
        <p className="mono-label text-on-band/75">{t("experienceLabel")}</p>
        <h2 id="experience-title" className="mt-3 text-h2 text-on-band">
          {t("experienceTitle")}
        </h2>
        <p className="measure mt-4 text-body-lg text-on-band/85">{e("lead")}</p>

        <ol className="mt-12 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-0">
          {experience.map((entry, i) => (
            <li
              key={entry.start}
              className={cn(
                "border-on-band/25",
                i === 0 ? "lg:pr-12" : "border-t pt-12 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12",
              )}
              data-reveal
            >
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.85rem] text-on-band/80">
                <span
                  aria-hidden="true"
                  className={cn("size-2.5 rounded-full", entry.end ? "bg-on-band/50" : "status-pulse bg-action")}
                />
                <span>
                  <time dateTime={entry.start}>{month(entry.start)}</time>
                  <span aria-hidden="true"> → </span>
                  {entry.end ? <time dateTime={entry.end}>{month(entry.end)}</time> : e("present")}
                </span>
              </p>
              <h3 className="mt-3 text-h3 text-on-band">{entry.role[locale]}</h3>
              <p className="mt-1 text-on-band/75">
                {entry.company} · {entry.mode[locale]}
              </p>
              <ul className="mt-6 grid gap-3.5">
                {entry.highlights[locale].map((item) => (
                  <li key={item} className="grid max-w-[62ch] grid-cols-[1.25rem_1fr]">
                    <span aria-hidden="true" className="font-mono text-action">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mt-12">
          <Link
            href="/experience"
            className={cn(buttonStyles.text, "text-on-band decoration-action hover:decoration-on-band")}
          >
            {t("experienceLink")}
            <ArrowRight />
          </Link>
        </p>
      </div>
    </section>
  );
}
