"use client";

import { motion } from "framer-motion";
import { Flame, GraduationCap, Layers3, Sparkle } from "lucide-react";
import type { Phase } from "@/content/types";
import type { RoadmapSummary } from "@/content";
import { useProgress } from "@/lib/progress";

interface Props {
  phases: Phase[];
  summaries: RoadmapSummary[];
  totalVocabulary: number;
}

const accentBar: Record<Phase["accent"], string> = {
  terracotta: "bg-terracotta-500",
  oliva: "bg-oliva-500",
  indigo: "bg-oro-500",
};

const accentSoft: Record<Phase["accent"], string> = {
  terracotta: "bg-terracotta-100",
  oliva: "bg-oliva-100",
  indigo: "bg-oro-300/40",
};

/** Die Fortschrittsleiste über alle drei Phasen — das Herz des Dashboards. */
export function ProgressOverview({ phases, summaries, totalVocabulary }: Props) {
  const { lessonProgress, cards } = useProgress();

  const perPhase = phases.map((phase) => {
    const entries = summaries.filter((entry) => entry.phase === phase.code);
    const available = entries.filter((entry) => entry.published);
    const done = available.filter((entry) => lessonProgress(entry.slug).completed).length;
    const started = available.filter(
      (entry) => lessonProgress(entry.slug).steps.length > 0,
    ).length;
    return {
      phase,
      total: entries.length,
      available: available.length,
      done,
      started,
      percent: entries.length === 0 ? 0 : Math.round((done / entries.length) * 100),
    };
  });

  const totalLessons = summaries.length;
  const totalDone = perPhase.reduce((sum, item) => sum + item.done, 0);
  const overall = totalLessons === 0 ? 0 : Math.round((totalDone / totalLessons) * 100);

  const reviewedCards = Object.values(cards).filter((card) => card.repetitions > 0).length;
  const bestScores = summaries
    .filter((entry) => entry.published)
    .map((entry) => lessonProgress(entry.slug))
    .filter((progress) => progress.quizTotal > 0);
  const quizAverage =
    bestScores.length === 0
      ? null
      : Math.round(
          (bestScores.reduce(
            (sum, progress) => sum + progress.bestQuizScore / progress.quizTotal,
            0,
          ) /
            bestScores.length) *
            100,
        );

  return (
    <section
      aria-label="Dein Fortschritt"
      className="rounded-3xl border border-marmo-300 bg-marmo-50/90 p-5 shadow-carta sm:p-7"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-600">
            Il Percorso
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-inchiostro-800 sm:text-3xl">
            Drei Phasen, ein Weg
          </h2>
        </div>
        <div className="text-right">
          <p className="cifre text-4xl font-semibold leading-none text-terracotta-600">
            {overall}%
          </p>
          <p className="text-xs text-inchiostro-400">
            {totalDone} von {totalLessons} Lektionen
          </p>
        </div>
      </div>

      {/* Gesamtleiste, in drei Phasen unterteilt */}
      <div className="mt-6 flex gap-1.5" role="img" aria-label={`Gesamtfortschritt ${overall} Prozent`}>
        {perPhase.map((item) => (
          <div key={item.phase.code} className="flex-1">
            <div className={`h-2.5 w-full overflow-hidden rounded-full ${accentSoft[item.phase.accent]}`}>
              <motion.div
                className={`h-full rounded-full ${accentBar[item.phase.accent]}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.percent}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <span className="font-display text-sm font-semibold text-inchiostro-700">
                {item.phase.romanNumeral}. {item.phase.italianTitle}
              </span>
              <span className="text-[11px] tabular-nums text-inchiostro-400">
                {item.done}/{item.total}
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-wider text-inchiostro-400">
              {item.phase.code}
            </p>
          </div>
        ))}
      </div>

      <dl className="mt-7 grid grid-cols-2 gap-3 border-t border-marmo-200 pt-5 sm:grid-cols-4">
        <Stat
          Icon={Layers3}
          label="Lektionen offen"
          value={`${perPhase.reduce((sum, item) => sum + item.available, 0) - totalDone}`}
          hint="fertig ausgearbeitet"
        />
        <Stat
          Icon={Flame}
          label="Angefangen"
          value={`${perPhase.reduce((sum, item) => sum + item.started, 0)}`}
          hint="mindestens ein Schritt"
        />
        <Stat
          Icon={Sparkle}
          label="Karten geübt"
          value={`${reviewedCards}/${totalVocabulary}`}
          hint="Spaced Repetition"
        />
        <Stat
          Icon={GraduationCap}
          label="Quiz-Schnitt"
          value={quizAverage === null ? "—" : `${quizAverage}%`}
          hint="beste Versuche"
        />
      </dl>
    </section>
  );
}

function Stat({
  Icon,
  label,
  value,
  hint,
}: {
  Icon: typeof Flame;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl bg-marmo-100/70 px-3 py-3">
      <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-inchiostro-400">
        <Icon className="h-3.5 w-3.5 text-terracotta-500" aria-hidden />
        {label}
      </dt>
      <dd className="cifre mt-1 text-xl font-semibold text-inchiostro-800">
        {value}
      </dd>
      <p className="text-[11px] text-inchiostro-400">{hint}</p>
    </div>
  );
}
