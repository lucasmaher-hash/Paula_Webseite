# design.md — PM Beauty

Styleguide für die Website. Regeln statt Formen: Wer nur diese Datei liest, soll eine Seite bauen können, die nach der Marke aussieht.

Kennzeichnung: **[Code]** = aus dem Branding-Code übernommen · **[Ich]** = selbst festgelegt · **OFFEN** = fehlt noch

Stand 31.10.2026. Werte aus `website/css/style.css` und `website/styleguide.html` (Hex aus den HSL-Variablen berechnet). Die ältere Datei `claude_background/docs/design.md` (Beige, Instrument Sans als Überschrift) gilt nicht mehr.

## Marke
- Kernidee in einem Satz: Präzise Schönheit, die bleibt. [Code] (`markenprofil.md`)
- Drei Eigenschaften: Präzision · gepflegte Eleganz · ehrliche Qualität [Code]
- Tonfall der Sprache: persönlich (Du, Paula in Ich-Form), klar (kurze Sätze, Überschriften mit Punkt), ruhig (keine Ausrufezeichen, keine Superlative, keine Rabatt-Sprache). [Code]
- Was die Marke nicht ist: laut oder glitzernd („Insta-Baddie“), Discount-Studio, klinisch-kühl, übertrieben (keine Vorher-Nachher-Filter, keine fremden Fotos), Kette. [Code]
- Gestaltungsprinzip: **Die Mitte.** Wichtiges steht mittig oder auf einer klaren Achse; Linien und Formen wachsen aus der Mitte nach außen, nie von links. [Code]

## Farben
Zwei Paletten, beide aus je einem Farbton, einer Sättigung und Helligkeit abgeleitet (`:root` bzw. `.theme-brown` und `.theme-pink`). Braun ist die Basis, Pink gilt für Panels (`.services`, `.reviews`, `.theme-pink`). [Code]

| Name | Braun | Pink | Wofür |
| --- | --- | --- | --- |
| Hintergrund | #F6EDEA | #F0E0E2 | Seitenhintergrund |
| Fläche erhöht | #F7F0ED | #F2E3E6 | Akkordeon-Zeilen, Karten |
| Fläche | #EEDED8 | #E8CFD3 | Kacheln, Hover-Flächen |
| Fläche tief | #E7D2CA | #E1C1C6 | Gedämpfte Panels |
| Text | #745449 | #634046 | Fließtext, Überschriften |
| Text gedämpft | #8E6A5D | #7D545A | Labels, Nebeninfos |
| Akzent | #966250 | #834952 | Fokusring, Hervorhebung |
| Button | #A17463 | #935D65 | Hauptbutton (Hover: #926858 / #83535A) |
| Text auf Button | #FAF6F4 | #FAF5F5 | Schrift auf Button |

Zusätzlich: Pink-Detail `#D19FA6`, Pink weich `#E8CFD3`, Hero-Wand `#A39588`. [Code]
Rahmen: Palettenfarbe mit ca. 19 % (Braun) bzw. 18 % (Pink) Deckkraft. [Code]

- Verhältnis: Braun trägt die Seite, Pink höchstens eine Fläche pro Ansicht, sonst nur Details. Kein reines Weiß, kein Schwarz, kein kaltes Grau. [Code]
- Kontrast Text auf Hintergrund: OFFEN (nicht gemessen; Text ist ein mittleres Braun, nicht Schwarz).

## Schrift
- Überschriften: **Gambarino**, Gewicht 400, Quelle Fontshare (per `<link>` geladen), Fallback Lora (lokal) und Georgia. Auch große Zahlen (Gutschein-Beträge, Bewertung). [Code]
- Fließtext und Bedienung: **Instrument Sans** 400/500/600, lokal in `website/fonts/`. [Code]
- Technische Angaben (Dauer, Labels): **Space Mono** 400/700, lokal. [Code]
- Größen: Display `clamp(2.4rem, 7.4vw, 4.4rem)` · H2 `clamp(1.7rem, 4.6vw, 2.6rem)` · H3 1,15–1,7 rem · Fließtext 1 rem · klein 0,85 rem · Mono-Label 0,72 rem. [Code]
- Zeilenabstand: Fließtext 1,6 · Display 1,14 (Hero 1,02–1,14) · H2 1,1. Laufweite Überschriften −0,02 em, Mono-Label +0,12 em. [Code]
- Schreibweise: Überschriften normal gesetzt mit Punkt am Ende; Labels (Eyebrow, Mono) versal und gesperrt. [Code]
- OFFEN: Gambarino kommt von einem externen Server (Fontshare). Lokale Einbindung noch nicht entschieden (Lizenz prüfen).

## Abstände und Raster
- Grundeinheit: 4 px. [Code]
- Abstände: klein 4/8/12 · mittel 16/24/32 · groß 48/72/112 px (`--space-1` bis `--space-9`). [Code]
- Abschnitte: 104 px oben und unten am Handy, 112 px ab 900 px. [Code]
- Maximale Breite des Inhalts: 1240 px. [Code]
- Raster: Handy eine Spalte, Seitenrand 20 px; ab 900 px Seitenrand 32 px und mehrspaltig. Header 72 px hoch, sticky. [Code]
- Entwurfsreihenfolge: zuerst 375 px, dann Desktop. [Ich]

## Formen und Elemente
- Ecken: gerundet. 8 · 16 · 24 · 32 px, Buttons und Chips voll rund (999 px). Am Handy sind große Panels und Fotos etwas weniger rund (17 und 22 px). [Code]
- Linien: 1 px in der Rahmenfarbe um jedes Panel, jedes Foto und jede Zeile („eine leise Linie pro Rahmen“). [Code]
- Schatten: nein. Tiefe entsteht durch Abstufung der Flächen. Einzige Ausnahme: das Dropdown-Panel der Navigation. [Code]
- Typische Grafikelemente: handgezeichnetes PM-Monogramm (Schreibanimation), Lorbeerkränze bei den Auszeichnungen, Label mit Punkt (Eyebrow), Linien, die aus der Mitte wachsen. [Code]

## Bildwelt
Nahaufnahmen echter Ergebnisse (Brauen, Lippen, Wimpern, Nägel) in abgerundeten Rahmen, warme Töne, wenig Retusche. Das Hero zeigt Paula, am Handy hochformatig und unten ausgeblendet. KI-erzeugte Bilder und Mockups sind als solche gekennzeichnet; keine fremden Fotos als eigene Arbeit. [Code/Ich]

## Bewegung
- Was bewegt sich? Logo-Schreibanimation, Inhalte beim Erscheinen, Hover-Linien, Akkordeons, Lorbeerkränze, 3D-Nagel im Styleguide (experimentell, Three.js). Auf `/1/` seit 10.11.2026 ein fließender Hintergrund aus gefalteten Farbflächen, der Maus und Scroll verwirbeln (experimentell, WebGL, Variante Braun oder Pink); die Behandlungen stehen dort in drei Ovalen (Kontur, beim Hover gefüllt in der Textfarbe mit sechs Leistungen), Sterne dazwischen. [Code]
- Charakter: ruhig. Meist 0,25–0,6 s, ease; Linien und Bilder 0,35–0,8 s mit `cubic-bezier(.4,0,.2,1)`; Lorbeer 1 s mit `cubic-bezier(.2,.8,.2,1)`. Langsam ein, weich aus, nichts springt. [Code]
- Auslöser: Laden (Logo), Scrollen (`.reveal`, Bewegung 14 px nach oben), Hover und Fokus (Linie wächst aus der Mitte), Klick (Akkordeon öffnet, gleitet in die Bildschirmmitte). [Code]
- Was bleibt immer gleich? Richtung aus der Mitte nach außen. Bei `prefers-reduced-motion` entfallen alle Übergänge. [Code]
- Stand: dokumentiert, nicht ausgebaut. Neue Animationen folgen laut Ammer nächste Woche.

## Komponenten
- Navigation: sticky Header mit Logo, Links und Dropdown „Behandlungen“; am Handy Vollbild-Menü. Hover-Linie wächst aus der Mitte. Header wechselt über Pink-Panels die Farbe (1 s). [Code]
- Button: Pille, mindestens 52 px hoch (klein 44 px), Pfeil ohne Kreis. Hauptbutton in Button-Farbe (`.btn-brown`/`.btn-primary`) mit heller Schrift, Zweitbutton `.btn-soft` halbtransparent mit feinem Rand. Fokus: 2 px Ring in Akzent. [Code]
- Link: Textfarbe, Unterstreichung wächst bei Hover aus der Mitte. [Code]
- Karte oder Kachel: Fläche oder Fläche erhöht, Radius 24 px, 1 px Rahmen. Behandlungen als Akkordeon (`<details>`) pro Kategorie, Dauer in Mono. Gutscheine als Karten mit großem Betrag in Gambarino. [Code]
- Weitere: Eyebrow-Label, Bewertungskarten, Auszeichnungen mit Lorbeer, Kontakt-Panel mit Öffnungszeiten. [Code]

## Do's und Don'ts
- Do: viel Braun, wenig Pink · Gambarino nur für Überschriften und Zahlen · alles aus der Mitte aufbauen · echte Fotos nah · Werte aus den CSS-Variablen · Deutsch, ruhig, Du-Ansprache. [Ich]
- Don't: keine Behandlungspreise auf der Website (Wunsch von Paula; Gutschein-Beträge sind erlaubt) · kein Pink als große Fläche · keine Schatten · keine Script-Schriften oder Rosé-Gold-Glitzer · nichts, das seitlich hereinfliegt · keine erfundenen Fakten über das Studio. [Code/Ich]

## Quellen
- Branding-Dateien: `website/css/style.css`, `website/styleguide.html`, `website/fonts/fonts.css`, `claude_background/branding/` (Logo, Assets), `claude_background/docs/prd.md` (Fakten).
- Markenprofil: `markenprofil.md`
- Briefing: `briefing.md`
- Veraltet, nicht mehr verwenden: `claude_background/docs/design.md`
