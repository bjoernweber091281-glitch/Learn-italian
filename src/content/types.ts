/**
 * Inhaltsmodell für "La Via Italiana".
 *
 * Die Lektionen werden hier als typisierte TypeScript-Module autoriert — das ist
 * die Single Source of Truth. Die Typen erzwingen, dass keine Lektion ohne
 * Racconto, Grammatik, Dialog, Shadowing, Vokabular und Quiz durchrutscht.
 */

export type PhaseCode = "A1-A2" | "B1-B2" | "C1-C2";

export interface Phase {
  code: PhaseCode;
  romanNumeral: string;
  title: string;
  italianTitle: string;
  subtitle: string;
  description: string;
  goals: string[];
  accent: "terracotta" | "oliva" | "indigo";
}

/** Ein Satz im Racconto: Italienisch mit aufdeckbarer deutscher Übersetzung. */
export interface StorySentence {
  id: string;
  it: string;
  de: string;
  /** Begriffe im italienischen Satz, die als Vokabel hervorgehoben werden. */
  highlights?: string[];
  /** Optionale Kultur-/Sprachnotiz unter dem Satz. */
  note?: string;
}

export interface Racconto {
  title: string;
  italianTitle: string;
  kicker: string;
  intro: string;
  sentences: StorySentence[];
  culturalNote: {
    title: string;
    body: string;
    source?: string;
  };
}

export interface GrammarTable {
  caption?: string;
  headers: string[];
  rows: string[][];
  /** Zeilenindizes, die farblich betont werden (Unregelmäßigkeiten). */
  emphasizeRows?: number[];
}

export interface GrammarComparison {
  leftTitle: string;
  leftHint: string;
  rightTitle: string;
  rightHint: string;
  rows: { label: string; left: string; right: string }[];
}

export interface GrammarExample {
  it: string;
  de: string;
  /** Teilstring in `it`, der hervorgehoben wird. */
  focus?: string;
}

export interface GrammarSection {
  id: string;
  title: string;
  italianTitle: string;
  explanation: string;
  tables?: GrammarTable[];
  comparison?: GrammarComparison;
  examples?: GrammarExample[];
  tip?: string;
}

export type ChoiceQuality = "perfetto" | "ok" | "no";

export interface DialogueChoice {
  it: string;
  de: string;
  quality: ChoiceQuality;
  feedback: string;
  /** Füllwort/Diskursmarker, den diese Antwort trainiert. */
  filler?: string;
}

export type DialogueStep =
  | {
      role: "partner";
      speaker: string;
      it: string;
      de: string;
      stageDirection?: string;
    }
  | {
      role: "you";
      speaker: string;
      /** Deutsche Regieanweisung: Was willst du sagen? */
      prompt: string;
      choices: DialogueChoice[];
    };

export interface Dialogue {
  title: string;
  italianTitle: string;
  setting: string;
  yourRole: string;
  partnerRole: string;
  steps: DialogueStep[];
}

export interface FillerWord {
  word: string;
  literal: string;
  meaning: string;
  register: "colloquiale" | "neutro" | "informale";
  example: { it: string; de: string };
  whenToUse: string;
}

export interface Gesture {
  name: string;
  italianName: string;
  hand: string;
  meaning: string;
  whenToUse: string;
  caution?: string;
}

export interface VocabItem {
  it: string;
  de: string;
  pos: "sost." | "verbo" | "agg." | "avv." | "espr." | "prep." | "num.";
  /** Artikel bei Substantiven, z. B. "il", "la", "lo", "l'" */
  article?: string;
  plural?: string;
  example: { it: string; de: string };
  tags: string[];
}

export interface ShadowingLine {
  it: string;
  de: string;
  /** Betonungshilfe, z. B. "co-los-SE-o" */
  rhythm?: string;
  tip?: string;
}

export type QuizQuestion =
  | {
      id: string;
      type: "fill";
      prompt: string;
      /** Satz mit "___" als Lücke. */
      sentence: string;
      accepted: string[];
      hint?: string;
      explanation: string;
    }
  | {
      id: string;
      type: "translate";
      prompt: string;
      de: string;
      accepted: string[];
      hint?: string;
      explanation: string;
    }
  | {
      id: string;
      type: "choice";
      prompt: string;
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    };

export interface Lesson {
  slug: string;
  number: number;
  phase: PhaseCode;
  title: string;
  subtitle: string;
  location: string;
  unesco?: string;
  minutes: number;
  summary: string;
  published: boolean;
  racconto: Racconto;
  grammatica: GrammarSection[];
  dialogo: Dialogue;
  madrelingua: {
    intro: string;
    fillers: FillerWord[];
    gestures: Gesture[];
  };
  shadowing: {
    intro: string;
    lines: ShadowingLine[];
  };
  vocabulary: VocabItem[];
  quiz: QuizQuestion[];
}

/** Noch nicht ausgearbeitete Lektion — erscheint als Vorschau-Karte im Roadmap. */
export interface LessonPreview {
  slug: string;
  number: number;
  phase: PhaseCode;
  title: string;
  subtitle: string;
  location: string;
  unesco?: string;
  summary: string;
  published: false;
}

export type RoadmapEntry = Lesson | LessonPreview;

export function isPublished(entry: RoadmapEntry): entry is Lesson {
  return entry.published === true;
}

export const LESSON_STEPS = ["racconto", "grammatica", "dialogo"] as const;
export type LessonStep = (typeof LESSON_STEPS)[number];
