"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { LessonStep } from "@/content/types";
import { createCardState, review, type CardState, type CardStateMap, type Grade } from "@/lib/srs";

/**
 * Lernfortschritt — ausschließlich im Browser.
 *
 * Es gibt bewusst keinen Server: Der Zustand lebt im localStorage des jeweiligen
 * Geräts. Das heißt, er überlebt Neuladen und Schließen des Tabs, wandert aber
 * nicht auf andere Geräte oder Browser mit. Der Schlüssel ist versioniert, damit
 * ein späteres Format-Update alte Stände nicht stillschweigend zerlegt.
 */
const STORAGE_KEY = "la-via-italiana:progress:v1";

export interface LessonProgress {
  steps: LessonStep[];
  completed: boolean;
  bestQuizScore: number;
  quizTotal: number;
  lastVisitedAt: string;
}

export interface ProgressState {
  lessons: Record<string, LessonProgress>;
  cards: CardStateMap;
}

/** `checking` bis der gespeicherte Stand gelesen ist, danach das Ergebnis. */
export type StorageState = "checking" | "persisted" | "unavailable";

interface ProgressContextValue extends ProgressState {
  storageState: StorageState;
  lessonProgress: (slug: string) => LessonProgress;
  markStep: (slug: string, step: LessonStep) => void;
  markVisited: (slug: string) => void;
  recordQuiz: (slug: string, score: number, total: number) => void;
  cardState: (cardId: string) => CardState;
  gradeCard: (cardId: string, grade: Grade) => void;
  resetProgress: () => void;
  completedLessons: string[];
}

const emptyLesson: LessonProgress = {
  steps: [],
  completed: false,
  bestQuizScore: 0,
  quizTotal: 0,
  lastVisitedAt: new Date(0).toISOString(),
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function readLocal(): ProgressState {
  if (typeof window === "undefined") return { lessons: {}, cards: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lessons: {}, cards: {} };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { lessons: parsed.lessons ?? {}, cards: parsed.cards ?? {} };
  } catch {
    return { lessons: {}, cards: {} };
  }
}

/** Prüft, ob der Browser überhaupt schreiben lässt (privater Modus, Richtlinien). */
function canPersist(): boolean {
  try {
    const probe = `${STORAGE_KEY}:probe`;
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>({ lessons: {}, cards: {} });
  const [storageState, setStorageState] = useState<StorageState>("checking");
  const hydrated = useRef(false);

  // 1. Gespeicherten Stand einlesen. Erst danach darf geschrieben werden, sonst
  //    überschreibt der leere Startzustand beim ersten Render die Historie.
  useEffect(() => {
    setState(readLocal());
    setStorageState(canPersist() ? "persisted" : "unavailable");
    hydrated.current = true;
  }, []);

  // 2. Jede Änderung sofort sichern.
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Privater Modus, volles Kontingent oder blockierte Speicherung: Die Sitzung
      // läuft normal weiter, nur eben ohne Gedächtnis über das Neuladen hinaus.
      setStorageState("unavailable");
    }
  }, [state]);

  const lessonProgress = useCallback(
    (slug: string) => state.lessons[slug] ?? emptyLesson,
    [state.lessons],
  );

  const updateLesson = useCallback(
    (slug: string, updater: (previous: LessonProgress) => LessonProgress) => {
      setState((current) => {
        const previous = current.lessons[slug] ?? emptyLesson;
        const next = updater(previous);
        return { ...current, lessons: { ...current.lessons, [slug]: next } };
      });
    },
    [],
  );

  const markStep = useCallback(
    (slug: string, step: LessonStep) => {
      updateLesson(slug, (previous) => {
        if (previous.steps.includes(step)) return previous;
        const steps = [...previous.steps, step];
        return {
          ...previous,
          steps,
          completed: previous.completed || steps.length >= 3,
          lastVisitedAt: new Date().toISOString(),
        };
      });
    },
    [updateLesson],
  );

  const markVisited = useCallback(
    (slug: string) => {
      updateLesson(slug, (previous) => ({
        ...previous,
        lastVisitedAt: new Date().toISOString(),
      }));
    },
    [updateLesson],
  );

  const recordQuiz = useCallback(
    (slug: string, score: number, total: number) => {
      updateLesson(slug, (previous) => ({
        ...previous,
        bestQuizScore: Math.max(previous.bestQuizScore, score),
        quizTotal: total,
        lastVisitedAt: new Date().toISOString(),
      }));
    },
    [updateLesson],
  );

  const cardState = useCallback(
    (id: string) => state.cards[id] ?? createCardState(id),
    [state.cards],
  );

  const gradeCard = useCallback((id: string, grade: Grade) => {
    setState((current) => {
      const previous = current.cards[id] ?? createCardState(id);
      return { ...current, cards: { ...current.cards, [id]: review(previous, grade) } };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState({ lessons: {}, cards: {} });
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* Ohne Speicher gibt es auch nichts zu löschen. */
    }
  }, []);

  const completedLessons = useMemo(
    () =>
      Object.entries(state.lessons)
        .filter(([, progress]) => progress.completed)
        .map(([slug]) => slug),
    [state.lessons],
  );

  const value: ProgressContextValue = {
    ...state,
    storageState,
    lessonProgress,
    markStep,
    markVisited,
    recordQuiz,
    cardState,
    gradeCard,
    resetProgress,
    completedLessons,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress muss innerhalb von <ProgressProvider> stehen.");
  return context;
}
