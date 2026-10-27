"""Three research-led, outlined SVG concepts. Never overwrite a saved revision."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.varLib.instancer import instantiateVariableFont
import colorsys
ROOT=Path(__file__).resolve().parents[1]
REPO=Path(__file__).resolve().parents[6]
serif=TTFont(REPO/'fonts/Italiana-Regular.ttf')
sans=TTFont(REPO/'fonts/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1ZuWi3g.woff2')
sans_bold=instantiateVariableFont(sans, {'wght':600}, inplace=False) if 'fvar' in sans else sans
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

# 01: Bloom. Four tapered, mirrored petals; an open valley keeps the centre light.
# Independent sign, not the swan / bottle silhouettes in the references.
petals = '''<path d="M-7 4 C-66-10-89-58-70-100 C-29-91-2-46-7 4Z"/>
<path d="M7 4 C66-10 89-58 70-100 C29-91 2-46 7 4Z"/>
<path d="M-8 18 C-51-24-99-22-113 7 C-89 40-40 48-8 18Z"/>
<path d="M8 18 C51-24 99-22 113 7 C89 40 40 48 8 18Z"/>'''
body='<g transform="translate(450 195) scale(.8)">'+petals+'</g>'
body+=line('PM BEAUTY',serif,48,450,292,1.8)
body+=line('PAULA MAHER',sans,10,450,330,4.2)
save('01-bloom','PM Beauty — Bloom',body,BROWN)

# 02: Wordmark. A firm but rounded lowercase rhythm and an airy descriptor.
# One line and deliberate weight contrast make this usable in a website header.
body=line('pm beauty',sans_bold,73,450,235,-1.8)
body+=line('PAULA MAHER',serif,16,450,285,4.2)
save('02-soft-type','PM Beauty — Soft Type',body,PINK)

# 03: Contour. A drawn profile, a separate brow/eye gesture and an open hair arc.
# No borrowed silhouette: these cubic curves are constructed for this concept.
body=f'''<g fill="none" stroke="{BROWN}" stroke-linecap="round" stroke-linejoin="round">
<path d="M422 237 C368 207 359 145 388 106 C411 76 458 72 487 94" stroke-width="2.4"/>
<path d="M476 101 C465 127 473 142 483 155 C488 162 501 169 500 174 C499 179 486 180 481 181 C487 191 485 195 479 198 C482 203 480 209 475 211 C466 216 455 214 450 225 L447 242" stroke-width="3.3"/>
<path d="M426 148 C437 141 451 141 460 146" stroke-width="3"/>
<path d="M431 158 C441 164 450 162 456 157" stroke-width="2.4"/>
</g>'''
body+=line('PM BEAUTY',serif,44,450,310,3)
body+=line('PAULA MAHER',sans,10,450,348,4.2)
save('03-contour','PM Beauty — Contour',body,BROWN)
print('Created research-led concepts in',ROOT)
