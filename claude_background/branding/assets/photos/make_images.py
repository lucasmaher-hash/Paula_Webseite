"""Bilder für die Website: Hero breit (Paula rechts, links Wandfarbe angesetzt) + Web-Größen.

Aufruf (aus dem Repo-Root, Python mit Pillow):
    python branding/assets/photos/make_images.py branding/assets/photos/originals images

Der Hero ist eine Notlösung (Wandton zeilenweise vom linken Bildrand übernommen, weich überblendet).
Ein echtes KI-Outpainting soll images/hero-paula-wide.jpg später ersetzen, siehe docs/HANDOFF.md.
"""
import sys, os
from PIL import Image, ImageFilter

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

# --- Hero: Wandfarbe zeilenweise vom linken Rand übernehmen, unten (Haare) mit Wandton weiterführen
p = Image.open(os.path.join(SRC, 'paula-portrait.jpg')).convert('RGB')
w, h = p.size
H = h
W = int(H * 2.2)
strip = p.crop((0, 0, 24, h)).resize((1, h), Image.LANCZOS)          # Mittel über die linken 24 px
cols = [strip.getpixel((0, y)) for y in range(h)]
cut = int(h * 0.46)                                                    # darunter beginnt am Rand Haar/Schulter
band = cols[int(h * 0.38):cut]
ref = tuple(round(sum(c[i] for c in band) / len(band)) for i in range(3))   # Wandton aus dem Bereich darüber
for y in range(cut, h):                                                # weich in den Wandton übergehen
    t = min(1.0, (y - cut) / (h * 0.10))
    c = cols[y]
    cols[y] = tuple(round(c[i] * (1 - t) + ref[i] * t) for i in range(3))
col_img = Image.new('RGB', (1, h))
col_img.putdata(cols)
col_img = col_img.filter(ImageFilter.GaussianBlur(24))
fill = col_img.resize((W, H), Image.NEAREST).filter(ImageFilter.GaussianBlur(2))
canvas = fill.copy()
x0 = W - w
fade = 360                                                              # Übergangsbreite im Bild
mask = Image.new('L', (w, h), 255)
for x in range(fade):
    t = x / fade
    a = round(255 * (t * t * (3 - 2 * t)))                             # smoothstep
    mask.paste(a, (x, 0, x + 1, h))
canvas.paste(p, (x0, 0), mask)
hero = canvas.resize((2400, round(2400 * H / W)), Image.LANCZOS)
hero.save(os.path.join(OUT, 'hero-paula-wide.jpg'), quality=82, optimize=True, progressive=True)
p.resize((900, round(900 * h / w)), Image.LANCZOS).save(os.path.join(OUT, 'hero-paula.jpg'), quality=82, optimize=True, progressive=True)

# --- Ergebnis-Bilder (Hochformat), lange Seite 1200 px
items = {
    'nails.jpg': 'nails.jpg',
    'lashlift.jpg': 'lashlift.jpg',
    'lips-1.jpg': 'lips-1.jpg',
    'lips-2.jpg': 'lips-2.jpg',
    'lips-3.jpg': 'lips-3.jpg',
    'lashes.jpg': 'lashes-extensions.jpg',
}
for name, path in items.items():
    im = Image.open(os.path.join(SRC, path)).convert('RGB')
    im.thumbnail((1200, 1200), Image.LANCZOS)
    im.save(os.path.join(OUT, name), quality=80, optimize=True, progressive=True)
for f in sorted(os.listdir(OUT)):
    im = Image.open(os.path.join(OUT, f))
    print(f, im.size, os.path.getsize(os.path.join(OUT, f)) // 1024, 'KB')
