"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AudioLines,
  Ear,
  Gauge,
  Mic,
  MicOff,
  Play,
  RefreshCw,
  Square,
  Volume2,
} from "lucide-react";
import type { Lesson } from "@/content/types";
import {
  scorePronunciation,
  useItalianSpeech,
  useSpeechRecognition,
  useVoiceRecorder,
} from "@/lib/speech";

const speeds = [
  { value: 0.75, label: "0,75×", hint: "lento — jede Silbe hörbar" },
  { value: 1, label: "1,0×", hint: "madrelingua" },
];

export function ShadowingTrainer({ lesson }: { lesson: Lesson }) {
  const lines = lesson.shadowing.lines;
  const [index, setIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const line = lines[index];

  const { supported: ttsSupported, speakingId, toggle } = useItalianSpeech();
  const recorder = useVoiceRecorder();
  const recognition = useSpeechRecognition();

  const result = useMemo(
    () => (recognition.transcript ? scorePronunciation(line.it, recognition.transcript) : null),
    [recognition.transcript, line.it],
  );

  const selectLine = (next: number) => {
    setIndex(next);
    recorder.reset();
    recognition.reset();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <header className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-600">
            Pronuncia & Shadowing
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-inchiostro-800 sm:text-4xl">
            Sprich mit, nicht nach
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-inchiostro-500">
            {lesson.shadowing.intro}
          </p>
        </header>

        <div className="rounded-3xl border border-marmo-300 bg-marmo-50 p-5 shadow-carta sm:p-7">
          {/* Aktuelle Zeile */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-inchiostro-400">
            Zeile {index + 1} von {lines.length}
          </p>
          <p className="mt-2 font-display text-2xl leading-snug text-inchiostro-800 sm:text-3xl">
            {line.it}
          </p>
          <p className="mt-1 text-sm text-inchiostro-500">{line.de}</p>
          {line.rhythm && (
            <p className="mt-3 inline-block rounded-lg bg-marmo-200/70 px-3 py-1.5 font-mono text-xs tracking-wide text-inchiostro-600">
              {line.rhythm}
            </p>
          )}
          {line.tip && (
            <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-oliva-700">
              <Ear className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {line.tip}
            </p>
          )}

          {/* Tempo */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-marmo-200 pt-5">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-inchiostro-400">
              <Gauge className="h-3.5 w-3.5" aria-hidden />
              Tempo
            </span>
            <div className="flex gap-1 rounded-full bg-marmo-200 p-1">
              {speeds.map((speed) => (
                <button
                  key={speed.value}
                  type="button"
                  onClick={() => setRate(speed.value)}
                  title={speed.hint}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    rate === speed.value
                      ? "bg-marmo-50 text-inchiostro-800 shadow-carta"
                      : "text-inchiostro-400"
                  }`}
                >
                  {speed.label}
                </button>
              ))}
            </div>

            {ttsSupported ? (
              <button
                type="button"
                onClick={() => toggle(line.it, { rate, id: `shadow-${index}` })}
                className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-4 py-2 text-sm font-semibold text-marmo-50 transition-colors hover:bg-terracotta-600"
              >
                {speakingId === `shadow-${index}` ? (
                  <>
                    <Square className="h-4 w-4" aria-hidden /> Stopp
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" aria-hidden /> Anhören
                  </>
                )}
              </button>
            ) : (
              <span className="text-xs text-inchiostro-400">
                Dein Browser bietet keine Sprachausgabe an.
              </span>
            )}
          </div>

          {/* Aufnahme */}
          <div className="mt-5 rounded-2xl border border-marmo-300 bg-marmo-100/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-inchiostro-400">
                <AudioLines className="h-3.5 w-3.5" aria-hidden />
                Deine Aufnahme
              </span>
              <span className="tabular-nums text-xs text-inchiostro-400">
                {recorder.status === "recording" ? `${recorder.seconds.toFixed(1)} s` : ""}
              </span>
            </div>

            <Waveform levels={recorder.levels} active={recorder.status === "recording"} />

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {recorder.status === "recording" ? (
                <button
                  type="button"
                  onClick={recorder.stop}
                  className="registrazione-attiva inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-4 py-2 text-sm font-semibold text-marmo-50"
                >
                  <Square className="h-4 w-4" aria-hidden />
                  Aufnahme beenden
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void recorder.start()}
                  className="inline-flex items-center gap-2 rounded-full border border-terracotta-300 bg-marmo-50 px-4 py-2 text-sm font-semibold text-terracotta-700 transition-colors hover:bg-terracotta-50"
                >
                  <Mic className="h-4 w-4" aria-hidden />
                  {recorder.status === "recorded" ? "Neu aufnehmen" : "Mitsprechen & aufnehmen"}
                </button>
              )}

              {recorder.audioUrl && (
                <audio
                  controls
                  src={recorder.audioUrl}
                  className="h-9 max-w-full"
                  aria-label="Deine Aufnahme abspielen"
                />
              )}

              {recorder.status === "denied" && (
                <span className="inline-flex items-center gap-1.5 text-xs text-terracotta-700">
                  <MicOff className="h-3.5 w-3.5" aria-hidden />
                  Kein Zugriff auf das Mikrofon — bitte im Browser erlauben.
                </span>
              )}
              {recorder.status === "unsupported" && (
                <span className="text-xs text-inchiostro-400">
                  Dieser Browser unterstützt keine Audioaufnahme.
                </span>
              )}
            </div>
          </div>

          {/* Ausspracheprüfung */}
          <div className="mt-4 rounded-2xl border border-oliva-200 bg-oliva-50/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-oliva-700">
                Ausspracheprüfung
              </span>
              {recognition.status !== "unsupported" ? (
                <button
                  type="button"
                  onClick={recognition.status === "listening" ? recognition.stop : recognition.listen}
                  className="inline-flex items-center gap-2 rounded-full bg-oliva-600 px-4 py-1.5 text-sm font-semibold text-marmo-50 transition-colors hover:bg-oliva-700"
                >
                  {recognition.status === "listening" ? (
                    <>
                      <Square className="h-3.5 w-3.5" aria-hidden /> Fertig
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" aria-hidden /> Satz sprechen
                    </>
                  )}
                </button>
              ) : (
                <span className="text-xs text-inchiostro-400">
                  Spracherkennung nicht verfügbar (am besten in Chrome oder Edge).
                </span>
              )}
            </div>

            {recognition.status === "denied" && (
              <p className="mt-2 text-xs text-terracotta-700">
                Der Mikrofonzugriff wurde abgelehnt.
              </p>
            )}

            {result && (
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="cifre text-3xl font-semibold text-oliva-700">
                    {result.score}%
                  </span>
                  <span className="text-xs text-inchiostro-500">
                    der Zielwörter erkannt · gehört: «{recognition.transcript}»
                  </span>
                </div>
                <p className="mt-2 flex flex-wrap gap-1.5">
                  {result.targetWords.map((word, wordIndex) => (
                    <span
                      key={`${word}-${wordIndex}`}
                      className={`rounded px-1.5 py-0.5 font-display text-base ${
                        result.matched[wordIndex]
                          ? "bg-oliva-200 text-oliva-800"
                          : "bg-terracotta-100 text-terracotta-800 line-through decoration-terracotta-400"
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </p>
                <button
                  type="button"
                  onClick={recognition.reset}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-inchiostro-400 hover:text-inchiostro-600"
                >
                  <RefreshCw className="h-3 w-3" aria-hidden />
                  Neu versuchen
                </button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-marmo-200 pt-4">
            <button
              type="button"
              onClick={() => selectLine(Math.max(0, index - 1))}
              disabled={index === 0}
              className="rounded-full border border-marmo-300 px-4 py-2 text-sm font-medium text-inchiostro-500 transition-colors hover:bg-marmo-200 disabled:opacity-40"
            >
              Zurück
            </button>
            <button
              type="button"
              onClick={() => selectLine(Math.min(lines.length - 1, index + 1))}
              disabled={index === lines.length - 1}
              className="rounded-full bg-inchiostro-700 px-4 py-2 text-sm font-semibold text-marmo-50 transition-colors hover:bg-inchiostro-800 disabled:opacity-40"
            >
              Nächste Zeile
            </button>
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-marmo-300 bg-marmo-50/80 p-4">
          <h3 className="font-display text-base font-semibold text-inchiostro-800">
            Tutte le frasi
          </h3>
          <ul className="mt-3 space-y-1.5">
            {lines.map((item, itemIndex) => (
              <li key={item.it}>
                <button
                  type="button"
                  onClick={() => selectLine(itemIndex)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    itemIndex === index
                      ? "bg-terracotta-50 text-terracotta-800 ring-1 ring-terracotta-200"
                      : "text-inchiostro-500 hover:bg-marmo-200"
                  }`}
                >
                  <span className="font-display text-base leading-snug">{item.it}</span>
                  <span className="block text-xs text-inchiostro-400">{item.de}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

/** Live-Wellenform aus den RMS-Pegeln des Mikrofons. */
function Waveform({ levels, active }: { levels: number[]; active: boolean }) {
  return (
    <div
      className="mt-3 flex h-16 items-center gap-[3px] rounded-xl bg-marmo-50 px-3"
      aria-hidden
    >
      {levels.map((level, index) => (
        <motion.span
          key={index}
          className={`flex-1 rounded-full ${active ? "bg-terracotta-500" : "bg-marmo-300"}`}
          animate={{ height: `${Math.max(4, level * 100)}%` }}
          transition={{ duration: 0.08 }}
          style={{ minHeight: 3 }}
        />
      ))}
    </div>
  );
}
