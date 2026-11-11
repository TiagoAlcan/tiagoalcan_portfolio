"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { IconButton } from "@/components/ui/primitives";
import { Monitor, Moon, Sun } from "@/components/ui/icons";
import { useClientValue } from "@/lib/use-client-value";

const ORDER = ["system", "light", "dark"] as const;
type Choice = (typeof ORDER)[number];

/** Cycles system → light → dark. The label always says the current choice in words. */
export function ThemeToggle() {
  const t = useTranslations("theme");
  const { theme, setTheme } = useTheme();
  const mounted = useClientValue(() => true, false);

  const current: Choice = mounted && (ORDER as readonly string[]).includes(theme ?? "") ? (theme as Choice) : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = current === "light" ? Sun : current === "dark" ? Moon : Monitor;

  return (
    <IconButton onClick={() => setTheme(next)} aria-label={t("current", { theme: t(current) })} title={t("current", { theme: t(current) })}>
      <Icon />
    </IconButton>
  );
}
