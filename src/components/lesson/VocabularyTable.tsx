"use client";

import { useMemo, useState } from "react";
import { Search, Tags } from "lucide-react";
import type { Lesson } from "@/content/types";
import { AudioButton } from "@/components/AudioButton";

export function VocabularyTable({ lesson }: { lesson: Lesson }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(lesson.vocabulary.flatMap((item) => item.tags))).sort(),
    [lesson.vocabulary],
  );

  const filtered = lesson.vocabulary.filter((item) => {
    const matchesTag = !tag || item.tags.includes(tag);
    const needle = query.trim().toLowerCase();
    const matchesQuery =
      needle === "" ||
      item.it.toLowerCase().includes(needle) ||
      item.de.toLowerCase().includes(needle);
    return matchesTag && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-600">
          Vocabolario
        </p>
        <h2 className="mt-1 font-display text-3xl font-semibold text-inchiostro-800 sm:text-4xl">
          {lesson.vocabulary.length} Wörter dieser Lektion
        </h2>
        <p className="mt-2 text-sm text-inchiostro-500">
          Alle Einträge landen automatisch im Karteikasten mit Spaced Repetition.
        </p>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="relative flex-1 sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-inchiostro-400"
            aria-hidden
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Suchen…"
            aria-label="Vokabeln durchsuchen"
            className="w-full rounded-full border border-marmo-300 bg-marmo-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-terracotta-400"
          />
        </label>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-inchiostro-400">
          <Tags className="h-3.5 w-3.5" aria-hidden />
        </span>
        <button
          type="button"
          onClick={() => setTag(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            tag === null
              ? "bg-terracotta-500 text-marmo-50"
              : "bg-marmo-200 text-inchiostro-500 hover:bg-marmo-300"
          }`}
        >
          tutte
        </button>
        {tags.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTag(item === tag ? null : item)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              tag === item
                ? "bg-terracotta-500 text-marmo-50"
                : "bg-marmo-200 text-inchiostro-500 hover:bg-marmo-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-marmo-200 overflow-hidden rounded-2xl border border-marmo-300 bg-marmo-50">
        {filtered.map((item) => (
          <li key={item.it} className="flex items-start gap-3 px-4 py-3">
            <AudioButton text={item.it} id={`voc-${item.it}`} />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg leading-snug text-inchiostro-800">
                {item.article && <span className="text-inchiostro-400">{item.article} </span>}
                {item.it}
                {item.plural && (
                  <span className="ml-2 text-xs font-normal text-inchiostro-400">
                    Pl. {item.plural}
                  </span>
                )}
              </p>
              <p className="text-sm text-inchiostro-600">{item.de}</p>
              <p className="mt-1 text-xs italic text-inchiostro-400">
                {item.example.it} — {item.example.de}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-marmo-200 px-2 py-0.5 text-[10px] uppercase tracking-wider text-inchiostro-400">
              {item.pos}
            </span>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-4 py-8 text-center text-sm text-inchiostro-400">
            Keine Treffer.
          </li>
        )}
      </ul>
    </div>
  );
}
