"""Generate /1/ from the maintained experimental page; never edit the generated HTML."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[2]
source = root / 'website/index-experimentell.html'
target = root / 'website/1/index.html'
html = source.read_text()
# The route is one directory deeper. Keep hash links relative to /1/ itself.
html = re.sub(r'\b(src|href|content)="((?:images|fonts|css|js)/[^\"]*)"', lambda m: f'{m[1]}="../{m[2]}"', html)
html = re.sub(r'\bsrcset="((?:images|fonts|css|js)/[^\"]*)"', lambda m: f'srcset="../{m[1]}"', html)
html = html.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<!-- Generated from index-experimentell.html by build-variants.py; do not edit. -->', 1)
target.parent.mkdir(parents=True, exist_ok=True)
target.write_text(html)
print('Generated website/1/index.html from index-experimentell.html')
