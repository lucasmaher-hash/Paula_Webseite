#!/bin/zsh
# Rendert die drei Höhenvarianten des PM-BEAUTY-Logos (gedrehtes E).
# Voraussetzung: python3 mit fonttools (pip install fonttools). Schrift: Cormorant Unicase, SIL OFL.
G=${0:a:h}; O=$G/..
PY=${PYTHON:-python3}
for h in 2.0 2.7 3.5; do
  H=$($PY -c "print($h*625)")
  $PY $G/logo.py $G/CormorantUnicase-Regular.ttf $O/pm-beauty-e$h-vorschau.svg "{\"H\": $H}"
  $PY $G/logo.py $G/CormorantUnicase-Regular.ttf $O/pm-beauty-e$h-weiss.svg "{\"H\": $H, \"bg\": \"\", \"pad\": 20, \"scale\": 0.1}"
  $PY $G/logo.py $G/CormorantUnicase-Regular.ttf $O/pm-beauty-e$h-schwarz.svg "{\"H\": $H, \"bg\": \"\", \"fg\": \"#1A1A1A\", \"pad\": 20, \"scale\": 0.1}"
done

# Feinschliff 2.7× (18.10.2026): E-Striche 40/48, Laufweite 200, Ausgleich links/rechts A=70, B=90, C=110
R='"H": 1687.5, "track": 200, "hair": 40, "stem": 48, "foot": 22, "foot_x": 86'
for opt in A:70 B:90 C:110; do
  t=${opt%%:*}; d=${opt##*:}
  $PY $G/logo.py $G/CormorantUnicase-Regular.ttf $O/pm-beauty-2.7-$t-vorschau.svg "{$R, \"delta\": $d}"
  $PY $G/logo.py $G/CormorantUnicase-Regular.ttf $O/pm-beauty-2.7-$t-weiss.svg "{$R, \"delta\": $d, \"bg\": \"\", \"pad\": 20, \"scale\": 0.1}"
  $PY $G/logo.py $G/CormorantUnicase-Regular.ttf $O/pm-beauty-2.7-$t-schwarz.svg "{$R, \"delta\": $d, \"bg\": \"\", \"fg\": \"#1A1A1A\", \"pad\": 20, \"scale\": 0.1}"
done
