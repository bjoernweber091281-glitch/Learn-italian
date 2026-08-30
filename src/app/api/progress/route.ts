import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { CardState } from "@/lib/srs";
import type { LessonStep } from "@/content/types";

export const dynamic = "force-dynamic";

interface LessonPayload {
  steps: LessonStep[];
  completed: boolean;
  bestQuizScore: number;
  quizTotal: number;
  lastVisitedAt: string;
}

interface ProgressPayload {
  learnerId: string;
  lessons: Record<string, LessonPayload>;
  cards: Record<string, CardState>;
}

/**
 * Fortschritt eines Lernenden lesen. Ist die Datenbank nicht erreichbar,
 * antwortet die Route mit 503 — der Client arbeitet dann rein lokal weiter.
 */
export async function GET(request: Request) {
  const learnerId = new URL(request.url).searchParams.get("learnerId");
  if (!learnerId) {
    return NextResponse.json({ error: "learnerId fehlt" }, { status: 400 });
  }

  try {
    const [lessonRows, cardRows] = await Promise.all([
      prisma.lessonProgress.findMany({ where: { learnerId } }),
      prisma.flashcardState.findMany({ where: { learnerId } }),
    ]);

    const lessons: Record<string, LessonPayload> = {};
    for (const row of lessonRows) {
      lessons[row.lessonSlug] = {
        steps: JSON.parse(row.stepsCompleted) as LessonStep[],
        completed: row.completed,
        bestQuizScore: row.bestQuizScore,
        quizTotal: row.quizTotal,
        lastVisitedAt: row.lastVisitedAt.toISOString(),
      };
    }

    const cards: Record<string, CardState> = {};
    for (const row of cardRows) {
      cards[row.cardId] = {
        cardId: row.cardId,
        ease: row.ease,
        intervalDay: row.intervalDay,
        repetitions: row.repetitions,
        lapses: row.lapses,
        dueAt: row.dueAt.toISOString(),
      };
    }

    return NextResponse.json({ lessons, cards });
  } catch {
    return NextResponse.json(
      { error: "Datenbank nicht verfügbar", lessons: {}, cards: {} },
      { status: 503 },
    );
  }
}

/** Kompletten Fortschritt speichern (der Client schickt seinen Gesamtzustand). */
export async function POST(request: Request) {
  let payload: ProgressPayload;
  try {
    payload = (await request.json()) as ProgressPayload;
  } catch {
    return NextResponse.json({ error: "Ungültiger Body" }, { status: 400 });
  }

  const { learnerId, lessons = {}, cards = {} } = payload;
  if (!learnerId) {
    return NextResponse.json({ error: "learnerId fehlt" }, { status: 400 });
  }

  try {
    await prisma.learner.upsert({
      where: { id: learnerId },
      create: { id: learnerId },
      update: {},
    });

    // Nur Lektionen speichern, die es in der Datenbank auch gibt.
    const knownSlugs = new Set(
      (await prisma.lesson.findMany({ select: { slug: true } })).map((row) => row.slug),
    );

    for (const [slug, lesson] of Object.entries(lessons)) {
      if (!knownSlugs.has(slug)) continue;
      const data = {
        stepsCompleted: JSON.stringify(lesson.steps ?? []),
        completed: Boolean(lesson.completed),
        bestQuizScore: Number(lesson.bestQuizScore ?? 0),
        quizTotal: Number(lesson.quizTotal ?? 0),
        lastVisitedAt: new Date(lesson.lastVisitedAt ?? Date.now()),
      };
      await prisma.lessonProgress.upsert({
        where: { learnerId_lessonSlug: { learnerId, lessonSlug: slug } },
        create: { learnerId, lessonSlug: slug, ...data },
        update: data,
      });
    }

    for (const [cardId, card] of Object.entries(cards)) {
      const data = {
        ease: Number(card.ease ?? 2.5),
        intervalDay: Number(card.intervalDay ?? 0),
        repetitions: Number(card.repetitions ?? 0),
        lapses: Number(card.lapses ?? 0),
        dueAt: new Date(card.dueAt ?? Date.now()),
      };
      await prisma.flashcardState.upsert({
        where: { learnerId_cardId: { learnerId, cardId } },
        create: { learnerId, cardId, ...data },
        update: data,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Datenbank nicht verfügbar" }, { status: 503 });
  }
}
