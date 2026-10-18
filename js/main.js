// PM Beauty — Logo-Intro, sanfte Einblend-Animation, Akkordeon
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Logo: beim Öffnen groß und mittig, beim Scrollen gerade nach oben in den Nav-Platz.
  // Ein einziges Element, nur translateY + scale, horizontal bleibt es immer zentriert.
  (function initBrand() {
    var root = document.documentElement;
    var brand = document.querySelector('.brand');
    var slot = document.querySelector('.brand-slot');
    var header = document.querySelector('.site-header');
    var intro = document.querySelector('.intro');
    if (!brand || !slot || !header || !intro) return;

    // Scharf bleiben: Das Logo wird in voller Intro-Breite gerendert und beim Scrollen
    // nur verkleinert (nie hochskaliert). Angedockt bekommt es seine echte Nav-Breite ohne scale().
    var slotW = 1, bigW = 1, y0 = 0, y1 = 0, range = 1, ticking = false, docked = null;

    function measure() {
      var r = slot.getBoundingClientRect();
      var vw = window.innerWidth, vh = window.innerHeight;
      slotW = r.width;
      bigW = Math.max(slotW, Math.min(vw * 0.84, 820));
      y1 = r.top;
      y0 = vh / 2 - (r.height * bigW / slotW) / 2;
      range = Math.max(1, intro.offsetHeight - header.offsetHeight);
      docked = null;
    }

    function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

    function update() {
      ticking = false;
      var p = clamp(window.scrollY / range);
      var y = y0 + (y1 - y0) * p;
      var isDocked = p >= 1;
      if (isDocked !== docked) {
        brand.style.width = (isDocked ? slotW : bigW) + 'px';
        docked = isDocked;
      }
      // Breite in px: von bigW linear auf slotW
      var s = isDocked ? 1 : (bigW + (slotW - bigW) * p) / bigW;
      brand.style.transform = 'translate3d(-50%,' + y.toFixed(2) + 'px,0) scale(' + s.toFixed(4) + ')';
      root.style.setProperty('--dock', p.toFixed(3));
      root.style.setProperty('--nav-o', clamp((p - 0.55) / 0.45).toFixed(3));
      header.classList.toggle('is-intro', p < 0.98);
    }

    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { measure(); update(); });
    window.addEventListener('load', function () { measure(); update(); });
  })();

  // Immer nur ein Akkordeon offen halten
  var groups = document.querySelectorAll('.accordion details');
  groups.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        groups.forEach(function (other) { if (other !== d) other.open = false; });
      }
    });
  });

  // Einblenden beim Scrollen
  var items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
