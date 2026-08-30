"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  CalendarCheck,
  CheckCheck,
  Eye,
  Filter,
  Layers,
  PartyPopper,
} from "lucide-react";
import type { VocabularyCard } from "@/content";
import { useProgress } from "@/lib/progress";
import { isDue, previewInterval, type Grade } from "@/lib/srs";
import { AudioButton } from "@/components/AudioButton";

const grades: { key: Grade; label: string; className: string }[] = [
  { key: "again", label: "Nochmal", className: "bg-terracotta-500 hover:bg-terracotta-600" },
  { key: "hard", label: "Schwer", className: "bg-oro-500 hover:bg-oro-400" },
  { key: "good", label: "Gewusst", className: "bg-oliva-600 hover:bg-oliva-700" },
  { key: "easy", label: "Leicht", className: "bg-inchiostro-600 hover:bg-inchiostro-700" },
];

type Direction = "it-de" | "de-it";

export function FlashcardTrainer({ cards }: { cards: VocabularyCard[] }) {
  const { cardState, gradeCard, cards: states } = useProgress();
  const [direction, setDirection] = useState<Direction>("it-de");
  const [lessonFilter, setLessonFilter] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [reviewedInSession, setReviewedInSession] = useState(0);

  const lessonOptions = useMemo(
    () =>
      Array.from(new Map(cards.map((card) => [card.lessonSlug, card])).values()).map((card) => ({
        slug: card.lessonSlug,
        label: `${card.lessonNumber}. ${card.lessonTitle}`,
      })),
    [cards],
  );

  const pool = useMemo(
    () => (lessonFilter ? cards.filter((card) => card.lessonSlug === lessonFilter) : cards),
    [cards, lessonFilter],
  );

  // Fällige Karten zuerst, danach unberührte — beides in stabiler Reihenfolge.
  const queue = useMemo(() => {
    const now = new Date();
    const due = pool.filter((card) => {
      const state = states[card.id];
      return state ? isDue(state, now) : false;
    });
    const fresh = pool.filter((card) => !states[card.id]);
    return [...due, ...fresh];
  }, [pool, states]);

  const dueCount = queue.length;
  const learned = pool.filter((card) => (states[card.id]?.repetitions ?? 0) > 0).length;
  const card = queue[cursor % Math.max(queue.length, 1)];

  const answer = (grade: Grade) => {
    if (!card) return;
    gradeCard(card.id, grade);
    setFlipped(false);
    setReviewedInSession((count) => count + 1);
    setCursor((current) => current + 1);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-oliva-600">
          Il Casellario
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-inchiostro-800 sm:text-5xl">
          Vocabolario
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-inchiostro-500">
          Karteikarten mit Spaced Repetition: Was du sicher kannst, kommt seltener; was hakt, kommt
          in zehn Minuten wieder. Der Zustand jeder Karte wird gespeichert.
        </p>
      </header>

      <dl className="mb-5 grid grid-cols-3 gap-3">
        <Stat Icon={CalendarCheck} label="Jetzt fällig" value={String(dueCount)} />
        <Stat Icon={CheckCheck} label="Schon geübt" value={`${learned}/${pool.length}`} />
        <Stat Icon={Layers} label="Diese Sitzung" value={String(reviewedInSession)} />
      </dl>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setDirection((value) => (value === "it-de" ? "de-it" : "it-de"));
            setFlipped(false);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-marmo-300 bg-marmo-50 px-3 py-1.5 text-xs font-medium text-inchiostro-500 transition-colors hover:bg-marmo-200"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden />
          {direction === "it-de" ? "Italiano → Deutsch" : "Deutsch → Italiano"}
        </button>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-inchiostro-400">
          <Filter className="h-3.5 w-3.5" aria-hidden />
        </span>
        <button
          type="button"
          onClick={() => {
            setLessonFilter(null);
            setCursor(0);
            setFlipped(false);
          }}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            lessonFilter === null
              ? "bg-oliva-600 text-marmo-50"
              : "bg-marmo-200 text-inchiostro-500 hover:bg-marmo-300"
          }`}
        >
          alle Lektionen
        </button>
        {lessonOptions.map((option) => (
          <button
            key={option.slug}
            type="button"
            onClick={() => {
              setLessonFilter(option.slug === lessonFilter ? null : option.slug);
              setCursor(0);
              setFlipped(false);
            }}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              lessonFilter === option.slug
                ? "bg-oliva-600 text-marmo-50"
                : "bg-marmo-200 text-inchiostro-500 hover:bg-marmo-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {card ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${card.id}-${cursor}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
            className="rounded-3xl border border-marmo-300 bg-marmo-50 p-6 shadow-rilievo sm:p-10"
          >
            <p className="text-[11px] uppercase tracking-wider text-inchiostro-400">
              Lektion {card.lessonNumber} · {card.tags.join(" · ")}
            </p>

            <div className="mt-4 flex items-start justify-between gap-3">
              <p className="font-display text-4xl font-semibold leading-tight text-inchiostro-800 sm:text-5xl">
                {direction === "it-de" ? (
                  <>
                    {card.article && (
                      <span className="text-inchiostro-400">{card.article} </span>
                    )}
                    {card.it}
                  </>
                ) : (
                  card.de
                )}
              </p>
              {direction === "it-de" && (
                <AudioButton text={card.it} id={`fc-${card.id}`} size="md" />
              )}
            </div>

            <AnimatePresence initial={false}>
              {flipped ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 border-t border-marmo-200 pt-5">
                    <p className="flex items-center gap-2 font-display text-2xl text-oliva-700">
                      {direction === "it-de" ? (
                        card.de
                      ) : (
                        <>
                          {card.article && (
                            <span className="text-inchiostro-400">{card.article} </span>
                          )}
                          {card.it}
                          <AudioButton text={card.it} id={`fc-back-${card.id}`} />
                        </>
                      )}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-inchiostro-400">
                      {card.pos}
                      {card.plural ? ` · Pl. ${card.plural}` : ""}
                    </p>
                    <p className="mt-3 rounded-xl bg-marmo-100 px-3 py-2.5 text-sm">
                      <span className="font-display text-lg text-inchiostro-800">
                        {card.example.it}
                      </span>
                      <span className="block text-inchiostro-400">{card.example.de}</span>
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {grades.map((grade) => (
                      <button
                        key={grade.key}
                        type="button"
                        onClick={() => answer(grade.key)}
                        className={`rounded-xl px-3 py-2.5 text-sm font-semibold text-marmo-50 transition-colors ${grade.className}`}
                      >
                        {grade.label}
                        <span className="mt-0.5 block text-[10px] font-normal opacity-80">
                          {previewInterval(cardState(card.id), grade.key)}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  type="button"
                  onClick={() => setFlipped(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-inchiostro-700 px-6 py-3 text-sm font-semibold text-marmo-50 transition-colors hover:bg-inchiostro-800"
                >
                  <Eye className="h-4 w-4" aria-hidden />
                  Umdrehen
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="rounded-3xl border border-oliva-200 bg-oliva-50 p-8 text-center">
          <PartyPopper className="mx-auto h-8 w-8 text-oliva-600" aria-hidden />
          <p className="mt-3 font-display text-2xl font-semibold text-oliva-800">
            Alles wiederholt!
          </p>
          <p className="mt-1 text-sm text-inchiostro-500">
            Für diese Auswahl ist gerade nichts fällig. Komm später wieder — oder arbeite an der
            nächsten Lektion weiter.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-full bg-oliva-600 px-5 py-2.5 text-sm font-semibold text-marmo-50 transition-colors hover:bg-oliva-700"
          >
            Zum Percorso
          </Link>
        </div>
      )}
    </div>
  );
}

function Stat({
  Icon,
  label,
  value,
}: {
  Icon: typeof Layers;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-marmo-300 bg-marmo-50/80 px-3 py-3">
      <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-inchiostro-400">
        <Icon className="h-3.5 w-3.5 text-oliva-600" aria-hidden />
        {label}
      </dt>
      <dd className="cifre mt-1 text-xl font-semibold text-inchiostro-800">
        {value}
      </dd>
    </div>
  );
}
