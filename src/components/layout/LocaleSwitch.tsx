"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Goes to the same page in the other language. Project slugs are the same in both. */
export function LocaleSwitch() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const other = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <Link
      // The pathname is one of the known routes; params carry the slug when there is one.
      href={{ pathname, params } as never}
      locale={other}
      hrefLang={other}
      lang={other}
      aria-label={t("switchTo")}
      title={t("switchTo")}
      className="inline-flex size-11 items-center justify-center rounded-full font-mono text-[0.8rem] font-semibold text-fg transition-colors duration-200 hover:bg-surface"
    >
      {t("short")}
    </Link>
  );
}
