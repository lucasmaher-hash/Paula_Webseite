"""Export lossless-source mockups referenced by styleguide.html as compressed WebP.
Run from the repository root: python3 branding/assets/mockups/make_web_images.py
Original PNGs stay untouched; no crop, tint, compositing or geometry edits.
"""
from pathlib import Path
import re
from PIL import Image

source = Path("branding/assets/mockups")
output = Path("images/mockups")
output.mkdir(parents=True, exist_ok=True)
files = sorted(set(re.findall(r'images/mockups/([^"]+\.webp)', Path("styleguide.html").read_text())))
for filename in files:
    with Image.open(source / Path(filename).with_suffix(".png")) as image:
        image.convert("RGB").save(output / filename, "WEBP", quality=84, method=6)
print(f"Exported {len(files)} WebP files, {sum((output / f).stat().st_size for f in files) / 1024:.0f} KB total.")

