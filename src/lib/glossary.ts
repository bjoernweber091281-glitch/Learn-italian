import type { VocabItem } from "@/content/types";

export interface GlossaryHit {
  token: string;
  item: VocabItem;
}

function normalize(word: string): string {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9']/g, "");
}

function lastWord(phrase: string): string {
  const parts = phrase.trim().split(/\s+/);
  return parts[parts.length - 1] ?? phrase;
}

/**
 * Ordnet jedem Suchbegriff den passenden Vokabeleintrag zu.
 * Erfasst Grundform, letztes Wort einer Wendung ("avere fretta" → "fretta")
 * und die Pluralform ("i musei" → "musei").
 */
export function buildGlossary(vocabulary: VocabItem[]): Map<string, VocabItem> {
  const glossary = new Map<string, VocabItem>();
  const add = (key: string, item: VocabItem) => {
    const normalized = normalize(key);
    if (normalized.length > 1 && !glossary.has(normalized)) glossary.set(normalized, item);
  };

  for (const item of vocabulary) {
    add(item.it, item);
    add(lastWord(item.it), item);
    if (item.plural) add(lastWord(item.plural), item);
  }
  return glossary;
}

export type Token =
  | { kind: "text"; value: string }
  | { kind: "vocab"; value: string; item: VocabItem };

/**
 * Zerlegt einen italienischen Satz in Text- und Vokabel-Segmente.
 * `highlights` schränkt ein, welche Wörter markiert werden — so bleibt der
 * Lesefluss ruhig, statt jedes bekannte Wort einzufärben.
 */
export function tokenizeSentence(
  sentence: string,
  glossary: Map<string, VocabItem>,
  highlights?: string[],
): Token[] {
  const allowed =
    highlights && highlights.length > 0
      ? new Set(
          highlights.flatMap((phrase) => [normalize(phrase), normalize(lastWord(phrase))]),
        )
      : null;

  const tokens: Token[] = [];
  // Wörter inklusive Apostroph-Bindungen ("l'acqua" → "l'" + "acqua")
  const pattern = /[A-Za-zÀ-ÿ]+/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(sentence)) !== null) {
    const word = match[0];
    const key = normalize(word);
    const item = glossary.get(key);
    const permitted = !allowed || allowed.has(key);

    if (item && permitted) {
      if (match.index > cursor) {
        tokens.push({ kind: "text", value: sentence.slice(cursor, match.index) });
      }
      tokens.push({ kind: "vocab", value: word, item });
      cursor = match.index + word.length;
    }
  }

  if (cursor < sentence.length) {
    tokens.push({ kind: "text", value: sentence.slice(cursor) });
  }
  return tokens;
}

/** Hebt einen Teilstring innerhalb eines Beispielsatzes hervor. */
export function splitOnFocus(sentence: string, focus?: string): [string, string, string] {
  if (!focus) return [sentence, "", ""];
  const index = sentence.toLowerCase().indexOf(focus.toLowerCase());
  if (index < 0) return [sentence, "", ""];
  return [
    sentence.slice(0, index),
    sentence.slice(index, index + focus.length),
    sentence.slice(index + focus.length),
  ];
}
