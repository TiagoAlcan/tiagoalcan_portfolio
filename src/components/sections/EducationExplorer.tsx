"use client";

import { useId, useState } from "react";

import { ArrowUpRight } from "@/components/ui/icons";
import { Paper } from "@/components/ui/paper";
import { Stamp } from "@/components/ui/stamp";
import { buttonStyles } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export type EducationProgram = {
  id: string;
  school: string;
  title: string;
  period: string;
  detail: string;
  inProgress: boolean;
  link?: { label: string; href: string };
  /** The curriculum, in one or more groups. `ordered` marks a real sequence (phases, modules). */
  curriculum: {
    ordered: boolean;
    groups: { label?: string; items: { title: string; note?: string }[] }[];
  };
  learned: string[];
};

type Labels = {
  open: string;
  close: string;
  curriculum: string;
  learned: string;
  external: string;
  inProgress: string;
  stampInProgress: string;
};

/** The three programs as selectable cards; the chosen one unfolds its curriculum underneath. */
export function EducationExplorer({
  programs,
  labels,
  cardClassName,
}: {
  programs: EducationProgram[];
  labels: Labels;
  cardClassName?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const base = useId();
  const open = programs.find((p) => p.id === openId) ?? null;

  return (
    <div>
      <ul className="grid gap-5 lg:grid-cols-3">
        {programs.map((program) => {
          const selected = program.id === openId;
          return (
            <li key={program.id} className="relative flex">
              <button
                type="button"
                aria-expanded={selected}
                aria-controls={`${base}-panel`}
                onClick={() => setOpenId(selected ? null : program.id)}
                className={cn(
                  "group flex w-full cursor-pointer flex-col rounded-(--radius-card) border p-6 text-left transition-[border-color,box-shadow] duration-200",
                  selected
                    ? "border-action shadow-[0_0_0_1px_var(--action-bg)]"
                    : "border-edge hover:border-fg/50",
                  cardClassName,
                )}
              >
                <span className="font-mono text-[0.8rem] text-fg-muted">
                  {program.school}
                </span>
                <span className="mt-2 font-display text-h3 text-heading">
                  {program.title}
                </span>
                <span className="mt-2 font-mono text-[0.8rem] text-fg-muted">
                  {program.period}
                </span>
                <span className="mt-3 text-[0.95rem]">{program.detail}</span>
                <span className="mt-auto flex items-center gap-2 pt-5 text-[0.95rem] font-semibold text-fg underline decoration-brand decoration-2 underline-offset-[0.25em]">
                  <svg
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={cn(
                      "transition-transform duration-200",
                      selected && "rotate-180",
                    )}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  {selected ? labels.close : labels.open}
                </span>
              </button>
              {program.inProgress ? (
                <Stamp
                  text={labels.stampInProgress}
                  label={labels.inProgress}
                  tilt={7}
                  seed={program.id}
                  className="absolute -top-4 -right-1 h-auto w-28 text-brand"
                />
              ) : null}
            </li>
          );
        })}
      </ul>

      <div
        id={`${base}-panel`}
        role="region"
        aria-live="polite"
        aria-label={open ? open.title : undefined}
      >
        {open ? (
          <div
            key={open.id}
            className="education-panel mt-5 grid gap-10 rounded-(--radius-card) border border-action/60 p-6 md:p-8 lg:grid-cols-[1.5fr_1fr]"
          >
            <div>
              <h3 className="text-h3 text-heading">{labels.curriculum}</h3>
              <div
                className={cn(
                  "mt-5 grid gap-7",
                  open.curriculum.groups.length > 1 && "sm:grid-cols-2",
                )}
              >
                {open.curriculum.groups.map((group, g) => {
                  const List = open.curriculum.ordered ? "ol" : "ul";
                  return (
                    <div key={group.label ?? g}>
                      {group.label ? (
                        <p className="font-semibold">{group.label}</p>
                      ) : null}
                      <List className={cn(group.items.length > 8 ? "gap-x-8 sm:columns-2 [&>li]:mb-2.5 [&>li]:break-inside-avoid" : "grid gap-2.5", group.label && "mt-2")}>
                        {group.items.map((item, i) => (
                          <li
                            key={item.title}
                            className={cn(
                              "text-[0.95rem]",
                              open.curriculum.ordered &&
                                "grid grid-cols-[2rem_1fr] gap-2",
                            )}
                          >
                            {open.curriculum.ordered ? (
                              <span className="font-mono text-[0.8rem] leading-6 text-brand">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            ) : null}
                            <span>
                              <span className={cn(item.note && "font-medium")}>
                                {item.title}
                              </span>
                              {item.note ? (
                                <span className="block text-[0.88rem] text-fg-muted">
                                  {item.note}
                                </span>
                              ) : null}
                            </span>
                          </li>
                        ))}
                      </List>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <Paper
                stock="paper"
                tape="corner"
                seed={`learned-${open.id}`}
                className="px-6 pt-7 pb-6 text-ink"
              >
                <h3 className="font-script text-[1.9rem] leading-none font-bold text-ink">
                  {labels.learned}
                </h3>
                <ul className="mt-4 grid gap-3">
                  {open.learned.map((line) => (
                    <li
                      key={line}
                      className="grid grid-cols-[1rem_1fr] text-[0.95rem] leading-snug"
                    >
                      <span aria-hidden="true">–</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </Paper>
              {open.link ? (
                <a
                  href={open.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${buttonStyles.text} mt-6 text-[0.95rem]`}
                >
                  {open.link.label}
                  <ArrowUpRight />
                  <span className="sr-only">({labels.external})</span>
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
