"use client";

import { useState } from "react";

import { Check, Copy, Mail } from "@/components/ui/icons";
import { Paper } from "@/components/ui/paper";
import { buttonStyles } from "@/components/ui/primitives";

type Labels = {
  title: string;
  hint: string;
  name: string;
  subject: string;
  message: string;
  subjectDefault: string;
  signature: string;
  send: string;
  copy: string;
  copied: string;
  empty: string;
};

const field =
  "mt-1.5 w-full rounded-(--radius-control) border border-ink/35 bg-white/35 px-3.5 py-2.5 font-normal text-ink placeholder:text-ink/45 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

/**
 * Lets a visitor write the email on the page, on a sheet of paper taped to it.
 * There is no backend: sending hands the finished message to the visitor's own
 * mail app through a mailto link.
 */
export function EmailComposer({
  email,
  labels,
}: {
  email: string;
  labels: Labels;
}) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "empty" | "copied">("idle");

  const body = name.trim()
    ? `${message.trim()}\n\n${labels.signature}\n${name.trim()}`
    : message.trim();
  const finalSubject = subject.trim() || labels.subjectDefault;

  const guard = () => {
    if (message.trim()) return true;
    setStatus("empty");
    return false;
  };

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    if (!guard()) return;
    setStatus("idle");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    if (!guard()) return;
    try {
      await navigator.clipboard.writeText(`${finalSubject}\n\n${body}`);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <Paper stock="paper" tape="top" tilt={0.6} seed="composer" className="px-6 pt-9 pb-6 text-ink md:px-8">
      <form onSubmit={send} noValidate>
      <h3 className="font-script text-[2rem] leading-none font-bold text-ink">
        {labels.title}
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-[0.9rem] font-medium">
          {labels.name}
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
          />
        </label>
        <label className="block text-[0.9rem] font-medium">
          {labels.subject}
          <input
            type="text"
            name="subject"
            value={subject}
            placeholder={labels.subjectDefault}
            onChange={(e) => setSubject(e.target.value)}
            className={field}
          />
        </label>
        <label className="block text-[0.9rem] font-medium sm:col-span-2">
          {labels.message}
          <textarea
            name="message"
            rows={6}
            required
            value={message}
            aria-invalid={status === "empty"}
            aria-describedby="composer-status composer-hint"
            onChange={(e) => {
              setMessage(e.target.value);
              if (status === "empty") setStatus("idle");
            }}
            className={`${field} resize-y`}
          />
        </label>
      </div>
      <p
        id="composer-status"
        role="status"
        aria-live="polite"
        className="mt-2 min-h-6 text-[0.9rem] font-semibold text-ink"
      >
        {status === "empty"
          ? labels.empty
          : status === "copied"
            ? labels.copied
            : ""}
      </p>
      <div className="mt-1 flex flex-wrap gap-3">
        <button
          type="submit"
          className={`${buttonStyles.primary} cursor-pointer`}
        >
          <Mail />
          {labels.send}
        </button>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-(--radius-control) border border-ink/45 px-5 text-[0.95rem] font-semibold text-ink transition-colors duration-200 hover:border-ink"
        >
          {status === "copied" ? <Check /> : <Copy />}
          {labels.copy}
        </button>
      </div>
      <p id="composer-hint" className="mt-4 text-[0.85rem] text-ink-soft">
        {labels.hint}
      </p>
      </form>
    </Paper>
  );
}
