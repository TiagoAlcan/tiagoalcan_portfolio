"use client";

import { useState } from "react";

import { Check, Copy } from "@/components/ui/icons";

export function CopyEmail({ email, labels }: { email: string; labels: { copy: string; copied: string; failed: string } }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2500);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-(--radius-control) border border-on-inverse/45 px-5 text-[0.95rem] font-semibold text-on-inverse transition-colors duration-200 hover:border-on-inverse"
      >
        {state === "copied" ? <Check /> : <Copy />}
        {state === "copied" ? labels.copied : labels.copy}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? labels.copied : state === "failed" ? labels.failed : ""}
      </span>
    </>
  );
}
