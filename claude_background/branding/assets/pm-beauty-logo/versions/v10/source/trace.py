import sys, numpy as np, potrace
from PIL import Image
S = 4
m = np.asarray(Image.open(sys.argv[1] if len(sys.argv) > 1 else 'raster4x.png')) > 127
ys, xs = np.where(m); x0, y0, x1, y1 = xs.min() / S, ys.min() / S, xs.max() / S, ys.max() / S
bm = potrace.Bitmap(~m)
pl = bm.trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.2)
f = lambda p: f'{p.x / S - x0:.2f},{p.y / S - y0:.2f}'
parts = []
for c in pl:
    d = [f'M{f(c.start_point)}']
    for s in c.segments:
        d.append(f'L{f(s.c)} L{f(s.end_point)}' if s.is_corner else f'C{f(s.c1)} {f(s.c2)} {f(s.end_point)}')
    parts.append(''.join(d) + 'Z')
w, h = x1 - x0 + 1 / S, y1 - y0 + 1 / S
open('lm-logo.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" width="{round(w)}" height="{round(h)}"><path fill="#000" fill-rule="evenodd" d="{" ".join(parts)}"/></svg>\n')
print('paths', len(parts), 'size', round(w), round(h))
