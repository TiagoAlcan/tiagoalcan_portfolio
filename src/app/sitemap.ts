import type { MetadataRoute } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProjectSlugs } from "@/lib/content/repository";
import { SITE_URL } from "@content/site";

type Href = Parameters<typeof getPathname>[0]["href"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs();
  const routes: Href[] = ["/", "/about", "/experience", "/projects", "/capabilities", "/certificates", "/demos", "/notes", ...slugs.map((slug) => ({ pathname: "/projects/[slug]" as const, params: { slug } }))];

  return routes.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${getPathname({ href, locale })}`,
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}${getPathname({ href, locale: l })}`])) },
    })),
  );
}
