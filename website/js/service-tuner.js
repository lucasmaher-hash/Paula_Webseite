// Frames mit der Maus ziehen (Text-Frame und Nagel-/Objekt-Frame). Nur lokal oder mit ?regler=1.
(function () {
  'use strict';
  var local = /^(localhost|127\.0\.0\.1|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(location.hostname);
  if (!local && new URLSearchParams(location.search).get('regler') !== '1') return;
  var key = 'pm-beauty:service-drag:v1', root = document.documentElement;
  var values = {};
  try { values = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) {}
  function save() { try { localStorage.setItem(key, JSON.stringify(values)); } catch (e) {} report(); }
  function set(name, px) { values[name] = Math.round(px); root.style.setProperty(name, values[name] + 'px'); }
  Object.keys(values).forEach(function (n) { root.style.setProperty(n, values[n] + 'px'); });
  if (values['--sp-row-h']) root.classList.add('sp-sized');

  var bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:200;display:flex;gap:6px;align-items:center;background:#fffaf8;border:1px solid #d0b3b8;border-radius:999px;padding:5px 6px 5px 12px;font:12px system-ui,sans-serif;color:#4a2f35;box-shadow:0 6px 20px #0002';
  var info = document.createElement('span'); info.textContent = 'Frames ziehen';
  function btn(label, fn) { var b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.style.cssText = 'font:inherit;border:1px solid #d0b3b8;background:#fff;border-radius:999px;padding:3px 10px;cursor:pointer'; b.addEventListener('click', fn); return b; }
  function css() { var l = Object.keys(values).map(function (n) { return n + ':' + values[n] + 'px;'; }); return l.length ? ':root{' + l.join(' ') + '}' : ''; }
  function report() { info.textContent = css() || 'Frames ziehen'; info.style.cssText = 'max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; }
  var copyBtn = btn('Kopieren', function () {
    var t = css(); if (!t) return;
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { copyBtn.textContent = 'Kopiert'; setTimeout(function () { copyBtn.textContent = 'Kopieren'; }, 1200); });
  });
  var resetBtn = btn('Zurücksetzen', function () {
    Object.keys(values).forEach(function (n) { root.style.removeProperty(n); });
    values = {}; root.classList.remove('sp-sized'); try { localStorage.removeItem(key); } catch (e) {} report();
  });
  bar.append(info, copyBtn, resetBtn); document.body.append(bar); report();

  var frames = [['.service-copy', 'copy'], ['.service-stage', 'stage']];
  var edges = ['l', 'r', 'b', 'bl', 'br'];
  function attach(el, kind) {
    if (el.querySelector(':scope > .sp-h')) return;
    edges.forEach(function (edge) {
      var h = document.createElement('div'); h.className = 'sp-h'; h.dataset.edge = edge; h.setAttribute('aria-hidden', 'true');
      h.addEventListener('pointerdown', function (ev) { start(ev, el, kind, edge, h); });
      el.append(h);
    });
  }
  function start(ev, el, kind, edge, h) {
    ev.preventDefault(); h.setPointerCapture(ev.pointerId); h.classList.add('is-drag');
    var box = el.getBoundingClientRect(), x0 = ev.clientX, y0 = ev.clientY;
    var wide = matchMedia('(min-width:800px)').matches;
    var block = el.closest('.service-block'), even = block && Array.from(block.parentNode.children).indexOf(block) % 2 === 1;
    // Rechts anchored: linke Kante zieht nach links = breiter. In geraden Zeilen steht der Text-Frame rechts.
    var growsLeft = edge.indexOf('l') === 0 && (edge === 'l' || edge === 'bl');
    function move(e) {
      var dx = e.clientX - x0, dy = e.clientY - y0;
      if (wide && edge !== 'b') {
        var w = box.width + (growsLeft ? -dx : dx);
        // Der Frame direkt neben der Spalte gibt Platz ab; die äußere Restspalte nimmt den Rest.
        set(kind === 'copy' ? '--sp-copy-w' : '--sp-stage-w', Math.max(160, w));
      }
      if (edge === 'b' || edge === 'bl' || edge === 'br') {
        var hh = Math.max(120, box.height + dy);
        set('--sp-row-h', Math.max(360, hh)); root.classList.add('sp-sized');
      }
      window.dispatchEvent(new Event('resize'));
    }
    function end() { h.classList.remove('is-drag'); h.removeEventListener('pointermove', move); h.removeEventListener('pointerup', end); h.removeEventListener('pointercancel', end); save(); }
    h.addEventListener('pointermove', move); h.addEventListener('pointerup', end); h.addEventListener('pointercancel', end);
  }
  function scan() { frames.forEach(function (f) { document.querySelectorAll(f[0]).forEach(function (el) { attach(el, f[1]); }); }); }
  scan(); new MutationObserver(scan).observe(document.body, {childList: true, subtree: true});
})();
