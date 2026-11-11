import type { Track } from "@/lib/content/schema";

/**
 * The one piece of state shared between the track buttons and the hero graph:
 * which region should light up. A module-level store keeps both islands
 * independent without a global state library.
 */
let current: Track | null = null;
const listeners = new Set<() => void>();

export const highlightStore = {
  get: () => current,
  set(next: Track | null) {
    if (next === current) return;
    current = next;
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
