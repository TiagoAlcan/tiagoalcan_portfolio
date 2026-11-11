import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-BR", "en"],
  defaultLocale: "pt-BR",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/about": { "pt-BR": "/sobre", en: "/about" },
    "/experience": { "pt-BR": "/experiencia", en: "/experience" },
    "/projects": { "pt-BR": "/projetos", en: "/projects" },
    "/capabilities": { "pt-BR": "/capacidades", en: "/capabilities" },
    "/certificates": { "pt-BR": "/certificados", en: "/certificates" },
    "/demos": "/demos",
    "/notes": { "pt-BR": "/notas", en: "/notes" },
    "/projects/[slug]": { "pt-BR": "/projetos/[slug]", en: "/projects/[slug]" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
