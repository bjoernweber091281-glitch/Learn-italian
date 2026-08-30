"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 * Text-to-Speech (Web Speech API)
 * ------------------------------------------------------------------ */

export interface SpeakOptions {
  rate?: number;
  /** Kennung, damit die UI weiß, welche Zeile gerade spricht. */
  id?: string;
}

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickItalianVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  const italian = voices.filter((v) => v.lang.toLowerCase().startsWith("it"));
  if (italian.length === 0) return null;
  // Lokale Stimmen klingen flüssiger und funktionieren offline.
  cachedVoice = italian.find((v) => v.localService) ?? italian[0];
  return cachedVoice;
}

/**
 * Italienische Sprachausgabe mit Geschwindigkeitsregelung.
 * Gibt `speakingId` zurück, damit einzelne Play-Buttons ihren Zustand kennen.
 */
export function useItalianSpeech() {
  const [supported, setSupported] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    const load = () => {
      cachedVoice = null;
      setVoiceReady(pickItalianVoice() !== null);
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, []);

  const speak = useCallback(
    (text: string, options: SpeakOptions = {}) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = pickItalianVoice();
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang ?? "it-IT";
      utterance.rate = options.rate ?? 1;
      utterance.pitch = 1;

      const id = options.id ?? text;
      utterance.onstart = () => setSpeakingId(id);
      utterance.onend = () => setSpeakingId((current) => (current === id ? null : current));
      utterance.onerror = () => setSpeakingId((current) => (current === id ? null : current));

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [],
  );

  const toggle = useCallback(
    (text: string, options: SpeakOptions = {}) => {
      const id = options.id ?? text;
      if (speakingId === id) stop();
      else speak(text, options);
    },
    [speakingId, speak, stop],
  );

  return { supported, voiceReady, speakingId, speak, stop, toggle };
}

/* ------------------------------------------------------------------ *
 * Mikrofon-Aufnahme mit Live-Pegel für die Wellenform
 * ------------------------------------------------------------------ */

export type RecorderStatus = "idle" | "recording" | "recorded" | "denied" | "unsupported";

const WAVE_BARS = 48;

export function useVoiceRecorder() {
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const [levels, setLevels] = useState<number[]>(() => new Array(WAVE_BARS).fill(0));
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const startedAtRef = useRef(0);
  const urlRef = useRef<string | null>(null);

  const cleanup = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    void audioContextRef.current?.close().catch(() => undefined);
    audioContextRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cleanup();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, [cleanup]);

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioCtx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioCtx();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);

      const buffer = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteTimeDomainData(buffer);
        let sumSquares = 0;
        for (let i = 0; i < buffer.length; i += 1) {
          const centred = (buffer[i] - 128) / 128;
          sumSquares += centred * centred;
        }
        const rms = Math.sqrt(sumSquares / buffer.length);
        const level = Math.min(1, rms * 3.2);
        setLevels((previous) => [...previous.slice(1), level]);
        setSeconds((Date.now() - startedAtRef.current) / 1000);
        rafRef.current = requestAnimationFrame(tick);
      };

      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        const url = URL.createObjectURL(blob);
        urlRef.current = url;
        setAudioUrl(url);
        setStatus("recorded");
        cleanup();
      };

      recorderRef.current = recorder;
      startedAtRef.current = Date.now();
      setSeconds(0);
      setLevels(new Array(WAVE_BARS).fill(0));
      recorder.start();
      setStatus("recording");
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      setStatus("denied");
      cleanup();
    }
  }, [cleanup]);

  const stop = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    } else {
      cleanup();
      setStatus("idle");
    }
  }, [cleanup]);

  const reset = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setAudioUrl(null);
    setLevels(new Array(WAVE_BARS).fill(0));
    setSeconds(0);
    setStatus("idle");
  }, []);

  return { status, levels, audioUrl, seconds, start, stop, reset, barCount: WAVE_BARS };
}

/* ------------------------------------------------------------------ *
 * Spracherkennung — Aussprachebewertung
 * ------------------------------------------------------------------ */

interface RecognitionResultLike {
  transcript: string;
  isFinal: boolean;
}

type RecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<RecognitionResultLike> & { isFinal: boolean }> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getRecognitionConstructor(): (new () => RecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => RecognitionLike;
    webkitSpeechRecognition?: new () => RecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Entfernt Interpunktion und Akzente für den Vergleich. */
export function normalizeItalian(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Wortweiser Abgleich: Anteil der korrekt erkannten Zielwörter in Prozent. */
export function scorePronunciation(target: string, heard: string) {
  const targetWords = normalizeItalian(target).split(" ").filter(Boolean);
  const heardWords = normalizeItalian(heard).split(" ").filter(Boolean);
  const pool = [...heardWords];

  const matched: boolean[] = targetWords.map((word) => {
    const index = pool.findIndex((candidate) => candidate === word);
    if (index >= 0) {
      pool.splice(index, 1);
      return true;
    }
    // Toleranz für Endungen: "parlo" vs. "parla"
    const near = pool.findIndex(
      (candidate) =>
        candidate.length > 3 && word.length > 3 && candidate.slice(0, -1) === word.slice(0, -1),
    );
    if (near >= 0) {
      pool.splice(near, 1);
      return true;
    }
    return false;
  });

  const hits = matched.filter(Boolean).length;
  const score = targetWords.length === 0 ? 0 : Math.round((hits / targetWords.length) * 100);
  return { score, targetWords, matched };
}

export type RecognitionStatus = "idle" | "listening" | "done" | "denied" | "unsupported";

export function useSpeechRecognition() {
  const [status, setStatus] = useState<RecognitionStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<RecognitionLike | null>(null);

  useEffect(() => {
    if (getRecognitionConstructor() === null) setStatus("unsupported");
    return () => recognitionRef.current?.abort();
  }, []);

  const listen = useCallback(() => {
    const Constructor = getRecognitionConstructor();
    if (!Constructor) {
      setStatus("unsupported");
      return;
    }
    const recognition = new Constructor();
    recognition.lang = "it-IT";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let latest = "";
    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i += 1) {
        text += event.results[i][0].transcript;
      }
      latest = text;
      setTranscript(text);
    };
    recognition.onerror = (event) => {
      setStatus(event.error === "not-allowed" ? "denied" : "idle");
    };
    recognition.onend = () => {
      setStatus((current) => (current === "listening" ? (latest ? "done" : "idle") : current));
    };

    recognitionRef.current = recognition;
    setTranscript("");
    setStatus("listening");
    recognition.start();
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const reset = useCallback(() => {
    recognitionRef.current?.abort();
    setTranscript("");
    setStatus(getRecognitionConstructor() ? "idle" : "unsupported");
  }, []);

  return { status, transcript, listen, stop, reset };
}
