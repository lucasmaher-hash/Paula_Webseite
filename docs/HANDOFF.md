# Übergabe: PM Beauty Website (Stand 21.10.2026)

**Logo-Update 21.10.2026:** Lucas hat die gelieferte PM-Handskizze als Website-Logo bestimmt. Der aktuelle, editierbare Vektor liegt in Figma unter [Knoten 32:5](https://www.figma.com/design/ggdHcm9PScFCjahKxyFqDB/paula-webseite?node-id=32-5); Quellen, SVG und Vorschau in `branding/assets/pm-beauty-logo/versions/v9/`. Website: Header, mobiles Menü und Footer nutzen das neue Monogramm. Die alte Italiana-Wortmarke und die E-Animation sind nur noch historische Entwürfe. Der Styleguide zeigt das neue Logo und kennzeichnet die frühere Schreibanimation als Archiv. Angaben zur alten Website-Wortmarke weiter unten sind damit überholt.

**Logo seit 21.10.2026: Reinzeichnung v10** (`branding/assets/pm-beauty-logo/versions/v10/`), eine neu gezeichnete Fassung derselben Skizze mit wechselnder Strichbreite. Website: einmal als `<symbol id="pm10">` direkt nach `<body>` in `index.html`, Header, mobiles Menü und Footer nutzen es per `<use href="#pm10">` (100 % Strichstärke). Bei einer Logo-Änderung nur das Symbol ersetzen. Styleguide: nur noch v10 (die v9-Handzeichnung ist dort entfernt); Logo-Abschnitt mit Regler für die Strichstärke 60–160 % (wirkt auf alle Logos der Seite), Bewegung mit Schreibanimation (Regler für Dauer, Kurve, Absetzen und Halten). Die Angaben zu v9 oben sind damit überholt.

Dieses Dokument ist der Einstieg für jede KI oder Person, die an der Website weiterarbeitet (Claude lokal, Claude in der Cloud, Codex). Es beschreibt, was live ist, wie gearbeitet wird und was offen ist. Regeln zum Studio und zum Kurs stehen zusätzlich in `CLAUDE.md` (lokal, nicht im Repo). Der vollständige Verlauf steht in `branding/workflow.md`.

**Neuer Chat? Zuerst:** `git pull` im Repo, dann diese Datei und die letzten Einträge in `branding/workflow.md` lesen, dann `git status` / `git log -5` prüfen (Codex arbeitet im selben Repo).

## 1. Was live ist

- **Live:** https://paula-maher.de (seit 19.10.2026; GitHub Pages, Branch `main`; die alte Adresse lucasmaher-hash.github.io/Paula_Webseite/ leitet dorthin weiter). Styleguide: `/styleguide.html`.
- **Domain:** paula-maher.de liegt bei Strato (Paulas Paket mit 1 Inklusiv-Domain und 1 Mailpostfach). Strato-DNS: A-Record `185.199.108.153` (GitHub, Strato erlaubt nur eine IPv4), CNAME `www` → `lucasmaher-hash.github.io`. Stand 19.10.2026: Zertifikat deckt erst `paula-maher.de` ab, `https://www.…` zeigt noch Zertifikatsfehler (GitHub stellt www verzögert aus). MX und NS nicht anfassen, sonst bricht Paulas Mail. Die Datei `CNAME` im Repo nicht löschen. HTTPS erzwungen, Zertifikat von GitHub (Let's Encrypt).
- **Technik:** statisches HTML/CSS/Vanilla-JS, kein Build, keine Abhängigkeiten. Gambarino 400 für Überschriften und große Zahlen über die Fontshare-API; Instrument Sans für Text und Bedienung lokal in `fonts/`. Lora bleibt als lokaler Fallback erhalten, die Italiana-Wortmarke bleibt unverändert.
- **Dateien:** `index.html` (One-Pager), `styleguide.html`, `css/style.css`, `js/main.js`, `images/`, `impressum.html`, `datenschutz.html`.
- **Cache-Busting:** aktuell `style.css?v=66`, `main.js?v=38`, `fonts.css?v=3`. Bei jeder Änderung an CSS die Nummer in **allen fünf** HTML-Dateien erhöhen (index, styleguide, markenprofil, impressum, datenschutz), bei JS nur in `index.html`. Die beiden Schriftvorschauen bei Änderungen an `style.css` ebenfalls aktualisieren.

### Aufbau von `index.html` (von oben nach unten)

| Bereich | Anker | Inhalt |
|---|---|---|
| Header | – | Sticky, durchscheinend. Logo links; Desktop (ab 1024 px) Nav mit Dropdown „Behandlungen“ (Hover öffnet, Klick springt zum Abschnitt), rechts Instagram-Kreis und „Termin buchen“. Handy: Kalender- und Menü-Kreis, gefüllt in Button-Farbe. Über pinken Abschnitten (Behandlungen, Bewertungen) wechseln Logo, Schrift und Buttons in 1 s zu Pink (`.over-pink`, IntersectionObserver auf Header-Mitte); die Leiste selbst bleibt. |
| Mobiles Menü | `#mobile-menu` | Vollbild, Zeilen mit Trennlinie und ↗, „Behandlungen“ klappt mit + auf. |
| Hero | – | Desktop: Paula rechts, Text links weiß. Handy: Bild oben (5 % Beschnitt pro Seite), Text darunter. Keine Labels mehr im Hero. |
| Auszeichnungen | – | Drei Lorbeer-Badges: 5 Jahre Erfahrung, 5 ★ Bewertungen, 4 Weiterbildungen (Zahlen von Lucas). Kränze wachsen beim Erreichen in ~1 s aus der Mitte (`html.js` + `.grown`). |
| Ergebnisse | – | „Arbeiten aus dem Studio“: Desktop versetzte Collage 4 Spalten × 10 Zeilen-Einheiten, 7 Fotos, Spalte 4 mit Luft unten; Zoom im festen Rahmen beim Hover. Handy: Wischstreifen. |
| Über Paula | `#studio` | Foto + Textpanel; Fakten: Standort, Termine, Erfahrung „5 Jahre & 4 Weiterbildungen“, Instagram. Handy: ein Rahmen von Rand zu Rand, Foto 10 px eingerückt. |
| Behandlungen | `#behandlungen` | Pink. Kopfzeile „Behandlungen · Mo–Fr 10–20 Uhr“. 5 Akkordeons (`#manikuere`, `#pmu`, `#gesicht`, `#wimpern`, `#brauen`), ohne Preise; animiertes Öffnen, Seite gleitet zur Kategorie. |
| Schulungen | `#schulungen` | Zwei Kurse (gekürzte Texte, Freigabe durch Paula offen). Desktop: Bild und Text als zwei Rahmen, Seiten im Wechsel. Handy: eine Karte, Foto eingerückt, Tipp auf Titel klappt auf (animiert). Kacheln nur mit Kontur. „Per DM anfragen“ braun. |
| Gutscheine | `#gutscheine` | 50/100/150 €, 100 € als „Bestseller“ ~30 % größer, Geschenk-Icon. Desktop: Karten driften beim Erreichen senkrecht auseinander. Handy: versetzt links/rechts. Stripe-Links sind Platzhalter. |
| Bewertungen | `#bewertungen` | Pink. 5.0 ★ · 26 Bewertungen, 4 echte Zitate, dunkleres Link-Panel „Alle Bewertungen“ (Desktop 3 Spalten, das Panel über 2 Spalten bis ein 5. echtes Zitat kommt). |
| Kontakt | `#kontakt` | Desktop 3×2-Raster: Text | Raumfoto | Öffnungszeiten (hoch, „Termin buchen“ unten) / Raumfoto | Adresse·Instagram·Buchung. Adresse zweizeilig rechts, Hover-Linie pro Zeile. Die Raumfotos sind Stimmungsbilder, nicht Paulas Studio. |
| Footer | – | Logo, Impressum, Datenschutz, Instagram. |

### Gestaltung (Bausteine in `css/style.css`)

- **Markenprofil (Kurzfassung):** `markenprofil.html`, verlinkt über den dunklen Knopf oben rechts im Styleguide. Quelle ist `branding/markenprofil.md`.
- **Styleguide:** `styleguide.html` (live unter `/styleguide.html`) zeigt Logo, Farben, Schrift, Raster, Komponenten, Bewegung, Bildsprache und Sprache. Er lädt dieselbe `css/style.css`. Bei Design-Änderungen den Styleguide mitziehen. `docs/design.md` und `docs/design.html` sind veraltet.
- **Schriftvergleich (20.–21.10.2026):** Lucas hat Gambarino ausgewählt; `index.html` nutzt sie seit 21.10. Die nicht indexierten `font-gambarino.html` und `font-melodrama.html` bleiben als Vergleich erhalten. Die Dateien laden die Schriften über Fontshare; `css/font-previews.css` überschreibt nur die Display-Typografie.

- **Panel-Glow** (Lucas/Codex, 19.10.2026): Nur Desktop ab 900 px, echte Maus, keine reduzierte Bewegung. Radialer Verlauf als CSS-Hintergrund der Panels (240 px Radius, max. 12 % Deckkraft), kein Overlay. Jede Glow-Fläche im Umkreis von 240 px um die Glow-Mitte wird an dieser Stelle getönt, also auch Flächen hinter einem Panel und Flächen, denen man sich nähert. Die Mitte läuft dem Cursor mit 14 % pro Frame nach. Bewertungs-Karten selbst sind ausgenommen (nur der pinke Hintergrund leuchtet).
- **Zwei Farbwelten** (Lucas, 19.10.2026): Braun als Basis, Pink für Behandlungen und Bewertungen. Einstellbare Quellwerte `--brown-*` und `--pink-*` oben in `style.css`; daraus entstehen alle Farbrollen. Hero-Wandton `--hero-wall #A39588` bleibt die Foto-Grundfarbe. Gambarino 400 für Überschriften, Instrument Sans für Fließtext und Bedienelemente; Italiana bleibt in der Wortmarke.
- **Muster** angelehnt an die Referenz https://novafacesmunich.com (nur Layout, keine Texte übernehmen): `.eyebrow` (Label mit Punkt), `.btn` + `.btn-ic` (Pille mit Pfeil, ohne Kreis), `.badge`, `.tile` (große Karte mit ↗), `.strip` (Bilderstreifen), `.course` + `.perks` (Kurskarten mit vier Kontur-Kacheln), Akkordeon mit runden +/–.
- **Hover-Linie:** 1 px, wächst von der Mitte nach außen, keine Serifen (`.ul` und die Selektorliste im Abschnitt „Hover-Linie").
- **Panels:** Flächen dicht nebeneinander (8 px Handy, 10 px Desktop), 1-px-Kontur; am Handy sind die Radien ca. 30 % kleiner (22/17 px statt 32/24 px).
- **Mobile first:** Basisregeln gelten fürs Handy, größere Bildschirme per `min-width`. Das Handy ist der wichtigste Kanal für Paulas Kundinnen.
- **Logo:** Auf der Website steht seit 19.10.2026 die **Kleinfassung C** `branding/assets/logo-small/pm-beauty-logo-klein-c-kompromiss.svg` (normale Strichstärke, Mittelstrich 1,75, Wortabstand enger, E exakt mittig), inline an drei Stellen in `index.html` (Header, mobiles Menü, Footer), Farbe über `currentColor`. Bei einer Logo-Änderung alle drei ersetzen. Ab 160 px Breite gilt die große Fassung `branding/assets/logo-final/pm-beauty-logo-duenn-kurz.svg`. Maße und Varianten: `branding/assets/logo-final/README.md`, `branding/assets/logo-small/README.md`. **Dynamisches Logo im Header** (seit 19.10.2026): Der Mittelstrich des E (`.brand .mid`, nur im Header) wächst beim Hovern mit der Maus auf die doppelte Höhe (CSS `.brand:hover .mid-bar`, nur bei `hover:hover`). Keine seitliche Bewegung mehr (Feder auf Lucas' Wunsch entfernt). Die frühere Kopplung an die Öffnungszeiten ist auf Lucas' Wunsch entfernt. Volle Fassung mit Header-Vorschau: Styleguide, Abschnitt „Dynamisches Logo“ (`styleguide.html#dynamisch`). Eine separate Prototyp-Seite gibt es nicht mehr.

## 2. Arbeitsweise (von Lucas festgelegt)

1. **Vor Arbeitsbeginn (lokal) Lucas die Links nennen:** Desktop `http://localhost:8080`, Handy `http://<LAN-IP>:8080` (LAN-IP per `ipconfig getifaddr en0`). Server: `python3 -m http.server 8080 --bind 0.0.0.0` **im Repo-Ordner** starten (nicht in `~`), am Mac `http://127.0.0.1:8080` statt `localhost` öffnen (Safari löst `localhost` sonst über IPv6 auf).
2. **Handy zuerst testen** (375 px), danach Desktop (1280/1440 px). Prüfen: kein horizontales Scrollen, Menü, Akkordeon, keine Konsolenfehler. **Ausnahme Styleguide** (Lucas, 19.10.2026): `styleguide.html` wird nicht mehr fürs Handy optimiert oder dort getestet, nur Desktop. Bestehende mobile Regeln bleiben, wie sie sind.
3. **Automatisch committen und pushen**, ohne nachzufragen (`main`). Nach dem Push warten, bis das Pages-Deployment fertig ist (`gh run list`), erst dann „live" melden. Zwei schnelle Pushes hintereinander brechen das erste Deployment ab; das ist harmlos, solange das letzte durchläuft.
4. **Workflow-Tagebuch ist Pflicht:** Nach jeder Arbeitssession einen Eintrag in `branding/workflow.md` (Logbuch: Versucht / Funktioniert / Nicht funktioniert), im selben Stil wie die bisherigen Einträge. Das ist Teil von Lucas' Kursabgabe.
5. **Fakten nur aus `docs/prd.md` oder von Lucas/Paula.** Keine Behandlungen, Preise, Bewertungen, Zitate oder Kursdetails erfinden. Bei Unklarheiten fragen.
6. **Keine Behandlungspreise auf der Website** (Paulas Wunsch). Preise sieht man erst über den Buchungslink. Gutschein-Beträge sind erlaubt.
7. **Platzhalterbilder aus kostenlosen Stockfotos** (Lucas, 18.10.2026): Solange echte Fotos fehlen, kostenlose Stockfotos mit freier Lizenz nehmen (z. B. Unsplash, Pexels). Quelle, Fotograf und Lizenz in `images/STOCK.md` festhalten und im HTML-Kommentar als Platzhalter markieren, damit sie später durch echte Fotos ersetzt werden. Stockfotos nie als Paulas Arbeit ausgeben (keine Alt-Texte wie „Ergebnis aus dem Studio"). In der Cloud-Umgebung sind Stockfoto-Hosts aktuell gesperrt (Netzwerk-Policy); dafür müssen z. B. `images.unsplash.com`, `unsplash.com`, `images.pexels.com`, `www.pexels.com` freigegeben werden.
8. **Codex-Versionsregel für Logos** (aus `branding/assets/pm-beauty-logo/VERSIONING.md`): bestehende `versions/vN` nie überschreiben, neue Stände in den nächsten freien Ordner.

## 3. Bilder: Stand und Aufgaben für die Bildgenerierung

**Originale** (ohne Metadaten) liegen in `branding/assets/photos/originals/`:

| Datei | Inhalt | Größe |
|---|---|---|
| `paula-portrait.jpg` | Paula, Hände am Gesicht, grau-taupe Wand | 1148 × 1371 |
| `lashlift.jpg` | Lashlift, Auge Nahaufnahme | 2880 × 5120 |
| `nails.jpg` | Gelnagel schokobraun | 1162 × 2048 |
| `lips-1.jpg`, `lips-2.jpg`, `lips-3.jpg` | Lippenpigmentierung | 1125 × 2000 |
| `lashes-extensions.jpg` | Wimpernverlängerung | 1148 × 2000 |
| `paula-studio.jpg` | Paula im Studio (Über mich) | 675 × 925 |
| `nails-art.jpg`, `facial-mask.jpg`, `lashes-brows.jpg` | Von Lucas im Chat geschickt (19.10.), komprimiert ~1000 px; `images/brow.jpg` ist der Brauen-Ausschnitt. Ob es Paulas Arbeiten sind, ist **nicht bestätigt**. | ~980 × 1300 |
| `studio-glass.jpg`, `studio-light.jpg` | Von Lucas geschickte Raumfotos, **nicht Paulas Studio**, nur Stimmung im Kontakt (Lichtfoto ohne „LABOR“-Tür zugeschnitten) | 640² / 1200 × 1800 |
| `studio-pink.jpg` | Rosa Ausstellungsraum mit Kleid, von Lucas geschickt (21.10.2026), **nicht Paulas Studio**. Steht seit 21.10. unten links im Kontakt statt `studio-light.jpg` (Rahmen unverändert) | 1080 × 810 |

Die Web-Versionen in `images/` erzeugt `branding/assets/photos/make_images.py` (Pillow): `python branding/assets/photos/make_images.py branding/assets/photos/originals images`. Die Kundinnen haben der Veröffentlichung zugestimmt (Lucas, 18.10.2026).

### Offene Bildaufgaben (Priorität von oben nach unten)

1. **Hero-Outpainting (wichtigste).** `images/hero-paula-wide.jpg` ist eine Notlösung: Der Wandton wurde zeilenweise vom linken Rand übernommen und weich überblendet. Ziel: echtes KI-Outpainting von `paula-portrait.jpg` nach links.
   - Format 2400 × 1091 px (≈ 2,2 : 1), JPEG ≈ 80 % Qualität, unter ~250 KB.
   - Paula bleibt am rechten Rand, etwa im rechten 45 %-Bereich. Die CSS-Einstellung `object-position:100% 30%` schneidet bei breiten Bildschirmen links ab, also nichts Wichtiges an den linken Rand.
   - Links ruhige, gleichmäßige Wand im selben Taupe (≈ `#A39588`), ohne Muster, ohne zusätzliche Objekte. Dort steht dunkler Text (`#221C16`), er muss gut lesbar bleiben.
   - Paulas Gesicht, Hände, Ringe und Haare nicht verändern.
   - Wenn sich der Wandton ändert, `--hero-wall` in `style.css` anpassen und `?v=` erhöhen.
2. **Kursgrafiken für Schulungen.** Lucas hat Paulas Instagram-Grafiken gezeigt (Paula im Hintergrund, Kurstitel in Serifenschrift, vier Icons: Ratenzahlung möglich, Zertifikat, Starterpaket, Lebenslange Betreuung). Laut Lucas sollen diese Bilder **noch nicht** verwendet werden. Aktuell stehen Studiofotos als Platzhalter in den Kurskarten (`images/lashlift.jpg`, `images/nails.jpg`, Format 16:10). Erst ersetzen, wenn Lucas die Grafiken liefert oder freigibt. Keinen Text ins Bild setzen, der Kurstext steht bereits im HTML.
3. **Studiofoto** fehlt ganz (der frühere Platzhalter wurde entfernt). Kein Bild erfinden, das wie ein echter Raum wirkt, ohne Lucas zu fragen: Kundinnen würden das Studio sonst falsch erwarten.
4. **OG-Bild** (`og:image` = `images/hero-paula.jpg`) ist hochkant. Für Link-Vorschauen wäre ein Querformat 1200 × 630 besser.

## 4. Offene Punkte

- **5. Bewertung:** Lucas wünscht ein weiteres Bewertungs-Panel. Es braucht einen echten Text (Vorname, Behandlung, Monat) von Beautinda; danach `.review-all` ohne Doppelspalte.
- **Bildrechte bestätigen:** Sind Nageldesign, Gesichtsmaske und Braue Paulas eigene Arbeiten? Sonst aus „Arbeiten aus dem Studio“ entfernen. Ein Vorher/Nachher mit Wasserzeichen „@skincitylabnyc“ wurde bewusst nicht verwendet.
- **Gekürzte Schulungstexte** von Paula freigeben lassen (Originale in der Git-Historie, Commit vor `ef5aafc`).
- **Echte Studiofotos** für den Kontakt (ersetzen `studio-glass.jpg`/`studio-light.jpg`).

- **Instagram:** Seit 18.10.2026 verlinkt die Website Paulas aktives Konto `@pm_beauty___` (vorher `@pm_paulabeauty`). Commit `fc48d45`.
- **Stripe-Links** für Gutscheine sind Platzhalter (`https://buy.stripe.com/PLATZHALTER_50/100/150`). Paula liefert echte Payment Links.
- **Impressum/Datenschutz:** Felder `[AUSFÜLLEN]` sind noch leer.
- **Schulungen:** Termine und Anmeldung laufen per DM. Gibt es später Termine oder einen Buchungslink, kommen sie in die Kurskarten.
- **Kursabgabe:** Die Aufgabenstellung steht in `kurs/KURS.md` (nur lokal). In der Cloud-Sitzung war sie nicht lesbar; gegen die Abgabe abgleichen.
- **`docs/prd.md` ist teilweise veraltet:** Preise werden nicht mehr gezeigt, die Bilder sind echt. Die Fakten (Leistungen, Zitate, Links) gelten weiter.

## 5. Weitere Quellen

- Figma-Datei „paula-webseite" (Key `ggdHcm9PScFCjahKxyFqDB`): finales Logo Knoten `1:32` (Lucas' Original), `11:2` (korrigiert), `15:2` (dünn), `16:15` (dünn, E kurz = Website).
- Kurskontext (Designfabrik, Ralph Ammer): `kurs/KURS.md` (Symlink, nur lokal).
- Vollständiger Verlauf aller Entscheidungen: `branding/workflow.md`.
