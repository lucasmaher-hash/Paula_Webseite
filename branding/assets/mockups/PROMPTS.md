# PM Beauty · KI-generierte Mockups

Erstellt am 26.10.2026 mit Codex für Designfabrik (Ralph Ammer).

## Modell und Werkzeug

- Werkzeug: eingebautes `image_gen.imagegen`, vier separate Generierungen, kein CLI/API-Fallback.
- Modell: integriertes ChatGPT-Bildmodell. Eine konkrete Modell-ID oder Modellversion wird vom eingebauten Werkzeug nicht ausgegeben und ist daher hier nicht verifiziert.
- Eingaben: Textprompts auf Basis von `branding/CHATGPT-BRIEFING.md` (Startprompts Visitenkarte und Studio-Moment) und `branding/markenprofil.md`; keine Bildreferenzen an das Modell übergeben.
- Ausgabe: vier PNG-Dateien, jeweils 1536 × 1024 px (3:2), unverändert aus der Generierung übernommen. Je Motiv ein Durchlauf, keine verworfenen Varianten.
- Gestaltung: harter frontaler Direktblitz, kurze harte Schatten, warme Braun-/Beigetöne. Die ausdrückliche Blitzvorgabe vom 26.10. hat Vorrang vor der älteren Regel „Warme Flächen statt Schatten“.

## Verwendung und Kennzeichnung

Alle Dateien sind **KI-generierte Mockups bzw. Stimmungsbilder**, keine Aufnahmen des echten Studios oder realer Kundinnen. Das Nagelmotiv zeigt keine echte Arbeit von Paula; Verpackung und Drucksachen sind Anwendungskonzepte. Bei Verwendung im Styleguide die Bildunterschrift **„KI-generiertes Mockup“** ergänzen. Logo und Text setzt Lucas selbst ein. Die Bilder enthalten keine Schrift oder Logos; das PM-Monogramm wurde weder verwendet noch neu gezeichnet. Website und Styleguide wurden in dieser Session nicht geändert.

## Vollständige verwendete Prompts

### 1. Visitenkarten

Datei: `visitenkarten-direktblitz-v1.png`

```text
Use case: product-mockup.
Asset type: photorealistic brand-application mockup for a beauty-studio course presentation; one standalone landscape photograph, 3:2.
Primary request: Top-down photograph of two completely blank business cards on warm beige linen. Front card: thick matte dark warm brown cardstock, approximately #745449, with a generous unobstructed empty centered face for a monogram to be added later. Second card: pale warm beige cardstock, also completely empty, slightly offset behind the brown card. Realistic business-card proportions, precise cut edges, calm centered composition.
Lighting/style: unmistakable DIRECT ON-CAMERA FLASH PHOTOGRAPHY. Hard frontal flash next to lens, short crisp dark cast shadows immediately behind the raised cards, bright slightly overexposed reflected highlights on the linen fibers and card edges, compact-camera candid snapshot aesthetic. Ambient light underexposed, direct flash dominates. Not diffuse daylight or soft studio light. Photographic physical materials, subtle sensor grain.
Color/materials: warm brown, beige, taupe #A39588; one tiny dusty pink #D19FA6 fabric ribbon tip at the far edge only, no other pink. Tactile linen and thick uncoated paper. Minimal everyday scene, close crop.
Constraints: absolutely NO text, letters, numbers, logos, symbols, watermark, printed lines or embossing anywhere. No faces or people. No glitter, no rose gold, no decorative flowers, no luxurious marble. Do not draw any monogram. Cards must remain blank and easy for later graphic compositing. A fictional AI mockup, not a photograph of an actual studio.
```

### 2. Terminkarte

Datei: `terminkarte-direktblitz-v1.png`

```text
Use case: product-mockup.
Asset type: photorealistic brand-application mockup for a beauty-studio course presentation; one standalone landscape photograph, 3:2.
Primary request: Close overhead snapshot of a single completely blank pale warm beige appointment card lying centered and nearly square to the camera on a warm taupe tabletop #A39588. The thick uncoated card is a clean horizontal rectangle with slightly rounded corners and a fully unobstructed empty face, ample room to add appointment information later. A closed slender dark brown pen lies beside the card, outside the card edges. Cropped edge of a small brown ceramic dish in one corner. Restrained precise composition around a central axis, modest everyday studio desk.
Lighting/style: unmistakable DIRECT ON-CAMERA FLASH PHOTOGRAPHY, hard frontal camera-mounted flash, crisp very short shadow immediately behind the thick card and pen, glossy pin-sharp specular flash highlight on ceramic and pen, slightly blown tiny highlights. Background ambient exposure slightly dark; close-range compact-camera snapshot, subtle sensor grain, believable real materials. Absolutely no softbox, no diffuse natural window lighting.
Color palette: warm beige, rich brown approximately #745449, taupe. No pink needed.
Constraints: NO text, letters, numerals, logos, monograms, symbols, preprinted rules, dates, treatment names, prices or watermark anywhere, including the pen. No faces, no hands. No glitter or rose gold. Blank card ready for later graphic compositing. Fictional AI mockup, not an actual studio photo.
```

### 3. Hand mit Nägeln auf Leinen

Datei: `hand-naegel-leinen-direktblitz-v1.png`

```text
Use case: photorealistic-natural.
Asset type: beauty brand mood photograph for a course presentation; one standalone landscape photograph, 3:2.
Primary request: Intimate close-up of ONE anatomically natural adult hand resting relaxed palm-down diagonally across warm beige linen cloth, with a small rich brown ceramic dish beside it. Exactly five anatomically plausible fingers total, naturally arranged and separated enough to read clearly, wrist enters at lower edge. Short-to-medium elegant oval nails in glossy warm milk-coffee nude polish, precise clean cuticles, real skin texture and small natural creases. No jewelry, no nail art. Quiet, precise atmosphere like a goldsmith's workbench. Tight crop, no other body parts. Warm taupe backdrop approximately #A39588.
Lighting/style: unmistakable DIRECT ON-CAMERA FLASH PHOTOGRAPHY. Harsh frontal flash mounted right beside lens, crisp shiny small white flash highlights on curved lacquered nails and glazed ceramic, slightly overexposed skin highlights, a short hard-edged dark shadow directly behind the hand on the cloth. Compact-camera snapshot aesthetic, realistic tactile pores and linen weave, subtle sensor grain. Flash dominates low ambient light; no diffuse daylight, no soft studio lighting, no cinematic side light.
Palette: warm beige, brown, taupe, nude. No pink accent needed.
Constraints: no face, no head, no text, letters, logos, monograms or watermark, no glitter, no rose gold, no extra fingers or fused fingers. This is an illustrative AI mood image, not a real customer or Paula's actual nail work.
```

### 4. Papierverpackung

Datei: `papierverpackung-direktblitz-v1.png`

```text
Use case: product-mockup.
Asset type: photorealistic brand-application mockup for a beauty-studio course presentation; one standalone landscape photograph, 3:2.
Primary request: A small pale warm beige uncoated paper shopping bag with dark brown cotton handles, standing centered on a warm taupe tabletop against a close warm taupe wall approximately #A39588. Simple modest everyday packaging, realistic folds, no contents visible. Front face broad, flat, completely blank and fully unobstructed for a real logo to be added later. A small blank dark brown rectangular tag approximately #745449 tied to one handle, falling outside the front print area; a tiny dusty pink #D19FA6 cord is the only pink detail. Calm close composition, near frontal camera with a slight downward view, bag straight on central axis.
Lighting/style: unmistakable DIRECT ON-CAMERA FLASH PHOTOGRAPHY, hard frontal lens-adjacent flash, a short sharply defined shadow just behind the bag on the nearby wall and table, crisp bright flash highlights along paper folds, slightly blown highlights, darker ambient corners. Compact-camera candid snapshot rather than polished studio render. Tactile paper fibers, believable cotton handles, subtle sensor grain.
Palette: only warm brown, beige and taupe, one tiny dusty pink cord detail. No glitter, no metallic foil or rose gold.
Constraints: absolutely NO text, letters, numerals, logos, symbols, monograms, print, stickers or watermark anywhere. No faces or people. No cosmetic products or invented merchandise claims. Keep the bag front entirely blank for graphic compositing. Fictional brand application concept, not documentation of actual PM Beauty packaging.
```

