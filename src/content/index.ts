import type { Lesson, LessonPreview, Phase, PhaseCode, RoadmapEntry } from "@/content/types";
import { lezione01 } from "@/content/lessons/lezione-01";
import { lezione02 } from "@/content/lessons/lezione-02";

export const phases: Phase[] = [
  {
    code: "A1-A2",
    romanNumeral: "I",
    title: "Das Fundament",
    italianTitle: "Le Fondamenta",
    subtitle: "Vom ersten Wort zum ersten echten Gespräch",
    description:
      "Du baust den Kern: Präsens, Artikel, Präpositionen, Vergangenheit im Alltag. Parallel lernst du die Rituale, die jedes Gespräch in Italien tragen — grüßen, bestellen, nach dem Weg fragen, danken.",
    goals: [
      "500 Wörter, die 80 % des Alltags abdecken",
      "essere, avere und die drei Konjugationen sitzen",
      "Du bestellst, fragst und antwortest ohne Zettel",
    ],
    accent: "terracotta",
  },
  {
    code: "B1-B2",
    romanNumeral: "II",
    title: "Die Brücke",
    italianTitle: "Il Ponte",
    subtitle: "Erzählen, begründen, widersprechen",
    description:
      "Hier trennt sich Schulitalienisch von echtem Italienisch: Passato Prossimo gegen Imperfetto, Pronomen, Konjunktiv. Kulturell gehst du in die Provinz — dorthin, wo Italien am dichtesten ist.",
    goals: [
      "Vergangenheit erzählen, ohne zu stocken",
      "Pronomen und Konjunktiv aktiv einsetzen",
      "Eine Meinung begründen und höflich dagegenhalten",
    ],
    accent: "oliva",
  },
  {
    code: "C1-C2",
    romanNumeral: "III",
    title: "Die Stimme",
    italianTitle: "La Voce",
    subtitle: "Register, Ironie, Nuancen",
    description:
      "Auf dieser Stufe geht es nicht mehr um Korrektheit, sondern um Wirkung: Wortwahl nach Register, Ironie, Sprichwörter, regionale Färbung. Du hörst auf zu übersetzen und fängst an, auf Italienisch zu denken.",
    goals: [
      "Register bewusst wechseln — vom Amt bis zur Bar",
      "Ironie und Understatement verstehen und einsetzen",
      "Debattieren, ohne den Faden zu verlieren",
    ],
    accent: "indigo",
  },
];

/** Vollständig ausgearbeitete Lektionen. */
export const lessons: Lesson[] = [lezione01, lezione02];

/** Geplante Lektionen — erscheinen im Roadmap als Vorschau. */
export const lessonPreviews: LessonPreview[] = [
  {
    slug: "firenze-famiglia-casa",
    number: 3,
    phase: "A1-A2",
    title: "La Famiglia e la Casa",
    subtitle: "Familie, Wohnen und die Renaissance",
    location: "Firenze, Toscana",
    unesco: "Historisches Zentrum von Florenz (UNESCO 1982)",
    summary:
      "Possessivpronomen, Familienwortschatz und die Frage, warum in Italien drei Generationen unter einem Dach kein Notfall sind.",
    published: false,
  },
  {
    slug: "bologna-mercato",
    number: 4,
    phase: "A1-A2",
    title: "Il Mercato e la Spesa",
    subtitle: "Einkaufen in «Bologna la Grassa»",
    location: "Bologna, Emilia-Romagna",
    summary:
      "Mengenangaben, Partitiv («del pane, delle uova»), Preise verhandeln — und warum es in Bologna keine Spaghetti Bolognese gibt.",
    published: false,
  },
  {
    slug: "cinque-terre-viaggio",
    number: 5,
    phase: "A1-A2",
    title: "Treni, Traghetti e Sentieri",
    subtitle: "Reisen zwischen Meer und Terrassen",
    location: "Cinque Terre, Liguria",
    unesco: "Portovenere, Cinque Terre und die Inseln (UNESCO 1997)",
    summary:
      "Fahrkarten, Uhrzeiten, Verspätungen. Grammatik: Futur, Modalverben und die Kunst, «un attimo» zu sagen.",
    published: false,
  },
  {
    slug: "ritmo-italiano",
    number: 6,
    phase: "A1-A2",
    title: "Il Ritmo della Giornata",
    subtitle: "Öffnungszeiten, riposo, passeggiata",
    location: "Venezia, Veneto",
    unesco: "Venedig und seine Lagune (UNESCO 1987)",
    summary:
      "Reflexive Verben, Tagesabläufe und die soziale Funktion der abendlichen Passeggiata.",
    published: false,
  },
  {
    slug: "monte-santangelo",
    number: 7,
    phase: "B1-B2",
    title: "Monte Sant'Angelo e i Borghi Millenari",
    subtitle: "Pilgerwege, Höhlenheiligtum und das andere Italien",
    location: "Monte Sant'Angelo, Gargano, Puglia",
    unesco: "Langobarden in Italien — Santuario di San Michele Arcangelo (UNESCO 2011)",
    summary:
      "Die Herzstück-Lektion der zweiten Phase: Passato Prossimo gegen Imperfetto, erzählt anhand einer 1500 Jahre alten Pilgerroute — und dem Leben in einem Borgo mit 12.000 Einwohnern.",
    published: false,
  },
  {
    slug: "pienza-val-dorcia",
    number: 8,
    phase: "B1-B2",
    title: "Pienza e la Val d'Orcia",
    subtitle: "Die erste geplante Stadt der Renaissance",
    location: "Pienza, Toscana",
    unesco: "Historisches Zentrum von Pienza (1996) & Val d'Orcia (2004)",
    summary:
      "Pius II. lässt sein Geburtsdorf in vier Jahren zur Idealstadt umbauen. Grammatik: Konditional, Vergleiche, Superlative — und Pecorino di Pienza.",
    published: false,
  },
  {
    slug: "milano-ossobuco",
    number: 9,
    phase: "B1-B2",
    title: "Ossobuco e il Nord Industriale",
    subtitle: "Mailand zwischen Nebel, Risotto und Design",
    location: "Milano, Lombardia",
    summary:
      "Ossobuco alla milanese, Safran-Risotto und die Frage, warum Mailänder schneller sprechen. Grammatik: direkte und indirekte Pronomen, ne und ci.",
    published: false,
  },
  {
    slug: "val-di-noto",
    number: 10,
    phase: "B1-B2",
    title: "Il Barocco Siciliano",
    subtitle: "Noto, Ragusa und der Wiederaufbau nach 1693",
    location: "Val di Noto, Sicilia",
    unesco: "Spätbarocke Städte des Val di Noto (UNESCO 2002)",
    summary:
      "Ein Erdbeben zerstört acht Städte — und schenkt Sizilien seinen Barock. Grammatik: Congiuntivo Presente nach Meinung und Zweifel.",
    published: false,
  },
  {
    slug: "cinema-italiano",
    number: 11,
    phase: "B1-B2",
    title: "Il Cinema Italiano",
    subtitle: "Von De Sica bis Sorrentino",
    location: "Cinecittà, Roma",
    summary:
      "Neorealismus, Commedia all'italiana, Der große Schönheit. Grammatik: indirekte Rede, Zeitenfolge, Filmzitate als Alltagssprache.",
    published: false,
  },
  {
    slug: "lavoro-burocrazia",
    number: 12,
    phase: "B1-B2",
    title: "Il Lavoro e la Burocrazia",
    subtitle: "Codice fiscale, PEC und der lange Schalter",
    location: "Ufficio, ovunque",
    summary:
      "Formelles Italienisch: Passiv, unpersönliches «si», E-Mail-Register. Die Lektion, die dich vom Touristen zum Bewohner macht.",
    published: false,
  },
  {
    slug: "dante-lingua",
    number: 13,
    phase: "C1-C2",
    title: "Dante e l'Invenzione dell'Italiano",
    subtitle: "Wie ein Exilant eine Nation erfand",
    location: "Firenze & Ravenna",
    summary:
      "Vom Volgare zur Staatssprache. Register erkennen, literarische Texte lesen, Archaismen im heutigen Alltag entdecken.",
    published: false,
  },
  {
    slug: "dolomiti-minoranze",
    number: 14,
    phase: "C1-C2",
    title: "Le Dolomiti e le Lingue Minori",
    subtitle: "Ladinisch, Deutsch, Italienisch auf 2000 Metern",
    location: "Dolomiti, Trentino-Alto Adige",
    unesco: "Die Dolomiten (UNESCO Naturerbe 2009)",
    summary:
      "Mehrsprachigkeit als Normalzustand. Grammatik: Congiuntivo Imperfetto und Trapassato, irreale Bedingungssätze.",
    published: false,
  },
  {
    slug: "langhe-vino",
    number: 15,
    phase: "C1-C2",
    title: "Il Sistema del Vino",
    subtitle: "Barolo, Langhe und die Sprache des Geschmacks",
    location: "Langhe-Roero e Monferrato, Piemonte",
    unesco: "Weinbaulandschaften des Piemont (UNESCO 2014)",
    summary:
      "Präzise Beschreibungssprache, Fachlexik, Metaphern. Wie man über Geschmack spricht, ohne ins Klischee zu fallen.",
    published: false,
  },
  {
    slug: "matera-sassi",
    number: 16,
    phase: "C1-C2",
    title: "Matera e la Vergogna Nazionale",
    subtitle: "Von der Schande Italiens zur Kulturhauptstadt",
    location: "Matera, Basilicata",
    unesco: "Sassi und Felsenkirchen von Matera (UNESCO 1993)",
    summary:
      "1952 zwangsgeräumt, 2019 Kulturhauptstadt Europas. Historische Texte, Zeitzeugensprache, der Süden im nationalen Diskurs.",
    published: false,
  },
  {
    slug: "retorica-italiana",
    number: 17,
    phase: "C1-C2",
    title: "La Retorica Italiana",
    subtitle: "Debattieren, unterbrechen, überzeugen",
    location: "Talkshow, Bar, Parlamento",
    summary:
      "Argumentationsmuster, Diskursmarker, das kontrollierte Ins-Wort-Fallen. Wer hier besteht, hält jede italienische Diskussion aus.",
    published: false,
  },
  {
    slug: "sfumature",
    number: 18,
    phase: "C1-C2",
    title: "Sfumature",
    subtitle: "Ironie, Understatement und Sprichwörter",
    location: "Tutta l'Italia",
    summary:
      "Die letzte Meile: Was Italiener sagen, wenn sie das Gegenteil meinen. Proverbi, modi di dire und regionale Färbungen.",
    published: false,
  },
];

export const roadmap: RoadmapEntry[] = [...lessons, ...lessonPreviews].sort(
  (a, b) => a.number - b.number,
);

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getPhase(code: PhaseCode): Phase {
  const phase = phases.find((p) => p.code === code);
  if (!phase) throw new Error(`Unbekannte Phase: ${code}`);
  return phase;
}

export function entriesForPhase(code: PhaseCode): RoadmapEntry[] {
  return roadmap.filter((entry) => entry.phase === code);
}

/** Stabile ID einer Vokabelkarte für die Spaced-Repetition-Persistenz. */
export function cardId(lessonSlug: string, italian: string): string {
  return `${lessonSlug}::${italian}`;
}

export const allVocabulary = lessons.flatMap((lesson) =>
  lesson.vocabulary.map((item) => ({
    ...item,
    lessonSlug: lesson.slug,
    lessonNumber: lesson.number,
    lessonTitle: lesson.title,
    id: cardId(lesson.slug, item.it),
  })),
);

export type VocabularyCard = (typeof allVocabulary)[number];

export const totalLessons = roadmap.length;
export const publishedLessons = lessons.length;

export interface RoadmapSummary {
  slug: string;
  number: number;
  phase: PhaseCode;
  title: string;
  subtitle: string;
  location: string;
  unesco?: string;
  summary: string;
  published: boolean;
  minutes: number | null;
  vocabCount: number;
  quizCount: number;
  grammarTopics: string[];
}

/**
 * Schlanke Projektion für Dashboard und Navigation — hält die vollen
 * Lektionstexte aus dem Client-Bundle heraus.
 */
export const roadmapSummaries: RoadmapSummary[] = roadmap.map((entry) => {
  const full = entry.published ? (entry as Lesson) : null;
  return {
    slug: entry.slug,
    number: entry.number,
    phase: entry.phase,
    title: entry.title,
    subtitle: entry.subtitle,
    location: entry.location,
    unesco: entry.unesco,
    summary: entry.summary,
    published: entry.published,
    minutes: full?.minutes ?? null,
    vocabCount: full?.vocabulary.length ?? 0,
    quizCount: full?.quiz.length ?? 0,
    grammarTopics: full?.grammatica.map((section) => section.title) ?? [],
  };
});
