import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { roadmapSummaries } from "@/content";

export const dynamic = "force-dynamic";

/**
 * Lektionsübersicht aus der Datenbank. Ist noch nicht geseedet worden
 * (oder fehlt die DB ganz), liefert die Route den Stand aus den Inhaltsmodulen.
 */
export async function GET() {
  try {
    const rows = await prisma.lesson.findMany({
      orderBy: { number: "asc" },
      select: {
        slug: true,
        number: true,
        phase: true,
        title: true,
        subtitle: true,
        location: true,
        unesco: true,
        summary: true,
        published: true,
        updatedAt: true,
      },
    });
    if (rows.length > 0) return NextResponse.json({ source: "database", lessons: rows });
  } catch {
    /* Fällt unten auf die Inhaltsmodule zurück. */
  }

  return NextResponse.json({ source: "content", lessons: roadmapSummaries });
}
