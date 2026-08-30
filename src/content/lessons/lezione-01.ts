import type { Lesson } from "@/content/types";

/**
 * Lektion 1 — Roma Antica & Prime Parole (A1)
 * Kultur: Historisches Zentrum Roms (UNESCO-Welterbe seit 1980)
 * Grammatik: essere/avere, bestimmter Artikel, Plural, c'è/ci sono, Zahlen
 */
export const lezione01: Lesson = {
  slug: "roma-antica",
  number: 1,
  phase: "A1-A2",
  title: "Roma Antica & Prime Parole",
  subtitle: "Die Ewige Stadt und deine ersten hundert Wörter",
  location: "Roma, Lazio",
  unesco: "Historisches Zentrum von Rom (UNESCO-Welterbe seit 1980)",
  minutes: 35,
  published: true,
  summary:
    "Vom Kolosseum bis zum Pantheon: Du lernst Rom kennen und gleichzeitig die zwei Verben, ohne die im Italienischen kein Satz funktioniert — essere und avere.",

  racconto: {
    title: "Die Ewige Stadt",
    italianTitle: "La Città Eterna",
    kicker: "Il Racconto · Passo 1",
    intro:
      "Lies den Text laut. Tippe auf einen Satz, um die Übersetzung aufzudecken — aber versuche es zuerst ohne. Hervorgehobene Wörter findest du unten im Vokabular wieder.",
    sentences: [
      {
        id: "r1-s1",
        it: "Roma è la città eterna.",
        de: "Rom ist die ewige Stadt.",
        highlights: ["la città"],
        note: "«è» mit Akzent heißt «ist». Ohne Akzent («e») heißt es «und» — ein winziger Strich, ein riesiger Unterschied.",
      },
      {
        id: "r1-s2",
        it: "Il Colosseo è il monumento più famoso della città.",
        de: "Das Kolosseum ist das berühmteste Bauwerk der Stadt.",
        highlights: ["Il monumento", "il monumento"],
      },
      {
        id: "r1-s3",
        it: "L'imperatore Vespasiano comincia la costruzione nel 72 dopo Cristo.",
        de: "Kaiser Vespasian beginnt den Bau im Jahr 72 nach Christus.",
        highlights: ["L'imperatore", "la costruzione"],
        note: "Italienisch erzählt Geschichte gern im Präsens — das «presente storico». Praktisch für dich: Du brauchst noch keine Vergangenheit.",
      },
      {
        id: "r1-s4",
        it: "Suo figlio Tito inaugura l'anfiteatro nell'80 con cento giorni di giochi.",
        de: "Sein Sohn Titus weiht das Amphitheater im Jahr 80 mit hundert Tagen an Spielen ein.",
        highlights: ["il figlio", "l'anfiteatro", "il giorno"],
      },
      {
        id: "r1-s5",
        it: "Il nome vero è Anfiteatro Flavio, ma tutti dicono «Colosseo».",
        de: "Der echte Name ist Flavisches Amphitheater, aber alle sagen «Kolosseum».",
        highlights: ["Il nome"],
      },
      {
        id: "r1-s6",
        it: "Il nome viene da una statua colossale di Nerone, alta trenta metri.",
        de: "Der Name kommt von einer kolossalen Nero-Statue, dreißig Meter hoch.",
        highlights: ["la statua"],
      },
      {
        id: "r1-s7",
        it: "Dentro ci sono cinquantamila posti a sedere.",
        de: "Drinnen gibt es fünfzigtausend Sitzplätze.",
        highlights: ["il posto"],
        note: "«ci sono» = «es gibt» im Plural. Für den Singular sagst du «c'è». Mehr dazu in Schritt 2.",
      },
      {
        id: "r1-s8",
        it: "I gladiatori entrano nell'arena e il pubblico grida.",
        de: "Die Gladiatoren betreten die Arena und das Publikum schreit.",
        highlights: ["il gladiatore", "l'arena", "il pubblico"],
      },
      {
        id: "r1-s9",
        it: "Vicino al Colosseo c'è il Foro Romano, il cuore politico della città antica.",
        de: "Nahe beim Kolosseum liegt das Forum Romanum, das politische Herz der antiken Stadt.",
        highlights: ["il cuore"],
      },
      {
        id: "r1-s10",
        it: "Qui Cicerone parla, i mercanti vendono, i cittadini discutono.",
        de: "Hier spricht Cicero, die Händler verkaufen, die Bürger diskutieren.",
        highlights: ["il mercante", "il cittadino"],
      },
      {
        id: "r1-s11",
        it: "Anche il Pantheon è un miracolo: la sua cupola è ancora oggi la più grande cupola in cemento non armato del mondo.",
        de: "Auch das Pantheon ist ein Wunder: Seine Kuppel ist bis heute die größte Kuppel aus unbewehrtem Beton der Welt.",
        highlights: ["la cupola", "il mondo"],
      },
      {
        id: "r1-s12",
        it: "Quando piove, l'acqua entra dall'oculus e scende sul pavimento inclinato.",
        de: "Wenn es regnet, kommt das Wasser durch den Oculus herein und fließt über den geneigten Boden ab.",
        highlights: ["l'acqua", "il pavimento"],
        note: "Der Oculus ist das neun Meter breite Loch in der Kuppel. Es war nie verschlossen — seit fast 1900 Jahren.",
      },
      {
        id: "r1-s13",
        it: "Roma non è un museo: è una città viva.",
        de: "Rom ist kein Museum: Es ist eine lebendige Stadt.",
        highlights: ["il museo"],
      },
      {
        id: "r1-s14",
        it: "Ha ventotto secoli e non ha fretta.",
        de: "Sie hat achtundzwanzig Jahrhunderte und hat es nicht eilig.",
        highlights: ["il secolo", "avere fretta"],
        note: "«avere fretta» — im Italienischen HAT man Eile, man ist sie nicht. Genauso: «ho fame», «ho sete», «ho freddo».",
      },
      {
        id: "r1-s15",
        it: "Per questo diciamo: «Roma, non basta una vita».",
        de: "Deshalb sagen wir: «Rom — ein Leben reicht nicht».",
        highlights: ["la vita"],
      },
    ],
    culturalNote: {
      title: "Warum «eterna»?",
      body:
        "Der Dichter Tibull nannte Rom im 1. Jahrhundert v. Chr. «urbs aeterna» — die ewige Stadt. Gemeint war keine Poesie, sondern ein politisches Versprechen: Rom werde nie untergehen. Das Historische Zentrum Roms steht seit 1980 auf der UNESCO-Welterbeliste — gemeinsam mit den päpstlichen Bauten und San Paolo fuori le Mura. Es ist eine der wenigen Welterbestätten, die sich zwei Staaten teilen: Italien und den Vatikan.",
      source: "UNESCO-Welterbe Nr. 91",
    },
  },

  grammatica: [
    {
      id: "g1-essere-avere",
      title: "Die zwei Säulen: sein und haben",
      italianTitle: "Essere e Avere — le due colonne",
      explanation:
        "Ohne diese beiden Verben geht im Italienischen gar nichts: Sie beschreiben, wer du bist und was du hast — und später bilden sie alle zusammengesetzten Zeiten. Lerne sie wie ein Lied, nicht wie eine Tabelle.",
      tables: [
        {
          caption: "essere — sein (unregelmäßig)",
          headers: ["Person", "Italienisch", "Deutsch"],
          rows: [
            ["io", "sono", "ich bin"],
            ["tu", "sei", "du bist"],
            ["lui / lei / Lei", "è", "er / sie ist, Sie sind"],
            ["noi", "siamo", "wir sind"],
            ["voi", "siete", "ihr seid"],
            ["loro", "sono", "sie sind"],
          ],
          emphasizeRows: [0, 5],
        },
        {
          caption: "avere — haben (unregelmäßig, das H bleibt stumm)",
          headers: ["Person", "Italienisch", "Deutsch"],
          rows: [
            ["io", "ho", "ich habe"],
            ["tu", "hai", "du hast"],
            ["lui / lei / Lei", "ha", "er / sie hat, Sie haben"],
            ["noi", "abbiamo", "wir haben"],
            ["voi", "avete", "ihr habt"],
            ["loro", "hanno", "sie haben"],
          ],
          emphasizeRows: [0, 1, 2, 5],
        },
      ],
      comparison: {
        leftTitle: "essere",
        leftHint: "Zustand, Identität, Herkunft",
        rightTitle: "avere",
        rightHint: "Besitz — und Körpergefühle",
        rows: [
          {
            label: "Herkunft / Besitz",
            left: "Sono di Berlino. — Ich bin aus Berlin.",
            right: "Ho una casa a Roma. — Ich habe ein Haus in Rom.",
          },
          {
            label: "Beruf / Alter",
            left: "Sono architetto. — Ich bin Architekt.",
            right: "Ho trent'anni. — Ich bin dreißig. (wörtl.: ich habe 30 Jahre)",
          },
          {
            label: "Eigenschaft / Gefühl",
            left: "Sei stanco? — Bist du müde?",
            right: "Hai fame? — Hast du Hunger?",
          },
          {
            label: "Ort",
            left: "Siamo al Colosseo. — Wir sind am Kolosseum.",
            right: "Abbiamo i biglietti. — Wir haben die Tickets.",
          },
        ],
      },
      examples: [
        { it: "Io sono tedesco e ho ventisette anni.", de: "Ich bin Deutscher und bin 27 Jahre alt.", focus: "sono" },
        { it: "Il Colosseo ha quasi duemila anni.", de: "Das Kolosseum ist fast zweitausend Jahre alt.", focus: "ha" },
        { it: "Non ho fretta, sono in vacanza.", de: "Ich habe es nicht eilig, ich bin im Urlaub.", focus: "ho" },
      ],
      tip: "Achtung, Klassiker-Fehler: Alter wird IMMER mit avere gebildet. «Sono trenta anni» ist falsch — es heißt «ho trent'anni».",
    },
    {
      id: "g1-articolo",
      title: "Der bestimmte Artikel",
      italianTitle: "L'articolo determinativo",
      explanation:
        "Italienisch hat sieben bestimmte Artikel statt drei. Welchen du brauchst, entscheidet nicht die Bedeutung, sondern der erste Buchstabe des folgenden Wortes. Sprich Artikel und Substantiv deshalb immer als eine Einheit: nicht «Colosseo», sondern «il Colosseo».",
      tables: [
        {
          caption: "männlich (maschile)",
          headers: ["Artikel", "Wann?", "Singular", "Plural"],
          rows: [
            ["il / i", "vor Konsonant", "il museo", "i musei"],
            ["lo / gli", "vor s+Konsonant, z, ps, gn, y", "lo studente, lo zaino", "gli studenti, gli zaini"],
            ["l' / gli", "vor Vokal", "l'amico", "gli amici"],
          ],
        },
        {
          caption: "weiblich (femminile)",
          headers: ["Artikel", "Wann?", "Singular", "Plural"],
          rows: [
            ["la / le", "vor Konsonant", "la città", "le città"],
            ["l' / le", "vor Vokal", "l'arena", "le arene"],
          ],
        },
      ],
      examples: [
        { it: "lo zaino, gli zaini", de: "der Rucksack, die Rucksäcke", focus: "lo" },
        { it: "l'acqua è fresca", de: "das Wasser ist frisch", focus: "l'" },
        { it: "gli italiani parlano con le mani", de: "die Italiener sprechen mit den Händen", focus: "gli" },
      ],
      tip: "Merksatz für lo/gli: «S impuro, Z, PS, GN, Y» — sechs Buchstabengruppen, sonst immer il/i.",
    },
    {
      id: "g1-plurale",
      title: "Der Plural — drei Endungen genügen",
      italianTitle: "Il plurale dei sostantivi",
      explanation:
        "Italienisch bildet den Plural nicht mit -s, sondern durch Endungswechsel. Wer sich diese drei Zeilen merkt, hat 90 % aller Substantive erledigt.",
      tables: [
        {
          headers: ["Singular endet auf", "Plural endet auf", "Beispiel", "Übersetzung"],
          rows: [
            ["-o (m.)", "-i", "il museo → i musei", "das Museum → die Museen"],
            ["-a (w.)", "-e", "la statua → le statue", "die Statue → die Statuen"],
            ["-e (m./w.)", "-i", "il ponte → i ponti", "die Brücke → die Brücken"],
            ["-à, -ù (betont)", "unverändert", "la città → le città", "die Stadt → die Städte"],
            ["Fremdwörter", "unverändert", "il bar → i bar", "die Bar → die Bars"],
          ],
          emphasizeRows: [3, 4],
        },
      ],
      examples: [
        { it: "un gladiatore, due gladiatori", de: "ein Gladiator, zwei Gladiatoren", focus: "gladiatori" },
        { it: "una chiesa, molte chiese", de: "eine Kirche, viele Kirchen", focus: "chiese" },
      ],
      tip: "Wörter auf -ista wechseln das Geschlecht, nicht die Person: il turista / la turista, aber i turisti / le turiste.",
    },
    {
      id: "g1-cesono",
      title: "Es gibt — und die Zahlen",
      italianTitle: "C'è, ci sono e i numeri",
      explanation:
        "«C'è» und «ci sono» sind dein Schweizer Taschenmesser: Damit beschreibst du jeden Ort, jede Speisekarte, jedes Zimmer. Die Zahlen brauchst du im selben Atemzug — für Preise, Uhrzeiten und dein Alter.",
      comparison: {
        leftTitle: "c'è",
        leftHint: "Singular — es gibt (eine Sache)",
        rightTitle: "ci sono",
        rightHint: "Plural — es gibt (mehrere)",
        rows: [
          {
            label: "Aussage",
            left: "C'è un bar qui vicino.",
            right: "Ci sono due bar qui vicino.",
          },
          {
            label: "Frage",
            left: "C'è posto?  — Ist ein Platz frei?",
            right: "Ci sono posti liberi? — Sind Plätze frei?",
          },
          {
            label: "Verneinung",
            left: "Non c'è tempo. — Es ist keine Zeit.",
            right: "Non ci sono problemi. — Es gibt keine Probleme.",
          },
        ],
      },
      tables: [
        {
          caption: "i numeri 0–20",
          headers: ["0–5", "6–10", "11–15", "16–20"],
          rows: [
            ["zero", "sei", "undici", "sedici"],
            ["uno", "sette", "dodici", "diciassette"],
            ["due", "otto", "tredici", "diciotto"],
            ["tre", "nove", "quattordici", "diciannove"],
            ["quattro", "dieci", "quindici", "venti"],
            ["cinque", "—", "—", "—"],
          ],
        },
        {
          caption: "Zehner und Hunderter",
          headers: ["Zahl", "Italienisch", "Zahl", "Italienisch"],
          rows: [
            ["30", "trenta", "80", "ottanta"],
            ["40", "quaranta", "90", "novanta"],
            ["50", "cinquanta", "100", "cento"],
            ["60", "sessanta", "1000", "mille"],
            ["70", "settanta", "2000", "duemila"],
          ],
        },
      ],
      tip: "Vor «uno» und «otto» fällt der Endvokal des Zehners weg: ventuno, ventotto, trentuno, trentotto.",
    },
  ],

  dialogo: {
    title: "Am Kolosseum",
    italianTitle: "Al Colosseo",
    setting:
      "Es ist 9 Uhr morgens, die Schlange am Eingang ist noch kurz. Giulia arbeitet als Führerin und wartet auf ihre Gruppe. Du sprichst sie an.",
    yourRole: "Du — Tourist aus Deutschland, erster Tag in Rom",
    partnerRole: "Giulia — römische Stadtführerin, 34, spricht schnell und freundlich",
    steps: [
      {
        role: "partner",
        speaker: "Giulia",
        it: "Buongiorno! Aspetta anche Lei il gruppo delle nove?",
        de: "Guten Morgen! Warten Sie auch auf die Neun-Uhr-Gruppe?",
        stageDirection: "Sie hält ein Klemmbrett und lächelt.",
      },
      {
        role: "you",
        speaker: "Du",
        prompt: "Grüße zurück und sag, dass du kein Ticket hast.",
        choices: [
          {
            it: "Buongiorno! No, non ho il biglietto.",
            de: "Guten Morgen! Nein, ich habe kein Ticket.",
            quality: "perfetto",
            feedback:
              "Perfetto. «Non ho il biglietto» — die Verneinung steht einfach vor dem Verb, und avere ist genau richtig für Besitz.",
          },
          {
            it: "Buongiorno! No, non sono il biglietto.",
            de: "Guten Morgen! Nein, ich bin nicht das Ticket.",
            quality: "no",
            feedback:
              "Der Klassiker: essere statt avere. Ein Ticket besitzt man — «non ho il biglietto».",
          },
          {
            it: "Ciao! Io biglietto no.",
            de: "Hallo! Ich Ticket nein.",
            quality: "ok",
            feedback:
              "Verstanden wirst du — aber «ciao» ist zu vertraut für eine Fremde, und ohne Verb klingt es wie ein Telegramm. Nimm «buongiorno» und ein echtes Verb.",
          },
        ],
      },
      {
        role: "partner",
        speaker: "Giulia",
        it: "Allora, guardi: la biglietteria è là, ma c'è una fila lunghissima. Ha tempo?",
        de: "Also, schauen Sie: Der Ticketschalter ist dort drüben, aber da ist eine sehr lange Schlange. Haben Sie Zeit?",
        stageDirection: "Sie zeigt mit dem Kinn nach links — Römer zeigen selten mit dem Finger.",
      },
      {
        role: "you",
        speaker: "Du",
        prompt: "Sag, dass du Zeit hast und nicht in Eile bist.",
        choices: [
          {
            it: "Sì, ho tempo. Non ho fretta, sono in vacanza!",
            de: "Ja, ich habe Zeit. Ich habe es nicht eilig, ich bin im Urlaub!",
            quality: "perfetto",
            feedback:
              "Genau so. Zwei avere-Ausdrücke («ho tempo», «ho fretta») und ein essere («sono in vacanza») in einem Satz — das ist die ganze Lektion in einer Zeile.",
          },
          {
            it: "Sì, ho tempo. Non sono fretta.",
            de: "Ja, ich habe Zeit. Ich bin nicht Eile.",
            quality: "ok",
            feedback:
              "Erste Hälfte richtig, zweite falsch. Körper- und Zeitgefühle laufen über avere: ho fretta, ho fame, ho sete, ho sonno, ho freddo.",
          },
          {
            it: "Sì. Allora, io aspetto qui.",
            de: "Ja. Also, ich warte hier.",
            quality: "ok",
            feedback:
              "Höflich und korrekt, aber du beantwortest ihre Frage nur halb. «Allora» am Satzanfang ist trotzdem schon sehr italienisch — merk dir das.",
            filler: "Allora",
          },
        ],
      },
      {
        role: "partner",
        speaker: "Giulia",
        it: "Ottimo. Nel mio gruppo c'è un posto libero. Sono venti euro, biglietto compreso. Le interessa?",
        de: "Ausgezeichnet. In meiner Gruppe ist ein Platz frei. Es kostet zwanzig Euro, Ticket inklusive. Interessiert Sie das?",
      },
      {
        role: "you",
        speaker: "Du",
        prompt: "Frag nach, wie viele Personen die Gruppe hat.",
        choices: [
          {
            it: "Volentieri! Quante persone ci sono nel gruppo?",
            de: "Gerne! Wie viele Personen sind in der Gruppe?",
            quality: "perfetto",
            feedback:
              "«Ci sono» im Plural, «quante» weiblich zu «persone» — sauber. Und «volentieri» ist das freundlichste Ja, das Italienisch zu bieten hat.",
          },
          {
            it: "Sì. Quante persone c'è nel gruppo?",
            de: "Ja. Wie viele Personen ist in der Gruppe?",
            quality: "ok",
            feedback:
              "Fast. Bei «persone» (Plural) brauchst du «ci sono», nicht «c'è». Faustregel: ein Ding → c'è, mehrere Dinge → ci sono.",
          },
          {
            it: "Quanto costa il gruppo?",
            de: "Was kostet die Gruppe?",
            quality: "no",
            feedback:
              "Den Preis hat sie gerade genannt — zwanzig Euro. Aufmerksames Zuhören ist auch Grammatik.",
          },
        ],
      },
      {
        role: "partner",
        speaker: "Giulia",
        it: "Siamo in dodici, quasi tutti italiani. Io parlo lentamente, non si preoccupi. Come si chiama?",
        de: "Wir sind zu zwölft, fast alle Italiener. Ich spreche langsam, machen Sie sich keine Sorgen. Wie heißen Sie?",
      },
      {
        role: "you",
        speaker: "Du",
        prompt: "Nenne deinen Namen und sag, woher du kommst.",
        choices: [
          {
            it: "Mi chiamo Jonas, sono tedesco. Sono di Amburgo.",
            de: "Ich heiße Jonas, ich bin Deutscher. Ich komme aus Hamburg.",
            quality: "perfetto",
            feedback:
              "Nationalität und Herkunft laufen beide über essere. «Sono di + Stadt» heißt «ich komme aus».",
          },
          {
            it: "Ho Jonas e vengo di Germania.",
            de: "Ich habe Jonas und komme von Deutschland.",
            quality: "no",
            feedback:
              "Zwei Stolpersteine: Namen nennt man mit «mi chiamo» (reflexiv), und es heißt «vengo DALLA Germania», nicht «di».",
          },
          {
            it: "Jonas. Germania.",
            de: "Jonas. Deutschland.",
            quality: "ok",
            feedback:
              "Sie versteht dich — aber du klingst wie ein Passformular. Ein «mi chiamo» kostet dich zwei Silben und macht aus dir einen Gesprächspartner.",
          },
        ],
      },
      {
        role: "partner",
        speaker: "Giulia",
        it: "Piacere, Jonas! Dai, andiamo: il Colosseo ci aspetta. E oggi, per fortuna, non c'è troppa gente.",
        de: "Freut mich, Jonas! Komm, gehen wir: Das Kolosseum wartet auf uns. Und heute ist zum Glück nicht zu viel los.",
        stageDirection: "«Dai» ist keine Aufforderung zum Geben — es heißt hier: los, komm schon.",
      },
      {
        role: "you",
        speaker: "Du",
        prompt: "Reagiere begeistert und sag, dass du bereit bist.",
        choices: [
          {
            it: "Dai, andiamo! Sono pronto.",
            de: "Los, gehen wir! Ich bin bereit.",
            quality: "perfetto",
            feedback:
              "Du hast ihr «dai» aufgegriffen — genau so lernen Muttersprachler voneinander. Und «sono pronto» (m.) / «sono pronta» (w.) ist der richtige essere-Gebrauch.",
            filler: "Dai",
          },
          {
            it: "Ho pronto!",
            de: "Ich habe bereit!",
            quality: "no",
            feedback:
              "«Pronto» ist eine Eigenschaft, also essere: «sono pronto». Nur am Telefon steht «Pronto?» allein — da heißt es «Hallo?».",
          },
          {
            it: "Va bene, grazie mille.",
            de: "In Ordnung, vielen Dank.",
            quality: "ok",
            feedback:
              "Korrekt und höflich, aber energielos. Giulia hat dir gerade einen Gang höher geschaltet — geh mit.",
          },
        ],
      },
    ],
  },

  madrelingua: {
    intro:
      "Grammatik macht dich verständlich. Diese kleinen Wörter und Gesten machen dich glaubwürdig. Italiener merken innerhalb von zwei Sätzen, ob jemand die Sprache gelernt oder sie gehört hat.",
    fillers: [
      {
        word: "Allora",
        literal: "«zu jener Stunde»",
        meaning: "Also… / Na dann… / Der Startknopf für einen Gedanken.",
        register: "neutro",
        example: {
          it: "Allora, che facciamo stasera?",
          de: "Also, was machen wir heute Abend?",
        },
        whenToUse:
          "Am Satzanfang, wenn du überlegst, ein Thema wechselst oder etwas zusammenfasst. Das mit Abstand häufigste Füllwort Italiens — Lehrer beginnen damit jede Stunde.",
      },
      {
        word: "Dai",
        literal: "«gib!»",
        meaning: "Komm schon! / Na los! / Ach hör auf!",
        register: "informale",
        example: {
          it: "Dai, non è così difficile!",
          de: "Komm schon, so schwer ist das nicht!",
        },
        whenToUse:
          "Zum Anfeuern, Drängeln oder ungläubigen Abwinken. Der Ton entscheidet alles: aufsteigend = Ermutigung, absteigend = «jetzt übertreib nicht».",
      },
      {
        word: "Boh",
        literal: "—",
        meaning: "Keine Ahnung. (mit Schulterzucken)",
        register: "colloquiale",
        example: {
          it: "«Quando apre il museo?» «Boh, forse alle nove.»",
          de: "«Wann öffnet das Museum?» «Keine Ahnung, vielleicht um neun.»",
        },
        whenToUse:
          "Nur unter Vertrauten und nie gegenüber Vorgesetzten. Kommt fast immer mit hochgezogenen Schultern und nach unten gezogenen Mundwinkeln.",
      },
      {
        word: "Magari",
        literal: "«vielleicht»",
        meaning: "Und wie! / Wenn es doch nur so wäre! / eventuell",
        register: "neutro",
        example: {
          it: "«Vieni a Roma in estate?» «Magari!»",
          de: "«Kommst du im Sommer nach Rom?» «Ach, wenn ich könnte!»",
        },
        whenToUse:
          "Allein stehend ist es ein sehnsuchtsvolles «wenn doch nur». Mitten im Satz («magari domani») heißt es schlicht «vielleicht». Wörterbücher verraten dir nur die zweite Hälfte.",
      },
    ],
    gestures: [
      {
        name: "Die Beutelhand",
        italianName: "Mano a borsa",
        hand: "Alle fünf Fingerspitzen zusammen, Hand nach oben, aus dem Handgelenk auf und ab bewegen.",
        meaning: "«Ma che vuoi?!» — Was willst du denn? / Was soll das?",
        whenToUse:
          "Bei Unverständnis, Empörung oder rhetorischen Fragen. Die berühmteste Geste Italiens und in Rom Teil der Alltagsgrammatik.",
        caution:
          "Je schneller die Bewegung, desto gereizter der Ton. Langsam = fragend, schnell = «bist du noch zu retten?».",
      },
      {
        name: "Komm her",
        italianName: "Vieni qui",
        hand: "Handfläche nach UNTEN, Finger zum Körper hin kratzen.",
        meaning: "Komm her.",
        whenToUse:
          "Immer mit der Handfläche nach unten. Die deutsche Variante mit der Handfläche nach oben wirkt in Italien, als würdest du einen Hund rufen.",
      },
      {
        name: "Einen Moment",
        italianName: "Un attimo",
        hand: "Zeigefinger senkrecht nach oben, kurz innehalten.",
        meaning: "Moment mal / lass mich kurz.",
        whenToUse:
          "In der Bar, an der Kasse, im Gespräch — ein stiller Platzhalter, während du deinen Satz sortierst. Deutlich eleganter als ein «ähm».",
      },
      {
        name: "Perfekt",
        italianName: "Perfetto",
        hand: "Daumen und Zeigefinger berühren sich, die Hand zieht eine kurze Linie durch die Luft.",
        meaning: "Genau so / haargenau / perfekt.",
        whenToUse:
          "Wenn etwas exakt stimmt — eine Verabredung, eine Zahl, eine Übersetzung. Nicht mit dem amerikanischen OK-Zeichen verwechseln, das hier bestenfalls neutral wirkt.",
      },
    ],
  },

  shadowing: {
    intro:
      "Shadowing heißt: mitsprechen, nicht nachsprechen. Starte die Aufnahme, lass das Audio laufen und sprich mit einer halben Sekunde Verzögerung mit. Bei 0,75× hörst du jede Silbe, bei 1× klingst du wie in Trastevere.",
    lines: [
      {
        it: "Roma è la città eterna.",
        de: "Rom ist die ewige Stadt.",
        rhythm: "RO-ma È la cit-TÀ e-TER-na",
        tip: "Das Doppel-T in «città» wird wirklich doppelt gehalten — kurz stoppen, dann lösen.",
      },
      {
        it: "Il Colosseo ha quasi duemila anni.",
        de: "Das Kolosseum ist fast zweitausend Jahre alt.",
        rhythm: "il co-los-SE-o ha QUA-si due-MI-la AN-ni",
        tip: "«ha» ist stumm am Anfang — sprich «a». Das H hört man im Italienischen nie.",
      },
      {
        it: "Non ho fretta, sono in vacanza.",
        de: "Ich habe es nicht eilig, ich bin im Urlaub.",
        rhythm: "non ho FRET-ta, SO-no in va-CAN-za",
        tip: "«za» klingt wie «tsa». Ein deutsches «s» verrät dich sofort.",
      },
      {
        it: "Scusi, c'è un bar qui vicino?",
        de: "Entschuldigung, gibt es hier in der Nähe eine Bar?",
        rhythm: "SCU-si, c'è un BAR qui vi-CI-no",
        tip: "«sc» vor i/e wird zu «sch»: SCHU-si. Vor a/o/u bleibt es «sk»: scuola = SKUO-la.",
      },
      {
        it: "Quante persone ci sono nel gruppo?",
        de: "Wie viele Personen sind in der Gruppe?",
        rhythm: "QUAN-te per-SO-ne ci SO-no nel GRUP-po",
        tip: "Alle Vokale gleich offen halten — kein deutsches Schwa. Das «e» am Ende von «quante» ist ein volles E.",
      },
      {
        it: "Dai, andiamo: il Colosseo ci aspetta.",
        de: "Komm, gehen wir: Das Kolosseum wartet auf uns.",
        rhythm: "DAI, an-DIA-mo: il co-los-SE-o ci a-SPET-ta",
        tip: "Sprich «ci aspetta» ohne Pause zusammen — Italiener binden Wortgrenzen weg.",
      },
    ],
  },

  vocabulary: [
    { it: "città", de: "Stadt", pos: "sost.", article: "la", plural: "le città", example: { it: "Roma è una città antica.", de: "Rom ist eine antike Stadt." }, tags: ["luoghi"] },
    { it: "monumento", de: "Bauwerk, Denkmal", pos: "sost.", article: "il", plural: "i monumenti", example: { it: "Il monumento è aperto oggi.", de: "Das Bauwerk ist heute geöffnet." }, tags: ["luoghi"] },
    { it: "imperatore", de: "Kaiser", pos: "sost.", article: "l'", plural: "gli imperatori", example: { it: "L'imperatore vive sul Palatino.", de: "Der Kaiser wohnt auf dem Palatin." }, tags: ["storia"] },
    { it: "costruzione", de: "Bau, Bauwerk", pos: "sost.", article: "la", plural: "le costruzioni", example: { it: "La costruzione dura otto anni.", de: "Der Bau dauert acht Jahre." }, tags: ["storia"] },
    { it: "anfiteatro", de: "Amphitheater", pos: "sost.", article: "l'", plural: "gli anfiteatri", example: { it: "L'anfiteatro è enorme.", de: "Das Amphitheater ist riesig." }, tags: ["storia"] },
    { it: "giorno", de: "Tag", pos: "sost.", article: "il", plural: "i giorni", example: { it: "Cento giorni di giochi.", de: "Hundert Tage an Spielen." }, tags: ["tempo"] },
    { it: "nome", de: "Name", pos: "sost.", article: "il", plural: "i nomi", example: { it: "Il mio nome è Jonas.", de: "Mein Name ist Jonas." }, tags: ["persone"] },
    { it: "statua", de: "Statue", pos: "sost.", article: "la", plural: "le statue", example: { it: "La statua è alta trenta metri.", de: "Die Statue ist dreißig Meter hoch." }, tags: ["arte"] },
    { it: "posto", de: "Platz, Sitzplatz", pos: "sost.", article: "il", plural: "i posti", example: { it: "C'è un posto libero?", de: "Ist ein Platz frei?" }, tags: ["luoghi", "utile"] },
    { it: "gladiatore", de: "Gladiator", pos: "sost.", article: "il", plural: "i gladiatori", example: { it: "I gladiatori entrano nell'arena.", de: "Die Gladiatoren betreten die Arena." }, tags: ["storia"] },
    { it: "arena", de: "Arena", pos: "sost.", article: "l'", plural: "le arene", example: { it: "L'arena è piena di sabbia.", de: "Die Arena ist voller Sand." }, tags: ["storia"] },
    { it: "pubblico", de: "Publikum", pos: "sost.", article: "il", example: { it: "Il pubblico grida.", de: "Das Publikum schreit." }, tags: ["storia"] },
    { it: "cuore", de: "Herz", pos: "sost.", article: "il", plural: "i cuori", example: { it: "Il Foro è il cuore della città.", de: "Das Forum ist das Herz der Stadt." }, tags: ["corpo"] },
    { it: "mercante", de: "Händler", pos: "sost.", article: "il", plural: "i mercanti", example: { it: "I mercanti vendono di tutto.", de: "Die Händler verkaufen alles Mögliche." }, tags: ["persone", "storia"] },
    { it: "cittadino", de: "Bürger", pos: "sost.", article: "il", plural: "i cittadini", example: { it: "I cittadini discutono nel Foro.", de: "Die Bürger diskutieren im Forum." }, tags: ["persone"] },
    { it: "cupola", de: "Kuppel", pos: "sost.", article: "la", plural: "le cupole", example: { it: "La cupola del Pantheon è unica.", de: "Die Kuppel des Pantheon ist einzigartig." }, tags: ["arte"] },
    { it: "mondo", de: "Welt", pos: "sost.", article: "il", plural: "i mondi", example: { it: "La più grande del mondo.", de: "Die größte der Welt." }, tags: ["utile"] },
    { it: "acqua", de: "Wasser", pos: "sost.", article: "l'", plural: "le acque", example: { it: "Un'acqua naturale, per favore.", de: "Ein stilles Wasser, bitte." }, tags: ["cibo", "utile"] },
    { it: "pavimento", de: "Boden, Fußboden", pos: "sost.", article: "il", plural: "i pavimenti", example: { it: "Il pavimento è di marmo.", de: "Der Boden ist aus Marmor." }, tags: ["casa"] },
    { it: "museo", de: "Museum", pos: "sost.", article: "il", plural: "i musei", example: { it: "Il museo apre alle nove.", de: "Das Museum öffnet um neun." }, tags: ["luoghi"] },
    { it: "secolo", de: "Jahrhundert", pos: "sost.", article: "il", plural: "i secoli", example: { it: "Ventotto secoli di storia.", de: "Achtundzwanzig Jahrhunderte Geschichte." }, tags: ["tempo", "storia"] },
    { it: "vita", de: "Leben", pos: "sost.", article: "la", plural: "le vite", example: { it: "Non basta una vita.", de: "Ein Leben reicht nicht." }, tags: ["utile"] },
    { it: "biglietto", de: "Ticket, Fahrkarte", pos: "sost.", article: "il", plural: "i biglietti", example: { it: "Non ho il biglietto.", de: "Ich habe kein Ticket." }, tags: ["viaggio", "utile"] },
    { it: "fila", de: "Schlange, Warteschlange", pos: "sost.", article: "la", plural: "le file", example: { it: "C'è una fila lunghissima.", de: "Da ist eine sehr lange Schlange." }, tags: ["viaggio"] },
    { it: "avere fretta", de: "es eilig haben", pos: "espr.", example: { it: "Non ho fretta.", de: "Ich habe es nicht eilig." }, tags: ["espressioni"] },
    { it: "essere pronto", de: "bereit sein", pos: "espr.", example: { it: "Sono pronto!", de: "Ich bin bereit!" }, tags: ["espressioni"] },
    { it: "volentieri", de: "gerne", pos: "avv.", example: { it: "Volentieri, grazie!", de: "Gerne, danke!" }, tags: ["utile"] },
    { it: "vicino", de: "nah, in der Nähe", pos: "avv.", example: { it: "C'è un bar qui vicino?", de: "Gibt es hier in der Nähe eine Bar?" }, tags: ["utile"] },
  ],

  quiz: [
    {
      id: "q1-1",
      type: "fill",
      prompt: "essere oder avere?",
      sentence: "Io ___ di Berlino, ma ___ una casa a Roma.",
      accepted: ["sono, ho", "sono ho"],
      hint: "Herkunft läuft über essere, Besitz über avere.",
      explanation:
        "«Sono di Berlino» beschreibt die Herkunft (essere), «ho una casa» den Besitz (avere).",
    },
    {
      id: "q1-2",
      type: "choice",
      prompt: "Welcher Artikel gehört zu «studente»?",
      question: "___ studente italiano parla velocemente.",
      options: ["Il", "Lo", "L'", "La"],
      correctIndex: 1,
      explanation:
        "«Studente» beginnt mit s + Konsonant («s impura»), deshalb «lo studente» — im Plural «gli studenti».",
    },
    {
      id: "q1-3",
      type: "fill",
      prompt: "c'è oder ci sono?",
      sentence: "Nel gruppo ___ dodici persone.",
      accepted: ["ci sono"],
      hint: "Zähl nach: eine oder mehrere?",
      explanation:
        "«Dodici persone» ist Plural, also «ci sono». Im Singular hieße es «c'è una persona».",
    },
    {
      id: "q1-4",
      type: "translate",
      prompt: "Übersetze ins Italienische",
      de: "Ich bin dreißig Jahre alt.",
      accepted: ["ho trent'anni", "ho trenta anni", "io ho trent'anni", "io ho trenta anni"],
      hint: "Im Italienischen HAT man seine Jahre.",
      explanation:
        "Das Alter wird immer mit avere gebildet: «ho trent'anni». Vor «anni» verliert «trenta» seinen Endvokal.",
    },
    {
      id: "q1-5",
      type: "fill",
      prompt: "Setze den Plural ein",
      sentence: "Un museo, due ___.",
      accepted: ["musei"],
      hint: "-o wird zu …?",
      explanation: "Männliche Wörter auf -o bilden den Plural auf -i: il museo → i musei.",
    },
    {
      id: "q1-6",
      type: "choice",
      prompt: "Was bedeutet «Magari!» als Antwort auf eine Einladung?",
      question: "«Vieni a Roma in estate?» — «Magari!»",
      options: [
        "Auf keinen Fall.",
        "Ach, wenn ich nur könnte!",
        "Ja, sicher, ich komme.",
        "Vielleicht später.",
      ],
      correctIndex: 1,
      explanation:
        "Alleinstehend drückt «magari» einen sehnsuchtsvollen Wunsch aus, den man wohl nicht erfüllen kann. Mitten im Satz («magari domani») heißt es dagegen schlicht «vielleicht».",
    },
    {
      id: "q1-7",
      type: "translate",
      prompt: "Übersetze ins Italienische",
      de: "Entschuldigung, gibt es hier in der Nähe eine Bar?",
      accepted: ["scusi, c'è un bar qui vicino?", "scusi c'è un bar qui vicino", "scusi, c'è un bar qui vicino"],
      hint: "«Scusi» ist die Sie-Form, «scusa» das Du.",
      explanation:
        "«Scusi, c'è un bar qui vicino?» — mit «c'è», weil eine einzelne Bar gemeint ist.",
    },
    {
      id: "q1-8",
      type: "choice",
      prompt: "Welche Geste passt zu «Ma che vuoi?!»",
      question: "Giulia hebt die Hand, alle Fingerspitzen berühren sich, und bewegt sie auf und ab.",
      options: [
        "Mano a borsa — Was willst du denn?",
        "Un attimo — einen Moment",
        "Perfetto — genau so",
        "Vieni qui — komm her",
      ],
      correctIndex: 0,
      explanation:
        "Die «mano a borsa» (Beutelhand) ist Italiens bekannteste Geste. Tempo bestimmt den Ton: langsam fragend, schnell empört.",
    },
  ],
};
