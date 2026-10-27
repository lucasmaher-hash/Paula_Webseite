import json, subprocess, sys, numpy as np, potrace
from PIL import Image
S = 4
base = json.load(open('params-final.json'))
ks = [round(0.6 + 0.05 * i, 2) for i in range(21)]
out = {}; boxes = []
for k in ks:
    p = dict(base, k=k, out=f'var_{k}.png', pad=80)
    subprocess.run([sys.executable, '-I', 'build.py', json.dumps(p)], check=True)
    m = np.asarray(Image.open(f'var_{k}.png')) > 127
    ys, xs = np.where(m); boxes.append((xs.min()/S - 80, ys.min()/S - 80, xs.max()/S - 80, ys.max()/S - 80))
    pl = potrace.Bitmap(~m).trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.2)
    f = lambda q: f'{q.x / S - 80:.1f} {q.y / S - 80:.1f}'
    d = []
    for c in pl:
        d.append('M' + f(c.start_point))
        for s in c.segments:
            d.append(f'L{f(s.c)}L{f(s.end_point)}' if s.is_corner else f'C{f(s.c1)} {f(s.c2)} {f(s.end_point)}')
        d.append('Z')
    out[f'{k:.2f}'] = ''.join(d)
    print(k, len(out[f'{k:.2f}']))
b = np.array(boxes); print('union', b[:,0].min(), b[:,1].min(), b[:,2].max(), b[:,3].max())
json.dump(out, open('variants.json', 'w'), separators=(',', ':'))
