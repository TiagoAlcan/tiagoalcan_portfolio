import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import { PageIntro } from "@/components/sections/PageIntro";
import { TrackExplorer, TrackExplorerView } from "@/components/sections/TrackExplorer";
import { Section } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/routing";
import { getProjects } from "@/lib/content/repository";
import { alternatesFor } from "@/lib/seo/metadata";
import { trackCopyFor } from "@/lib/content/tracks";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "projects" });
  return { title: t("title"), description: t("metaDescription"), alternates: alternatesFor("/projects", locale as Locale) };
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("projects");
  const projects = await getProjects(locale);
  const copy = trackCopyFor(locale);

  return (
    <>
      <PageIntro label={t("label")} title={t("title")} lead={t("intro")} />
      <Section className="pt-10 md:pt-14">
        <div className="shell">
          <Suspense fallback={<TrackExplorerView projects={projects} copy={copy} active={null} columns={3} />}>
            <TrackExplorer projects={projects} copy={copy} columns={3} />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
