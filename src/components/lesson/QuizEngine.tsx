"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Lightbulb, RotateCcw, Trophy, X } from "lucide-react";
import type { Lesson, QuizQuestion } from "@/content/types";
import { normalizeItalian } from "@/lib/speech";
import { AudioButton } from "@/components/AudioButton";
import { useProgress } from "@/lib/progress";

interface Evaluation {
  correct: boolean;
  given: string;
}

function checkAnswer(question: QuizQuestion, given: string | number): boolean {
  if (question.type === "choice") return given === question.correctIndex;
  const answer = normalizeItalian(String(given));
  return question.accepted.some((accepted) => normalizeItalian(accepted) === answer);
}

export function QuizEngine({ lesson }: { lesson: Lesson }) {
  const questions = lesson.quiz;
  const { recordQuiz, lessonProgress } = useProgress();
  const previousBest = lessonProgress(lesson.slug);

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [gapInputs, setGapInputs] = useState<string[]>([]);
  const [choice, setChoice] = useState<number | null>(null);
  const [evaluations, setEvaluations] = useState<Record<string, Evaluation>>({});
  const [showHint, setShowHint] = useState(false);

  const question = questions[index];
  const evaluation = question ? evaluations[question.id] : undefined;
  const score = Object.values(evaluations).filter((item) => item.correct).length;
  const finished = Object.keys(evaluations).length === questions.length;

  // Ein Lückensatz kann mehrere "___" enthalten — für jede Lücke ein Feld.
  const segments = useMemo(() => {
    if (question?.type !== "fill") return null;
    return question.sentence.split("___");
  }, [question]);
  const gapCount = segments ? segments.length - 1 : 0;

  const submit = () => {
    if (!question || evaluation) return;
    const filled = Array.from({ length: gapCount }, (_, i) => (gapInputs[i] ?? "").trim());
    const given =
      question.type === "choice"
        ? (choice ?? -1)
        : question.type === "fill"
          ? filled.join(", ")
          : input;
    if (question.type === "choice" && choice === null) return;
    if (question.type === "translate" && input.trim() === "") return;
    if (question.type === "fill" && filled.some((value) => value === "")) return;

    const correct = checkAnswer(question, given);
    const next = {
      ...evaluations,
      [question.id]: { correct, given: String(given) },
    };
    setEvaluations(next);

    if (Object.keys(next).length === questions.length) {
      recordQuiz(
        lesson.slug,
        Object.values(next).filter((item) => item.correct).length,
        questions.length,
      );
    }
  };

  const advance = () => {
    setInput("");
    setGapInputs([]);
    setChoice(null);
    setShowHint(false);
    setIndex((current) => Math.min(questions.length - 1, current + 1));
  };

  const restart = () => {
    setEvaluations({});
    setIndex(0);
    setInput("");
    setGapInputs([]);
    setChoice(null);
    setShowHint(false);
  };

  if (!question) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-600">
          Esercizi
        </p>
        <h2 className="mt-1 font-display text-3xl font-semibold text-inchiostro-800 sm:text-4xl">
          Mettiti alla prova
        </h2>
        <p className="mt-2 text-sm text-inchiostro-500">
          Lückentexte, Übersetzungen und Wissensfragen zu allem, was in dieser Lektion vorkam.
          {previousBest.quizTotal > 0 && (
            <span className="ml-1 text-inchiostro-400">
              Bestwert bisher: {previousBest.bestQuizScore}/{previousBest.quizTotal}.
            </span>
          )}
        </p>
      </header>

      {/* Fortschritt */}
      <div className="mb-4 flex items-center gap-1.5">
        {questions.map((item, itemIndex) => {
          const state = evaluations[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setIndex(itemIndex);
                setInput("");
                setGapInputs([]);
                setChoice(null);
                setShowHint(false);
              }}
              aria-label={`Aufgabe ${itemIndex + 1}`}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                state
                  ? state.correct
                    ? "bg-oliva-500"
                    : "bg-terracotta-500"
                  : itemIndex === index
                    ? "bg-inchiostro-400"
                    : "bg-marmo-300"
              }`}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl border border-marmo-300 bg-marmo-50 p-5 shadow-carta sm:p-7"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-inchiostro-400">
            Aufgabe {index + 1}/{questions.length} ·{" "}
            {question.type === "fill"
              ? "Lückentext"
              : question.type === "translate"
                ? "Übersetzung"
                : "Multiple Choice"}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-inchiostro-800">
            {question.prompt}
          </h3>

          <div className="mt-4">
            {question.type === "fill" && segments && (
              <p className="font-display text-2xl leading-relaxed text-inchiostro-800">
                {segments.map((segment, segmentIndex) => (
                  <span key={segmentIndex}>
                    {segment}
                    {segmentIndex < gapCount && (
                      <input
                        value={gapInputs[segmentIndex] ?? ""}
                        onChange={(event) =>
                          setGapInputs((current) => {
                            const next = [...current];
                            next[segmentIndex] = event.target.value;
                            return next;
                          })
                        }
                        onKeyDown={(event) => event.key === "Enter" && submit()}
                        disabled={Boolean(evaluation)}
                        aria-label={
                          gapCount > 1 ? `Lücke ${segmentIndex + 1} ausfüllen` : "Antwort einsetzen"
                        }
                        className="mx-1 w-32 border-b-2 border-terracotta-400 bg-transparent px-1 pb-0.5 text-center font-display text-2xl text-terracotta-700 outline-none focus:border-terracotta-600 disabled:opacity-70"
                      />
                    )}
                  </span>
                ))}
              </p>
            )}

            {question.type === "translate" && (
              <>
                <p className="rounded-xl bg-marmo-200/70 px-4 py-3 text-lg text-inchiostro-700">
                  {question.de}
                </p>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && submit()}
                  disabled={Boolean(evaluation)}
                  placeholder="Auf Italienisch schreiben…"
                  aria-label="Italienische Übersetzung"
                  className="mt-3 w-full rounded-xl border border-marmo-300 bg-marmo-50 px-4 py-3 font-display text-xl text-inchiostro-800 outline-none focus:border-terracotta-400 disabled:opacity-70"
                />
              </>
            )}

            {question.type === "choice" && (
              <>
                <p className="font-display text-xl leading-relaxed text-inchiostro-800">
                  {question.question}
                </p>
                <div className="mt-3 grid gap-2">
                  {question.options.map((option, optionIndex) => {
                    const selected = choice === optionIndex;
                    const isCorrect = optionIndex === question.correctIndex;
                    const revealed = Boolean(evaluation);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => !revealed && setChoice(optionIndex)}
                        disabled={revealed}
                        className={`rounded-xl border px-4 py-3 text-left font-display text-lg transition-colors ${
                          revealed
                            ? isCorrect
                              ? "border-oliva-300 bg-oliva-50 text-oliva-800"
                              : selected
                                ? "border-terracotta-300 bg-terracotta-50 text-terracotta-800"
                                : "border-marmo-300 bg-marmo-50 text-inchiostro-400"
                            : selected
                              ? "border-terracotta-400 bg-terracotta-50 text-terracotta-800"
                              : "border-marmo-300 bg-marmo-50 text-inchiostro-700 hover:bg-marmo-200"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Tipp */}
          {"hint" in question && question.hint && !evaluation && (
            <div className="mt-4">
              {showHint ? (
                <p className="flex items-start gap-2 rounded-xl bg-oro-300/15 px-3 py-2 text-sm text-inchiostro-600">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-oro-500" aria-hidden />
                  {question.hint}
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-inchiostro-400 hover:text-inchiostro-600"
                >
                  <Lightbulb className="h-3.5 w-3.5" aria-hidden />
                  Tipp anzeigen
                </button>
              )}
            </div>
          )}

          {/* Auswertung */}
          <AnimatePresence>
            {evaluation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`mt-4 overflow-hidden rounded-2xl border px-4 py-3 ${
                  evaluation.correct
                    ? "border-oliva-200 bg-oliva-50"
                    : "border-terracotta-200 bg-terracotta-50"
                }`}
              >
                <p className="flex items-center gap-2 font-display text-lg font-semibold">
                  {evaluation.correct ? (
                    <>
                      <Check className="h-5 w-5 text-oliva-600" aria-hidden />
                      <span className="text-oliva-800">Esatto!</span>
                    </>
                  ) : (
                    <>
                      <X className="h-5 w-5 text-terracotta-600" aria-hidden />
                      <span className="text-terracotta-800">Non proprio.</span>
                    </>
                  )}
                </p>
                {!evaluation.correct && question.type !== "choice" && (
                  <p className="mt-1 flex items-center gap-2 text-sm text-inchiostro-600">
                    Richtig wäre:{" "}
                    <span className="font-display text-lg text-inchiostro-800">
                      {question.accepted[0]}
                    </span>
                    <AudioButton text={question.accepted[0]} id={`quiz-${question.id}`} />
                  </p>
                )}
                <p className="mt-1.5 text-sm leading-relaxed text-inchiostro-600">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-marmo-200 pt-4">
            <span className="text-xs tabular-nums text-inchiostro-400">
              {score} richtig von {Object.keys(evaluations).length} beantwortet
            </span>
            {evaluation ? (
              index < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={advance}
                  className="inline-flex items-center gap-2 rounded-full bg-inchiostro-700 px-5 py-2.5 text-sm font-semibold text-marmo-50 transition-colors hover:bg-inchiostro-800"
                >
                  Weiter
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              ) : null
            ) : (
              <button
                type="button"
                onClick={submit}
                className="rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-semibold text-marmo-50 transition-colors hover:bg-terracotta-600"
              >
                Prüfen
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {finished && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-oliva-200 bg-oliva-50 p-5"
        >
          <p className="flex items-center gap-3 text-sm text-oliva-800">
            <Trophy className="h-6 w-6 text-oliva-600" aria-hidden />
            <span>
              <strong className="cifre text-2xl font-semibold">
                {score}/{questions.length}
              </strong>
              <span className="ml-2">
                {score === questions.length
                  ? "Bravissimo — alles sitzt."
                  : score >= questions.length * 0.7
                    ? "Solide. Schau dir die Erklärungen der Fehler noch einmal an."
                    : "Geh den Racconto und die Grammatica noch einmal durch, dann klappt es."}
              </span>
            </span>
          </p>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-1.5 rounded-full border border-oliva-300 bg-marmo-50 px-4 py-2 text-sm font-medium text-oliva-700 transition-colors hover:bg-oliva-100"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Nochmal
          </button>
        </motion.div>
      )}
    </div>
  );
}
