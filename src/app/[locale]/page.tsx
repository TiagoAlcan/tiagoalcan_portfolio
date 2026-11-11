import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import { Hero } from "@/components/sections/Hero";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { StatStrip } from "@/components/sections/StatStrip";
import { TrackExplorer, TrackExplorerView } from "@/components/sections/TrackExplorer";
import { ArrowRight } from "@/components/ui/icons";
import { buttonStyles, MonoLabel, Section } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getFeaturedProjects } from "@/lib/content/repository";
import { trackCopyFor } from "@/lib/content/tracks";
import { alternatesFor } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternatesFor("/", locale as Locale) };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const projects = await getFeaturedProjects(locale);
  const copy = trackCopyFor(locale);

  return (
    <>
      <Hero />

      <Section aria-labelledby="featured-title" className="pt-12 md:pt-16">
        <div className="shell">
          <MonoLabel>{t("featuredLabel")}</MonoLabel>
          <h2 id="featured-title" className="mt-3 max-w-[22ch] text-h2 text-heading">
            {t("featuredTitle")}
          </h2>
          <div className="mt-8">
            <Suspense fallback={<TrackExplorerView projects={projects} copy={copy} active={null} />}>
              <TrackExplorer projects={projects} copy={copy} />
            </Suspense>
          </div>
          <p className="mt-10">
            <Link href="/projects" className={buttonStyles.text}>
              {t("allProjects")}
              <ArrowRight />
            </Link>
          </p>
        </div>
      </Section>

      <StatStrip />

      <div className="shell">
        <StackMarquee />
      </div>

      <Section aria-labelledby="about-teaser-title">
        <div className="shell grid gap-8 md:grid-cols-[1fr_1.3fr] md:gap-14" data-reveal>
          <div>
            <MonoLabel>{t("aboutLabel")}</MonoLabel>
            <h2 id="about-teaser-title" className="mt-3 text-h2 text-heading">
              {t("aboutTitle")}
            </h2>
          </div>
          <div>
            <p className="measure text-body-lg">{t("aboutBody")}</p>
            <p className="mt-6">
              <Link href="/about" className={buttonStyles.text}>
                {t("aboutLink")}
                <ArrowRight />
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
