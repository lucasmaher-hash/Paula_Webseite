// Regler für die Behandlungs-Frames (Text-Frame und Nagel-Frame). Nur mit ?regler=1 sichtbar.
(function () {
  'use strict';
  if (new URLSearchParams(location.search).get('regler') !== '1') return;
  var key = 'pm-beauty:service-tuner:v1', root = document.documentElement;
  // [Variable, Beschriftung, Min, Max, Schritt, Einheit, Startwert Desktop]
  var groups = [
    ['Text-Frame', [
      ['--sp-pad', 'Innenabstand', 8, 80, 1, 'px', 36],
      ['--sp-radius', 'Eckenradius', 0, 80, 1, 'px', 32],
      ['--sp-title-size', 'Überschrift', 18, 64, 1, 'px', 40],
      ['--sp-tabs-h', 'Listenhöhe', 120, 600, 5, 'px', 290]
    ]],
    ['Spalten (nur Desktop)', [
      ['--sp-copy', 'Text-Frame', 10, 100, 1, '', 54],
      ['--sp-stage', 'Objekt-Frame', 10, 100, 1, '', 28],
      ['--sp-side', 'Leerraum außen', 0, 100, 1, '', 18],
      ['--sp-gap', 'Abstand Frames', 0, 80, 1, 'px', 10],
      ['--sp-block-gap', 'Abstand Zeilen', 0, 160, 2, 'px', 64]
    ]],
    ['Nagel-Frame', [
      ['--sp-stage-h', 'Frame-Höhe', 200, 900, 5, 'px', 540],
      ['--sp-nail-h', 'Nagel-Höhe', 200, 900, 5, 'px', 410],
      ['--sp-nail-w', 'Nagel-Breite', 120, 700, 5, 'px', 700],
      ['--sp-desc-top', 'Text oben', 0, 40, 1, '%', 15],
      ['--sp-desc-side', 'Text seitlich', 0, 40, 1, '%', 10],
      ['--sp-desc-bottom', 'Text unten', 0, 40, 1, '%', 18],
      ['--sp-desc-title', 'Text-Titel', 14, 48, 1, 'px', 29],
      ['--sp-desc-text', 'Text-Größe', 11, 28, 1, 'px', 15]
    ]],
    ['Andere Objekte', [
      ['--sp-obj-h', 'Höhe Wimpern/Haut', 200, 800, 5, 'px', 470],
      ['--sp-eyes-h', 'Höhe Wimpern', 150, 700, 5, 'px', 320]
    ]]
  ];
  var values = {};
  try { values = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) {}
  function apply(name, spec) {
    var v = values[name];
    if (v === undefined) { root.style.removeProperty(name); return; }
    root.style.setProperty(name, v + spec[5]);
  }
  var specs = {};
  groups.forEach(function (g) { g[1].forEach(function (s) { specs[s[0]] = s; apply(s[0], s); }); });
  var css = document.createElement('style');
  css.textContent = '#sp-tuner{position:fixed;left:12px;bottom:12px;z-index:200;width:min(300px,calc(100vw - 24px));max-height:calc(100vh - 24px);overflow:auto;background:#fffaf8;color:#4a2f35;border:1px solid #d0b3b8;border-radius:16px;padding:12px;font:12px/1.4 system-ui,sans-serif;box-shadow:0 12px 40px #0003}' +
    '#sp-tuner h2{font:600 13px system-ui;margin:0 0 8px;display:flex;justify-content:space-between;align-items:center}#sp-tuner fieldset{border:0;border-top:1px solid #e5d0d3;margin:8px 0 0;padding:6px 0 0}' +
    '#sp-tuner legend{font-weight:600;padding-right:6px}#sp-tuner label{display:grid;grid-template-columns:96px 1fr 44px;gap:6px;align-items:center;margin:3px 0}#sp-tuner output{text-align:right;font-variant-numeric:tabular-nums}' +
    '#sp-tuner button{font:inherit;border:1px solid #d0b3b8;background:#fff;border-radius:999px;padding:3px 10px;cursor:pointer}#sp-tuner pre{white-space:pre-wrap;background:#f6ebed;border-radius:8px;padding:8px;margin:8px 0 0;font:11px/1.4 ui-monospace,monospace;user-select:all}#sp-tuner.is-closed .sp-body{display:none}';
  document.head.append(css);
  var panel = document.createElement('aside'); panel.id = 'sp-tuner'; panel.setAttribute('aria-label', 'Behandlungs-Frames einstellen');
  panel.innerHTML = '<h2>Frames einstellen <button type="button" id="sp-toggle" aria-expanded="true">–</button></h2><div class="sp-body"></div>';
  var body = panel.querySelector('.sp-body');
  var out = document.createElement('pre'); out.setAttribute('aria-label', 'Aktuelle Werte');
  function current(name) { var s = specs[name]; return values[name] !== undefined ? values[name] : s[6]; }
  function report() {
    var lines = Object.keys(values).map(function (n) { return n + ':' + values[n] + specs[n][5] + ';'; });
    out.textContent = lines.length ? ':root{' + lines.join(' ') + '}' : 'Alles auf Standard.';
  }
  groups.forEach(function (g) {
    var fs = document.createElement('fieldset'), lg = document.createElement('legend'); lg.textContent = g[0]; fs.append(lg);
    g[1].forEach(function (s) {
      var label = document.createElement('label'), input = document.createElement('input'), o = document.createElement('output');
      input.type = 'range'; input.min = s[2]; input.max = s[3]; input.step = s[4]; input.value = current(s[0]);
      o.textContent = input.value + s[5];
      input.addEventListener('input', function () {
        values[s[0]] = +input.value; o.textContent = input.value + s[5]; apply(s[0], s); report();
        try { localStorage.setItem(key, JSON.stringify(values)); } catch (e) {}
        window.dispatchEvent(new Event('resize'));
      });
      label.append(document.createTextNode(s[1]), input, o); fs.append(label); s.input = input; s.output = o;
    });
    body.append(fs);
  });
  var reset = document.createElement('button'); reset.type = 'button'; reset.textContent = 'Zurücksetzen';
  reset.addEventListener('click', function () {
    values = {}; try { localStorage.removeItem(key); } catch (e) {}
    Object.keys(specs).forEach(function (n) { var s = specs[n]; apply(n, s); s.input.value = s[6]; s.output.textContent = s[6] + s[5]; });
    report(); window.dispatchEvent(new Event('resize'));
  });
  body.append(reset, out); report();
  panel.querySelector('#sp-toggle').addEventListener('click', function (e) {
    var closed = panel.classList.toggle('is-closed'); e.currentTarget.textContent = closed ? '+' : '–'; e.currentTarget.setAttribute('aria-expanded', String(!closed));
  });
  document.body.append(panel);
})();
