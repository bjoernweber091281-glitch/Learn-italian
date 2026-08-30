import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson, getPhase, lessons } from "@/content";
import { LessonShell } from "@/components/lesson/LessonShell";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lektion nicht gefunden" };
  return {
    title: `Lektion ${lesson.number}: ${lesson.title}`,
    description: lesson.summary,
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  return <LessonShell lesson={lesson} phase={getPhase(lesson.phase)} />;
}
