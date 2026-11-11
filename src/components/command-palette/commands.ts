import type { Pathname } from "@/i18n/routing";

export type CommandContext = {
  navigate: (href: Pathname | { pathname: "/projects/[slug]"; params: { slug: string } }) => void;
  scrollTo: (id: string) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  switchLocale: () => void;
  copy: (text: string) => void;
  open: (url: string) => void;
};

export type Command = {
  id: string;
  group: "nav" | "actions";
  /** Translation key under the `palette` namespace. */
  labelKey: string;
  keywords: string[];
  run: (ctx: CommandContext) => void;
};

export const EMAIL = "tiago.gomesalcan@gmail.com";

/**
 * Command registry. The palette only walks this list: adding a command is
 * adding one item here and one key in the messages.
 * docs/03-design-patterns.md, pattern 9.
 */
export const commands: Command[] = [
  { id: "go-home", group: "nav", labelKey: "goHome", keywords: ["inicio", "início", "home"], run: (c) => c.navigate("/") },
  { id: "go-about", group: "nav", labelKey: "goAbout", keywords: ["sobre", "about", "formacao", "education"], run: (c) => c.navigate("/about") },
  { id: "go-experience", group: "nav", labelKey: "goExperience", keywords: ["experiencia", "experience", "thcs", "trabalho", "work"], run: (c) => c.navigate("/experience") },
  { id: "go-projects", group: "nav", labelKey: "goProjects", keywords: ["projetos", "projects", "cases"], run: (c) => c.navigate("/projects") },
  { id: "go-contact", group: "nav", labelKey: "goContact", keywords: ["contato", "contact", "email"], run: (c) => c.scrollTo("contact") },
  { id: "copy-email", group: "actions", labelKey: "copyEmail", keywords: ["email", "e-mail", "contato", "contact", "copiar", "copy"], run: (c) => c.copy(EMAIL) },
  { id: "theme-light", group: "actions", labelKey: "themeLight", keywords: ["tema", "theme", "claro", "light"], run: (c) => c.setTheme("light") },
  { id: "theme-dark", group: "actions", labelKey: "themeDark", keywords: ["tema", "theme", "escuro", "dark"], run: (c) => c.setTheme("dark") },
  { id: "theme-system", group: "actions", labelKey: "themeSystem", keywords: ["tema", "theme", "sistema", "system", "auto"], run: (c) => c.setTheme("system") },
  { id: "switch-locale", group: "actions", labelKey: "switchLocale", keywords: ["idioma", "language", "english", "ingles", "portugues", "portuguese"], run: (c) => c.switchLocale() },
  { id: "open-github", group: "actions", labelKey: "openGithub", keywords: ["github", "codigo", "code"], run: (c) => c.open("https://github.com/TiagoAlcan") },
  { id: "open-linkedin", group: "actions", labelKey: "openLinkedin", keywords: ["linkedin"], run: (c) => c.open("https://www.linkedin.com/in/tiagoalcan") },
];
