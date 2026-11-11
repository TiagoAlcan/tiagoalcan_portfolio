import { getTranslations } from "next-intl/server";

import { buttonStyles, MonoLabel } from "@/components/ui/primitives";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="dot-grid">
      <div className="shell py-24 md:py-32">
        <MonoLabel>{t("label")}</MonoLabel>
        <h1 className="mt-3 text-h1 text-heading">{t("title")}</h1>
        <p className="measure mt-4 text-body-lg">{t("body")}</p>
        <Link href="/" className={`${buttonStyles.primary} mt-8`}>
          {t("home")}
        </Link>
      </div>
    </div>
  );
}
