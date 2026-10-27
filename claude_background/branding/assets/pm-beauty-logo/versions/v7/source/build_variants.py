"""Three independent, outlined SVG concepts. Never overwrite a saved revision."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import colorsys
ROOT=Path(__file__).resolve().parents[1]
REPO=Path(__file__).resolve().parents[6]
serif=TTFont(REPO/'fonts/Italiana-Regular.ttf')
sans=TTFont(REPO/'fonts/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1ZuWi3g.woff2')
def rgb(h,s,l):return '#'+''.join(f'{round(v*255):02x}' for v in colorsys.hls_to_rgb(h/360,l/100,s/100))
BROWN=rgb(16,38*.6,37); PINK=rgb(351,35*.6,32); PAPER=rgb(16,38,94)
def glyphs(text,font,cap,tracking=0):
 gs=font.getGlyphSet(); cmap=font.getBestCmap(); scale=cap/font['OS/2'].sCapHeight
 out=[]; x=0
 for c in text:
  g=gs[cmap[ord(c)]]; pen=SVGPathPen(gs)
  g.draw(TransformPen(pen,(scale,0,0,-scale,x,0)))
  if pen.getCommands():out.append('<path d="'+pen.getCommands()+'"/>')
  x+=g.width*scale+tracking
 return ''.join(out),x-tracking

def line(text,font,cap,cx,baseline,tracking=0):
 paths,width=glyphs(text,font,cap,tracking)
 return f'<g transform="translate({cx-width/2:.4f} {baseline})">{paths}</g>'

def save(name,title,body,color):
 art=f'<g fill="{color}">{body}</g>'
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="900" height="420" viewBox="0 0 900 420" role="img" aria-labelledby="title"><title id="title">{title}</title>{art}</svg>\n'
 preview=svg.replace(art,f'<rect width="900" height="420" rx="24" fill="{PAPER}"/>'+art)
 for suffix,data in [('.svg',svg),('-preview.svg',preview)]:
  with (ROOT/(name+suffix)).open('x') as f:f.write(data)

# 01: A quiet fashion-editorial wordmark. Different tracking for name and descriptor.
body=line('PM BEAUTY',serif,79,450,220,2.0)+line('PAULA MAHER',sans,12,450,270,5)
save('01-editorial','PM Beauty — Editorial wordmark',body,BROWN)

# 02: Asymmetric, interlocking initials; the P rises above the wider M.
p,w=glyphs('P',serif,146); m,mw=glyphs('M',serif,116)
body=f'<g transform="translate(357 225)">{p}</g><g transform="translate(414 258)">{m}</g>'
body+=line('BEAUTY',sans,14,450,310,7)
save('02-monogram','PM Beauty — Interlocking monogram',body,PINK)

# 03: A bespoke lowercase symbol within an open oval, with a spaced wordmark.
# The p's long stem and the m's two arches are drawn as one family of curves.
body=f'''<g fill="none" stroke="{BROWN}" stroke-linecap="round" stroke-linejoin="round">
<path d="M389 278 C316 246 319 119 375 80 C417 50 483 50 525 80 C581 119 584 246 511 278" stroke-width="1.7"/>
<path d="M395 230 V139 C395 115 439 115 439 147 C439 179 395 179 395 150" stroke-width="4"/>
<path d="M456 173 V136 C456 115 484 115 484 136 V173 M484 136 C484 115 512 115 512 136 V173" stroke-width="4"/>
</g>'''
body+=line('BEAUTY',sans,13,450,286,6)
body+=line('PAULA MAHER',serif,18,450,342,2)
save('03-studio-seal','PM Beauty — Open oval studio seal',body,BROWN)
print('Created three SVG logos and three SVG previews in',ROOT)
