// PM Beauty — mobiles Menü, Dropdown, Akkordeon, sanftes Einblenden
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Schulungen: mobil aufklappbar (gleiche Animation wie die Kategorien), am Desktop immer vollständig sichtbar.
  var courseDesktop = window.matchMedia('(min-width: 900px)');
  document.querySelectorAll('.course').forEach(function (course) {
    var toggle = course.querySelector('.course-toggle');
    var content = course.querySelector('.course-content');
    var expanded = false, anim = null;
    function updateCourse() {
      var open = courseDesktop.matches || expanded;
      course.classList.toggle('is-collapsed', !open);
      toggle.hidden = courseDesktop.matches;
      toggle.setAttribute('aria-expanded', String(open));
    }
    function stopAnim() {
      if (anim) { anim.cancel(); anim = null; }
      content.style.overflow = '';
    }
    toggle.addEventListener('click', function () {
      var opening = toggle.getAttribute('aria-expanded') !== 'true';
      stopAnim();
      if (reduced || !content.animate) { expanded = opening; updateCourse(); return; }
      var closed = { height: '0px', paddingTop: '0px', paddingBottom: '0px', opacity: 0 };
      content.style.overflow = 'hidden';
      if (opening) {
        expanded = true; updateCourse();
        anim = content.animate([closed, { height: content.offsetHeight + 'px', opacity: 1 }],
          { duration: 500, easing: 'cubic-bezier(.4,0,.2,1)' });
        anim.onfinish = stopAnim;
      } else {
        toggle.setAttribute('aria-expanded', 'false');
        anim = content.animate([{ height: content.offsetHeight + 'px', opacity: 1 }, closed],
          { duration: 400, easing: 'cubic-bezier(.4,0,.2,1)' });
        anim.onfinish = function () { stopAnim(); expanded = false; updateCourse(); };
      }
    });
    // Mobil klappt auch ein Tipp auf den Kopf der Karte (Badges, Titel) auf, wie bei den Kategorien
    course.querySelector('.course-heading').addEventListener('click', function (e) {
      if (courseDesktop.matches || toggle.contains(e.target)) return;
      toggle.click();
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

  // Header accents follow the alternating background sections at the header's centre line.
  var pinkSections = document.querySelectorAll('[data-flow-theme="pink"]');
  if (siteHeader && pinkSections.length && 'IntersectionObserver' in window) {
    var pinkIO = null, overPink = new Set();
    var watchPink = function () {
      if (pinkIO) pinkIO.disconnect();
      overPink.clear();
      var mid = Math.round(siteHeader.offsetHeight / 2);
      pinkIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) overPink.add(e.target); else overPink.delete(e.target); });
        siteHeader.classList.toggle('over-pink', overPink.size > 0);
      }, { rootMargin: '-' + mid + 'px 0px -' + Math.max(0, window.innerHeight - mid - 1) + 'px 0px' });
      pinkSections.forEach(function (s) { pinkIO.observe(s); });
    };
    watchPink();
    window.addEventListener('resize', watchPink);
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

  // Desktop-Dropdown „Behandlungen“: Hover per CSS, Klick/Tastatur per Klasse.
  // Klick bei schon sichtbarer Liste (Maus-Hover oder zweiter Klick) springt zum Abschnitt.
  document.querySelectorAll('.nav-dd').forEach(function (dd) {
    var btn = dd.querySelector('.nav-dd-btn');
    var allLink = dd.querySelector('a[href="#behandlungen"]');
    var mouse = window.matchMedia('(hover:hover)');
    btn.addEventListener('click', function () {
      var shown = dd.classList.contains('open') || (mouse.matches && dd.matches(':hover'));
      if (shown && allLink) {
        dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.blur();
        allLink.click();
        return;
      }
      dd.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
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
  var OPEN_MS = 500, CLOSE_MS = 400, EASE = 'cubic-bezier(.4,0,.2,1)';
  function panelOf(d) { return d.querySelector('.service-panel'); }
  function closePanel(d, animate) {
    var panel = panelOf(d);
    if (d._anim) { d._anim.cancel(); d._anim = null; }
    if (!animate || reduced || !panel || !panel.animate) { d.classList.remove('closing'); d.open = false; return; }
    d.classList.add('closing');
    d._anim = panel.animate([{ height: panel.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
      { duration: CLOSE_MS, easing: EASE });
    d._anim.onfinish = function () { d._anim = null; d.classList.remove('closing'); d.open = false; };
  }
  function openPanel(d) {
    var summary = d.querySelector('summary');
    endGlide();
    var before = summary.getBoundingClientRect().top;
    groups.forEach(function (o) {
      if (o === d || !o.open) return;
      // liegt die offene Kategorie über der angeklickten, sofort schließen (sonst rutscht der Titel weg)
      var above = o.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_FOLLOWING;
      closePanel(o, !above);
    });
    if (d._anim) { d._anim.cancel(); d._anim = null; }
    d.classList.remove('closing');
    d._opening = true; d.open = true;
    // Titel an seiner Stelle halten, falls sich darüber etwas geschlossen hat
    var shift = summary.getBoundingClientRect().top - before;
    if (Math.abs(shift) > 1) window.scrollTo({ top: window.scrollY + shift, behavior: 'instant' });
    var target = targetFor(d);             // Layout ist hier schon im Endzustand
    var panel = panelOf(d);
    if (!reduced && panel && panel.animate) {
      d._anim = panel.animate([{ height: '0px', opacity: 0 }, { height: panel.offsetHeight + 'px', opacity: 1 }],
        { duration: OPEN_MS, easing: EASE });
      d._anim.onfinish = function () { d._anim = null; };
    }
    glideTo(target);
  }
  groups.forEach(function (d) {
    var summary = d.querySelector('summary');
    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (d.open && !d.classList.contains('closing')) closePanel(d, true); else openPanel(d);
    });
    // Öffnen über Links (Nav, Hash): ohne Animation, nur eins offen
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      if (d._opening) { d._opening = false; return; }
      groups.forEach(function (o) { if (o !== d) closePanel(o, false); });
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

  // Auszeichnungen: vorhandene Blattkonturen einzeln vom Stiel aus wachsen lassen.
  var awards = document.querySelector('.awards-grid');
  if (awards) {
    var laurel = document.getElementById('laurel'), ns = 'http://www.w3.org/2000/svg';
    if (laurel) awards.querySelectorAll('.laurel').forEach(function (svg) {
      svg.setAttribute('viewBox',laurel.getAttribute('viewBox'));
      svg.replaceChildren();
      Array.from(laurel.children).forEach(function (node) { svg.append(node.cloneNode(true)); });
      svg.querySelectorAll('g').forEach(function (branch) {
        var foliage = branch.querySelector('path'), stem = branch.querySelector('path[stroke]');
        // Beide Stiele beginnen unten mittig; die ursprüngliche Kontur bleibt erhalten.
        stem.setAttribute('d',stem.getAttribute('d').replace('M92.1 171.6','M100 173Q96 172 92.1 171.6'));
        stem.setAttribute('pathLength','1'); stem.classList.add('laurel-stem');
        var length = stem.getTotalLength(), points = [];
        for (var j = 0; j <= 200; j++) points.push(stem.getPointAtLength(length*j/200));
        var leaves = document.createDocumentFragment();
        (foliage.getAttribute('d').match(/M[^Z]+Z/gi) || []).forEach(function (d) {
          var root = d.match(/^M([\d.]+)\s+([\d.]+)/), x = Number(root[1]), y = Number(root[2]), nearest = 0, distance = Infinity;
          points.forEach(function (point,i) { var dist = (point.x-x)*(point.x-x)+(point.y-y)*(point.y-y); if (dist < distance) { distance = dist; nearest = i; } });
          var leaf = document.createElementNS(ns,'path'); leaf.setAttribute('d',d); leaf.classList.add('laurel-leaf');
          leaf.style.transformOrigin = x+'px '+y+'px';
          // 820 ms Stiel + 25 ms Vorsprung + 155 ms Blatt = insgesamt 1 Sekunde.
          leaf.style.setProperty('--leaf-delay',(nearest/200*.82+.025).toFixed(4)+'s');
          leaves.append(leaf);
        });
        foliage.replaceWith(leaves);
      });
      svg.lastElementChild.classList.add('laurel-star');
    });
    if (reduced || !('IntersectionObserver' in window)) awards.classList.add('grown');
    else {
      var awardsIO = new IntersectionObserver(function (entries) {
        if (entries[0].intersectionRatio < 1) return;
        awards.classList.add('grown');
        awardsIO.disconnect();
      }, { threshold: 1 });
      awardsIO.observe(awards);
    }
    awards.querySelectorAll('.award').forEach(function (award) {
      award.addEventListener('pointerenter', function (event) {
        if (event.pointerType === 'touch' || reduced || !awards.classList.contains('grown')) return;
        award.querySelector('.laurel').getAnimations({subtree:true}).forEach(function (animation) {
          animation.currentTime = 0;
          animation.play();
        });
      });
    });
  }

  // Gutscheine (Desktop): im Abschnitt driften die Karten senkrecht auseinander, beim Verlassen wieder zusammen
  var vouchers = document.querySelector('.vouchers-grid');
  if (vouchers) {
    if (reduced || !('IntersectionObserver' in window)) vouchers.classList.add('spread');
    else new IntersectionObserver(function (entries) {
      vouchers.classList.toggle('spread', entries[0].isIntersecting);
    }, { threshold: 0.4 }).observe(vouchers);
  }

  // Glow is painted in the panel background, never in an overlay above content.
  // Every glow panel within GLOW_R of the painted centre is lit at that point, also when the cursor sits
  // outside it or on a nested panel above it: approaching a panel darkens its edge gradually (Lucas, 19.10.2026).
  var glowMedia = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  // Review cards themselves stay flat; only the pink section behind them glows (Lucas, 19.10.2026).
  var glowSelector = '.about-panel, .services, .accordion details, .course-heading, .course-content, .voucher, .reviews, .contact-panel, .hours, .tile';
  var GLOW_R = 240;   // = radius of the radial-gradient in css/style.css (.panel-glow-active)
  // glowX/Y = cursor, curX/Y = painted centre, which eases after the cursor (GLOW_EASE of the gap per frame).
  var glowPanels = [], glowFrame = 0, glowX = 0, glowY = 0, curX = 0, curY = 0, glowOn = false, GLOW_EASE = 0.14;
  function unlight(panel) {
    panel.classList.remove('panel-glow-active');
    panel.style.removeProperty('--panel-glow-x');
    panel.style.removeProperty('--panel-glow-y');
  }
  function clearGlow() {
    cancelAnimationFrame(glowFrame); glowFrame = 0; glowOn = false;
    glowPanels.forEach(unlight);
    glowPanels = [];
  }
  function paintGlow() {
    glowFrame = 0;
    curX += (glowX - curX) * GLOW_EASE; curY += (glowY - curY) * GLOW_EASE;
    var lit = [];
    document.querySelectorAll(glowSelector).forEach(function (panel) {
      var rect = panel.getBoundingClientRect();
      var dx = Math.max(rect.left - curX, 0, curX - rect.right), dy = Math.max(rect.top - curY, 0, curY - rect.bottom);
      if (dx * dx + dy * dy >= GLOW_R * GLOW_R) return;
      panel.style.setProperty('--panel-glow-x', (curX - rect.left) + 'px');
      panel.style.setProperty('--panel-glow-y', (curY - rect.top) + 'px');
      panel.classList.add('panel-glow-active');
      lit.push(panel);
    });
    glowPanels.forEach(function (panel) { if (lit.indexOf(panel) < 0) unlight(panel); });
    glowPanels = lit;
    if (Math.abs(glowX - curX) + Math.abs(glowY - curY) > 0.5) glowFrame = requestAnimationFrame(paintGlow);
  }
  function requestGlow() { if (glowOn && !glowFrame) glowFrame = requestAnimationFrame(paintGlow); }
  document.addEventListener('pointermove', function (event) {
    if (!glowMedia.matches || event.pointerType !== 'mouse') { clearGlow(); return; }
    glowX = event.clientX; glowY = event.clientY;
    if (!glowOn) { glowOn = true; curX = glowX; curY = glowY; }
    requestGlow();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', clearGlow);
  window.addEventListener('blur', clearGlow);
  // Scrolling moves the panels under a resting cursor: repaint instead of clearing.
  window.addEventListener('scroll', requestGlow, { passive: true, capture: true });
  glowMedia.addEventListener('change', clearGlow);

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


// Bilderstreifen: per Tastatur fokussierbar nur, solange er seitlich scrollbar ist (Handy). Am Desktop ist er eine
// feste Collage; ohne tabindex bekommt er dort keinen Fokus und damit keinen Fokusrahmen.
(function () {
  var strip = document.querySelector('.strip');
  if (!strip) return;
  function sync() {
    if (strip.scrollWidth > strip.clientWidth + 1) strip.setAttribute('tabindex', '0');
    else { strip.removeAttribute('tabindex'); if (document.activeElement === strip) strip.blur(); }
  }
  sync();
  window.addEventListener('resize', sync);
  window.addEventListener('load', sync);
})();

// Header retracts on scroll down (returns on scroll up); round booking button follows the brown/pink section
(function () {
  var header = document.querySelector('.site-header'), fab = document.querySelector('.fab');
  var last = window.scrollY, ticking = false;
  function update() {
    ticking = false;
    var y = window.scrollY, d = y - last;
    if (header) {
      var keep = document.body.classList.contains('menu-open') || header.matches(':focus-within') || header.querySelector('.nav-dd.open');
      if (y < 90 || d < -4 || keep) header.classList.remove('is-retracted');
      else if (d > 4) header.classList.add('is-retracted');
    }
    if (Math.abs(d) > 4) last = y;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  var pinkSections = document.querySelectorAll('[data-flow-theme="pink"]');
  if (fab && pinkSections.length && 'IntersectionObserver' in window) {
    var io = null, over = new Set();
    var watch = function () {
      if (io) io.disconnect(); over.clear();
      io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) over.add(e.target); else over.delete(e.target); });
        fab.classList.toggle('over-pink', over.size > 0);
      }, { rootMargin: '-' + Math.max(0, window.innerHeight - 70) + 'px 0px 0px 0px' });
      pinkSections.forEach(function (s) { io.observe(s); });
    };
    watch(); window.addEventListener('resize', watch);
  }
})();
