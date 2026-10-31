// Maniküre-Panel im Styleguide: gleiche Struktur, Klassen und 3D-Renderer wie der Behandlungsbereich auf /1/.
(function () {
  'use strict';
  var mount = document.getElementById('sgNails');
  if (!mount) return;
  var items = [
    ['Neumodellage Gel (ohne Design)', 'Komplett neue Gel-Nägel — Form, Länge und Finish nach Wunsch.'],
    ['Neumodellage Gel Überlänge (ohne Design)', 'Neumodellage für extra lange Nägel.'],
    ['Shellack (inkl. russischer Maniküre)', 'Langanhaltender Farblack auf dem Naturnagel, inklusive gründlicher Nagelpflege.'],
    ['Shellack mit French (inkl. russischer Maniküre)', 'Shellack mit klassischer weißer French-Spitze.'],
    ['Russische Maniküre inkl. Klarlack', 'Besonders präzise Nagelhautentfernung mit dem Fräser für ein extra sauberes Ergebnis.'],
    ['Auffüllen Gel (ohne Design)', 'Herausgewachsene Gel-Nägel auffüllen — keine Fremdarbeit.'],
    ['Auffüllen Gel Überlänge (ohne Design)', 'Auffüllen bei Überlänge — keine Fremdarbeit.'],
    ['French / Babyboomer', 'French-Spitze oder sanfter Babyboomer-Verlauf als Zusatz.'],
    ['Farbe', 'Farbgel als Zusatz zur Modellage.'],
    ['Einfaches Design', 'Dezente Akzente — z. B. feine Linien oder einzelne Steinchen.'],
    ['Mittelaufwendiges Design', 'Mehr Details auf mehreren Nägeln.'],
    ['Aufwendiges Design', 'Detailreiche Nail-Art auf allen Nägeln.'],
    ['Extrem aufwändiges Design', 'Aufwendige Handmalerei und 3D-Elemente — kleine Kunstwerke.'],
    ['Nägel entfernen', 'Schonendes Entfernen der Modellage.']
  ];
  function node(tag, className, text) { var el = document.createElement(tag); if (className) el.className = className; if (text) el.textContent = text; return el; }
  function lookFor(name) {
    var n = name.toLowerCase();
    return /french|babyboomer/.test(n) ? 'french' : /farbe|shellack/.test(n) ? 'colour' : /design/.test(n) && !n.includes('ohne design') ? 'ornament' : 'basic';
  }
  var row = node('article', 'service-block theme-pink'); row.dataset.kind = 'nails';
  var copy = node('div', 'service-copy');
  var book = node('a', 'btn btn-primary btn-sm service-book', 'Buchen'); book.href = 'https://beautinda.de/book/hebb68m5vleBjoPRrOEG3Bi5mP43/orders'; book.target = '_blank'; book.rel = 'noopener'; book.setAttribute('aria-label', 'Termin buchen: Maniküre');
  var head = node('div', 'service-head'); head.append(node('h3', 'service-title', 'Form, Farbe und Finish.'), book);
  copy.append(node('span', 'eyebrow', 'Maniküre'), head);
  var list = node('div', 'service-tabs'); list.setAttribute('role', 'tablist'); list.setAttribute('aria-label', 'Maniküre auswählen'); list.setAttribute('aria-orientation', 'vertical');
  var description = node('div', 'service-description'); description.id = 'sg-nail-description'; description.setAttribute('role', 'tabpanel');
  var name = node('h4', 'service-selected-name'), paragraph = node('p', 'muted'); description.append(name, paragraph);
  var stage = node('div', 'service-stage');
  var object = node('div', 'service-object'); object.dataset.kind = 'nails'; object.dataset.look = 'basic'; object.dataset.variant = 'default'; object.setAttribute('role', 'img');
  stage.append(object, description);
  function select(i) {
    Array.from(list.children).forEach(function (b, j) { b.setAttribute('aria-selected', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
    name.textContent = items[i][0]; paragraph.textContent = items[i][1];
    description.setAttribute('aria-labelledby', 'sg-nail-' + i);
    object.dataset.look = object.dataset.variant = lookFor(items[i][0]);
    object.setAttribute('aria-label', 'Abstrakte 3D-Visualisierung: ' + items[i][0]);
  }
  items.forEach(function (item, i) {
    var b = node('button', 'service-option', item[0]); b.type = 'button'; b.id = 'sg-nail-' + i; b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', description.id);
    b.addEventListener('click', function () { select(i); });
    b.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse' && (e.movementX || e.movementY)) select(i); });
    b.addEventListener('focus', function () { select(i); });
    b.addEventListener('keydown', function (e) {
      var next = i;
      if (e.key === 'ArrowDown') next = (i + 1) % items.length; else if (e.key === 'ArrowUp') next = (i - 1 + items.length) % items.length;
      else if (e.key === 'Home') next = 0; else if (e.key === 'End') next = items.length - 1; else return;
      e.preventDefault(); list.children[next].focus();
    });
    list.append(b);
  });
  copy.append(list); row.append(copy, stage); mount.append(row); select(0);
  var renderer = document.createElement('script'); renderer.src = 'js/service-panels-3d.js?v=5'; renderer.defer = true; document.body.append(renderer);
})();
