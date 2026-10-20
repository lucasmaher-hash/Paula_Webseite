import json, subprocess, sys
import numpy as np
from PIL import Image
S = 4
p = json.loads(sys.argv[1]) if len(sys.argv) > 1 else {}
def run():
    subprocess.run([sys.executable, '-I', 'build.py', json.dumps(p)], check=True)
    return np.asarray(Image.open('raster4x.png')) > 127
top = lambda m, a, b: np.where(m[:, a*S:b*S].any(1))[0].min() / S
bot = lambda m, a, b: np.where(m[:, a*S:b*S].any(1))[0].max() / S
corner = lambda m: 400 + np.where(m[140*S:300*S, 400*S:720*S].any(0))[0].max() / S
for it in range(12):
    m = run()
    e5 = top(m, 900, 1010) - 137; e7 = top(m, 1250, 1400) - 137; e6 = bot(m, 930, 1060) - 897; ec = corner(m) - 608
    print(it, e5, e7, e6, ec)
    p['y5'] = p.get('y5', 128) - e5; p['y6'] = p.get('y6', 893) - e7; p['r_v'] = p.get('r_v', 24) + e6 / 3.5; p['zdx'] = p.get('zdx', 0) - ec
    if max(map(abs, (e5, e7, e6, ec))) < 0.3: break
json.dump(p, open('params.json', 'w'))
m = run()
print(json.dumps(p))
print('peaks', top(m, 900, 1010), top(m, 1250, 1400), 'V', bot(m, 930, 1060), 'Zright', corner(m),
      'topline', top(m, 300, 400), 'bottom', bot(m, 200, 260), 'left', np.where(m[650*S:880*S].any(0))[0].min()/S,
      'rightvert', 1300 + np.where(m[300*S:700*S, 1300*S:1450*S].any(0))[0].max()/S)
