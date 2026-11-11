import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Terminal } from "@/components/sections/ComingSoon";
import { PageIntro } from "@/components/sections/PageIntro";
import { ArrowRight } from "@/components/ui/icons";
import { buttonStyles, Section } from "@/components/ui/primitives";
import { Stamp } from "@/components/ui/stamp";
import { StickyNote, StickyNoteContent, StickyNoteTitle } from "@/components/ui/sticky-note";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "notes" });
  return { title: t("title"), description: t("metaDescription"), alternates: alternatesFor("/notes", locale as Locale) };
}

const COLORS = ["yellow", "orange", "green"] as const;

export default async function NotesPage({ params }: Props) {
  const { locale: raw } = await params;
  setRequestLocale(raw as Locale);
  const t = await getTranslations("notes");
  const c = await getTranslations("comingSoon");

  return (
    <>
      <PageIntro label={t("label")} title={t("title")} lead={t("lead")} />

      <Section className="surface-alt">
        <div className="shell">
          <div className="relative">
            <Terminal
              title={c("terminalTitle")}
              lines={["$ ls notas/", t("lsOut"), "", "$ git log --oneline -- notas/", t("gitOut"), "", "$ wc -w notas/rascunho-01.md", "0 notas/rascunho-01.md"]}
            />
            <Stamp text={c("stamp")} label={c("stamp")} tilt={-8} className="absolute -top-6 -right-2 h-auto w-32 text-brand sm:w-36" />
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <li key={n} data-reveal>
                <StickyNote color={COLORS[i]} seed={`note-soon-${n}`} className="h-full w-full">
                  <StickyNoteTitle className="text-[1.3rem] leading-tight">{t(`sticky${n}Title`)}</StickyNoteTitle>
                  <StickyNoteContent className="text-[1.125rem] leading-snug">{t(`sticky${n}Body`)}</StickyNoteContent>
                </StickyNote>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[0.78rem] text-fg-muted">{c("joke")}</p>
        </div>
      </Section>

      <Section>
        <div className="shell">
          <h2 className="max-w-[26ch] text-h2 text-heading">{t("meanwhileTitle")}</h2>
          <p className="measure mt-4 text-body-lg">{t("meanwhileBody")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className={buttonStyles.primary}>
              {c("projects")}
              <ArrowRight />
            </Link>
            <a href="#contact" className={buttonStyles.secondary}>
              {c("contact")}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
