import { getLocale } from "next-intl/server";

import { StickyNote, StickyNoteContent, StickyNoteTitle } from "@/components/ui/sticky-note";
import type { Locale } from "@/i18n/routing";
import { curiosities } from "@content/site";

const COLORS = ["yellow", "orange", "green", "yellow", "orange"] as const;

/** The `man curiosity` block of the README, as notes stuck to the page. */
export async function Curiosities() {
  const locale = (await getLocale()) as Locale;
  return (
    <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {curiosities.map((item, i) => (
        <li key={i} data-reveal>
          <StickyNote color={COLORS[i]} seed={`curiosity-${i}`} className="h-full w-full">
            <StickyNoteTitle className="text-[1.3rem] leading-tight">{item.title[locale]}</StickyNoteTitle>
            <StickyNoteContent className="text-[1.125rem] leading-snug">{item.body[locale]}</StickyNoteContent>
          </StickyNote>
        </li>
      ))}
    </ul>
  );
}
