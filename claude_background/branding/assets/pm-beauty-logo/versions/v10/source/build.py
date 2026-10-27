# LM logo, third pass: ONE continuous stroke (hook -> top line -> Z -> L -> M -> flourish).
# Corners are circular fillets; the stroke width changes ONLY inside a fillet (smoothstep over
# the turn), so every straight run keeps its own width and the frame edges stay exact.
# The three diagonals bow gently (sin^2 profile, zero slope at the ends). Hook and flourish are
# Catmull-Rom curves; the flourish is the hook mirrored left-right. Photo pixel coords, 1600x955.
import math, sys, json
import numpy as np
from PIL import Image, ImageDraw

S = 4
L, T, R, B = 90, 137, 1380, 897
P = json.loads(sys.argv[1]) if len(sys.argv) > 1 else {}
g = lambda k, d: P.get(k, d)
WT, WI = g('WT', 31), g('WI', 35)
WZ, WL, WM = g('WZ', 54), g('WL', 58), g('WM', 62)
yt, yb, xl, xr = T + WT / 2, B - WT / 2, L + WT / 2, R - WT / 2
xm = g('xm', 972)

zs = -0.96                                   # Z diagonal dx/dy
zx0 = 545 + g('zdx', 0)
zx_at = lambda y: zx0 + zs * (y - 300)
ls = -0.918
ms = g('ms', -0.485)                                 # M diagonal dx/dy
y5, y6 = g('y5', 128), g('y6', 893)          # solved: peak 1, V
y7 = y6 + (xr - xm) / ms                     # the M diagonal keeps its slope
x4 = xm + ls * (yb - y5)                     # long diagonal keeps its slope
FX = g('fx', 1440)                           # where the bottom run hands over to the flourish

V = [  # x, y, fillet radius, width of the segment leaving this vertex
    (g('hj', 150), yt, 0, WT),
    (zx_at(yt), yt, g('r_zt', 120), WZ),
    (xl, 300 + (xl - zx0) / zs, g('r_zl', 70), WT),
    (xl, yb, g('r_bl', 16), WT),
    (x4, yb, g('r_lb', 110), WL),
    (xm, y5, g('r_p1', 40), WT),
    (xm, y6, g('r_v', 24), WM),
    (xr, y7, g('r_p2', 44), WT),
    (xr, yb, g('r_br', 80), WT),
    (FX, yb, 0, 0),
]
BOW = {1: g('bz', 10), 4: g('bl', 7), 6: g('bm', 6)}   # px toward the lower right

def main_path(v):
    out = []                                  # (x, y, w)
    def run(a, b, w, seg_i):
        d = math.dist(a, b); n = max(2, int(d / 0.5))
        dx, dy = (b[0] - a[0]) / d, (b[1] - a[1]) / d
        nx, ny = -dy, dx
        if nx < 0: nx, ny = -nx, -ny
        amp = BOW.get(seg_i, 0)
        for i in range(n):
            t = i / n; o = amp * math.sin(math.pi * t) ** 2
            out.append((a[0] + (b[0] - a[0]) * t + nx * o, a[1] + (b[1] - a[1]) * t + ny * o, w))
    cur = v[0][:2]
    for i in range(1, len(v) - 1):
        p0, p1, p2 = (np.array(v[k][:2], float) for k in (i - 1, i, i + 1))
        r = v[i][2]; win, wout = v[i - 1][3], v[i][3]
        d1 = (p1 - p0) / np.linalg.norm(p1 - p0); d2 = (p2 - p1) / np.linalg.norm(p2 - p1)
        ang = math.acos(max(-1, min(1, float(np.dot(-d1, d2)))))
        t = r / math.tan(ang / 2)
        a, b = p1 - d1 * t, p1 + d2 * t
        run(cur, tuple(a), win, i - 1)
        nrm = np.array([-d1[1], d1[0]])
        if np.dot(nrm, d2) < 0: nrm = -nrm
        c = a + nrm * r
        a0 = math.atan2(a[1] - c[1], a[0] - c[0]); a1 = math.atan2(b[1] - c[1], b[0] - c[0])
        da = (a1 - a0 + math.pi) % (2 * math.pi) - math.pi
        n = max(8, int(abs(da) * r / 0.5))
        for k in range(n):
            u = k / n; sm = u * u * (3 - 2 * u)
            aa = a0 + da * u
            out.append((c[0] + r * math.cos(aa), c[1] + r * math.sin(aa), win + (wout - win) * sm))
        cur = tuple(b)
    run(cur, v[-1][:2], v[-2][3], len(v) - 2)
    return out

def catmull(pts, step=0.5):
    pts = [np.array(p, float) for p in pts]
    pts = [2 * pts[0] - pts[1]] + pts + [2 * pts[-1] - pts[-2]]
    out = []
    for i in range(1, len(pts) - 2):
        p0, p1, p2, p3 = pts[i - 1:i + 3]
        # centripetal parametrisation: no cusps, no overshoot loops
        t0 = 0; t1 = t0 + np.linalg.norm(p1 - p0) ** .5; t2 = t1 + np.linalg.norm(p2 - p1) ** .5; t3 = t2 + np.linalg.norm(p3 - p2) ** .5
        n = max(4, int(np.linalg.norm(p2 - p1) / step))
        for k in range(n):
            t = t1 + (t2 - t1) * k / n
            A1 = (t1 - t) / (t1 - t0) * p0 + (t - t0) / (t1 - t0) * p1
            A2 = (t2 - t) / (t2 - t1) * p1 + (t - t1) / (t2 - t1) * p2
            A3 = (t3 - t) / (t3 - t2) * p2 + (t - t2) / (t3 - t2) * p3
            B1 = (t2 - t) / (t2 - t0) * A1 + (t - t0) / (t2 - t0) * A2
            B2 = (t3 - t) / (t3 - t1) * A2 + (t - t1) / (t3 - t1) * A3
            out.append(tuple((t2 - t) / (t2 - t1) * B1 + (t - t1) / (t2 - t1) * B2))
    out.append(tuple(pts[-2]))
    return out

# hook, as offsets from where it leaves the top line (heading left), measured off the photo's
# hook: a tight clockwise curl that ends pointing right. The width only grows once the curve has
# turned away from the line (by tangent angle, not distance), so the line's edges stay straight.
SC = g('hs', 1.0)
HOOK = [(0, 0), (-18, -0.2), (-36, -1.6), (-52, -10), (-61, -28), (-63, -52), (-57, -76), (-46, -93), (-31, -103), (-14, -106)]
HOOK = [(x * SC, y * SC) for x, y in HOOK]
def curl(anchor, mirror, w_mid, w_end):
    pts = [(anchor[0] + (-x if mirror else x), anchor[1] + y) for x, y in HOOK]
    c = np.array(catmull(pts))
    tg = np.unwrap(np.arctan2(*np.gradient(c, axis=0)[:, ::-1].T))
    turn = np.abs(tg - tg[0]); turn = np.degrees(turn)
    u = np.clip((turn - g('turn0', 35)) / g('turn1', 120), 0, 1); sm = u * u * (3 - 2 * u)
    s_ = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(c, axis=0).T))]); s_ /= s_[-1]
    v = np.clip((s_ - 0.6) / 0.4, 0, 1); sv = v * v * (3 - 2 * v)
    w = WT + (w_mid - WT) * sm + (w_end - w_mid) * sv
    return [(x, y, ww) for (x, y), ww in zip(c, w)]

hook = curl((V[0][0], yt), False, g('wmid', 46), g('wend', 54))[::-1]
# bottom-right flourish, after the photo: the bottom line runs on, lifts gently and swells into
# a teardrop head pointing up-right. Its BOTTOM edge stays nearly flat (the centre rises by half
# of what the width gains), only the top edge climbs. Offsets from FX: (dx, dy, width)
FL = g('fl', [(0, 0, WT), (28, -3, 36), (58, -10, 46), (84, -20, 56), (104, -31, 63), (118, -40, 66)])
fc = catmull([(FX + dx, yb + dy) for dx, dy, _ in FL])
fa = np.array(fc); fs = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(fa, axis=0).T))])
ks = [0]
for dx, dy, _ in FL[1:]:
    ks.append(fs[np.argmin(np.hypot(fa[:, 0] - FX - dx, fa[:, 1] - yb - dy))])
fw = np.interp(fs, ks, [w for *_, w in FL])
flour = [(x, y, w) for (x, y), w in zip(fc, fw)]
stroke = np.array(hook + main_path(V) + flour)
# resample to an even 0.5 px step, then smooth position and width together along the stroke:
# turns every arc-to-line join curvature-continuous, so no corner reads as a kink
sl = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(stroke[:, :2], axis=0).T))])
keep = np.concatenate([[True], np.diff(sl) > 1e-6]); stroke, sl = stroke[keep], sl[keep]
su = np.arange(0, sl[-1], 0.5)
stroke = np.stack([np.interp(su, sl, stroke[:, k]) for k in range(3)], 1)
from scipy.ndimage import gaussian_filter1d
sig = g('smooth', 10) / 0.5
stroke = np.stack([gaussian_filter1d(stroke[:, k], sig, mode='nearest') for k in range(3)], 1)
ibar = [(L + WI / 2, y, WI) for y in np.arange(g('i_top', 212), g('i_bot', 594), 0.5)]

PAD = g('pad', 0)                            # canvas margin so a heavy variant is not clipped
W, H = 1600 + 2 * PAD, 955 + 2 * PAD
img = Image.new('L', (W * S, H * S), 0); d = ImageDraw.Draw(img)
k = g('k', 1.0)
for x, y, w in list(map(tuple, stroke)) + ibar:
    x += PAD; y += PAD
    r = w * k * S / 2; d.ellipse((x * S - r, y * S - r, x * S + r, y * S + r), fill=255)
img.save(g('out', 'raster4x.png'))
if g('centre', None):                        # centreline for the writing animation (photo coords)
    json.dump({'main': [[round(x, 1), round(y, 1), round(w, 1)] for x, y, w in stroke[::4]],
               'i': [[round(x, 1), round(y, 1), round(w, 1)] for x, y, w in ibar[::4]]},
              open(g('centre', None), 'w'), separators=(',', ':'))
