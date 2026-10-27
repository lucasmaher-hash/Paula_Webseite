# PM Beauty · finales Logo

Quelle: Figma-Datei „paula-webseite", Knoten `1:32` („Group 1"), gewählt von Lucas am 18.10.2026.

| Datei | Zweck |
|---|---|
| `pm-beauty-logo.svg` | Für Code. Farbe über `currentColor`, Text als Pfade, Striche als Flächen. Keine Schrift nötig. |
| `pm-beauty-logo-korrigiert.svg` | Korrigierte Kopie, sonst wie oben: E exakt mittig, Mittelstrich mittig, Fuß symmetrisch. viewBox 0 0 273,331 98. In Figma als Knoten `11:2` über dem Original. |
| `pm-beauty-logo-duenn.svg` | Dünne Fassung der korrigierten Kopie: senkrechte Striche 30 % dünner (Stamm 4,12 → 2,88, E-Außenstriche 3,5 → 2,45, Mittelstrich 0,8 → 0,56). Waagrechte Linien, Haarlinien, Höhen und Spitzen unverändert, E exakt mittig. In Figma Knoten `15:2`. |
| `pm-beauty-logo-duenn-kurz.svg` | **Auf der Website (seit 18.10.2026).** Dünne Fassung, E-Überstand über den Versalien 40 % kürzer (51,28 → 30,77). viewBox 0 20,512 273,33 77,488. In Figma Knoten `16:15`. |
| `figma-export-raw.svg` | Unveränderter Figma-Export (weiß, Striche als `stroke`). Nur als Referenz. |

`pm-beauty-logo.svg` und `figma-export-raw.svg` rendern pixelgleich (Vergleich bei 8-facher Auflösung, 0 abweichende Pixel).

### Was die korrigierte Kopie ändert

- B und AUTY rücken um 3,691 nach rechts, das E um 3,915. Dadurch wird der Wortabstand PM|B 3,691 breiter; B|E und E|A sind beide 5,102 (vorher 4,878 und 5,327).
- E-Mitte = Tintenmitte = viewBox-Mitte = 136,665 (im Browser gemessen, Abweichung 0,001).
- Mittelstrich exakt auf der E-Mitte.
- Fuß spiegelsymmetrisch: beide Enden auf y = 86 (Grundlinie), Kontrollpunkte als Mittelwert der Figma-Werte (Einzug 1,104, Höhe 80,8465).
- Beide Außenstriche 82,5 hoch (vorher 81,5 und 82,5; der Unterschied lag im Fuß verdeckt).

## Einbinden

Inline, damit die Farbe aus dem CSS kommt:

```html
<a href="/" class="logo" style="color: #fff">
  <!-- Inhalt von pm-beauty-logo.svg hier einfügen -->
</a>
```

```css
.logo svg { width: 268px; height: auto; display: block; }
```

Als Bild (`<img src="pm-beauty-logo.svg">`) wird `currentColor` schwarz. Für helle Schrift auf dunklem Grund dann inline verwenden oder `fill="currentColor"` durch eine feste Farbe ersetzen.

## Maße (viewBox 0 0 268 98)

- Schrift: Italiana Regular, 49,6 px, in Pfade umgewandelt. Grundlinie y = 86.
- E: Außenstriche x 114–117,5 und 148–151,5 (3,5 breit), Mittelstrich x 132–132,8 (0,8 breit) von y 59 bis 81, Fuß y 81–86.

## Bekannte Unregelmäßigkeiten in `pm-beauty-logo.svg` (aus Figma übernommen, in der korrigierten Kopie behoben)

- E-Mitte liegt bei x = 132,75, die Mitte der Wortmarke (Tinte 3,47–266,17) bei 134,82. Das E sitzt also 2,07 Einheiten links der Mitte.
- Der Mittelstrich (Mitte 132,4) liegt 0,35 links der E-Mitte.
- Der Fuß ist nicht symmetrisch: rechts endet er bei y = 86, links bei 85,5.
