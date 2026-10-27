from pathlib import Path
import json
from math import hypot

# Hand-aligned writing-mask centerline. Third value is the nominal mask width.
P=[(102,68,100),(73,112,100),(75,148,90),(105,185,75),(250,191,65),(480,192,70),(530,205,100),(582,260,115),(560,320,105),(470,430,115),(330,570,115),(195,700,115),(130,790,105),(125,870,95),(165,920,95),(245,925,105),(335,875,125),(500,705,130),(680,505,130),(845,320,130),(950,220,125),(980,215,120),(1010,250,100),(1012,500,80),(1008,850,90),(1015,905,110),(1050,855,115),(1160,610,125),(1290,360,125),(1350,220,120),(1375,240,100),(1390,400,80),(1395,840,80),(1410,900,90),(1460,920,100),(1550,885,100)]
I=[(115,275,66),(115,650,66)]

pts=[]
for a,b in zip(P,P[1:]):
    n=max(1,round(hypot(b[0]-a[0],b[1]-a[1])/8))
    for j in range(n):
        pts.append([round(a[k]+(b[k]-a[k])*j/n) for k in range(3)])
pts.append(list(P[-1]))
data={"main":pts,"i":[list(p) for p in I],"cuts":[136,639,1486,2598,3299,4095]}
target=Path(__file__).with_name("animation-centerline.json")
if target.exists(): raise FileExistsError(target)
target.write_text(json.dumps(data,separators=(",",":"))+"\n")
