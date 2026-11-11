"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { InkProvider } from "@/lib/ink/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <InkProvider>{children}</InkProvider>
    </ThemeProvider>
  );
}
