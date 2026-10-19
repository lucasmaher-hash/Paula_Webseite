# Logo-Prompt mit Bewertungskriterien: PM Beauty

Stand 19.10.2026. Teil der Aufgabe vom 12.10.2026 („ein guter Prompt für das eigene Logo, inkl. Bewertungskriterien“).

> **Ehrliche Einordnung:** Das finale Logo ist nicht aus diesem Prompt entstanden. Es entstand aus Lucas' Handskizze, aus Vektorkonstruktionen mit Codex und Claude Code (Python, fontTools) und schließlich aus Handarbeit in Figma (Knoten `1:32`, Website-Fassung `16:15`). Den Prompt haben wir nachträglich formuliert. Er fasst zusammen, was wir in rund einem Dutzend Entwurfsrunden gelernt haben, und taugt für zwei Zwecke: neue Varianten erzeugen (z. B. für das dynamische Logo) und das bestehende Logo an klaren Maßstäben prüfen.

## Der Prompt

Gedacht für ein Sprachmodell, das SVG-Code schreibt (Claude, GPT). Für ein Bildmodell den Block „Ausgabe“ durch „Vektorgrafik, schwarz auf Weiß, keine Schatten“ ersetzen.

```text
Du bist Schriftgestalterin und entwirfst eine Wortmarke für PM Beauty, ein kleines
Beauty- und Permanent-Make-up-Studio in München (Paula Maher, Fürstenrieder Straße 11).
Leitsatz des Studios: „Präzision, Ästhetik und Qualität stehen bei mir an erster Stelle.“
Charakter: eine Goldschmiedin mit Lupe. Konzentriert, ruhig, warm, nie laut.

Aufgabe: Wortmarke „PM BEAUTY“ in Versalien.

Pflicht:
1. Schlanke, kontrastreiche Antiqua mit feinen Haarstrichen (Richtung Italiana,
   Didone-Anmutung), keine Script-Schrift.
2. Das E ist das einzige gezeichnete Zeichen: ein um 90° gedrehtes E, das nach oben
   offen ist. Zwei senkrechte Stämme ragen deutlich über die Versalhöhe hinaus, ein
   kurzer, feiner Mittelstrich steht zwischen ihnen, unten verbindet ein geschwungener
   Fuß die Stämme wie der Fuß eines Kelchs.
3. Der Mittelstrich des E liegt exakt auf der senkrechten Mittelachse der gesamten
   Wortmarke. Gleiche die ungleich breiten Hälften („PM B“ gegen „AUTY“) über die
   Abstände aus, nicht durch Verzerren der Buchstaben.
4. Einfarbig. Die Marke muss in einem Farbton auf hellem und auf dunklem Grund
   funktionieren.
5. Die Marke muss bei 96 px Breite im Website-Header noch lesbar sein und das E dort
   noch als E erkennbar.

Verboten: Rosé-Gold, Glitzer, Folieneffekte, Lippen-, Wimpern- oder Blüten-Icons,
Monogramm-Kreise, Schatten, Verläufe.

Ausgabe: drei Varianten als reines SVG (nur <path> und <rect>, fill="currentColor",
keine Schriftdatei nötig). Danach für jede Variante eine Tabelle mit den
Bewertungskriterien unten: Messwert, erfüllt ja/nein, ein Satz Begründung.
Nenne zum Schluss die Variante, die du selbst nehmen würdest, und ihren größten Schwachpunkt.
```

## Bewertungskriterien

| Nr. | Kriterium | Prüfmethode | Ziel |
|---|---|---|---|
| K1 | **Mitte** | Achse des E-Mittelstrichs gegen die Mitte der Tinte, im Browser per `getBBox` gemessen | Abweichung unter 0,1 % der Breite |
| K2 | **Lesbarkeit klein** | Strichstärken bei 96 px Logobreite umrechnen, Screenshot am Handy | jeder Strich mindestens 0,5 px, E als Buchstabe erkennbar |
| K3 | **Wortbild** | Wortabstand PM\|B im Verhältnis zur Versalhöhe | höchstens 0,5 × Versalhöhe, damit „PM BEAUTY“ als eine Marke gelesen wird |
| K4 | **Gleichmaß** | Buchstabenabstände in „BEAUTY“ messen | Streuung höchstens ±1,5 Einheiten um den Mittelwert |
| K5 | **Eigenständigkeit** | Vergleich mit dem KI-Marktcheck im Markenprofil (Script, Rosé-Gold, Stockfotos) | keine der dort genannten Konventionen |
| K6 | **Charakter** | Drei Personen ohne Vorwissen nennen je drei Adjektive | mindestens zwei aus: präzise, ruhig, elegant, warm, hochwertig |
| K7 | **Reduktion** | Einfarbig auf hellem und dunklem Grund ansehen | funktioniert ohne Zusatzfarbe |
| K8 | **Technik** | SVG-Code ansehen | nur Pfade, `currentColor`, keine Schriftabhängigkeit |
| K9 | **Systemfähigkeit** | Steht das E allein als Zeichen (Favicon, Muster, Animation)? | E trägt das Gestaltungsprinzip „Die Mitte“ |

## Bewertung des finalen Logos

Gemessen an `branding/assets/logo-final/pm-beauty-logo-duenn-kurz.svg` (Website-Fassung), 19.10.2026. Versalhöhe 34,7 Einheiten, Breite 273,33.

| Nr. | Ergebnis | Status |
|---|---|---|
| K1 Mitte | E-Mitte 136,665 = Tintenmitte 136,665, Abweichung unter 0,001 | erfüllt (gemessen) |
| K2 Lesbarkeit klein | Bei 96 px Breite (Handy-Header) sind die E-Stämme 0,86 px breit, der Mittelstrich nur **0,20 px**, am Desktop (112 px) 0,23 px. Das prägende Detail verschwindet im Header praktisch. | **nicht erfüllt** (gerechnet, am Gerät nicht geprüft) |
| K3 Wortbild | Wortabstand PM\|B 27,3 Einheiten = **0,79 × Versalhöhe**, 5,3 × der mittlere Buchstabenabstand. Preis der exakten Mitte: „AUTY“ ist breiter als „PM B“. | **nicht erfüllt**, bewusster Zielkonflikt mit K1 |
| K4 Gleichmaß | B\|E 5,10 · E\|A 5,10 · A\|U 5,58 · U\|T 4,84 · T\|Y 3,61, Mittelwert 4,85, T\|Y liegt 1,24 darunter | erfüllt (gemessen) |
| K5 Eigenständigkeit | Keine Script-Schrift, kein Rosé-Gold, kein Icon | erfüllt |
| K6 Charakter | Kein Test mit fremden Personen gemacht | offen |
| K7 Reduktion | Einfarbig über `currentColor`, auf Braun, Pink und hellem Grund im Einsatz | erfüllt |
| K8 Technik | Ein Pfad und vier Rechtecke, keine Schriftdatei | erfüllt (gemessen) |
| K9 Systemfähigkeit | Das E trägt das Prinzip „Die Mitte“ im Styleguide. Als Favicon ist es noch nicht eingesetzt. | teilweise |

**Urteil:** Das Logo erfüllt die Kriterien, die Präzision messen (K1, K4, K8). Schwach ist es dort, wo es klein und als Wort wirken muss (K2, K3). Die naheliegende Lösung ist eine eigene **Kleinfassung** für den Header: Mittelstrich etwa 2,5-mal so breit und der Wortabstand etwas enger, auch wenn das E dann optisch statt rechnerisch mittig steht. Die Entscheidung liegt bei Lucas.

**Umsetzung (19.10.2026):** Lucas hat Kleinfassung C gewählt (`branding/assets/logo-small/`). Sie steht jetzt im Header, im mobilen Menü und im Footer der Website. K2 ist damit erfüllt (Mittelstrich 0,63 px statt 0,20 px bei 96 px), K3 verbessert (0,62 statt 0,79 × Versalhöhe), K1 bleibt exakt.
