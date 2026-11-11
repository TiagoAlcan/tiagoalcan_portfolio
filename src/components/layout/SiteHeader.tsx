import { getTranslations } from "next-intl/server";

import { Logo } from "@/components/brand/Logo";
import { CommandPalette, type PaletteProject } from "@/components/command-palette/CommandPalette";
import { Link } from "@/i18n/navigation";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export async function SiteHeader({ projects }: { projects: PaletteProject[] }) {
  const t = await getTranslations("a11y");

  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-page/85 backdrop-blur-md">
      <div className="shell relative flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label={t("home")} className="-ml-1 inline-flex min-h-11 items-center rounded-(--radius-control) px-1 text-heading">
          <Logo />
        </Link>
        <nav aria-label={t("mainNav")} className="hidden md:block">
          <NavLinks className="flex items-center gap-1" />
        </nav>
        <div className="flex items-center">
          <CommandPalette projects={projects} />
          <LocaleSwitch />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
