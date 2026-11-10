# Seitenplan: PM Beauty Website

Stand 31.10.2026. Nachträglicher Abgleich der gebauten Seite (`Paula's website/index.html`) mit dem Briefing, kein vorab durchlaufener Planungsschritt. Ersetzt die von Ammers Prompt vorgeschlagene `skizze.jpg` durch eine Textskizze.

## Modell

Onepager, Handy zuerst (375 px). Menü springt per Anker zu den Abschnitten. Zusätzlich `impressum.html` und `datenschutz.html`.

## Reihenfolge und Weg zur Buchung

```
┌ Header (sticky): Logo · Studio · Behandlungen ▾ · Schulungen · Gutscheine · [Termin buchen]
│
├ 1 Hero ............ Paula, Leitsatz, [Termin buchen] ─────────────────┐
├ 2 Auszeichnungen .. Lorbeer: 5,0 ★, Bewertungen                      │
├ 3 Ergebnisse ...... Nahaufnahmen aus dem Studio                      │
├ 4 Studio (#studio) Über Paula                                        │
├ 5 Behandlungen (#behandlungen)                                       │
│     fünf Kategorien als Akkordeon: Maniküre · Permanent Make-up ·    │
│     Gesicht & Körper · Wimpern · Augenbrauen                         │
│     jede Kategorie: Behandlungen mit Dauer, [Preise & Termin] ─────────────────┤
├ 6 Schulungen (#schulungen)  Korean Lash- & Browlift, Anfrage         │
├ 7 Gutscheine (#gutscheine)  Betragsstufen, [Kaufen]                  │
├ 8 Bewertungen (#bewertungen)                                         │
├ 9 Kontakt (#kontakt) Adresse, Öffnungszeiten, Karte, [Termin buchen] ┤
└ Footer: Instagram · Impressum · Datenschutz                          ▼
                                                    Beautinda (Buchungsseite)
```

Behandlung finden: Menü → Kategorie (1 Klick, öffnet das Akkordeon) → „Preise & Termin“ der Kategorie (2. Klick). Das erfüllt das Briefing-Kriterium „höchstens zwei Klicks“, getestet ist es noch nicht auf einem echten Handy.

## Wiederkehrende Komponenten

Eyebrow-Label · Akkordeon-Zeile · Pillen-Button (Hauptbutton braun, Zweitbutton soft) · Panel mit 1-px-Rahmen · Lorbeer · Mono-Label. Regeln in `design.md`.

## Abgleich mit dem Briefing

| Briefing | Seite | Stand |
|---|---|---|
| Hero mit Paula und Terminbutton | Abschnitt 1 | vorhanden |
| Fünf Behandlungskategorien | Abschnitt 5 | vorhanden |
| Über Paula & Studio | Abschnitt 4 | vorhanden |
| Schulungen | Abschnitt 6 | vorhanden |
| Gutscheine | Abschnitt 7 | vorhanden, **Kaufen-Buttons führen auf `PLATZHALTER`-Links** |
| Bewertungen | Abschnitt 8 | vorhanden |
| Kontakt | Abschnitt 9 | vorhanden |
| Keine Behandlungspreise | – | eingehalten (Gutschein-Beträge erlaubt) |
| Keine Dopplungen | Abschnitte 2 und 8 zeigen beide Bewertungen | **zu prüfen**: Auszeichnungen und Bewertungen sind teils dasselbe Thema |

## Offen

- Gutschein-Kaufweg: echte Stripe-Links von Paula oder ein Anfrageweg (z. B. Instagram-Nachricht).
- Impressum und Datenschutz: offene Felder, Angaben von Paula nötig.
- Test auf echtem Handy, Zielgruppenannahmen von Paula bestätigen lassen.
