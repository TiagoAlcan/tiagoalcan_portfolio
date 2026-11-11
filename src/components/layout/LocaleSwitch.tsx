"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Fragment } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const SHORT: Record<(typeof routing.locales)[number], string> = { "pt-BR": "PT", en: "EN" };

/** Both languages side by side, the current one underlined. Project slugs are the same in both. */
export function LocaleSwitch() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div role="group" aria-label={t("label")} className="flex items-center font-mono sm:mx-1 text-[0.8rem] font-semibold">
      {routing.locales.map((l, i) => {
        const current = l === locale;
        const box = "inline-flex min-h-11 min-w-8 items-center justify-center px-0.5 sm:min-w-9 sm:px-1";
        const text = cn(
          "border-b-2 pb-0.5 leading-none transition-colors duration-200",
          current ? "border-brand text-fg" : "border-transparent text-fg-muted group-hover/lang:border-fg/40 group-hover/lang:text-fg",
        );
        return (
          <Fragment key={l}>
            {i ? (
              <span aria-hidden="true" className="text-fg-muted/60">
                /
              </span>
            ) : null}
            {current ? (
              <span aria-current="true" lang={l} className={box}>
                <span className={text}>{SHORT[l]}</span>
              </span>
            ) : (
              <Link
                // The pathname is one of the known routes; params carry the slug when there is one.
                href={{ pathname, params } as never}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-label={t("switchTo")}
                title={t("switchTo")}
                className={cn(box, "group/lang rounded-(--radius-control)")}
              >
                <span className={text}>{SHORT[l]}</span>
              </Link>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
