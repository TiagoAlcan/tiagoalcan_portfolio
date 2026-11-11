import { getTranslations } from "next-intl/server";

import { Logo } from "@/components/brand/Logo";
import { ArrowUp, ArrowUpRight } from "@/components/ui/icons";
import { contact } from "@content/site";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const a11y = await getTranslations("a11y");

  return (
    <footer className="border-t border-edge">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-heading">
            <Logo />
          </span>
          <p className="mt-3 font-display text-[1.15rem] text-heading">{t("concept")}</p>
        </div>
        <div className="flex flex-col gap-2 text-[0.9rem] md:items-end">
          <a
            href={`${contact.github}/tiagoalcan_portfolio`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 underline decoration-brand decoration-2 underline-offset-[0.25em]"
          >
            {t("source")}
            <ArrowUpRight />
            <span className="sr-only">({a11y("external")})</span>
          </a>
          <a href="#top" className="inline-flex min-h-11 items-center gap-1.5 text-fg-muted hover:text-fg">
            <ArrowUp />
            {t("top")}
          </a>
          <p className="font-mono text-[0.75rem] text-fg-muted">
            © {new Date().getFullYear()} {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
