"use client";

import { useEffect } from "react";

const PENDING = "[data-reveal]:not([data-reveal='in'])";

/**
 * Marks `[data-reveal]` elements as visible once they enter the viewport.
 * Without JavaScript the attribute has no effect and everything is simply there.
 *
 * This lives in the layout, which stays mounted across client-side navigations, so it
 * also watches the DOM: elements a new page brings in are picked up as they are inserted.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      const show = () => document.querySelectorAll(PENDING).forEach((n) => n.setAttribute("data-reveal", "in"));
      show();
      const mo = new MutationObserver(show);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    // Observing an element twice is a no-op, so re-scanning is safe.
    const scan = () => document.querySelectorAll(PENDING).forEach((n) => io.observe(n));
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
  return null;
}
