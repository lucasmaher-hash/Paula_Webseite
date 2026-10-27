---
version: alpha
name: PM Beauty
description: Warm-minimal design system in Beige/Braun/Schwarz mit technischen Mono-Akzenten für die PM Beauty Website.

colors:
  background: "#F2EDE5"
  surface: "#EAE3D8"
  surface-raised: "#F7F3EC"
  primary: "#221C16"
  on-primary: "#F5F1EA"
  on-surface: "#221C16"
  on-surface-muted: "#75695C"
  accent: "#8A6D57"
  accent-pink: "#D9A8A4"
  accent-pink-soft: "#EFD9D6"
  border: "#D9CFC1"

typography:
  display:
    fontFamily: "Instrument Sans"
    fontSize: clamp(2.6rem, 7vw, 4.75rem)
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Instrument Sans"
    fontSize: clamp(1.7rem, 3.5vw, 2.4rem)
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Instrument Sans"
    fontSize: 1.2rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Instrument Sans"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  mono-label:
    fontFamily: "Space Mono"
    fontSize: 0.72rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.12em"
  mono-value:
    fontFamily: "Space Mono"
    fontSize: 0.9rem
    fontWeight: 400
    lineHeight: 1.5

rounded:
  sm: 6px
  md: 14px
  lg: 26px
  full: 999px

spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 24px
  6: 32px
  7: 48px
  8: 72px
  9: 112px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.mono-value}"
    rounded: "{rounded.full}"
    padding: 16px 32px
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    typography: "{typography.mono-value}"
    rounded: "{rounded.full}"
    padding: 16px 32px
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.mono-value}"
    rounded: "{rounded.full}"
    padding: 16px 32px
  chip-mono:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.full}"
    padding: 6px 14px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 32px
  accordion-row:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 20px 24px
  voucher-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 32px
---

# PM Beauty Design System

## Overview

Website für PM Beauty, das Münchner Studio von Paula Maher (PMU, Nägel, Facials, Lashes). Publikum: Kundinnen, die von Instagram kommen — mobil, visuell verwöhnt. Gefühl: ruhig, präzise, hochwertig — wie ein sauber gedecktes Behandlungs-Setup. Referenz ist die Eeios-Ästhetik: warme Beige-Flächen, große runde Karten, technische Monospace-Labels in eckigen Klammern. Anti-Patterns: kein glitzerndes „Girly-Rosa"-Template, keine Schnörkel-Schriften, keine überladenen Effekte.

## Colors

`background` (#F2EDE5) ist warmes Papier-Beige, `surface` eine Nuance dunkler für Karten, `surface-raised` heller für Zeilen auf Karten. `primary` ist ein warmes Fast-Schwarz — Text und Haupt-CTA. `accent` (#8A6D57) ist das Braun für Hover und Unterstreichungen. Pink existiert nur als Flüstern: `accent-pink` für kleine Details (Sterne-Highlight, Hover-Glow), `accent-pink-soft` als Flächen-Tönung. Kontrast: primary auf background ≈ 14:1, on-surface-muted auf surface ≥ 4.5:1 — AA erfüllt.

## Typography

Instrument Sans (Grotesk, leicht warm) trägt Headlines und Fließtext; eng gesetzte Displays geben die editoriale Ruhe der Referenz. Space Mono liefert den technischen Kontrapunkt: Preise, Dauern, Labels wie `[MANIKÜRE]` — immer klein, versal, gesperrt (`mono-label`) oder als Wert (`mono-value`). Nie Mono für lange Absätze.

## Layout

Container max. 1200 px, Seitenränder `spacing.5`–`spacing.6`. Sektionen atmen mit `spacing.8`–`spacing.9` vertikal. Innerhalb von Karten komfortable Dichte (`spacing.4`–`spacing.6`). Mobile-first: eine Spalte, Akkordeons volle Breite, CTA immer erreichbar.

## Elevation & Depth

Keine Schatten-Hierarchie: Tiefe entsteht durch Flächen-Abstufung (background → surface → surface-raised) und 1-px-`border`. Nur interaktive Elemente dürfen beim Hover einen hauchzarten Schatten bekommen. Das hält die Seite flach, ruhig, druckartig.

## Shapes

Große Radien wie in der Referenz: Karten `rounded.lg`, Zeilen/Innenelemente `rounded.md`, Buttons und Chips `rounded.full`. Nichts ist scharfkantig — Weichheit signalisiert Pflege; die Mono-Typo hält es technisch.

## Components

`button-primary` ist der einzige dunkle Vollflächen-Button (Termin buchen) — Mono-Schrift, Pill-Form; Hover wechselt auf `accent`. `button-outline` für Zweit-Aktionen (Gutschein, Beautinda). `chip-mono` für Meta-Infos (Standort, Öffnungszeiten, Kategorie-Zähler). `card` für About/Bewertungen, `accordion-row` für Behandlungszeilen (`<details>`), `voucher-card` für die drei Gutschein-Stufen. States: Hover = Farbe/Unterstreichung, Focus = 2-px-Ring in `accent`, Disabled = 40 % Opazität.

## Do's and Don'ts

**Do:** Mono nur für Labels/Zahlen · viel Leerraum, Sektionen klar trennen · Pink sparsam als Detail · alle Werte aus Tokens · echte deutsche Sprache, keine Anglizismen-Flut · große Radien konsequent.
**Don't:** kein reines Weiß oder kaltes Grau · keine Schlagschatten-Orgien · kein Pink als Flächenfarbe · keine Serifen/Script-Fonts · keine Icons-Bibliothek mit 20 Stilen · nie Preise im Fließtext verstecken.
