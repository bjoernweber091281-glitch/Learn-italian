/**
 * Befüllt die SQLite-Datenbank mit den ausgearbeiteten Lektionen.
 * Aufruf: npm run db:push && npm run db:seed
 */
import { PrismaClient } from "@prisma/client";
import { lessons, lessonPreviews } from "../src/content";

const prisma = new PrismaClient();

async function main() {
  for (const lesson of lessons) {
    const { slug, number, phase, title, subtitle, location, unesco, summary } = lesson;
    const record = {
      number,
      phase,
      title,
      subtitle,
      location,
      unesco: unesco ?? null,
      summary,
      published: true,
      payload: JSON.stringify(lesson),
    };
    await prisma.lesson.upsert({
      where: { slug },
      create: { slug, ...record },
      update: record,
    });
    console.log(`  ✓ Lektion ${number}: ${title} (${lesson.vocabulary.length} Vokabeln, ${lesson.quiz.length} Aufgaben)`);
  }

  for (const preview of lessonPreviews) {
    const { slug, number, phase, title, subtitle, location, unesco, summary } = preview;
    const record = {
      number,
      phase,
      title,
      subtitle,
      location,
      unesco: unesco ?? null,
      summary,
      published: false,
      payload: JSON.stringify(preview),
    };
    await prisma.lesson.upsert({
      where: { slug },
      create: { slug, ...record },
      update: record,
    });
  }

  const total = await prisma.lesson.count();
  console.log(`\nFertig: ${total} Lektionen in der Datenbank (${lessons.length} ausgearbeitet).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
