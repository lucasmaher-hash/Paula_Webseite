# Workflow: PM Beauty · Kurzprojekt 1

## Logbuch

### 18.10.2026 · Wortmarke mit eigenem E
- **Versucht:** PM Beauty mit Cormorant Unicase Regular als echte Vektorpfade konstruieren; das nach oben gerichtete E anhand von Lucas' Skizze individuell zeichnen und in der Gesamtbreite zentrieren.
- **Funktioniert:** Fontkonturen mit fontTools übernommen, E als symmetrischen Bézierpfad gezeichnet, schwarze und weiße SVGs sowie separates E erstellt. Vorschau gerendert und angesehen; SVG-Struktur und geometrische Mitte geprüft.
- **Nicht funktioniert / offen:** Direkter Figma-Zugriff war in dieser Sitzung nicht verfügbar. Lucas beauftragte ausdrücklich die Konstruktion außerhalb von Figma. Ein zunächst versuchter Rasterrenderer zog einen unnötigen Build nach sich und wurde abgebrochen; die Vorschau wurde mit dem vorhandenen Sharp gerendert. Freigabe, Figma-Import und eine für kleine Größen angepasste Fassung stehen aus.

### 18.10.2026 · Proportionen verfeinert (Entwurf 02)
- **Versucht:** Auf Lucas' Wunsch B etwas verbreitern, A etwas verschmälern und A–U enger setzen, bei weiterhin exakt mittigem E.
- **Funktioniert:** B horizontal +8 %, A −6 %, A–U-Abstand 8 → 3 SVG-Einheiten; M–B-Abstand automatisch zum Breitenausgleich reduziert. SVGs und Vorschau neu erzeugt, tatsächliche Pfadgrenzen auf Zentrierung geprüft. Entwurf 01 archiviert.
- **Nicht funktioniert / offen:** Keine technische Blockade; gestalterische Freigabe steht aus.

### 18.10.2026 · PM enger gesetzt (Entwurf 03)
- **Versucht:** Auf Lucas' Wunsch den P–M-Abstand verringern und das E weiterhin exakt mittig halten.
- **Funktioniert:** P–M von 48 auf 32 Einheiten reduziert, die 16 Einheiten in den Wortabstand M–B verschoben. SVGs und Vorschau erneuert; Pfadgrenzen bestätigen die unveränderte Gesamtbreite und E-Mitte. Entwurf 02 archiviert.
- **Nicht funktioniert / offen:** Keine technische Blockade; gestalterische Freigabe steht aus.

### 18.10.2026 · Parallelfassung mit Claude Code: E parametrisch, drei Höhen, Figma-Import
- **Versucht:** Gleiche Aufgabe parallel in Claude Code. Das E entsteht als parametrischer Pfad aus den Maßen des Cormorant-E: Rücken (64) wird Balken, Arme werden Außenstriche, Mittelarm wird Kelch-Stiel. Höhen 2,0 / 2,7 / 3,5 × Versalhöhe. Zentrierung rechnerisch (Abweichung 0), Laufweite links +45 / rechts −45 als optischer Ausgleich für A, T, Y, der Rest über den Wortabstand. Import nach Figma als Vektoren über die Plugin-API.
- **Funktioniert:** Glyphen per fontTools, Vorschau über einen lokalen Server im Browser-Pane, Figma-Import (Wortmarke und E als getrennte Vektoren). Lucas' Korrektur nach der ersten Runde umgesetzt: Balken auf der Grundlinie, Füße darunter, Kerbe unter dem Stiel wie in der Skizze, Stiel nur 0,54 × Versalhöhe (am Italiana-Entwurf gemessen), Striche 50 % dicker.
- **Nicht funktioniert / offen:** Die erste Runde hat die Skizze falsch gelesen (Balken über der Grundlinie, keine Kerbe, Stiel zu hoch). Die Quick-Look-Vorschau beschnitt die SVGs quadratisch und war unbrauchbar. Es gibt jetzt zwei parallele Logo-Stände (Codex und Claude). Welcher weitergeführt wird, ist nicht entschieden.

### 18.10.2026 · E kräftiger und Serifen länger (Entwurf 04)
- **Versucht:** E insgesamt etwas kräftiger und die beiden nach unten zeigenden Serifen rund 30 % länger gestalten.
- **Funktioniert:** Hauptstrichstärken um 15 % erhöht; Serifenüberstand unter der Grundlinie von 12 auf 15,6 Einheiten verlängert. SVG-Pfadgrenzen geprüft: E weiterhin mittig, andere Buchstaben unverändert. Vorschau gerendert und angesehen; Entwurf 03 archiviert.
- **Nicht funktioniert / offen:** Keine technische Blockade; gestalterische Freigabe steht aus.

### 18.10.2026 · E vergrößert und Strichkontrast angepasst (Entwurf 05)
- **Versucht:** Unteren Balken um 40 % verdicken, Mittelsteg um 30 % verschmälern und anschließend das gesamte E um 30 % vergrößern, weiterhin mittig.
- **Funktioniert:** Konturen angepasst und Skalierung um Grundlinie/Mittelachse in den Pfad eingerechnet. Nachbargruppen je 15 Einheiten nach außen versetzt. Pfadgrenzen bestätigen Breite und Höhe +30 % sowie die exakte Zentrierung; Vorschau gerendert und angesehen. Entwurf 04 archiviert.
- **Nicht funktioniert / offen:** Keine technische Blockade; gestalterische Freigabe steht aus.

### 18.10.2026 · Claude-Fassung: 2,7× gewählt, Feinschliff Laufweite
- **Versucht:** Lucas wählte die Höhe 2,7 × Versalhöhe. Claude kritisierte selbst: Das Loch zwischen „PM“ und „B“ war rund 3,7-mal so breit wie der Buchstabenabstand, das E wirkte heller als die Buchstaben. Umgesetzt wurden E-Striche 32 → 40 und Stiel 38 → 48, außerdem drei Laufweiten-Optionen A/B/C (Laufweite 200, Ausgleich links/rechts ±70/±90/±110), alle in Figma.
- **Funktioniert:** E bleibt in allen 18 Exporten rechnerisch exakt mittig (Abweichung 0). Option C senkt das Verhältnis Wortabstand zu Buchstabenabstand auf etwa 2,0; die Wortmarke liest sich als ein Wort.
- **Nicht funktioniert / offen:** Mehr Laufweite allein hilft kaum (Verhältnis 3,7 → 3,1 selbst bei Laufweite 240), weil „AUTY“ 539 Einheiten breiter ist als „PM B“. Das Loch lässt sich nur gegen ungleiche Laufweite links und rechts tauschen. Vorschläge „kürzere Füße“ und „Stiel auf Höhe des B-Querstrichs“ hat Lucas abgelehnt. Wahl zwischen A/B/C steht aus.

### 18.10.2026 · Codex-Entwürfe v1–v6 nach Figma
- **Versucht:** Die sechs Codex-Fassungen (`versions/v1`–`v6`) als Vektoren in die Figma-Datei holen, auf gleicher Versalhöhe und gleicher Karte wie die Claude-Fassungen, damit beide Stände direkt vergleichbar sind.
- **Funktioniert:** Alle sechs liegen im Rahmen „PM BEAUTY · Codex-Entwürfe v1–v6“, Buchstaben als einzelne benannte Vektoren. v6 (Italiana) stimmt mit Codex' eigener Vorschau überein.
- **Nicht funktioniert / offen:** Wegen des Größenlimits pro Figma-Aufruf wurden die Pfade auf zwei Nachkommastellen gerundet. v3–v5 wurden aus den v2-Glyphen plus den in den Dateien gemessenen Verschiebungen (−16, ±15) zusammengesetzt und nicht byteweise übernommen. Stichproben stimmen, ein Pixelvergleich fehlt. Ordner `01`–`04` sind identische Kopien von v1–v4.

### 18.10.2026 · Finales Logo gewählt und für Code exportiert
- **Versucht:** Lucas hat in Figma das finale Logo gewählt (Knoten `1:32`: Italiana-Schriftzug, E aus zwei 3,5-px-Linien, 0,8-px-Mittelstrich und geschwungenem Fuß, von Hand in Figma gebaut). Ziel war ein exakter, schriftunabhängiger Export für die Website.
- **Funktioniert:** Figma-Export mit Text als Pfaden. Die Linien wurden als exakte Rechtecke nachgebaut, die Farbe läuft über `currentColor`. Im Pixelvergleich gegen den Original-Export bei 8-facher Auflösung weichen 0 von 1,68 Mio. Pixeln ab. Dateien liegen in `branding/assets/logo-final/`.
- **Nicht funktioniert / offen:** Figmas `outlineStroke()` hängte die umgewandelten Striche nicht in die Gruppe, deshalb wurden sie von Hand als Rechtecke gesetzt. Die Geometrie zeigt Unregelmäßigkeiten aus Figma: E 2,07 Einheiten links der Mitte, Mittelstrich 0,35 neben der E-Mitte, Fuß links 0,5 kürzer. Sie sind bewusst nicht korrigiert, die Entscheidung liegt bei Lucas.

### 18.10.2026 · Korrigierte Kopie des finalen Logos
- **Versucht:** Auf Lucas' Wunsch eine Kopie mit exakt mittigem E, mittigem Mittelstrich und symmetrischem Fuß. Das Original bleibt erhalten.
- **Funktioniert:** Der Ausgleich läuft über den Wortabstand PM|B (+3,691). B|E und E|A sind gleich (5,102), der Fuß ist spiegelsymmetrisch mit gemittelten Figma-Kontrollpunkten. Im Browser per `getBBox` gemessen: E-Mitte = Tintenmitte = viewBox-Mitte (Abweichung 0,001). Die Datei `pm-beauty-logo-korrigiert.svg` liegt im Ordner, in Figma steht sie als Knoten `11:2` über dem Original.
- **Nicht funktioniert / offen:** Keine Blockade. Ob der minimal breitere Wortabstand sichtbar ist, muss Lucas am Bild beurteilen.

### 18.10.2026 · Logo auf der Live-Website (Kurzprojekt 2 vorgezogen)
- **Versucht:** Das korrigierte Logo kommt auf die Website. Beim Öffnen steht es groß und mittig, beim Scrollen fährt es gerade nach oben in die mittige Nav. Die Nav ist transparenter. Klickbare Texte bekommen beim Hover einen Unterstrich, der sich von der Mitte aus öffnet und danach Serifen nach unten bildet wie der Fuß des E (0,7 s). Auf Lucas' Ansage wird ab jetzt automatisch committet und gepusht.
- **Funktioniert:** Gemessen in 1280 px und 375 px: Das Logo landet exakt im Nav-Platz (Position und Breite gleich auf zwei Nachkommastellen), am Anfang ist nur das Logo zu sehen, kein horizontales Scrollen, keine Konsolenfehler. Commit `4f4bed8` ist auf GitHub.
- **Nicht funktioniert / offen:** Der Browser hielt die alte CSS im Cache, ein Neuladen ohne Cache war nötig. Auf dem Handy brach der Button um, er heißt dort jetzt „Buchen“. Auf einem echten Handy ist es nicht getestet; die einblendende Adressleiste kann die Intro-Höhe leicht verschieben. Ob `branding/` ins öffentliche Repo darf, ist weiter offen.

### 18.10.2026 · Schärfe, Nav-Linie, dünneres Logo
- **Versucht:** Lucas fand das Intro-Logo unscharf. Ursache: Es war 96 px breit gesetzt und wurde etwa 8-fach hochskaliert. Außerdem sollte die Nav-Linie erst kurz vor dem Andocken erscheinen, und es sollte eine Logo-Fassung mit dünneren senkrechten Strichen entstehen.
- **Funktioniert:** Das Logo wird jetzt groß gesetzt und nur noch verkleinert, angedockt ohne `scale()`. Commit `c4f2692`. Die Nav-Linie blendet auf den letzten 12 % des Scrollwegs ein (`1092dc6`). Das dünne Logo entsteht durch waagrechtes Verschieben der Konturpunkte nach innen, gewichtet mit Normalenrichtung und Strichbreite, sodass Kurven, Spitzen und Haarlinien bleiben. Im Browser gemessen: alle Mitten bei 136,665.
- **Nicht funktioniert / offen:** Der erste Ansatz für das dünne Logo (Flächen-Erosion mit shapely) erzeugte Zacken am M und an der A-Spitze und wurde verworfen. In Figma liegt ein fremdes Duplikat `12:2` des korrigierten Logos, das unangetastet blieb. Das dünne Logo ist noch nicht auf der Website.

### 18.10.2026 · E-Überstand kürzer, neues Logo auf der Website
- **Versucht:** Lucas wollte die E-Striche über den Buchstaben 40 % kürzer haben und dieses Logo auf der Website.
- **Funktioniert:** Der Überstand ist von 51,28 auf 30,77 Einheiten gekürzt, viewBox und Seitenverhältnis des Nav-Platzes sind angepasst. Commit `4eb2ea0` ist gepusht. Gemessen: Das Intro-Logo ist mittig, angedockt sitzt es exakt im Platz. In Figma liegt die Fassung als `16:15`.
- **Nicht funktioniert / offen:** Der erste Figma-Versuch hat die Buchstaben gestaucht: SVG-Rahmen in Figma skalieren ihren Inhalt beim Ändern der Größe. Der Knoten wurde gelöscht und neu aufgebaut, mit Constraints auf MIN vor dem Resize. Ich habe angenommen, dass die Kürzung für das dünne Logo gilt.

### 18.10.2026 · Easing für die Logo-Bewegung
- **Versucht:** Lucas wollte eine natürlichere Bewegung statt eines linearen Gleitens. Zuerst kam easeInOutCubic zum Einsatz, dazu eine leichte, bildratenunabhängige Nachführung gegen das Ruckeln der Mausrad-Rasten.
- **Funktioniert:** Gewählt ist easeInOutSine. Gemessen bewegt sich das Logo bei 10/25/50/75/90 % des Scrollwegs um 2,4/14,7/50/85,3/97,6 %. Angedockt sitzt es exakt (Abweichung 0). Commit `3a34e08`.
- **Nicht funktioniert / offen:** Cubic war zu träge: Bei 10 % Scrollweg bewegte sich das Logo nur um 0,4 %, das wirkt beim Scrollen wie „hängt“. Das Vorschaufenster liefert nur etwa 6 Bilder pro Sekunde, deshalb wurde die Kurve rechnerisch über `resize` geprüft. Wie die Nachführung sich auf einem echten Gerät mit 60/120 Hz anfühlt, ist nicht getestet.

### 18.10.2026 · Ruckeln reduziert
- **Versucht:** Lucas fand die Bewegung gut, aber leicht ruckelig. Verdächtigt waren CSS-Variablen auf `:root` in jedem Frame und `resize`-Events der mobilen Adressleiste, die das Logo mitten im Scrollen springen ließen.
- **Funktioniert:** Die Variablen stehen jetzt am Header und werden nur bei Änderung geschrieben. Gemessen sinkt die Stil-Neuberechnung von 0,65 ms auf 0,03 ms pro Frame. Die Intro-Position hängt an der stabilen Intro-Höhe (100svh), reine Höhen-Resizes werden ignoriert. Commit siehe Git-Log.
- **Nicht funktioniert / offen:** Das Ruckeln selbst lässt sich im Vorschaufenster (rund 6 fps) nicht nachstellen. Lucas hat bestätigt, dass es jetzt flüssig läuft (18.10.2026).

### 18.10.2026 · Intro entfernt
- **Versucht:** Lucas hat entschieden, dass das Logo-Intro wegfällt. Das Logo steht von Anfang an oben links in der Nav.
- **Funktioniert:** Intro-Fläche, fixiertes Logo und Scroll-JS sind entfernt. Der Header ist wieder eine einfache Sticky-Leiste: Logo links, Links mittig, Button rechts. Transparenter Hintergrund und Hover-Unterstrich bleiben. Geprüft in 1280 px und 375 px, ohne Konsolenfehler. Commit `78d4f92`.
- **Nicht funktioniert / offen:** Nichts technisch offen. Die Arbeit an Intro, Easing und Ruckel-Fix (vier Commits) steckt in der Git-Historie, falls das Intro später doch zurückkommen soll.

### 18.10.2026 · Redesign nach Referenz (Kurzprojekt 2)
- **Versucht:** Paula gefällt novafacesmunich.com. Übernommen wurden nur Layout-Muster, keine Texte: Labels mit Punkt, große Karten mit ↗, ein Bilderstreifen, Pillen-Buttons mit Pfeilkreis, eine Dropdown-Nav und ein Vollbild-Menü auf dem Handy. Die Farben blieben. Neu: Abschnitt Schulungen (Platzhaltertext auf Lucas' Wunsch), Behandlungen ohne Preise (Link zu Beautinda), echte Fotos statt Platzhalter, Hero mit Paula und links verlängerter Wand, dünne Hover-Linie ohne Serifen.
- **Funktioniert:** Vor dem Bauen wurden vier Inhaltsfragen per Fragebogen geklärt (Schulungen-Inhalt, Hero-Foto, Gutschein-Beträge, Einwilligung der Kundinnen). Mobil zuerst getestet: kein horizontales Scrollen, Menü inklusive Unterpunkten, Sprung zur Kategorie öffnet das Akkordeon. Danach Desktop mit 1440 px. Commit `4fb42aa`, Deploy bestätigt.
- **Nicht funktioniert / offen:** Die erste Bildverlängerung ergab einen harten braunen Streifen, weil unten am Bildrand Haar ist. Gelöst über den Wandton aus der oberen Bildhälfte; Lucas ersetzt das später durch ein KI-Outpainting. Ein Bug in der ersten Fassung: Das `height`-Attribut der Bilder setzte `aspect-ratio` außer Kraft, behoben mit `height:auto`. Offen: echte Inhalte für Schulungen, Stripe-Links für Gutscheine, ein Studio-Foto.

### 18.10.2026 · Schulungen ergänzt, Übergabe an Codex
- **Versucht:** Paulas zwei Kurse eingebaut: Korean Lash & Browlifting Intensiv-Schulung und Masterclass Russian Manicure & Gel, mit ihren Texten. Bilder vorläufig aus dem Studio, die Kursgrafiken bewusst noch nicht. Danach hat Lucas die Weiterarbeit an Codex übergeben.
- **Funktioniert:** Kurskarten mit Checkliste und vier Icon-Kacheln wie in Paulas Instagram-Grafiken, mobil und auf dem Desktop geprüft. Instagram-Links auf das aktive Konto `@pm_beauty___` umgestellt. Für die Übergabe: `docs/HANDOFF.md` (Stand, Aufbau, Regeln, Bildaufgaben), `AGENTS.md` als Codex-Einstieg, Originalfotos ohne Metadaten in `branding/assets/photos/originals/` und das Bildskript `make_images.py` reproduzierbar im Repo.
- **Nicht funktioniert / offen:** Zeitweise arbeiteten zwei Claude-Sessions parallel im selben Ordner (Restsession nach Neustart). Das ging ohne Konflikt, ist aber riskant, sobald Codex dazukommt. Ab jetzt sollte nur ein Agent schreiben. Offen bleiben Hero-Outpainting, Kursgrafiken, Studiofoto, Stripe-Links und die Felder in Impressum/Datenschutz.

### 18.10.2026 · Codex: Hero-Outpainting für Desktop und Handy
- **Versucht:** Paulas Originalfoto mit dem eingebauten Imagegen nach links und seitlich erweitern, damit die Schulter natürlich ausläuft; für das Handy zusätzlich Wand über dem Kopf ergänzen. Nach Lucas' Feedback die Schultern etwas schmaler und die linke Desktop-Bildhälfte dunkler machen.
- **Funktioniert:** Lucas hat die zweite Fassung zur Umsetzung freigegeben. Zwei neue JPEGs eingebunden, Originalbilder erhalten. Im Browser bei 375 px und 1440 px geprüft: passende Bildquelle geladen, kein horizontales Scrollen, keine JavaScript-Fehler; mobiles Menü und Behandlungs-Akkordeon funktionieren. Bildgenerierung ist keine pixelgenaue Erhaltung des Originalporträts.
- **Nicht funktioniert / offen:** Playwrights Standard-Browser fehlte; Prüfung mit installiertem Chrome erfolgreich. Die alten Hero-Dateien und das bisherige Bildskript bleiben erhalten; letzteres erzeugt weiterhin nur die frühere Notlösung. Prompts und neue Dateinamen stehen unter `branding/assets/photos/HERO-OUTPAINT.md`.

## Werkzeuge

Codex → Google-Fonts-Originaldatei → Python/fontTools für Schriftkonturen → eigener SVG-Pfad für das E → Sharp für die PNG-Vorschau.

## Wichtige Prompts

- Lucas beschrieb zwei hohe, oben serifenlose Außenstriche, geschwungene untere Übergänge und einen kurzen Mittelsteg mit weichem oberen Abschluss. Die beigefügte Handskizze war die Formreferenz.
- „Konstruiere außerhalb von Figma … nutze die Schrift Cormorant Unicase … in Vektor“ legte Schrift und Ausgabeweg fest.
- Das E sollte exakt mittig in der Wortmarke stehen; die Abstände der anderen Buchstaben sollten dafür angepasst werden.

## Wendepunkte

Die Originalkonturen von „AUTY“ sind zusammen breiter als „PM B“. Die exakte Zentrierung erfolgt deshalb über großzügigere Abstände links, ohne die Buchstaben zu verzerren. Die Konstruktion bleibt anhand eines Skripts und der gespeicherten Maße nachvollziehbar.

## Fazit

Präzise Vektorkonstruktion eignet sich für dieses klar beschriebene Zeichen. Die Form und Abstände können gezielt verändert werden. Ob die geometrische Mitte auch die gewünschte Ruhe vermittelt, muss am Entwurf beurteilt werden; eine Freigabe liegt noch nicht vor.
