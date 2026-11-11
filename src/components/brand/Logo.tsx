import { cn } from "@/lib/utils";
import { ACTIVE_MARK, marks, type MarkId } from "./marks";

type MarkProps = { id?: MarkId; className?: string; title?: string };

/** The brand mark alone. Decorative unless `title` is given. */
export function LogoMark({ id = ACTIVE_MARK, className, title }: MarkProps) {
  const mark = marks[id];
  return (
    <svg
      viewBox={mark.viewBox}
      className={cn("block h-8 w-auto", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: mark.inner }}
    />
  );
}

/** Mark plus the name, for the header and footer. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-7" />
      <span className="font-display text-[1.15rem] leading-none font-medium tracking-tight">Tiago Alcan</span>
    </span>
  );
}
