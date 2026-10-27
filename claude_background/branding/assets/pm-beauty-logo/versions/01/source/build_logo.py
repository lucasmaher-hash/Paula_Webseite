"""Build an outlined wordmark; requires fonttools. All dimensions are SVG units."""
from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parent.parent
font = TTFont(ROOT / 'source/CormorantUnicase-Regular.ttf')
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
SCALE = 0.16
BASELINE = 232

def bounds(char):
    pen = BoundsPen(glyphs)
    glyphs[cmap[ord(char)]].draw(pen)
    return pen.bounds

def width(char):
    b = bounds(char)
    return (b[2] - b[0]) * SCALE

# Visible outline widths, rather than text-box advances, define the centre.
right_gaps = [8, 6, 4]
side_width = sum(width(c) for c in 'AUTY') + sum(right_gaps)
pm_gap = 48
mb_gap = side_width - sum(width(c) for c in 'PMB') - pm_gap
e_gap = 18
e_half = 50
half_width = side_width + e_gap + e_half
paths = []
positions = {}

def letter(char, x):
    pen = SVGPathPen(glyphs)
    transform = (SCALE, 0, 0, -SCALE, x - bounds(char)[0] * SCALE, BASELINE)
    glyphs[cmap[ord(char)]].draw(TransformPen(pen, transform))
    paths.append(f'<path id="letter-{char}" d="{pen.getCommands()}"/>')
    positions[char] = [round(x, 3), round(x + width(char), 3)]

x = -half_width
for i, char in enumerate('PMB'):
    letter(char, x)
    x += width(char) + ([pm_gap, mb_gap, 0][i])

# A single closed contour, mirrored about x=0. No rotated font glyph.
E = '''M -50 0 L -45.5 0 L -45.5 224
C -45.5 230 -36 226 -27 226 L -15 226
C -6 226 -3 221 -3 212 L -3 191
C -3 184 -7 182 -13 181 L -13 179 L 13 179 L 13 181
C 7 182 3 184 3 191 L 3 212
C 3 221 6 226 15 226 L 27 226
C 36 226 45.5 230 45.5 224 L 45.5 0 L 50 0 L 50 244
L 48 244 C 46 233 35 232 27 232 L 15 232
C 7 232 2 229 0 226 C -2 229 -7 232 -15 232 L -27 232
C -35 232 -46 233 -48 244 L -50 244 Z'''
paths.append(f'<path id="custom-E" d="{E}"/>')
x = e_half + e_gap
for i, char in enumerate('AUTY'):
    letter(char, x)
    x += width(char) + (right_gaps[i] if i < 3 else 0)

def svg(fill, preview=False, emblem=False):
    pad = 50 if preview else 12
    h = 244 + pad * 2
    w = 100 + pad * 2 if emblem else half_width * 2 + pad * 2
    left = -w / 2
    background = f'<rect x="{left}" y="{-pad}" width="{w}" height="{h}" fill="#20201f"/>' if preview else ''
    body = f'<path id="custom-E" d="{E}"/>' if emblem else '\n'.join(paths)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w:.2f}" height="{h}" viewBox="{left:.2f} {-pad} {w:.2f} {h}" role="img" aria-label="PM Beauty">
<title>PM Beauty — Cormorant Unicase with custom E</title>
{background}<g fill="{fill}">{body}</g></svg>'''

for filename, fill in [('pm-beauty-black.svg', '#20201f'), ('pm-beauty-white.svg', '#ffffff')]:
    (ROOT / filename).write_text(svg(fill))
(ROOT / 'pm-beauty-preview.svg').write_text(svg('#ffffff', preview=True))
(ROOT / 'pm-beauty-E.svg').write_text(svg('#20201f', emblem=True))
metrics = {'font': 'Cormorant Unicase Regular', 'font_size': 160, 'E_axis': 0,
           'visible_bounds_x': [-half_width, half_width], 'E_bounds_x': [-50, 50],
           'left_right_width': side_width, 'PM_gap': pm_gap, 'MB_gap': mb_gap,
           'E_side_gaps': e_gap, 'AUTY_gaps': right_gaps, 'letter_bounds_x': positions}
(ROOT / 'source/geometry.json').write_text(json.dumps(metrics, indent=2))
print(json.dumps(metrics, indent=2))
