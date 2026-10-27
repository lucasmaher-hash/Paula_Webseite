# Packs variants.json (from variants.py) and centre.json (build.py with "centre") into the
# styleguide data file and the default SVG. Refuses to overwrite (VERSIONING.md).
import json, os, sys
for f in ('pm-monogram-v10.json', 'pm-monogram-v10.svg'):
    if os.path.exists(f): sys.exit(f'{f} exists: write a new version folder instead of overwriting')
c = json.load(open('centre.json')); v = json.load(open('variants.json'))
main = c['main'][::2] + ([c['main'][-1]] if (len(c['main']) - 1) % 2 else [])
json.dump({'note': 'PM-Monogramm v10: Umriss je Strichstaerke (Faktor 0.60-1.60), Mittellinie fuer die Schreibanimation. Koordinaten wie die Skizze (1600 x 955).',
           'viewBox': [30, -20, 1590, 950], 'widths': v, 'main': main,
           'i': [c['i'][0], c['i'][len(c['i']) // 2], c['i'][-1]],
           'cuts': [132, 1455, 2630, 3347, 4146, 4868]},
          open('pm-monogram-v10.json', 'w'), separators=(',', ':'))
open('pm-monogram-v10.svg', 'w').write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 -20 1590 950" fill="currentColor" role="img" aria-label="PM Beauty"><path fill-rule="evenodd" d="' + v['1.00'] + '"/></svg>\n')
