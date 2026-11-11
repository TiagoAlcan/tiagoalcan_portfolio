import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Section label in the `01 / contexto` format. */
export function MonoLabel({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("mono-label text-fg-muted", className)}>
      {index ? (
        <>
          <span className="text-brand">{index}</span>
          <span aria-hidden="true"> / </span>
        </>
      ) : null}
      {children}
    </p>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-edge px-2.5 py-0.5 font-mono text-[0.75rem] leading-5 text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-6 items-center justify-center rounded-md border border-edge bg-surface px-1.5 font-mono text-[0.72rem] leading-5 text-fg-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-(--radius-control) px-5 text-[0.95rem] font-semibold transition-[background-color,border-color,transform] duration-200 ease-(--ease-out-soft) active:translate-y-px";

export const buttonStyles = {
  primary: cn(buttonBase, "bg-action text-on-action hover:brightness-105"),
  secondary: cn(buttonBase, "border border-fg/40 text-fg hover:border-fg hover:bg-surface"),
  text: "inline-flex min-h-11 items-center gap-1.5 font-semibold text-fg underline decoration-brand decoration-2 underline-offset-[0.25em] hover:decoration-fg",
} as const;

/** Round icon button used in the header. 44 px target. */
export function IconButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full text-[1.15rem] text-fg transition-colors duration-200 hover:bg-surface",
        className,
      )}
      {...props}
    />
  );
}

/** Wraps a section with consistent rhythm. */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-16 md:py-24", className)} {...props} />;
}

export function StatusDot({ label, pulse = false, className }: { label: string; pulse?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-[0.75rem] text-fg-muted", className)}>
      <span aria-hidden="true" className={cn("size-2 rounded-full bg-action", pulse && "status-pulse")} />
      {label}
    </span>
  );
}
