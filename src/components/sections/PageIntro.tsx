import type { ReactNode } from "react";

import { MonoLabel } from "@/components/ui/primitives";

export function PageIntro({ label, title, lead, children }: { label: string; title: ReactNode; lead?: string; children?: ReactNode }) {
  return (
    <header className="dot-grid border-b border-edge">
      <div className="shell py-14 md:py-20">
        <MonoLabel>{label}</MonoLabel>
        <h1 className="mt-3 text-h1 text-heading">{title}</h1>
        {lead ? <p className="measure mt-5 text-body-lg text-fg">{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}
