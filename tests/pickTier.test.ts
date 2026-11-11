import { describe, expect, it } from "vitest";

import { pickTier, type TierEnv } from "@/components/three/pickTier";

const base: TierEnv = { reducedMotion: false, webgl: true, saveData: false, cores: 8, coarsePointer: false };

describe("pickTier", () => {
  it("gives a capable desktop the full graph", () => {
    expect(pickTier(base)).toBe("high");
  });

  it.each([
    ["reduced motion", { reducedMotion: true }],
    ["no WebGL", { webgl: false }],
    ["data saver", { saveData: true }],
  ] as const)("falls back to the static graph with %s", (_, override) => {
    expect(pickTier({ ...base, ...override })).toBe("static");
  });

  it.each([
    ["a touch device", { coarsePointer: true }],
    ["four cores", { cores: 4 }],
    ["two cores", { cores: 2 }],
  ] as const)("uses the low tier on %s", (_, override) => {
    expect(pickTier({ ...base, ...override })).toBe("low");
  });

  it("lets static win over low", () => {
    expect(pickTier({ ...base, coarsePointer: true, cores: 2, reducedMotion: true })).toBe("static");
  });

  it("covers every combination without throwing", () => {
    for (const reducedMotion of [true, false])
      for (const webgl of [true, false])
        for (const saveData of [true, false])
          for (const coarsePointer of [true, false])
            for (const cores of [1, 4, 5, 16]) {
              const tier = pickTier({ reducedMotion, webgl, saveData, coarsePointer, cores });
              const mustBeStatic = reducedMotion || !webgl || saveData;
              expect(tier === "static").toBe(mustBeStatic);
              if (!mustBeStatic) expect(tier).toBe(coarsePointer || cores <= 4 ? "low" : "high");
            }
  });
});
