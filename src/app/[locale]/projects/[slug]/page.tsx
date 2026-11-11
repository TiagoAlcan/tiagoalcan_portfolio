import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { mdxComponents } from "@/components/case-study/CaseStudy";
import { ProjectCover } from "@/components/sections/ProjectCover";
import { ArrowRight, ArrowUpRight, trackIcons } from "@/components/ui/icons";
import { buttonStyles, MonoLabel, Tag } from "@/components/ui/primitives";
import { Stamp } from "@/components/ui/stamp";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getNextProject, getProject, getProjectSlugs } from "@/lib/content/repository";
import { alternatesFor } from "@/lib/seo/metadata";
import { SITE_URL, tracks } from "@content/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProject(slug, locale as Locale);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: alternatesFor({ pathname: "/projects/[slug]", params: { slug } }, locale as Locale),
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const project = await getProject(slug, locale);
  if (!project) notFound();

  const t = await getTranslations("project");
  const a11y = await getTranslations("a11y");
  const next = await getNextProject(slug, locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    inLanguage: locale,
    author: { "@type": "Person", name: "Tiago Alcântara", url: SITE_URL },
    keywords: project.stack.join(", "),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="dot-grid border-b border-edge">
        <div className="shell py-10 md:py-16">
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[0.8rem] text-fg-muted hover:text-fg">
            <ArrowRight className="rotate-180" />
            {t("back")}
          </Link>

          <div className="mt-4 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {project.tracks.map((track) => {
                  const Icon = trackIcons[track];
                  return (
                    <Tag key={track}>
                      <Icon />
                      {tracks[track].label[locale]}
                    </Tag>
                  );
                })}
                <Tag>{t(`status.${project.status}`)}</Tag>
              </div>
              <h1 className="mt-5 text-h1 text-heading">{project.title}</h1>
              <p className="measure mt-5 text-body-lg">{project.summary}</p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-(--radius-card) border border-edge bg-page p-2 shadow-[0_24px_50px_-34px_rgb(0_0_0/0.7)]">
                <ProjectCover cover={project.cover} alt={project.coverAlt} priority sizes="(min-width: 1024px) 600px, 92vw" className="rounded-[10px]" />
              </div>
              {project.status === "in-progress" ? (
                <Stamp text={t("stampInProgress")} label={t("status.in-progress")} tilt={-7} className="absolute -bottom-5 -left-2 h-auto w-40 text-brand" />
              ) : project.confidential ? (
                <Stamp text={t("stampFictional")} label={t("stampFictional")} tilt={-7} className="absolute -bottom-5 -left-2 h-auto w-40 text-brand" />
              ) : null}
            </div>
          </div>

          {project.confidential ? (
            <p className="measure mt-10 border-l-2 border-brand pl-4 text-[0.95rem] text-fg-muted">{t("confidential")}</p>
          ) : null}
        </div>
      </header>

      <div className="shell grid gap-x-14 lg:grid-cols-[1fr_17rem]">
        <div className="min-w-0 pb-10">
          {/* Content comes from this repository, so plain expressions (arrays, numbers) are allowed; dangerous globals stay blocked. */}
          <MDXRemote source={project.body} components={mdxComponents as never} options={{ blockJS: false, blockDangerousJS: true }} />
        </div>

        <aside className="pb-12 lg:pt-14">
          <dl className="grid gap-6 rounded-(--radius-card) border border-edge bg-surface p-5 lg:sticky lg:top-24">
            <div>
              <dt>
                <MonoLabel>{t("role")}</MonoLabel>
              </dt>
              <dd className="mt-1.5 text-[0.95rem]">{project.role}</dd>
            </div>
            <div>
              <dt>
                <MonoLabel>{t("period")}</MonoLabel>
              </dt>
              <dd className="mt-1.5 text-[0.95rem]">{project.period}</dd>
            </div>
            <div>
              <dt>
                <MonoLabel>{t("stack")}</MonoLabel>
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </dd>
            </div>
            {project.links.length > 0 ? (
              <div>
                <dt>
                  <MonoLabel>{t("links")}</MonoLabel>
                </dt>
                <dd className="mt-1 grid">
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={buttonStyles.text}>
                      {link.label}
                      <ArrowUpRight />
                      <span className="sr-only">({a11y("external")})</span>
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </div>

      {next ? (
        <nav aria-label={t("next")} className="border-t border-edge">
          <Link
            href={{ pathname: "/projects/[slug]", params: { slug: next.slug } }}
            className="group shell flex items-center justify-between gap-6 py-10 md:py-14"
          >
            <span>
              <MonoLabel>{t("next")}</MonoLabel>
              <span className="mt-2 block font-display text-h2 text-heading">{next.title}</span>
            </span>
            <ArrowRight className="shrink-0 text-[2rem] text-brand transition-transform duration-300 ease-(--ease-out-soft) group-hover:translate-x-2" />
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
