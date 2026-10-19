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

### 18.10.2026 · Codex: Mehr Kopffreiheit im Desktop-Hero
- **Versucht:** Den Desktop-Hero nach oben erweitern, weil die Navigation Paulas Haare verdeckte.
- **Funktioniert:** Neue Bildfassung v3 mit zusätzlicher Taupe-Wand oben eingebunden und Desktop-Bildausschnitt oben ausgerichtet; CSS-Cache-Version auf 16 erhöht. Bei 375, 1024, 1440 und 1920 px geprüft: korrekte Bildquelle, kein horizontales Scrollen und keine JavaScript-Fehler. Desktop-Screenshots bei 1024 und 1920 px visuell geprüft, Kopf unterhalb der Navigation sichtbar. Handy-Bild unverändert.
- **Nicht funktioniert / offen:** Keine technische Blockade; frühere Bildfassungen bleiben erhalten.

### 18.10.2026 · Codex: Exakte Handy-Bildvorlage übernommen
- **Versucht:** Lucas' hochgeladenes JPEG unverändert als mobiles Hero-Bild verwenden und dessen Seitenverhältnis erhalten.
- **Funktioniert:** Datei bytegleich kopiert (1148 × 1795), feste 4:5-Beschneidung entfernt und CSS-Version auf 17 erhöht. Bei 375 px beträgt die Bildfläche 375 × 586,34 px entsprechend dem Originalverhältnis. Mobil und bei 1440 px korrekte Bildquelle, keine JavaScript-Fehler und kein horizontales Scrollen; mobilen Screenshot angesehen. Desktop verwendet weiterhin v3.
- **Nicht funktioniert / offen:** Keine technische Blockade.

### 18.10.2026 · Codex: Desktop-Framing korrigiert und Reload-Sprung behoben
- **Versucht:** Auf Lucas' Korrektur die übertriebene obere Erweiterung zurücknehmen und verhindern, dass Neuladen zum Schulungsbereich springt.
- **Funktioniert:** Desktop verwendet wieder v2, beginnt direkt unter der 72-px-Navigation und erhält ausreichend Höhe für das vollständige Bild ohne vertikalen Beschnitt. Mobiles Bild bleibt unverändert. Reload-Fehler im Browser reproduziert: nach Schulungslink bei y=3588 statt 0. Frühes Entfernen des URL-Ankers plus Scroll-Reset im ersten Frame nach pageshow behebt den Sprung. Bei 375, 1440 und 1920 px geprüft: Reload nach Anker und nach manuellem Scrollen landet oben, direkte Abschnittslinks funktionieren weiterhin, keine JavaScript-Fehler. Desktop-Framing bei 1920 px visuell geprüft; kein zusätzlicher vertikaler Beschnitt. CSS-Version 18.
- **Nicht funktioniert / offen:** Die vorherige v3-Erweiterung war gestalterisch übertrieben. Ein Reset direkt im pageshow-Handler wurde von der nachfolgenden Browser-Wiederherstellung überschrieben; Ausführung per requestAnimationFrame löst dies in den geprüften Chrome-Fällen.

### 18.10.2026 · Codex: Drei Bereichs-Karten entfernt
- **Versucht:** Auf Lucas' Wunsch die drei Übersichtskarten für Behandlungen, Schulungen und Gutscheine entfernen.
- **Funktioniert:** Den Kartenabschnitt vollständig aus dem HTML entfernt. Die eigentlichen Inhaltsbereiche und Navigationslinks bleiben erhalten. Mobil und Desktop geprüft: keine Bereichskarten mehr, Ergebnisse gehen direkt in den Über-Paula-Abschnitt über, kein horizontales Scrollen und keine JavaScript-Fehler.
- **Nicht funktioniert / offen:** Keine technische Blockade.

### 18.10.2026 · Nav-Feinschliff nach Codex-Session (Claude)
- **Versucht:** Lucas arbeitete zwischendurch in Codex weiter (Hero-Outpainting, Übersichtskarten entfernt, aufklappbare Kurskarten auf dem Handy). Danach meldete er: Instagram-Button und Buchungspfeil in der Desktop-Nav sitzen nicht mittig. Außerdem sollte der Kreis hinter den Pfeilen in allen Buttons weg.
- **Funktioniert:** Gemessen statt geschätzt. Vertikal lag alles exakt auf der Leistenmitte. Das Instagram-Icon saß aber 1 px vom linken und 23 px vom rechten Kreisrand entfernt. Ursache war die eigene Regel `.hide-mobile{display:inline-flex}`, die das Grid des Kreises überschrieb; sie blendet jetzt nur noch aus. Die Pfeile stehen ohne Kreis in Textfarbe (weiß auf dunklen Buttons) mit symmetrischem Innenabstand. Codex' noch nicht committete Kurskarten wurden auf Lucas' Ansage mit übernommen.
- **Nicht funktioniert / offen:** Zwei Werkzeuge (Codex und Claude) schrieben zeitweise in dieselben Dateien. Vor dem Bearbeiten wurde deshalb geprüft, ob Codex noch aktiv ist, und Lucas gefragt. Auf hellen Buttons ist der Pfeil dunkel statt weiß, weil Weiß dort nicht sichtbar wäre.

### 18.10.2026 · Mobiler Hero: Nav-Transparenz, Infos aufs Bild, schwarze Knöpfe
- **Versucht:** Auf dem Handy sollte die Nav-Leiste über dem Hero-Bild gleichmäßig transparent sein und erst danach oben deckend werden. Außerdem: „Top Rated auf Beautinda" entfernen, Bewertung und Öffnungszeiten als reinen Text oben rechts aufs Bild setzen, beide Hero-Knöpfe schwarz machen.
- **Funktioniert:** Ein IntersectionObserver auf das Hero-Bild setzt am Header die Klasse `over-hero`; der Verlauf greift nur ohne diese Klasse. Für die Textfarbe auf dem Bild wurde vorher der Bildton oben rechts gemessen (#715e50): heller Text kommt auf 6,2:1, dunkler nur auf 2,8:1, also Creme mit leichtem Schatten. Am Desktop bleiben die zwei Badges unter den Knöpfen.
- **Nicht funktioniert / offen:** Die Pfeilkreise, die Lucas erneut ansprach, waren bereits seit `c87f54f` entfernt. Vermutlich sah sein Handy eine zwischengespeicherte Version. Auf einem echten Handy ist das noch nicht getestet.

### 18.10.2026 · Weißer Hero-Text am Desktop, Akkordeon gleitet in die Mitte
- **Versucht:** Am Desktop sollte der Text auf dem Hero-Bild weiß sein, der Hintergrund dafür minimal dunkler. Eine geöffnete Behandlungs-Kategorie sollte weich in die Bildschirmmitte gleiten; Kategorien, die länger als der Bildschirm sind, sollten oben anfangen.
- **Funktioniert:** Vorher den Kontrast gerechnet. Weiß auf dem Taupe kommt nur auf 2,6:1; „minimal" abdunkeln (15 %) reicht für die Überschrift, nicht für den Absatz. Deshalb wird nur die linke Seite hinter dem Text um rund 28 % abgedunkelt, das läuft zu Paula hin auf 0 aus. Akkordeon: Nach dem Öffnen wartet das Skript zwei Frames (bis die andere Kategorie zu ist) und scrollt dann weich. Gemessen am Desktop: Augenbrauen 230/230 px Abstand, Permanent Make-up 70/70 px, Maniküre (länger als der Bildschirm) 16 px unter der Leiste. Am Handy gleich.
- **Nicht funktioniert / offen:** Das bisherige „automatische Scrollen" war kein Code, sondern der Browser, der beim Schließen der vorherigen Kategorie die Seite nachzieht. Der Absatz im Hero liegt mit Weiß knapp unter dem WCAG-Wert für Fließtext. Echte Gerätetests stehen aus.

### 18.10.2026 · Mehr Luft mobil, Umbruch in Kategorien, Behandlungen pink
- **Versucht:** Auf dem Handy mehr Abstand zwischen den Abschnitten. Kategorie-Titel wie „Wimpernbehandlungen" sollen nicht mehr mit „7 Leistungen" überlappen, sondern umbrechen. Der Behandlungen-Bereich bekommt dasselbe Pink wie die Bewertungen.
- **Funktioniert:** Abschnitte auf dem Handy 104 statt 72 px oben und unten. Titel mit `hyphens:auto` (Seite ist `lang="de"`) und `overflow-wrap:anywhere` als Rückfall. Getestet im Extremfall (340 px Breite, vergrößerte Schrift): sauberer Umbruch mit Bindestrich, keine Überlappung. Hintergrund #EFD9D6.
- **Nicht funktioniert / offen:** In Chrome ließ sich die Überlappung bei 375 und 430 px nicht nachstellen. Vermutlich tritt sie nur in Safari auf Lucas' iPhone auf, das Schrift und Breite etwas anders rechnet. Dort ist der Fix noch nicht geprüft.

### 18.10.2026 · Akkordeon-Scroll repariert, Linie mobil, Kurskarten mit Bild
- **Versucht:** Lucas meldete: Öffnet man unten eine Kategorie, scrollt die Seite hoch statt nach unten. Die Scroll-Animation sollte halb so schnell sein. Auf dem Handy blieb die Linie unter der Kategorie nach dem Schließen stehen. Bei den Schulungen sollte mobil im eingeklappten Zustand Bild, Titel und die drei Badges zu sehen sein, mit dem Bild oben.
- **Funktioniert:** Den Fehler zuerst nachgestellt: War oben eine lange Kategorie offen, schloss sie sich beim Klick, und der angeklickte Titel sprang von 500 auf −972 px aus dem Bild. Jetzt wird der Titel nach dem Schließen an seiner Stelle gehalten, danach gleitet die Seite in einer eigenen Animation (etwa 0,9 s statt rund 0,4 s, easeInOutCubic, abbrechbar durch Scrollen). Messung: Titel bleibt bei 500 px und gleitet nach unten in die Mitte (163/162 px). Die Linie hing an einem auf Touch „klebenden" Hover; Hover gilt jetzt nur bei `hover:hover`, auf Touch hängt die Linie am Zustand „offen", mit doppelter Dauer. Kurskarten: Das Bild steht mobil oben und bleibt sichtbar, nur der Inhalt klappt.
- **Nicht funktioniert / offen:** Wie sich 0,9 s auf dem echten Gerät anfühlen, ist nicht geprüft; das Vorschaufenster läuft mit wenigen Bildern pro Sekunde.

### 18.10.2026 · Akkordeon-Gleiten ohne Ruckeln (FLIP statt JS-Scroll)
- **Versucht:** Lucas: Das Gleiten zur geöffneten Kategorie funktioniert, ruckelt aber stark. Ursache war der eigene Ansatz: Scrollen per JavaScript in jedem Frame läuft auf dem Haupt-Thread und konkurriert in Safari mit dem Neuzeichnen der Nav-Leiste mit Weichzeichner.
- **Funktioniert:** Umbau auf FLIP. Die Seite springt sofort an die Zielposition, `<main>` wird per `translate3d` an die alte Lage geschoben und gleitet per CSS-Transition (0,9 s) zurück. Das rechnet die GPU. Header und Menü liegen außerhalb von `<main>` und bleiben unberührt. Eine laufende Bewegung wird vor jeder neuen Messung beendet, damit Mehrfachklicks nicht falsch landen. Gemessen: Titel 500 → 466 → 281 → 236 px, Ende mittig (163/162 px), danach ist der Transform entfernt.
- **Nicht funktioniert / offen:** Lucas hat bestätigt, dass es auf dem iPhone jetzt flüssig läuft (18.10.2026). Scrollt man während der Bewegung selbst, springt der Inhalt sofort ans Ziel.

### 18.10.2026 · Kategorien klappen animiert auf, Hero mobil schmaler
- **Versucht:** Das Öffnen und Schließen der Behandlungs-Kategorien sollte nicht mehr sofort passieren, sondern Zeit brauchen. Außerdem sollte das Hero-Bild auf dem Handy links und rechts um je 10 % beschnitten werden.
- **Funktioniert:** Der Inhalt jeder Kategorie steckt jetzt in einem eigenen Panel. Die Höhe wird per Web Animations API animiert: Öffnen 0,5 s, Schließen 0,4 s, mit Einblenden. Gleichzeitig läuft das GPU-Gleiten der Seite, das Ziel wird vor dem Start im Endzustand gemessen. Liegt eine offene Kategorie über der angeklickten, schließt sie sofort, damit der Titel nicht wegrutscht; liegt sie darunter, schrumpft sie sichtbar. Messung: Öffnen 20 → 606 → 781 px, Wechsel mit Titel fest bei 500 px und Ende mittig (163/162 px), Schließen mit Linie, die beim Schrumpfen verschwindet. Hero mobil per `aspect-ratio:918/1795`: genau 10,0 % pro Seite weg.
- **Nicht funktioniert / offen:** Höhen-Animationen laufen technisch nie auf der GPU, sind bei kurzen Listen aber unkritisch. Das schmalere Hero-Bild ist auf dem Handy 733 statt 586 px hoch, die Überschrift liegt dadurch unter dem ersten Bildschirm.

### 18.10.2026 · Neues Foto von Paula im „Über mich", „Qualität." weiß
- **Versucht:** Lucas lieferte ein Foto von Paula im Studio (schwarzer Blazer, Handschuhe) für den Abschnitt „Hey, ich bin Paula". Außerdem sollte „Qualität." im Desktop-Hero weiß statt beige sein.
- **Funktioniert:** Foto als `images/paula-studio.jpg` (43 KB), Original in `branding/assets/photos/originals/`. Es ersetzt die zwei Behandlungsfotos: am Desktop max. 460 px breit, auf dem Handy volle Breite. Akzentwort jetzt in derselben Weißstufe wie die Überschrift.
- **Nicht funktioniert / offen:** Das Foto hat nur 675 × 925 px. Auf Retina-Desktops (doppelte Pixeldichte, ~920 px nötig) wirkt es leicht weich. Eine größere Version wäre besser.

### 18.10.2026 · Hero mobil nur 5 % Beschnitt
- **Versucht:** Lucas wollte den seitlichen Beschnitt des Hero-Bilds auf dem Handy von 10 % auf 5 % pro Seite verringern.
- **Funktioniert:** `aspect-ratio:1033/1795`, gemessen 5,0 % pro Seite. Das Bild ist bei 375 px Breite jetzt 652 statt 733 px hoch.
- **Nicht funktioniert / offen:** Nichts.

### 18.10.2026 · Lokaler Server fürs Handy, Wechsel auf Cloud-Workflow
- **Versucht:** Der lokale Server war vom Handy aus nicht mehr erreichbar. Er war im Benutzerordner statt im Repo gestartet, und Safari erreichte `localhost:8080` nicht. Der Pfad `~/Paula_Webseite` existiert auf Lucas' Mac nicht, deshalb schlug der `cd` fehl.
- **Funktioniert:** In der Cloud geprüft: Die Seite selbst hat bei 375, 430 und 1440 px keine Konsolenfehler und kein horizontales Scrollen. Lucas hat entschieden, ab jetzt in der Cloud-Sitzung zu arbeiten, direkt auf `main` zu pushen und Änderungen nach dem Pages-Deploy auf der Live-Seite zu prüfen.
- **Nicht funktioniert / offen:** Der lokale Server ist nicht repariert. Nächste Schritte dafür: das Repo per `find` finden, den Server dort starten und `127.0.0.1` statt `localhost` öffnen.

### 18.10.2026 · Hover-Linie nur unter dem Kategorienamen, „Behandlungen“ in der Nav klickbar
- **Versucht:** Lucas fiel auf, dass die Hover-Linie unter einer Behandlungskategorie über die ganze Zeile lief statt nur unter dem Namen. Außerdem sollte ein Klick auf „Behandlungen“ in der Kopfzeile zum Behandlungsabschnitt springen. Die Unterkategorien im Dropdown sollen wie bisher auswählbar bleiben.
- **Funktioniert:** Die Überschrift dehnt sich nicht mehr über die Zeile (`flex:0 1 auto`), deshalb ist die Linie so breit wie der Text. Gemessen sind es 356 px bei „Gesichts- & Körperbehandlungen“ statt der vollen Zeile, Zähler und Plus bleiben rechts. In der Nav öffnet Hover die Liste wie bisher, ein Klick springt zum Abschnitt. Per Tastatur öffnet der erste Klick die Liste, der zweite springt. Die Unterkategorien öffnen weiter ihre Kategorie. Geprüft bei 375, 430 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Nichts.

### 18.10.2026 · Instagram-Knopf dunkel, Auszeichnungen unter dem Hero
- **Versucht:** Der Instagram-Knopf in der Kopfzeile soll dieselbe Farbe haben wie „Termin buchen“. Unter dem Hero sollen etwa vier kleine Auszeichnungs-Badges stehen, angelehnt an Lucas' Screenshot mit Lorbeerkränzen.
- **Funktioniert:** Der Instagram-Knopf ist dunkel mit hellem Symbol (`.icon-btn-primary`). Die Lorbeerkränze sind per Python als ein SVG-Symbol erzeugt (Blätter entlang eines Kreisbogens, gespiegelt, Stern unten) und in Akzentfarbe gesetzt. Es gibt vier Badges: 5.0 ★ auf Beautinda, 26 Bewertungen, Top Rated · Beautinda, 38 Behandlungen (nachgezählt in der Leistungsliste). Auf dem Handy stehen sie 2 × 2, auf dem Desktop in einer Reihe. Geprüft bei 375, 430 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Lucas' Beispiele „10 Jahre Erfahrung“ und „Anzahl Zertifikate“ sind nicht eingebaut. Dafür gibt es keine belegten Zahlen. Wenn Paula sie nennt, können sie zwei der Badges ersetzen. Beim ersten Entwurf waren die Blätter schwarz, weil `fill` fehlte.

### 18.10.2026 · „Arbeiten aus dem Studio“ als Collage, Regel für Stockfotos
- **Versucht:** Lucas wollte „Arbeiten aus dem Studio“ auf dem Desktop als Collage in zwei Reihen statt als Scroll-Streifen, mit etwa acht Bildern. Fehlende Bilder sollen ab jetzt durch kostenlose Stockfotos als Platzhalter ersetzt werden.
- **Funktioniert:** Ab 900 px ist die Fläche ein Raster mit 4 × 2 Feldern. Das erste und das letzte Foto gehen hoch über beide Reihen, die vier anderen füllen die Mitte. So füllen die 6 echten Fotos die Fläche ohne Lücke. Auf dem Handy bleibt der Wischstreifen. Die Stockfoto-Regel steht in `docs/HANDOFF.md`: Quelle und Lizenz festhalten, Stockfotos nie als Paulas Arbeit ausgeben. Geprüft bei 375, 430, 1024 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Die Netzwerk-Policy der Cloud-Umgebung sperrt Unsplash, Pexels und Pixabay, daher sind noch keine Stockfotos eingebaut. Sobald die Hosts freigegeben sind, kann die Collage auf 8 Bilder gehen.

### 18.10.2026 · Drei Auszeichnungen, Hero ohne Labels, Öffnungszeiten bei den Behandlungen
- **Versucht:** Lucas hat die Zahlen für die Auszeichnungen genannt: 5 Jahre Erfahrung, 5-Sterne-Bewertungen, 4 Weiterbildungen. Es sollen nur diese drei Badges sein. Die Labels „5.0 ★ 26 Bewertungen“ und „Mo–Fr · 10–20 Uhr“ im Hero sollen weg, die Öffnungszeiten stattdessen in die Kopfzeile der Behandlungen.
- **Funktioniert:** Die drei Badges stehen auf allen Breiten in einer Reihe. Auf dem Handy sind die Unterzeilen normal geschrieben (nicht in Großbuchstaben) und kleiner, „Weiter-bildungen“ wird per weichem Trennstrich umbrochen, damit nichts in die Blätter läuft. Die Hero-Labels sind samt CSS entfernt (Handy-Text oben rechts im Bild, Desktop-Badges). Die Kopfzeile der Behandlungen lautet jetzt „Behandlungen · Mo–Fr 10–20 Uhr“. Geprüft bei 375, 430 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Der erste Handy-Entwurf mit Großbuchstaben ragte in die Blätter. Außerdem stand die Desktop-Regel vor der Basisregel und wurde von ihr überschrieben. Beides ist behoben.

### 18.10.2026 · Schulungen klappen mobil animiert auf
- **Versucht:** Auf dem Handy sollen die zwei Schulungskarten nicht mehr sofort auf- und zuspringen, sondern dieselbe Animation haben wie die Behandlungskategorien. Lucas' Idee, die Gutscheine mobil zu versetzen, hat er wieder verworfen.
- **Funktioniert:** Der Karteninhalt animiert Höhe, Innenabstand und Deckkraft per Web Animations API, mit derselben Dauer und Kurve wie die Kategorien (500 ms auf, 400 ms zu). Gemessen bei 375 px: Die Höhe wächst in etwa 500 ms von 0 auf 783 px und fällt in etwa 300 ms auf 0. Schnelles Doppeltippen endet sauber geschlossen. Am Desktop bleibt alles sichtbar. Keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Die Seite gleitet beim Öffnen einer Schulung nicht mit, wie sie es bei den Kategorien tut. Das war nicht verlangt.

### 18.10.2026 · Schulungskarten als zwei Rahmen, brauner DM-Knopf
- **Versucht:** Lucas wollte die Kurskarten wie auf der Referenz (NovaFaces, Korean Lashlift): Bild und Text als zwei eigene abgerundete Rahmen dicht nebeneinander statt einer Karte. Die Abschnitte „Das erwartet dich“ und „Was dich erwartet“ sollen weg. „Per DM anfragen“ soll bräunlich sein wie dort, aber ohne Kreis um den Pfeil. Bild links und rechts im Wechsel bleibt.
- **Funktioniert:** Die Karte selbst hat keinen Hintergrund mehr. Das Bild ist ein eigener Rahmen, Überschrift und Inhalt bilden zusammen den zweiten (oben bzw. unten abgerundet, aufgeklappt mobil ohne Naht). Abstand am Desktop 10 px, am Handy 8 px. Die Checklisten sind samt CSS entfernt. Der neue `.btn-brown` nutzt die Akzentfarbe `#8A6D57` mit weißer Schrift, beim Hover `#74594a`. Geprüft bei 375, 430 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Nichts.

### 18.10.2026 · Panel-Look für „Über mich“ und Kontakt
- **Versucht:** Lucas möchte die ganze Seite mehr im Panel-Look wie NovaFaces: abgerundete Flächen dicht nebeneinander. Konkret sollen „Besuch mich im Studio“ und „Öffnungszeiten“ zwei Panels nebeneinander werden, die Öffnungszeiten etwas dunkler. Dasselbe gilt für „Über mich & Studio“.
- **Funktioniert:** In „Über mich“ sind Foto und Text je ein eigenes abgerundetes Panel. Am Desktop füllt das Foto die volle Höhe neben dem Textpanel. Im Kontakt ist der linke Block ein Panel in `--color-surface`, die Öffnungszeiten liegen in einem dunkleren Panel (`#DED5C8`, Trennlinien `#CBBFAF`). Abstand 10 px am Desktop, 8 px am Handy, wie bei den Schulungen. Geprüft bei 375, 430 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Weitere Abschnitte (Gutscheine, Bewertungen) könnten denselben Look bekommen. Noch nicht umgesetzt.

### 18.10.2026 · Mehr Luft zwischen den Leistungen
- **Versucht:** In einer aufgeklappten Kategorie standen die Leistungen zu dicht, viel Text auf wenig Fläche. Lucas wollte etwa 30 % mehr Abstand.
- **Funktioniert:** Der Innenabstand pro Leistung ist von 14 auf 18 px oben und unten gestiegen. Der Abstand zwischen zwei Leistungen wächst damit von 28 auf 36 px (+29 %). Keine Konsolenfehler, kein horizontales Scrollen bei 375, 430 und 1440 px.
- **Nicht funktioniert / offen:** Nichts.

### 18.10.2026 · Styleguide-Seite
- **Versucht:** Lucas' Aufgabenstellung verlangt neben der Website eine eigene Styleguide-Seite für die Marke: Logo, Farben, Schrift, Bausteine und Arbeitsweise. Das alte `docs/design.html` war veraltet (andere Radien, Space Mono auf Buttons).
- **Funktioniert:** Die neue Seite `styleguide.html` liegt im Repo-Root und ist live erreichbar. Sie lädt dieselbe `css/style.css` wie die Website, deshalb sind alle Farben, Buttons, Badges, Panels, Lorbeer-Badges und das Akkordeon echte Bausteine und keine Nachbauten. Kapitel: Marke, Logo (hell/dunkel, Größen, Schutzzone, Regeln), Farben (12 Töne mit Einsatz und Kontrastwerten nach WCAG), Schrift, Abstände und Radien, Komponenten, Bewegung (Dauern und Kurve), Bildsprache, Sprache, Verfahren. Logo und Lorbeer sind aus `index.html` übernommen. Die Seite ist auf `noindex` gesetzt. Geprüft bei 375 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Die Kontrastprüfung ergab: Muted `#75695C` auf Surface `#EAE3D8` hat nur 4,2 : 1 und liegt damit knapp unter AA für kleinen Text. Das steht als Hinweis im Styleguide. `docs/design.md` und `docs/design.html` sind weiterhin veraltet.

### 18.10.2026 · Handy: weniger Rundung, Schulung wieder eine Karte, Teilwertungen raus
- **Versucht:** Auf dem Handy sollten die Rahmen von Panels und Fotos etwa 30 % weniger rund sein. Die Schulungen sollen dort wieder eine einzige Karte sein (Bild nicht separat). Unter Bewertungen sollen Service, Sauberkeit und Pünktlichkeit weg.
- **Funktioniert:** Unter 900 px gilt `--rounded-xl` 22 statt 32 px und `--rounded-lg` 17 statt 24 px. Buttons, Badges und Kacheln bleiben unverändert. Die Schulungskarte ist mobil wieder eine Fläche mit Bild oben, am Desktop bleiben es zwei Rahmen. Die drei Teilwertungs-Badges sind entfernt, „5.0 · 26 Bewertungen auf Beautinda“ bleibt. Geprüft bei 375, 430 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Nichts.

### 18.10.2026 · Handy: Foto im Rahmen bei „Über mich“ und den Schulungen
- **Versucht:** Lucas wollte auf dem Handy „Über mich & Studio“ als einen einzigen Rahmen, in dem das Foto mit etwas Abstand sitzt (Referenzbild), und zwar von Rand zu Rand ohne seitlichen Abstand. Die Schulungskarten sollen dasselbe Prinzip bekommen, aber in der bisherigen Breite: das Foto mit kleinem Abstand links, rechts und oben, alle Ecken rund.
- **Funktioniert:** Unter 900 px ist `.about-grid` selbst die Fläche (ohne Container-Rand, Radius 22 px). Das Foto sitzt 10 px eingerückt mit 12 px Radius, also Außenradius minus Abstand, damit die Rundungen parallel laufen. Bei den Schulungen hat das Foto oben, links und rechts 10 px Abstand und ebenfalls 12 px Radius. Am Desktop bleibt alles wie vorher. Geprüft bei 375, 430 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen. Der Styleguide ist nachgezogen.
- **Nicht funktioniert / offen:** Nichts.

### 18.10.2026 · Schulungs-Kacheln nur mit Kontur
- **Versucht:** Die vier hellen Kacheln in den Schulungskarten (Ratenzahlung, Zertifikat, Starterpaket, Betreuung) sollen keine eigene helle Fläche mehr haben, sondern nur eine dünne Kontur in der Farbe der Karte.
- **Funktioniert:** Die Kacheln sind transparent mit 1 px Kontur `#CBBFAF`, dem gleichen Ton wie die Trennlinien der Öffnungszeiten. Die Fläche hat damit die Kartenfarbe. Geprüft bei 375 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Nichts.

### 18.10.2026 · Schulungen per Tipp auf den Namen aufklappen
- **Versucht:** Auf dem Handy sollen sich die Schulungskarten auch öffnen, wenn man auf den Namen tippt, nicht nur über den Pfeil-Knopf rechts. So funktionieren auch die Behandlungskategorien.
- **Funktioniert:** Der ganze Kopf der Karte (Badges und Titel) löst jetzt denselben Knopf aus, mit derselben Animation. Ein Tipp auf den Pfeil selbst wird nicht doppelt gezählt. Am Desktop passiert nichts, dort sind die Karten immer offen. Getestet bei 375 und 430 px mit Touch: Titel öffnet, Badge schließt, Pfeil öffnet und schließt. Keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Nichts.

### 18.10.2026 · Gutscheine: Bestseller, Geschenk-Icon, Drift am Desktop, versetzt am Handy
- **Versucht:** Lucas wollte die 100-€-Karte etwa 30 % größer als die beiden anderen, mit dem Label „Bestseller“ statt „Gutschein“. Bei 50 € und 150 € soll das Label wegfallen, und auf alle Karten kommt ein Geschenk-Icon. Am Desktop sollen die Karten beim Erreichen des Abschnitts leicht senkrecht auseinanderdriften und beim Weiterscrollen wieder zusammen, ausgelöst durch das Erreichen und nicht an den Scrollweg gekoppelt. Am Handy sollen die Karten schmaler und versetzt stehen (links, rechts, links), 100 € etwas größer.
- **Funktioniert:** Das Geschenk-Icon ist selbst gezeichnet, im Stil der anderen Linien-Icons (1,3 px, Accent), weil Icon-Seiten aus der Cloud nicht erreichbar sind. Das Bestseller-Badge ist eine Pille in Accent mit weißer Schrift. Am Desktop sind die Spalten im Verhältnis 1 : 1,3 : 1, Beträge 2,6 rem und 3,4 rem. Ein IntersectionObserver (40 % sichtbar) setzt `.spread`: Die äußeren Karten sinken 36 px, die mittlere steigt 14 px, in 1,4 s über die CSS-Eigenschaft `translate`. So kommt sich die Bewegung nicht mit dem Einblenden (`transform`) in die Quere. Am Handy sind die Karten 80 % breit, 100 € ist 90 % breit und steht rechts. Gemessen bei 1440 px: drin `36 / −14 / 36 px`, nach dem Wegscrollen wieder 0. Bei 375, 430 und 1440 px keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Lucas' Nachricht brach ab bei „dass der 100-Euro-Ding ein bisschen …“. Ich habe „etwas größer“ angenommen. Am Handy gibt es keinen Drift.

### 18.10.2026 · Studio-Collage versetzt wie die Referenz, Zoom beim Hover
- **Versucht:** Die Collage „Arbeiten aus dem Studio“ soll am Desktop versetzt angeordnet sein wie auf Lucas' Referenzbild (NovaFaces: vier Spalten, hohe und kurze Bilder im Wechsel, rechts unten Luft). Beim Hover mit der Maus soll das Bild im Rahmen leicht hineinzoomen, ohne dass sich der Rahmen bewegt.
- **Funktioniert:** Das Raster hat 4 Spalten und 10 Zeilen-Einheiten mit 10 px Abstand. Spalte 1 ist ein hohes Bild über die volle Höhe, Spalte 2 hoch und darunter kurz, Spalte 3 kurz und darunter hoch, Spalte 4 hoch mit Luft darunter. Die Referenz hat 7 Bilder, es gibt aber nur 6 echte, deshalb ist Spalte 1 ein einziges Bild statt zwei. Der Radius sitzt jetzt am Rahmen (`figure`, `overflow:hidden`), das Bild skaliert beim Hover in 0,8 s auf 106 %. Gemessen bei 1024 und 1440 px: Rahmen unverändert, Bild `scale(1.06)`. Zoom nur bei Geräten mit Maus, bei „Bewegung reduzieren“ ohne Übergang. Am Handy bleibt der Wischstreifen. Keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Mit einem 7. Foto ließe sich die Referenz genau nachbauen (Spalte 1 kurz und hoch).

### 18.10.2026 · Pinker Glow hinter dem Mauszeiger
- **Versucht:** Lucas wollte einen Effekt wie auf yedeni.com/en/contact: Ein leichter farbiger Schein folgt der Maus, bei uns in Pink. Die Seite war aus der Cloud nicht erreichbar (DNS gesperrt), der Code konnte also nicht gelesen werden. Der Effekt ist nach der üblichen Technik nachgebaut.
- **Funktioniert:** Ein fixierter Kreis (520 px, radialer Verlauf in Pink `#D9A8A4`, nach außen transparent) folgt der Maus. Er läuft per `requestAnimationFrame` mit 12 % des Restwegs pro Frame nach und wirkt dadurch weich. Er erscheint erst bei der ersten Mausbewegung und blendet aus, wenn die Maus das Fenster verlässt. Nur bei Geräten mit Maus (`hover: hover` und `pointer: fine`), nicht bei „Bewegung reduzieren“, nicht auf dem Handy. Gemessen: Nach der Bewegung hängt der Kreis etwa 67 px hinterher und sitzt nach rund 1 s genau unter der Maus.
- **Nicht funktioniert / offen:** Hinter dem Inhalt (`z-index:-1`) war der Glow kaum zu sehen, weil fast die ganze Fläche aus Panels besteht. Jetzt liegt er als Tönung darüber (`mix-blend-mode:multiply`, unter dem Header): Helle Flächen werden zart pink, Text bleibt dunkel. Fotos werden dabei ebenfalls leicht getönt.

### 18.10.2026 · Pinker Glow wieder entfernt
- **Versucht:** Lucas hat den Glow live angesehen und will ihn nicht.
- **Funktioniert:** Element, CSS, JavaScript und die Zeile im Styleguide sind entfernt. Der Eintrag oben bleibt als Dokumentation stehen.
- **Nicht funktioniert / offen:** Nichts.

### 19.10.2026 · Codex · Italiana, zwei Farbwelten und Farbregler
- **Versucht:** Lucas wollte Italiana für wichtige Überschriften, unveränderten Fließtext, ruhige Braun- und Pink-Paletten nach den NovaFaces-Screenshots sowie feine, leicht kontrastierende Rahmen. Getrennte Regler sollten Farben, Helligkeit und Deckkraft direkt auf der Seite abstimmen lassen.
- **Funktioniert:** Italiana lokal eingebunden, Instrument Sans für Fließtext und Bedienelemente erhalten. Vollständige Farbrollen je Palette ersetzen verstreute Einzelwerte, einschließlich Header, Buttons und Hover. Panels und Bildrahmen erhalten 1-px-Konturen. Unter `?tune=1` gibt es je sieben Regler mit lokaler Speicherung, Reset und CSS-Export; der Styleguide verlinkt darauf. Bei 375 und 1440 px kein horizontales Scrollen. Mobiles Menü, Behandlungs-Akkordeon, Kurs-Toggle, getrennte Farbänderung, Speicherung nach Neuladen, Export und Reset im Browser geprüft. Standard-Buttonkontraste rechnerisch 4,67:1 (Braun) und 5,23:1 (Pink). Keine Browserfehler beim Desktop-Test.
- **Nicht funktioniert / offen:** Reglerwerte sind eine persönliche Vorschau; Änderungen werden erst durch Übernahme des Exports und ein Deployment öffentlich. Stark aufgehellte individuelle Einstellungen können den Textkontrast verringern. Die eigene Vorschau ist kein Ersatz für Paulas gestalterische Freigabe.

### 19.10.2026 · Codex · Dezenter Maus-Glow im Panel-Hintergrund
- **Versucht:** Lucas wollte auf Desktop eine kleine, etwas dunklere Farbabweichung hinter der Maus, innerhalb der Inhalts-Panels und auf derselben Ebene wie deren Hintergrundfarbe. Bilder und Schrift sollen nicht überlagert werden.
- **Funktioniert:** Radialer CSS-Hintergrund mit 190 px Radius, maximal 10 % Deckkraft und dem jeweiligen Braun-/Pink-Farbton. Die Hintergrundebene liegt von selbst unter allen Inhalten und wird an den abgerundeten Panelrändern begrenzt. Nur das innerste Panel reagiert; Kurskopf und Kursinhalt erhalten gemeinsame Mauskoordinaten. Positionsupdates werden pro Animationsframe gebündelt. Im Desktop-Browser beide Farbwelten und unveränderte Schriftfarbe geprüft; beim Verlassen verschwindet der Effekt. Bei 375 px kein Glow und kein horizontales Scrollen, keine Browserfehler. Styleguide und Cache-Versionen aktualisiert.
- **Nicht funktioniert / offen:** Keine technischen Blocker. Die dezente Stärke ist eine gestalterische Ausgangseinstellung für Lucas' Beurteilung. Auf Touch-Geräten und bei reduzierter Bewegung bleibt der Effekt aus.

### 19.10.2026 · Codex · Lucas’ exportierte Farbwerte übernommen
- **Versucht:** Die von Lucas übermittelten 14 Reglerwerte exakt als öffentliche Standardpalette setzen.
- **Funktioniert:** Braun und Pink ohne weitere gestalterische Änderungen übernommen. Styleguide, Panel-Glow und Buttons verwenden dieselben Farbvariablen; Browser-Themefarbe und CSS-Cacheversion aktualisiert. Alle 14 Quellwerte auf exakte Übereinstimmung geprüft.
- **Nicht funktioniert / offen:** Nichts. Gespeicherte persönliche Regler-Vorschauen bleiben erhalten; „Zurücksetzen“ lädt die neuen veröffentlichten Standardwerte.

### 19.10.2026 · Farbregler entfernt
- **Versucht:** Lucas hat seine endgültigen Farbwerte geschickt und wollte, dass der Regler danach verschwindet.
- **Funktioniert:** Alle 14 Werte standen schon so in `css/style.css` (Braun 16/38/−1/37/51/100/24, Pink 351/35/−4/32/47/100/22). Entfernt sind `css/color-tuner.css`, `js/color-tuner.js`, ihre Einbindung in `index.html`, der Link „Farben direkt auf der Website anpassen“ und der Regler-Text im Styleguide. Stattdessen nennt der Styleguide die festgelegten Werte. Nebenbei sind im Styleguide-Text drei versehentliche `css/style.css?v=46` wieder zu `css/style.css` geworden. Geprüft bei 375, 430 und 1440 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Nichts.

### 19.10.2026 · Panel-Glow größer, stärker und mit Verzögerung
- **Versucht:** Lucas wollte den Maus-Glow in den Panels (von Codex) mit 60 % mehr Fläche, 20 % stärker und so, dass er dem Cursor leicht hinterherläuft.
- **Funktioniert:** Der Radius ist von 190 auf 240 px gewachsen. Die Fläche wächst mit dem Quadrat des Radius, also +60 %. Die Deckkraft ist von 0,10/0,04 auf 0,12/0,048 gestiegen (+20 %). Die gemalte Mitte läuft dem Cursor jetzt per `requestAnimationFrame` nach und holt pro Frame 14 % des Abstands auf. Wechselt der Glow in ein anderes Panel, startet er direkt unter dem Cursor. Gemessen nach einem Sprung um 300 px: kurz danach steht er bei 271/190 statt 450/250, nach 0,8 s genau unter dem Cursor. Bei 375, 430 und 1440 px keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Der erste Test schien zu zeigen, dass der Glow nicht anspringt. Ursache war das weiche Scrollen im Test: Jedes Scroll-Event blendet den Glow aus, und das ist Absicht. Falls „60 %“ den Durchmesser meinte, wäre der Radius 304 px.

### 19.10.2026 · Rahmen 20 % schwächer, Italiana ohne engere Laufweite
- **Versucht:** Lucas wollte die feinen Rahmen in Braun und Pink 20 % schwächer. Außerdem fragte er, warum die Italiana auf der Website anders aussieht als in Figma.
- **Funktioniert:** Der Rahmenwert bestimmt die Deckkraft der Rahmenfarbe. Er ist von 24 auf 19,2 (Braun) und von 22 auf 17,6 (Pink) gesunken, also beide −20 %. Das gilt für alle 1-px-Linien, die `--color-border` nutzen, auch die Trennlinien in Listen. Ursache für den anderen Eindruck der Italiana: Auf der Website war sie um −0,015 em enger gesetzt, in Figma läuft sie mit 0 %. Jetzt steht sie auch auf der Website auf 0. Ein künstlicher Fettschnitt ist ausgeschlossen (`font-weight:400`, `font-synthesis:none`). Styleguide und HANDOFF sind nachgezogen. Bei 375, 430 und 1440 px keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Die Wortmarke selbst ist keine gesetzte Italiana, sondern bearbeitete Pfade (dünnere Striche, eigenes E). Sie sieht deshalb immer etwas anders aus als Italiana-Text. Ein Skriptfehler hat diesen Logbuch-Eintrag zunächst verhindert, der Commit mit den CSS-Änderungen lief trotzdem. Die Dokumentation ist im Folge-Commit nachgeholt.

### 19.10.2026 · Zwei neue Bilder in der Studio-Collage
- **Versucht:** Lucas hat vier Bilder geschickt und gesagt, sie dürfen unter die Bilder oben gemischt werden, ohne dass alle genutzt werden müssen.
- **Funktioniert:** Eingebaut sind das rote Nageldesign mit Blütenmotiv und Gold sowie die Gesichtsmaske, als `images/nails-art.jpg` und `images/facial-mask.jpg` (1200 px hoch, Kopien in `branding/assets/photos/originals/`). Mit 8 Bildern ist das versetzte Raster jetzt vollständig: Spalte 1 kurz und hoch, 2 hoch und kurz, 3 kurz und hoch, 4 hoch und kurz. Die neuen Bilder liegen zwischen den bisherigen, damit nicht drei Lippenbilder nebeneinanderstehen. Am Handy bleibt der Wischstreifen mit 8 Bildern. Bei 375, 1024 und 1440 px keine Konsolenfehler, kein horizontales Scrollen, der Zoom beim Hover funktioniert weiter.
- **Nicht funktioniert / offen:** Das Vorher/Nachher-Bild der Haut ist nicht verwendet. Es trägt das Wasserzeichen „@skincitylabnyc“, ist also die Arbeit eines anderen Studios und darf nicht als Paulas Ergebnis erscheinen. Das Bild mit Wimpern und Brauen ist noch nicht genutzt. Die Bilder kamen als komprimierte Chat-Anhänge (etwa 1000 px breit); für die Kacheln reicht das. Ob Nageldesign und Gesichtsmaske Paulas eigene Arbeiten sind, ist noch nicht bestätigt.

### 19.10.2026 · Kontakt als Raster mit zwei Raumbildern
- **Versucht:** Lucas hat eine Skizze geschickt: 3 Spalten, 2 Reihen. Oben links der Text „Besuch mich im Studio“, oben Mitte ein Bild, unten links ein Bild, unten Mitte Adresse, Instagram und Buchung, rechts über beide Reihen die Öffnungszeiten. Dazu zwei Raumfotos (Glastüren, rosa Lichtschrank).
- **Funktioniert:** Am Desktop ist die Fläche ein Raster nach der Skizze (Spalten 1 : 1 : 0,9, 10 px Abstand). Der Termin-Button steht beim Text, die Kontaktdaten haben ein eigenes Panel. Am Handy kommen Text und Kontaktdaten zuerst, dann die beiden Bilder als Quadrate nebeneinander, dann die Öffnungszeiten. Auf dem Lichtschrank-Foto war eine Tür mit der Aufschrift „LABOR“ zu sehen. Das Bild ist deshalb auf die runde, beleuchtete Schrankecke zugeschnitten. Ein erster Zuschnitt zeigte nur eine flache Wand und wurde verworfen. Originale liegen in `branding/assets/photos/originals/`. Bei 375, 430, 1024 und 1440 px keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Die beiden Fotos zeigen nicht Paulas Studio. Sie sind im HTML als vorläufige Stimmungsbilder markiert und haben ein leeres `alt`, damit sie nicht als Studio beschrieben werden. Sobald es Fotos vom echten Studio gibt, sollten sie ersetzt werden.

### 19.10.2026 · Collage: Brauen oben links, unten rechts frei
- **Versucht:** Lucas wollte das Brauenbild von vorher oben links in der Studio-Collage und das Bild unten rechts ganz aus dem Raster entfernt haben.
- **Funktioniert:** Aus dem Bild mit Wimpern und Brauen ist die untere Hälfte mit der Braue als `images/brow.jpg` zugeschnitten (978 × 578), das Original liegt in `branding/assets/photos/originals/lashes-brows.jpg`. Es ersetzt oben links ein Lippenbild. Das Lippenbild unten rechts ist entfernt. Spalte 4 hat jetzt ein hohes Bild mit Luft darunter, wie in der ursprünglichen Referenz. Die Collage hat 7 Bilder, am Handy auch. Bei 375, 1024 und 1440 px keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Wie bei den anderen Chat-Bildern ist noch nicht bestätigt, dass die Braue Paulas Arbeit ist.

### 19.10.2026 · Bewertungen: Panel-Abstände wie im Kontakt, „Alle Bewertungen“-Panel
- **Versucht:** Lucas wollte zwischen den Bewertungs-Panels denselben Abstand wie im Kontakt-Raster, dazu eine weitere Bewertung und ein etwas dunkleres Panel „Alle ansehen“.
- **Funktioniert:** Der Abstand ist jetzt 8 px am Handy und 10 px am Desktop. Am Desktop stehen die Panels in 3 Spalten. Das neue Panel „Alle Bewertungen“ (5.0 ★, „Alle 26 Bewertungen auf Beautinda ansehen ↗“) ist als Ganzes ein Link und ersetzt den bisherigen Button darunter. Es nutzt `--color-surface-deep` (wie die Öffnungszeiten) und füllt am Desktop die letzten zwei Spalten. Die erste Fassung war nicht dunkler, weil die allgemeine `.review`-Regel weiter unten stand. Behoben mit `.review.review-all`. Bei 375, 430, 1024 und 1440 px keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Die zusätzliche Bewertung fehlt. Auf der Seite stehen schon alle vier echten Zitate aus `docs/prd.md`, Beautinda ist aus der Cloud gesperrt, und Bewertungen werden nicht erfunden. Kommt ein fünfter echter Text, wird er vor dem Panel eingefügt und `.review-all` verliert die Doppelspalte (3 + 3).

### 19.10.2026 · Adresse zweizeilig, „Erfahrung · 5 Jahre“ statt „Status“
- **Versucht:** Im Kontakt rutschte die Adresse unter das Label „Adresse“. Lucas wollte das Label links und „München“ in der Zeile darunter, rechtsbündig. In „Über mich“ sollte „Status · Top Rated · Beautinda“ durch die 5 Jahre Erfahrung ersetzt werden.
- **Funktioniert:** Die Adresszeile bricht nicht mehr um (`.fact-address`). Rechts steht „Fürstenrieder Str. 11,“ und darunter „München ↗“, beides als ein Link. In „Über mich“ steht jetzt „Erfahrung · 5 Jahre“, die Zahl hatte Lucas schon für die Auszeichnungen genannt. Bei 375, 430, 1024 und 1440 px keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Lucas' Nachricht endete mit „Structure the …“. Der Rest fehlt noch.

### 19.10.2026 · Kontakt flacher, „Termin buchen“ bei den Öffnungszeiten; Glow nur hinter den Bewertungen
- **Versucht:** Lucas wollte im Kontakt „Termin buchen“ unter den Öffnungszeiten und die beiden Bilder breiter und flacher, damit die ganze Fläche niedriger wird. Bei den Bewertungen soll nur die Fläche dahinter leuchten, nicht die einzelnen Bewertungs-Panels.
- **Funktioniert:** Der Button sitzt am Desktop unten im Öffnungszeiten-Panel, am Handy direkt unter der Tabelle. Die Spalten sind jetzt 1,2 : 1,2 : 0,85 statt 1 : 1 : 0,9, die Mindesthöhe der Bilder ist 220 statt 280 px. Weil der Button aus dem Textpanel raus ist, ist die obere Reihe niedriger. Die erste Fassung hatte den Button nicht unten, weil die allgemeine Regel nach der Desktop-Regel stand. Behoben mit `.hours .hours-actions`. Die Bewertungs-Panels sind aus der Glow-Auswahl entfernt. Gemessen: Über einem Panel leuchtet nur `.reviews`. Bei 375, 430, 1024 und 1440 px keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Nichts.

### 19.10.2026 · „Erfahrung“ um die Weiterbildungen ergänzt
- **Versucht:** Lucas wollte in „Über mich“ bei „Erfahrung · 5 Jahre“ die 4 Weiterbildungen ergänzen.
- **Funktioniert:** Die Zeile lautet jetzt „Erfahrung · 5 Jahre & 4 Weiterbildungen“. Die Zahlen stammen von Lucas, wie bei den Auszeichnungen. Bei 375, 430 und 1440 px keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Nichts.

### 19.10.2026 · Lorbeerkränze wachsen beim Scrollen
- **Versucht:** Die drei Lorbeer-Auszeichnungen sollen sich öffnen, wenn man den Abschnitt erreicht: Sie wachsen in etwa einer Sekunde aus der Mitte, ausgelöst durch das Erreichen und nicht an den Scrollweg gekoppelt.
- **Funktioniert:** Ein IntersectionObserver (35 % sichtbar) setzt einmalig `.grown`. Die Kränze wachsen dann in 1 s von 45 % auf 100 % und blenden ein. Die drei sind um je 0,15 s versetzt, Zahl und Text erscheinen danach. Gemessen nach 0,4 s: 0,93 / 0,82 / 0,56, nach 1,6 s alle fertig. Den Startzustand setzt ein kleines Skript im `<head>` (`html.js`), damit die Kränze nicht erst groß erscheinen und dann schrumpfen. Ohne JavaScript oder mit „Bewegung reduzieren“ stehen sie sofort fertig da. Bei 375 und 1440 px keine Konsolenfehler.
- **Nicht funktioniert / offen:** Die erste Fassung setzte die Startklasse erst per JavaScript. Dadurch schrumpften die Kränze nach dem Laden sichtbar, bevor sie wuchsen. Behoben.

### 19.10.2026 · Header blendet über pinken Abschnitten zu Pink
- **Versucht:** Liegt die Navigationsleiste über einem pinken Bereich, soll sie weich zu Pink überblenden und beim Verlassen zurück, in etwa 1 s.
- **Funktioniert:** Im Header liegt eine zusätzliche Schicht `.header-tint` mit der Pink-Palette (`theme-pink`). Sie liegt über dem braunen Hintergrund und blendet per `opacity` in 1 s ein und aus. Ein IntersectionObserver beobachtet eine 1 px hohe Linie auf Höhe der Header-Mitte und setzt `.over-pink`, solange Behandlungen oder Bewertungen darunter liegen. Bei einer Größenänderung des Fensters wird die Linie neu berechnet. Die Schicht kopiert auch den mobilen Verlauf, damit es am Handy gleich aussieht. Gemessen bei 375 und 1440 px: oben 0, in Behandlungen nach 0,3 s etwa 0,45 und nach 1,2 s 1, in Schulungen 0, in Bewertungen 1. Bei „Bewegung reduzieren“ ohne Übergang. Keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** „Mit einer Verzögerung von 1 Sekunde“ ist als 1 s Überblendung umgesetzt, nicht als 1 s Wartezeit vor dem Start.

### 19.10.2026 · Glow wirkt auch auf die Fläche hinter einem Panel
- **Versucht:** Hovert man über ein Panel, das auf einer anderen leuchtenden Fläche liegt (zum Beispiel eine Kategorie auf dem pinken Behandlungs-Hintergrund), wurde nur das obere Panel dunkler. Lucas wollte, dass die Fläche darunter trotzdem an der Cursor-Stelle dunkler wird, als läge der Cursor direkt auf ihr.
- **Funktioniert:** Der Glow sammelt jetzt alle passenden Flächen vom Panel unter dem Cursor bis zum äußersten Abschnitt und malt den Schein auf jeder an derselben Stelle. Gemessen: Über „Permanent Make-up“ leuchten die Kategorie und `.services`. Über einer Bewertung leuchtet nur `.reviews`, weil die Bewertungs-Panels seit vorhin ausgenommen sind. Bei den Schulungen leuchten Kopf und Inhalt zusammen. Keine Konsolenfehler.
- **Nicht funktioniert / offen:** Nichts.

### 19.10.2026 · Hover-Linie unter beiden Adresszeilen
- **Versucht:** Die Hover-Linie unter der zweizeiligen Adresse lief nur unter der zweiten Zeile, dafür über die volle Blockbreite. Lucas wollte unter jeder Zeile eine eigene Linie, so lang wie der Text.
- **Funktioniert:** Dieser Link ist jetzt `inline` statt `inline-block`, und die Linie ist ein Hintergrundverlauf mit `box-decoration-break: clone`. So bekommt jede Zeile ihre eigene Linie, die wie die anderen Hover-Linien von der Mitte wächst (0,35/0,45 s). Gemessen: zwei Zeilenrechtecke mit 138 und 81 px, jede mit eigener Linie. Die erste Fassung griff nicht, weil die allgemeine Hover-Linien-Regel weiter unten steht. Behoben mit `.fact.fact-address a`.
- **Nicht funktioniert / offen:** Nichts.

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
