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

  // Akkordeon: immer nur eins offen; Links mit data-open öffnen die passende Kategorie
  var groups = document.querySelectorAll('.accordion details');
  groups.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) groups.forEach(function (other) { if (other !== d) other.open = false; });
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
