import type { Metadata } from "next";
import { allVocabulary } from "@/content";
import { FlashcardTrainer } from "@/components/FlashcardTrainer";

export const metadata: Metadata = {
  title: "Vocabolario",
  description:
    "Karteikasten mit Spaced Repetition für alle Vokabeln der freigeschalteten Lektionen.",
};

export default function VocabularyPage() {
  return <FlashcardTrainer cards={allVocabulary} />;
}
