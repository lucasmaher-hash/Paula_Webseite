// Linie fährt aus (Lucas, 21.10.2026, wie im Styleguide unter Bewegung): Die 1-px-Kontur eines Panels ist nicht einfach da,
// sie zeichnet sich in 2 s im Uhrzeigersinn um das Panel, sobald es ins Bild kommt, und mit Maus bei jedem Hover erneut.
// Der echte Rahmen wird dafür durchsichtig (.frame-host), eine SVG-Kontur liegt an seiner Stelle.
(function () {
  if (!('IntersectionObserver' in window) || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  var SEL = '.contact-panel, .hours, .voucher, .review, .services, .reviews';
  var NS = 'http://www.w3.org/2000/svg';
  var hover = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  [].forEach.call(document.querySelectorAll(SEL), function (el) {
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    var svg = document.createElementNS(NS, 'svg'), rect = document.createElementNS(NS, 'rect');
    svg.setAttribute('class', 'frame-draw'); svg.setAttribute('aria-hidden', 'true');
    rect.setAttribute('pathLength', '100'); svg.appendChild(rect); el.appendChild(svg);
    el.classList.add('frame-host');
    function size() {
      var w = el.clientWidth, h = el.clientHeight, r = Math.max(0, (parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0) - 1);
      rect.setAttribute('x', .5); rect.setAttribute('y', .5);
      rect.setAttribute('width', Math.max(0, w - 1)); rect.setAttribute('height', Math.max(0, h - 1));
      rect.setAttribute('rx', r); rect.setAttribute('ry', r);
    }
    function draw() {
      el.classList.remove('is-drawn'); void rect.getBoundingClientRect();
      requestAnimationFrame(function () { el.classList.add('is-drawn'); });
    }
    size();
    if ('ResizeObserver' in window) new ResizeObserver(size).observe(el); else window.addEventListener('resize', size);
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { draw(); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    if (hover) el.addEventListener('pointerenter', draw);
  });
})();
