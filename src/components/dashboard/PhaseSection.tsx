"use client";

import { Target } from "lucide-react";
import type { Phase } from "@/content/types";
import type { RoadmapSummary } from "@/content";
import { useProgress } from "@/lib/progress";
import { LessonCard } from "./LessonCard";

const accentText: Record<Phase["accent"], string> = {
  terracotta: "text-terracotta-600",
  oliva: "text-oliva-600",
  indigo: "text-oro-500",
};

const accentBg: Record<Phase["accent"], string> = {
  terracotta: "bg-terracotta-500",
  oliva: "bg-oliva-500",
  indigo: "bg-oro-400",
};

export function PhaseSection({
  phase,
  entries,
}: {
  phase: Phase;
  entries: RoadmapSummary[];
}) {
  const { lessonProgress } = useProgress();
  const done = entries.filter((entry) => lessonProgress(entry.slug).completed).length;
  const percent = entries.length === 0 ? 0 : Math.round((done / entries.length) * 100);

  return (
    <section id={`fase-${phase.romanNumeral.toLowerCase()}`} className="scroll-mt-24">
      <div className="flex flex-col gap-5 rounded-3xl border border-marmo-300 bg-marmo-50/70 p-5 sm:flex-row sm:items-start sm:gap-8 sm:p-7">
        <div className="flex items-center gap-4 sm:block">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-semibold text-marmo-50 shadow-carta ${accentBg[phase.accent]}`}
          >
            {phase.romanNumeral}
          </span>
          <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.2em] text-inchiostro-400">
            {phase.code}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-display text-2xl font-semibold text-inchiostro-800 sm:text-3xl">
            {phase.italianTitle}
            <span className="ml-2 font-sans text-sm font-normal text-inchiostro-400">
              {phase.title}
            </span>
          </h2>
          <p className={`mt-0.5 text-sm font-medium ${accentText[phase.accent]}`}>
            {phase.subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-inchiostro-500">
            {phase.description}
          </p>

          <ul className="mt-4 grid gap-1.5 sm:grid-cols-3">
            {phase.goals.map((goal) => (
              <li
                key={goal}
                className="flex items-start gap-1.5 rounded-lg bg-marmo-100 px-2.5 py-2 text-xs leading-relaxed text-inchiostro-500"
              >
                <Target className={`mt-0.5 h-3 w-3 shrink-0 ${accentText[phase.accent]}`} aria-hidden />
                {goal}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:w-32 sm:shrink-0 sm:text-right">
          <p className="cifre text-3xl font-semibold text-inchiostro-800">
            {percent}%
          </p>
          <p className="text-[11px] text-inchiostro-400">
            {done}/{entries.length} Lektionen
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-marmo-200">
            <div
              className={`h-full rounded-full transition-[width] duration-700 ${accentBg[phase.accent]}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry, index) => (
          <LessonCard key={entry.slug} entry={entry} accent={phase.accent} index={index} />
        ))}
      </div>
    </section>
  );
}
