"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ClipboardCheck,
  Clock3,
  Landmark,
  Languages,
  ListChecks,
  MapPin,
  MessageSquareQuote,
  Mic,
} from "lucide-react";
import type { Lesson, LessonStep, Phase } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { RaccontoStep } from "./RaccontoStep";
import { GrammaticaStep } from "./GrammaticaStep";
import { DialogoStep } from "./DialogoStep";
import { ShadowingTrainer } from "./ShadowingTrainer";
import { VocabularyTable } from "./VocabularyTable";
import { QuizEngine } from "./QuizEngine";

type TabKey = LessonStep | "pronuncia" | "vocabolario" | "esercizi";

const tabs: {
  key: TabKey;
  label: string;
  german: string;
  Icon: typeof BookOpen;
  counts: boolean;
}[] = [
  { key: "racconto", label: "Il Racconto", german: "Kultur & Text", Icon: BookOpen, counts: true },
  {
    key: "grammatica",
    label: "Grammatica Viva",
    german: "Regeln im Vergleich",
    Icon: Languages,
    counts: true,
  },
  {
    key: "dialogo",
    label: "Dialogo Reale",
    german: "Rollenspiel",
    Icon: MessageSquareQuote,
    counts: true,
  },
  { key: "pronuncia", label: "Pronuncia", german: "Shadowing", Icon: Mic, counts: false },
  {
    key: "vocabolario",
    label: "Vocabolario",
    german: "Wortschatz",
    Icon: ListChecks,
    counts: false,
  },
  {
    key: "esercizi",
    label: "Esercizi",
    german: "Quiz",
    Icon: ClipboardCheck,
    counts: false,
  },
];

const stepOrder: LessonStep[] = ["racconto", "grammatica", "dialogo"];

export function LessonShell({ lesson, phase }: { lesson: Lesson; phase: Phase }) {
  const { lessonProgress, markStep, markVisited } = useProgress();
  const [tab, setTab] = useState<TabKey>("racconto");
  const progress = lessonProgress(lesson.slug);

  useEffect(() => {
    markVisited(lesson.slug);
  }, [lesson.slug, markVisited]);

  const currentStepIndex = stepOrder.indexOf(tab as LessonStep);
  const isStep = currentStepIndex >= 0;
  const stepDone = isStep && progress.steps.includes(tab as LessonStep);

  const completeAndAdvance = () => {
    if (!isStep) return;
    markStep(lesson.slug, tab as LessonStep);
    const next = stepOrder[currentStepIndex + 1];
    setTab(next ?? "pronuncia");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-inchiostro-400 transition-colors hover:text-terracotta-600"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Zurück zum Percorso
      </Link>

      {/* Kopf */}
      <header className="mt-4 rounded-3xl border border-marmo-300 bg-marmo-50/90 p-5 shadow-carta sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-terracotta-500 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-marmo-50">
            Lektion {lesson.number}
          </span>
          <span className="rounded-full bg-marmo-200 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-inchiostro-500">
            Fase {phase.romanNumeral} · {phase.code}
          </span>
          {progress.completed && (
            <span className="inline-flex items-center gap-1 rounded-full bg-oliva-100 px-2.5 py-0.5 text-[11px] font-semibold text-oliva-700">
              <Check className="h-3 w-3" aria-hidden /> completata
            </span>
          )}
        </div>

        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-inchiostro-800 sm:text-5xl">
          {lesson.title}
        </h1>
        <p className="mt-1 font-display text-lg italic text-inchiostro-400 sm:text-xl">
          {lesson.subtitle}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-inchiostro-500">
          {lesson.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-inchiostro-400">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {lesson.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" aria-hidden />
            ca. {lesson.minutes} Minuten
          </span>
          {lesson.unesco && (
            <span className="inline-flex items-center gap-1.5 text-oro-500">
              <Landmark className="h-3.5 w-3.5" aria-hidden />
              {lesson.unesco}
            </span>
          )}
        </div>

        {/* Schritt-Fortschritt */}
        <div className="mt-5 flex items-center gap-2 border-t border-marmo-200 pt-4">
          {stepOrder.map((step, index) => {
            const done = progress.steps.includes(step);
            return (
              <div key={step} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                    done ? "bg-oliva-500 text-marmo-50" : "bg-marmo-200 text-inchiostro-400"
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" aria-hidden /> : index + 1}
                </span>
                <span className="hidden text-xs font-medium text-inchiostro-500 sm:inline">
                  {tabs[index].label}
                </span>
                {index < stepOrder.length - 1 && (
                  <span
                    className={`h-0.5 flex-1 rounded-full ${done ? "bg-oliva-300" : "bg-marmo-200"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </header>

      {/* Reiter */}
      <nav aria-label="Lektionsabschnitte" className="scroll-sottile mt-6 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-1.5">
          {tabs.map((item) => {
            const active = tab === item.key;
            const done = item.counts && progress.steps.includes(item.key as LessonStep);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
                  active
                    ? "border-terracotta-300 bg-terracotta-50 text-terracotta-800"
                    : "border-marmo-300 bg-marmo-50 text-inchiostro-500 hover:bg-marmo-200"
                }`}
              >
                <item.Icon
                  className={`h-4 w-4 ${active ? "text-terracotta-500" : "text-inchiostro-400"}`}
                  aria-hidden
                />
                <span>
                  <span className="block font-display text-base font-medium leading-tight">
                    {item.label}
                  </span>
                  <span className="block text-[10px] uppercase tracking-wider text-inchiostro-400">
                    {item.german}
                  </span>
                </span>
                {done && <Check className="h-3.5 w-3.5 text-oliva-600" aria-hidden />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Inhalt */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "racconto" && <RaccontoStep lesson={lesson} />}
            {tab === "grammatica" && <GrammaticaStep lesson={lesson} />}
            {tab === "dialogo" && <DialogoStep lesson={lesson} />}
            {tab === "pronuncia" && <ShadowingTrainer lesson={lesson} />}
            {tab === "vocabolario" && <VocabularyTable lesson={lesson} />}
            {tab === "esercizi" && <QuizEngine lesson={lesson} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Schritt abschließen */}
      {isStep && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-marmo-300 bg-marmo-50/80 p-4">
          <p className="text-sm text-inchiostro-500">
            {stepDone
              ? "Dieser Schritt ist als erledigt markiert."
              : "Durchgearbeitet? Dann markiere den Schritt und geh weiter."}
          </p>
          <button
            type="button"
            onClick={completeAndAdvance}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              stepDone
                ? "border border-oliva-300 bg-marmo-50 text-oliva-700 hover:bg-oliva-50"
                : "bg-oliva-600 text-marmo-50 hover:bg-oliva-700"
            }`}
          >
            <Check className="h-4 w-4" aria-hidden />
            {stepDone
              ? currentStepIndex < stepOrder.length - 1
                ? "Zum nächsten Schritt"
                : "Weiter zur Aussprache"
              : "Schritt abschließen"}
          </button>
        </div>
      )}
    </div>
  );
}
