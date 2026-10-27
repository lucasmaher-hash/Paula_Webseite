from pathlib import Path
import json

HERE = Path(__file__).resolve().parent
BASE = json.loads((HERE / 'base-v10.json').read_text())
STEM_SHIFT = 70

def split_outline(path):
    cut = path.rfind('ZM')
    if cut < 0 or path.count('ZM') != 1:
        raise ValueError('Expected one separate P-stem subpath')
    return path[:cut + 1], path[cut + 1:]

for name, width in [('pm-monogram-v12.svg', '1.20'), ('pm-monogram-v12-small.svg', '1.30')]:
    target = HERE / name
    if target.exists():
        raise FileExistsError(target)
    main, stem = split_outline(BASE['widths'][width])
    target.write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 -20 1590 950" fill="currentColor">\n'
        f'  <path d="{main}"/>\n'
        f'  <path d="{stem}" transform="translate(0 {STEM_SHIFT})"/>\n'
        '</svg>\n'
    )

animation = {'main': BASE['main'], 'i': [[x, y + STEM_SHIFT, w] for x, y, w in BASE['i']], 'cuts': BASE['cuts']}
target = HERE / 'animation-data.json'
if target.exists():
    raise FileExistsError(target)
target.write_text(json.dumps(animation, separators=(',', ':')) + '\n')
