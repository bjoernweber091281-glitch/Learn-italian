import Link from "next/link";
import { BookMarked, Landmark, Mic, Sparkles } from "lucide-react";
import { allVocabulary, phases, roadmapSummaries } from "@/content";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { PhaseSection } from "@/components/dashboard/PhaseSection";
import { ContinueCard } from "@/components/dashboard/ContinueCard";

const pillars = [
  {
    Icon: BookMarked,
    title: "Il Racconto",
    text: "Kultur und Geschichte als Lesetext — Übersetzung auf Tippen, Vokabeln im Kontext.",
  },
  {
    Icon: Sparkles,
    title: "Grammatica Viva",
    text: "Tabellen, die vergleichen statt aufzählen: Essere gegen Avere, Passato gegen Imperfetto.",
  },
  {
    Icon: Mic,
    title: "Dialogo Reale",
    text: "Rollenspiel mit Sofortkorrektur, Füllwörtern und dem Gestenkatalog dazu.",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta-600">
          Il Manuale Immersivo
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-inchiostro-800 sm:text-6xl">
          La Via Italiana
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-inchiostro-500 sm:text-lg">
          Italienisch lernt man nicht aus Listen, sondern aus Geschichten. Dieser Kurs führt in drei
          Phasen von den ersten Wörtern bis zur Ironie der Muttersprachler — entlang von römischen
          Ruinen, langobardischen Wallfahrtsorten, Renaissancestädten und dem, was in Italien wirklich
          zählt: dem Essen.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-marmo-300 bg-marmo-50/70 p-4"
            >
              <pillar.Icon className="h-5 w-5 text-terracotta-500" aria-hidden />
              <h2 className="mt-2 font-display text-lg font-semibold text-inchiostro-800">
                {pillar.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-inchiostro-400">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-6">
        <ContinueCard summaries={roadmapSummaries} />
      </div>

      <div className="mb-12">
        <ProgressOverview
          phases={phases}
          summaries={roadmapSummaries}
          totalVocabulary={allVocabulary.length}
        />
      </div>

      <div className="space-y-14">
        {phases.map((phase) => (
          <PhaseSection
            key={phase.code}
            phase={phase}
            entries={roadmapSummaries.filter((entry) => entry.phase === phase.code)}
          />
        ))}
      </div>

      {/* Vokabeltrainer-Hinweis */}
      <section className="mt-14 flex flex-col gap-4 rounded-3xl border border-oliva-200 bg-oliva-50/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 font-display text-xl font-semibold text-oliva-800">
            <Landmark className="h-5 w-5 text-oliva-600" aria-hidden />
            {allVocabulary.length} Vokabeln warten
          </p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-inchiostro-500">
            Alle Wörter aus den freigeschalteten Lektionen liegen im Karteikasten — mit Spaced
            Repetition, Beispielsatz und Aussprache.
          </p>
        </div>
        <Link
          href="/vocabolario"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-oliva-600 px-5 py-2.5 text-sm font-semibold text-marmo-50 shadow-carta transition-colors hover:bg-oliva-700"
        >
          Zum Karteikasten
        </Link>
      </section>
    </div>
  );
}
