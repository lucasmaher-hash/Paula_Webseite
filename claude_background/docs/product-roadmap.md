# Roadmap — PM Beauty Website

**Status:** Alle Phasen abgeschlossen ✅ (Platzhalter: Stripe-Links, Impressum-Daten, echte Fotos)

## Build Philosophy

Statisch, klein, hochwertig. Jede Phase hinterlässt eine funktionierende Seite. Design-Tokens kommen ausschließlich aus `docs/design.md`.

## Phase 1 — Fundament & Assets

- [x] **TASK-001** — Projektstruktur anlegen
  Files: `index.html`, `css/style.css`, `js/main.js`, `images/`
  Notes: HTML5, `lang="de"`, Meta-Description, OG-Tags.
- [x] **TASK-002** — Fonts lokal einbinden (DSGVO)
  Files: `fonts/`, `css/style.css`
  Notes: Sans (Instrument Sans o. Inter) + Mono (Space Mono o. JetBrains Mono) als woff2, `@font-face`.
- [x] **TASK-003** — Stockfotos laden
  Files: `images/hero.jpg`, `images/about-paula.jpg`, `images/studio.jpg`, ggf. Kategorie-Bilder
  Notes: Unsplash/Pexels, beige-tonig; Dateinamen 1:1 austauschbar.

## Phase 2 — One-Pager

- [x] **TASK-004** — Hero + Header mit Wortmarke, Nav, „Termin buchen"-CTA
- [x] **TASK-005** — About & Studio Sektion
- [x] **TASK-006** — Behandlungen: 5 Akkordeons, alle 38 Leistungen mit Preis/Dauer/Beschreibung
- [x] **TASK-007** — Gutschein-Sektion mit 3 Stripe-Platzhalter-Links (TODO-Kommentare)
- [x] **TASK-008** — Bewertungen: 5.0-Badge, Zitate, Beautinda-Link
- [x] **TASK-009** — Kontakt/Footer mit Adresse, Zeiten, Social, Rechtslinks

## Phase 3 — Recht & Politur

- [x] **TASK-010** — `impressum.html` + `datenschutz.html` mit [AUSFÜLLEN]-Platzhaltern
- [x] **TASK-011** — design-better-Polish: Hierarchie, Hover/Focus-States, Motion (reduced-motion), Mobile-Feinschliff
- [x] **TASK-012** — Verifikation im Browser (Desktop + Mobile-Viewport), Links prüfen

## Agent Session Guide

Eine Session pro Phase reicht; Tokens aus `docs/design.md` niemals inline erfinden.
