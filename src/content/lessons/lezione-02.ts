import type { Lesson } from "@/content/types";

/**
 * Lektion 2 — Saluti, Strada e Ristorante (A1–A2)
 * Kultur: Bar-Ritual, Trattoria, Arte del pizzaiuolo napoletano (UNESCO 2017)
 * Grammatik: regelmäßige Verben, Präpositionen (auch verschmolzen), tu/Lei, vorrei
 */
export const lezione02: Lesson = {
  slug: "saluti-strada-ristorante",
  number: 2,
  phase: "A1-A2",
  title: "Saluti, Strada e Ristorante",
  subtitle: "Grüßen, den Weg finden, richtig bestellen",
  location: "Roma & Napoli",
  unesco: "Die Kunst des neapolitanischen Pizzaiuolo (Immaterielles UNESCO-Kulturerbe seit 2017)",
  minutes: 40,
  published: true,
  summary:
    "Vom Espresso im Stehen bis zur Rechnung: Du lernst die ungeschriebenen Regeln des italienischen Alltags — und die Verben, mit denen du sie ausdrückst.",

  racconto: {
    title: "Der Tag beginnt an der Bar",
    italianTitle: "La giornata comincia al bar",
    kicker: "Il Racconto · Passo 1",
    intro:
      "Ein Tag zwischen Rom und Neapel. Tippe auf einen Satz für die Übersetzung — und achte darauf, wie oft die Präpositionen mit dem Artikel verschmelzen: al, nel, della.",
    sentences: [
      {
        id: "r2-s1",
        it: "In Italia il giorno comincia al bar.",
        de: "In Italien beginnt der Tag in der Bar.",
        highlights: ["il bar", "cominciare"],
        note: "«al» = a + il. Diese Verschmelzungen sind kein Sonderfall, sondern Pflicht — «a il bar» gibt es nicht.",
      },
      {
        id: "r2-s2",
        it: "Non è un bar come in Germania: qui si beve il caffè in piedi, al banco.",
        de: "Das ist keine Bar wie in Deutschland: Hier trinkt man den Kaffee im Stehen, an der Theke.",
        highlights: ["il caffè", "il banco"],
      },
      {
        id: "r2-s3",
        it: "«Un caffè, per favore» significa un espresso — sempre.",
        de: "«Einen Kaffee, bitte» bedeutet einen Espresso — immer.",
        highlights: ["per favore"],
        note: "Wer einen Filterkaffee will, muss «un caffè americano» sagen. «Un caffè lungo» ist etwas anderes: ein Espresso mit mehr Wasser durch den Siebträger.",
      },
      {
        id: "r2-s4",
        it: "Il barista prepara la tazzina in trenta secondi e tu la bevi in venti.",
        de: "Der Barista bereitet die Tasse in dreißig Sekunden zu, und du trinkst sie in zwanzig.",
        highlights: ["il barista", "la tazzina", "preparare"],
      },
      {
        id: "r2-s5",
        it: "Prima di mezzogiorno gli italiani dicono «buongiorno».",
        de: "Vor Mittag sagen die Italiener «buongiorno».",
        highlights: ["mezzogiorno"],
      },
      {
        id: "r2-s6",
        it: "Dopo pranzo comincia il «buonasera», anche alle tre del pomeriggio.",
        de: "Nach dem Mittagessen beginnt das «buonasera» — auch um drei Uhr nachmittags.",
        highlights: ["il pranzo", "il pomeriggio"],
        note: "Der italienische Tag hat nur zwei Hälften. Ein deutsches «guten Nachmittag» existiert nicht.",
      },
      {
        id: "r2-s7",
        it: "«Ciao» è solo per gli amici; con uno sconosciuto usi «salve».",
        de: "«Ciao» ist nur für Freunde; mit einem Fremden benutzt du «salve».",
        highlights: ["l'amico", "lo sconosciuto"],
        note: "«Salve» ist der elegante Zwischenweg: höflich, aber nicht steif. Es rettet dich, wenn du nicht weißt, ob du duzen darfst.",
      },
      {
        id: "r2-s8",
        it: "«Scusi, dov'è la Trattoria da Enzo?» «Sempre dritto, poi la seconda a destra.»",
        de: "«Entschuldigung, wo ist die Trattoria da Enzo?» «Immer geradeaus, dann die zweite rechts.»",
        highlights: ["sempre dritto", "a destra"],
      },
      {
        id: "r2-s9",
        it: "A mezzogiorno la città cambia ritmo e le trattorie aprono le porte.",
        de: "Um zwölf ändert die Stadt ihren Rhythmus, und die Trattorien öffnen ihre Türen.",
        highlights: ["la trattoria", "aprire"],
      },
      {
        id: "r2-s10",
        it: "La trattoria non è un ristorante elegante: è la cucina di una famiglia, aperta agli altri.",
        de: "Die Trattoria ist kein elegantes Restaurant: Sie ist die Küche einer Familie, geöffnet für andere.",
        highlights: ["il ristorante", "la cucina", "la famiglia"],
      },
      {
        id: "r2-s11",
        it: "Il menù è corto, scritto a mano, e cambia ogni giorno.",
        de: "Die Speisekarte ist kurz, handgeschrieben, und ändert sich jeden Tag.",
        highlights: ["il menù"],
        note: "Eine lange Karte mit Fotos ist in Italien ein Warnsignal. Fünf Primi und vier Secondi sind ein gutes Zeichen.",
      },
      {
        id: "r2-s12",
        it: "Per trovare il posto giusto non leggere le recensioni: guarda chi mangia dentro.",
        de: "Um den richtigen Ort zu finden, lies keine Bewertungen: Schau, wer drinnen isst.",
        highlights: ["trovare", "mangiare"],
      },
      {
        id: "r2-s13",
        it: "A Napoli invece regna la pizza.",
        de: "In Neapel dagegen herrscht die Pizza.",
        highlights: ["la pizza"],
      },
      {
        id: "r2-s14",
        it: "Dal 2017 l'arte del pizzaiuolo napoletano è Patrimonio Immateriale dell'UNESCO.",
        de: "Seit 2017 ist die Kunst des neapolitanischen Pizzabäckers immaterielles UNESCO-Kulturerbe.",
        highlights: ["l'arte", "il pizzaiuolo"],
      },
      {
        id: "r2-s15",
        it: "La vera margherita ha solo pomodoro San Marzano, mozzarella di bufala, basilico e olio.",
        de: "Die echte Margherita hat nur San-Marzano-Tomaten, Büffelmozzarella, Basilikum und Öl.",
        highlights: ["il pomodoro", "il basilico", "l'olio"],
      },
      {
        id: "r2-s16",
        it: "Cuoce novanta secondi a quattrocentottanta gradi nel forno a legna.",
        de: "Sie backt neunzig Sekunden bei vierhundertachtzig Grad im Holzofen.",
        highlights: ["il forno"],
        note: "Deshalb ist der Rand — «il cornicione» — dunkel gefleckt. Diese Flecken heißen «leopardatura» und gelten als Qualitätsbeweis.",
      },
      {
        id: "r2-s17",
        it: "Alla fine il cameriere chiede: «Tutto bene?»",
        de: "Am Ende fragt der Kellner: «Alles gut?»",
        highlights: ["il cameriere", "chiedere"],
      },
      {
        id: "r2-s18",
        it: "Tu non rispondi con una parola: giri il dito sulla guancia. Significa «buonissimo».",
        de: "Du antwortest nicht mit einem Wort: Du drehst den Finger auf der Wange. Das heißt «hervorragend».",
        highlights: ["rispondere", "la guancia"],
      },
    ],
    culturalNote: {
      title: "Die ungeschriebenen Regeln der Bar",
      body:
        "Cappuccino gilt als Frühstück — nach elf Uhr bestellt ihn kaum ein Erwachsener, und nach dem Essen nie (Milch auf vollem Magen gilt als schwer verdaulich). In vielen römischen Bars zahlst du zuerst an der Kasse und legst den Bon mit einer Münze auf die Theke. Wer sich hinsetzt, zahlt oft das Doppelte: Der Tischservice («servizio al tavolo») wird extra berechnet, und das steht per Gesetz an der Wand. Und beim Bezahlen im Restaurant gilt: Trinkgeld ist keine Pflicht. Der «coperto» (1–3 € pro Person für Gedeck und Brot) steht auf der Rechnung, ein aufgerundeter Betrag genügt.",
      source: "UNESCO Immaterielles Kulturerbe · Arte del pizzaiuolo napoletano, 2017",
    },
  },

  grammatica: [
    {
      id: "g2-verbi",
      title: "Regelmäßige Verben im Präsens",
      italianTitle: "I verbi regolari al presente",
      explanation:
        "Italienische Verben enden auf -are, -ere oder -ire. Du streichst die Endung und hängst die Personalendung an. Weil die Endung schon verrät, wer spricht, lässt man das Personalpronomen meistens weg: nicht «io parlo», sondern einfach «parlo».",
      tables: [
        {
          caption: "Die drei Konjugationen",
          headers: ["", "parl-are (sprechen)", "prend-ere (nehmen)", "dorm-ire (schlafen)"],
          rows: [
            ["io", "parlo", "prendo", "dormo"],
            ["tu", "parli", "prendi", "dormi"],
            ["lui / lei / Lei", "parla", "prende", "dorme"],
            ["noi", "parliamo", "prendiamo", "dormiamo"],
            ["voi", "parlate", "prendete", "dormite"],
            ["loro", "parlano", "prendono", "dormono"],
          ],
          emphasizeRows: [3, 5],
        },
        {
          caption: "Sonderfall: -isc-Verben (die größere Hälfte der -ire-Gruppe)",
          headers: ["", "cap-ire (verstehen)", "prefer-ire (bevorzugen)"],
          rows: [
            ["io", "capisco", "preferisco"],
            ["tu", "capisci", "preferisci"],
            ["lui / lei / Lei", "capisce", "preferisce"],
            ["noi", "capiamo", "preferiamo"],
            ["voi", "capite", "preferite"],
            ["loro", "capiscono", "preferiscono"],
          ],
          emphasizeRows: [3, 4],
        },
      ],
      examples: [
        { it: "Parlo poco italiano, ma capisco quasi tutto.", de: "Ich spreche wenig Italienisch, aber ich verstehe fast alles.", focus: "capisco" },
        { it: "Prendiamo due caffè, per favore.", de: "Wir nehmen zwei Kaffee, bitte.", focus: "Prendiamo" },
        { it: "Preferisco la pizza margherita.", de: "Ich bevorzuge die Pizza Margherita.", focus: "Preferisco" },
      ],
      tip: "Merke dir den Rhythmus: In der noi-Form liegt die Betonung immer auf der vorletzten Silbe (par-LIA-mo), in der loro-Form dagegen weit vorne (PAR-la-no). Das ist der häufigste Aussprachefehler von Deutschsprachigen.",
    },
    {
      id: "g2-preposizioni",
      title: "Präpositionen — und wie sie mit dem Artikel verschmelzen",
      italianTitle: "Preposizioni semplici e articolate",
      explanation:
        "Trifft eine der Präpositionen a, di, da, in, su auf einen bestimmten Artikel, verschmelzen beide zu einem Wort. Das ist keine Stilfrage, sondern Pflicht — «a il bar» ist schlicht falsch.",
      tables: [
        {
          caption: "Verschmolzene Präpositionen (preposizioni articolate)",
          headers: ["+", "il", "lo / l'", "la", "i", "gli", "le"],
          rows: [
            ["a (zu, an, in)", "al", "allo / all'", "alla", "ai", "agli", "alle"],
            ["di (von, aus)", "del", "dello / dell'", "della", "dei", "degli", "delle"],
            ["da (von, bei)", "dal", "dallo / dall'", "dalla", "dai", "dagli", "dalle"],
            ["in (in)", "nel", "nello / nell'", "nella", "nei", "negli", "nelle"],
            ["su (auf)", "sul", "sullo / sull'", "sulla", "sui", "sugli", "sulle"],
          ],
        },
        {
          caption: "a oder in? Die Faustregel für Orte",
          headers: ["Präposition", "wofür", "Beispiel"],
          rows: [
            ["a", "Städte, kleine Inseln", "a Roma, a Napoli, a Capri"],
            ["in", "Länder, Regionen, große Inseln", "in Italia, in Toscana, in Sicilia"],
            ["in", "Räume und Institutionen", "in banca, in centro, in cucina"],
            ["a", "feste Wendungen", "a casa, a scuola, a letto, a teatro"],
            ["da", "zu / bei einer Person", "da Enzo, dal medico, da me"],
          ],
          emphasizeRows: [4],
        },
      ],
      examples: [
        { it: "Andiamo al bar all'angolo.", de: "Wir gehen in die Bar an der Ecke.", focus: "al" },
        { it: "La cupola del Pantheon.", de: "Die Kuppel des Pantheon.", focus: "del" },
        { it: "Stasera mangiamo dalla nonna.", de: "Heute Abend essen wir bei Oma.", focus: "dalla" },
      ],
      tip: "«Da Enzo» auf einem Schild heißt «bei Enzo» — deshalb heißen so viele Trattorien so. Genau dieses «da» brauchst du auch für «vado dal medico» (ich gehe zum Arzt).",
    },
    {
      id: "g2-tu-lei",
      title: "Duzen oder siezen?",
      italianTitle: "Dare del tu o dare del Lei",
      explanation:
        "Italienisch siezt mit der dritten Person Singular — grammatisch redest du also über die Person, nicht mit ihr. Der Wechsel ist einfach, aber du musst ihn im ganzen Satz durchziehen.",
      comparison: {
        leftTitle: "tu",
        leftHint: "Freunde, Familie, junge Leute, Kollegen",
        rightTitle: "Lei",
        rightHint: "Fremde, Ältere, Personal, Ämter",
        rows: [
          { label: "Begrüßung", left: "Ciao! Come stai?", right: "Buongiorno! Come sta?" },
          { label: "Entschuldigung", left: "Scusa…", right: "Scusi…" },
          { label: "Name erfragen", left: "Come ti chiami?", right: "Come si chiama?" },
          { label: "Bitte, warte", left: "Aspetta un attimo.", right: "Aspetti un attimo." },
          { label: "Verabschiedung", left: "Ciao, a presto!", right: "Arrivederci, buona giornata!" },
        ],
      },
      examples: [
        { it: "Salve, scusi, dov'è la stazione?", de: "Hallo, entschuldigen Sie, wo ist der Bahnhof?", focus: "scusi" },
        { it: "Possiamo darci del tu?", de: "Können wir uns duzen?", focus: "darci del tu" },
      ],
      tip: "Wenn dein Gegenüber sagt «dammi del tu» oder einfach zu «ciao» wechselt, ist das eine Einladung — nimm sie an. Weiter zu siezen wirkt dann kalt.",
    },
    {
      id: "g2-vorrei",
      title: "Bestellen ohne unhöflich zu sein",
      italianTitle: "Vorrei — il condizionale di cortesia",
      explanation:
        "«Voglio» heißt «ich will» und klingt am Tisch fordernd. «Vorrei» heißt «ich hätte gern» — dieselbe Bestellung, eine andere Person. Du brauchst zunächst nur diese eine Form, aber hier ist das ganze Muster.",
      tables: [
        {
          caption: "volere im Konditional",
          headers: ["Person", "Form", "Bedeutung"],
          rows: [
            ["io", "vorrei", "ich hätte gern"],
            ["tu", "vorresti", "du hättest gern"],
            ["lui / lei / Lei", "vorrebbe", "er / sie hätte gern"],
            ["noi", "vorremmo", "wir hätten gern"],
            ["voi", "vorreste", "ihr hättet gern"],
            ["loro", "vorrebbero", "sie hätten gern"],
          ],
          emphasizeRows: [0],
        },
      ],
      comparison: {
        leftTitle: "voglio",
        leftHint: "direkt, unter Freunden oder bei Entschlossenheit",
        rightTitle: "vorrei",
        rightHint: "höflich — der Standard im Lokal und im Laden",
        rows: [
          { label: "Bestellung", left: "Voglio un caffè.", right: "Vorrei un caffè, grazie." },
          { label: "Wunsch", left: "Voglio andare a Napoli.", right: "Vorrei andare a Napoli." },
          { label: "Frage", left: "Vuoi un dolce?", right: "Vorrebbe un dolce?" },
        ],
      },
      examples: [
        { it: "Vorrei prenotare un tavolo per due, per stasera.", de: "Ich würde gern einen Tisch für zwei reservieren, für heute Abend.", focus: "Vorrei" },
        { it: "Il conto, per favore.", de: "Die Rechnung, bitte.", focus: "Il conto" },
      ],
      tip: "Noch schneller geht es mit «prendo»: «Prendo una margherita» — «ich nehme eine Margherita». Das ist die Form, die Italiener selbst am häufigsten benutzen.",
    },
  ],

  dialogo: {
    title: "Auf der Straße und bei Tisch",
    italianTitle: "Per strada e a tavola",
    setting:
      "Trastevere, halb eins. Du suchst die Trattoria da Enzo, findest sie mit fremder Hilfe — und musst dann bestellen, ohne wie ein Reiseführer zu klingen.",
    yourRole: "Du — hungrig, mit zwei Lektionen Italienisch",
    partnerRole: "Erst eine Passantin, dann Salvatore, Kellner seit dreißig Jahren",
    steps: [
      {
        role: "partner",
        speaker: "Passantin",
        it: "Prego? Cerca qualcosa?",
        de: "Bitte? Suchen Sie etwas?",
        stageDirection: "Sie hat dich mit dem Handy in der Hand herumirren sehen.",
      },
      {
        role: "you",
        speaker: "Du",
        prompt: "Frag höflich nach dem Weg zur Trattoria da Enzo.",
        choices: [
          {
            it: "Salve, scusi, dov'è la Trattoria da Enzo?",
            de: "Hallo, entschuldigen Sie, wo ist die Trattoria da Enzo?",
            quality: "perfetto",
            feedback:
              "«Salve» + «scusi» ist die perfekte Kombination für eine Fremde: höflich, aber nicht steif. Und «dov'è» ist die Kurzform von «dove è».",
          },
          {
            it: "Ciao, scusa, dove è la Trattoria da Enzo?",
            de: "Hallo, entschuldige, wo ist die Trattoria da Enzo?",
            quality: "ok",
            feedback:
              "Verständlich, aber du duzt eine Fremde. Nimm «salve» und «scusi». Außerdem sagt man fast immer «dov'è», nicht «dove è».",
          },
          {
            it: "Trattoria da Enzo? Dove?",
            de: "Trattoria da Enzo? Wo?",
            quality: "no",
            feedback:
              "Zu knapp. Ohne Gruß und ohne «scusi» klingt es wie eine Aufforderung — in Italien ist der Gruß der Türöffner, nicht die Frage.",
          },
        ],
      },
      {
        role: "partner",
        speaker: "Passantin",
        it: "Allora: sempre dritto, poi la seconda a destra. È vicino alla piazza, accanto al fornaio.",
        de: "Also: immer geradeaus, dann die zweite rechts. Sie ist nahe am Platz, neben dem Bäcker.",
        stageDirection: "«alla» = a + la, «al» = a + il — die Verschmelzungen aus Schritt 2 in freier Wildbahn.",
      },
      {
        role: "you",
        speaker: "Du",
        prompt: "Bedanke dich und frag, ob es weit ist.",
        choices: [
          {
            it: "Grazie mille! È lontano?",
            de: "Vielen Dank! Ist es weit?",
            quality: "perfetto",
            feedback:
              "Kurz, natürlich, richtig. «È lontano?» ist die Standardfrage — die Antwort lautet in Rom fast immer «due minuti», egal wie weit es ist.",
          },
          {
            it: "Grazie mille! È lontana?",
            de: "Vielen Dank! Ist sie weit?",
            quality: "ok",
            feedback:
              "Nicht falsch, wenn du dich auf «la trattoria» beziehst. Im Alltag benutzt man aber die unpersönliche Form «è lontano?» — «ist es weit?».",
          },
          {
            it: "Grazie. Quanto costa?",
            de: "Danke. Wie viel kostet es?",
            quality: "no",
            feedback:
              "Du fragst die Passantin nach dem Preis der Wegbeschreibung. «Quanto costa?» brauchst du gleich — aber drinnen.",
          },
        ],
      },
      {
        role: "partner",
        speaker: "Salvatore",
        it: "Buongiorno! Un tavolo per una persona? Si accomodi pure, qui vicino alla finestra.",
        de: "Guten Tag! Ein Tisch für eine Person? Nehmen Sie ruhig Platz, hier am Fenster.",
        stageDirection: "Er wischt den Tisch mit einer Serviette ab, ohne hinzusehen.",
      },
      {
        role: "you",
        speaker: "Du",
        prompt: "Bestelle höflich eine Pizza Margherita und ein Wasser.",
        choices: [
          {
            it: "Grazie! Vorrei una margherita e un'acqua naturale, per favore.",
            de: "Danke! Ich hätte gern eine Margherita und ein stilles Wasser, bitte.",
            quality: "perfetto",
            feedback:
              "«Vorrei» ist genau die Höflichkeitsform, die hierher gehört. Beachte «un'acqua» mit Apostroph — weiblich vor Vokal.",
          },
          {
            it: "Voglio una margherita e un'acqua.",
            de: "Ich will eine Margherita und ein Wasser.",
            quality: "ok",
            feedback:
              "Grammatisch korrekt, aber «voglio» klingt am Tisch fordernd. Nimm «vorrei» oder «prendo» — beide sind unauffällig freundlich.",
          },
          {
            it: "Io mangiare pizza.",
            de: "Ich essen Pizza.",
            quality: "no",
            feedback:
              "Der Infinitiv steht nie allein als Aussage. Konjugiere: «mangio una pizza» — oder eleganter «prendo una margherita».",
          },
        ],
      },
      {
        role: "partner",
        speaker: "Salvatore",
        it: "Benissimo. E da bere solo acqua? Non vuole mica un bicchiere di rosso della casa?",
        de: "Sehr gut. Und zu trinken nur Wasser? Sie wollen doch nicht etwa ein Glas Hauswein?",
        stageDirection: "«Mica» verstärkt die Verneinung — er neckt dich freundlich.",
      },
      {
        role: "you",
        speaker: "Du",
        prompt: "Lehne ab, aber freundlich — du bist noch unterwegs. Benutze «mica».",
        choices: [
          {
            it: "Mica posso, devo ancora guidare! Comunque grazie.",
            de: "Ich kann leider nicht, ich muss noch fahren! Danke trotzdem.",
            quality: "perfetto",
            feedback:
              "Du hast sein «mica» aufgegriffen und mit «comunque» abgeschlossen — zwei Muttersprachler-Signale in einem Satz. Genau so klingt Alltagsitalienisch.",
            filler: "Mica",
          },
          {
            it: "No, grazie. Solo acqua.",
            de: "Nein, danke. Nur Wasser.",
            quality: "ok",
            feedback:
              "Völlig korrekt und höflich — aber du lässt seinen Ball fallen. Salvatore hat dir ein Spiel angeboten; ein «mica» zurück hätte ihn gefreut.",
          },
          {
            it: "Non voglio vino. Sono in macchina.",
            de: "Ich will keinen Wein. Ich bin mit dem Auto da.",
            quality: "ok",
            feedback:
              "Inhaltlich richtig, im Ton etwas hart. «Non posso» statt «non voglio» klingt weicher — du willst schon, du darfst nur nicht.",
          },
        ],
      },
      {
        role: "partner",
        speaker: "Salvatore",
        it: "Ci sta, ci sta. Allora: margherita e acqua naturale. Cinque minuti!",
        de: "Passt schon, passt schon. Also: Margherita und stilles Wasser. Fünf Minuten!",
      },
      {
        role: "partner",
        speaker: "Salvatore",
        it: "Ecco a Lei. Attenzione, il piatto scotta. Tutto bene?",
        de: "Bitte sehr. Vorsicht, der Teller ist heiß. Alles gut?",
        stageDirection: "Zwanzig Minuten später. Der Rand ist dunkel gefleckt — leopardatura.",
      },
      {
        role: "you",
        speaker: "Du",
        prompt: "Sag ihm, dass es hervorragend ist — und bitte anschließend um die Rechnung.",
        choices: [
          {
            it: "Buonissima, davvero! Comunque, quando può, il conto per favore.",
            de: "Wirklich hervorragend! Wenn Sie können, bitte die Rechnung.",
            quality: "perfetto",
            feedback:
              "«Buonissima» (weiblich, weil «la pizza») ist das richtige Superlativ-Lob. «Comunque» als Themenwechsel und «quando può» als Weichmacher — das ist Niveau B1 in einem A2-Satz.",
            filler: "Comunque",
          },
          {
            it: "Molto buono! Il conto!",
            de: "Sehr gut! Die Rechnung!",
            quality: "ok",
            feedback:
              "Zwei Punkte: «pizza» ist weiblich, also «molto buona». Und «il conto!» ohne «per favore» klingt wie ein Kommando.",
          },
          {
            it: "Sì, bene. Pago adesso?",
            de: "Ja, gut. Zahle ich jetzt?",
            quality: "ok",
            feedback:
              "Verständlich, aber blass. Ein Kellner, der dreißig Jahre am Tisch steht, hört gern, dass es geschmeckt hat — und «buonissima» kostet nichts.",
          },
        ],
      },
      {
        role: "partner",
        speaker: "Salvatore",
        it: "Grazie a Lei! Sono quattordici euro. Torni presto, eh!",
        de: "Ich danke Ihnen! Das macht vierzehn Euro. Kommen Sie bald wieder, ja!",
        stageDirection:
          "«Grazie a Lei» — die Standardantwort auf ein Dankeschön: «ich danke Ihnen». Nie «prego» allein, wenn jemand zahlt.",
      },
    ],
  },

  madrelingua: {
    intro:
      "Diese vier Wörter stehen in keinem Anfängerbuch und fallen in jedem italienischen Gespräch. Wer sie richtig platziert, wird nicht mehr für einen Anfänger gehalten — auch mit kleinem Wortschatz.",
    fillers: [
      {
        word: "Mica",
        literal: "«Krümel» (von lat. mica — Brotkrume)",
        meaning: "doch nicht / etwa nicht / keineswegs — verstärkte Verneinung",
        register: "colloquiale",
        example: {
          it: "Non è mica facile, sai?",
          de: "Das ist gar nicht so einfach, weißt du?",
        },
        whenToUse:
          "Als Verstärkung nach «non» («non è mica vero») oder in Fragen, die eine Bitte verstecken: «Non è che hai mica una penna?» — «Du hast nicht zufällig einen Stift?». Umgangssprachlich, aber überall zu hören.",
      },
      {
        word: "Comunque",
        literal: "«wie auch immer»",
        meaning: "jedenfalls / trotzdem / übrigens — und: zurück zum Thema.",
        register: "neutro",
        example: {
          it: "Comunque, quando può, il conto per favore.",
          de: "Wenn Sie können, bitte die Rechnung.",
        },
        whenToUse:
          "Der eleganteste Themenwechsel der italienischen Sprache. Beendet einen Abschweif und leitet zur Sache zurück. Junge Römer kürzen es zu «comu».",
      },
      {
        word: "Ci sta",
        literal: "«es steht darin / es passt hinein»",
        meaning: "passt schon / geht klar / kann man machen",
        register: "colloquiale",
        example: {
          it: "«Facciamo alle nove?» «Ci sta.»",
          de: "«Machen wir um neun?» «Passt.»",
        },
        whenToUse:
          "Zustimmung mit Schulterzucken: einverstanden, ohne Begeisterung. Ursprünglich römisch, heute in ganz Italien unter Jüngeren. In einem Bewerbungsgespräch besser nicht.",
      },
      {
        word: "Figurati",
        literal: "«stell dir vor»",
        meaning: "Keine Ursache! / Aber ich bitte dich! / Nicht der Rede wert.",
        register: "informale",
        example: {
          it: "«Grazie mille!» «Figurati!»",
          de: "«Vielen Dank!» «Keine Ursache!»",
        },
        whenToUse:
          "Die warme Antwort auf ein Dankeschön oder eine Entschuldigung — herzlicher als «prego». Beim Siezen wird daraus «si figuri».",
      },
    ],
    gestures: [
      {
        name: "Der Finger auf der Wange",
        italianName: "Il dito nella guancia",
        hand: "Zeigefinger auf die Wange setzen und wie einen Schraubenzieher drehen.",
        meaning: "Buonissimo! — köstlich.",
        whenToUse:
          "Nur für Essen und Trinken. Der stumme Ersatz für ein Kompliment, während dein Mund voll ist. In Süditalien häufiger als jedes Lob in Worten.",
      },
      {
        name: "Ich habe Hunger",
        italianName: "Ho fame",
        hand: "Flache Hand senkrecht, kurze Hackbewegungen gegen die Bauchseite.",
        meaning: "Ich sterbe vor Hunger.",
        whenToUse:
          "Unter Freunden, quer durch den Raum, wenn das Essen dauert. Nie gegenüber dem Kellner — das wäre Drängeln.",
      },
      {
        name: "Genug, danke",
        italianName: "Basta così",
        hand: "Flache Hand waagerecht über dem Teller oder Glas, eine kurze Bewegung zur Seite.",
        meaning: "Danke, das reicht.",
        whenToUse:
          "Beim Nachschenken oder Nachlegen. Deutlich freundlicher als ein gesprochenes «no» und in lauten Lokalen praktischer.",
      },
      {
        name: "Die Rechnung, bitte",
        italianName: "Il conto, per favore",
        hand: "Mit dem Zeigefinger eine kleine Kritzelbewegung auf die offene Handfläche.",
        meaning: "Wir würden gern zahlen.",
        whenToUse:
          "Über den Raum hinweg, sobald du Blickkontakt hast. Völlig normal und nicht unhöflich — in Italien bringt niemand die Rechnung ungefragt.",
        caution:
          "Fingerschnippen oder «Cameriere!» rufen gilt dagegen als grob. Blickkontakt genügt fast immer.",
      },
    ],
  },

  shadowing: {
    intro:
      "Die Sätze dieser Lektion sind Werkzeuge — du wirst sie in Italien wörtlich brauchen. Sprich sie so lange mit, bis du nicht mehr über die Wörter nachdenkst.",
    lines: [
      {
        it: "Salve, scusi, dov'è la Trattoria da Enzo?",
        de: "Hallo, entschuldigen Sie, wo ist die Trattoria da Enzo?",
        rhythm: "SAL-ve, SCU-si, do-VÈ la trat-to-RI-a da EN-zo",
        tip: "«dov'è» ist ein einziges Wort mit Betonung ganz hinten — do-VÈ, nicht DO-ve.",
      },
      {
        it: "Sempre dritto, poi la seconda a destra.",
        de: "Immer geradeaus, dann die zweite rechts.",
        rhythm: "SEM-pre DRIT-to, poi la se-CON-da a DE-stra",
        tip: "Das doppelte T in «dritto» braucht eine echte Pause. Ohne sie klingt es wie «drito».",
      },
      {
        it: "Vorrei una margherita e un'acqua naturale, per favore.",
        de: "Ich hätte gern eine Margherita und ein stilles Wasser, bitte.",
        rhythm: "vor-REI una mar-ghe-RI-ta e un-AC-qua na-tu-RA-le, per fa-VO-re",
        tip: "«gh» ist immer hart wie in «Gast»: mar-ghe-RI-ta, nie «dsch».",
      },
      {
        it: "Non è mica facile, sai?",
        de: "Das ist gar nicht so einfach, weißt du?",
        rhythm: "non è MI-ca FA-ci-le, SAI",
        tip: "«facile» wird vorn betont: FA-ci-le. Deutsche Sprecher rutschen gern auf die Mitte.",
      },
      {
        it: "Comunque, quando può, il conto per favore.",
        de: "Wenn Sie können, bitte die Rechnung.",
        rhythm: "co-MUN-que, QUAN-do PUÒ, il CON-to per fa-VO-re",
        tip: "Nach «comunque» eine winzige Pause — das ist das Komma, das den Themenwechsel markiert.",
      },
      {
        it: "Buonissima, davvero! Grazie mille.",
        de: "Wirklich hervorragend! Vielen Dank.",
        rhythm: "buo-NIS-si-ma, dav-VE-ro! GRA-zie MIL-le",
        tip: "«zi» in «grazie» klingt wie «tsi». Und das doppelte V in «davvero» wird wirklich gehalten.",
      },
    ],
  },

  vocabulary: [
    { it: "bar", de: "Café, Bar", pos: "sost.", article: "il", plural: "i bar", example: { it: "Andiamo al bar.", de: "Gehen wir ins Café." }, tags: ["luoghi", "cibo"] },
    { it: "caffè", de: "Kaffee, Espresso", pos: "sost.", article: "il", plural: "i caffè", example: { it: "Un caffè, per favore.", de: "Einen Espresso, bitte." }, tags: ["cibo"] },
    { it: "banco", de: "Theke", pos: "sost.", article: "il", plural: "i banchi", example: { it: "Si beve al banco.", de: "Man trinkt an der Theke." }, tags: ["luoghi"] },
    { it: "tazzina", de: "Espressotasse", pos: "sost.", article: "la", plural: "le tazzine", example: { it: "La tazzina è piccolissima.", de: "Die Tasse ist winzig." }, tags: ["cibo"] },
    { it: "barista", de: "Barkeeper, Barista", pos: "sost.", article: "il", plural: "i baristi", example: { it: "Il barista conosce tutti.", de: "Der Barista kennt alle." }, tags: ["persone"] },
    { it: "mezzogiorno", de: "Mittag", pos: "sost.", article: "il", example: { it: "A mezzogiorno si mangia.", de: "Um zwölf wird gegessen." }, tags: ["tempo"] },
    { it: "pranzo", de: "Mittagessen", pos: "sost.", article: "il", plural: "i pranzi", example: { it: "Dopo pranzo, un caffè.", de: "Nach dem Mittagessen ein Espresso." }, tags: ["cibo", "tempo"] },
    { it: "pomeriggio", de: "Nachmittag", pos: "sost.", article: "il", plural: "i pomeriggi", example: { it: "Alle tre del pomeriggio.", de: "Um drei Uhr nachmittags." }, tags: ["tempo"] },
    { it: "sconosciuto", de: "Fremder, Unbekannter", pos: "sost.", article: "lo", plural: "gli sconosciuti", example: { it: "Con uno sconosciuto usi «salve».", de: "Mit einem Fremden benutzt du «salve»." }, tags: ["persone"] },
    { it: "trattoria", de: "Trattoria, einfaches Lokal", pos: "sost.", article: "la", plural: "le trattorie", example: { it: "La trattoria apre a mezzogiorno.", de: "Die Trattoria öffnet um zwölf." }, tags: ["luoghi", "cibo"] },
    { it: "ristorante", de: "Restaurant", pos: "sost.", article: "il", plural: "i ristoranti", example: { it: "Un ristorante elegante.", de: "Ein elegantes Restaurant." }, tags: ["luoghi", "cibo"] },
    { it: "cucina", de: "Küche", pos: "sost.", article: "la", plural: "le cucine", example: { it: "La cucina di una famiglia.", de: "Die Küche einer Familie." }, tags: ["casa", "cibo"] },
    { it: "menù", de: "Speisekarte", pos: "sost.", article: "il", plural: "i menù", example: { it: "Il menù cambia ogni giorno.", de: "Die Karte wechselt täglich." }, tags: ["cibo"] },
    { it: "cameriere", de: "Kellner", pos: "sost.", article: "il", plural: "i camerieri", example: { it: "Il cameriere porta il conto.", de: "Der Kellner bringt die Rechnung." }, tags: ["persone", "cibo"] },
    { it: "conto", de: "Rechnung", pos: "sost.", article: "il", plural: "i conti", example: { it: "Il conto, per favore.", de: "Die Rechnung, bitte." }, tags: ["cibo", "utile"] },
    { it: "pizza", de: "Pizza", pos: "sost.", article: "la", plural: "le pizze", example: { it: "Prendo una margherita.", de: "Ich nehme eine Margherita." }, tags: ["cibo"] },
    { it: "pizzaiuolo", de: "Pizzabäcker", pos: "sost.", article: "il", plural: "i pizzaiuoli", example: { it: "L'arte del pizzaiuolo napoletano.", de: "Die Kunst des neapolitanischen Pizzabäckers." }, tags: ["persone", "cibo"] },
    { it: "forno", de: "Ofen", pos: "sost.", article: "il", plural: "i forni", example: { it: "Un forno a legna.", de: "Ein Holzofen." }, tags: ["cibo", "casa"] },
    { it: "pomodoro", de: "Tomate", pos: "sost.", article: "il", plural: "i pomodori", example: { it: "Pomodoro San Marzano.", de: "San-Marzano-Tomate." }, tags: ["cibo"] },
    { it: "basilico", de: "Basilikum", pos: "sost.", article: "il", example: { it: "Basilico fresco sopra.", de: "Frisches Basilikum obendrauf." }, tags: ["cibo"] },
    { it: "olio", de: "Öl", pos: "sost.", article: "l'", plural: "gli oli", example: { it: "Un filo d'olio.", de: "Ein Faden Öl." }, tags: ["cibo"] },
    { it: "guancia", de: "Wange", pos: "sost.", article: "la", plural: "le guance", example: { it: "Il dito sulla guancia.", de: "Der Finger auf der Wange." }, tags: ["corpo"] },
    { it: "cominciare", de: "beginnen", pos: "verbo", example: { it: "Il giorno comincia al bar.", de: "Der Tag beginnt in der Bar." }, tags: ["verbi"] },
    { it: "prendere", de: "nehmen", pos: "verbo", example: { it: "Prendo una margherita.", de: "Ich nehme eine Margherita." }, tags: ["verbi", "cibo"] },
    { it: "capire", de: "verstehen", pos: "verbo", example: { it: "Non capisco, può ripetere?", de: "Ich verstehe nicht, können Sie wiederholen?" }, tags: ["verbi", "utile"] },
    { it: "preferire", de: "bevorzugen, lieber mögen", pos: "verbo", example: { it: "Preferisco l'acqua naturale.", de: "Ich mag lieber stilles Wasser." }, tags: ["verbi"] },
    { it: "chiedere", de: "fragen, bitten um", pos: "verbo", example: { it: "Chiedo il conto.", de: "Ich bitte um die Rechnung." }, tags: ["verbi"] },
    { it: "vorrei", de: "ich hätte gern", pos: "espr.", example: { it: "Vorrei un tavolo per due.", de: "Ich hätte gern einen Tisch für zwei." }, tags: ["espressioni", "cibo"] },
    { it: "sempre dritto", de: "immer geradeaus", pos: "espr.", example: { it: "Sempre dritto, poi a destra.", de: "Immer geradeaus, dann rechts." }, tags: ["strada"] },
    { it: "a destra", de: "rechts", pos: "espr.", example: { it: "La seconda a destra.", de: "Die zweite rechts." }, tags: ["strada"] },
    { it: "a sinistra", de: "links", pos: "espr.", example: { it: "Il museo è a sinistra.", de: "Das Museum ist links." }, tags: ["strada"] },
    { it: "lontano", de: "weit", pos: "agg.", example: { it: "È lontano?", de: "Ist es weit?" }, tags: ["strada", "utile"] },
  ],

  quiz: [
    {
      id: "q2-1",
      type: "fill",
      prompt: "Verschmolzene Präposition: a + il",
      sentence: "Andiamo ___ bar all'angolo.",
      accepted: ["al"],
      hint: "a + il = ?",
      explanation: "a + il ergibt «al». Die Verschmelzung ist Pflicht — «a il bar» existiert nicht.",
    },
    {
      id: "q2-2",
      type: "fill",
      prompt: "Konjugiere «capire» in der ich-Form",
      sentence: "Parlo poco italiano, ma ___ quasi tutto.",
      accepted: ["capisco"],
      hint: "«capire» gehört zu den -isc-Verben.",
      explanation:
        "«Capire» schiebt in io, tu, lui und loro ein -isc- ein: capisco, capisci, capisce, capiscono. Nur noi und voi bleiben regelmäßig.",
    },
    {
      id: "q2-3",
      type: "choice",
      prompt: "Du sprichst eine ältere Dame auf der Straße an. Was sagst du?",
      question: "___, dov'è la stazione?",
      options: ["Ciao, scusa", "Salve, scusi", "Ehi, senti", "Buonanotte, scusa"],
      correctIndex: 1,
      explanation:
        "«Salve» plus die Sie-Form «scusi» ist höflich und trotzdem locker. «Scusa» wäre geduzt, «senti» reserviert man für Freunde.",
    },
    {
      id: "q2-4",
      type: "translate",
      prompt: "Übersetze ins Italienische — höflich bestellen",
      de: "Ich hätte gern eine Pizza Margherita, bitte.",
      accepted: [
        "vorrei una pizza margherita, per favore",
        "vorrei una pizza margherita per favore",
        "vorrei una margherita, per favore",
        "vorrei una margherita per favore",
      ],
      hint: "Nicht «voglio» — das klingt fordernd.",
      explanation:
        "«Vorrei» ist der Konditional der Höflichkeit und im Lokal der Normalfall. «Prendo una margherita» geht genauso.",
    },
    {
      id: "q2-5",
      type: "choice",
      prompt: "a oder in?",
      question: "Quest'estate andiamo ___ Sicilia, e prima due giorni ___ Napoli.",
      options: ["a … in", "in … a", "in … in", "a … a"],
      correctIndex: 1,
      explanation:
        "Große Inseln und Regionen bekommen «in» (in Sicilia), Städte bekommen «a» (a Napoli).",
    },
    {
      id: "q2-6",
      type: "choice",
      prompt: "Was bedeutet «Ci sta»?",
      question: "«Facciamo alle nove?» — «Ci sta.»",
      options: [
        "Da ist er.",
        "Passt schon, geht klar.",
        "Es ist zu spät.",
        "Er steht dort drüben.",
      ],
      correctIndex: 1,
      explanation:
        "«Ci sta» ist umgangssprachliche Zustimmung — einverstanden, ohne große Begeisterung. Ursprünglich römisch, heute überall unter Jüngeren.",
    },
    {
      id: "q2-7",
      type: "fill",
      prompt: "Setze das Füllwort ein, das die Verneinung verstärkt",
      sentence: "Non è ___ facile, sai?",
      accepted: ["mica"],
      hint: "Vier Buchstaben, kommt vom lateinischen Wort für «Krümel».",
      explanation:
        "«Mica» verstärkt die Verneinung: «non è mica facile» — «das ist gar nicht so einfach».",
    },
    {
      id: "q2-8",
      type: "choice",
      prompt: "Der Kellner fragt «Tutto bene?» und du drehst den Zeigefinger auf der Wange. Was sagst du damit?",
      question: "Il dito nella guancia",
      options: [
        "Ich hätte gern die Rechnung.",
        "Ich habe großen Hunger.",
        "Es ist köstlich.",
        "Nein danke, das reicht.",
      ],
      correctIndex: 2,
      explanation:
        "Der gedrehte Finger auf der Wange heißt «buonissimo» und gilt ausschließlich für Essen und Trinken.",
    },
  ],
};
