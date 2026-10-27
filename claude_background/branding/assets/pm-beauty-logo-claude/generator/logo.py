"""PM BEAUTY Wortmarke: Cormorant-Unicase-Glyphen + parametrisch konstruiertes E.

Einheiten = Font-Units (1000/em). y nach oben, Grundlinie 0. Ausgabe als SVG (y nach unten).
"""
import json, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

FONT = sys.argv[1]
OUT = sys.argv[2]
P = json.loads(sys.argv[3]) if len(sys.argv) > 3 else {}

f = TTFont(FONT)
gs = f.getGlyphSet()
cmap = f.getBestCmap()
CAP = 625

# ---- Parameter -------------------------------------------------------------
p = dict(
    H=2.7 * CAP,      # Höhe der Außenstriche über Grundlinie
    W=625,            # Breite des E (= Versalhöhe des Original-E)
    hair=32,          # Haarstrich (Arme des Original-E)
    bar_lo=0,        # Unterkante Balken (Rücken des E, Stammstärke 64)
    bar_hi=64,       # Oberkante Balken
    foot=18,
    foot_d=72,        # wie weit die Füße unter die Grundlinie reichen
    notch_w=95, notch_h=28,
    foot_x=80,        # wo die Fußkehle in die Balkenunterkante übergeht
    stem=38,          # Mittelstiel
    stem_fillet=60,   # Kehle Stiel -> Balken
    top=round(0.54 * CAP),          # Oberkante Kappe des Mittelstiels
    plate_t=16,       # Dicke der Kappe
    plate_w=150,      # Breite der Kappe
    flare_w=96,       # Breite des Kelchs direkt unter der Kappe
    flare_h=110,      # Höhe des Kelchs
    kx=26, ky=30,     # innere Kehle Außenstrich -> Balken
    e_air=50,         # Extra-Luft links und rechts vom E (symmetrisch)
    track=110,        # Grundlaufweite
    delta=45,         # +delta links vom E, -delta rechts (optischer Ausgleich A/T/Y)
    fg='#FFFFFF', bg='#A08E8B', pad=420, scale=0.25,
)
p.update(P)


def E_path(p):
    W, H, h, lo, hi, ft = p['W'], p['H'], p['hair'], p['bar_lo'], p['bar_hi'], p['foot']
    cx = W / 2
    s = p['stem'] / 2
    r = p['stem_fillet']
    yT = p['top']
    pt = p['plate_t']
    pw = p['plate_w'] / 2
    fw = p['flare_w'] / 2
    yF = yT - pt - p['flare_h']
    # innere Kehle Außenstrich -> Balkenoberkante (aus dem Original-E: ~65 x 82)
    kx, ky = p['kx'], p['ky']
    pts = []
    m = lambda x, y: pts.append(('M', [(x, y)]))
    l = lambda x, y: pts.append(('L', [(x, y)]))
    c = lambda *a: pts.append(('C', [a[0:2], a[2:4], a[4:6]]))
    yb = lo - p['foot_d']
    m(0, yb)
    l(0, H); l(h, H)
    l(h, hi + ky)
    c(h, hi + ky * 0.45, h + kx * 0.45, hi, h + kx, hi)
    l(cx - s - r, hi)
    c(cx - s - r * 0.5, hi, cx - s, hi + r * 0.3, cx - s, hi + r * 0.9)
    l(cx - s, yF)
    L = yT - pt - yF
    c(cx - s, yF + L * 0.5, cx - s - (fw - s) * 0.3, yT - pt - L * 0.08, cx - fw, yT - pt)
    l(cx - pw + pt / 2, yT - pt)
    c(cx - pw + pt * 0.2, yT - pt, cx - pw, yT - pt * 0.75, cx - pw, yT - pt / 2)
    c(cx - pw, yT - pt * 0.2, cx - pw + pt * 0.2, yT, cx - pw + pt / 2, yT)
    l(cx + pw - pt / 2, yT)
    c(cx + pw - pt * 0.2, yT, cx + pw, yT - pt * 0.2, cx + pw, yT - pt / 2)
    c(cx + pw, yT - pt * 0.75, cx + pw - pt * 0.2, yT - pt, cx + pw - pt / 2, yT - pt)
    l(cx + fw, yT - pt)
    c(cx + s + (fw - s) * 0.3, yT - pt - L * 0.08, cx + s, yF + L * 0.5, cx + s, yF)
    l(cx + s, hi + r * 0.9)
    c(cx + s, hi + r * 0.3, cx + s + r * 0.5, hi, cx + s + r, hi)
    l(W - h - kx, hi)
    c(W - h - kx * 0.45, hi, W - h, hi + ky * 0.45, W - h, hi + ky)
    l(W - h, H); l(W, H); l(W, yb); l(W - ft, yb)
    # Fußkehle -> Balkenunterkante (aus dem Original-E: Serife des Rückens)
    fx = p['foot_x']
    fd = p['foot_d']
    c(W - ft, yb + fd * 0.6, W - ft - (fx - ft) * 0.45, lo, W - fx, lo)
    # Kerbe unter dem Mittelstiel (Referenz: Balkenunterseite läuft spitz nach oben zusammen)
    nw, nh = p['notch_w'], p['notch_h']
    l(cx + nw, lo)
    c(cx + nw * 0.35, lo, cx + 3, lo + nh * 0.55, cx, lo + nh)
    c(cx - 3, lo + nh * 0.55, cx - nw * 0.35, lo, cx - nw, lo)
    l(fx, lo)
    c(ft + (fx - ft) * 0.45, lo, ft, yb + fd * 0.6, ft, yb)
    pts.append(('Z', []))
    return pts


def path_str(cmds, ox, base):
    out = []
    for op, a in cmds:
        out.append(op + ' '.join(f'{ox + x:.2f} {base - y:.2f}' for x, y in a))
    return ''.join(out)


def glyph(ch, ox, base):
    pen = SVGPathPen(gs)
    gs[cmap[ord(ch)]].draw(TransformPen(pen, (1, 0, 0, -1, ox, base)))
    return pen.getCommands()


def bounds(ch):
    b = BoundsPen(gs); gs[cmap[ord(ch)]].draw(b); return b.bounds


adv = lambda ch: gs[cmap[ord(ch)]].width
KERN = {('A', 'U'): -35}


def layout(word_extra):
    tL, tR = p['track'] + p['delta'], p['track'] - p['delta']
    items = []  # (ch, origin_x)
    x = 0
    for ch in 'PM B':
        items.append((ch, x))
        x += adv(ch) + tL + (word_extra if ch == ' ' else 0)
    # Ink-Abstand B|E und E|A identisch: Grundabstand (Vor-/Nachbreite + Laufweite) plus Extra-Luft
    g = 41 + 50 + p['track'] + p['e_air']
    b_right = items[-1][1] + bounds('B')[2]
    e_x = b_right + g
    x = e_x + p['W'] + g - bounds('A')[0]
    for i, ch in enumerate('AUTY'):
        items.append((ch, x))
        nxt = 'AUTY'[i + 1] if i < 3 else None
        x += adv(ch) + tR + KERN.get((ch, nxt), 0)
    ink = [(o + bounds(ch)[0], o + bounds(ch)[2]) for ch, o in items if ch != ' ']
    left = min(a for a, _ in ink); right = max(b for _, b in ink)
    return items, e_x, left, right


items, e_x, left, right = layout(0)
word_extra = 2 * ((left + right) / 2 - (e_x + p['W'] / 2))
items, e_x, left, right = layout(word_extra)
center_err = (left + right) / 2 - (e_x + p['W'] / 2)

pad = p['pad']
top_y = max(p['H'], 654)
base = pad + top_y
width = right - left + 2 * pad
height = top_y + 2 * pad + p['foot_d']
ox = pad - left

d = ''.join(glyph(ch, ox + o, base) for ch, o in items if ch != ' ')
d += path_str(E_path(p), ox + e_x, base)
bg = f'<rect width="100%" height="100%" fill="{p["bg"]}"/>' if p['bg'] else ''
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} {height:.0f}" '
       f'width="{width * p["scale"]:.1f}" height="{height * p["scale"]:.1f}">{bg}'
       f'<path fill="{p["fg"]}" fill-rule="nonzero" d="{d}"/></svg>')
open(OUT, 'w').write(svg)
print(json.dumps(dict(out=OUT, word_extra=round(word_extra, 1), center_err=round(center_err, 4),
                      ink_width=right - left, e_center=e_x + p['W'] / 2 - left)))

if p.get('parts'):
    # Grundlinie y=0, Buchstaben und E getrennt (für den Figma-Import)
    letters = ''.join(glyph(ch, ox + o, 0) for ch, o in items if ch != ' ')
    e = path_str(E_path(p), ox + e_x, 0)
    json.dump(dict(letters=letters, e=e, vb=[0, -(top_y + pad), round(width), round(height)],
                   e_center_x=ox + e_x + p['W'] / 2, width=width,
                   items=[(ch, round(ox + o, 2)) for ch, o in items if ch != ' ']), open(p['parts'], 'w'))
