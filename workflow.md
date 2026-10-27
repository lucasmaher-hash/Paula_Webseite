# Workflow: PM Beauty · Kurzprojekt 1 (Identität) und 2 (Website)

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

### 19.10.2026 · Pinker Header deutlicher
- **Versucht:** Lucas meldete, der pinke Header funktioniere nicht.
- **Funktioniert:** Technisch lief der Wechsel, er war aber kaum zu sehen. Gemessen: RGB 245/234/233 ohne und 242/227/228 mit Tönung. Der Header ist zu 68 % deckend und lag ohnehin über einer pinken Fläche. Die Tönung nutzt jetzt die pinke Flächenfarbe `--color-surface` mit 90 % Deckkraft, auch im mobilen Verlauf. Gemessen danach: 233/210/213 gegenüber 245/234/233, im Screenshot klar als Pink erkennbar. Keine Konsolenfehler.
- **Nicht funktioniert / offen:** Safari konnte hier nicht getestet werden (nur Chromium in der Cloud).

### 19.10.2026 · Glow setzt schon in der Nähe eines Panels ein
- **Versucht:** Der Glow soll auch wirken, wenn der Cursor außerhalb einer Fläche ist. Nähert man sich, soll die Fläche allmählich dunkler werden statt beim Betreten plötzlich zu springen.
- **Funktioniert:** Der Glow sucht nicht mehr nach dem Panel unter dem Cursor. Er malt jede Glow-Fläche an, deren Rand weniger als 240 px (= Radius des Verlaufs) von der Glow-Mitte entfernt ist, und zwar an genau dieser Stelle. Nähert man sich, erscheint der Schein zuerst nur am Rand und wird mit kleinerem Abstand kräftiger. Verschachtelte Flächen leuchten weiterhin mit. Beim Scrollen wird neu gemalt statt gelöscht, damit der Schein bei ruhendem Cursor nicht verschwindet. Gemessen: 150 px über dem Kontakt-Panel ist es schon beleuchtet, 300 px darüber nicht. Über einer Kategorie leuchten Kategorien und `.services`. Keine Konsolenfehler.
- **Nicht funktioniert / offen:** Nichts.

### 19.10.2026 · Schulungstexte gekürzt, „Alle Bewertungen“ dunkler
- **Versucht:** Lucas wollte die Texte in den Schulungskarten kürzer haben und das „Alle Bewertungen“-Panel etwas dunkler.
- **Funktioniert:** Die vier Absätze sind auf ihren Kern gekürzt, ohne neue Aussagen. Lashlift: „Lerne Korean Lashlift, die neueste Technik auf dem Markt, in Theorie und Praxis.“ und „Für den Einstieg in die Beauty-Branche oder als Ergänzung deines Angebots.“ Masterclass: Die fette Zeile bleibt, danach „Perfektioniere deine Technik und kreiere Ergebnisse, die für sich sprechen.“ und „Technik und Verständnis, mit denen du dich langfristig weiterentwickelst. Für Einsteigerinnen und alle, die ihre Fähigkeiten perfektionieren möchten.“ Das Panel mischt jetzt 14 % Akzentfarbe in `--color-surface-deep`. Bei 375, 430 und 1440 px keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Paula sollte die gekürzten Texte noch freigeben. Die Originale stehen in der Git-Historie.

### 19.10.2026 · Header: nur Schrift und Buttons werden pink, nicht die Leiste
- **Versucht:** Lucas hatte den pinken Header anders gemeint: Nicht die Leiste soll pink werden, sondern Schrift, Logo und Buttons darauf sollen von Braun zu Pink wechseln.
- **Funktioniert:** Die pinke Schicht `.header-tint` ist entfernt. `.site-header.over-pink` setzt jetzt nur die Text-, Akzent- und Button-Farben auf die Pink-Palette (gleiche Formeln wie die Farbrollen, mit den Pink-Werten). Der Hintergrund `--color-background` bleibt unverändert. Logo, Nav-Links, Instagram-Knopf und „Termin buchen“ blenden Farbe, Hintergrund und Rahmen in 1 s über. Gemessen bei 1440 px: Logo von RGB 116/84/73 zu 99/64/70, Button von 161/116/99 zu 147/93/101, Leiste unverändert. Der IntersectionObserver von vorher bleibt. Bei „Bewegung reduzieren“ ohne Übergang. Keine Konsolenfehler.
- **Nicht funktioniert / offen:** Die 1-s-Übergänge im Header gelten auch für den Hover der Buttons dort. Der Hover wirkt dadurch etwas träger als im Rest der Seite.

### 19.10.2026 · Handy: Kalender- und Menüknopf in Braun bzw. Pink
- **Versucht:** Die beiden Knöpfe im mobilen Header (Termin und Menü) waren hell. Sie sollen wie die anderen Header-Knöpfe braun sein und über pinken Abschnitten pink.
- **Funktioniert:** Beide haben jetzt `.icon-btn-primary`, also die Button-Farbe mit hellem Symbol. Über Behandlungen und Bewertungen wechseln sie mit dem übrigen Header in 1 s zu Pink. Geprüft bei 375 und 430 px: keine Konsolenfehler, kein horizontales Scrollen.
- **Nicht funktioniert / offen:** Nichts.

### 19.10.2026 · Übergabe aus der Cloud-Sitzung
- **Versucht:** Lucas möchte nicht mehr in der Cloud weiterarbeiten, sondern in einem normalen Chat auf seinem Mac.
- **Funktioniert:** `docs/HANDOFF.md` ist auf den aktuellen Stand gebracht: Aufbau aller Abschnitte, Cache-Versionen, Glow, pinker Header, Bildquellen mit offenen Rechtefragen, offene Punkte (5. Bewertung, Freigabe der gekürzten Schulungstexte, echte Studiofotos, veraltetes Logbuch-Ende, Abgleich mit `kurs/KURS.md`). Ein neuer Chat startet mit `git pull` und dieser Datei. Beim Umbau war der Abschnitt „Gestaltung“ kurz verloren gegangen. Er ist aus Git wiederhergestellt und aktualisiert.
- **Nicht funktioniert / offen:** Ein Chatverlauf lässt sich nicht als lokaler Chat weiterführen, nur die Arbeit über das Repo.

### 19.10.2026 · Styleguide: Prinzip, Moodboard, Farbbedeutung, Anwendung (Claude lokal)
- **Versucht:** Claude hat den Styleguide gegen Ammers Abgabeliste vom 15.10. geprüft. Es fehlten Moodboard, die Bedeutung der Farben, ein klar benanntes Gestaltungsprinzip und eine Visualisierung der Anwendung. Lucas: „Mach die fehlenden Styleguide-Punkte.“ Vorher wurde das Markenprofil committet.
- **Funktioniert:** Vier neue Abschnitte in `styleguide.html`. **02 Gestaltungsprinzip „Die Mitte“** (aus dem Markenprofil übernommen): Das E im Logo mit Mittelachse, dazu drei laufende Beispiele aus der Website (Hover-Linie wächst aus der Mitte, Lorbeerkranz öffnet sich aus dem Zentrum, Kategorie gleitet in die Bildschirmmitte) und vier Regeln samt „Test ohne Logo“. **03 Moodboard** aus Paulas Fotos, den zwei Raum-Referenzen (als Referenz beschriftet), Schrift-, Farb- und Wortkacheln. Das Brauenfoto ist bewusst nicht dabei, weil die Rechte offen sind. **Farben:** Bedeutung je Farbwelt (Braun = Studio und Paula, Pink = Behandlung und Ergebnis, Taupe = Wand aus dem Porträt) und Harmonie mit Farbkreis: 16° und 351° liegen 25° auseinander, die Sättigung ist fast gleich, also eine analoge Harmonie. **11 Anwendung:** Handy mit der echten Website als iframe, Visitenkarte und Terminkarte, Gutschein 100 €, Instagram-Beitrag, alles direkt aus den CSS-Variablen gebaut. Geprüft bei 375 und 1440 px: kein horizontales Scrollen, keine Konsolenfehler.
- **Nicht funktioniert / offen:** Das E und die Logos blieben zuerst unsichtbar. Ursache: Das äußere SVG hatte dieselbe verschobene viewBox wie das Symbol, dadurch lag die Grafik außerhalb des Bildes. Behoben mit `viewBox="0 0 …"`. Die Mockups sind gerenderte HTML-Szenen, keine Fotos. Für „Foto und/oder Video“ fehlt noch ein echtes Foto- oder Video-Mockup (z. B. per KI-Bildgenerierung oder Bildschirmaufnahme).

### 19.10.2026 · Workflow-Ende neu, Logo-Prompt mit Bewertungskriterien (Claude lokal)
- **Versucht:** Die Abschnitte Werkzeuge, Wichtige Prompts, Wendepunkte und Fazit beschrieben noch den ersten Cormorant-Entwurf. Außerdem fehlte aus der Aufgabe vom 12.10. der Logo-Prompt mit Bewertungskriterien.
- **Funktioniert:** Claude hat das ganze Logbuch ausgewertet und die vier Abschnitte nach Ammers Vorlage neu geschrieben, Titel jetzt „Kurzprojekt 1 (Identität) und 2 (Website)“. Neu ist `branding/logo-prompt.md`: ein nachträglich formulierter Prompt, neun Kriterien mit Prüfmethode und eine gemessene Bewertung des finalen Logos. Ergebnis: Mitte, Gleichmaß und Technik sind erfüllt. Nicht erfüllt sind die Lesbarkeit klein (Mittelstrich des E im Header nur 0,2 px breit) und das Wortbild (Wortabstand 0,79 × Versalhöhe).
- **Nicht funktioniert / offen:** Der Prompt ist rückwirkend formuliert, das Logo ist nicht aus ihm entstanden. So steht es auch in der Datei. Der Charakter-Test mit fremden Personen (K6) ist nicht gemacht. Ob es eine Kleinfassung für den Header gibt, entscheidet Lucas.

### 19.10.2026 · Kleinfassung des Logos für den Header (Claude lokal)
- **Versucht:** Die Bewertung im Logo-Prompt zeigte: Im Header ist der Mittelstrich des E nur 0,2 px breit, der Wortabstand zu groß. Lucas: „Entwirf eine Kleinfassung für den Header: Mittelstrich breiter, Wortabstand enger, zum Vergleich neben dem Original.“
- **Funktioniert:** Drei Fassungen in `branding/assets/logo-small/`, alle auf der normalen statt der dünnen Strichstärke, Mittelstrich 1,75 statt 0,56: A nur kräftiger, B mit Wortabstand 0,5 × Versalhöhe (E dafür 1,5 % neben der Mitte), C mit Wortabstand −4 und A/U/T/Y je 1 enger (E bleibt exakt mittig). Die Vergleichsseite `vergleich.html` zeigt alle vier in Echtgröße im Header, über Pink und als gerastertes Pixelbild. Gemessen in diesem Pixelbild: Der Mittelstrich erreicht im Original 20 % des vollen Kontrasts, in den Kleinfassungen 61 bis 70 %. Bei 375 und 1440 px kein horizontales Scrollen, keine Konsolenfehler.
- **Nicht funktioniert / offen:** Auf einem echten Handy-Display ist es nicht angesehen. Claude empfiehlt C, die Wahl trifft Lucas. Die Website ist unverändert.

### 19.10.2026 · Dynamisches Logo, erster Prototyp (Claude lokal)
- **Versucht:** Lucas: „danach direkt weiter machen mit dem nächsten Schritt“. Offen aus Kurzprojekt 1 waren das dynamische Logo und die Animation, die auf ihre Umgebung reagiert. Claude hat dafür einen Prototyp auf dem Gestaltungsprinzip „Die Mitte“ gebaut, ohne vorher Varianten abzufragen.
- **Funktioniert:** `branding/dynamic-logo/index.html`. Zwei Reize aus der Umgebung: (1) Maus, Finger oder die Neigung des Handys lenken den Mittelstrich des E bis 14° aus, eine gedämpfte Feder holt ihn exakt auf die Achse zurück. (2) Die Uhrzeit in München (Europe/Berlin) gegen die Öffnungszeiten aus `docs/prd.md` (Mo–Fr 10–20 Uhr): Ist das Studio offen, steht der Mittelstrich voll und die Seite wechselt in die Pink-Welt (`.theme-pink`). Ist es geschlossen, steht der Strich auf einem Drittel und die Seite bleibt braun, mit 1 s Übergang. Eine Simulation (Wochentag, Uhrzeit) erlaubt die Vorführung im Kurs, außerdem eine Header-Vorschau mit 112 und 96 px. Bei „Bewegung reduzieren“ schwingt nichts. Gemessen: Auslenkung bis etwa 9° bei schneller Bewegung, danach Rückkehr gegen 0°. Mo 3:44 echt = geschlossen, Mo 11:00 simuliert = offen und pink. Bei 375 und 1280 px kein horizontales Scrollen, keine Konsolenfehler.
- **Nicht funktioniert / offen:** Der Mittelstrich mit 0,56 Einheiten war als bewegtes Teil kaum zu sehen, im Prototyp ist er deshalb 1,75 breit. Das Vorschaufenster lief mit etwa 4 Bildern pro Sekunde, Federgefühl und Neigung auf iPhone/Android sind nicht getestet. Noch nicht im Styleguide und nicht auf der Website. Ob das Konzept trägt, entscheidet Lucas, eventuell mit Ammer.

### 19.10.2026 · Kleinfassung C auf der Website, dynamisches Logo im Styleguide (Claude lokal)
- **Versucht:** Lucas: „Nimm Kleinfassung C für den Header auf der Website und nimm das dynamische Logo in den Styleguide auf.“
- **Funktioniert:** Header, mobiles Menü und Footer zeigen das Logo alle mit 96/112 px, deshalb steht C an allen drei Stellen (Regel aus dem HANDOFF: Logo immer an allen drei Stellen ersetzen). Gemessen: 96 × 28 px am Handy, 112 × 33 px am Desktop, knapp 1 px höher als vorher. Kein horizontales Scrollen, keine Konsolenfehler. Im Styleguide zeigen „Größen“ bei 96 und 112 px jetzt C, dazu die Regel „bis 160 px Kleinfassung“. Neuer Unterabschnitt „Dynamisches Logo“ mit Live-Fläche (Feder zur Mitte, Öffnungszeiten, Simulation). Drei veraltete Logo-Regeln korrigiert: Logofarbe ist die Textfarbe der Farbwelt statt „Fast-Schwarz #221C16“, Pink ist in der Pink-Welt erlaubt, das E darf sich nur im dynamischen Logo ändern. Styleguide nur am Desktop geprüft (Lucas' Regel).
- **Nicht funktioniert / offen:** Auf einem echten Handy ist das neue Header-Logo nicht angesehen. In Figma liegt C noch nicht.

### 19.10.2026 · Dynamisches Logo im Website-Header (Claude lokal)
- **Versucht:** Lucas: „Bau das dynamische Logo in den Website-Header ein (Feder + Öffnungszeiten), ruhig und dezent.“ Claude hat den Farbwechsel bewusst weggelassen: Der Header wird schon über den pinken Abschnitten pink, ein zusätzliches Pink während der Öffnungszeiten hätte diese Bedeutung überlagert. Die Neigung am Handy fehlt ebenfalls, weil iOS dafür eine Erlaubnisabfrage zeigt.
- **Funktioniert:** Nur im Header-Logo ist der Mittelstrich eine eigene Gruppe. CSS: `.site-header.studio-closed` kürzt ihn auf 32 % (Drehpunkt unten mittig über `transform-box: fill-box`), Übergang 1 s. JS am Ende von `main.js`: Öffnungszeiten nach Münchner Uhrzeit, jede Minute neu. Eine Feder (max. 8°) reagiert auf Mausbewegung (der Strich bleibt wie ein Stab etwas zurück) und auf Scrollgeschwindigkeit, läuft nur bei Bewegung und bei „Bewegung reduzieren“ gar nicht. Gemessen: Geschlossen 2,55 statt 7,96 px hoch, Fußpunkt und Mitte unverändert. Scrollen kippt auf etwa −6°, nach 1 s noch etwa 1°. Maus nach rechts −5,9°. Bei 375 und 1440 px kein horizontales Scrollen, keine Konsolenfehler. CSS v61, JS v35.
- **Nicht funktioniert / offen:** Das Vorschaufenster war ausgeblendet. Dort laufen weder Transitionen noch Animationsframes oder Scroll-Events. Getestet wurde deshalb mit synthetischen Events und einem Timer statt `requestAnimationFrame`. Wie es sich auf einem echten Gerät anfühlt, ist nicht gesehen. Dezent heißt hier auch: Ohne Erklärung erkennt kaum jemand, dass der kurze Strich „geschlossen“ bedeutet. Feiertage werden nicht berücksichtigt.

### 19.10.2026 · Dynamisches Logo nur noch im Styleguide (Claude lokal)
- **Versucht:** Lucas: „integriere das in den Styleguide, nicht eine separate Seite“. Gemeint war die Prototyp-Seite `branding/dynamic-logo/`.
- **Funktioniert:** Der Styleguide-Abschnitt „Dynamisches Logo“ hat jetzt alles, was die Seite konnte, außer der Handy-Neigung: große Live-Fläche (volle Fassung, 14°, Pink bei Öffnung), Uhrzeit-Simulation und neu zwei Header-Vorschauen mit Kleinfassung C bei 112 und 96 px, die wie auf der Website nur die Höhe ändern und mit 8° mitkippen. Die Prototyp-Seite ist gelöscht (`git rm`, bleibt in der Historie). Gemessen: geschlossen 13,24/2,97/2,55 px, offen 41,38/9,28/7,96 px Strichhöhe (Fläche/112/96 px), bei Mausbewegung 9,5° groß und 5,4° in den Headern. Desktop 1440 px ohne horizontales Scrollen und ohne Konsolenfehler.
- **Nicht funktioniert / offen:** Den Neigungs-Knopf gibt es nicht mehr, weil der Styleguide nur für den Desktop gilt. Die Vergleichsseite der Kleinfassungen (`branding/assets/logo-small/vergleich.html`) ist weiterhin eine eigene Seite.

### 19.10.2026 · Kleinfassungs-Vergleich im Styleguide (Claude lokal)
- **Versucht:** Lucas: „Integriere die Vergleichsseite der Kleinfassungen auch in den Styleguide und lösche die separate Seite.“
- **Funktioniert:** Neuer Unterabschnitt „Kleinfassung: Vergleich“ im Logo-Abschnitt (`styleguide.html#kleinfassung`), vor der Schutzzone: vier Karten (Original, A, B, C) mit 96 und 112 px, gerastertem Pixelbild, großer Ansicht mit Mittelachse und Messwerten. C ist als „Auf der Website“ markiert. Der Hinweis unter „Größen“ verlinkt jetzt auf diesen Anker. `vergleich.html` ist gelöscht (bleibt in der Git-Historie), das README in `logo-small/` ist angepasst. Bei 1440 px kein horizontales Scrollen, keine Konsolenfehler, alle vier Pixelbilder gerendert.
- **Nicht funktioniert / offen:** Nichts.

### 19.10.2026 · Mittelstrich wächst beim Hover statt nach Öffnungszeiten (Claude lokal)
- **Versucht:** Lucas: Der mittlere Strich soll nicht mehr je nach Tageszeit wachsen, sondern beim Hovern mit der Maus. Die bisher höchste Stufe ist die normale, beim Hover wächst er auf das Doppelte.
- **Funktioniert:** Öffnungszeiten-Logik aus `main.js`, CSS und Styleguide entfernt, ebenso Simulation, Statuszeile und Pink-Wechsel der großen Fläche. Normal steht der Strich in voller Höhe (22 Einheiten), beim Hover `scaleY(2)` nach oben, der Fuß bleibt (0,45 s hinein, 0,35 s zurück, wie die Hover-Linien). Website-Header, große Styleguide-Fläche und die Header-Vorschauen verhalten sich gleich, die Feder bleibt. Gemessen: Header 9,28 → 18,57 px, Oberkante bleibt unter den E-Stämmen, nach dem Wegziehen wieder 9,29 px. Styleguide-Fläche 41,38 → 82,75 px. Am Handy kein Hover, 7,96 px. Keine Konsolenfehler, kein horizontales Scrollen. CSS v62, JS v36.
- **Nicht funktioniert / offen:** Auf Touch-Geräten wächst nichts, dort bleibt nur die Feder beim Scrollen. Das Logo reagiert damit nicht mehr auf Daten (Uhrzeit), sondern nur noch auf Interaktion. Für Ammers „Animation, die auf ihre Umgebung reagiert“ zählen jetzt Maus und Scrollen als Umgebung.

### 19.10.2026 · Rahmen um die Collage behoben, Feder des Mittelstrichs entfernt (Claude lokal)
- **Versucht:** Lucas sah auf paula-maher.de „manchmal einen komischen Border“ um die Bilder bei „Arbeiten aus dem Studio“ (Screenshot). Danach: „remove the sideways movement of the middle line of the E in the logo“.
- **Funktioniert:** Der Rahmen war der Fokusrahmen des Bilderstreifens: `tabindex="0"` (für das seitliche Scrollen per Tastatur am Handy) plus `.strip:focus-visible`. Nach einem Klick oder Tab bekam der Streifen den Fokus. Jetzt setzt `main.js` den tabindex nur, solange der Streifen scrollbar ist. Gemessen: Handy tabindex 0 (1566 > 375 px), Desktop kein tabindex, Fokus nicht möglich. Die Feder (Kippen bei Maus und Scrollen) ist aus `main.js` und dem Styleguide entfernt. Der Mittelstrich wächst nur noch beim Hover auf seiner Achse (Header 9,28 → 18,57 px, Mitte unverändert). CSS v63, JS v38. Keine Konsolenfehler.
- **Nicht funktioniert / offen:** In Safari am echten Gerät ist der Rahmen-Fix nicht nachgestellt, der Screenshot kam aus Safari. Das Logo reagiert jetzt nur noch auf Hover, auf Touch-Geräten bewegt es sich gar nicht.

### 19.10.2026 · Linie unter geöffneter Kategorie bleibt (Claude lokal)
- **Versucht:** Lucas: „wenn eine Dienstleistungskategorie geöffnet ist, lass die Linie drunter, auch wenn die Maus weg geht.“
- **Funktioniert:** Am Handy gab es das schon (`@media(hover:none)`). Neu gilt `.accordion details[open] summary h3::after{transform:scaleX(1)}` für alle Geräte. Die Regeln fürs Zuklappen am Handy stehen danach und gewinnen dort weiter. Gemessen bei 1440 px: geöffnete Kategorie `scaleX(1)` ohne Hover, geschlossene `scaleX(0)`. Bei 375 px unverändert. CSS v64, Styleguide-Text angepasst.
- **Nicht funktioniert / offen:** Nichts.

### 19.10.2026 · Codex · Drei neue SVG-Logoalternativen
- **Versucht:** Lucas bat um drei neue Logoentwürfe als SVG direkt im Chat: breite Wortmarke, kompaktes Monogramm und weiches Studio-Emblem.
- **Funktioniert:** Drei getrennte Richtungen in `branding/assets/pm-beauty-logo/versions/v7/`: Editorial mit Italiana und Namenszusatz, ineinandergreifendes PM in Pink und individuell gezeichnetes kleines pm im offenen Oval. Schrift in Pfade umgewandelt; transparente SVGs plus Vorschauen auf der Seitenfarbe. Alle SVGs als XML geprüft und alle drei gerenderten Vorschauen visuell kontrolliert. Bisherige Logo-Versionen erhalten; das Website-Logo wurde nicht ersetzt.
- **Nicht funktioniert / offen:** Für die Instrument-Sans-WOFF2 musste die vorhandene Python-Umgebung um Brotli ergänzt werden. Auswahl und Freigabe durch Lucas/Paula stehen aus; Kleinstgrößen sind noch nicht optimiert.

### 19.10.2026 · Codex · Beauty-Logo-Recherche und drei weitere Varianten
- **Versucht:** Lucas wollte vor einer neuen Runde Beauty-Salon-Logos recherchieren. Projektseiten von Kriss, Moiselle und Hani Nails gelesen, deren Logos im Browser visuell verglichen; FACEGYM als zusätzliche typografische Referenz aus der Bildsuche.
- **Funktioniert:** Drei neue Richtungen in `branding/assets/pm-beauty-logo/versions/v8/`: Blüte (eigenes Symbol), Soft Type (kräftige Kleinbuchstaben) und Kontur (eigenes Gesichtsprofil). Übernommen wurden Gestaltungsprinzipien, keine fremden Zeichen oder Logo-Pfade. Alle drei Entwürfe in Paulas Farben als SVG mit Pfadschrift, plus Vorschauen und dokumentierte Quellen. SVG-Struktur geprüft und gerenderte Vorschauen visuell kontrolliert.
- **Nicht funktioniert / offen:** Ein Referenzbild ließ sich über die Websuche zunächst nicht laden, im Browser war es sichtbar. Auswahl und Freigabe bleiben offen; Namenszusätze brauchen für kleine Anwendungen eine eigene Adaption.

### 19.10.2026 · Markenprofil als Kurzfassung im Styleguide (Claude lokal)
- **Versucht:** Lucas wollte das Markenprofil als Kurzfassung mit Fokus auf die Kernwerte, als eigene Seite, erreichbar über einen dunklen Knopf oben rechts im Styleguide.
- **Funktioniert:** Neue Seite `markenprofil.html` im Look des Styleguides: Markenkern als dunkle Fläche („Präzise Schönheit, die bleibt.“ mit Paulas Leitsatz), die drei Werte groß als Karten, jeweils mit „Sichtbar in der Gestaltung“, dazu Charakter mit Tonalität und Abgrenzung mit der Begründung aus dem KI-Marktcheck. Alle Aussagen kommen aus `branding/markenprofil.md`, ohne neue Fakten. Der Pink-Widerspruch des Profils („höchstens eine pinke Fläche pro Ansicht“) ist in der Kurzfassung durch die heutige Regel ersetzt (Pink nur für Behandlungen und Bewertungen). Im Styleguide steht oben rechts ein dunkelbrauner Knopf „Markenprofil ↗“. Geprüft bei 1440 px: kein horizontales Scrollen, keine Konsolenfehler.
- **Nicht funktioniert / offen:** Die Langfassung `branding/markenprofil.md` sagt beim Pink noch das Alte und sollte angeglichen werden. Die Werte-Karten habe ich nur über das DOM geprüft, nicht optisch.

### 19.10.2026 · Styleguide präziser, Kategorien als Seitenleiste (Claude lokal)
- **Versucht:** Lucas fand den Styleguide zu lang und wollte die Kategorien links als Seitenleiste.
- **Funktioniert:** Gemessen 18,2 Bildschirmhöhen bei 1440 px. Gekürzt: Abschnitt „Verfahren“ raus (gehört ins Logbuch), Zielgruppe raus (steht im Markenprofil), Moodboard-Ja/Nein-Liste raus, „Abstimmung“ mit den Reglerwerten raus, Farbmuster als kompakte Reihe, Kleinfassungs-Vergleich ohne Pixelbild und Großansicht, „Panels nebeneinander“ und „Kacheln“ raus, Zeichenprobe und eine Typo-Zeile raus, Bewegungstabelle von 9 auf 6 Zeilen, alle Einleitungen auf ein bis zwei Sätze, Anwendungs-Mockups kleiner. Ergebnis: 14,0 Bildschirmhöhen (−23 %). Ab 1100 px stehen die Kategorien als feste Leiste links (220 px), die sichtbare Kategorie bekommt die Hover-Linie (IntersectionObserver). Darunter bleibt die alte Leiste oben (Styleguide nur Desktop). Nebenbei: Der Kopfbereich hatte keinen seitlichen Rand, das fiel erst mit der Leiste auf und ist behoben. Keine Konsolenfehler.
- **Nicht funktioniert / offen:** Die größten Abschnitte sind weiter Logo (inklusive Kleinfassungs-Vergleich und dynamischem Logo) und Anwendung. Weiter kürzen ginge nur durch das Streichen von Inhalten, die Lucas ausdrücklich im Styleguide haben wollte.

### 19.10.2026 · Moodboard mit Interieur-Richtung und Unsplash-Referenzen (Claude lokal)
- **Versucht:** Lucas wollte Bilder für das Moodboard (Nägel, Wimpern, Studio) in Creme, Beige und Pink. Claude hat Unsplash mit 16 Suchbegriffen durchsucht. Die Farbe jedes Vorschaubilds wurde aus Unsplashs 8×8-Platzhalter berechnet und mit der Palette verglichen. Unsplash+ wurde ausgeschlossen, 17 Kandidaten blieben übrig, alle auf einem Kontaktbogen gesichtet. Lucas gab acht Bilder frei und bestimmte ein eigenes Hauptbild: einen Instagram-Story-Screenshot eines Studio-Interieurs (Pilzlampe aus Stein, geriffeltes Nussholz-Sideboard, Bouclé). Laut Lucas liegt die Lizenz bei Paula.
- **Funktioniert:** Die acht Bilder liegen in 900 px als `images/mood-*.jpg` (zusammen 614 KB). Das Hauptbild ist ohne Instagram-Oberfläche und Text zugeschnitten (`images/mood-studio-direction.jpg`). Quellen, Fotografen und Lizenzen stehen in der neuen `images/STOCK.md`. Das Moodboard hat jetzt 30 Felder in 5 Reihen: das Hauptbild groß vorne, Paulas eigene Fotos und die Referenzen (als „Referenz“ beschriftet). Farbmuster jetzt Creme · Nussholz · Rosé. Raus sind das Glasbüro und die gemalten Kacheln, das echte Lampenlicht ersetzt sie. Die Beschriftungen auf hellen Bildern haben jetzt einen Verlauf. Geprüft bei 1440 px, keine Konsolenfehler.
- **Nachtrag:** Auf Lucas' Wunsch sind der Korbsessel und das Porträt mit geschlossenen Augen wieder raus (Dateien und STOCK.md). Das Raster ist neu verteilt und hat weiter 5 volle Reihen.
- **Nicht funktioniert / offen:** Die interne Such-API von Unsplash ist gesperrt, das Dekodieren der Bilder im ausgeblendeten Browserfenster hing. Die Platzhalter-Methode hat beides umgangen. Das Hauptbild ist ein WhatsApp-Screenshot mit 942 px Breite, in der großen Kachel also nicht ganz scharf. Die Lizenzangabe dazu habe ich nicht selbst geprüft.

### 19.10.2026 · Styleguide: Kapitel Bewegung mit Live-Karten, Logo schreibt sich (Claude lokal)
- **Versucht:** Lucas wollte das Kapitel Bewegung als Folge von Bewegungsbausteinen: je eine kleine Live-Vorschau und ein Satz. Dazu mehrere Aufräumschritte im Styleguide.
- **Funktioniert:** Vier Karten untereinander. (1) **Panel-Glow:** ein pinkes und ein braunes Panel mit derselben Logik wie `main.js` (240 px Radius, 14 % Nachführung), doppelte Deckkraft. (2) **Linie fährt aus:** Die Panel-Kontur zeichnet sich in 2 s im Uhrzeigersinn, in der Rahmenfarbe der Website (SVG-Rechteck mit `pathLength`). (3) **Hover-Linie:** das echte Kontakt-Panel, Adresse einzeilig. (4) **Logo schreibt sich:** ein neues E nach Lucas' Bild, mit hohem Mittelstrich und kürzeren Außenstrichen, nachgebaut aus der korrigierten Fassung (PNG ausgemessen). Erst fahren Mittelstrich, Fuß und Außenstriche aus, dann schreiben sich die Buchstaben von der Mitte aus als Fläche. Jeder Buchstabe ist maskiert, die Maske ist ein breiter Strich entlang seiner Kontur. Jede Kontur startet an ihrem dem E nächsten Punkt und wächst in beide Richtungen nach außen (Strichmuster `0 1 0 0` → `.5 0 .5 0`). Gesamt 2,5 s. Variante A (erst Kontur, dann Füllung) ist auf Lucas' Wunsch wieder raus. Außerdem entfernt: der Kleinfassungs-Vergleich, die Schutzzone, die doppelte Bühne um die Demo-Panels.
- **Nicht funktioniert / offen:** Im ausgeblendeten Vorschaufenster laufen keine Animationen. Geprüft wurde mit gespulten Standbildern (`currentTime`), die Bewegung selbst nicht. Das neue E ist eine Rekonstruktion, kein Original-Vektor. Der Maskenstrich folgt der Außenkontur, nicht einer echten Schreiblinie. Bei kleinen Buchstaben deckt er schnell alles ab.

### 20.10.2026 · Codex · Lesbarere Website-Typografie
- **Versucht:** Lucas meldete die Typografie als unleserlich. Die feine Italiana wurde für Überschriften und große Zahlen durch Lora 500 ersetzt; Instrument Sans bleibt für Fließtext und Bedienung, die gezeichnete Italiana-Wortmarke bleibt erhalten. Schriftdateien liegen lokal mit OFL-Lizenz.
- **Funktioniert:** Auf der Website bei 375 und 1440 px sowie im Styleguide und Markenprofil geprüft: Lora lädt, sichtbare Überschriften laufen nicht über, keine horizontale Seitenbreite und keine JavaScript-Fehler. Styleguide und Cache-Versionen sind angepasst.
- **Nicht funktioniert / offen:** Die Wirkung auf echten Geräten und Paulas Urteil zur Schrift sind noch nicht geprüft.

### 20.10.2026 · Codex · Gambarino und Melodrama als Website-Vorschau
- **Versucht:** Lucas wollte anhand zweier Fontshare-Screenshots Gambarino und Melodrama direkt auf der Website vergleichen. Zwei vollständige, getrennte Vorschauseiten angelegt; Schriftdateien kommen über die offizielle Fontshare-API. Das bestehende Logo, Fließtext und die Live-Startseite bleiben unverändert.
- **Funktioniert:** Gambarino 400 und Melodrama 600 laden in den Vorschauen. Bei 375 und 1440 px geprüft: keine sichtbaren überlaufenden Überschriften, keine horizontale Seitenbreite und keine JavaScript-Fehler.
- **Nicht funktioniert / offen:** Lucas hat noch keine der beiden Varianten ausgewählt. Die Vorschauen benötigen für die Display-Schrift eine Verbindung zu Fontshare.

### 21.10.2026 · Codex · Gambarino als Hauptschrift
- **Versucht:** Lucas wählte nach dem Vergleich mit Lora Gambarino. Die Display-Schrift der Hauptseite und des Styleguides wurde auf Gambarino 400 umgestellt; Instrument Sans und die gezeichnete Italiana-Wortmarke bleiben. Die Schrift kommt über die offizielle Fontshare-API, weil ihre Lizenz die Weitergabe der Datei über das öffentliche Repository ausschließt. Der Datenschutzhinweis wurde an die externe Schriftverbindung angepasst.
- **Funktioniert:** Die bestehende Gambarino-Vorschau diente als Vorlage für Schriftgewicht und Laufweite; Hauptseite, Styleguide und Markenprofil sind auf denselben Stand gebracht. Gambarino lädt bei 375 und 1440 px auf allen fünf Seiten, ohne sichtbare überlaufende Überschriften, horizontale Seitenbreite oder JavaScript-Fehler. Mobiles Menü und Behandlungs-Akkordeon funktionieren.
- **Nicht funktioniert / offen:** Die Datenschutzerklärung enthält weiterhin andere alte Platzhalter und benötigt eine fachliche Prüfung. Die Schrift hängt von der Erreichbarkeit von Fontshare ab; die lokal gespeicherte Lora ist Fallback.

### 21.10.2026 · Codex · Handskizze als neues PM-Monogramm
- **Versucht:** Lucas gab eine Bleistiftskizze als Website-Logo vor und bat um eine digitale Figma-Fassung; den schwarzen Strich rechts oben sollte ich ignorieren. Ich rekonstruierte den durchgehenden P-zu-M-Linienzug und den separaten P-Stamm als zwei Vektorpfade.
- **Funktioniert:** Editierbare Figma-Komponente `32:5` und Präsentationsrahmen `33:2`; SVG, Originalskizze, Vorschau und Notizen in `branding/assets/pm-beauty-logo/versions/v9/`. Header, mobiles Menü und Footer verwenden das neue Monogramm mit `currentColor`; CSS-Cache v67. Der aktuelle Styleguide und das Markenprofil beschreiben nun den neuen Stand. Figma- und Browser-Ansicht visuell kontrolliert.
- **Nicht funktioniert / offen:** Die frühere E-Schreibanimation bleibt als archiviertes Beispiel im Styleguide. Ein echter 375-px-Gerätetest auf dem Handy steht noch aus.

### 21.10.2026 · Reinzeichnung v10 des PM-Monogramms, Schreibanimation mit Reglern (Claude in der Cloud)
- **Versucht:** Lucas wollte die Skizze genauer und sauberer: ein perfektes Rechteck, aus dem nur der Schnörkel oben links und der Schwung unten rechts herausragen, die M-Spitzen auf Höhe der oberen Linie, unten links eine fast spitze Ecke. Gebaut als Mittellinie aus Geraden und Kreisbögen mit eigener Breite pro Abschnitt, gerastert und per potrace zum Vektor. Nach Rückmeldung: mehr Schwung (größere Radien, leicht gebogene Diagonalen, Breitenwechsel nur in den Kurven) und unten rechts kein Punkt am Strich, sondern ein Tropfen wie in der Skizze. Dazu ein Regler für die Strichstärke und eine Schreibanimation im Styleguide, deren Dauer, Kurve und Pausen Lucas selbst einstellt.
- **Funktioniert:** Die Rahmenmaße werden per Messung gelöst (Spitzen und Linie oben exakt auf y 137, V und Grundlinie unten auf 897). Der Regler tauscht zwischen 21 vorab gerenderten Stärken (60–160 %), damit jede Stufe ein sauberer Vektor bleibt. Die Animation legt eine Maske aus 173 kurzen Mittellinien-Stücken über den Umriss und schreibt sie per `stroke-dashoffset` nacheinander: erst der Zug von links nach rechts, Absetzen, zuletzt der P-Stamm (Reihenfolge auf Lucas' Wunsch: der abgesetzte Stamm kommt als Letztes). Die Kurve gilt wahlweise für den ganzen Zug oder für jeden Teilstrich zwischen zwei Ecken; „Werte kopieren“ gibt die Einstellung als Text aus. Geprüft bei 1440 px: keine JavaScript-Fehler, Zwischenbilder zeigen die richtige Reihenfolge.
- **Nicht funktioniert / offen:** Zwei frühere Fassungen wurden verworfen: zuerst kantige Übergänge zwischen dünnen und dicken Strichen, dann ein Schnörkel unten rechts als gespiegelter Haken oben links, der nicht zur Skizze passte. Dort, wo sich zwei Striche eng berühren (V-Spitze, Kopf des Schnörkels), erscheint der folgende Strich ein paar Pixel früher. v10 ist noch nicht auf der Website; die Werte der Animation stehen noch nicht fest.

### 21.10.2026 · Neues Raumbild im Kontakt, Farblisten gekürzt, P-Stamm zuletzt (Claude in der Cloud)
- **Versucht:** Lucas schickte ein neues Stimmungsbild (rosa Ausstellungsraum mit Kleid) für das Bild unten links im Kontakt, bei gleichem Rahmen. Im Styleguide sollen Braun und Pink nur noch je fünf Farben zeigen, und die Schreibanimation soll den abgesetzten P-Stamm als Letztes zeichnen.
- **Funktioniert:** `images/studio-pink.jpg` (ganzes Querformat, 1080 × 810) ersetzt `studio-light.jpg`; der Rahmen und sein Ausschnitt (`object-position` 50 % 40 %) blieben, am Desktop (427 × 283) sitzen Vitrinen, Kleid und Blumenwand im Bild, am Handy (164 × 164) das Kleid mittig. Die Farbreihen zeigen Background, Surface, Text, Accent und Button; Raised, Muted und Border sind aus der Liste raus (die CSS-Rollen gibt es weiter). Die Animation schreibt erst den Zug von links nach rechts, setzt ab und zieht dann den P-Stamm; der Regler heißt jetzt „Absetzen vor P“.
- **Nicht funktioniert / offen:** Die Farbbalken unter „Bedeutung“ zeigen weiter sechs Töne (mit Taupe bzw. dem mittleren Pink). Auch das neue Raumbild ist nicht Paulas Studio.

### 21.10.2026 · v10 auf der Website, Styleguide nur noch mit v10, fünf Töne in „Bedeutung“ (Claude in der Cloud)
- **Versucht:** Lucas entschied sich für die Reinzeichnung v10: Sie ersetzt die Handzeichnung v9 auf der Website, und v9 verschwindet ganz aus dem Styleguide. Die Farbbalken unter „Bedeutung“ sollen wie die Listen nur fünf Töne zeigen.
- **Funktioniert:** `index.html` trägt v10 einmal als Symbol, Header, mobiles Menü und Footer verweisen darauf; `currentColor` und der pinke Header funktionieren unverändert. Im Styleguide zeigen Logo-Abschnitt, Größen, Inhaltsleiste, Prinzip-Kachel, Visitenkarte, Gutschein und Instagram-Vorschau v10; der Strichstärke-Regler wirkt auf alle. Die Balken zeigen Background, Surface, Accent, Button und Text (Taupe und das mittlere Pink sind raus, Taupe bleibt im Text erklärt). Geprüft bei 375 und 1440 px: Logo 64 × 38 bzw. 72 × 43 px, keine horizontale Scrollbreite, keine JavaScript-Fehler.
- **Nicht funktioniert / offen:** v10 ist im Verhältnis etwas breiter als v9 (1,67 : 1 statt 1,6 : 1), bei gleicher Logobreite also 2 px flacher. Ein Test auf dem echten Handy steht aus.

### 21.10.2026 · Neue Collage „Arbeiten aus dem Studio“ mit acht Fotos (Claude in der Cloud)
- **Versucht:** Lucas nahm vier Bilder heraus (Braue, orange Maske, ganzes Gesicht, dunkelroter Einzelnagel), schickte fünf neue (Brauen und Wimpern, Tuchmaske, Blüten-Nägel, Schildpatt-Nägel, Microneedling) und wollte die roten Lippen so eng, dass das Auge nicht mehr zu sehen ist. Neues Raster, gleicher Look, Luft unten rechts.
- **Funktioniert:** Raster jetzt 4 Spalten × 12 Einheiten, damit acht Bilder hineinpassen und die Formate zu den Fotos passen: Spalte 1 Lippen (fast quadratisch) über Brauen/Wimpern (hoch), Spalte 2 Lashlift (hoch) über Schildpatt (quadratisch), Spalte 3 Blüten-Nägel (quadratisch) über Microneedling (hoch), Spalte 4 Tuchmaske (4:5) über den roten Nägeln als flacher Streifen, darunter Luft. Jeder Ausschnitt wurde bei 1440, 1024 und 375 px angesehen: Gesichter, Nägel und Lippen bleiben ganz im Bild. Die Lippen sind ein neuer Ausschnitt aus dem Original (`lips-zoom.jpg`). CSS-Cache v68.
- **Nicht funktioniert / offen:** Ob die neuen Fotos Paulas eigene Arbeiten sind, ist nicht bestätigt (Abschnitt heißt „Arbeiten aus dem Studio“). Die entfernten Bilder liegen weiter in `images/`, der Styleguide nutzt teils noch `lashes.jpg` und `nails.jpg`.

### 21.10.2026 · Moodboard im Styleguide neu, Bilder leicht getönt (Claude in der Cloud)
- **Versucht:** Lucas wollte im Moodboard nur noch Fotos mit Menschen, die auch auf der Website stehen; Stimmungsbilder (Wand, Rose, Lack, Stoff, Interieur) bleiben. Alle Bilder sollen farblich in der braunen oder der pinken Palette liegen.
- **Funktioniert:** Getauscht: Rosé-Nägel → Blüten-Nägel, Nude-Hand → rote Nägel (flacher Ausschnitt), Lippen → `lips-zoom.jpg`, Wimpern-Referenz → Microneedling, Schokobraun-Nagel → Schildpatt, Wimpernverlängerung → Brauen und Wimpern; Paula im Studio und Lashlift bleiben. Die Tönung ist eine Farbfläche im Mischmodus „color“ über jedem Foto (28 % Deckkraft, Braun oder Pink aus den Quellwerten der Website), die Fotodateien bleiben unverändert und die Stärke ist in `--tint` einstellbar. „Aa“ heißt jetzt Gambarino statt Italiana. Geprüft bei 1440 px, ohne Fehler.
- **Nicht funktioniert / offen:** Die alten Referenzfotos mit Menschen (`mood-nails-pink`, `mood-nails-rose`, `mood-lashes`) liegen noch in `images/`, werden aber nicht mehr verwendet.

### 21.10.2026 · Website-Fotos getönt, Kurven-Werkzeug verständlicher (Claude in der Cloud)
- **Versucht:** Lucas wollte die Fotos auf der Website wie im Moodboard leicht in Braun oder Pink tönen. Außerdem war das Kurven-Werkzeug der Schreibanimation unverständlich (vier Zahlen x1/y1/x2/y2 und ein Kurvenbild mit Anfassern).
- **Funktioniert:** Die Tönung ist jetzt eine gemeinsame Klasse in `style.css`: Collage, Über-mich-Foto, beide Schulungsbilder und beide Raumbilder im Kontakt; am Handy liegt sie nur über dem Foto, nicht über dem 10-px-Rand. Der Hero bleibt ungetönt. CSS-Cache v69. Das Werkzeug spricht jetzt Alltagssprache: „Tempo“ mit benannten Vorschlägen, „Anlauf“ und „Auslauf“ als Regler mit Wörtern (sofort … sehr sanft), „Bremsen in Ecken“ ja/nein. Das Bild zeigt das Tempo des Stifts statt der abstrakten Kurve (hoch = schnell) mit einem Punkt, der beim Abspielen mitläuft. Die vier Kurvenwerte sind unter „Feineinstellung“ eingeklappt. Geprüft bei 1440 und 375 px, ohne Fehler.
- **Nicht funktioniert / offen:** Ein Test auf dem echten Handy steht aus.

### 21.10.2026 · Zwei Strichstärken für das Monogramm (Claude in der Cloud)
- **Versucht:** Lucas lud die 130-%-Fassung aus dem Styleguide herunter: Sie soll klein in der Ecke stehen, sonst gilt 120 % als Standard.
- **Funktioniert:** Die hochgeladene Datei ist identisch mit der 130-%-Stufe aus `pm-monogram-v10.json`. Website: Header und mobiles Menü 130 %, Footer 120 %. Styleguide: Regler startet bei 120 %, die kleinen Logos (Inhaltsleiste, 64- und 72-px-Größe, Instagram-Avatar) stehen fest auf 130 %. Geprüft bei 1440 px, ohne Fehler.
- **Nicht funktioniert / offen:** Ob 130 % im Header auf dem Handy-Display gut aussieht, ist noch am Gerät zu prüfen.

### 21.10.2026 · Kühle Fotos stärker getönt (Claude in der Cloud)
- **Versucht:** Lashlift und Tuchmaske wirkten trotz Tönung noch bläulich.
- **Funktioniert:** Die Wärme jedes Fotos gemessen (Rot minus Blau im Mittel) und die Mischung „color“ nachgerechnet: Die warmen Fotos liegen mit 28 % bei 55–80, die fast grauen nur bei 30–35. Deshalb tragen die kühlen Fotos eine stärkere Tönung inline (`--tint`): Lashlift .5, Tuchmaske .6, Paula im Studio .45 (bei .6 wirkte das Porträt sepia), im Moodboard zusätzlich Stoff und Lack .5. CSS-Cache v70.
- **Nicht funktioniert / offen:** –

### 21.10.2026 · Werte der Schreibanimation festgelegt (Claude in der Cloud)
- **Versucht:** Lucas hat die Schreibanimation mit den Reglern eingestellt und die Werte kopiert.
- **Funktioniert:** Sie sind jetzt der Standard im Styleguide: Kurve `cubic-bezier(.53, 0, .7, 1)` (Anlauf sanft, Auslauf kurz) als erster Vorschlag „Festgelegt“, bremst an jeder Ecke, Dauer 2,6 s, Pause vor dem P-Stamm 0,5 s, Stehen am Ende 1,6 s, Strichstärke 120 %. Die Bewegungstabelle nennt dieselben Werte.
- **Nicht funktioniert / offen:** Die Animation läuft bisher nur im Styleguide, nicht auf der Website.

### 21.10.2026 · Pinke Abschnitte im Styleguide (Claude in der Cloud)
- **Versucht:** Auf der Website wechseln Braun und Pink, im Styleguide war fast alles braun.
- **Funktioniert:** Prinzip, Schrift, Komponenten, Bildsprache und Sprache stehen jetzt in der pinken Farbwelt (`theme-pink`), als abgerundete Fläche wie Behandlungen und Bewertungen auf der Website; Panels darin eine Stufe heller. Dabei auch „Bildsprache“ auf die Fotos der Website umgestellt (vorher alte Lippen-, Nagel- und Wimpernbilder, die nicht mehr auf der Seite sind), mit Tönung. Geprüft bei 1440 px, ohne Fehler.
- **Nicht funktioniert / offen:** –

### 21.10.2026 · Pink nur an einzelnen Stellen statt als Abschnitts-Fläche (Claude in der Cloud)
- **Versucht:** Die pinken Flächen hinter ganzen Abschnitten gefielen Lucas nicht. Pink soll nur einzelne Panels und Schrift färben, und nur dort, wo es inhaltlich passt.
- **Funktioniert:** Flächen entfernt. Pink sind jetzt: das Panel „Qualität“ (echte Bewertungen), das Prinzip-Panel „Bewegung“ (Behandlungs-Kategorie), in „Schrift“ die Zeilen mit dem Behandlungsnamen und dem Label „Behandlungen“, das Akkordeon in „Komponenten“ und die Schrift im Abschnitt „Bildsprache“ (Ergebnisse). Alles wie auf der Website: Pink steht für Behandlung und Ergebnis.
- **Nicht funktioniert / offen:** –

### 21.10.2026 · Linie fährt aus und Logo schreibt sich auf der Website; zwei Styleguide-Abschnitte pink (Claude in der Cloud)
- **Versucht:** Die Bewegung „Linie fährt aus“ aus dem Styleguide sollte auf die Website, und das Header-Logo soll sich beim ersten Laden schreiben und bei Hover erneut. Im Styleguide sollten „Prinzip“ und „Abstände & Radien“ ganz pink werden (Panels und ihre Farben).
- **Funktioniert:** `js/frame-draw.js`: Kontakt-Panels, Öffnungszeiten, Gutscheine, Bewertungen und die beiden pinken Abschnitts-Flächen zeichnen ihren 1-px-Rahmen in 2 s im Uhrzeigersinn, sobald sie ins Bild kommen, mit Maus bei Hover erneut. `js/logo-write.js`: Das Header-Logo schreibt sich mit den festgelegten Werten (cubic-bezier(.53, 0, .7, 1), 2,6 s, 0,5 s Pause, zuletzt der P-Stamm), einmal pro Sitzung beim ersten Laden und mit Maus bei jedem Hover; bis zum Start ist es unsichtbar (Kopf-Skript, spätestens nach 4 s sichtbar). Bei „Bewegung reduzieren“ beides aus. Prinzip und Abstände & Radien stehen im Styleguide jetzt komplett in Pink (ohne Hintergrundfläche). CSS-Cache v71. Geprüft bei 1440 px: Zwischenbilder des Logos, Rahmen zur Hälfte und fertig gezeichnet, keine Fehler.
- **Nicht funktioniert / offen:** Test auf dem echten Handy steht aus (dort läuft das Logo nur beim ersten Laden, ohne Hover).

### 21.10.2026 · Codex · Tintenreferenzen, zentrierter P-Stamm und Schreibmaske
- **Versucht:** Lucas' zwei neuen Tintenreferenzen als gefüllte Vektorkonturen nachgezeichnet. Die Fassung ohne P-Stamm bestimmte die Hauptproportionen; der separate Stamm wurde 30 SVG-Einheiten unter seine nachgezeichnete Position gesetzt. Die Header-Schreibanimation auf die neue Kontur abgestimmt.
- **Funktioniert:** v11 enthält beide Varianten und ihren reproduzierbaren Quellcode. Figma-Komponenten `38:7` (mit Stamm) und `38:10` (ohne). Website und aktueller Styleguide zeigen v11. Die bisherige Animationsmaske deckte von v11 nur rund 51 % der Fläche; die neue Mittellinie deckt in der Rasterprüfung mehr als 99,9 % und erhält 2,6 s Schreibzeit plus 0,5 s Pause. Bei 375 px im Browser: 64 px Logo, kein horizontaler Überlauf; Start- und Endzustand der Animation geprüft. Ein fehlerhafter negativer `rootMargin` bei sehr kleiner Fensterhöhe ist abgefangen.
- **Nicht funktioniert / offen:** Bewegung auf einem physischen Handy bleibt ungeprüft. Der v10-Strichstärken-Regler und seine Schreibdemo bleiben im Styleguide als Archiv erhalten.

### 21.10.2026 · Codex · Korrektur: v10 beibehalten, nur P-Stamm und Animation
- **Versucht:** Lucas stellte klar, dass die bereits verwendete v10-Reinzeichnung die richtige Logoform war. Die irrtümlich aktivierte v11-Rekonstruktion wurde auf Website und Styleguide zurückgenommen. Auf Basis von v10 wurde eine neue, getrennte v12 erstellt, die ausschließlich den losen linken P-Stamm um 70 SVG-Einheiten nach unten verschiebt.
- **Funktioniert:** Die v10-Hauptkontur, die beiden festgelegten Strichstärken und das Timing der Schreibanimation bleiben erhalten. Der P-Stamm der Animationsmaske folgt derselben Verschiebung wie der sichtbare Pfad; dadurch stimmen Zwischenbild und fertiges Logo überein. v10 und v11 bleiben archiviert.
- **Nicht funktioniert / offen:** Die vorherige v11-Aktivierung war ein Missverständnis. Ein Test auf einem physischen Handy steht weiter aus.

### 21.10.2026 · Codex · Schreibmaske auf volle Logo-Breite angepasst
- **Versucht:** Den von Lucas gemeldeten Sprung zwischen dünner Animation und dicker Endfassung in einer frischen Browsersitzung reproduziert und Bilder direkt vor und nach Ende der Maske verglichen.
- **Funktioniert:** Die Mittellinien-Maske ist nun breit genug, um beim Schreiben die volle v10/v12-Vektorkontur freizulegen. Vorher/Nachher-Bilder bei 2,67 s und 3,22 s zeigen dieselbe Strichstärke. Die Styleguide-Demo nutzt dieselbe Maskenbreite. Logoform und P-Stamm-Position blieben unverändert.
- **Nicht funktioniert / offen:** Ein Test auf einem physischen Handy steht weiter aus.

### 21.10.2026 · Codex · Maniküre als interaktives Panel-Paar
- **Versucht:** Eigenständige HTML-Spielwiese mit den fünf Maniküre-Leistungen aus Lucas’ Screenshot: links nur Namen, rechts die bestehende Beschreibung. Zwei gleich hohe, vollständig sichtbare Desktop-Panels; Auswahl per Hover, Klick und Tastatur.
- **Funktioniert:** `branding/experiments/manicure-panels.html` enthält CSS, JavaScript und beide Schriftdateien eingebettet und funktioniert lokal ohne Netzwerkanfragen. Bewegte Auswahlfläche mit unterbrechbarer Feder, kurzer Textwechsel und reduzierte Bewegung berücksichtigt. Browserprüfung bei 375 px ohne horizontalen Überlauf sowie bei 1280 × 800 und 1440 × 900 ohne Seitenscrollen; Klick, Hover, Pfeiltasten und schnelle Wechsel geprüft, keine JavaScript-Fehler. Hauptseite unverändert.
- **Nicht funktioniert / offen:** Gestaltung und ausführlichere Inhalte des rechten Panels folgen Lucas’ nächster Rückmeldung. Für diesen ersten Stand bestehende Kurzbeschreibungen übernommen; Display-Schrift nutzt die bereits vorhandene lokale Lora-Fallbackschrift statt extern geladenem Gambarino. Erster Teststart scheiterte am fehlenden Playwright-Browser; mit installiertem Chrome erfolgreich geprüft.

### 21.10.2026 · Codex · Rechter Rahmen als abstrakter Nagel
- **Versucht:** Lucas’ Referenz direkt auf die Panel-Fläche übertragen: French als weiße Spitze mit geschwungener Oberkante, Babyboomer als weicher weißer Verlauf von unten nach oben. French/Babyboomer für den Vergleich in zwei auswählbare Einträge getrennt.
- **Funktioniert:** Rechtes Panel ist eine textfreie, abstrakte Nagelfläche; Spitze, Verlauf, Glanz und Farbfläche reagieren auf Hover, Klick und Tastatur. French ist der Startzustand. Lokale Einzeldatei bleibt offline nutzbar. Browserprüfung bei 375 px sowie 1280 × 800 und 1440 × 900: kein horizontaler Überlauf bzw. Desktop-Scrollen; French, Verlauf, Tastatur und reduzierte Bewegung geprüft, keine JavaScript-Fehler oder Netzwerkanfragen.
- **Nicht funktioniert / offen:** Glanz, Gel und Überlänge sind erste abstrakte Studien; weitere Gestaltung nach Lucas’ Rückmeldung. Die neuen unsichtbaren Beschreibungen erklären nur die Visualisierung, keine zusätzlichen Leistungsversprechen.

### 21.10.2026 · Codex · Schmaleres Nagel-Panel, Auffüllen und Glow
- **Versucht:** Rechten Rahmen gegenüber dem vorherigen Stand um 35 % verschmälert, linke Breite beibehalten. Für beide Auffüllen-Studien wächst die zunächst fehlende untere Panel-Partie in einer 4-Sekunden-Schleife nach; Überlänge startet mit größerem fehlendem Anteil. Glow als zusätzliche experimentelle Option nach Lucas’ beiden Referenzbildern.
- **Funktioniert:** Auffüllen bewegt die gerundete untere Rahmenkante ohne Layoutsprung; Glow zeigt eine rosa-perlmuttfarbene Fläche, Glanzreflexe und ein weich leuchtendes Band, das auf und ab wandert. Browserprüfung: rechte Breite bei 1280 und 1440 px jeweils 65 % des vorherigen Werts, kein Desktop-Scrollen, bei 375 px kein horizontaler Überlauf. Animationszustände und 4000-ms-Dauer geprüft; Hover/Klick und reduzierte Bewegung funktionieren, keine JavaScript-Fehler.
- **Nicht funktioniert / offen:** Glow ist eine abstrakte Materialstudie und keine neu behauptete Studio-Leistung. Visuelle Feinabstimmung folgt Lucas’ Rückmeldung.

### 21.10.2026 · Codex · Fünf Looks mit sichtbarer Beschreibung
- **Versucht:** Lucas’ neue Auswahl Basic, French, Color, Ornament und Glow umgesetzt. Sichtbare Überschrift und Beschreibung in das rechte Panel zurückgebracht. Rechtes Panel nochmals um 30 % gegenüber dem unmittelbar vorherigen Stand verschmälert, linke Breite beibehalten.
- **Funktioniert:** Bei 1440 px ist rechts die Breite von 371 auf 260 px reduziert, bei 1280 px von 330 auf 231 px. Color wechselt mit weichen Farbübergängen alle vier Sekunden zwischen Petrol, Pflaume, Terrakotta und Nachtblau; Ornament zeigt kleine facettierte Steine oben links, unten rechts und am rechten Rand. Alle fünf Beschreibungen sichtbar und innerhalb des Panels, Hover/Klick/Tastatur synchron. Browserprüfung bei 375, 1280 und 1440 px: kein horizontaler Überlauf, Desktop ohne Scrollen; Farbzustände, 16-Sekunden-Gesamtzyklus, reduzierte Bewegung und Offline-Nutzung geprüft, keine JavaScript-Fehler.
- **Nicht funktioniert / offen:** Die frühere textfreie Fassung entsprach nicht Lucas’ Wunsch nach Beschreibung. Auffüllen und Babyboomer sind in dieser Iteration durch die ausdrücklich gewünschten fünf Looks ersetzt; frühere Stände bleiben in Git erhalten. Texte beschreiben die experimentellen Looks, keine neuen Studio-Angebote.

### 21.10.2026 · Codex · Flache Nagel-Panels mit echtem 3D-Rand
- **Versucht:** Lucas’ Portfolio-Referenz in die Maniküre-Spielwiese übertragen: breite flache Vorderfläche, weich gerundeter Rand, glänzende farbige Lackoberfläche. Beide Panels gegenüber dem letzten Stand um 15 % verbreitert; alle Looks und das linke Panel haben denselben sanft durchgebogenen unteren Abschluss.
- **Funktioniert:** Three.js 0.184.0 rendert zwei flache Extrusionskörper mit geglätteter Fase, Clearcoat-Material, Studio-Umgebung und leichter mausabhängiger Beleuchtung. Überschriften und Beschreibungen bleiben als flaches HTML lesbar und bedienbar. French-Spitze liegt als Textur auf dem 3D-Körper, Color wechselt weiterhin alle vier Sekunden, Glow bewegt den Perlmuttschimmer; Ornament nutzt facettierte 3D-Steine. Look-Wechsel blenden in 450 ms über. Die HTML-Datei enthält Renderer, Schriften und MIT-Lizenz vollständig eingebettet, etwa 668 kB; editierbare Quelle und reproduzierbares Build-Skript liegen daneben. Browserprüfung bei 375, 1280 und 1440 px: kein horizontaler Überlauf, Desktop ohne Scrollen; +15 % Breite gemessen (rechts 299 statt 260 px bei 1440 px). Alle fünf Looks, sichtbare Texte, Farbwechsel, Tastatur, reduzierte Bewegung, Offline-Nutzung und interaktiver CSS-Fallback bei deaktiviertem WebGL geprüft; keine JavaScript-Fehler im 3D-Test.
- **Nicht funktioniert / offen:** Erste Beleuchtung war zu ausgewaschen und wurde reduziert. Beim Wechsel zur reduzierten Bewegung lief die Licht-Nachführung kurz weiter; korrigiert und erneut geprüft. Kein Leistungstest auf einem physischen Handy; Frontflächen sind bewusst flach, die Glanzwirkung kombiniert echte Materialreflexe mit weichen Reflextexturen. Hauptwebsite unverändert.

### 21.10.2026 · Codex · Nur der rechte Rahmen ist ein Nagel; Referenzlicht und Weinrot
- **Versucht:** Lucas’ 13 bereitgestellte Nagel-Referenzen gesichtet, insbesondere tiefrote Lacknägel, schmale geschlossene Lichtreflexe und French-Varianten. Die widersprüchliche Seitenangabe zur unteren Kurve als „links normales Panel, rechts Nagelform“ ausgelegt und Lucas vorab so mitgeteilt.
- **Funktioniert:** Linker Rahmen ist wieder eine flache pinke HTML-Fläche mit normalen 32-px-Ecken am Desktop; kein linkes 3D-Mesh und kein gemeinsamer Canvas mehr. Ausschließlich rechts wird der Nagel samt gekrümmtem unterem Rand gerendert. Glow hat eine tief weinrote Basis und einen mittigen Lichtschein, der vor den seitlichen Rändern ausläuft (Gradient-Radius 44 % der Breite, je 6 % Abstand). Lichtreflexe schmaler und um eine feine längliche Reflexkontur ergänzt; Nude-Looks haben dezent dunklere Ränder. Textschatten erhält die Lesbarkeit auf dem bewegten Schimmer. Browserprüfung: alle fünf Looks, unveränderte Panelmaße, 375 px ohne horizontalen Überlauf, Desktop ohne Scrollen; Farbwechsel, Tastatur, Offline-Nutzung, reduzierte Bewegung und WebGL-Fallback bestanden. Zusätzlich geprüft: Canvas nur rechts, linke Hintergrundfläche deckend und unterer Eckenradius wieder 32 px.
- **Nicht funktioniert / offen:** Die vorige gemeinsame 3D-Fläche war für das linke Panel zu viel. Referenzen dienen nur der Gestaltung und werden nicht in das öffentliche Repo übernommen. Kein Leistungstest auf einem physischen Handy.

### 21.10.2026 · Codex · Wiederkehrende Nagel-Animationen und runde Silbersteine
- **Versucht:** Lucas’ gewünschte Bewegung in die 3D-Fassung übertragen: French-Spitze einblenden, Basic von kürzerer Länge bis zur French-Endlänge wachsen lassen, Ornament-Steine nacheinander setzen. Neue Stein-Referenzen als runde, silbrig glänzende Schmucksteine interpretiert.
- **Funktioniert:** Vier-Sekunden-Schleifen: Basic wächst bei festgehaltener Oberkante von 78 % auf volle Länge, hält und setzt zurück; French blendet die weiße Spitze ein und aus. Zwölf Steine erscheinen innerhalb der bisherigen Cluster zeitversetzt mit je 160 ms Abstand und werden vor dem nächsten Durchgang zurückgesetzt. Steine sind jetzt runde 3D-Silberkuppeln mit dunklerem Metallrand und realen Materialreflexen statt länglicher facettierter Kristalle. HTML-Text bleibt unskaliert. Browser-Bildvergleiche bestätigen Basic-Wachstum, French-Fade und gestaffelte Ornament-Zustände; alle drei Looks stehen bei reduzierter Bewegung vollständig und statisch. Offline-Nutzung, Tastatur, mobiler Textsitz und WebGL-Fallback weiterhin geprüft; keine JavaScript-Fehler. Statische Basic-/Ornament-Texturen werden während der Geometriebewegung nicht unnötig neu gezeichnet.
- **Nicht funktioniert / offen:** Die vorige 3D-Fassung hatte für Basic und Ornament nur statische Endzustände. Bewegung auf einem physischen Handy bleibt ungeprüft.

### 21.10.2026 · Codex · Durchgehende bewegte Reflexe und sanfterer Glow
- **Versucht:** Lucas’ Wunsch nach beweglichem Glanz über alle Looks umgesetzt, ohne Neustart oder Positionssprung beim Wechsel. Den separaten Glow auf dem roten Nagel reduziert.
- **Funktioniert:** Gemeinsame, vom gewählten Look unabhängige Uhr bewegt Reflexstreifen, Reflexkontur und Studiolicht ruhig weiter. Basic kompensiert seine Längenänderung in den Reflexkoordinaten, damit das Licht beim Wechsel zur vollen Länge nicht mitspringt. Design-Crossfade und Glanz sind getrennt, sodass keine alte Reflexposition mitüberblendet wird. Die Deckkraft des roten Glow-Verlaufs ist ungefähr halbiert; der schmale Glanz bleibt sichtbar. Browserprüfung verfolgt tatsächlich gezeichnete Reflexpositionen: kontinuierliche Bewegung beim Wechsel durch French, Ornament, Color, Glow und Basic ohne Phasen-Reset. Reduzierte Bewegung steht still; Farbwechsel, Tastatur, mobiler Textsitz, Offline-Nutzung und WebGL-Fallback bestanden.
- **Nicht funktioniert / offen:** Eine erste Testannahme verlangte beim Wechsel zu reduzierter Bewegung zusätzlich die Position exakt null. Das war für die gewünschte statische Darstellung nicht erforderlich; der korrigierte Test prüft Stillstand zwischen zwei Messungen. Physisches Handy weiterhin ungeprüft.

### 24.10.2026 · Claude · Neue Aufgabe und ChatGPT-Briefing
- **Versucht:** Ammers Aufgabe für Mo 26.10. (Screenshot) in `KURS.md` übernommen und gegen den Repo-Stand abgeglichen. Für die fehlende Anwendungs-Visualisierung ein Briefing geschrieben (`branding/CHATGPT-BRIEFING.md`), damit ChatGPT Bilder und Video mit Marke, Farben und Regeln erzeugen kann.
- **Funktioniert:** Das Projekt hatte vorher keine Anleitung für ChatGPT, nur Codex-Anweisungen. Das Briefing legt Farbwerte, Logo-Regel (nie von der KI neu zeichnen lassen), Referenzdateien, harte Regeln (Paula ist real, keine erfundenen Fakten) und Startprompts fest.
- **Nicht funktioniert / offen:** Noch kein Mockup erzeugt. Ob ChatGPT das Logo sauber wiedergibt, ist ungeprüft, vermutlich nicht. Deshalb Logo und Text nachträglich selbst einsetzen.

### 26.10.2026 · Claude · Logo-Entscheidung für die Abgabe
- **Versucht:** Lucas entscheidet: Für die Präsentation gilt das gezeichnete PM-Monogramm, das sich von links nach rechts schreibt. Die frühere E-Wortmarke samt Animation bleibt im Styleguide, wird aber ausdrücklich als „ALT“ gekennzeichnet.
- **Funktioniert:** Monogramm und Schreibanimation standen schon im Styleguide, nur die Kennzeichnung der alten Animation war zu leise („Archiv“).
- **Nicht funktioniert / offen:** Die Live-Website zeigt im Header seit einem Commit vom 25.10. die Text-Wortmarke statt des Monogramms. Entscheidung offen, ob die Website angeglichen wird.

### 26.10.2026 · Codex · Vier Anwendungsfotos mit Direktblitz
- **Versucht:** Startprompts aus `branding/CHATGPT-BRIEFING.md` für Visitenkarten und Hand auf Leinen übernommen und um eine separate Terminkarte sowie eine Papierverpackung ergänzt. Vier Einzelgenerierungen mit dem eingebauten `image_gen.imagegen`; die konkrete Modell-ID wird vom Werkzeug nicht ausgegeben. Lucas' ausdrückliche Direktblitz-Vorgabe ersetzt für diese Motive die ältere weiche Lichtregel.
- **Funktioniert:** Vier PNGs in `branding/assets/mockups/`, jeweils 1536 × 1024 px. Visuell geprüft: warme Braun-/Beigepalette, harte Blitzschatten und glänzende Reflexe; keine Schrift, Logos oder Gesichter. Karten und Verpackung haben freie Flächen für Lucas' nachträglichen Logo-Einsatz; die Hand zeigt fünf plausibel angeordnete Finger. Vollständige verwendete Prompts, Werkzeug-/Modellangabe und Kennzeichnungshinweise in `branding/assets/mockups/PROMPTS.md`. Je Motiv ein Durchlauf ohne Nachbearbeitung. Keine Änderungen an Website-Dateien.
- **Nicht funktioniert / offen:** Logo und Texte fehlen absichtlich und werden von Lucas eingesetzt. Die Bilder sind KI-generierte Anwendungskonzepte, keine echten Studiofotos oder Arbeiten von Paula. Einbindung in den Styleguide mit Bildunterschrift „KI-generiertes Mockup“ steht noch aus; kein Video erzeugt.

### 26.10.2026 · Codex · Empfang mit Theken- und Wandlogo
- **Versucht:** Zwei zusätzliche Salon-Mockups nach Lucas' drei hochgeladenen Empfangsreferenzen: ein kleines Logo auf der Thekenfront und ein größeres Logo an der Rückwand. Layouts nur lose übernommen; Materialien, Rundungen und Braun-/Beigepalette auf PM Beauty abgestimmt, Direktblitz-Look beibehalten. Originales v12-SVG unverändert mit Quick Look als Bildvorlage gerendert und mit „use exactly, do not redraw“ an Imagegen übergeben.
- **Funktioniert:** Zwei Hochformat-PNGs mit jeweils 1024 × 1536 px in `branding/assets/mockups/`: `rezeption-thekenlogo-direktblitz-v1.png` und `rezeption-wandlogo-direktblitz-v1.png`. Beide visuell gesichtet: gewünschte Logo-Positionen, keine Personen, keine fremden Markenzeichen oder zusätzliche Schrift. Je Motiv ein Generierungsdurchlauf. Vollständige Prompts und verwendete Referenzen in `PROMPTS.md` ergänzt. Keine Website-Dateien geändert.
- **Nicht funktioniert / offen:** Die Räume sind frei entworfene KI-Anwendungskonzepte und zeigen nicht Paulas tatsächliches Studio. Logoform visuell gegen die Vorlage geprüft; pixel- bzw. vektorgetreue Einbettung ist durch die Generierung nicht belegt. Einbindung in den Styleguide und Kennzeichnung als „KI-generiertes Mockup“ bleiben offen.

### 26.10.2026 · Codex · Einheitliche Bildserie, Logo-Varianten und Styleguide-Integration
- **Versucht:** Lucas korrigiert die frühere Vorgabe „ohne Logo“ und wünscht mehr Pink. Karten und Tasche auf Basis der freigegebenen Bilder mit der originalen v12-Logovorlage bearbeitet, danach Logo auch auf dem pinken Anhänger ergänzt. Zusätzlich neun zusammenpassende Beauty-/Materialmotive, ein Glasbehälter mit eingearbeitetem Glaszeichen und eine pinke Wattestäbchen-Verpackung mit weißem Etikett/Deckel erzeugt. Kurztext „Wattestäbchen / Für kleine Details.“ mit Lucas' Freigabe formuliert. Anschließend auf ausdrücklichen Auftrag direkt im Styleguide eingebunden.
- **Funktioniert:** Moodboard mit elf KI-Fotomotiven, Bildsprache mit sechs Details und Anwendung mit sieben Foto-Mockups plus bestehender Handyvorschau umgesetzt. Alle neun neuen Serienbilder haben 1024 × 1536 px. Farben und frontaler Direktblitz sind gemeinsam gepromptet; keine zusätzliche Bildtönung. 17 WebP-Kopien für die Seite (zusammen rund 3,7 MB), Original-PNGs unverändert, reproduzierbarer Export in `branding/assets/mockups/make_web_images.py`. Renderprüfung bei 375 und 1440 px: alle Bilder geladen, keine JavaScript-Fehler, Navigation funktioniert, die drei bearbeiteten Abschnitte passen in die jeweilige Ansichtsbreite. Vollständige Prompts in `PROMPTS.md`, aktuelle Auswahl und Übergabe in `docs/HANDOFF-BILDER-2026-10-26.md`. Hauptwebsite und gemeinsame CSS-/JS-Dateien unverändert.
- **Nicht funktioniert / offen:** Die Variante mit Logo in der Keramikschüssel entsprach Lucas' Wunsch nicht und wurde ausdrücklich gelöscht; das ursprüngliche Handfoto ohne Logo steht im Moodboard. Tasche v3 ersetzt v2 in der Auswahl. Das eingebaute Browserfenster war nicht verfügbar; Renderprüfung deshalb mit separatem lokalem Headless Chrome. Der erste Navigationstest erwartete ein falsches URL-Muster und wurde korrigiert. Die überarbeitete mobile Ansicht zeigt vollständig geladene Bilder ohne JavaScript-Fehler; bestehende überbreite Demo-Inhalte außerhalb der drei bearbeiteten Bereiche wurden nicht umgebaut. Logo-Wiedergaben bleiben generierte Mockups; geometrische SVG-Identität ist nicht belegt. Kein Video erstellt.

### 26.10.2026 · Codex · Durchgehender Logo-Zug, längerer Auslauf und P-Punkt behoben
- **Versucht:** Lucas' Screenshot im Styleguide nachgestellt: Standard „nein, alles in einem Zug“, stärkeres Abbremsen nur am Ende des großen Zugs und kein sichtbarer Punkt des P-Stamms vor dessen Beginn. Rasterprüfung mit `node /tmp/pm-logo-dot-check.cjs` zeigte vor der Korrektur an sieben frühen Positionen bis zu 523 vorzeitig sichtbare P-Pixel. Eine isolierte P-Maske beseitigte den Punkt bereits im Diagnoseversuch und bestätigte die überlappende gemeinsame Maske als Ursache.
- **Funktioniert:** Hauptzug und P-Stamm haben getrennte Masken, wobei die P-Maske auf der äußeren Gruppe in denselben Koordinaten wie die verschobene Mittellinie sitzt. Standardmodus ist „whole“, Auslauf des Hauptzugs `cubic-bezier(.53, 0, .45, 1)`; er bremst vor der Pause vollständig ab. Der P-Stamm nutzt weiterhin seine bisherige Kurve `.53, 0, .7, 1` und dieselbe längenabhängige Dauer. Pixelprüfung nach Korrektur: null sichtbare P-Pixel an sämtlichen frühen Positionen. Bei 375 und 1440 px Wiederabspielen, Endbild, Pause und unabhängiges P-Tempo geprüft; keine JavaScript-Fehler. Endbild bei 120 und 160 % Strichstärke ohne Alpha-Abweichung zur unmaskierten Vorlage, bei 60 % lediglich ein Antialiasing-Randpixel. Logo-Geometrie und SVG-Quelldateien unverändert.
- **Nicht funktioniert / offen:** Die bisherige gemeinsame Maske konnte trotz ausgeblendeter P-Maskenstücke einen Teil des P-Stamms über den Hauptzug freilegen. Die frühere Whole-Kurve lief außerdem über Hauptzug und P-Stamm zusammen; dadurch saß das eigentliche Abbremsen am falschen Ende. Beides im Styleguide korrigiert. Prüfung mit separatem lokalem Headless Chrome; physisches Handy nicht geprüft.

### 26.10.2026 · Codex · Farbpaletten nach Helligkeit sortiert
- **Versucht:** Lucas wünscht die Farbwerte von hell nach dunkel, die Textfarbe ganz rechts.
- **Funktioniert:** Beide Paletten im Styleguide stehen jetzt in der Reihenfolge Background, Surface, Button, Accent, Text. Die kleinen Farbbalken unter „Bedeutung“ folgen derselben Reihenfolge. Farbwerte und Gestaltung unverändert.
- **Nicht funktioniert / offen:** Keine offenen Punkte für diese Umsortierung.

### 26.10.2026 · Codex · Generierte Bildwelt nur in der Vorschau unter /1/
- **Versucht:** Lucas möchte die zusammengehörigen Fotos auch auf der separaten Website mit Custom-URL sehen, ausdrücklich nicht auf Paulas offizieller Startseite. Die vorhandene Version `1/index.html` anhand der Git-Historie als die unter `/1/` erhaltene frühere Website identifiziert.
- **Funktioniert:** Ausschließlich dort acht Galerie-, zwei Schulungs- und zwei Kontaktbilder durch vorhandene WebP-Motive ersetzt. Neue Fotos ohne zusätzliche Braun-/Pink-Tönung; Kontakt zeigt Empfang mit Wandlogo und Pflanze im pinken Keramiktopf. Das Handfoto bleibt ohne Logo in der Schale. Galerie heißt „Bildwelt / Beauty, nah dran.“ und kennzeichnet die generierten Motive, ebenso die Kurs- und Kontaktbilder. Echte Paula-Porträts bleiben erhalten. Vorschau erhält `noindex, nofollow`; relativen OG-Bildpfad korrigiert. Prüfung bei 375 und 1440 px: alle zwölf generierten Bildeinbindungen geladen, keine JavaScript-Fehler oder horizontale Seitenüberläufe, mobiles Menü funktioniert. Offizielle `index.html` und sämtliche gemeinsamen CSS-/JS-Dateien per Git-Vergleich unverändert.
- **Nicht funktioniert / offen:** Der bisherige Desktop-Ausschnitt der achten Galerieposition war noch auf die frühere Nagelaufnahme eingestellt; den Bildausschnitt für das Nagellack-Stillleben lokal in `/1/` angepasst. Einbau in die offizielle Startseite ist ausdrücklich nicht beauftragt. Die Custom-URL ist eine getrennte Vorschau, kein Zugriffsschutz.

### 26.10.2026 · Codex · 3D-Nagelpanels im Styleguide unter Bewegung
- **Versucht:** Lucas möchte das bestehende Three.js-Experiment direkt im Styleguide zeigen, Auswahl und Nagel nebeneinander wie auf der Einzelseite.
- **Funktioniert:** Vollbreite Live-Einbettung am Anfang von „Bewegung“, erreichbar über `styleguide.html#nagelpanels`. Bestehendes Experiment per `?embed=1` eingebunden, ohne Renderer oder Animationen zu duplizieren. Einbettungsansicht blendet den eigenen Kopf-/Hinweistext aus und hält die Panels auch auf dem Handy nebeneinander; die eigenständige Ansicht ohne Parameter bleibt unverändert. Prüfung bei 375 und 1440 px: aktiver Three.js-WebGL-Renderer, alle fünf Looks und Tastaturwechsel funktionieren, Beschreibung passt in den Nagel, keine internen Scrollbalken oder JavaScript-Fehler.
- **Nicht funktioniert / offen:** Physisches Handy weiterhin nicht geprüft. Die Panels bleiben abstrakte Gestaltungsstudien, keine neu behaupteten Behandlungen. Original-Experiment zusätzlich über einen Link erreichbar. Reduzierte Bewegung und der CSS-Fallback bei fehlendem WebGL wurden ebenfalls geprüft.

### 26.10.2026 · Codex · Logo-Bewegung auf /1/ und Styleguide vereinheitlicht; gepflegte Eleganz
- **Versucht:** Lucas meldet, dass der Header unter `/1/` noch die alte Bewegung nutzt, und möchte die Styleguide-Logos genauso animieren. Anschließend präzisiert er den mittleren Markenwert in Richtung clean, feminin, gepflegt und leicht glänzend.
- **Funktioniert:** Das separate Header-Skript auf einen durchgehenden Hauptzug mit längerem Auslauf umgestellt, Pause und P-Tempo erhalten. Dasselbe Skript animiert nun auch das Seitenleistenlogo und beide großen Logo-Beispiele im Styleguide. Eigene Masken je Kontur verhindern vorzeitige P-Punkte; pro Logo eindeutige IDs, Originalpfade beim Abspielen frisch aus dem SVG-Symbol übernommen, sodass der Strichstärke-Regler berücksichtigt bleibt. Cache-Version auf 5 erhöht, Einmal-Abspielen je Seitenpfad getrennt gespeichert. Die frühere Kurve fiel in der reproduzierbaren Zeitprüfung durch; die neue entspricht der festgelegten Kurve. Prüfung beider Seiten bei 375 und 1440 px: Abspielen und Hover-Wiederholung funktionieren, keine JavaScript-Fehler; P-Stamm während Hauptzug/Pause vollständig unsichtbar und fertiges Logo bis auf höchstens ein Antialiasing-Randpixel identisch zur unmaskierten Kontur. Die mittlere Karte heißt „Gepflegte Eleganz“, mit klaren Formen, glänzenden Oberflächen und sanftem Pink; Markenprofil synchronisiert.
- **Nicht funktioniert / offen:** Die vorherige Änderung war nur in der einstellbaren Styleguide-Demo umgesetzt, nicht im separat geladenen Header-Skript. Jetzt gemeinsam genutzt, bei reduzierter Bewegung statische Logos. Paulas wörtlicher Leitsatz und die offizielle Startseite unverändert; physisches Handy nicht geprüft.

### 27.10.2026 · Claude · Briefing Kurzprojekt 2 (Website) gefüllt
- **Versucht:** Lucas legt `kurs/briefing.md` (Ammers Vorlage, Abgabe bis morgen) ab und bittet, zu prüfen, was daraus umsetzbar ist und was ich übernehmen kann. Vorlage für PM Beauty ausgefüllt: Ziel, Zielgruppe, Handlung, Inhalt, drei Seiten, Anforderungen, Kriterien.
- **Funktioniert:** Fakten aus `docs/prd.md` und `docs/HANDOFF.md` übernommen (38 Behandlungen in fünf Kategorien, Öffnungszeiten, Schulungen, Gutscheine, 5.0-Bewertung, Keine-Preise-Regel). Ergebnis in `branding/briefing-website.md`.
- **Nicht funktioniert / offen:** Zielgruppe (Alter 20–50, München) ist eine Annahme, nicht aus Paulas Angaben belegt; von Paula bestätigen lassen. Die Vorlage nennt Ammers Beispielfragen zur Seitenauswahl; die Auswahl Startseite, Behandlungen, Kontakt ist meine Empfehlung. Die Website selbst wurde nicht geändert.

### 27.10.2026 · Codex · Lucas’ überarbeitetes Briefing korrigiert
- **Versucht:** `briefing.md` auf Lucas’ Wunsch möglichst nah am Original sprachlich korrigieren.
- **Funktioniert:** Rechtschreibung, Grammatik und Zeichensetzung korrigiert; Inhalt und Aufbau beibehalten. Dateiname im Pages-Workflow an Lucas’ Umbenennung angepasst.
- **Nicht funktioniert / offen:** Die Angaben zu drei Seiten und einem Onepager bleiben zur inhaltlichen Klärung unverändert.

### 27.10.2026 · Codex · Ziel und Zielgruppe im Briefing präzisiert
- **Versucht:** Auf Lucas’ Wunsch die Abschnitte „Ziel“ und „Zielgruppe und Situation“ konkreter formulieren.
- **Funktioniert:** Ziel als Vertrauensaufbau, offizielle Anlaufstelle, Angebotsüberblick und Buchungsmöglichkeit formuliert; Zielgruppe über Qualitätsanspruch und Zahlungsbereitschaft beschrieben und die Situation vor der Buchung konkretisiert.
- **Nicht funktioniert / offen:** Keine neue Zielgruppenrecherche; Formulierungen beruhen auf Lucas’ Angaben und dem bestehenden Projektkontext.

### 27.10.2026 · Codex · Zielgruppe und Situation als Stichpunkte
- **Versucht:** Den Abschnitt auf Lucas’ Wunsch in Stichpunkte umwandeln.
- **Funktioniert:** Bestehende Angaben in sechs Stichpunkten aufbereitet; Inhalt beibehalten.
- **Nicht funktioniert / offen:** Keine.

### 27.10.2026 · Codex · Experimentelle Website neben die Hauptseite verschoben
- **Versucht:** Lucas möchte die experimentelle Kopie im selben Ordner wie die anderen Website-Dateien und mit einem verständlichen Dateinamen.
- **Funktioniert:** `website/1/index.html` nach `website/index-experimentell.html` verschoben und alle 23 relativen Datei- und Bildpfade angepasst. Inhalt und Hauptseite unverändert.
- **Nicht funktioniert / offen:** Die bisherige Adresse `/1/` entfällt; neue Adresse ist `/index-experimentell.html`.

## Werkzeuge

Reihenfolge, wie sie tatsächlich gelaufen ist (18. und 19.10.2026):

1. **Lucas' Handskizze** → Form des gedrehten E.
2. **Codex und Claude Code parallel** → Wortmarke als Vektor: Python mit fontTools für die Schriftkonturen (erst Cormorant Unicase, dann Italiana), das E als eigener Pfad, Sharp für Vorschaubilder. Pillow erzeugt später die Web-Bilder (`make_images.py`). Zwei Agenten bekamen dieselbe Aufgabe, um Varianten zu vergleichen.
3. **Figma** (über die Plugin-API aus Claude Code befüllt) → alle Entwürfe nebeneinander auf einer Karte. Das finale E hat Lucas dort von Hand gebaut (`1:32`). Claude Code hat es exportiert, nachgemessen und eine zentrierte und eine dünne Fassung abgeleitet.
4. **Claude Code** → Website (statisches HTML/CSS/JS), gemessen im eingebauten Browser statt nach Augenmaß, live über GitHub Pages.
5. **Codex mit Bildgenerierung** → Hero-Outpainting von Paulas Porträt (Prompts in `branding/assets/photos/HERO-OUTPAINT.md`).
6. **Codex** → temporärer Farbregler auf der Website (`?tune=1`). Lucas hat die Farben selbst eingestellt, die Werte exportiert, dann wurde der Regler wieder entfernt.
7. **Claude mit Websuche** → KI-Marktcheck für das Markenprofil (Branchenbuch muenchen.de, Fresha, Treatwell).
8. **Claude Code** → Markenprofil, Styleguide, Logo-Prompt mit Bewertung, dieses Logbuch.

Kurz: Skizze → Codex + Claude (Logo-Code) → Figma (Auswahl, Handarbeit) → Claude Code (Website, Messen) → Bildmodell (Outpainting) → Codex-Regler (Farben) → Claude (Marktcheck, Markenprofil, Styleguide).

## Wichtige Prompts

Wörtlich zitiert ist nur, was in Anführungszeichen steht. Der Rest ist aus dem Logbuch sinngemäß wiedergegeben.

1. **Konstruktion statt Bildgenerierung:** „Konstruiere außerhalb von Figma … nutze die Schrift Cormorant Unicase … in Vektor“. Damit war klar: Das Logo entsteht als messbarer Pfad, nicht als Pixelbild. Das hat jede spätere Korrektur auf Zehntel genau möglich gemacht.
2. **Die Mitte als Bedingung:** Lucas wollte das E exakt mittig in der Wortmarke, die anderen Buchstaben sollten sich danach richten. Aus dieser einen Anweisung ist das Gestaltungsprinzip „Die Mitte“ geworden, das heute Logo, Hover-Linien, Kränze und das Akkordeon verbindet.
3. **Hero-Outpainting:** „Outpaint the original portrait into a wide 2.2:1 photographic website hero … Left side is empty continuous warm taupe wall approximately #A39588. Preserve face, hands, rings, hair …“ Damit ließ sich das Hochformat-Porträt als Desktop-Hero verwenden. Die Wandfarbe im Prompt ist dieselbe wie die CSS-Variable `--hero-wall`.
4. **Werkzeug statt Ergebnis:** Lucas bat Codex nicht um fertige Farben, sondern um Regler für Farbton, Sättigung, Helligkeit und Deckkraft beider Farbwelten direkt auf der Seite. Die KI hat das Werkzeug gebaut, gestaltet hat Lucas. Die 14 exportierten Werte sind seitdem die Palette.
5. **KI-Marktcheck:** Claude sollte prüfen, ob „Präzision“ ein Alleinstellungsmerkmal ist und was Konkurrenten in München machen (Ammers Vorschlag vom 15.10.). Ergebnis: Als Wort ist Präzision kein Merkmal, jedes PMU-Studio verspricht sie. Glaubwürdig wird sie erst durch die sichtbare Umsetzung. Das hat das Gestaltungsprinzip begründet.

Der nachträglich formulierte Logo-Prompt mit Bewertungskriterien steht in `branding/logo-prompt.md`.

## Wendepunkte

- **Die KI hat die Skizze falsch gelesen.** Die erste Claude-Fassung setzte den Balken über die Grundlinie, ohne Kerbe, mit zu hohem Stiel. Erst Lucas' Korrektur mit Maßen aus dem Italiana-Entwurf brachte die richtige Form. Skizzen allein reichen als Prompt nicht, es braucht Maße.
- **Zwei Agenten, keine Entscheidung.** Codex und Claude lieferten parallel zwölf Varianten (Codex v1 bis v6, Claude drei Höhen und drei Laufweiten A/B/C). Entschieden hat das keine KI: Lucas hat das finale E in Figma von Hand gebaut. Die KI war stark im Messen und Vergleichen, nicht im Wählen.
- **Rechnerische gegen optische Mitte.** „AUTY“ ist deutlich breiter als „PM B“. Ein exakt mittiges E kostet deshalb einen großen Wortabstand (heute 0,79 × Versalhöhe). Die KI konnte das berechnen, die Abwägung blieb bei Lucas. Ihre Vorschläge (kürzere Füße, Stiel auf Höhe des B-Querstrichs) hat er abgelehnt.
- **Bauen ist billig, Weglassen ist die Arbeit.** Ein Logo-Intro mit Scroll-Animation, Easing und Ruckel-Fix (vier Commits) und ein pinker Maus-Schein wurden gebaut, live angesehen und wieder entfernt. Geblieben ist ein viel leiserer Schein in den Panels. Weil die KI schnell baut, ist das Ausprobieren am echten Ergebnis günstiger als langes Diskutieren.
- **Bildgenerierung übertreibt.** Die dritte Outpainting-Runde (mehr Kopfraum) war gestalterisch zu viel und wurde zurückgenommen. Fürs Handy hat Lucas am Ende selbst ein Bild geliefert, das unverändert übernommen wurde.
- **Wo die KI kontraproduktiv war:** Das Vorschaufenster lief mit etwa 6 Bildern pro Sekunde, Bewegung ließ sich dort nicht beurteilen, nur am echten Gerät. Figma-Aufrufe sind in der Größe begrenzt, Pfade mussten gerundet und Striche von Hand nachgebaut werden. In der Cloud-Sitzung waren Stockfoto-Seiten und eine Referenzseite gesperrt. Ein „funktionierender“ pinker Header war technisch korrekt, aber unsichtbar: Erst die Messung der Farbwerte zeigte das.
- **Reihenfolge verkehrt.** Logo und Website entstanden am 18.10., das Markenprofil erst am 19.10. Das Profil beschreibt deshalb teilweise im Nachhinein, was schon gestaltet war. Ammers Reihenfolge (erst Profil, dann Logo) wäre sauberer gewesen.

## Fazit

**Wieder so:**
- Logo als Code konstruieren statt als Bild generieren. Messbare Pfade machen Präzision überprüfbar, und Präzision ist der Kern der Marke.
- Die KI messen lassen, selbst entscheiden. Jede Aussage wie „sitzt mittig“ oder „ist sichtbar“ wurde per Messung belegt, nicht geschätzt.
- Temporäre Werkzeuge bauen lassen (Farbregler), wenn eine Entscheidung nach Augenmaß fallen muss.
- Ein Logbuch, das nach jedem Schritt von der KI geschrieben und von mir gelesen wird. So ist der ganze Weg nachvollziehbar, auch über drei Werkzeuge hinweg (Codex, Claude in der Cloud, Claude lokal).

**Nicht wieder so:**
- Zwei Agenten gleichzeitig in denselben Dateien. Das ging gut, war aber riskant. Parallel nur in getrennten Ordnern oder Varianten.
- Erst gestalten, dann das Markenprofil schreiben.
- Fakten der KI überlassen. Leistungen, Zahlen und Zitate kommen nur von Paula; die KI hat mehrfach nachgefragt statt zu erfinden, das muss Regel bleiben.

**Offen:** Foto-Mockups und zusammenhängende Bildserie sind seit 26.10.2026 im Styleguide mit KI-Kennzeichnung eingebunden. Kein Video erstellt; Test des dynamischen Header-Logos auf echten Geräten weiterhin offen. Ein möglicher Austausch weiterer Bilder auf der Kundenwebsite ist nicht Teil dieser Styleguide-Integration.
