# PM Beauty · Logoentwurf 05

Erstellt am 18.10.2026 nach Lucas' Screenshots und handgezeichneter E-Referenz.

- `pm-beauty-black.svg`: dunkle Wortmarke, transparenter Hintergrund.
- `pm-beauty-white.svg`: weiße Wortmarke, transparenter Hintergrund.
- `pm-beauty-E.svg`: einzeln verwendbares, selbst konstruiertes E.
- `pm-beauty-preview.png`: Vorschau auf dunklem Hintergrund.
- `source/build_logo.py`: reproduzierbare Konstruktion mit fontTools.
- `source/geometry.json`: Maße und Buchstabenpositionen.

Schrift: **Cormorant Unicase Regular**. Auf Lucas' Wunsch ist das B gegenüber der Originalkontur 8 % breiter und das A 6 % schmaler; die Höhe bleibt gleich. Der A–U-Abstand wurde von 8 auf 3 SVG-Einheiten reduziert. Alle sieben Schriftzeichen sind in Vektorpfade umgewandelt. Das E ist eine eigene, geschlossene, symmetrische Bézierkontur. Seine zwei hohen Außenstriche enden oben gerade; die unteren Übergänge und der kurze Mittelsteg nehmen die geschwungenen Serifen der Skizze auf.

Die Mittelachse des E liegt exakt auf der Mitte der sichtbaren Gesamtbreite. Der P–M-Abstand beträgt jetzt 32 statt 48 SVG-Einheiten. Die frei gewordenen 16 Einheiten gehen in den Wortabstand M–B, sodass PM enger zusammensteht und die Gesamtbreite sowie die E-Mitte erhalten bleiben.

In Entwurf 05 wurde gegenüber Entwurf 04 zuerst der untere Balken um 40 % verdickt (6,9 → 9,66 Einheiten) und der Mittelsteg um 30 % verschmälert (6,9 → 4,83 Einheiten). Danach wurde das ganze E gleichmäßig um 30 % vergrößert, mit dem Anker auf der Grundlinie und der horizontalen Mitte. Dadurch betragen die finalen Strichstärken 12,558 und 6,279 Einheiten. Die E-Breite ist jetzt 130 statt 100 Einheiten, seine Höhe 321,88 statt 247,6. Die Buchstabengruppen wurden jeweils 15 Einheiten nach außen verschoben, sodass die Abstände zum E und die geometrische Zentrierung erhalten bleiben. Die zuvor verlängerten Serifen skalieren mit.

Die SVG-Dateien enthalten keine Textobjekte, Bilder oder externen Abhängigkeiten. Sie können in Figma gezogen und dort als Vektoren bearbeitet werden. Ein Import dieser Fassung in Figma wurde nicht durchgeführt.

Originalschrift und SIL Open Font License liegen in `source/`. Quelle: https://github.com/google/fonts/tree/main/ofl/cormorantunicase

Status: fünfter konstruierter Entwurf, noch nicht von Paula oder Lucas freigegeben. Frühere Entwürfe sind unter `versions/01/` bis `versions/04/` archiviert. Die sehr feinen Schriftlinien benötigen bei kleinen Anwendungen eine gesonderte optische Anpassung.
