import { getTranslations } from "next-intl/server";

import { ArrowUpRight, Github, Linkedin, Mail, Whatsapp } from "@/components/ui/icons";
import { buttonStyles, MonoLabel } from "@/components/ui/primitives";
import { contact } from "@content/site";
import { CopyEmail } from "./CopyEmail";

/** Present on every page. The mailto link works even when nothing else does. */
export async function ContactSection() {
  const t = await getTranslations("contact");
  const a11y = await getTranslations("a11y");

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-inverse text-on-inverse">
      <div className="shell py-16 md:py-24">
        <MonoLabel className="text-on-inverse/70">{t("label")}</MonoLabel>
        <h2 id="contact-title" className="mt-3 text-h1 text-on-inverse">
          {t("title")}
        </h2>
        <p className="measure mt-4 text-body-lg text-on-inverse/85">{t("body")}</p>

        <p className="mt-8 font-mono text-[clamp(1rem,0.7rem+1.4vw,1.6rem)] break-all">
          <a href={`mailto:${contact.email}`} className="underline decoration-action decoration-2 underline-offset-[0.3em]">
            {contact.email}
          </a>
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`mailto:${contact.email}`} className={buttonStyles.primary}>
            <Mail />
            {t("send")}
          </a>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-(--radius-control) border border-on-inverse/45 px-5 text-[0.95rem] font-semibold text-on-inverse transition-colors duration-200 hover:border-on-inverse"
          >
            <Whatsapp />
            {t("whatsapp")}
            <span className="sr-only">
              {contact.whatsappDisplay} ({a11y("external")})
            </span>
          </a>
          <CopyEmail email={contact.email} labels={{ copy: t("copy"), copied: t("copied"), failed: t("copyFailed", { email: contact.email }) }} />
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-1">
          {[
            { href: contact.linkedin, label: t("linkedin"), Icon: Linkedin },
            { href: contact.github, label: t("github"), Icon: Github },
          ].map(({ href, label, Icon }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 font-medium underline decoration-on-inverse/40 underline-offset-[0.3em] hover:decoration-action">
                <Icon />
                {label}
                <ArrowUpRight />
                <span className="sr-only">({a11y("external")})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
