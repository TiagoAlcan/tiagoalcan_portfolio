"use client";

import { Command as Cmdk } from "cmdk";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Search } from "@/components/ui/icons";
import { Kbd } from "@/components/ui/primitives";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useClientValue } from "@/lib/use-client-value";
import { commands, type CommandContext } from "./commands";

export type PaletteProject = { slug: string; title: string };

const itemClass =
  "flex min-h-11 cursor-pointer items-center gap-3 rounded-(--radius-control) px-3 text-[0.95rem] text-fg data-[selected=true]:bg-action data-[selected=true]:text-on-action";
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.7rem] [&_[cmdk-group-heading]]:tracking-[0.12em] [&_[cmdk-group-heading]]:text-fg-muted [&_[cmdk-group-heading]]:uppercase";

export function CommandPalette({ projects }: { projects: PaletteProject[] }) {
  const t = useTranslations("palette");
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const mac = useClientValue(() => /Mac|iPhone|iPad/.test(navigator.platform), false);
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ctx: CommandContext = {
    navigate: (href) => router.push(href as never),
    scrollTo: (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    setTheme,
    switchLocale: () => {
      const other = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;
      router.replace({ pathname, params } as never, { locale: other });
    },
    copy: (text) => {
      navigator.clipboard?.writeText(text).then(() => {
        setNotice(t("copied"));
        window.setTimeout(() => setNotice(""), 2500);
      });
    },
    open: (url) => window.open(url, "_blank", "noopener,noreferrer"),
  };

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    // Let the dialog close and return focus before acting.
    window.setTimeout(fn, 0);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("open")}
        className="mr-1 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-fg-muted transition-colors duration-200 hover:bg-surface hover:text-fg"
      >
        <Search className="text-[1.1rem]" />
        <span className="hidden text-[0.85rem] lg:inline">{t("hint")}</span>
        <span className="hidden items-center gap-0.5 sm:inline-flex">
          <Kbd>{mac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {notice}
      </span>

      <Cmdk.Dialog
        open={open}
        onOpenChange={setOpen}
        label={t("title")}
        overlayClassName="fixed inset-0 z-50 bg-[color-mix(in_srgb,var(--deep)_55%,transparent)] backdrop-blur-[2px]"
        contentClassName="fixed top-[14vh] left-1/2 z-50 w-[min(92vw,560px)] -translate-x-1/2 overflow-hidden rounded-(--radius-card) border border-edge bg-page shadow-[0_24px_60px_-20px_rgb(0_0_0/0.5)]"
      >
        <div className="flex items-center gap-3 border-b border-edge px-4">
          <span aria-hidden="true" className="font-mono text-brand">
            $
          </span>
          <Cmdk.Input
            placeholder={t("placeholder")}
            className="h-14 w-full bg-transparent font-mono text-[0.95rem] text-fg outline-none placeholder:text-fg-muted"
          />
          <Kbd>Esc</Kbd>
        </div>
        <Cmdk.List className="max-h-[52vh] overflow-y-auto p-2">
          <Cmdk.Empty className="px-3 py-8 text-center text-fg-muted">{t("empty")}</Cmdk.Empty>
          <Cmdk.Group heading={t("groupNav")} className={groupClass}>
            {commands
              .filter((c) => c.group === "nav")
              .map((c) => (
                <Cmdk.Item key={c.id} value={t(c.labelKey)} keywords={c.keywords} onSelect={() => run(() => c.run(ctx))} className={itemClass}>
                  {t(c.labelKey)}
                </Cmdk.Item>
              ))}
          </Cmdk.Group>
          <Cmdk.Group heading={t("groupProjects")} className={groupClass}>
            {projects.map((p) => (
              <Cmdk.Item
                key={p.slug}
                value={p.title}
                keywords={[p.slug]}
                onSelect={() => run(() => ctx.navigate({ pathname: "/projects/[slug]", params: { slug: p.slug } }))}
                className={itemClass}
              >
                {p.title}
              </Cmdk.Item>
            ))}
          </Cmdk.Group>
          <Cmdk.Group heading={t("groupActions")} className={groupClass}>
            {commands
              .filter((c) => c.group === "actions")
              .map((c) => (
                <Cmdk.Item key={c.id} value={t(c.labelKey)} keywords={c.keywords} onSelect={() => run(() => c.run(ctx))} className={itemClass}>
                  {t(c.labelKey)}
                </Cmdk.Item>
              ))}
          </Cmdk.Group>
        </Cmdk.List>
      </Cmdk.Dialog>
    </>
  );
}
