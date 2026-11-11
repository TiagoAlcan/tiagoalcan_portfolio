"use client";

import { useState, type ReactNode } from "react";

import { Pause, Play } from "@/components/ui/icons";
import { Marquee } from "@/components/ui/marquee";

/** The technology ticker with a pause button big enough to tap, labelled in the page language. */
export function StackTicker({ label, pause, play, children }: { label: string; pause: string; play: string; children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Marquee label={label} speed={42} tape="masking" controls={false} paused={paused} className="min-w-0 flex-1 text-(--deep)">
        {children}
      </Marquee>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((v) => !v)}
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-fg/40 px-4 font-mono text-[0.8rem] text-fg transition-colors duration-200 hover:border-fg hover:bg-surface sm:self-auto"
      >
        {paused ? <Play /> : <Pause />}
        {paused ? play : pause}
      </button>
    </div>
  );
}
