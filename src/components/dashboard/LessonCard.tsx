"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Landmark,
  Lock,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { RoadmapSummary } from "@/content";
import type { Phase } from "@/content/types";
import { useProgress } from "@/lib/progress";

const stepLabels = [
  { key: "racconto", label: "Racconto" },
  { key: "grammatica", label: "Grammatica" },
  { key: "dialogo", label: "Dialogo" },
] as const;

const accentRing: Record<Phase["accent"], string> = {
  terracotta: "text-terracotta-600 bg-terracotta-50 border-terracotta-200",
  oliva: "text-oliva-700 bg-oliva-50 border-oliva-200",
  indigo: "text-oro-500 bg-oro-300/20 border-oro-300",
};

export function LessonCard({
  entry,
  accent,
  index,
}: {
  entry: RoadmapSummary;
  accent: Phase["accent"];
  index: number;
}) {
  const { lessonProgress } = useProgress();
  const progress = lessonProgress(entry.slug);
  const done = progress.completed;

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={`cifre flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg font-semibold ${accentRing[accent]}`}
        >
          {entry.number}
        </span>
        <div className="flex items-center gap-1.5">
          {entry.published ? (
            done ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-oliva-100 px-2 py-0.5 text-[11px] font-semibold text-oliva-700">
                <CheckCircle2 className="h-3 w-3" aria-hidden /> completata
              </span>
            ) : progress.steps.length > 0 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-terracotta-50 px-2 py-0.5 text-[11px] font-semibold text-terracotta-600">
                {progress.steps.length}/3 Schritte
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-marmo-200 px-2 py-0.5 text-[11px] font-medium text-inchiostro-400">
                <Sparkles className="h-3 w-3" aria-hidden /> neu
              </span>
            )
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-marmo-200 px-2 py-0.5 text-[11px] font-medium text-inchiostro-400">
              <Lock className="h-3 w-3" aria-hidden /> in arrivo
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-inchiostro-800">
        {entry.title}
      </h3>
      <p className="mt-0.5 text-sm text-inchiostro-500">{entry.subtitle}</p>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-inchiostro-400">
        {entry.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-inchiostro-400">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" aria-hidden />
          {entry.location}
        </span>
        {entry.minutes !== null && (
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3 w-3" aria-hidden />
            {entry.minutes} Min.
          </span>
        )}
        {entry.published && (
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3 w-3" aria-hidden />
            {entry.vocabCount} Vokabeln · {entry.quizCount} Aufgaben
          </span>
        )}
      </div>

      {entry.unesco && (
        <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-oro-300/15 px-2.5 py-2 text-[11px] leading-relaxed text-inchiostro-500">
          <Landmark className="mt-px h-3 w-3 shrink-0 text-oro-500" aria-hidden />
          {entry.unesco}
        </p>
      )}

      {entry.published && (
        <div className="mt-4 flex items-center gap-1.5 border-t border-marmo-200 pt-3">
          {stepLabels.map((step) => {
            const finished = progress.steps.includes(step.key);
            return (
              <span
                key={step.key}
                className={`flex-1 rounded-full px-2 py-1 text-center text-[10px] font-medium uppercase tracking-wider ${
                  finished ? "bg-oliva-100 text-oliva-700" : "bg-marmo-200 text-inchiostro-400"
                }`}
              >
                {step.label}
              </span>
            );
          })}
          <ArrowRight className="ml-1 h-4 w-4 shrink-0 text-terracotta-500 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </div>
      )}
    </>
  );

  const shell =
    "group flex h-full flex-col rounded-2xl border p-5 text-left transition-shadow";

  if (!entry.published) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.04 }}
        className={`${shell} border-dashed border-marmo-300 bg-marmo-50/50`}
        aria-label={`${entry.title} — noch nicht verfügbar`}
      >
        {body}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.04 }}
      className="h-full"
    >
      <Link
        href={`/lezioni/${entry.slug}`}
        className={`${shell} border-marmo-300 bg-marmo-50 shadow-carta hover:shadow-rilievo`}
      >
        {body}
      </Link>
    </motion.div>
  );
}
