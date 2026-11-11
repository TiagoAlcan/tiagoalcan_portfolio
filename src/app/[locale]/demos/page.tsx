import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AlertCard, NoDataPanel, Terminal } from "@/components/sections/ComingSoon";
import { PageIntro } from "@/components/sections/PageIntro";
import { ArrowRight } from "@/components/ui/icons";
import { buttonStyles, Section } from "@/components/ui/primitives";
import { Stamp } from "@/components/ui/stamp";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "demos" });
  return { title: t("title"), description: t("metaDescription"), alternates: alternatesFor("/demos", locale as Locale) };
}

export default async function DemosPage({ params }: Props) {
  const { locale: raw } = await params;
  setRequestLocale(raw as Locale);
  const t = await getTranslations("demos");
  const c = await getTranslations("comingSoon");

  return (
    <>
      <PageIntro label={t("label")} title={t("title")} lead={t("lead")} />

      <Section className="surface-alt">
        <div className="shell grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="relative">
            <NoDataPanel metric="demos_publicadas_total" range={t("range")} empty={t("empty")} query="sum(demos_publicadas_total) = 0" note={t("panelNote")} />
            <Stamp text={c("stamp")} label={c("stamp")} tilt={-8} className="absolute -top-6 -right-2 h-auto w-32 text-brand sm:w-36" />
          </div>
          <AlertCard
            state="FIRING"
            name="DemosAusentes"
            rows={[
              [t("alertSeverityKey"), t("alertSeverity")],
              [t("alertSummaryKey"), t("alertSummary")],
              [t("alertActionKey"), t("alertAction")],
            ]}
          />
          <Terminal
            className="lg:col-span-2"
            title={c("terminalTitle")}
            lines={["$ curl -I https://tiagoalcan.vercel.app/demos", "HTTP/2 503", `retry-after: ${t("retryAfter")}`, `x-status: ${t("xStatus")}`, "", "$ kubectl get pods -n demos", t("noPods")]}
          />
          <p className="font-mono text-[0.78rem] text-fg-muted lg:col-span-2">{c("joke")}</p>
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
