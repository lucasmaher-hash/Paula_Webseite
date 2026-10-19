# Übergabe: PM Beauty Website (Stand 19.10.2026)

Dieses Dokument ist der Einstieg für jede KI oder Person, die an der Website weiterarbeitet (ab 18.10.2026: Codex). Es beschreibt, was live ist, wie gearbeitet wird und was offen ist. Regeln zum Studio und zum Kurs stehen zusätzlich in `CLAUDE.md` (lokal, nicht im Repo).


## Aktualisierung 19.10.2026 · Codex

- Lucas hat die bisherige Farbregel ausdrücklich ersetzt: zwei vollständige Farbwelten, Braun (Basis, Header, Studio, Kurse, Gutscheine, Kontakt) und Pink (Behandlungen, Bewertungen). Kein reines Schwarz/Weiß; Texte, Buttons, Akzente, Hover und Rahmen kommen aus den jeweiligen Farbrollen in `css/style.css`.
- Italiana Regular lokal in `fonts/` für H1–H3 und hervorgehobene Zahlen. Instrument Sans für Fließtext, Navigation, Buttons und Labels bleibt. Das Vektorlogo ist unverändert.
- Feine 1-px-Rahmen um Karten, Panels und Bildrahmen; Kurs-Textflächen haben am Desktop eine gemeinsame Außenkontur ohne Trennlinie zwischen Kopf und Inhalt.
- Aktuell `style.css?v=46`, `fonts.css?v=2`, `main.js?v=26`.
- Standardfarben: Lucas’ exportierte Reglerwerte vom 19.10.2026 übernommen (Braun: 16/38/−1/37/51/100/24; Pink: 351/35/−4/32/47/100/22; Rahmen am 19.10. um 20 % schwächer: 19,2 und 17,6; Reihenfolge: Farbton, Sättigung, Flächenhelligkeit, Texthelligkeit, Buttonhelligkeit, Deckkraft, Rahmenkontrast). Frühere Kontrastmessungen gelten für die vorherige Palette.
- Prüfung: 375 px und 1440 px ohne horizontales Scrollen; mobiles Menü, Behandlungs-Akkordeon und Kurs-Toggle funktionieren.

- Kontakt (19.10.2026): 3×2-Raster nach Lucas’ Skizze. `images/studio-glass.jpg` und `images/studio-light.jpg` sind vorläufige Stimmungsbilder, nicht Paulas Studio. Ersetzen, sobald echte Studiofotos da sind.

## 1. Was live ist

- **Live:** https://lucasmaher-hash.github.io/Paula_Webseite/ (GitHub Pages, Branch `main`, Repo öffentlich).
- **Technik:** statisches HTML/CSS/Vanilla-JS, kein Build, keine Abhängigkeiten. Schriften lokal in `fonts/` (Italiana, Instrument Sans, Space Mono).
- **Dateien:** `index.html` (One-Pager), `css/style.css`, `js/main.js`, `images/`, `impressum.html`, `datenschutz.html`.
- **Cache-Busting:** CSS und JS werden mit `?v=N` eingebunden (aktuell `style.css?v=46`, `main.js?v=25`). Bei jeder Änderung an einer der Dateien die Nummer in `index.html` erhöhen, sonst sehen Handy und GitHub Pages die alte Version (HTML wird 10 min gecacht).

### Aufbau von `index.html` (von oben nach unten)

| Bereich | Anker | Inhalt |
|---|---|---|
| Header | – | Transparent, volle Breite, sticky. Logo links. Desktop (ab 1024 px): Links Studio, Behandlungen (Dropdown mit 5 Kategorien), Schulungen, Gutscheine, Bewertungen, Kontakt; rechts Instagram-Kreis und „Termin buchen". Handy: Kalender-Kreis (Buchung) und Menü-Kreis. Auf dem Handy läuft das obere Drittel der Leiste deckend in die Seitenfarbe (Statusleiste). |
| Mobiles Menü | `#mobile-menu` | Vollbild, Zeilen mit Trennlinie und ↗, „Behandlungen" klappt mit + auf. |
| Hero | – | Desktop: Paula rechts, links verlängerte Wand (`images/hero-paula-wide.jpg`), Text links. Handy: Bild oben (`images/hero-paula.jpg`, 4:5), Text darunter. |
| Ergebnisse | – | Horizontal scrollbarer Bilderstreifen (6 Fotos). |
| Bereichs-Karten | – | Drei Karten: Behandlungen, Schulungen, Gutscheine. |
| Über Paula | `#studio` | Zitat, Fakten (Standort, Zeiten, Instagram). |
| Behandlungen | `#behandlungen` | 5 Akkordeons (`#manikuere`, `#pmu`, `#gesicht`, `#wimpern`, `#brauen`), **ohne Preise und Dauer**; „Preise & Termin ↗" führt zu Beautinda. |
| Schulungen | `#schulungen` | Zwei Kurse mit Paulas Texten: Korean Lash & Browlifting (`#schulung-lashlift`), Masterclass Russian Manicure & Gel (`#schulung-manikuere`). Anfrage per Instagram-DM. |
| Gutscheine | `#gutscheine` | 50/100/150 € (Beträge bleiben, siehe Regeln). Stripe-Links sind Platzhalter. |
| Bewertungen | `#bewertungen` | 5.0 ★, 4 echte Zitate von Beautinda. |
| Kontakt | `#kontakt` | Adresse, Instagram, Buchung, Öffnungszeiten. |
| Footer | – | Logo, Impressum, Datenschutz, Instagram. |

### Gestaltung (Bausteine in `css/style.css`)

- **Styleguide:** `styleguide.html` (live unter `/styleguide.html`) zeigt Logo, Farben, Schrift, Raster, Komponenten, Bewegung, Bildsprache und Sprache. Er lädt dieselbe `css/style.css`. Bei Design-Änderungen den Styleguide mitziehen. `docs/design.md` und `docs/design.html` sind veraltet.

- **Panel-Glow** (Lucas, 19.10.2026): Nur Desktop ab 900 px, echte Maus und keine reduzierte Bewegung. Radialer Verlauf als CSS-Hintergrund im jeweiligen Braun/Pink, 190 px Radius und maximal 10 % Deckkraft. Kein Overlay; Schrift, Buttons und Bilder bleiben darüber. Nur das innerste Inhalts-Panel reagiert, Kurskopf und -inhalt bilden gemeinsam eine Fläche. Bei Verlassen, Scrollen und Fensterwechsel wird der Effekt entfernt.
- **Zwei Farbwelten** (Lucas, 19.10.2026): Braun als Basis, Pink für Behandlungen und Bewertungen. Einstellbare Quellwerte `--brown-*` und `--pink-*` oben in `style.css`; daraus entstehen alle Farbrollen. Hero-Wandton `--hero-wall #A39588` bleibt die Foto-Grundfarbe. Italiana für Überschriften, Instrument Sans für Fließtext und Bedienelemente.
- **Muster** angelehnt an die Referenz https://novafacesmunich.com (nur Layout, keine Texte übernehmen): `.eyebrow` (Label mit Punkt), `.btn` + `.btn-ic` (Pille mit Pfeilkreis), `.badge`, `.tile` (große Karte mit ↗), `.strip` (Bilderstreifen), `.course` + `.checklist` + `.perks` (Kurskarten mit vier Icon-Kacheln), Akkordeon mit runden +/–.
- **Hover-Linie:** 1 px, wächst von der Mitte nach außen, keine Serifen (`.ul` und die Selektorliste im Abschnitt „Hover-Linie").
- **Mobile first:** Basisregeln gelten fürs Handy, größere Bildschirme per `min-width`. Das Handy ist der wichtigste Kanal für Paulas Kundinnen.
- **Logo:** `branding/assets/logo-final/pm-beauty-logo-duenn-kurz.svg`. Es steht inline an drei Stellen in `index.html` (Header, mobiles Menü, Footer), Farbe über `currentColor`. Bei einer Logo-Änderung alle drei ersetzen. Maße und Varianten: `branding/assets/logo-final/README.md`.

## 2. Arbeitsweise (von Lucas festgelegt)

1. **Vor Arbeitsbeginn Lucas die Links nennen:** Desktop `http://localhost:8080`, Handy `http://<LAN-IP>:8080` (LAN-IP per `ipconfig getifaddr en0`). Server: `python3 -m http.server 8080 --bind 0.0.0.0` im Repo-Root.
2. **Handy zuerst testen** (375 px), danach Desktop (1280/1440 px). Prüfen: kein horizontales Scrollen, Menü, Akkordeon, keine Konsolenfehler.
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

- **Instagram:** Seit 18.10.2026 verlinkt die Website Paulas aktives Konto `@pm_beauty___` (vorher `@pm_paulabeauty`). Commit `fc48d45`.
- **Stripe-Links** für Gutscheine sind Platzhalter (`https://buy.stripe.com/PLATZHALTER_50/100/150`). Paula liefert echte Payment Links.
- **Impressum/Datenschutz:** Felder `[AUSFÜLLEN]` sind noch leer.
- **Schulungen:** Termine und Anmeldung laufen per DM. Gibt es später Termine oder einen Buchungslink, kommen sie in die Kurskarten.
- **`docs/prd.md` ist teilweise veraltet:** Preise werden nicht mehr gezeigt, die Bilder sind echt. Die Fakten (Leistungen, Zitate, Links) gelten weiter.

## 5. Weitere Quellen

- Figma-Datei „paula-webseite" (Key `ggdHcm9PScFCjahKxyFqDB`): finales Logo Knoten `1:32` (Lucas' Original), `11:2` (korrigiert), `15:2` (dünn), `16:15` (dünn, E kurz = Website).
- Kurskontext (Designfabrik, Ralph Ammer): `kurs/KURS.md` (Symlink, nur lokal).
- Vollständiger Verlauf aller Entscheidungen: `branding/workflow.md`.
