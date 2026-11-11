import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Reads a browser-only value without a hydration mismatch: the server (and the
 * first client render) get `fallback`, the hydrated client gets `read()`.
 */
export function useClientValue<T>(read: () => T, fallback: T): T {
  return useSyncExternalStore(subscribe, read, () => fallback);
}
