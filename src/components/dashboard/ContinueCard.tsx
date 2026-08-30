"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, RotateCcw } from "lucide-react";
import type { RoadmapSummary } from "@/content";
import { useProgress } from "@/lib/progress";

/** Springt dorthin zurück, wo zuletzt gearbeitet wurde — oder startet Lektion 1. */
export function ContinueCard({ summaries }: { summaries: RoadmapSummary[] }) {
  const { lessons: lessonState, lessonProgress, resetProgress } = useProgress();
  const available = summaries.filter((entry) => entry.published);

  const lastTouched = available
    .filter((entry) => lessonProgress(entry.slug).steps.length > 0)
    .sort(
      (a, b) =>
        new Date(lessonProgress(b.slug).lastVisitedAt).getTime() -
        new Date(lessonProgress(a.slug).lastVisitedAt).getTime(),
    )[0];

  const next =
    available.find((entry) => !lessonProgress(entry.slug).completed) ?? available[0];
  const target = lastTouched && !lessonProgress(lastTouched.slug).completed ? lastTouched : next;
  const hasHistory = Object.keys(lessonState).length > 0;

  if (!target) return null;

  const progress = lessonProgress(target.slug);
  const resuming = progress.steps.length > 0;

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-terracotta-200 bg-gradient-to-br from-terracotta-50 to-marmo-50 p-5 shadow-carta sm:flex-row sm:items-center sm:p-6">
      <PlayCircle className="h-9 w-9 shrink-0 text-terracotta-500" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-600">
          {resuming ? "Weiter geht's" : "Hier beginnt es"}
        </p>
        <p className="mt-0.5 font-display text-xl font-semibold text-inchiostro-800">
          Lektion {target.number} · {target.title}
        </p>
        <p className="text-sm text-inchiostro-500">
          {resuming
            ? `${progress.steps.length} von 3 Schritten erledigt · ${target.subtitle}`
            : target.subtitle}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {hasHistory && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Wirklich den gesamten Lernfortschritt löschen?")) {
                resetProgress();
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-marmo-300 bg-marmo-50 px-3 py-2 text-xs font-medium text-inchiostro-400 transition-colors hover:bg-marmo-200 hover:text-inchiostro-600"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Zurücksetzen
          </button>
        )}
        <Link
          href={`/lezioni/${target.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-semibold text-marmo-50 shadow-carta transition-colors hover:bg-terracotta-600"
        >
          {resuming ? "Fortsetzen" : "Starten"}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
