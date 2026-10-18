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
    var slotW = 1, bigW = 1, y0 = 0, y1 = 0, range = 1, docked = null;
    // Bewegung: Scrollfortschritt → Easing-Kurve (langsamer Start, weiche Landung)
    // plus leichte Nachführung, damit Mausrad-Rasten nicht ruckeln.
    var cur = null, running = false, last = 0;
    var FOLLOW = reduced ? 1 : 0.16;          // Anteil pro 60-fps-Frame
    function ease(t) { return -(Math.cos(Math.PI * t) - 1) / 2; }   // easeInOutSine: weich, reagiert aber sofort

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

    function render(q) {
      var e = ease(q);
      var y = y0 + (y1 - y0) * e;
      var isDocked = q >= 1;
      if (isDocked !== docked) {
        brand.style.width = (isDocked ? slotW : bigW) + 'px';
        docked = isDocked;
      }
      // Breite in px: von bigW auf slotW, gleiche Kurve wie die Position
      var s = isDocked ? 1 : (bigW + (slotW - bigW) * e) / bigW;
      brand.style.transform = 'translate3d(-50%,' + y.toFixed(2) + 'px,0) scale(' + s.toFixed(4) + ')';
      root.style.setProperty('--dock', e.toFixed(3));
      root.style.setProperty('--nav-o', clamp((e - 0.55) / 0.45).toFixed(3));
      root.style.setProperty('--line', clamp((e - 0.88) / 0.12).toFixed(3));
      header.classList.toggle('is-intro', q < 0.98);
    }

    function frame(now) {
      var target = clamp(window.scrollY / range);
      var dt = last ? Math.min(64, now - last) : 16.7;
      last = now;
      if (cur === null) cur = target;
      cur += (target - cur) * (1 - Math.pow(1 - FOLLOW, dt / 16.7));
      if (Math.abs(target - cur) < 0.0005) cur = target;
      render(cur);
      if (cur !== target) { window.requestAnimationFrame(frame); }
      else { running = false; last = 0; }
    }

    function kick() {
      if (!running) { running = true; window.requestAnimationFrame(frame); }
    }

    function snap() { measure(); cur = clamp(window.scrollY / range); render(cur); }

    snap();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', snap);
    window.addEventListener('load', snap);
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
