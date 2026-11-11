import { getLocale, getTranslations } from "next-intl/server";

import { Circled } from "@/components/ui/circled";
import { MonoLabel } from "@/components/ui/primitives";
import { Sparkline } from "@/components/ui/Sparkline";
import type { Locale } from "@/i18n/routing";
import { illustrativeSeries, stats } from "@content/site";

export async function StatStrip() {
  const t = await getTranslations("home");
  const p = await getTranslations("project");
  const locale = (await getLocale()) as Locale;

  return (
    <section aria-labelledby="stats-title" className="surface-alt border-y border-edge">
      <div className="shell py-14 md:py-20">
        <MonoLabel>
          <span id="stats-title">{t("statsLabel")}</span>
        </MonoLabel>
        <dl className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.value} className="relative flex flex-col-reverse" data-reveal>
              <dt className="mt-3 max-w-[26ch] text-fg-muted">{stat.label[locale]}</dt>
              <dd className="font-display text-[clamp(3.25rem,2.4rem+3.6vw,5.5rem)] leading-none font-medium text-heading">
                {stat.circled ? (
                  <Circled tone="marker" weight="brush" animate delay={300} className="px-1">
                    {stat.value}
                  </Circled>
                ) : (
                  stat.value
                )}
              </dd>
              {stat.circled ? (
                <>
                  <p aria-hidden="false" className="absolute -top-7 left-48 hidden w-44 -rotate-3 font-hand text-[1.25rem] leading-tight text-brand lg:block">
                    ← {t("statsNote")}
                  </p>
                  <div className="order-first mt-5 max-w-56">
                    <Sparkline data={illustrativeSeries} className="h-10" />
                    <p className="font-mono text-[0.68rem] text-fg-muted">{p("illustrative")}</p>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
