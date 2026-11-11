"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export const NAV = [
  { href: "/about", key: "about" },
  { href: "/experience", key: "experience" },
  { href: "/projects", key: "projects" },
] as const;

export function NavLinks({ className, itemClassName, onNavigate }: { className?: string; itemClassName?: string; onNavigate?: () => void }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <ul className={className}>
      {NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.key}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center rounded-(--radius-control) px-3 text-[0.95rem] font-medium text-fg-muted transition-colors duration-200 hover:text-fg",
                active && "text-fg underline decoration-brand decoration-2 underline-offset-[0.45em]",
                itemClassName,
              )}
            >
              {t(item.key)}
            </Link>
          </li>
        );
      })}
      <li>
        <a
          href="#contact"
          onClick={onNavigate}
          className={cn(
            "inline-flex min-h-11 items-center rounded-(--radius-control) px-3 text-[0.95rem] font-medium text-fg-muted transition-colors duration-200 hover:text-fg",
            itemClassName,
          )}
        >
          {t("contact")}
        </a>
      </li>
    </ul>
  );
}
