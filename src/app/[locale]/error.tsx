"use client";

import { useTranslations } from "next-intl";

import { buttonStyles, MonoLabel } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("error");
  return (
    <div className="shell py-24 md:py-32">
      <MonoLabel>{t("label")}</MonoLabel>
      <h1 className="mt-3 text-h1 text-heading">{t("title")}</h1>
      <p className="measure mt-4 text-body-lg">{t("body")}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className={buttonStyles.primary}>
          {t("retry")}
        </button>
        <Link href="/" className={buttonStyles.secondary}>
          {t("home")}
        </Link>
      </div>
    </div>
  );
}
