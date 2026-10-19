# PM Beauty · Kleinfassung für den Header (Entwurf 19.10.2026)

Anlass: Bewertung in `branding/logo-prompt.md`. In der dünnen Website-Fassung ist der Mittelstrich des E bei 96 px Logobreite nur 0,2 px breit, der Wortabstand PM|B beträgt 0,79 × Versalhöhe.

Vergleich: Tabelle unten. Die frühere Vergleichsseite und der Styleguide-Abschnitt sind entfernt (Lucas, 19.10.2026), beide stehen in der Git-Historie.

Alle drei Fassungen bauen auf `logo-final/pm-beauty-logo-korrigiert.svg` auf, also auf der normalen statt der dünnen Strichstärke. Der E-Überstand ist kurz wie auf der Website. Der Mittelstrich ist 1,75 statt 0,56 breit. Erzeugt per Python aus den Originalpfaden. Die Buchstaben sind nur verschoben, nicht verändert.

| Datei | Wortabstand PM\|B | E-Mitte | Mittelstrich bei 96 px | Kontrast Mittelstrich* |
|---|---|---|---|---|
| Original `logo-final/pm-beauty-logo-duenn-kurz.svg` | 27,31 = 0,79 × Versalhöhe | exakt | 0,20 px | 20 % |
| `pm-beauty-logo-klein-a-kraeftig.svg` | 25,45 = 0,73 × | exakt | 0,61 px | 61 % |
| `pm-beauty-logo-klein-b-eng.svg` | 17,35 = 0,50 × | 4,05 links der Tintenmitte (1,5 %) | 0,63 px | 70 % |
| `pm-beauty-logo-klein-c-kompromiss.svg` | 21,45 = 0,62 × | exakt (A, U, T, Y je 1 enger) | 0,63 px | 63 % |

\* Farbabstand des Mittelstrichs zum Hintergrund, gemessen im auf 96 px × 2 gerasterten Bild, bezogen auf eine voll gedeckte Fläche. Die E-Stämme kommen im Original auf 55 %, in allen Kleinfassungen auf 100 %.

**Gewählt: C** (Lucas, 19.10.2026), steht im Header, im mobilen Menü und im Footer. Empfehlung von Claude war ebenfalls C. Es behält die exakte Mitte, auf die sich Styleguide und Markenprofil berufen, und verkürzt den Wortabstand trotzdem spürbar. B schließt die Lücke am stärksten, aber dann stimmt die Aussage „das E sitzt exakt mittig“ nicht mehr. Der Preis von C: T|Y wird mit 1,99 Einheiten eng (bei 96 px etwa 0,7 px).
