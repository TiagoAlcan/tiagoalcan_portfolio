import type { Metadata } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@content/site";

type Href = Parameters<typeof getPathname>[0]["href"];

/** Canonical URL plus hreflang alternates for one route. x-default points at PT-BR. */
export function alternatesFor(href: Href, locale: Locale): Metadata["alternates"] {
  const url = (l: Locale) => `${SITE_URL}${getPathname({ href, locale: l })}`;
  return {
    canonical: url(locale),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])),
      "x-default": url(routing.defaultLocale),
    },
  };
}
