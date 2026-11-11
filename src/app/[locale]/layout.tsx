import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Providers } from "@/components/providers/Providers";
import { RevealOnScroll } from "@/components/providers/Reveal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/lib/content/repository";
import { contact, SITE_URL } from "@content/site";

import "../globals.css";

const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-fraunces", axes: ["opsz"] });
const instrument = Instrument_Sans({ subsets: ["latin"], display: "swap", variable: "--font-instrument" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains", weight: ["400", "500", "700"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2edd5" },
    { media: "(prefers-color-scheme: dark)", color: "#04261e" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: t("titleTemplate") },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: "Tiago Alcântara",
      locale: locale === "pt-BR" ? "pt_BR" : "en_US",
      title: t("title"),
      description: t("description"),
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const a11y = await getTranslations("a11y");
  const projects = (await getProjects(locale)).map((p) => ({ slug: p.slug, title: p.title }));

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tiago Alcântara",
    jobTitle: "Software Engineer",
    url: SITE_URL,
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressCountry: "BR" },
    worksFor: { "@type": "Organization", name: "THCS Desenvolvimento de Software" },
    sameAs: [contact.linkedin, contact.github],
  };

  return (
    <html lang={locale} suppressHydrationWarning className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body id="top" className="min-h-dvh antialiased">
        {/* Marks the document as scripted before first paint, so scroll reveals only hide content when they can also show it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <NextIntlClientProvider>
          <Providers>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-(--radius-control) focus:bg-action focus:px-4 focus:py-3 focus:font-semibold focus:text-on-action"
            >
              {a11y("skip")}
            </a>
            <SiteHeader projects={projects} />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <ContactSection />
            <SiteFooter />
            <RevealOnScroll />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
