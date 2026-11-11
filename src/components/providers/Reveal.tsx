"use client";

import { useEffect } from "react";

/**
 * Marks `[data-reveal]` elements as visible once they enter the viewport.
 * Without JavaScript the attribute has no effect and everything is simply there.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal='in'])");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.setAttribute("data-reveal", "in"));
      return;
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
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
  return null;
}
