// Contact section shapes after Lucas' drawing (IMG_0372, 10.11.2026). Only the dashed sides are straight; marked corners share
// one radius r; every other edge follows the traced pencil line as a smooth curve. Photos are clipped, panels get an SVG frame + fill.
(function () {
  var grid = document.querySelector('.contact-grid'); if (!grid) return;
  var mq = matchMedia('(min-width:900px)'), NS = 'http://www.w3.org/2000/svg';
  var A = grid.querySelector('.contact-figure-a'), C = grid.querySelector('.contact-figure-b');
  var B = grid.querySelector('.hours'), D = grid.querySelector('.contact-facts');
  if (!A || !B || !C || !D) return;
  // Outlines traced from the drawing (normalised to each shape's box, clockwise). 'c' = marked corner (radius r),
  // 'f' = point on a free, rounded edge; the last field says how the edge arrives: 'L' straight (dashed in the drawing), 'S' curve.
  var NODES = {"A":[["c",1,0,"S"],["c",1,1,"L"],["c",0,1,"L"],["f",0.0063,0.6401,"S"],["f",0.0664,0.2974,"S"],["f",0.2563,0.0742,"S"],["f",0.4995,0.0088,"S"],["f",0.7484,0.0104,"S"]],"B":[["c",0,1,"L"],["f",0,0.11,"L"],["f",0.09,0.0,"S"],["f",0.4523,0.1285,"S"],["f",0.6264,0.2576,"S"],["f",0.8158,0.371,"S"],["f",0.9761,0.5055,"S"],["f",0.9588,0.6948,"S"],["f",0.8453,0.8628,"S"],["f",0.6707,1,"S"]],"C":[["c",0,0,"S"],["c",1,0,"L"],["c",1,1,"L"],["f",0.7504,0.9936,"S"],["f",0.5406,0.9324,"S"],["f",0.3958,0.7612,"S"],["f",0.2366,0.6037,"S"],["f",0.0622,0.4633,"S"],["f",0.004,0.2517,"S"]],"D":[["c",0,0,"S"],["c",1,0,"L"],["f",1,0.5366,"L"],["f",0.8205,0.7201,"S"],["f",0.63,0.8919,"S"],["f",0.3621,0.9909,"S"],["c",0,1,"S"],["f",0.0043,0.7482,"S"],["f",0.0025,0.5001,"S"],["f",0.0099,0.2521,"S"]]};
  function unit(v) { var l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; }
  function f(n) { return Math.round(n * 100) / 100; }
  function path(list, W, H, r) {
    var n = list.length, P = list.map(function (q) { return {k: q[0], p: [q[1] * W, q[2] * H], s: q[3]}; });
    // corner arcs: tangent points towards the neighbouring nodes
    P.forEach(function (q, i) {
      if (q.k !== 'c') { q.a = q.b = q.p; return; }
      var pv = P[(i + n - 1) % n].p, nx = P[(i + 1) % n].p;
      var u1 = unit([pv[0] - q.p[0], pv[1] - q.p[1]]), u2 = unit([nx[0] - q.p[0], nx[1] - q.p[1]]);
      var half = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) / 2, t = r / Math.tan(half);
      var lim = Math.min(Math.hypot(pv[0] - q.p[0], pv[1] - q.p[1]), Math.hypot(nx[0] - q.p[0], nx[1] - q.p[1])) * .45;
      if (t > lim) t = lim;
      q.R = t * Math.tan(half); q.a = [q.p[0] + u1[0] * t, q.p[1] + u1[1] * t]; q.b = [q.p[0] + u2[0] * t, q.p[1] + u2[1] * t];
      q.ta = unit([q.p[0] - pv[0], q.p[1] - pv[1]]); q.tb = unit([nx[0] - q.p[0], nx[1] - q.p[1]]);
    });
    // tangents for curve ends: along an arriving/leaving straight edge, through a corner arc, or Catmull-Rom
    function tin(i) { var q = P[i]; if (q.k === 'c') return q.ta; return tan(i); }
    function tout(i) { var q = P[i]; if (q.k === 'c') return q.tb; return tan(i); }
    function tan(i) {
      var q = P[i], pv = P[(i + n - 1) % n], nx = P[(i + 1) % n];
      if (q.s === 'L') return unit([q.p[0] - pv.b[0], q.p[1] - pv.b[1]]);
      if (nx.s === 'L') return unit([nx.a[0] - q.p[0], nx.a[1] - q.p[1]]);
      return unit([nx.a[0] - pv.b[0], nx.a[1] - pv.b[1]]);
    }
    var d = 'M' + f(P[0].b[0]) + ' ' + f(P[0].b[1]);
    for (var k = 1; k <= n; k++) {
      var i = k % n, q = P[i], pv = P[(i + n - 1) % n];
      if (q.s === 'L') d += 'L' + f(q.a[0]) + ' ' + f(q.a[1]);
      else {
        var t0 = tout((i + n - 1) % n), t1 = tin(i), L = Math.hypot(q.a[0] - pv.b[0], q.a[1] - pv.b[1]) / 3;
        d += 'C' + f(pv.b[0] + t0[0] * L) + ' ' + f(pv.b[1] + t0[1] * L) + ' ' + f(q.a[0] - t1[0] * L) + ' ' + f(q.a[1] - t1[1] * L) + ' ' + f(q.a[0]) + ' ' + f(q.a[1]);
      }
      if (q.k === 'c') d += 'A' + f(q.R) + ' ' + f(q.R) + ' 0 0 1 ' + f(q.b[0]) + ' ' + f(q.b[1]);
    }
    return d + 'Z';
  }
  function svgFor(el) {
    var s = el.querySelector(':scope>.cshape');
    if (!s) { s = document.createElementNS(NS, 'svg'); s.setAttribute('class', 'cshape'); s.setAttribute('aria-hidden', 'true'); s.appendChild(document.createElementNS(NS, 'path')); el.prepend(s); }
    return s;
  }
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
    var u = (w - 3 * g) / 2597; grid.style.setProperty('--u', u + 'px');
    var r = 145 * u;
    [[A, 'A'], [C, 'C']].forEach(function (x) { var W = x[0].offsetWidth, H = x[0].offsetHeight; x[0].style.clipPath = "path('" + path(NODES[x[1]], W, H, r) + "')"; });
    var fw = parseFloat(getComputedStyle(B).getPropertyValue('--frame-w')) || 3, h = fw / 2;
    [[B, 'B'], [D, 'D']].forEach(function (x) {
      var el = x[0], W = el.offsetWidth, H = el.offsetHeight, s = svgFor(el);
      s.setAttribute('viewBox', (-h) + ' ' + (-h) + ' ' + W + ' ' + H);
      s.firstChild.setAttribute('d', path(NODES[x[1]], W - fw, H - fw, r));
    });
  }
  var raf = 0; function later() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
  if ('ResizeObserver' in window) { var ro = new ResizeObserver(later); [grid, A, B, C, D].forEach(function (el) { ro.observe(el); }); }
  mq.addEventListener('change', later); window.addEventListener('load', later); draw();
})();
