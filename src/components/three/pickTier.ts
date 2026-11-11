export type Tier = "high" | "low" | "static";

export type TierEnv = {
  reducedMotion: boolean;
  webgl: boolean;
  saveData: boolean;
  cores: number;
  coarsePointer: boolean;
};

/**
 * Decides how much 3D the hero gets. Pure, so every combination is unit tested.
 * docs/03-design-patterns.md, pattern 5.
 */
export function pickTier(env: TierEnv): Tier {
  if (env.reducedMotion || !env.webgl || env.saveData) return "static";
  if (env.coarsePointer || env.cores <= 4) return "low";
  return "high";
}
