# La Via Italiana — Il Manuale Immersivo

Ein immersiver Italienischkurs von A1 bis C2, der Grammatik nicht neben, sondern **in**
Kultur, Geschichte und Küche unterrichtet: römische Ruinen, langobardische Wallfahrtsorte,
Renaissancestädte, neapolitanische Pizza. Unterrichtssprache ist Deutsch, Zielsprache Italienisch.

## Das Konzept

Der Kurs führt über **drei Phasen** mit insgesamt 18 Lektionen:

| Fase | Niveau | Titel | Fokus |
| --- | --- | --- | --- |
| I | A1–A2 | *Le Fondamenta* | Präsens, Artikel, Präpositionen — und die Alltagsrituale dazu |
| II | B1–B2 | *Il Ponte* | Passato Prossimo vs. Imperfetto, Pronomen, Congiuntivo |
| III | C1–C2 | *La Voce* | Register, Ironie, Sprichwörter, regionale Färbung |

Jede ausgearbeitete Lektion folgt der **Drei-Schritt-Methode**:

1. **Il Racconto** — ein Kulturtext auf Italienisch. Jeder Satz lässt sich einzeln vorlesen
   und antippen, um die deutsche Übersetzung aufzudecken; markierte Wörter öffnen den
   Vokabeleintrag mit Artikel, Plural und Beispielsatz.
2. **Grammatica Viva** — Konjugationstabellen und Gegenüberstellungen
   (*essere* gegen *avere*, *c'è* gegen *ci sono*, *voglio* gegen *vorrei*), jede Zeile hörbar.
3. **Dialogo Reale & Madrelingua Secrets** — ein Rollenspiel als Chat. Zu jeder Antwort gibt es
   sofort Rückmeldung (*perfetto* / *va bene, ma…* / *attenzione*), dazu die Füllwörter
   (*Allora, Dai, Boh, Magari, Mica, Comunque, Ci sta, Figurati*) und ein Katalog der Handgesten.

Dazu kommen pro Lektion:

- **Pronuncia & Shadowing** — Sprachausgabe mit 0,75× / 1,0×, Mikrofonaufnahme mit
  Live-Wellenform und eine Ausspracheprüfung, die wortweise anzeigt, was verstanden wurde.
- **Vocabolario** — durchsuchbare Wortliste, nach Themen filterbar.
- **Esercizi** — Lückentexte (auch mit mehreren Lücken), Übersetzungsaufgaben und
  Multiple Choice, jeweils mit Erklärung zur Lösung.

Global gibt es unter `/vocabolario` einen **Karteikasten mit Spaced Repetition**
(SM-2-Variante, beide Richtungen, Filter nach Lektion).

## Bereits ausgearbeitete Inhalte

| Nr. | Lektion | Ort | UNESCO-Bezug | Umfang |
| --- | --- | --- | --- | --- |
| 1 | Roma Antica & Prime Parole | Roma, Lazio | Historisches Zentrum von Rom (1980) | 15 Sätze, 4 Grammatikkapitel, 28 Vokabeln, 8 Aufgaben |
| 2 | Saluti, Strada e Ristorante | Roma & Napoli | Arte del pizzaiuolo napoletano (2017) | 18 Sätze, 4 Grammatikkapitel, 32 Vokabeln, 8 Aufgaben |

Die übrigen 16 Lektionen sind als Vorschaukarten im Percorso angelegt — mit Ort, Thema und
Grammatikschwerpunkt, darunter *Lektion 7: Monte Sant'Angelo e i Borghi Millenari* (Gargano),
*Lektion 8: Pienza e la Val d'Orcia* und *Lektion 9: Ossobuco e il Nord Industriale*.

## Loslegen

```bash
npm install          # legt automatisch .env an und generiert den Prisma-Client
npm run db:setup     # Schema in SQLite anlegen und Lektionen seeden
npm run dev          # http://localhost:3000
```

Für einen Produktionslauf:

```bash
npm run build && npm start
```

## Technik

- **Next.js 16 (App Router)** mit React 19, **Tailwind CSS 4** und **Framer Motion**,
  Icons von **lucide-react**.
- **Prisma + SQLite** für Lektionen und Lernfortschritt (`prisma/schema.prisma`).
- **Web Speech API** für Sprachausgabe (`SpeechSynthesis`) und Ausspracheprüfung
  (`SpeechRecognition`), **MediaRecorder + AnalyserNode** für Aufnahme und Wellenform.

### Wo der Inhalt lebt

Die Lektionen werden als typisierte TypeScript-Module in `src/content/lessons/` autoriert —
das ist die Single Source of Truth, versionierbar und im Review lesbar. `prisma/seed.ts`
schreibt sie in die Datenbank; das Schema in `src/content/types.ts` erzwingt dabei, dass
keine Lektion ohne Racconto, Grammatik, Dialog, Shadowing-Zeilen, Vokabular und Quiz
durchrutscht. Eine neue Lektion anlegen heißt: Modul schreiben, in `src/content/index.ts`
eintragen, `npm run db:seed`.

### Fortschritt und Persistenz

Der Fortschritt (erledigte Schritte, Quiz-Bestwerte, Karteikartenzustände) wird sofort im
`localStorage` gesichert und gebündelt an `POST /api/progress` geschickt, das ihn pro
anonymer Learner-ID in SQLite ablegt. Ist die Datenbank nicht erreichbar, antwortet die
Route mit 503 und die App läuft rein lokal weiter — das Statusfeld oben rechts zeigt an,
was gerade gilt (`sincronizzato` / `solo locale`). Beim Start werden beide Stände
zusammengeführt, wobei jeweils der weiter fortgeschrittene gewinnt.

### Browser-Unterstützung

Sprachausgabe und Aufnahme laufen in allen aktuellen Browsern. Die Ausspracheprüfung nutzt
`SpeechRecognition` und ist damit vor allem in Chrome und Edge verfügbar; fehlt sie, blendet
die Oberfläche den Abschnitt mit einem Hinweis aus statt zu scheitern. Mikrofonzugriff
verlangt HTTPS oder `localhost`.

## Projektstruktur

```
src/
  app/                     Routen: Dashboard, /lezioni/[slug], /vocabolario, /api/*
  components/
    dashboard/             Fortschrittsleiste, Phasenabschnitte, Lektionskarten
    lesson/                Racconto, Grammatica, Dialogo, Shadowing, Vokabeln, Quiz
  content/
    types.ts               Inhaltsmodell (erzwingt Vollständigkeit einer Lektion)
    lessons/               Die ausgearbeiteten Lektionen
    index.ts               Phasen, Roadmap, abgeleitete Projektionen
  lib/
    progress.tsx           Fortschritts-Context mit LocalStorage- und API-Sync
    speech.ts              Web-Speech-Hooks, Aufnahme, Ausspracheabgleich
    srs.ts                 Spaced Repetition
    glossary.ts            Vokabelerkennung im Fließtext
prisma/                    Schema und Seed
```
