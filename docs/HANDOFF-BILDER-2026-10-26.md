# PM Beauty · Bild-Handoff an Claude · 26.10.2026

Die Bildgenerierung und die Einbindung in den Styleguide sind jetzt umgesetzt. Einstieg: `AGENTS.md`, `docs/HANDOFF.md`, `CLAUDE.md`, `branding/assets/mockups/PROMPTS.md`.

- `styleguide.html#moodboard`: elf zusammenpassende KI-Motive, darunter die neue Neunerserie, das Handfoto **ohne** Logo in der Schale und der Empfang mit Wandlogo.
- `styleguide.html#bilder`: sechs Detailbilder und die Regeln für Direktblitz, Textur, Braun/Beige/Pink und ehrliche Kennzeichnung.
- `styleguide.html#anwendung`: sieben Foto-Mockups plus die bisherige interaktive Handyvorschau. Enthält die Visitenkarten und Terminkarte `logo-v2`, Tasche `logo-v3`, beide Empfangsräume, Glasbehälter und Wattestäbchen.
- PNG-Originale in `branding/assets/mockups/`; verlustbehaftet komprimierte, unbeschnittene WebP-Kopien in `images/mockups/`. Export: `python3 branding/assets/mockups/make_web_images.py`.
- **Aktuelle Tasche:** `papierverpackung-direktblitz-logo-v3.png`; Logo auch auf dem pinken Anhänger. v2 ist nur ein Zwischenstand.
- **Aktuelles Handfoto:** `hand-naegel-leinen-direktblitz-v1.png`. Die Variante mit Logo in der Schüssel wurde auf Lucas' Wunsch gelöscht und darf nicht wieder eingebunden werden.
- Originales Logo: `branding/assets/pm-beauty-logo/versions/v12/pm-monogram-v12.svg`. Nicht neu zeichnen. Auf Nahaufnahmen von Nägeln/Haut kein künstliches Logo legen.
- Die generierten Motive nicht als Paulas Arbeiten, reale Kundinnen, tatsächliche Studioräume oder reales Sortiment ausgeben. Die Wattestäbchen-Verpackung ist ein freies Anwendungskonzept mit Lucas' Textfreigabe.
- Kein zusätzlicher Braun-/Pink-Filter über die neue Serie. Keine Behandlungspreise ergänzen.
- `index.html`, `css/` und `js/` wurden bei dieser Integration nicht geändert. Die Kundenwebsite zeigt weiterhin ihren vorherigen Bildbestand. Ein weiterer Bildaustausch dort braucht eine saubere Trennung von Stimmungsbildern und belegten Arbeiten.
- Projektregeln beibehalten: Handy zuerst, Workflow-Log, commit/push auf main und Pages-Deploy prüfen.
