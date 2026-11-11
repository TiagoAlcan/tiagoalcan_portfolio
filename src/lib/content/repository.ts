import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

import { routing, type Locale } from "@/i18n/routing";
import { projectSchema, type Project, type ProjectWithBody } from "./schema";

/**
 * Content repository. Pages reach content only through these functions;
 * this module is the only one that knows about the file system and MDX.
 * docs/03-design-patterns.md, pattern 3.
 */

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

async function readProject(slug: string, locale: Locale): Promise<ProjectWithBody> {
  const file = path.join(PROJECTS_DIR, slug, `${locale}.mdx`);
  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    throw new Error(`Project "${slug}" has no ${locale}.mdx. Every project needs both languages.`);
  }
  const { data, content } = matter(raw);
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Invalid frontmatter in content/projects/${slug}/${locale}.mdx\n${issues}`);
  }
  return { ...parsed.data, slug, body: content };
}

export const getProjectSlugs = cache(async (): Promise<string[]> => {
  const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
});

const loadAll = cache(async (locale: Locale): Promise<ProjectWithBody[]> => {
  const slugs = await getProjectSlugs();
  // Reading every locale for every project makes a missing translation fail the build.
  await Promise.all(
    slugs.flatMap((slug) => routing.locales.filter((l) => l !== locale).map((l) => readProject(slug, l))),
  );
  const projects = await Promise.all(slugs.map((slug) => readProject(slug, locale)));
  return projects.sort((a, b) => a.order - b.order);
});

function stripBody(project: ProjectWithBody): Project {
  const copy: Partial<ProjectWithBody> = { ...project };
  delete copy.body;
  return copy as Project;
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  return (await loadAll(locale)).map(stripBody);
}

export async function getFeaturedProjects(locale: Locale): Promise<Project[]> {
  return (await getProjects(locale)).filter((p) => p.featured);
}

export async function getProject(slug: string, locale: Locale): Promise<ProjectWithBody | null> {
  return (await loadAll(locale)).find((p) => p.slug === slug) ?? null;
}

/** The project shown as "next" at the end of a case study. Wraps around. */
export async function getNextProject(slug: string, locale: Locale): Promise<Project | null> {
  const all = await getProjects(locale);
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1 || all.length < 2) return null;
  return all[(index + 1) % all.length];
}
