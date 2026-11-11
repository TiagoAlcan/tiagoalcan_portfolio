import { getFormatter, getTranslations } from "next-intl/server";

import { ArrowRight } from "@/components/ui/icons";
import { buttonStyles } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { experience } from "@content/experience";

/**
 * The working journey as a timeline, oldest first, on the cobalt band.
 * A rail runs down the side on phones and across the top on wide screens.
 */
export async function ExperienceHighlights({ locale }: { locale: Locale }) {
  const t = await getTranslations("home");
  const e = await getTranslations("experience");
  const format = await getFormatter();
  const month = (ym: string) =>
    format.dateTime(new Date(`${ym}-15T12:00:00Z`), { month: "short", year: "numeric", timeZone: "UTC" });

  const stops = [...experience].reverse();
  const node = "absolute top-0 -left-[7px] size-3 rounded-full ring-4 ring-band lg:-top-[7px] lg:left-0";
  const stop = "relative border-l-2 border-on-band/30 pb-12 pl-6 lg:border-t-2 lg:border-l-0 lg:pt-8 lg:pr-10 lg:pb-0 lg:pl-0";

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

        <ol className="mt-12 grid lg:grid-cols-[1fr_1.2fr_0.75fr]">
          {stops.map((entry) => (
            <li key={entry.start} className={stop} data-reveal>
              <span aria-hidden="true" className={cn(node, "bg-on-band")} />
              <p className="font-mono text-[0.85rem] text-on-band/80 max-lg:-mt-1">
                <time dateTime={entry.start}>{month(entry.start)}</time>
                <span aria-hidden="true"> → </span>
                {entry.end ? <time dateTime={entry.end}>{month(entry.end)}</time> : e("present")}
              </p>
              <h3 className="mt-2 text-h3 text-on-band">{entry.role[locale]}</h3>
              <p className="mt-1 text-[0.95rem] text-on-band/75">
                {entry.company} · {entry.mode[locale]}
              </p>
              <ul className="mt-5 grid gap-3">
                {entry.highlights[locale].map((item) => (
                  <li key={item} className="grid max-w-[62ch] grid-cols-[1.25rem_1fr] text-[0.97rem]">
                    <span aria-hidden="true" className="font-mono text-action">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className={cn(stop, "max-lg:border-l-transparent max-lg:pb-0 lg:pr-0")} data-reveal>
            <span aria-hidden="true" className={cn(node, "status-pulse bg-action")} />
            <p className="font-mono text-[0.85rem] text-on-band/80 max-lg:-mt-1">{t("timelineNowWhen")}</p>
            <h3 className="mt-2 text-h3 text-on-band">{t("timelineNowTitle")}</h3>
            <p className="mt-3 max-w-[40ch] text-[0.97rem] text-on-band/90">{t("timelineNowBody")}</p>
          </li>
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
