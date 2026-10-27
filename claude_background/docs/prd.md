# PRD — PM Beauty Website

> **Stand 18.10.2026:** Teilweise veraltet. Preise werden auf der Website nicht mehr gezeigt, die Bilder sind echte Fotos, Schulungen sind dazugekommen. Aktueller Stand und Arbeitsweise: `docs/HANDOFF.md`. Die Fakten unten (Leistungen, Zitate, Links, Zeiten) gelten weiter.

## Overview

- **Produkt:** Einseitige Marketing-Website für „PM Beauty" — Beauty-Studio von Paula Maher, Fürstenrieder Straße 11, München.
- **One-liner:** Minimalistische deutsche Landing Page, die Behandlungen + Preise zeigt und Termine über Beautinda bucht.
- **Sprache:** Deutsch (lang="de").
- **Magic Moment:** Besucherin sieht sofort den „Termin buchen"-Button, findet in <30 s die Behandlung mit Preis und bucht auf Beautinda.
- **Erfolg:** Seite lädt schnell (statisch, keine Frameworks), wirkt hochwertig-minimal, funktioniert mobil einwandfrei.

## Technical Architecture

- **Stack:** Statisches HTML/CSS/Vanilla-JS. Kein Build-Step, keine Dependencies (nur Google Fonts).
- **Repo-Struktur:**
  - `index.html` — One-Pager
  - `impressum.html`, `datenschutz.html` — Rechtsseiten
  - `css/style.css`, `js/main.js`
  - `images/` — Stockfotos mit sprechenden Namen (`hero.jpg`, `about-paula.jpg`, `studio.jpg`, …), 1:1 gegen echte Fotos austauschbar
  - `docs/` — Planungs- und Design-Dokumente
- **Externe Links:**
  - Buchung: `https://beautinda.de/book/hebb68m5vleBjoPRrOEG3Bi5mP43/orders` (bzw. Artist-Profil `https://beautinda.de/artist/hebb68m5vleBjoPRrOEG3Bi5mP43`)
  - Instagram: `https://www.instagram.com/pm_beauty___/`
  - Gutscheine: Stripe Payment Links — Platzhalter `https://buy.stripe.com/PLATZHALTER_50` (50 €), `_100` (100 €), `_150` (150 €). Paula ersetzt sie durch echte Links.

## Inhalt (Fakten von Beautinda, Stand 2026-08)

- **Über mich:** „Hey, ich bin Paula. Beauty war für mich nie nur ein Trend, sondern schon immer eine Leidenschaft. Heute ist daraus ein Business mit klaren Standards geworden. Präzision, Ästhetik und Qualität stehen bei mir an erster Stelle. Willkommen bei PM Beauty" — Top Rated auf Beautinda.
- **Adresse:** Fürstenrieder Straße 11, München · Maps: https://www.google.com/maps?q=48.1418,11.50383
- **Öffnungszeiten:** Mo–Fr 10:00–20:00
- **Bewertung:** 5.0 ★ · 26 Bewertungen (Service 5.0 / Sauberkeit 4.9 / Pünktlichkeit 5.0)
- **Echte Zitate:** Viktoria (Korean Lashlift), Romy Tröscher, Scarlet (Classic Glow Facial) + 1 anonymes („beste Nägel…").

### Dienstleistungen (alle 38, Akkordeon nach Kategorie; Preis + Dauer + 1-Zeilen-Beschreibung)

**Maniküre (14):** Neumodellage Gel 65 €/1:10 · Neumodellage Gel Überlänge 75 €/1:20 · Shellack (inkl. russ. Maniküre) 55 €/1:00 · Shellack mit French 70 €/1:20 · Russische Maniküre inkl. Klarlack 35 €/0:30 · Auffüllen Gel 60 €/1:10 (keine Fremdarbeit) · Auffüllen Gel Überlänge 70 €/1:20 (keine Fremdarbeit) · French/Babyboomer 15 €/0:30 · Farbe 10 €/0:20 · Einfaches Design ab 20 €/0:30 · Mittelaufwendiges Design ab 30 €/0:40 · Aufwendiges Design ab 40 €/1:00 · Extrem aufwändiges Design ab 65 €/1:30 · Nägel entfernen 15 €/0:20

**Permanent Make-Up (7):** Microblading Erstbehandlung 280 €/2:30 · Lippenpigmentierung Erstbehandlung 280 €/2:30 · Powderbrows Erstbehandlung 280 €/2:30 · Nachbehandlung (4–6 Wochen) 100 €/1:30 · Auffrischung (12 Monate) 160 €/2:30 · Auffrischung (24 Monate) 200 €/2:30 · Remover 60 €/1:00

**Gesichts- & Körperbehandlungen (7):** Luxury Glas Skin Kombi 160 €/1:30 · Aquafacial & Microneedling 140 €/1:00 · Microneedling mit Lachs-DNA 120 €/1:00 · Microneedling 110 €/1:00 · Aquafacial 100 €/1:00 · Dermaplaning 80 €/1:00 · Classic Glow Facial 70 €/1:00

**Wimpernbehandlungen (7):** Korean Lashlift 70 €/1:00 · Korean Lashlift & Browlift 130 €/1:00 · Korean Lashlift & Browlift Deluxe 140 €/1:30 · Wimpernverlängerung 1:1 Neuanlage 110 €/2:30 · Wimpernverlängerung 2–5D Volumen Neuanlage 120 €/2:30 · Auffüllen (bis 21. Tag, keine Fremdarbeit) 70 €/2:00 · Wimpern entfernen 20 €/0:30

**Augenbrauenbehandlungen (3):** Brow Lifting Delux 80 €/1:30 · Korean Browlift 65 €/1:00 · Brow Shape & Tint 45 €/0:30

Jede Behandlung bekommt eine kurze, laienverständliche deutsche Beschreibung (z. B. „Russische Maniküre: besonders gründliche Nagelhautentfernung mit dem Fräser für ein extra sauberes Finish").

## UI/UX (Sektionen des One-Pagers)

1. **Header/Hero** — Wortmarke „PM BEAUTY" (+ „MÜNCHEN" in Mono), Navigation (Studio / Behandlungen / Gutscheine / Bewertungen / Kontakt), großer sichtbarer „Termin buchen"-Button above the fold, Hero-Bild.
2. **About & Studio** — Paulas Text, Porträt + Studiofoto, Fakten-Zeile in Mono (Standort, Öffnungszeiten, Top Rated).
3. **Behandlungen** — 5 Akkordeon-Kategorien, `<details>`-basiert; Zeile = Name + Beschreibung / Dauer (Mono) / Preis (Mono). Sticky/wiederholter Buchen-Button.
4. **Gutscheine** — 3 Karten (50/100/150 €) mit Stripe-Payment-Link-Buttons (Platzhalter, im Code klar mit `TODO` kommentiert).
5. **Bewertungen** — 5.0-★-Badge + Teilwertungen, 3–4 echte Zitate, Link „Alle Bewertungen auf Beautinda".
6. **Kontakt/Footer** — Adresse (Maps-Link), Öffnungszeiten, Instagram, Beautinda, Links zu Impressum & Datenschutz.

Rechtsseiten: vollständige deutsche Vorlagen mit `[AUSFÜLLEN]`-Platzhaltern (USt-ID etc.).

## Non-Functional

- Responsiv (Mobile-first, Grill: viele Besucher kommen von Instagram/Handy).
- Semantisches HTML, WCAG-AA-Kontraste, `prefers-reduced-motion` respektieren.
- Keine Cookies/Tracking → Datenschutzerklärung einfach; Google Fonts idealerweise lokal einbinden (DSGVO). Entscheidung: Fonts lokal herunterladen.

## Out of Scope

Eigenes Buchungssystem, CMS, Blog, Mehrsprachigkeit, Online-Zahlung außerhalb Stripe-Links, Deployment (später via launch-checklist).

## Open Questions (für Paula vor Go-live)

- Echte Stripe Payment Links einsetzen.
- Impressum-/Datenschutz-Platzhalter ausfüllen.
- Stockfotos gegen echte Fotos tauschen.
- OK für Verwendung der Kundenzitate mit Vornamen.
