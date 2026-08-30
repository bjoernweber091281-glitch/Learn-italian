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

const STORAGE_KEY = "la-via-italiana:progress:v1";
const LEARNER_KEY = "la-via-italiana:learner:v1";

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

/** `local` = nur im Browser, `synced` = zusätzlich in der Datenbank. */
export type SyncState = "loading" | "synced" | "local";

interface ProgressContextValue extends ProgressState {
  learnerId: string;
  syncState: SyncState;
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

function readLearnerId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.localStorage.getItem(LEARNER_KEY);
    if (existing) return existing;
    const generated =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `learner-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(LEARNER_KEY, generated);
    return generated;
  } catch {
    return "";
  }
}

/** Vereinigt lokalen und serverseitigen Stand — der weiter fortgeschrittene gewinnt. */
function mergeStates(local: ProgressState, remote: ProgressState): ProgressState {
  const lessons: Record<string, LessonProgress> = { ...local.lessons };
  for (const [slug, remoteLesson] of Object.entries(remote.lessons)) {
    const localLesson = lessons[slug];
    if (!localLesson) {
      lessons[slug] = remoteLesson;
      continue;
    }
    lessons[slug] = {
      steps: Array.from(new Set([...localLesson.steps, ...remoteLesson.steps])),
      completed: localLesson.completed || remoteLesson.completed,
      bestQuizScore: Math.max(localLesson.bestQuizScore, remoteLesson.bestQuizScore),
      quizTotal: Math.max(localLesson.quizTotal, remoteLesson.quizTotal),
      lastVisitedAt:
        localLesson.lastVisitedAt > remoteLesson.lastVisitedAt
          ? localLesson.lastVisitedAt
          : remoteLesson.lastVisitedAt,
    };
  }

  const cards: CardStateMap = { ...local.cards };
  for (const [id, remoteCard] of Object.entries(remote.cards)) {
    const localCard = cards[id];
    // Mehr Wiederholungen bedeutet den aktuelleren Lernstand.
    if (!localCard || remoteCard.repetitions > localCard.repetitions) cards[id] = remoteCard;
  }

  return { lessons, cards };
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>({ lessons: {}, cards: {} });
  const [learnerId, setLearnerId] = useState("");
  const [syncState, setSyncState] = useState<SyncState>("loading");
  const hydrated = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Lokalen Stand laden, danach den Server dazumischen.
  useEffect(() => {
    const id = readLearnerId();
    const local = readLocal();
    setLearnerId(id);
    setState(local);
    hydrated.current = true;

    if (!id) {
      setSyncState("local");
      return;
    }

    let cancelled = false;
    fetch(`/api/progress?learnerId=${encodeURIComponent(id)}`)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("offline"))))
      .then((remote: ProgressState) => {
        if (cancelled) return;
        setState((current) => mergeStates(current, remote));
        setSyncState("synced");
      })
      .catch(() => {
        if (!cancelled) setSyncState("local");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // 2. Jede Änderung sofort lokal sichern, gebündelt an den Server schicken.
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* Privater Modus o. Ä. — der Lauf geht auch ohne Persistenz weiter. */
    }

    if (!learnerId || syncState === "loading") return;
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learnerId, ...state }),
      })
        .then((response) => setSyncState(response.ok ? "synced" : "local"))
        .catch(() => setSyncState("local"));
    }, 800);

    return () => {
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
  }, [state, learnerId, syncState]);

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
    learnerId,
    syncState,
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
