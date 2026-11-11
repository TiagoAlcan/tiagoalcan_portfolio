import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";

import { buildGraph } from "@/components/three/graph";
import { commands } from "@/components/command-palette/commands";
import { isTrack, projectSchema } from "@/lib/content/schema";
import en from "../messages/en.json";
import pt from "../messages/pt-BR.json";

const root = path.join(__dirname, "..", "content", "projects");
const slugs = fs.readdirSync(root).filter((d) => fs.statSync(path.join(root, d)).isDirectory());
const locales = ["pt-BR", "en"] as const;
const read = (slug: string, locale: string) => matter(fs.readFileSync(path.join(root, slug, `${locale}.mdx`), "utf8"));

const keys = (obj: object, prefix = ""): string[] =>
  Object.entries(obj).flatMap(([k, v]) => (v && typeof v === "object" ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]));

describe("project content", () => {
  it("has the eight planned projects", () => {
    expect(slugs).toHaveLength(11);
  });

  it.each(slugs)("%s has valid frontmatter in both languages", (slug) => {
    for (const locale of locales) {
      const parsed = projectSchema.safeParse(read(slug, locale).data);
      expect(parsed.success, `${slug}/${locale}: ${parsed.success ? "" : JSON.stringify(parsed.error.issues)}`).toBe(true);
    }
  });

  it.each(slugs)("%s keeps language-independent fields in sync", (slug) => {
    const a = read(slug, "pt-BR").data;
    const b = read(slug, "en").data;
    for (const field of ["tracks", "status", "featured", "order", "cover", "confidential"]) expect(a[field]).toEqual(b[field]);
  });

  it("gives every project a unique order", () => {
    const orders = slugs.map((s) => read(s, "en").data.order);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it("never mentions a phone number or WhatsApp", () => {
    for (const slug of slugs)
      for (const locale of locales) {
        const text = fs.readFileSync(path.join(root, slug, `${locale}.mdx`), "utf8");
        expect(text).not.toMatch(/whatsapp|wa\.me|\(\d{2}\)\s?9?\d{4}-?\d{4}/i);
      }
  });
});

describe("schema", () => {
  it("rejects a summary longer than 180 characters", () => {
    const data = { ...read(slugs[0], "en").data, summary: "x".repeat(181) };
    expect(projectSchema.safeParse(data).success).toBe(false);
  });

  it("rejects an unknown track", () => {
    const data = { ...read(slugs[0], "en").data, tracks: ["blockchain"] };
    expect(projectSchema.safeParse(data).success).toBe(false);
  });

  it("recognises tracks read from the URL", () => {
    expect(isTrack("devops")).toBe(true);
    expect(isTrack("DevOps")).toBe(false);
    expect(isTrack(null)).toBe(false);
  });
});

describe("messages", () => {
  it("has the same keys in both languages", () => {
    expect(keys(pt).sort()).toEqual(keys(en).sort());
  });

  it("has a label for every palette command", () => {
    for (const command of commands) {
      expect(pt.palette).toHaveProperty(command.labelKey);
      expect(en.palette).toHaveProperty(command.labelKey);
    }
  });

  it("has unique command ids", () => {
    expect(new Set(commands.map((c) => c.id)).size).toBe(commands.length);
  });
});

describe("hero graph", () => {
  it("is deterministic, so server SVG and client canvas match", () => {
    expect(buildGraph(9)).toEqual(buildGraph(9));
  });

  it("only links existing, distinct nodes", () => {
    const g = buildGraph(9);
    expect(g.nodes).toHaveLength(36);
    for (const [a, b] of g.edges) {
      expect(a).not.toBe(b);
      expect(g.nodes[a]).toBeDefined();
      expect(g.nodes[b]).toBeDefined();
    }
  });
});
