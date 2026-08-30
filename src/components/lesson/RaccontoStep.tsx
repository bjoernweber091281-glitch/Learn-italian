"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Eye, EyeOff, Info, Landmark, Languages } from "lucide-react";
import type { Lesson, StorySentence, VocabItem } from "@/content/types";
import { buildGlossary, tokenizeSentence } from "@/lib/glossary";
import { AudioButton } from "@/components/AudioButton";
import { useItalianSpeech } from "@/lib/speech";

export function RaccontoStep({ lesson }: { lesson: Lesson }) {
  const glossary = useMemo(() => buildGlossary(lesson.vocabulary), [lesson.vocabulary]);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [activeVocab, setActiveVocab] = useState<string | null>(null);
  const { supported, speak } = useItalianSpeech();

  const toggleSentence = (id: string) => {
    setRevealed((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const fullText = lesson.racconto.sentences.map((sentence) => sentence.it).join(" ");

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <header className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-600">
            {lesson.racconto.kicker}
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-inchiostro-800 sm:text-4xl">
            {lesson.racconto.italianTitle}
          </h2>
          <p className="font-display text-lg italic text-inchiostro-400">
            {lesson.racconto.title}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-inchiostro-500">
            {lesson.racconto.intro}
          </p>
        </header>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="inline-flex items-center gap-1.5 rounded-full border border-marmo-300 bg-marmo-50 px-3 py-1.5 text-xs font-medium text-inchiostro-500 transition-colors hover:bg-marmo-200"
          >
            {showAll ? <EyeOff className="h-3.5 w-3.5" aria-hidden /> : <Eye className="h-3.5 w-3.5" aria-hidden />}
            {showAll ? "Übersetzungen verbergen" : "Alle Übersetzungen zeigen"}
          </button>
          {supported && (
            <button
              type="button"
              onClick={() => speak(fullText, { rate: 0.95, id: "racconto-completo" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-terracotta-200 bg-terracotta-50 px-3 py-1.5 text-xs font-medium text-terracotta-700 transition-colors hover:bg-terracotta-100"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              Ganzen Text vorlesen
            </button>
          )}
          <span className="text-xs text-inchiostro-400">
            {lesson.racconto.sentences.length} Sätze · unterstrichene Wörter antippen
          </span>
        </div>

        <article className="space-y-1.5 rounded-3xl border border-marmo-300 bg-marmo-50 p-4 shadow-carta sm:p-6">
          {lesson.racconto.sentences.map((sentence) => (
            <SentenceRow
              key={sentence.id}
              sentence={sentence}
              glossary={glossary}
              open={showAll || revealed.has(sentence.id)}
              onToggle={() => toggleSentence(sentence.id)}
              activeVocab={activeVocab}
              onVocab={setActiveVocab}
            />
          ))}
        </article>

        <aside className="mt-6 rounded-2xl border border-oro-300/60 bg-oro-300/10 p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-inchiostro-800">
            <Landmark className="h-4 w-4 text-oro-500" aria-hidden />
            {lesson.racconto.culturalNote.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-inchiostro-500">
            {lesson.racconto.culturalNote.body}
          </p>
          {lesson.racconto.culturalNote.source && (
            <p className="mt-3 text-[11px] uppercase tracking-wider text-inchiostro-400">
              {lesson.racconto.culturalNote.source}
            </p>
          )}
        </aside>
      </div>

      <VocabRail vocabulary={lesson.vocabulary} activeVocab={activeVocab} />
    </div>
  );
}

function SentenceRow({
  sentence,
  glossary,
  open,
  onToggle,
  activeVocab,
  onVocab,
}: {
  sentence: StorySentence;
  glossary: Map<string, VocabItem>;
  open: boolean;
  onToggle: () => void;
  activeVocab: string | null;
  onVocab: (value: string | null) => void;
}) {
  const tokens = useMemo(
    () => tokenizeSentence(sentence.it, glossary, sentence.highlights),
    [sentence, glossary],
  );

  return (
    <div className="group rounded-xl px-2 py-2 transition-colors hover:bg-marmo-100/70">
      <div className="flex items-start gap-2.5">
        <AudioButton text={sentence.it} id={sentence.id} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-relaxed text-inchiostro-800 sm:text-xl">
            {tokens.map((token, index) =>
              token.kind === "text" ? (
                <span key={index}>{token.value}</span>
              ) : (
                <button
                  key={index}
                  type="button"
                  onClick={() => onVocab(activeVocab === token.item.it ? null : token.item.it)}
                  title={`${token.item.it} — ${token.item.de}`}
                  className={`rounded px-0.5 underline decoration-terracotta-300 decoration-dotted underline-offset-4 transition-colors hover:bg-terracotta-100 ${
                    activeVocab === token.item.it ? "bg-terracotta-100 text-terracotta-800" : ""
                  }`}
                >
                  {token.value}
                </button>
              ),
            )}
          </p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden text-sm leading-relaxed text-oliva-700"
              >
                {sentence.de}
              </motion.p>
            )}
          </AnimatePresence>

          {sentence.note && (
            <p className="mt-1.5 flex items-start gap-1.5 rounded-lg bg-marmo-200/60 px-2.5 py-1.5 text-xs leading-relaxed text-inchiostro-500">
              <Info className="mt-0.5 h-3 w-3 shrink-0 text-terracotta-500" aria-hidden />
              {sentence.note}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onToggle}
          aria-label={open ? "Übersetzung verbergen" : "Übersetzung anzeigen"}
          aria-expanded={open}
          className={`mt-0.5 inline-flex h-7 shrink-0 items-center gap-1 rounded-full border px-2 text-[11px] font-medium transition-colors ${
            open
              ? "border-oliva-200 bg-oliva-100 text-oliva-700"
              : "border-marmo-300 bg-marmo-50 text-inchiostro-400 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
          }`}
        >
          <Languages className="h-3 w-3" aria-hidden />
          DE
        </button>
      </div>
    </div>
  );
}

/** Seitenspalte mit den Vokabeln der Lektion, springt zum angetippten Wort. */
function VocabRail({
  vocabulary,
  activeVocab,
}: {
  vocabulary: VocabItem[];
  activeVocab: string | null;
}) {
  const active = vocabulary.find((item) => item.it === activeVocab);

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-marmo-300 bg-marmo-50/80 p-4">
        <h3 className="font-display text-base font-semibold text-inchiostro-800">
          Parole della lezione
        </h3>

        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.it}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="mt-3 rounded-xl border border-terracotta-200 bg-terracotta-50 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-lg font-semibold text-terracotta-800">
                  {active.article ? `${active.article} ` : ""}
                  {active.it}
                </p>
                <AudioButton text={active.it} id={`rail-${active.it}`} />
              </div>
              <p className="text-sm font-medium text-inchiostro-700">{active.de}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-inchiostro-400">
                {active.pos}
                {active.plural ? ` · Pl. ${active.plural}` : ""}
              </p>
              <p className="mt-2 border-t border-terracotta-200 pt-2 text-xs italic text-inchiostro-500">
                {active.example.it}
                <span className="block not-italic text-inchiostro-400">{active.example.de}</span>
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-xs leading-relaxed text-inchiostro-400"
            >
              Tippe im Text auf ein unterstrichenes Wort — es erscheint hier mit Artikel, Plural und
              Beispielsatz.
            </motion.p>
          )}
        </AnimatePresence>

        <ul className="scroll-sottile mt-4 max-h-80 space-y-1 overflow-y-auto border-t border-marmo-200 pt-3 text-sm">
          {vocabulary.map((item) => (
            <li key={item.it} className="flex items-baseline justify-between gap-3">
              <span className="text-inchiostro-700">
                {item.article ? (
                  <span className="text-inchiostro-400">{item.article} </span>
                ) : null}
                {item.it}
              </span>
              <span className="shrink-0 text-right text-xs text-inchiostro-400">{item.de}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
