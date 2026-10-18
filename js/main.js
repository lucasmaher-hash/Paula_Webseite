// PM Beauty — mobiles Menü, Dropdown, Akkordeon, sanftes Einblenden
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Schulungen: mobil aufklappbar, am Desktop immer vollständig sichtbar.
  var courseDesktop = window.matchMedia('(min-width: 900px)');
  document.querySelectorAll('.course').forEach(function (course) {
    var toggle = course.querySelector('.course-toggle');
    var expanded = false;
    function updateCourse() {
      var open = courseDesktop.matches || expanded;
      course.classList.toggle('is-collapsed', !open);
      toggle.hidden = courseDesktop.matches;
      toggle.setAttribute('aria-expanded', String(open));
    }
    toggle.addEventListener('click', function () {
      expanded = !expanded;
      updateCourse();
    });
    courseDesktop.addEventListener('change', updateCourse);
    updateCourse();
  });

  // Header weiß, ob er noch über dem Hero liegt (Handy: dann gleichmäßig transparent)
  var hero = document.querySelector('.hero-media');
  var siteHeader = document.querySelector('.site-header');
  if (hero && siteHeader && 'IntersectionObserver' in window) {
    var heroIO = new IntersectionObserver(function (entries) {
      siteHeader.classList.toggle('over-hero', entries[0].isIntersecting);
    }, { rootMargin: '-' + siteHeader.offsetHeight + 'px 0px 0px 0px' });
    heroIO.observe(hero);
  }

  // Mobiles Menü (Vollbild)
  var menu = document.getElementById('mobile-menu');
  var menuBtn = document.querySelector('.menu-btn');
  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) { var first = menu.querySelector('.mobile-menu-list a, .mm-toggle'); if (first) first.focus(); }
    else menuBtn.focus({ preventScroll: true });
  }
  if (menu && menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { setMenu(false); });
    });
    menu.querySelectorAll('.mm-toggle').forEach(function (t) {
      t.addEventListener('click', function () {
        var sub = document.getElementById(t.getAttribute('aria-controls'));
        var open = t.getAttribute('aria-expanded') !== 'true';
        t.setAttribute('aria-expanded', String(open));
        if (sub) sub.hidden = !open;
      });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches && !menu.hidden) setMenu(false); });
  }

  // Desktop-Dropdown „Behandlungen“: Hover per CSS, Klick/Tastatur per Klasse
  document.querySelectorAll('.nav-dd').forEach(function (dd) {
    var btn = dd.querySelector('.nav-dd-btn');
    btn.addEventListener('click', function () {
      var open = !dd.classList.contains('open');
      dd.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target)) { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
    dd.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
  });

  // Akkordeon: immer nur eins offen; Links mit data-open öffnen die passende Kategorie.
  // Per Klick geöffnete Kategorie: Schließt sich dabei eine andere, bleibt der angeklickte Titel
  // zuerst genau an seiner Stelle (sonst springt er aus dem Bild). Danach gleitet die Seite langsam
  // in die Mitte des sichtbaren Bereichs; ist die Kategorie höher, steht ihr Anfang oben unter der Leiste.
  var groups = document.querySelectorAll('.accordion details');
  var headerEl = document.querySelector('.site-header');
  // Gleiten ohne Scroll-Animation per JS (die stottert, v. a. in Safari): sofort an die Zielposition
  // springen und <main> per GPU-Transform von der alten Lage nachgleiten lassen (FLIP).
  var mainEl = document.querySelector('main');
  var glideTimer = null;
  var GLIDE_MS = 900;
  function endGlide() {
    if (!mainEl) return;
    clearTimeout(glideTimer); glideTimer = null;
    mainEl.style.transition = ''; mainEl.style.transform = ''; mainEl.style.willChange = '';
  }
  ['wheel', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, function () { if (glideTimer) endGlide(); }, { passive: true });
  });
  function glideTo(top) {
    var from = window.scrollY, dist = top - from;
    if (reduced || !mainEl || Math.abs(dist) < 2) { window.scrollTo({ top: top, behavior: 'instant' }); return; }
    endGlide();
    mainEl.style.willChange = 'transform';
    window.scrollTo({ top: top, behavior: 'instant' });
    mainEl.style.transform = 'translate3d(0,' + dist + 'px,0)';   // sieht aus wie vorher
    mainEl.getBoundingClientRect();                                 // Startlage festschreiben
    mainEl.style.transition = 'transform ' + GLIDE_MS + 'ms cubic-bezier(.65,0,.35,1)';
    mainEl.style.transform = 'translate3d(0,0,0)';
    glideTimer = setTimeout(endGlide, GLIDE_MS + 50);
  }
  function targetFor(d) {
    var hh = headerEl ? headerEl.offsetHeight : 0;
    var r = d.getBoundingClientRect();
    var avail = window.innerHeight - hh, gap = 16;
    var offset = r.height <= avail - 2 * gap ? hh + (avail - r.height) / 2 : hh + gap;
    var maxTop = document.documentElement.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(maxTop, window.scrollY + r.top - offset));
  }
  groups.forEach(function (d) {
    var summary = d.querySelector('summary');
    summary.addEventListener('click', function () { endGlide(); d._clickTop = summary.getBoundingClientRect().top; });
    d.addEventListener('toggle', function () {
      if (!d.open) { d._clickTop = null; return; }
      groups.forEach(function (other) { if (other !== d) other.open = false; });
      if (d._clickTop == null) return;
      endGlide();                       // laufende Bewegung beenden, sonst misst getBoundingClientRect mit Transform
      var before = d._clickTop; d._clickTop = null;
      // Titel an seiner Stelle halten, falls sich darüber etwas geschlossen hat
      var shift = summary.getBoundingClientRect().top - before;
      if (Math.abs(shift) > 1) window.scrollTo({ top: window.scrollY + shift, behavior: 'instant' });
      glideTo(targetFor(d));
    });
  });
  function openFromHash(id) {
    var d = document.getElementById(id);
    if (d && d.tagName === 'DETAILS') d.open = true;
  }
  document.querySelectorAll('[data-open]').forEach(function (a) {
    a.addEventListener('click', function () { openFromHash(a.getAttribute('data-open')); });
  });
  if (location.hash) openFromHash(location.hash.slice(1));

  // Einblenden beim Scrollen
  var items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
