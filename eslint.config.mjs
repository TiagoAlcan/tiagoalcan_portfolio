import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Vendored annotation layer (Looseleaf, MIT). Kept as published so it can be updated from the registry.
    "src/lib/ink/**",
    "src/hooks/use-live-motion.ts",
    "src/hooks/use-mark-ink.tsx",
    "src/hooks/use-paper-object.ts",
    "src/components/ui/{arrow,circled,doodle,handwritten,highlight,marquee,paper,polaroid,squiggle,stamp,sticky-note,tape,typewriter,underline}.tsx",
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
