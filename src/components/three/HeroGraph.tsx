"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { pickTier, type Tier } from "./pickTier";

type CanvasProps = { tier: Exclude<Tier, "static">; active: boolean; themeKey: string; onSlow: () => void };

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Mounts the 3D graph on top of its static version, after the page is idle.
 * `children` is the server-rendered SVG: it is what paints first and what
 * stays when the device, the user's settings or the frame rate say no.
 */
export function HeroGraph({ children, className }: { children: ReactNode; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<Tier>("static");
  const [Canvas, setCanvas] = useState<ComponentType<CanvasProps> | null>(null);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const chosen = pickTier({
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      webgl: hasWebGL(),
      saveData: Boolean(connection?.saveData),
      cores: navigator.hardwareConcurrency ?? 4,
      coarsePointer: window.matchMedia("(pointer: coarse)").matches,
    });
    if (chosen === "static") return;

    let cancelled = false;
    const load = () =>
      import("./HeroGraphCanvas").then((mod) => {
        if (cancelled) return;
        setTier(chosen);
        setCanvas(() => mod.default);
        // One frame later so the fade-in has a starting state.
        requestAnimationFrame(() => setReady(true));
      });
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 2500 })
      : window.setTimeout(load, 600);
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  // Pause when the hero leaves the screen or the tab loses focus.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let onScreen = true;
    const update = () => setActive(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const live = Canvas !== null && tier !== "static";

  return (
    <div ref={host} aria-hidden="true" className={cn("pointer-events-none", className)}>
      <div className={cn("absolute inset-0 transition-opacity duration-700", live && ready ? "opacity-0" : "opacity-100")}>{children}</div>
      {live ? (
        <div className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}>
          <Canvas tier={tier as Exclude<Tier, "static">} active={active} themeKey={resolvedTheme ?? "system"} onSlow={() => setTier("static")} />
        </div>
      ) : null}
    </div>
  );
}
