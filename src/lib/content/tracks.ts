import type { Locale } from "@/i18n/routing";
import { tracks } from "@content/site";
import { TRACKS, type Track } from "./schema";

export type TrackCopy = Record<Track, { label: string; tagline: string }>;

/** Track labels and taglines for one locale, in a shape client components can receive. */
export function trackCopyFor(locale: Locale): TrackCopy {
  return Object.fromEntries(TRACKS.map((k) => [k, { label: tracks[k].label[locale], tagline: tracks[k].tagline[locale] }])) as TrackCopy;
}
