import { z } from "zod";

export const TRACKS = ["software", "devops", "data", "ai"] as const;
export const trackSchema = z.enum(TRACKS);
export type Track = z.infer<typeof trackSchema>;

export const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(180),
  outcome: z.string().min(1).max(90),
  tracks: z.array(trackSchema).min(1),
  status: z.enum(["done", "in-progress"]),
  role: z.string().min(1),
  period: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  featured: z.boolean().default(false),
  order: z.number().int(),
  /** A path under /public, or `art:<motif>` for a cover drawn with the palette. */
  cover: z.string().min(1),
  coverAlt: z.string().min(1),
  video: z.object({ src: z.string(), poster: z.string(), captions: z.string() }).optional(),
  links: z.array(z.object({ label: z.string().min(1), href: z.url() })).default([]),
  confidential: z.boolean().default(false),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;
export type Project = ProjectFrontmatter & { slug: string };
export type ProjectWithBody = Project & { body: string };

/** True when `value` is one of the four tracks. Used to read the filter from the URL. */
export function isTrack(value: unknown): value is Track {
  return typeof value === "string" && (TRACKS as readonly string[]).includes(value);
}
