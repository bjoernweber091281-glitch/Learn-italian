/**
 * Spaced Repetition — eine schlanke SM-2-Variante.
 *
 * Bewertung durch den Lernenden:
 *   "again" (nicht gewusst) · "hard" (mühsam) · "good" (gewusst) · "easy" (sofort)
 *
 * Der Zustand ist bewusst serialisierbar, damit er sowohl in SQLite als auch
 * im LocalStorage liegen kann.
 */

export type Grade = "again" | "hard" | "good" | "easy";

export interface CardState {
  cardId: string;
  ease: number;
  intervalDay: number;
  repetitions: number;
  lapses: number;
  /** ISO-Datum der nächsten Fälligkeit. */
  dueAt: string;
}

const GRADE_QUALITY: Record<Grade, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

export const MIN_EASE = 1.3;

export function createCardState(cardId: string): CardState {
  return {
    cardId,
    ease: 2.5,
    intervalDay: 0,
    repetitions: 0,
    lapses: 0,
    dueAt: new Date().toISOString(),
  };
}

export function review(state: CardState, grade: Grade, now = new Date()): CardState {
  const quality = GRADE_QUALITY[grade];
  const failed = quality < 3;

  let { ease, intervalDay, repetitions, lapses } = state;

  ease = Math.max(
    MIN_EASE,
    ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
  );

  if (failed) {
    repetitions = 0;
    lapses += 1;
    intervalDay = 0;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDay = grade === "easy" ? 4 : 1;
    else if (repetitions === 2) intervalDay = grade === "easy" ? 10 : 6;
    else intervalDay = Math.round(intervalDay * ease);
    if (grade === "hard") intervalDay = Math.max(1, Math.round(intervalDay * 0.7));
    if (grade === "easy" && repetitions > 2) intervalDay = Math.round(intervalDay * 1.3);
  }

  // Bei "again" kommt die Karte in derselben Sitzung wieder (10 Minuten).
  const dueAt = new Date(
    failed ? now.getTime() + 10 * 60 * 1000 : now.getTime() + intervalDay * 24 * 60 * 60 * 1000,
  );

  return { ...state, ease, intervalDay, repetitions, lapses, dueAt: dueAt.toISOString() };
}

export function isDue(state: CardState | undefined, now = new Date()): boolean {
  if (!state) return true;
  return new Date(state.dueAt).getTime() <= now.getTime();
}

/** Menschlich lesbare Vorschau, die auf den Antwort-Buttons steht. */
export function previewInterval(state: CardState, grade: Grade): string {
  const next = review(state, grade);
  if (grade === "again") return "10 Min.";
  if (next.intervalDay <= 1) return "1 Tag";
  if (next.intervalDay < 30) return `${next.intervalDay} Tage`;
  const months = Math.round(next.intervalDay / 30);
  return months <= 1 ? "1 Monat" : `${months} Monate`;
}

export type CardStateMap = Record<string, CardState>;
