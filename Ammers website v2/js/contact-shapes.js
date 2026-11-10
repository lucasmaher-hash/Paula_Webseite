// Contact section shapes after Lucas' drawing (IMG_0372, 10.11.2026). Straight sides stay straight; marked corners share
// one radius r; the free corners are tangent fillets on straight lines. Photos are clipped, panels get an SVG frame + fill.
(function () {
  var grid = document.querySelector('.contact-grid'); if (!grid) return;
  var mq = matchMedia('(min-width:900px)'), NS = 'http://www.w3.org/2000/svg';
  var A = grid.querySelector('.contact-figure-a'), C = grid.querySelector('.contact-figure-b');
  var B = grid.querySelector('.hours'), D = grid.querySelector('.contact-facts');
  if (!A || !B || !C || !D) return;
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
  function len(v) { return Math.hypot(v[0], v[1]); }
  function unit(v) { var l = len(v) || 1; return [v[0] / l, v[1] / l]; }
  function f(n) { return Math.round(n * 100) / 100; }
  // pts: [x, y, radius | 'touchRight'] clockwise; every corner convex
  function path(pts, W) {
    var n = pts.length, seg = [];
    for (var i = 0; i < n; i++) {
      var V = pts[i], P = pts[(i + n - 1) % n], N = pts[(i + 1) % n];
      var u1 = unit(sub(P, V)), u2 = unit(sub(N, V));
      var th = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))), half = th / 2;
      var R = V[2];
      if (R === 'touchRight') { var bis = unit([u1[0] + u2[0], u1[1] + u2[1]]); R = (W - V[0]) / (bis[0] / Math.sin(half) + 1); }
      var t = R / Math.tan(half), lim = Math.min(len(sub(P, V)), len(sub(N, V))) * .5;
      if (t > lim) { t = lim; R = t * Math.tan(half); }
      seg.push({s: [V[0] + u1[0] * t, V[1] + u1[1] * t], e: [V[0] + u2[0] * t, V[1] + u2[1] * t], R: R});
    }
    var d = 'M' + f(seg[0].e[0]) + ' ' + f(seg[0].e[1]);
    for (var k = 1; k <= n; k++) {
      var c = seg[k % n];
      d += 'L' + f(c.s[0]) + ' ' + f(c.s[1]) + 'A' + f(c.R) + ' ' + f(c.R) + ' 0 0 1 ' + f(c.e[0]) + ' ' + f(c.e[1]);
    }
    return d + 'Z';
  }
  function shapes(u) {
    var r = 46 * u;
    return {
      A: function (W, H) { return [[0, 0, Math.min(170 * u, .45 * H)], [W, 0, r], [W, H, r], [0, H, r]]; },
      B: function (W, H) { return [[0, 0, r], [.315 * W, 0, 140 * u], [1.183 * W, .618 * H, 'touchRight'], [.635 * W, H, 90 * u], [0, H, r]]; },
      C: function (W, H) { return [[0, 0, r], [W, 0, r], [W, H, r], [.62 * W, H, 80 * u], [0, .44 * H, 100 * u]]; },
      D: function (W, H) { return [[0, 0, r], [W, 0, r], [W, .53 * H, 90 * u], [.5 * W, H, 80 * u], [0, H, r]]; }
    };
  }
  function svgFor(el) {
    var s = el.querySelector(':scope>.cshape');
    if (!s) { s = document.createElementNS(NS, 'svg'); s.setAttribute('class', 'cshape'); s.setAttribute('aria-hidden', 'true'); s.appendChild(document.createElementNS(NS, 'path')); el.prepend(s); }
    return s;
  }
  function inset(pts, i) { return pts.map(function (p) { return [p[0], p[1], p[2]]; }); }
  function draw() {
    if (!mq.matches) {
      grid.classList.remove('has-shapes'); grid.style.removeProperty('--u');
      [A, C].forEach(function (el) { el.style.clipPath = ''; });
      [B, D].forEach(function (el) { var s = el.querySelector(':scope>.cshape'); if (s) s.remove(); });
      return;
    }
    grid.classList.add('has-shapes');
    var cs = getComputedStyle(grid), g = parseFloat(cs.columnGap) || 12;
    var w = grid.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var u = (w - 3 * g) / 1387; grid.style.setProperty('--u', u + 'px');
    var sh = shapes(u);
    [[A, sh.A], [C, sh.C]].forEach(function (x) { var W = x[0].offsetWidth, H = x[0].offsetHeight; x[0].style.clipPath = "path('" + path(x[1](W, H), W) + "')"; });
    var fw = parseFloat(getComputedStyle(B).getPropertyValue('--frame-w')) || 3, h = fw / 2;
    [[B, sh.B], [D, sh.D]].forEach(function (x) {
      var el = x[0], W = el.offsetWidth, H = el.offsetHeight, s = svgFor(el);
      s.setAttribute('viewBox', (-h) + ' ' + (-h) + ' ' + W + ' ' + H);
      s.firstChild.setAttribute('d', path(x[1](W - fw, H - fw), W - fw));
    });
  }
  var raf = 0; function later() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
  if ('ResizeObserver' in window) { var ro = new ResizeObserver(later); [grid, A, B, C, D].forEach(function (el) { ro.observe(el); }); }
  mq.addEventListener('change', later); window.addEventListener('load', later); draw();
})();
