"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Lightbulb, Table2 } from "lucide-react";
import type { GrammarSection, GrammarTable, Lesson } from "@/content/types";
import { splitOnFocus } from "@/lib/glossary";
import { AudioButton } from "@/components/AudioButton";

export function GrammaticaStep({ lesson }: { lesson: Lesson }) {
  const [activeId, setActiveId] = useState(lesson.grammatica[0]?.id ?? "");

  return (
    <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
      {/* Kapitelnavigation */}
      <nav aria-label="Grammatikkapitel" className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-oliva-600">
          Grammatica Viva
        </p>
        <ul className="scroll-sottile flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {lesson.grammatica.map((section, index) => (
            <li key={section.id} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => {
                  setActiveId(section.id);
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                  activeId === section.id
                    ? "border-oliva-300 bg-oliva-100 text-oliva-800"
                    : "border-marmo-300 bg-marmo-50 text-inchiostro-500 hover:bg-marmo-200"
                }`}
              >
                <span className="block text-[11px] uppercase tracking-wider text-inchiostro-400">
                  {index + 1}
                </span>
                <span className="font-display text-base font-medium">{section.italianTitle}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-8">
        {lesson.grammatica.map((section) => (
          <GrammarCard key={section.id} section={section} onEnter={() => setActiveId(section.id)} />
        ))}
      </div>
    </div>
  );
}

function GrammarCard({
  section,
  onEnter,
}: {
  section: GrammarSection;
  onEnter: () => void;
}) {
  return (
    <motion.section
      id={section.id}
      // Schmaler Trigger-Streifen in der Bildschirmmitte: markiert das Kapitel,
      // das gerade gelesen wird, in der Seitennavigation.
      onViewportEnter={onEnter}
      viewport={{ margin: "-45% 0px -45% 0px" }}
      className="scroll-mt-28 rounded-3xl border border-marmo-300 bg-marmo-50 p-5 shadow-carta sm:p-7"
    >
      <h2 className="font-display text-2xl font-semibold text-inchiostro-800 sm:text-3xl">
        {section.italianTitle}
      </h2>
      <p className="font-display text-base italic text-inchiostro-400">{section.title}</p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-inchiostro-500">
        {section.explanation}
      </p>

      {section.comparison && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-marmo-300">
          <div className="grid grid-cols-2 gap-px bg-marmo-300">
            <div className="bg-terracotta-50 px-4 py-3">
              <p className="flex items-center gap-1.5 font-display text-lg font-semibold text-terracotta-700">
                {section.comparison.leftTitle}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-terracotta-600">
                {section.comparison.leftHint}
              </p>
            </div>
            <div className="bg-oliva-50 px-4 py-3">
              <p className="flex items-center gap-1.5 font-display text-lg font-semibold text-oliva-700">
                {section.comparison.rightTitle}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-oliva-600">
                {section.comparison.rightHint}
              </p>
            </div>
          </div>

          {section.comparison.rows.map((row) => (
            <div key={row.label} className="border-t border-marmo-200">
              <p className="flex items-center gap-1.5 bg-marmo-100 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-inchiostro-400">
                <ArrowLeftRight className="h-3 w-3" aria-hidden />
                {row.label}
              </p>
              <div className="grid grid-cols-2 gap-px bg-marmo-200">
                <div className="flex items-start gap-2 bg-marmo-50 px-4 py-3">
                  <AudioButton text={row.left.split("—")[0]} id={`${section.id}-${row.label}-l`} />
                  <p className="text-sm leading-relaxed text-inchiostro-700">{row.left}</p>
                </div>
                <div className="flex items-start gap-2 bg-marmo-50 px-4 py-3">
                  <AudioButton
                    text={row.right.split("—")[0]}
                    id={`${section.id}-${row.label}-r`}
                    tone="oliva"
                  />
                  <p className="text-sm leading-relaxed text-inchiostro-700">{row.right}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {section.tables?.map((table, index) => (
        <ConjugationTable key={index} table={table} sectionId={section.id} index={index} />
      ))}

      {section.examples && section.examples.length > 0 && (
        <ul className="mt-6 space-y-2">
          {section.examples.map((example, index) => {
            const [before, focus, after] = splitOnFocus(example.it, example.focus);
            return (
              <li
                key={index}
                className="flex items-start gap-2.5 rounded-xl bg-marmo-100/80 px-3 py-2.5"
              >
                <AudioButton text={example.it} id={`${section.id}-ex-${index}`} />
                <div className="min-w-0">
                  <p className="font-display text-lg leading-snug text-inchiostro-800">
                    {before}
                    {focus && (
                      <mark className="rounded bg-terracotta-100 px-1 text-terracotta-800">
                        {focus}
                      </mark>
                    )}
                    {after}
                  </p>
                  <p className="text-sm text-inchiostro-400">{example.de}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {section.tip && (
        <p className="mt-6 flex items-start gap-2 rounded-2xl border border-oro-300/60 bg-oro-300/10 px-4 py-3 text-sm leading-relaxed text-inchiostro-600">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-oro-500" aria-hidden />
          <span>{section.tip}</span>
        </p>
      )}
    </motion.section>
  );
}

function ConjugationTable({
  table,
  sectionId,
  index,
}: {
  table: GrammarTable;
  sectionId: string;
  index: number;
}) {
  const emphasized = new Set(table.emphasizeRows ?? []);

  return (
    <figure className="mt-6">
      {table.caption && (
        <figcaption className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-inchiostro-400">
          <Table2 className="h-3 w-3 text-oliva-500" aria-hidden />
          {table.caption}
        </figcaption>
      )}
      <div className="scroll-sottile overflow-x-auto rounded-2xl border border-marmo-300">
        <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-marmo-200/80">
              {table.headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-inchiostro-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-t border-marmo-200 ${
                  emphasized.has(rowIndex) ? "bg-terracotta-50/70" : "bg-marmo-50"
                }`}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-3 py-2 align-top ${
                      cellIndex === 0
                        ? "font-medium text-inchiostro-400"
                        : "font-display text-base text-inchiostro-800"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {cell}
                      {cellIndex > 0 && cell !== "—" && cell.length < 40 && (
                        <span className="opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100 sm:opacity-60 sm:hover:opacity-100">
                          <AudioButton
                            text={cell.split("→")[0].split("/")[0].trim()}
                            id={`${sectionId}-t${index}-${rowIndex}-${cellIndex}`}
                            tone="quiet"
                          />
                        </span>
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
