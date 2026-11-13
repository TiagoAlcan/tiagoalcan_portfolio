"use client";

import type { ReactNode } from "react";

import { Link, usePathname } from "@/i18n/navigation";

/**
 * The brand link in the header. From any page it goes home, landing on the hero.
 * Already on the home page the URL does not change, so the router would leave the scroll where it is:
 * scroll back up to the hero by hand.
 */
export function HomeLink({ children, ...props }: { children: ReactNode; className?: string; "aria-label"?: string }) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      onClick={(event) => {
        // Leave modified clicks (new tab, new window) to the browser.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (pathname === "/") window.scrollTo({ top: 0 });
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
