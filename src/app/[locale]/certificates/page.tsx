import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

import { PageIntro } from "@/components/sections/PageIntro";
import { ArrowUpRight } from "@/components/ui/icons";
import { buttonStyles, Section, Tag } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo/metadata";
import { certificateIssuerNote, certificates, certificatesSource } from "@content/certificates";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "certificates" });
  return { title: t("title"), description: t("metaDescription"), alternates: alternatesFor("/certificates", locale as Locale) };
}

export default async function CertificatesPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("certificates");
  const a11y = await getTranslations("a11y");
  const format = await getFormatter();
  const month = (ym: string) => format.dateTime(new Date(`${ym}-15T12:00:00Z`), { month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <>
      <PageIntro label={t("label")} title={t("title")} lead={t("lead", { count: certificates.length })} />

      <Section>
        <div className="shell">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <li key={cert.credentialId} className="flex flex-col rounded-(--radius-card) border border-edge bg-surface p-5" data-reveal>
                <p className="flex items-center justify-between gap-3 font-mono text-[0.78rem] text-fg-muted">
                  <Tag className="bg-page">{cert.issuer}</Tag>
                  <time dateTime={cert.issued}>{month(cert.issued)}</time>
                </p>
                <h2 className="mt-4 font-display text-[1.3rem] leading-tight font-medium text-heading">{cert.title}</h2>
                <p className="mt-auto pt-5 font-mono text-[0.7rem] break-all text-fg-muted">
                  {t("credential")} {cert.credentialId}
                </p>
                <p className="mt-1">
                  <a
                    href={cert.url ?? certificatesSource}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 text-[0.92rem] font-semibold underline decoration-brand decoration-2 underline-offset-[0.25em] hover:decoration-fg"
                  >
                    {cert.url ? t("view") : t("viewLinkedin")}
                    <ArrowUpRight />
                    <span className="sr-only">({a11y("external")})</span>
                  </a>
                </p>
              </li>
            ))}
          </ul>

          <p className="measure mt-12 border-l-2 border-brand pl-4 text-[0.95rem] text-fg-muted">{certificateIssuerNote[locale]}</p>
          <p className="mt-6">
            <a href={certificatesSource} target="_blank" rel="noreferrer" className={buttonStyles.secondary}>
              {t("all")}
              <ArrowUpRight />
              <span className="sr-only">({a11y("external")})</span>
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
