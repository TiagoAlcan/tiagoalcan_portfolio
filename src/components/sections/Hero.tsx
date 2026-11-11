import { getTranslations } from "next-intl/server";

import { LogoMark } from "@/components/brand/Logo";
import { HeroGraph } from "@/components/three/HeroGraph";
import { HeroGraphStatic } from "@/components/three/HeroGraphStatic";
import { ArrowRight } from "@/components/ui/icons";
import { buttonStyles, StatusDot } from "@/components/ui/primitives";
import { Typewriter } from "@/components/ui/typewriter";
import { Underline } from "@/components/ui/underline";
import { Link } from "@/i18n/navigation";

/**
 * First fold: answers the 30-second visitor (who, what, where, how to reach).
 * All of it is HTML; the graph behind is decoration that arrives later.
 */
export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden border-b border-edge">
      <HeroGraph className="absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_center,transparent_18%,black_78%)]">
        <HeroGraphStatic />
      </HeroGraph>

      <div className="shell grid items-center gap-8 py-14 md:grid-cols-[auto_1fr] md:gap-14 md:py-24">
        <div className="relative mx-auto size-40 shrink-0 md:mx-0 md:size-56 lg:size-64">
          <div className="flex size-full items-center justify-center rounded-full bg-surface text-heading outline-[3px] outline-offset-[6px] outline-action">
            <LogoMark title={t("portraitAlt")} className="h-[46%]" />
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.85rem] text-fg-muted">
            <span className="text-brand" aria-hidden="true">
              ${" "}
            </span>
            <Typewriter text={t("whoami")} cursor="block" delay={500} reserve />
          </p>
          <h1 className="mt-3 text-display text-heading">{t("name")}</h1>
          <p className="mt-3 font-mono text-[0.95rem] text-fg">{t("role")}</p>
          <p className="mt-6 font-display text-h2 text-heading">
            {t("conceptBefore")}{" "}
            <Underline tone="marker" weight="brush" animate delay={700}>
              {t("conceptMarked")}
            </Underline>
            {t("conceptAfter")}
          </p>
          <p className="measure mt-5 text-body-lg text-fg">{t("intro")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects" className={buttonStyles.primary}>
              {t("ctaProjects")}
              <ArrowRight />
            </Link>
            <a href="#contact" className={buttonStyles.secondary}>
              {t("ctaContact")}
            </a>
            <StatusDot pulse label={t("experience")} className="ml-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
