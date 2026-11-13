"use client";

import { useLocale } from "next-intl";
import { useSyncExternalStore } from "react";

import type { Locale } from "@/i18n/routing";
import { quotes } from "@content/quotes";

const WINDOW_MS = 30 * 60 * 1000;

const currentSlot = () => Math.floor(Date.now() / WINDOW_MS);

/** Wakes up exactly when the clock crosses into the next half hour, so an open tab moves on too. */
function subscribe(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const arm = () => {
    timer = setTimeout(
      () => {
        onChange();
        arm();
      },
      WINDOW_MS - (Date.now() % WINDOW_MS) + 50,
    );
  };
  arm();
  // Timers are throttled in background tabs: catch up when the tab is looked at again.
  document.addEventListener("visibilitychange", onChange);
  return () => {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", onChange);
  };
}

/**
 * One line about computing, picked by the clock: the same for every visitor, a new one every 30 minutes.
 * The pages are prerendered, so the pick happens in the browser; the space is reserved to keep the footer still.
 */
export function FooterQuote() {
  const locale = useLocale() as Locale;
  const slot = useSyncExternalStore(subscribe, currentSlot, () => null);

  const index = slot === null ? null : slot % quotes.length;
  const quote = index === null ? null : quotes[index];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="mt-8 min-h-32 max-w-[40ch] md:min-h-36">
      {quote && index !== null ? (
        <figure key={index} className="border-l-2 border-edge pl-4 transition-opacity duration-500 starting:opacity-0">
          <blockquote className="text-[0.95rem] leading-relaxed text-fg-muted">
            <p>“{quote.text[locale]}”</p>
          </blockquote>
          <figcaption className="mt-2 flex items-baseline justify-between gap-4 font-mono text-[0.75rem] text-fg-muted">
            <span>— {quote.author}</span>
            <span aria-hidden="true">
              {pad(index + 1)}/{pad(quotes.length)}
            </span>
          </figcaption>
        </figure>
      ) : null}
    </div>
  );
}
