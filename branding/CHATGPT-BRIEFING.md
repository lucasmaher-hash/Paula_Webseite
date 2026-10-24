# ChatGPT-Briefing: Bilder und Videos für PM Beauty

Einstieg für ChatGPT (Bildgenerierung, Sora/Video) und jede KI, die Visuals für die Marke erzeugt. Stand 24.10.2026. Ein Bild entsteht nie aus diesem Dokument allein: Lucas hängt die genannten Referenzdateien an den Chat an.

## Auftrag (Designfabrik, Abgabe Mo 26.10.2026)

Kursaufgabe von Ralph Ammer: eine **Visualisierung der Anwendung der Marke (Foto und/oder Video)** für den Styleguide. Gezeigt wird, wie PM Beauty im Alltag aussieht: Visitenkarte, Terminkarte, Website auf dem Handy, Studioschild/Fenster, Verpackung, Social Media. Die Visuals sind Mockups der Marke, keine Fotos des echten Studios.

## Marke in fünf Sätzen

PM Beauty ist das Beauty-Studio von Paula Maher, Fürstenrieder Straße 11, München (Nägel, Permanent Make-up, Wimpern/Brauen, Facials). Kernsatz: **Präzise Schönheit, die bleibt.** Charakter: eine Goldschmiedin mit Lupe, ruhig, konzentriert, warm, nie klinisch. Gestaltungsprinzip: **„Die Mitte“**, Wichtiges steht exakt mittig oder auf einer klaren Achse. Fotos sind Nahaufnahmen in abgerundeten Rahmen. Bewegung ist langsam ein, weich aus.

Nicht: glitzernd, Rosé-Gold-Script-Optik, Insta-Baddie, Rabatt-Look, klinisch-kalt, perfekte Filter-Haut. Volltext: `branding/markenprofil.md`.

## Gestaltungswerte

| Rolle | Wert |
|---|---|
| Braun Text/Logo | `#745449` |
| Braun Button | `#A17463` |
| Braun mittel | `#9E5E47` |
| Papier/Hintergrund | sehr helles warmes Beige (Braun-Ton, ca. 95 % Helligkeit), Fast-Schwarz als Gegenpol |
| Pink Akzent | `#D19FA6`, weich `#E8CFD3`, dunkel `#634046` |
| Foto-Wandton | `#A39588` (warmes Taupe) |
| Überschriften | Gambarino 400 |
| Text | Instrument Sans |

Regel: braun als Basis, **höchstens eine pinke Fläche pro Motiv**, sonst nur Details. Warme Flächen statt harter Schatten. Quelle der Werte: `css/style.css`, Styleguide `styleguide.html`.

## Logo

Handgezeichnetes **PM-Monogramm** (v12), Strichstärke wechselnd. Es darf **nie von der KI neu gezeichnet, interpretiert oder „verbessert“ werden**. Generiere Motive immer mit Platzhalter oder leerer Fläche, und Lucas setzt das echte SVG danach ein, **oder** Lucas hängt die PNG-Vorschau an und der Prompt sagt „use the attached logo exactly, do not redraw it".

Dateien zum Anhängen:
- `branding/assets/pm-beauty-logo/versions/v12/pm-monogram-v12.svg` (groß), `pm-monogram-v12-small.svg` (klein)
- `branding/assets/pm-beauty-logo/pm-beauty-preview.png` (nur Orientierung, kann älter sein; vor dem Anhängen prüfen, ob es v12 zeigt)
- Ältere Wortmarke (Italiana) ist Archiv, nicht verwenden.

Hinweis: ChatGPT-Bildmodelle verzerren Logos und Text zuverlässig. Besser: Motiv ohne Schrift erzeugen, Logo und Texte danach im Styleguide/Figma einsetzen.

## Referenzbilder

- Echte Studio- und Ergebnisfotos: `branding/assets/photos/originals/` (Lippen, Brauen/Wimpern, Lashlift, Nägel, Microneedling, Tuchmaske, Portrait `paula-portrait.jpg`).
- Website-Ansicht: `index.html` (lokal `http://127.0.0.1:8080`), Screenshot anhängen.
- Moodboard und Anwendungs-Mockups: `styleguide.html` (`#moodboard`, `#anwendung`).
- Bisherige Bildprompts (Stil und Ton): `branding/assets/photos/HERO-OUTPAINT.md`.

## Harte Regeln

1. **Paula ist eine reale Person.** Kein KI-Gesicht als Paula ausgeben. Bearbeitungen am Portrait nur mit dem Original als Eingabe und Lucas' Freigabe (siehe HERO-OUTPAINT.md). Keine generierten Personen als „Kundinnen von PM Beauty“ ausgeben.
2. **Keine erfundenen Fakten im Bild:** keine Preise, Behandlungen, Bewertungen, Zitate, Telefonnummern. Erlaubt auf Mockups: Name, Adresse, `@pm_beauty___`, Öffnungszeiten Mo–Fr 10–20 Uhr, „Dein nächster Termin.“
3. **Keine Vorher-Nachher-Bilder, keine fremden Arbeiten** als Paulas Ergebnisse.
4. KI-generierte Mockups und Stimmungsbilder im Styleguide als solche kennzeichnen (Bildunterschrift „KI-generiertes Mockup“). Ammer will den KI-Einsatz sehen, nicht verstecken.
5. Rückgabe immer als Datei mit Prompt: Bild in `branding/assets/mockups/`, Prompt und Modell in `branding/assets/mockups/PROMPTS.md`, Eintrag im Logbuch von `branding/workflow.md` (versucht / funktioniert / nicht funktioniert). Das ist Teil der Workflow-Abgabe.

## Startprompts (anpassen, dann mit Referenzen anhängen)

**Visitenkarte (Foto)**
> Photorealistic product photo, top-down, of a business card and a second card on a warm linen surface. Front card: matte brown (#745449) with an empty centered area where a monogram will be added later. Back card: pale warm beige, empty. Soft diffused daylight, no hard shadows, calm, premium, minimal. Muted palette of brown, beige and one small dusty-pink detail (#D19FA6). No text, no logo, no glitter, no rose-gold.

**Studio-Moment (Foto)**
> Close-up photograph of a manicured hand resting on a warm beige linen cloth beside a small brown ceramic dish, natural soft window light, shallow depth of field, calm precise mood, like a goldsmith's workbench. Warm taupe background (#A39588). No text, no logo, no face.

**Video (5–8 s, Sora o. Ä.)**
> Slow, calm camera move over a tidy beauty-studio table in warm brown and beige tones: a pale card slides into the exact center of the frame and stops, soft daylight, no cuts, no text. Everything stays centered on one vertical axis.

Danach pro Motiv: Lucas sichtet, wählt, setzt Logo und Text selbst ein.

## Rückgabe an Claude

Wenn Lucas fertige Dateien in `branding/assets/mockups/` ablegt, bindet Claude sie in `styleguide.html` (Abschnitt `#anwendung`) ein, aktualisiert die Bildunterschriften, den Workflow und `kurs/KURS.md` und pusht.
