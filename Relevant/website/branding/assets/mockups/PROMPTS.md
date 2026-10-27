# PM Beauty · KI-generierte Mockups

Erstellt am 26.10.2026 mit Codex für Designfabrik (Ralph Ammer).

## Modell und Werkzeug

- Werkzeug: eingebautes `image_gen.imagegen`, sechs separate Generierungen in zwei Serien, kein CLI/API-Fallback.
- Modell: integriertes ChatGPT-Bildmodell. Eine konkrete Modell-ID oder Modellversion wird vom eingebauten Werkzeug nicht ausgegeben und ist daher hier nicht verifiziert.
- Eingaben Serie 1 (Motive 1–4): Textprompts auf Basis von `branding/CHATGPT-BRIEFING.md` (Startprompts Visitenkarte und Studio-Moment) und `branding/markenprofil.md`; keine Bildreferenzen an das Modell übergeben.
- Eingaben Serie 2 (Motive 5–6): drei von Lucas hochgeladene Empfangsreferenzen als grobe Layout-Hilfe sowie eine aus dem Original-SVG gerenderte v12-Logovorlage. Motiv 6 nutzt zusätzlich Motiv 5 als Material-/Stilreferenz. Fremde Referenzfotos werden nicht ins Repo übernommen.
- Ausgabe Serie 1: vier PNG-Dateien, jeweils 1536 × 1024 px (3:2). Serie 2: zwei PNG-Dateien, jeweils 1024 × 1536 px (2:3). Alle unverändert aus der Generierung übernommen. Je Motiv ein Durchlauf, keine verworfenen Varianten.
- Gestaltung: harter frontaler Direktblitz, kurze harte Schatten, warme Braun-/Beigetöne. Die ausdrückliche Blitzvorgabe vom 26.10. hat Vorrang vor der älteren Regel „Warme Flächen statt Schatten“.

## Verwendung und Kennzeichnung

Alle Dateien sind **KI-generierte Mockups bzw. Stimmungsbilder**, keine Aufnahmen des echten Studios oder realer Kundinnen. Das Nagelmotiv zeigt keine echte Arbeit von Paula; Verpackung, Drucksachen und Empfangsräume sind Anwendungskonzepte. Bei Verwendung im Styleguide die Bildunterschrift **„KI-generiertes Mockup“** ergänzen. Motive 1–4 enthalten keine Schrift oder Logos; dort setzt Lucas Logo und Text selbst ein. Für Motive 5–6 hat Lucas zusätzlich ausdrücklich Logo-Anwendungen auf der Theke bzw. an der Rückwand beauftragt. Dafür wurde das freigegebene v12-Monogramm als Bildvorlage mit der Anweisung „use exactly, do not redraw“ übergeben. Die Logo-Wiedergabe wurde visuell mit der Vorlage verglichen; eine geometrisch identische SVG-Einbettung ist durch Bildgenerierung nicht belegt. Keine zusätzliche Schrift. Website und Styleguide wurden nicht geändert.

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

### 5. Rezeption mit Thekenlogo

Datei: `rezeption-thekenlogo-direktblitz-v1.png`

Referenzmechanismus: `num_last_images_to_include: 4`. Drei hochgeladene Empfangsfotos und die gerenderte v12-Logovorlage. Logovorlage aus `branding/assets/pm-beauty-logo/versions/v12/pm-monogram-v12.svg`, gerendert mit macOS Quick Look (`qlmanage -t -s 1800`); SVG-Quelle unverändert. Farbe der räumlichen Anwendung: Braun. Kein tatsächlicher Umbau oder realer Studiozustand behauptet.

```text
Use case: product-mockup. Asset: fictional PM Beauty salon brand application, photorealistic interior photograph, portrait 2:3, one single photograph, not a collage.
Input images: The three uploaded reception photographs are ONLY loose spatial-layout inspiration (counter versus wall signage); do NOT recreate their interiors, architecture, lighting fixtures or their third-party signage. The black-on-white reference is the authentic approved PM Beauty v12 monogram, supplied from its source SVG. Use the attached monogram EXACTLY, do not redraw, reinterpret, typeset, improve, simplify or change its contour or relative stroke weights. Transfer that exact shape as a brown sign; omit the reference's white square background and its large white margins. No enclosing plaque. The monogram's detached left stroke and distinctive flowing joined form must remain exactly intact.
Brand style: intimate, modest premium independent beauty salon, warm cream paper-like microcement, taupe wall #A39588, warm brown #745449 and #A17463, restrained walnut accents, rounded panel corners and calm precise composition echoing PM Beauty's website. Brown and beige dominate. No rose gold, no glitter, no marble luxury cliches, no rattan pendants, no silver dental-clinic look.
Photography: DIRECT ON-CAMERA FLASH PHOTOGRAPHY, hard frontal lens-adjacent flash, short crisp cast shadows behind small objects and raised signage, sharp glossy reflections on glazed ceramics and countertop, slightly blown highlights with subdued ambient exposure, believable compact-camera snapshot, real material texture and subtle grain. Keep the flash prominent even though this is an interior. No soft daylight editorial image, no cinematic spotlights.
Constraints: no people, no faces, no text at all, no prices, no service menus, no testimonials, no QR codes, no watermarks, no Apple or other third-party brands. The supplied exact monogram is the only graphic permitted. Concept interior only, not the real studio.
Scene: A compact beauty-salon reception seen from a gentle three-quarter angle at eye level, with a broad warm-cream reception counter across the lower half of the photograph. The counter has softly rounded ends, a thin brown solid-surface top, and a clean flat vertical front. Place the EXACT supplied PM monogram as a small dark warm-brown cut-vinyl application on the upper LEFT region of the counter's visible front (about 25 cm wide in real scale), all of it clearly visible and in focus. No logo on any wall. Counter front near frontal to camera to minimize distortion of the original shape. On top: a small brown ceramic catchall and a discreet unbranded tablet viewed from its blank back, no clutter. Behind it, a quiet cream wall with one rounded recessed taupe niche containing neatly folded beige towels and a small plain ceramic vase; a narrow walnut door panel to one side. Beige floor, close and inviting, plausible small beauty studio with visible tactile materials. Exactly one tiny dusty-pink folded linen detail on a shelf, otherwise only browns and beige. Leave generous quiet breathing room around the small counter logo.
```

### 6. Rezeption mit Wandlogo

Datei: `rezeption-wandlogo-direktblitz-v1.png`

Referenzmechanismus: `num_last_images_to_include: 5`. Drei hochgeladene Empfangsfotos und die gerenderte v12-Logovorlage, zusätzlich Motiv 5. Logovorlage aus `branding/assets/pm-beauty-logo/versions/v12/pm-monogram-v12.svg`, gerendert mit macOS Quick Look (`qlmanage -t -s 1800`); SVG-Quelle unverändert. Farbe der räumlichen Anwendung: Braun. Kein tatsächlicher Umbau oder realer Studiozustand behauptet.

```text
Use case: product-mockup. Asset: fictional PM Beauty salon brand application, photorealistic interior photograph, portrait 2:3, one single photograph, not a collage.
Input images: The three uploaded reception photographs are ONLY loose spatial-layout inspiration (counter versus wall signage); do NOT recreate their interiors, architecture, lighting fixtures or their third-party signage. The black-on-white reference is the authentic approved PM Beauty v12 monogram, supplied from its source SVG. Use the attached monogram EXACTLY, do not redraw, reinterpret, typeset, improve, simplify or change its contour or relative stroke weights. Transfer that exact shape as a brown sign; omit the reference's white square background and its large white margins. No enclosing plaque. The monogram's detached left stroke and distinctive flowing joined form must remain exactly intact.
Brand style: intimate, modest premium independent beauty salon, warm cream paper-like microcement, taupe wall #A39588, warm brown #745449 and #A17463, restrained walnut accents, rounded panel corners and calm precise composition echoing PM Beauty's website. Brown and beige dominate. No rose gold, no glitter, no marble luxury cliches, no rattan pendants, no silver dental-clinic look.
Photography: DIRECT ON-CAMERA FLASH PHOTOGRAPHY, hard frontal lens-adjacent flash, short crisp cast shadows behind small objects and raised signage, sharp glossy reflections on glazed ceramics and countertop, slightly blown highlights with subdued ambient exposure, believable compact-camera snapshot, real material texture and subtle grain. Keep the flash prominent even though this is an interior. No soft daylight editorial image, no cinematic spotlights.
Constraints: no people, no faces, no text at all, no prices, no service menus, no testimonials, no QR codes, no watermarks, no Apple or other third-party brands. The supplied exact monogram is the only graphic permitted. Concept interior only, not the real studio.
Scene: A different view of an intimate beauty-salon reception: a rounded warm-beige counter occupies the lower left foreground, while the BACK WALL behind it is the focal plane. Mount the EXACT supplied PM monogram in dark warm-brown material on the warm cream plaster wall, centered within a broad recessed rectangle with gently rounded corners. Monogram about 55 cm wide in realistic scale, comfortably surrounded by blank wall. Keep logo wall close to frontal to camera to preserve its exact original shape, raised only a few millimeters, casting a short crisp camera-flash shadow; very restrained warm ambient edge light in the architectural recess, no neon or dramatic halo. Counter itself is blank, no counter logo. A small brown glazed cup and a folded beige towel on the counter. At right, an open rounded doorway gives a limited glimpse of a beige upholstered beauty treatment bed covered with plain linen, no medical devices, no products, no invented treatment claims. Warm taupe and cream surfaces with a narrow walnut vertical panel. Precise, quiet, welcoming small salon, not a hotel, spa resort, dental office or Pilates studio. No pink needed.
The most recently generated reception photo is an additional reference for consistent warm materials and direct-flash photographic treatment only. Create the distinct wall-signage composition described above, do not duplicate that first counter-logo view.
```

## Fortsetzung am 26.10.2026 · Logo, Pink und zusammenhängende Bildserie

Lucas hat die frühere Vorgabe „ohne Logo“ ausdrücklich korrigiert: Das echte v12-Monogramm soll auf sinnvollen Markenanwendungen erscheinen; mehr Pink ist erwünscht. Logoquelle: `branding/assets/pm-beauty-logo/versions/v12/pm-monogram-v12.svg`, unverändert mit Quick Look als Rasterreferenz exportiert. Es wurde kein neues Monogramm entworfen. Die generierte Umsetzung wurde visuell verglichen, ist aber keine nachgewiesene vektorgetreue SVG-Einbettung.

**Aktuelle Auswahl:** Visitenkarten und Terminkarte mit `logo-v2`, Tasche mit `logo-v3` (Logo auch auf dem pinken Anhänger). Das ursprüngliche `hand-naegel-leinen-direktblitz-v1.png` bleibt fürs Moodboard. Die kurz erzeugte Datei `hand-naegel-leinen-direktblitz-logo-v2.png` mit Logo in der Schüssel wurde auf Lucas' ausdrücklichen Wunsch gelöscht, auch die betreffende lokale Generierungsdatei. Sie gehört nicht zur Auswahl.

**Bestand:** 21 PNGs einschließlich älterer Versionen. Diese Fortsetzung umfasste 16 Imagegen-Aufrufe; davon wurde die Schüssel-Logo-Variante gelöscht, 15 neue PNGs bleiben erhalten. Alle übrigen Motive jeweils ein Durchlauf. Neun neue Serienbilder und zwei neue Verpackungsmotive haben 1024 × 1536 px; Karten und Taschenvarianten 1536 × 1024 px.

**Verwendung:** Die ausgewählten Bilder sind jetzt in `styleguide.html` eingebunden. WebP-Kopien ohne Beschnitt oder Tönung in `images/mockups/`, reproduzierbar mit `python3 branding/assets/mockups/make_web_images.py`. Original-PNGs bleiben unverändert. Die ursprünglichen Angaben zu „vier“ oder „sechs“ Bildern weiter oben beschreiben nur die früheren Serien. Die Hauptwebsite wurde nicht geändert.

### Logo-Varianten der ersten Motive

Jeweils zwei lokale Eingaben: das ursprüngliche Foto als Bearbeitungsziel, die gerenderte v12-Logovorlage als einzusetzendes Zeichen. `transparent_background: false`.

Datei: `visitenkarten-direktblitz-logo-v2.png`; Ziel: `visitenkarten-direktblitz-v1.png`.

```text
Use case: precise-object-edit. Edit the FIRST input photograph; the SECOND input is the original approved PM Beauty v12 monogram rasterized from the source SVG. Preserve the first photograph's exact composition, camera position, framing, object positions, lighting, hard direct on-camera flash, short hard shadows, linen/paper/ceramic texture, colors and materials except for the specific changes below. Return the same landscape 3:2 format. The source photo is already approved; do not restyle, reshoot, rearrange or crop it.
Logo: Use the attached monogram EXACTLY, do not redraw, reinterpret, typeset, simplify or improve it. Preserve its silhouette, detached left vertical stroke, flowing joined contour, variable stroke weight and proportions. Remove only the reference's white background and white margins. Apply only the original symbol, no plaque or rectangular image background. Logo must look physically printed on the receiving surface, aligned in perspective, crisp and naturally integrated. No other letters, text, numbers, prices, labels or watermarks. No extra people or objects.
Changes ONLY: keep the foreground card matte warm brown #745449, print the exact monogram centered on it in pale warm cream, about 28% of the card width. Recolor the beige card behind it to muted dusty pink #D19FA6 and print the exact same monogram centered in dark warm brown #745449, about 28% of its card width; the part behind the front card may be naturally occluded. Keep both cards' edges and their positions exactly. Keep the existing tiny pink ribbon and everything else unchanged. Cards have no text. This is the logo-bearing v2 of the same approved shot.
```

Datei: `terminkarte-direktblitz-logo-v2.png`; Ziel: `terminkarte-direktblitz-v1.png`.

```text
Use case: precise-object-edit. Edit the FIRST input photograph; the SECOND input is the original approved PM Beauty v12 monogram rasterized from the source SVG. Preserve the first photograph's exact composition, camera position, framing, object positions, lighting, hard direct on-camera flash, short hard shadows, linen/paper/ceramic texture, colors and materials except for the specific changes below. Return the same landscape 3:2 format. The source photo is already approved; do not restyle, reshoot, rearrange or crop it.
Logo: Use the attached monogram EXACTLY, do not redraw, reinterpret, typeset, simplify or improve it. Preserve its silhouette, detached left vertical stroke, flowing joined contour, variable stroke weight and proportions. Remove only the reference's white background and white margins. Apply only the original symbol, no plaque or rectangular image background. Logo must look physically printed on the receiving surface, aligned in perspective, crisp and naturally integrated. No other letters, text, numbers, prices, labels or watermarks. No extra people or objects.
Changes ONLY: change the blank cream card to a very pale muted blush pink #E8CFD3, keep its exact shape and position. Print the exact monogram in warm brown #745449 near the TOP CENTER of the card, about 18% of the card width, leaving most of the card blank beneath it for later appointment information. No written information, no printed rules. Pen, dish, table and all shadows remain exactly as before.
```

Datei: `papierverpackung-direktblitz-logo-v2.png`; Ziel: `papierverpackung-direktblitz-v1.png`.

```text
Use case: precise-object-edit. Edit the FIRST input photograph; the SECOND input is the original approved PM Beauty v12 monogram rasterized from the source SVG. Preserve the first photograph's exact composition, camera position, framing, object positions, lighting, hard direct on-camera flash, short hard shadows, linen/paper/ceramic texture, colors and materials except for the specific changes below. Return the same landscape 3:2 format. The source photo is already approved; do not restyle, reshoot, rearrange or crop it.
Logo: Use the attached monogram EXACTLY, do not redraw, reinterpret, typeset, simplify or improve it. Preserve its silhouette, detached left vertical stroke, flowing joined contour, variable stroke weight and proportions. Remove only the reference's white background and white margins. Apply only the original symbol, no plaque or rectangular image background. Logo must look physically printed on the receiving surface, aligned in perspective, crisp and naturally integrated. No other letters, text, numbers, prices, labels or watermarks. No extra people or objects.
Changes ONLY: print the exact warm brown #745449 PM monogram centered on the blank beige FRONT of the existing bag in the open area beneath the handle, about 26% of the bag front width. Recolor the existing dark brown hanging rectangular tag to dusty pink #D19FA6. Keep tag otherwise blank. Preserve its shape, position, cord, handles, all paper folds, bag shape, shadows and framing exactly. No text or new props.
```

Die Schüssel-Logo-Variante wurde mit folgendem Prompt erzeugt und anschließend auf Lucas' Wunsch gelöscht (Bearbeitungsziel: `hand-naegel-leinen-direktblitz-v1.png`):

```text
Use case: precise-object-edit. Edit the FIRST input photograph; the SECOND input is the original approved PM Beauty v12 monogram rasterized from the source SVG. Preserve the first photograph's exact composition, camera position, framing, object positions, lighting, hard direct on-camera flash, short hard shadows, linen/paper/ceramic texture, colors and materials except for the specific changes below. Return the same landscape 3:2 format. The source photo is already approved; do not restyle, reshoot, rearrange or crop it.
Logo: Use the attached monogram EXACTLY, do not redraw, reinterpret, typeset, simplify or improve it. Preserve its silhouette, detached left vertical stroke, flowing joined contour, variable stroke weight and proportions. Remove only the reference's white background and white margins. Apply only the original symbol, no plaque or rectangular image background. Logo must look physically printed on the receiving surface, aligned in perspective, crisp and naturally integrated. No other letters, text, numbers, prices, labels or watermarks. No extra people or objects.
Changes ONLY: print a small exact pale warm cream PM monogram on the central inner base of the existing brown ceramic dish, about 30% of its inner width, following its shallow perspective and shiny glaze. This is a subtle authentic maker-style ceramic logo. Keep the hand, every finger, every nail, skin, linen, dish shape, composition and all highlights completely unchanged. No logo on skin or nails. No new props. No other changes.
```

### Tasche v3 · Logo zusätzlich auf dem pinken Anhänger

Datei: `papierverpackung-direktblitz-logo-v3.png`. Eingaben: Tasche `logo-v2` plus v12-Logovorlage.

```text
Use case: precise-object-edit. First input: approved PM Beauty beige paper shopping bag photograph with brown PM logo and dusty-pink hanging tag. Second input: exact original approved PM Beauty v12 monogram rasterized from source SVG.
Change ONLY ONE detail: print the exact supplied PM monogram on the existing blank dusty-pink hanging tag, centered on the tag, in dark warm brown #745449, approximately 62% of tag width. Orient the monogram with the tag's existing slight rotation and perspective. Preserve the original source silhouette and proportions, variable stroke weight and detached left stroke. Do not redraw, reinterpret or typeset it. Remove reference white background/margins. No additional words or design.
Keep the large monogram already on the bag front EXACTLY unchanged. Preserve every other source-image pixel as closely as possible: bag, handles, tag color and shape, cord, placement, paper folds, original framing, lighting, short hard flash shadows, taupe background, material texture, warm beige/brown palette. No restyling or new objects. Same 3:2 landscape output.
```

### Neun Motive · gemeinsamer Stil

Jeder vollständige Prompt setzt sich exakt aus dem folgenden gemeinsamen Text, einem Zeilenumbruch und dem jeweiligen Motivtext zusammen. Einzige Bildreferenz bei allen neun Aufrufen: `hand-naegel-leinen-direktblitz-v1.png`, ausschließlich für Farbwelt, Material und Blitzlicht. Keine Internetbilder als Bearbeitungsziele oder Bildvorlagen an das Modell übergeben. Die Angaben zu 70 mm und f/8 sind Stilvorgaben im Prompt, keine gemessenen Kamera-Metadaten.

```text
Use case: photorealistic-natural. One original photorealistic beauty-brand mood photograph for PM Beauty, portrait 2:3, single photograph, not a collage.
The input image is ONLY a reference for photographic treatment, warm neutral color grading, realistic skin/material texture, beige linen, brown ceramic and hard flash. Create the new subject described below, NOT a copy of the reference scene. This image belongs to one tightly consistent nine-photo series.
Unified camera treatment: 70mm-equivalent close-up/macro lens, normal compressed perspective with no wide-angle distortion, gently elevated viewpoint, sharp main subject, moderate depth of field (f/8 look), subtle sensor grain. Direct on-camera flash from immediately beside and slightly above the lens, hard frontal illumination, short crisp cast shadow immediately behind the subject, distinct small bright specular highlights, very slightly blown highlights. Ambient light slightly underexposed. Authentic compact-camera flash snapshot, not softbox, window light, cinematic side light, dreamy bokeh or a CGI render.
Unified color/materials: warm but neutral cream, beige linen, taupe #A39588, rich brown #745449, dusty pink #D19FA6 and pale pink #E8CFD3 used naturally in small areas. Skin colors believable and warm-neutral, not orange. Quiet, intimate, precise, tactile. No glitter, no gold foil, no rose gold, no black nightclub aesthetic. Frame for a website moodboard with the main subject in the central 65% so modest responsive crops preserve it.
Constraints: no text, logos, labels, watermarks, prices, quotes or branding. No full recognizable face, no identity resembling Paula, no before-and-after panels. All human subjects adult. No fabricated claims about a real client or treatment result; this is an AI illustrative brand image. Photographic anatomy and materials, no oversmoothed plastic skin.
```

#### Nägel · Schokobraun und Schildpatt

Datei: `serie-naegel-schoko-schildpatt-v1.png`.

```text
Subject: ONE relaxed adult hand resting palm-down on cream linen. Exactly five anatomically plausible fingers, thumb naturally to the side. Medium almond nails with a restrained coordinated brown manicure: three glossy deep chocolate nails and two translucent amber-brown tortoiseshell accents; precise clean cuticles, real fine skin creases. Tight intimate slightly elevated three-quarter view, nails are the hero. A tiny corner of pale dusty-pink towel at one image edge, no other props, no jewelry, no flowers, no hardware. Glossy curved polish has small crisp flash reflections. Visually different hand pose from the reference, same photography.
```

#### Nägel · Nude und Blüten

Datei: `serie-naegel-nude-blueten-v1.png`.

```text
Subject: ONE relaxed adult hand, exactly five plausible fingers in a gentle palm-down curve on cream linen. Short-to-medium squoval nails with sheer warm nude glossy polish. Tiny precise ivory five-petal flowers with warm brown centers along the tips of only two accent nails, and one single tiny dusty-pink flower as a restrained detail; no multicolored decorations. All other nails plain nude. Clean cuticles, real skin texture, no jewelry. Intimate slightly elevated close-up with nail tips centered and separated enough to read the delicate painted art. Compact hard-flash reflections, no glowing effects.
```

#### Brauen und Wimpern

Datei: `serie-brauen-wimpern-v1.png`.

```text
Subject: extreme but tasteful crop showing ONLY ONE closed adult eye, its natural full brown eyebrow and adjacent upper cheek. No other eye, nose, mouth, full face or identity visible. Individual eyebrow hairs softly brushed upward with believable irregularities, naturally curved separated dark lashes resting on the lid, no exaggerated strip lashes. Smooth but realistically textured warm-neutral skin with pores and a few fine creases, not airbrushed. A narrow sliver of beige head towel at top border, barely any background. Eye/brow runs gently diagonally through center, macro focus on hair and lash precision. No tools touching the eye. Do not imply proof of a performed lashlift; an illustrative beauty detail.
```

#### Lippen · Rosé

Datei: `serie-lippen-rose-v1.png`.

```text
Subject: macro close-up of relaxed closed adult lips with a natural muted rose-brown color, softly defined contours, fine real lip lines and a thin clear gloss giving sharp little white flash highlights. Crop to ONLY the lips, nearby cheek skin and small chin area; NO nose, eyes, teeth, smile or complete face. Lips gently diagonal within the central frame, relaxed expression. Real warm-neutral skin pores, no exaggerated filler volume, no redness, no wounds, no pigment application in progress. Plain beige linen softly visible only at lower edge. No fake treatment-result claims; an illustrative lip detail.
```

#### Facial · Tuchmasken-Detail

Datei: `serie-facial-tuchmaske-v1.png`.

```text
Subject: intimate macro crop of an adult cheek and part of the outer closed-eye region covered by a thin ivory translucent damp sheet mask. Frame ONLY a single cheek area, mask edge and a little beige head towel, no full face, mouth or nose. One beige nitrile-gloved hand gently smooths the lower edge of the mask against the cheek using two clearly separated natural fingertips; anatomically plausible hand, no extra fingers. Subtle real wet texture and crisp flash reflections on damp mask, clean calm beauty-facial atmosphere. Cream linen and one small pale pink folded towel sliver at border. No medical claims, redness, wounds or dramatic plastic mask.
```

#### Gesichtsbehandlung · Hautdetail

Datei: `serie-behandlung-hautdetail-v1.png`.

```text
Subject: close crop of an adult cheek resting against beige linen, with ONE beige nitrile-gloved adult hand holding a simple clean unbranded pearl-white pen-shaped cosmetic treatment handpiece at the outer cheek, pointing toward the skin. Small plain rounded translucent cartridge end, no exposed needles, no punctures, no blood, no wounds, no injection, no visible brand, no screen or controls. Show only the cheek, a sliver of jaw and gloved hand, no full face, eyes, nose or mouth. Real pores and tiny highlights on moisturized skin; one pale dusty-pink linen strip at edge. Quiet professional beauty treatment mood, physically plausible tool grip. Illustrative treatment scene, not medical instructions or proof of a specific treatment/result.
```

#### Pflanze · Keramik und Pink

Datei: `serie-pflanze-keramik-v1.png`.

```text
Subject: small living potted plant with a few softly curved matte deep olive-green leaves in a simple dusty-pink #D19FA6 ceramic cylinder with gently rounded base, sitting on a warm taupe microcement salon shelf. A folded cream linen towel beside it and a small sliver of walnut at bottom. Tight object close-up with plant and pot filling central 65%, nearby beige plaster wall gives a short crisp flash shadow behind the leaves and pot. Clearly tangible glazed ceramic, subtle glossy flash spot on pot, realistic leaf veins. No large jungle arrangement, flowers, letters, logos or extra decor. Restrained modern beauty-salon still life.
```

#### Material · Leinen und Pink

Datei: `serie-leinen-pink-v1.png`.

```text
Subject: tactile close-up still life of folded warm cream linen with two relaxed broad folds, with a single narrow muted dusty-pink cotton towel crossing beneath it at a diagonal on a taupe tabletop. Texture is the subject: crisp visible weave, gently rounded folds and short hard flash shadows. Same intimate 70mm close viewpoint as rest of series; mostly beige, pink is about one quarter of image. No flowers, no hand, no garments, labels, seams with text or logos. Calm precise material study for a beauty-salon moodboard, not floating abstract CGI fabric.
```

#### Nagellack · Stillleben

Datei: `serie-nagellack-stillleben-v1.png`.

```text
Subject: one small clear glass nail-polish bottle filled with muted dusty-rose lacquer, completely blank with a plain matte warm-brown cylindrical cap, standing on cream linen next to a small shallow warm-brown ceramic dish. No writing or logo on bottle or cap; this is generic salon equipment, no claim of a branded PM Beauty product. Close slightly elevated three-quarter viewpoint, bottle in central area, brown dish cropped on one side, taupe backdrop. One tiny natural lacquer drop on a small blank beige paper swatch in front. Crisp white flash highlight along thick glass and shiny lacquer, short hard dark shadow behind bottle, visible real linen weave. Minimal, calm, realistic scale.
```

### Glasbehälter mit vertieftem Glaslogo

Datei: `glasbehaelter-logo-vertieft-direktblitz-v1.png`. `num_last_images_to_include: 3`: Lucas' Glasreferenz, das dazwischen ausgegebene Lippenmotiv (im Prompt ausdrücklich als nicht relevant ausgeschlossen) und die erneut angezeigte v12-Logovorlage. Gewünscht ist ein vertieftes transparentes Zeichen; die Bildwirkung zeigt Glasränder und Brechung, keine technische Fertigungsprüfung.

```text
Use case: product-mockup. Create ONE photorealistic portrait 2:3 photograph of a clear glass beauty-salon storage container in the warm brown/beige/pink PM Beauty photographic style.
References: the user's newly uploaded simple square clear glass container is loose inspiration for thick clear glass, softly rounded rectangular geometry and matching clear glass lid only. Do not exactly reconstruct it. Ignore the lip photograph, which is not a subject reference. The black monogram on white is the genuine approved PM Beauty v12 SVG exported to raster. Use that attached logo EXACTLY, do not redraw or reinterpret its silhouette, detached left stem, variable stroke widths or proportions; omit its white background and margins.
Subject: a single small thick clear glass lidded jar, squared body with very softly rounded corners, clean broad front panel, chunky transparent matching lid, sitting on warm taupe microcement beside a small folded cream linen towel. Jar is empty and pristine. Camera almost frontal with a slight downward view, close 70mm-equivalent lens, object occupies central two-thirds, entire lid and base visible. Pale dusty-pink card or folded cloth partly visible under one corner adds one restrained pink detail.
Crucial logo material: The exact supplied PM monogram is DEBOSSED INTO THE GLASS FRONT, physically indented into the same glass, not a printed ink logo, not a sticker, not frosted white lettering, not raised applique. A shallow recessed glass contour with smooth beveled internal edges; logo face transparent/translucent glass with same refractive material, visible through edge highlights, tiny occlusion shadows and refraction within the engraved indent. Same exact overall monogram shape, comfortably centered at about 40% jar width. It must read as transparent glass worked into transparent glass. Realistic modest shallow depth.
Photography: hard DIRECT ON-CAMERA FLASH, small crisp white flash reflections and bright glass edges, short hard shadow immediately behind jar, subdued ambient exposure, warm neutral beige/taupe background #A39588, natural glass caustics. Visible tactile linen and realistic slightly imperfect glass. Compact-camera flash snapshot with subtle grain; not a CGI render, no softbox or window lighting, no black background. Palette warm beige/brown with one dusty pink detail.
No other logos, no text, numbers, product claims, labels, watermark, flowers or people. Fictional packaging/brand application concept, not an actual PM Beauty product.
```

### Pinker Wattestäbchen-Behälter

Datei: `wattestaebchen-pink-logo-direktblitz-v1.png`. Eingabe: v12-Logovorlage. Lucas hat die Idee auf Wattestäbchen, pinken Kunststoff, weißes Etikett und weißen offenen Deckel präzisiert und die Formulierung des Kurztexts freigegeben. Verwendeter Text: „Wattestäbchen“ / „Für kleine Details.“ Keine Mengen-, Inhaltsstoff- oder Wirkversprechen. Fiktives Verpackungskonzept, kein behauptetes Verkaufsprodukt von PM Beauty.

```text
Use case: product-mockup. One photorealistic fictional PM Beauty packaging concept photograph, portrait 2:3, warm salon still life matching the other direct-flash brand images.
Input: authentic PM Beauty v12 monogram rasterized from the approved source SVG. Use the attached logo EXACTLY; do not redraw, reinterpret, typeset, simplify or improve its contour, variable stroke weight, detached left stroke or proportions. Omit the reference's white square and margins.
Subject: one small cylindrical opaque muted dusty-pink #D19FA6 PLASTIC cotton-swab container, in the recognizable compact shape of a cosmetic cotton-bud storage tub, upright on warm taupe tabletop #A39588 with a cream linen corner. The wide mouth is OPEN and 5–7 white cotton-tipped swabs extend naturally a little above the rim at varied gentle angles, with plausible straight slender stems and two small cotton ends. A plain WHITE plastic screw lid is unscrewed and resting beside the jar, outside the label area. Visible realistic plastic screw thread, no dropper, no liquid bottle, no pump.
Label: clean matte WHITE rectangular paper label wrapped around the front of the pink plastic tub, readable and facing almost directly toward camera. Authentic exact PM monogram in dusty PINK, centered at top of label. Under it, small neat warm-brown sans-serif text exactly:
"Wattestäbchen"
"Für kleine Details."
Do not add any other text, ingredient claims, quantities, prices, certification symbols, barcode, website, address or logos. Preserve the umlaut in Wattestäbchen.
Camera/style: intimate 70mm-equivalent close object portrait, entire open top and lid visible, main jar centered with calm blank space, f/8 crisp focus, believable scale and materials. Harsh DIRECT ON-CAMERA FLASH, compact-camera snapshot, short hard shadow just behind container and lid, crisp shiny flash highlights on pink plastic and cotton edges, subtle sensor grain. Warm neutral cream/taupe backdrop and beige linen; pink tub is the prominent single pink area. No softbox/daylight look, no CGI, no glitter, no rose gold, no flowers or people.
This is a fictional brand application concept, not proof of a real product sold by the studio.
```
