# Schulungsplakate PM Beauty · 27.10.2026

## Auftrag und Entscheidung

Lucas: Beauty-Schulungen, Titelbilder, Plakate und Posts recherchieren; zwei Motive für die angebotenen Schulungen generieren. Die Motive sollen zum vorhandenen Content passen und ausdrücklich als Schulungsangebote erkennbar sein.

Gestaltung: gemeinsames 3:2-Plakatsystem, große Kennzeichnung „SCHULUNG“, braune Serifentitel auf warmem Beige, jeweils ein pinkes Foto-Panel mit Direktblitz-Stillleben aus Übungsunterlagen und Werkzeugen. Keine fremden Marken übernommen, kein neu interpretiertes PM-Monogramm. Die dargestellten Lernmaterialien sind Illustrationen, keine dokumentierten Unterlagen aus Paulas Kursen.

Texte aus den vorhandenen Kurskarten: Korean Lash & Browlifting / Intensiv-Schulung / 1 Tag; Russian Manicure & Gel / Masterclass / 2 Tage; jeweils Theorie und Praxis. Keine Preise, Termine oder zusätzlichen Leistungsversprechen ergänzt.

## Recherche

- [The Lash Co Academy · Korean Lash Lift](https://learnlashco.com/products/korean-lash-lift): Kursflyer mit explizitem Trainingstitel, Praxis- und Lerninhalten. Visuell gesichtet. Übernommen wurde die klare Trennung von Kursbezeichnung und Lernkontext, nicht das Layout oder die Fotos.
- [Katie Barnes Education · Russian Manicure Masterclass](https://www.katiebarnesacademy.com/collections/in-person-courses/products/katie-barnes-in-person-russian-manicure-masterclass): Titelbild macht mit großer Schrift ausdrücklich auf eine Masterclass aufmerksam. Visuell gesichtet. Für PM Beauty um ein Lernmaterial-Stillleben erweitert.
- [Level Up Beauty Academy · Korean Lash Lift](https://levelupbeautytraining.com/products/korean-lash-lift-training-course-in-person): Referenz für reduzierte Kurskennzeichnung und Theorie-/Praxis-Kontext.

Web- und Bildersuche am 27.10.2026. Fremde Referenzbilder nur temporär zur Sichtung heruntergeladen, nicht ins Repo oder auf die Website übernommen. Keine fremden Kursinhalte, Preise oder Zertifizierungen als PM-Beauty-Leistungen verwendet.

## Dateien und Werkzeug

- `schulung-korean-lash-browlifting-poster-v1.png` · Original, 1536 × 1024 px
- `schulung-russian-manicure-gel-poster-v1.png` · Original, 1536 × 1024 px
- WebP-Kopien unter `website/images/mockups/`, unveränderter Ausschnitt, Qualität 90
- Werkzeug: eingebautes Imagegen (`image_gen.imagegen`), zwei separate Generierungen. Kein CLI/API-Fallback. Modellkennung wurde vom Werkzeug nicht ausgegeben.
- Eingebunden ausschließlich in `website/index-experimentell.html`. Bilddarstellung mit `object-fit: contain`, damit der Plakattext vollständig sichtbar bleibt.

## Vollständige Prompts

### Korean Lash & Browlifting

```text
Use case: ads-marketing. Create ONE finished high-end editorial BEAUTY TRAINING COURSE COVER POSTER, landscape 3:2, ideally 1536 x 1024. This is a typography-led designed promotional graphic for PM Beauty Academy in Munich, not an ordinary beauty photograph and not a photograph of a poster on a wall. Flat edge-to-edge digital artwork, ready for a website course card or social post. It must instantly read as EDUCATION / SCHULUNG even as a small thumbnail.
Art direction: a calm contemporary Munich beauty studio, precise craft, warm and elegant. Warm cream #F6EDEA background, dark warm brown typography #745449, brown #A17463, exactly one substantial dusty pink #D19FA6 / #E8CFD3 photographic panel on the right. No black/white stock template, glitter, gold, neon, flowers, swirls, clip art, stickers, discount graphics, fake dates, price, claims, awards, certificate seals, third-party brands, or QR codes.
Layout: common family grid. Left about 53% is mostly warm cream negative space with a clear aligned editorial text hierarchy. Upper left small tracked clean sans serif 'PM BEAUTY ACADEMY'. Immediately below a very prominent uppercase sans serif 'SCHULUNG'. Then the course name in very large beautiful sculptural warm-brown display SERIF typography, in the spirit of Gambarino, elegant and highly legible, carefully spaced across two or three lines. Secondary course type beneath in a restrained rounded outlined brown capsule. Small but comfortably readable footer gives duration and theory/practice. Do not cram in extra copy.
Right about 47% is a beautifully art-directed rectangular photograph with softly rounded 28px corners, of an educational tabletop still life on the SINGLE dusty-pink surface. Direct on-camera FLASH, compact-camera editorial snapshot, crisp glossy reflections and short hard shadows, tactile beige paper and linen, warm taupe materials. It is important to show learning / training materials and relevant tools, not merely a finished eye or nail beauty closeup. Styling belongs to the same beige/brown/pink direct-flash photography series as a warm salon brand. Photographic elements are tangible, realistic, not a cartoon, not a 3D render. No faces or instructor portraits, and do not imply that this is a real photograph of Paula's classes.
Keep every important text element inside a generous 70px safe margin, balanced spacing, no overlap. All spelling must be EXACT, especially umlaut and ampersands. Do not invent or redraw a monogram logo; the brand is represented by the plain small typed name only. No extra words whatsoever beyond the exact listed text.
Exact text, verbatim:
"PM BEAUTY ACADEMY"
"SCHULUNG"
"Korean Lash"
"& Browlifting"
"INTENSIV-SCHULUNG"
"1 TAG · THEORIE & PRAXIS"
Photographic panel subject: a neat open cream training workbook with a single minimal dark-brown eyelash/brow mapping line diagram (no invented written instructions), two realistic pale silicone lash-lifting shields, a clean brown-handled fine application brush and a beige spoolie brush arranged with precise negative space; a small cropped direct-flash photographic detail of a natural closed eye and brow may appear as a printed reference photo on the workbook, not as a second free-floating panel. Tools and workbook unmistakably communicate a hands-on beauty workshop. No synthetic oversized eyelash extensions, bottles with fake labels or random text.
```

### Russian Manicure & Gel

```text
Use case: ads-marketing. Create ONE finished high-end editorial BEAUTY TRAINING COURSE COVER POSTER, landscape 3:2, ideally 1536 x 1024. This is a typography-led designed promotional graphic for PM Beauty Academy in Munich, not an ordinary beauty photograph and not a photograph of a poster on a wall. Flat edge-to-edge digital artwork, ready for a website course card or social post. It must instantly read as EDUCATION / SCHULUNG even as a small thumbnail.
Art direction: a calm contemporary Munich beauty studio, precise craft, warm and elegant. Warm cream #F6EDEA background, dark warm brown typography #745449, brown #A17463, exactly one substantial dusty pink #D19FA6 / #E8CFD3 photographic panel on the right. No black/white stock template, glitter, gold, neon, flowers, swirls, clip art, stickers, discount graphics, fake dates, price, claims, awards, certificate seals, third-party brands, or QR codes.
Layout: common family grid. Left about 53% is mostly warm cream negative space with a clear aligned editorial text hierarchy. Upper left small tracked clean sans serif 'PM BEAUTY ACADEMY'. Immediately below a very prominent uppercase sans serif 'SCHULUNG'. Then the course name in very large beautiful sculptural warm-brown display SERIF typography, in the spirit of Gambarino, elegant and highly legible, carefully spaced across two or three lines. Secondary course type beneath in a restrained rounded outlined brown capsule. Small but comfortably readable footer gives duration and theory/practice. Do not cram in extra copy.
Right about 47% is a beautifully art-directed rectangular photograph with softly rounded 28px corners, of an educational tabletop still life on the SINGLE dusty-pink surface. Direct on-camera FLASH, compact-camera editorial snapshot, crisp glossy reflections and short hard shadows, tactile beige paper and linen, warm taupe materials. It is important to show learning / training materials and relevant tools, not merely a finished eye or nail beauty closeup. Styling belongs to the same beige/brown/pink direct-flash photography series as a warm salon brand. Photographic elements are tangible, realistic, not a cartoon, not a 3D render. No faces or instructor portraits, and do not imply that this is a real photograph of Paula's classes.
Keep every important text element inside a generous 70px safe margin, balanced spacing, no overlap. All spelling must be EXACT, especially umlaut and ampersands. Do not invent or redraw a monogram logo; the brand is represented by the plain small typed name only. No extra words whatsoever beyond the exact listed text.
Exact text, verbatim:
"PM BEAUTY ACADEMY"
"SCHULUNG"
"Russian Manicure"
"& Gel"
"MASTERCLASS"
"2 TAGE · THEORIE & PRAXIS"
Photographic panel subject: a neat open cream training workbook with simple nail-shape line diagrams (no invented written instructions), a compact realistic practice swatch fan with several glossy nude, dusty-rose and chocolate-brown gel nail tips, one slim precision gel brush and one clean stainless-steel manicure cuticle pusher on the single dusty-pink surface. A small folded beige linen corner. Precise flat-lay educational nail-tech workbench, direct-flash highlights on gel and polished steel. Not just a finished manicure beauty photo, no hands being cut, no wounds, no drill touching skin, no branded bottles or random text.
```

