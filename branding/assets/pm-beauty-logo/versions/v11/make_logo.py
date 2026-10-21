from pathlib import Path
import cv2
import numpy as np
from PIL import Image, ImageDraw

HERE=Path(__file__).resolve().parent
REF_MAIN=HERE/'reference-without-stem.jpeg'
REF_STEM=HERE/'reference-with-stem.jpeg'


def silhouette(path, threshold, close, sigma, crop=None):
    gray=cv2.imread(str(path),cv2.IMREAD_GRAYSCALE)
    if crop is not None:
        x0,y0,x1,y1=crop
        gray=gray[y0:y1,x0:x1]
    mask=np.uint8(gray<threshold)*255
    mask=cv2.morphologyEx(mask,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(close,close)))
    contours,_=cv2.findContours(mask,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
    contour=max(contours,key=cv2.contourArea)
    filled=np.zeros_like(mask)
    cv2.drawContours(filled,[contour],-1,255,-1)
    smooth=cv2.GaussianBlur(filled,(0,0),sigma)
    final=np.uint8(smooth>127)*255
    contour=max(cv2.findContours(final,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)[0],key=cv2.contourArea)
    pts=cv2.approxPolyDP(contour,2.0,True).reshape(-1,2).astype(float)
    if crop is not None:pts+=np.array([x0,y0])
    return pts

# Align the photo's slightly slanted upper/lower edges to the intentional rectangle.
def rectify(pts):
    pts=pts.copy()
    x=pts[:,0];y=pts[:,1]
    top=np.interp(x,[0,300,970,1360,1600],[169,169,189,195,195])
    bottom=np.interp(x,[0,250,1020,1480,1600],[970,970,953,951,951])
    pts[:,1]=180+(y-top)*(770/(bottom-top))
    return pts

def svg_path(pts):
    out=[f'M {pts[0,0]:.1f} {pts[0,1]:.1f}']
    out += [f'L {x:.1f} {y:.1f}' for x,y in pts[1:]]
    out.append('Z')
    return ' '.join(out)

main=rectify(silhouette(REF_MAIN,95,9,3))
# The separate P stem sits optically between the upper bar and lower diagonal.
stem=rectify(silhouette(REF_STEM,90,5,2,(60,200,160,680))+np.array([13,30]))
print('points',len(main),len(stem),'main bounds',main.min(axis=0),main.max(axis=0),'stem bounds',stem.min(axis=0),stem.max(axis=0))
for name,with_stem in [('without-stem',False),('with-stem',True)]:
    paths=f'<path d="{svg_path(main)}"/>'
    if with_stem:paths+=f'\n  <path d="{svg_path(stem)}"/>'
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" fill="#39291F">
  <title>PM Beauty monogram — {name.replace('-', ' ')}</title>
  {paths}
</svg>\n'''
    target=HERE/('pm-monogram-'+name+'.svg')
    if target.exists():raise FileExistsError(target)
    target.write_text(svg)
    im=Image.new('RGB',(1600,1000),'#F6EDEA')
    draw=ImageDraw.Draw(im)
    draw.polygon([tuple(p) for p in main],fill='#39291F')
    if with_stem:draw.polygon([tuple(p) for p in stem],fill='#39291F')
    target=HERE/('preview-'+name+'.png')
    if target.exists():raise FileExistsError(target)
    im.save(target)
