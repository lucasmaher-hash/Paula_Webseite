# v10 · Reinzeichnung des skizzierten PM-Monogramms (21.10.2026, auf der Website)

Quelle: dieselbe Bleistiftskizze wie v9 (`source/source-sketch.jpeg`). v9 bleibt als Datei unverändert. **Seit 21.10.2026 steht v10 (100 %) auf der Website** (Header, mobiles Menü, Footer, als `<symbol id="pm10">` in `index.html`) und ist das einzige Monogramm im Styleguide.

Statt zwei Linien mit fester Breite ist v10 ein Strich mit wechselnder Breite, gezeichnet aus geraden Abschnitten und Kreisbögen:

- Linke Kante, Oberkante der Linie, beide M-Spitzen und die Unterkante liegen auf einem Rechteck (im Bild gemessen: Spitzen und Linie oben auf y 137, V und Unterlinie unten auf y 897, Koordinaten der Skizze 1600 × 955).
- Nur der Schnörkel oben links und der Schwung unten rechts ragen heraus. Unten links eine fast spitze Ecke mit kleinem Radius.
- Waagrechte und senkrechte Striche dünn (31), Diagonalen kräftig (54–62); die Breite wechselt nur innerhalb der Kurven. Die drei Diagonalen sind leicht gebogen, wie in der Skizze.
- Unten rechts: die Grundlinie hebt sich und schwillt zu einem Tropfen an, der nach rechts oben zeigt (nachgemessen an der Skizze).

## Dateien

| Datei | Inhalt |
|---|---|
| `pm-monogram-v10.svg` | Umriss bei 100 % Strichstärke, `currentColor`, viewBox `30 -20 1590 950` |
| `pm-monogram-v10.json` | Umrisse für 60–160 % in 5-%-Schritten (`widths`), Mittellinie des Zugs (`main`, x/y/Breite), P-Stamm (`i`) und die Ecken als Bogenlänge (`cuts`) für die Schreibanimation |
| `preview.png` | Vorschau auf Paulas Creme |
| `source/` | Bauskripte (Python, Pillow, SciPy, potracer) und die Parameter |

Alle Stärken teilen dieselbe Mittellinie; der Regler im Styleguide tauscht nur den Umriss.

## Neu erzeugen

In einem leeren Arbeitsordner mit Kopien der Skripte aus `source/`: `python solve.py "$(cat params-final.json)"` löst die Spitzen und das V auf die Rahmenkanten, `python variants.py` rendert die Stärken, `python build.py '{...params, "centre": "centre.json"}'` schreibt die Mittellinie, `python export.py` packt beides. `export.py` bricht ab, wenn die Ausgabedateien schon existieren (siehe `VERSIONING.md`): neue Stände in `versions/v11/`.

Styleguide: Abschnitt „Logo“ (Strichstärke) und „Bewegung“ (Schreibanimation mit Reglern).
