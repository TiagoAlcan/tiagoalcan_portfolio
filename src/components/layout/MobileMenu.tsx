"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";

import { Close, Menu } from "@/components/ui/icons";
import { IconButton } from "@/components/ui/primitives";
import { NavLinks } from "./NavLinks";

export function MobileMenu() {
  const t = useTranslations("a11y");
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <IconButton aria-expanded={open} aria-controls={id} aria-label={open ? t("closeMenu") : t("openMenu")} onClick={() => setOpen((v) => !v)}>
        {open ? <Close /> : <Menu />}
      </IconButton>
      <div id={id} hidden={!open} className="absolute inset-x-0 top-full border-b border-edge bg-page shadow-[0_12px_24px_-16px_rgb(0_0_0/0.35)]">
        <nav aria-label={t("mainNav")} className="shell py-3">
          <NavLinks className="grid" itemClassName="w-full text-[1.05rem]" onNavigate={() => setOpen(false)} />
        </nav>
      </div>
    </div>
  );
}
