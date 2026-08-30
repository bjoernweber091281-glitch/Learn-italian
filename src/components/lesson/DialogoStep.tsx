"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Hand,
  MessageSquareQuote,
  RotateCcw,
  Sparkles,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import type { DialogueChoice, Lesson } from "@/content/types";
import { AudioButton } from "@/components/AudioButton";

const qualityStyles: Record<
  DialogueChoice["quality"],
  { label: string; badge: string; panel: string; Icon: typeof Check }
> = {
  perfetto: {
    label: "Perfetto",
    badge: "bg-oliva-600 text-marmo-50",
    panel: "border-oliva-200 bg-oliva-50",
    Icon: Check,
  },
  ok: {
    label: "Va bene, ma…",
    badge: "bg-oro-400 text-inchiostro-800",
    panel: "border-oro-300/70 bg-oro-300/15",
    Icon: ThumbsUp,
  },
  no: {
    label: "Attenzione",
    badge: "bg-terracotta-600 text-marmo-50",
    panel: "border-terracotta-200 bg-terracotta-50",
    Icon: AlertTriangle,
  },
};

interface Answer {
  choiceIndex: number;
  quality: DialogueChoice["quality"];
  filler?: string;
}

export function DialogoStep({ lesson }: { lesson: Lesson }) {
  const steps = lesson.dialogo.steps;

  const firstStop = useMemo(() => {
    let index = 0;
    while (index < steps.length && steps[index].role === "partner") index += 1;
    return Math.min(index + 1, steps.length);
  }, [steps]);

  const [visible, setVisible] = useState(firstStop);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [awaitingContinue, setAwaitingContinue] = useState(false);

  const advance = useCallback(() => {
    setVisible((current) => {
      let index = current;
      while (index < steps.length && steps[index].role === "partner") index += 1;
      return Math.min(index + 1, steps.length);
    });
    setAwaitingContinue(false);
  }, [steps]);

  const choose = (stepIndex: number, choiceIndex: number, choice: DialogueChoice) => {
    setAnswers((current) => ({
      ...current,
      [stepIndex]: { choiceIndex, quality: choice.quality, filler: choice.filler },
    }));
    setAwaitingContinue(true);
  };

  const restart = () => {
    setAnswers({});
    setVisible(firstStop);
    setAwaitingContinue(false);
  };

  const youSteps = steps.filter((step) => step.role === "you").length;
  const answered = Object.values(answers);
  const points = answered.reduce(
    (sum, answer) => sum + (answer.quality === "perfetto" ? 1 : answer.quality === "ok" ? 0.5 : 0),
    0,
  );
  const finished = visible >= steps.length && answered.length === youSteps;
  const unlockedFillers = new Set(answered.map((answer) => answer.filler).filter(Boolean));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <header className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-600">
            Il Dialogo · Passo 3
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-inchiostro-800 sm:text-4xl">
            {lesson.dialogo.italianTitle}
          </h2>
          <p className="font-display text-lg italic text-inchiostro-400">{lesson.dialogo.title}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-inchiostro-500">
            {lesson.dialogo.setting}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <p className="rounded-xl bg-terracotta-50 px-3 py-2 text-xs text-terracotta-800">
              <span className="font-semibold uppercase tracking-wider">Tu:</span>{" "}
              {lesson.dialogo.yourRole}
            </p>
            <p className="rounded-xl bg-marmo-200/70 px-3 py-2 text-xs text-inchiostro-500">
              <span className="font-semibold uppercase tracking-wider">Lui/Lei:</span>{" "}
              {lesson.dialogo.partnerRole}
            </p>
          </div>
        </header>

        {/* Chat */}
        <div className="space-y-3 rounded-3xl border border-marmo-300 bg-marmo-50 p-4 shadow-carta sm:p-5">
          <div className="flex items-center justify-between border-b border-marmo-200 pb-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-inchiostro-400">
              <MessageSquareQuote className="h-3.5 w-3.5 text-terracotta-500" aria-hidden />
              Roleplay
            </span>
            <span className="text-[11px] tabular-nums text-inchiostro-400">
              {answered.length}/{youSteps} Antworten
            </span>
          </div>

          <AnimatePresence initial={false}>
            {steps.slice(0, visible).map((step, index) => {
              if (step.role === "partner") {
                return (
                  <motion.div
                    key={`p-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex max-w-[92%] gap-2.5 sm:max-w-[80%]"
                  >
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-oliva-100 font-display text-sm font-semibold text-oliva-700">
                      {step.speaker.slice(0, 1)}
                    </span>
                    <div className="min-w-0 rounded-2xl rounded-tl-sm border border-marmo-200 bg-marmo-100 px-3.5 py-2.5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-inchiostro-400">
                        {step.speaker}
                      </p>
                      <div className="mt-0.5 flex items-start gap-2">
                        <AudioButton text={step.it} id={`dlg-${index}`} tone="oliva" />
                        <div>
                          <p className="font-display text-lg leading-snug text-inchiostro-800">
                            {step.it}
                          </p>
                          <p className="text-sm text-inchiostro-500">{step.de}</p>
                        </div>
                      </div>
                      {step.stageDirection && (
                        <p className="mt-2 border-t border-marmo-200 pt-1.5 text-xs italic leading-relaxed text-inchiostro-400">
                          {step.stageDirection}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              }

              const answer = answers[index];
              const chosen = answer ? step.choices[answer.choiceIndex] : null;

              return (
                <motion.div
                  key={`y-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  {chosen ? (
                    <>
                      <div className="ml-auto flex max-w-[92%] flex-row-reverse gap-2.5 sm:max-w-[80%]">
                        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta-500 font-display text-sm font-semibold text-marmo-50">
                          Tu
                        </span>
                        <div className="min-w-0 rounded-2xl rounded-tr-sm bg-terracotta-500 px-3.5 py-2.5 text-marmo-50">
                          <p className="font-display text-lg leading-snug">{chosen.it}</p>
                          <p className="text-sm text-terracotta-100">{chosen.de}</p>
                        </div>
                      </div>
                      <Feedback choice={chosen} />
                    </>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-terracotta-200 bg-terracotta-50/50 p-3">
                      <p className="mb-2 text-xs font-medium text-terracotta-700">
                        {step.prompt}
                      </p>
                      <div className="grid gap-2">
                        {step.choices.map((choice, choiceIndex) => (
                          <button
                            key={choiceIndex}
                            type="button"
                            onClick={() => choose(index, choiceIndex, choice)}
                            className="rounded-xl border border-marmo-300 bg-marmo-50 px-3 py-2.5 text-left transition-colors hover:border-terracotta-300 hover:bg-terracotta-50"
                          >
                            <span className="block font-display text-base leading-snug text-inchiostro-800">
                              {choice.it}
                            </span>
                            <span className="block text-xs text-inchiostro-400">{choice.de}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {awaitingContinue && visible < steps.length && (
            <button
              type="button"
              onClick={advance}
              className="ml-auto flex items-center gap-1.5 rounded-full bg-inchiostro-700 px-4 py-2 text-sm font-semibold text-marmo-50 transition-colors hover:bg-inchiostro-800"
            >
              Continua
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          )}

          {awaitingContinue && visible >= steps.length && (
            <button
              type="button"
              onClick={() => setAwaitingContinue(false)}
              className="ml-auto flex items-center gap-1.5 rounded-full bg-inchiostro-700 px-4 py-2 text-sm font-semibold text-marmo-50 transition-colors hover:bg-inchiostro-800"
            >
              Fine
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>

        {finished && !awaitingContinue && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-oliva-200 bg-oliva-50 p-4"
          >
            <p className="flex items-center gap-2 text-sm text-oliva-800">
              <Trophy className="h-5 w-5 text-oliva-600" aria-hidden />
              <span>
                <strong className="cifre text-lg font-semibold">
                  {points} / {youSteps}
                </strong>{" "}
                Punkte —{" "}
                {points === youSteps
                  ? "wie ein Muttersprachler."
                  : points >= youSteps * 0.6
                    ? "gut verständlich, an den Nuancen lässt sich feilen."
                    : "lies die Rückmeldungen und spiel die Szene noch einmal."}
              </span>
            </p>
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-1.5 rounded-full border border-oliva-300 bg-marmo-50 px-3 py-1.5 text-xs font-medium text-oliva-700 transition-colors hover:bg-oliva-100"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Noch einmal
            </button>
          </motion.div>
        )}
      </div>

      <MadrelinguaPanel lesson={lesson} unlocked={unlockedFillers as Set<string>} />
    </div>
  );
}

function Feedback({ choice }: { choice: DialogueChoice }) {
  const style = qualityStyles[choice.quality];
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.2 }}
      className={`ml-auto max-w-[92%] overflow-hidden rounded-2xl border px-3.5 py-2.5 sm:max-w-[80%] ${style.panel}`}
    >
      <p className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${style.badge}`}
        >
          <style.Icon className="h-3 w-3" aria-hidden />
          {style.label}
        </span>
        {choice.filler && (
          <span className="inline-flex items-center gap-1 rounded-full bg-marmo-50 px-2 py-0.5 text-[11px] font-semibold text-terracotta-700 ring-1 ring-terracotta-200">
            <Sparkles className="h-3 w-3" aria-hidden />
            «{choice.filler}» eingesetzt
          </span>
        )}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-inchiostro-600">{choice.feedback}</p>
    </motion.div>
  );
}

function MadrelinguaPanel({ lesson, unlocked }: { lesson: Lesson; unlocked: Set<string> }) {
  const [tab, setTab] = useState<"parole" | "gesti">("parole");

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-marmo-300 bg-marmo-50/90 p-4">
        <h3 className="font-display text-lg font-semibold text-inchiostro-800">
          Madrelingua Secrets
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-inchiostro-400">
          {lesson.madrelingua.intro}
        </p>

        <div className="mt-3 flex gap-1 rounded-full bg-marmo-200 p-1">
          {(
            [
              { key: "parole", label: "Parole" },
              { key: "gesti", label: "Gesti" },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`flex-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                tab === item.key
                  ? "bg-marmo-50 text-inchiostro-800 shadow-carta"
                  : "text-inchiostro-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="scroll-sottile mt-3 max-h-[32rem] space-y-2.5 overflow-y-auto pr-1">
          {tab === "parole"
            ? lesson.madrelingua.fillers.map((filler) => (
                <article
                  key={filler.word}
                  className={`rounded-xl border p-3 transition-colors ${
                    unlocked.has(filler.word)
                      ? "border-oliva-200 bg-oliva-50"
                      : "border-marmo-200 bg-marmo-100/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-lg font-semibold text-inchiostro-800">
                      {filler.word}
                    </p>
                    <div className="flex items-center gap-1">
                      {unlocked.has(filler.word) && (
                        <span className="rounded-full bg-oliva-600 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-marmo-50">
                          usato
                        </span>
                      )}
                      <AudioButton text={filler.word} id={`filler-${filler.word}`} />
                    </div>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-inchiostro-400">
                    {filler.register} · {filler.literal}
                  </p>
                  <p className="mt-1 text-sm font-medium text-inchiostro-700">{filler.meaning}</p>
                  <p className="mt-1.5 rounded-lg bg-marmo-50 px-2 py-1.5 text-xs italic text-inchiostro-600">
                    {filler.example.it}
                    <span className="block not-italic text-inchiostro-400">
                      {filler.example.de}
                    </span>
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-inchiostro-500">
                    {filler.whenToUse}
                  </p>
                </article>
              ))
            : lesson.madrelingua.gestures.map((gesture) => (
                <article
                  key={gesture.italianName}
                  className="rounded-xl border border-marmo-200 bg-marmo-100/60 p-3"
                >
                  <p className="flex items-center gap-1.5 font-display text-lg font-semibold text-inchiostro-800">
                    <Hand className="h-4 w-4 text-terracotta-500" aria-hidden />
                    {gesture.italianName}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-inchiostro-400">
                    {gesture.name}
                  </p>
                  <p className="mt-1.5 rounded-lg bg-marmo-50 px-2 py-1.5 text-xs leading-relaxed text-inchiostro-600">
                    {gesture.hand}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-terracotta-700">
                    «{gesture.meaning}»
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-inchiostro-500">
                    {gesture.whenToUse}
                  </p>
                  {gesture.caution && (
                    <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-terracotta-700">
                      <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                      {gesture.caution}
                    </p>
                  )}
                </article>
              ))}
        </div>
      </div>
    </aside>
  );
}
