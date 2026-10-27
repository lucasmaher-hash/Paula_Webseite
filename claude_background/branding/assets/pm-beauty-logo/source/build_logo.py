"""Build an outlined wordmark; requires fonttools. All dimensions are SVG units."""
from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.svgLib.path import parse_path

ROOT = Path(__file__).resolve().parent.parent
font = TTFont(ROOT / 'source/CormorantUnicase-Regular.ttf')
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
SCALE = 0.16
BASELINE = 232
WIDTH_FACTORS = {'B': 1.08, 'A': 0.94}
E_BOTTOM = 247.6  # Downward serif: 12 -> 15.6 units below baseline (+30%).
E_SCALE = 1.3  # Scale about the baseline and horizontal centre.
E_TOP_SCALED = BASELINE * (1 - E_SCALE)
E_BOTTOM_SCALED = BASELINE + (E_BOTTOM - BASELINE) * E_SCALE

def bounds(char):
    pen = BoundsPen(glyphs)
    glyphs[cmap[ord(char)]].draw(pen)
    return pen.bounds

def width(char):
    b = bounds(char)
    return (b[2] - b[0]) * SCALE * WIDTH_FACTORS.get(char, 1)

# Visible outline widths, rather than text-box advances, define the centre.
right_gaps = [3, 6, 4]
side_width = sum(width(c) for c in 'AUTY') + sum(right_gaps)
pm_gap = 32
mb_gap = side_width - sum(width(c) for c in 'PMB') - pm_gap
e_gap = 18
e_half = 50 * E_SCALE
half_width = side_width + e_gap + e_half
paths = []
positions = {}

def letter(char, x):
    pen = SVGPathPen(glyphs)
    sx = SCALE * WIDTH_FACTORS.get(char, 1)
    transform = (sx, 0, 0, -SCALE, x - bounds(char)[0] * sx, BASELINE)
    glyphs[cmap[ord(char)]].draw(TransformPen(pen, transform))
    paths.append(f'<path id="letter-{char}" d="{pen.getCommands()}"/>')
    positions[char] = [round(x, 3), round(x + width(char), 3)]

x = -half_width
for i, char in enumerate('PMB'):
    letter(char, x)
    x += width(char) + ([pm_gap, mb_gap, 0][i])

# A single closed contour, mirrored about x=0. No rotated font glyph.
# Before scaling: bottom bar 6.9 * 1.4 = 9.66; centre stem 6.9 * .7 = 4.83.
E = f'''M -50 0 L -44.825 0 L -44.825 220.34
C -44.825 226.34 -36 222.34 -27 222.34 L -15 222.34
C -5.415 222.34 -2.415 217.34 -2.415 212 L -2.415 191
C -2.415 184.3 -7 182.3 -13 181.3 L -13 179 L 13 179 L 13 181.3
C 7 182.3 2.415 184.3 2.415 191 L 2.415 212
C 2.415 217.34 5.415 222.34 15 222.34 L 27 222.34
C 36 222.34 44.825 226.34 44.825 220.34 L 44.825 0 L 50 0 L 50 {E_BOTTOM}
L 47.7 {E_BOTTOM} C 45.7 233.3 35 232 27 232 L 15 232
C 7 232 2 229 0 222.34 C -2 229 -7 232 -15 232 L -27 232
C -35 232 -45.7 233.3 -47.7 {E_BOTTOM} L -50 {E_BOTTOM} Z'''
scaled_pen = SVGPathPen(None)
parse_path(E, TransformPen(scaled_pen, (E_SCALE, 0, 0, E_SCALE, 0, E_TOP_SCALED)))
E = scaled_pen.getCommands()
paths.append(f'<path id="custom-E" d="{E}"/>')
x = e_half + e_gap
for i, char in enumerate('AUTY'):
    letter(char, x)
    x += width(char) + (right_gaps[i] if i < 3 else 0)

def svg(fill, preview=False, emblem=False):
    pad = 50 if preview else 12
    h = E_BOTTOM_SCALED - E_TOP_SCALED + pad * 2
    top = E_TOP_SCALED - pad
    w = e_half * 2 + pad * 2 if emblem else half_width * 2 + pad * 2
    left = -w / 2
    background = f'<rect x="{left}" y="{top}" width="{w}" height="{h}" fill="#20201f"/>' if preview else ''
    body = f'<path id="custom-E" d="{E}"/>' if emblem else '\n'.join(paths)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w:.2f}" height="{h}" viewBox="{left:.2f} {top} {w:.2f} {h}" role="img" aria-label="PM Beauty">
<title>PM Beauty — Cormorant Unicase with custom E</title>
{background}<g fill="{fill}">{body}</g></svg>'''

for filename, fill in [('pm-beauty-black.svg', '#20201f'), ('pm-beauty-white.svg', '#ffffff')]:
    (ROOT / filename).write_text(svg(fill))
(ROOT / 'pm-beauty-preview.svg').write_text(svg('#ffffff', preview=True))
(ROOT / 'pm-beauty-E.svg').write_text(svg('#20201f', emblem=True))
metrics = {'font': 'Cormorant Unicase Regular', 'font_size': 160, 'E_axis': 0,
           'width_factors': WIDTH_FACTORS,
           'E_scale': E_SCALE, 'E_outer_stroke': 5.175 * E_SCALE,
           'E_bottom_bar': 9.66 * E_SCALE, 'E_centre_stem': 4.83 * E_SCALE,
           'E_serif_drop': E_BOTTOM_SCALED - BASELINE,
           'visible_bounds_x': [-half_width, half_width], 'E_bounds_x': [-e_half, e_half],
           'left_right_width': side_width, 'PM_gap': pm_gap, 'MB_gap': mb_gap,
           'E_side_gaps': e_gap, 'AUTY_gaps': right_gaps, 'letter_bounds_x': positions}
(ROOT / 'source/geometry.json').write_text(json.dumps(metrics, indent=2))
print(json.dumps(metrics, indent=2))
