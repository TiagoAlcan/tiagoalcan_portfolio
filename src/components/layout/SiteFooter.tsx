import { getLocale, getTranslations } from "next-intl/server";

import { Logo } from "@/components/brand/Logo";
import { ArrowUp, ArrowUpRight } from "@/components/ui/icons";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { contact, resume } from "@content/site";
import { FooterQuote } from "./FooterQuote";

const PAGES = [
  { href: "/capabilities", key: "capabilities" },
  { href: "/certificates", key: "certificates" },
  { href: "/demos", key: "demos" },
  { href: "/notes", key: "notes" },
] as const;

const link = "inline-flex min-h-11 items-center gap-1.5 font-medium underline decoration-brand decoration-2 underline-offset-[0.25em] hover:decoration-fg";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const a11y = await getTranslations("a11y");
  const locale = (await getLocale()) as Locale;

  const external = [
    { href: contact.whatsapp, label: "WhatsApp" },
    { href: contact.linkedin, label: "LinkedIn" },
    { href: contact.github, label: "GitHub" },
    { href: `${contact.github}/tiagoalcan_portfolio`, label: t("source") },
  ];

  return (
    <footer className="surface-alt border-t border-edge">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
        <div>
          <span className="text-heading">
            <Logo />
          </span>
          <p className="mt-3 font-display text-[1.15rem] text-heading">{t("concept")}</p>
          <FooterQuote />
        </div>

        <nav aria-label={t("more")}>
          <h2 className="mono-label text-fg-muted">{t("more")}</h2>
          <ul className="mt-2 grid grid-cols-2 gap-x-6 text-[0.95rem] md:grid-cols-1">
            {PAGES.map((page) => (
              <li key={page.key}>
                <Link href={page.href} className={link}>
                  {t(page.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mono-label text-fg-muted">{t("links")}</h2>
          <ul className="mt-2 grid grid-cols-2 gap-x-6 text-[0.95rem] md:grid-cols-1">
            <li>
              <a href={resume[locale]} download className={link}>
                {t("resume")}
                <span className="sr-only"> (PDF)</span>
              </a>
            </li>
            {external.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer" className={link}>
                  {item.label}
                  <ArrowUpRight />
                  <span className="sr-only">({a11y("external")})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-edge py-4">
        <p className="font-mono text-[0.75rem] text-fg-muted">
          © {new Date().getFullYear()} {t("rights")}
        </p>
        <a href="#top" className="inline-flex min-h-11 items-center gap-1.5 text-[0.9rem] text-fg-muted hover:text-fg">
          <ArrowUp />
          {t("top")}
        </a>
      </div>
    </footer>
  );
}
