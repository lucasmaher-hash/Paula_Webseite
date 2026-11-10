// Ammers website v2: services as three ovals, the flowing background and the dial.

// Particle fill for panels: on hover/focus/tap, fine grain gathers from the pointer and densifies into the
// solid colour; on leave it dissolves the same way. The element's own background stays transparent; a canvas inside
// (clipped by the element's radius) paints the fill. `.pf-on` switches the content once the fill is mostly there.
window.pmParticleFill = (function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var touch = matchMedia('(hover: none)');
  function settings() {
    var m = window.pmFlowBackground && window.pmFlowBackground.state.motion || {};
    return {duration:Number.isFinite(m.pDuration) ? m.pDuration : 1100, size:Number.isFinite(m.pSize) ? m.pSize : 1,
      flicker:Number.isFinite(m.pScatter) ? m.pScatter : .18, spread:Number.isFinite(m.pSpread) ? m.pSpread : .6};
  }
  // Fine grain (after gather.be-of-dao.com): every device pixel (or block of `size` pixels) is one grain.
  // A grain switches on when its threshold drops below the progress. Thresholds mix noise with the distance
  // from where the pointer entered, so a grain cloud gathers from there and densifies into the solid colour;
  // `flicker` re-rolls part of the noise each frame so the edge shimmers like grain.
  var swatch = document.createElement('canvas').getContext('2d', {willReadFrequently:true}), rgbaCache = {};
  function rgba(color) {
    if (rgbaCache[color]) return rgbaCache[color];
    swatch.clearRect(0, 0, 1, 1); swatch.fillStyle = color; swatch.fillRect(0, 0, 1, 1);
    var d = swatch.getImageData(0, 0, 1, 1).data;
    return (rgbaCache[color] = (255 << 24 | d[2] << 16 | d[1] << 8 | d[0]) >>> 0);
  }
  function attach(el, opts) {
    var canvas = document.createElement('canvas'); canvas.className = 'pf-canvas'; canvas.setAttribute('aria-hidden', 'true');
    el.prepend(canvas); el.classList.add('pf');
    var ctx = canvas.getContext('2d'), st = {p:0, target:0, raf:0, last:0, key:'', ox:.5, oy:.5, noise:null, noise2:null, img:null, cw:0, ch:0};
    el._pf = st;
    function draw() {
      var s = settings(), dpr = Math.min(2, devicePixelRatio || 1), w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      var g = Math.max(1, Math.round(s.size)), cw = Math.ceil(w * dpr / g), ch = Math.ceil(h * dpr / g);
      var key = [cw, ch, g].join(':');
      if (st.key !== key) {
        canvas.width = cw; canvas.height = ch; st.cw = cw; st.ch = ch; st.key = key;
        var n = cw * ch; st.noise = new Float32Array(n); st.noise2 = new Float32Array(n);
        for (var k = 0; k < n; k++) { st.noise[k] = Math.random(); st.noise2[k] = Math.random() - .5; }
        st.img = ctx.createImageData(cw, ch);
      }
      if (st.p <= 0) { ctx.clearRect(0, 0, cw, ch); return; }
      var color = getComputedStyle(el).getPropertyValue('--pf-color').trim() || getComputedStyle(el).color;
      if (st.p >= 1) { ctx.clearRect(0, 0, cw, ch); ctx.fillStyle = color; ctx.fillRect(0, 0, cw, ch); return; }
      var px = rgba(color), buf = new Uint32Array(st.img.data.buffer), noise = st.noise, noise2 = st.noise2;
      var spread = Math.min(.95, Math.max(0, s.spread)), flick = Math.max(0, s.flicker), v = st.p * (1 + flick);
      var ox = st.ox * cw, oy = st.oy * ch, inv = 1 / Math.hypot(Math.max(ox, cw - ox), Math.max(oy, ch - oy));
      var shift = (Math.random() * noise2.length) | 0, len = noise2.length, i = 0;
      for (var y = 0; y < ch; y++) {
        var dy = (y - oy) * (y - oy);
        for (var x = 0; x < cw; x++, i++) {
          var dx = x - ox, thr = (1 - spread) * noise[i] + spread * Math.sqrt(dx * dx + dy) * inv + flick * noise2[(i + shift) % len];
          buf[i] = thr < v ? px : 0;
        }
      }
      ctx.putImageData(st.img, 0, 0);
    }
    function step(ts) {
      var s = settings(), dt = st.last ? ts - st.last : 16; st.last = ts;
      var dir = st.target > st.p ? 1 : -1, speed = 1 / Math.max(1, dir > 0 ? s.duration : s.duration * .75);
      st.p = Math.min(1, Math.max(0, st.p + dir * dt * speed));
      if ((dir > 0 && st.p >= st.target) || (dir < 0 && st.p <= st.target)) st.p = st.target;
      el.classList.toggle('pf-on', dir > 0 ? st.p > .55 : st.p > .45);
      draw();
      if (st.p !== st.target) st.raf = requestAnimationFrame(step); else { st.raf = 0; st.last = 0; }
    }
    function set(on, ev) {
      if (on && opts.group) opts.group.forEach(function (o) { if (o !== el && o._pf && o._pf.target) o._pf.setOff(); });
      if (ev && ev.clientX !== undefined) { var b = el.getBoundingClientRect(); st.ox = (ev.clientX - b.left) / b.width; st.oy = (ev.clientY - b.top) / b.height; }
      st.target = on ? 1 : 0;
      el.classList.toggle('is-open', on);
      if (reduce.matches) { st.p = st.target; el.classList.toggle('pf-on', on); draw(); return; }
      if (!st.raf) { st.last = 0; st.raf = requestAnimationFrame(step); }
    }
    st.set = set; st.setOff = function () { set(false); };
    el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' || e.pointerType === 'pen') set(true, e); });
    el.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' || e.pointerType === 'pen') set(false); });
    el.addEventListener('focusin', function () { if (!st.target && (el.matches(':focus-visible') || el.querySelector(':focus-visible'))) set(true); });
    el.addEventListener('focusout', function (e) { if (!el.contains(e.relatedTarget) && !el.matches(':hover')) set(false); });
    // Touch: first tap fills; links inside only work once filled.
    el.addEventListener('click', function (e) { if (touch.matches && !st.target) { e.preventDefault(); set(true, e); } });
    document.addEventListener('click', function (e) { if (touch.matches && st.target && !el.contains(e.target)) set(false); });
    window.addEventListener('resize', function () { st.key = ''; draw(); });
  }
  return {attach:attach, set:function (el, on) { if (el._pf) el._pf.set(on); }};
})();

// Services as three ovals (layout after tuxkarma.co, right half mirrored to three): outline only,
// title in the middle; on hover/focus/tap the oval fills and shows six services of its group.
(function () {
  'use strict';
  var section = document.querySelector('#behandlungen');
  var accordion = section && section.querySelector('.accordion');
  if (!accordion) return;
  var booking = section.querySelector('.section-head .btn');
  var url = booking ? booking.href : '#kontakt';
  var all = {};
  accordion.querySelectorAll('details').forEach(function (d) {
    all[d.id] = Array.from(d.querySelectorAll('.service-list .name')).map(function (n) { return n.textContent.trim(); });
  });
  // Six real service names per oval (sample), shortened for display only.
  var groups = [
    {id:'manikuere', anchors:[], title:'Maniküre', pick:[['manikuere',4],['manikuere',2],['manikuere',0],['manikuere',5],['manikuere',7],['manikuere',11]]},
    {id:'wimpern', anchors:['brauen'], title:'Wimpern & Brauen', pick:[['wimpern',0],['wimpern',1],['wimpern',3],['wimpern',4],['brauen',1],['brauen',2]]},
    {id:'gesicht', anchors:['pmu'], title:'Haut & Permanent Make-up', pick:[['pmu',0],['pmu',1],['pmu',2],['gesicht',1],['gesicht',6],['gesicht',5]]}
  ];
  function short(name) { return name.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+—\s+.*$/, '').replace(/[„"“”]/g, '').trim(); }
  function count(g) { return [g.id].concat(g.anchors).reduce(function (n, id) { return n + (all[id] ? all[id].length : 0); }, 0); }
  var star = '<svg viewBox="0 0 40 56" aria-hidden="true"><path d="M20 0C21.6 18 24 26 40 28 24 30 21.6 38 20 56 18.4 38 16 30 0 28 16 26 18.4 18 20 0Z"/></svg>';
  var wrap = document.createElement('div'); wrap.className = 'service-ovals';
  groups.forEach(function (g, i) {
    var items = g.pick.map(function (p) { return all[p[0]] && all[p[0]][p[1]]; }).filter(Boolean);
    var oval = document.createElement('div');
    oval.className = 'service-oval'; oval.id = g.id; oval.tabIndex = 0; oval.setAttribute('role', 'group'); oval.setAttribute('aria-label', g.title);
    oval.innerHTML = g.anchors.map(function (a) { return '<span class="service-oval-anchor" id="' + a + '"></span>'; }).join('') +
      '<h3 class="service-oval-title">' + g.title + '</h3>' +
      '<span class="service-oval-hint mono" aria-hidden="true">Leistungen ansehen</span>' +
      '<ul class="service-oval-list">' + items.map(function (n) { return '<li><a href="' + url + '" target="_blank" rel="noopener">' + short(n) + '</a></li>'; }).join('') +
      '<li class="service-oval-more"><a class="mono" href="' + url + '" target="_blank" rel="noopener">Alle ' + count(g) + ' Leistungen ↗</a></li></ul>';
    wrap.append(oval);
    if (i < groups.length - 1) { var s = document.createElement('span'); s.className = 'service-oval-stars'; s.setAttribute('aria-hidden', 'true'); s.innerHTML = star + star; wrap.append(s); }
  });
  accordion.replaceWith(wrap);
  document.body.classList.add('service-ovals-variant');
  var ovals = Array.from(wrap.querySelectorAll('.service-oval'));
  var pf = window.pmParticleFill;
  ovals.forEach(function (o) { pf.attach(o, {group:ovals}); });
  function fromHash(id) { var t = document.getElementById(id); var o = t && t.closest('.service-oval'); if (o) pf.set(o, true); }
  document.querySelectorAll('[data-open]').forEach(function (a) { a.addEventListener('click', function () { fromHash(a.dataset.open); }); });
  if (location.hash) fromHash(location.hash.slice(1));
})();

// Gallery below the hero: one word per picture, revealed with the same particle fill.
(function () {
  'use strict';
  var figures = Array.from(document.querySelectorAll('.results .strip figure'));
  figures.forEach(function (f) { if (f.querySelector('.strip-label')) window.pmParticleFill.attach(f, {group:figures}); });
})();

// Flowing colour background behind the frames, rebuilt after tuxkarma.co (Tux Creative House).
// Studied from their app.js, style.css, fond.mp4 and brush PNGs:
// 1. Base: a 14.6 s loop of large, smooth, folded colour sheets (no noise), canvas at pixel ratio .5.
// 2. A hidden render target, cleared black every frame, collects white brush sprites with normal alpha blending:
//    mouse: ring of five blurred lumps with a filled core, 450 px (350 px < 768), opacity .55, scale .7 -> 1.67,
//           opacity x.98 and rotation +dt/2 per frame, one stamp per frame when the cursor moved >= 4 px;
//    panels while scrolling: soft bar along the leading edge, opacity .5, x.92, plus a hollow ring at .2, x.98.
// 3. Final pass: d = target.r, angle = d*2PI, uv += (sin, cos)(angle) * d * .2. Rings make the curls.
// Here the video is replaced by procedural folded sheets in the PM palettes; everything else follows that recipe.
(function () {
  'use strict';
  var query = new URLSearchParams(location.search);
  var local = /^(localhost|127\.0\.0\.1|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(location.hostname);
  var tuning = true; // Lucas 10.11.2026: the dial is always on v2, nobody else uses this page.
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  // design.md Hintergrund/Fläche/Fläche tief, plus a deeper step towards the button colour. Accent from the other palette.
  var PALETTES = {
    brown:{base:'#f6edea',tone1:'#ecdad2',tone2:'#e3c9be',tone3:'#d4b0a2',accent:'#e4c3c8'},
    pink:{base:'#f0e0e2',tone1:'#e8cdd2',tone2:'#ddb9c0',tone3:'#cf9fa8',accent:'#e6d0c6'}
  };
  var MOTION = {intensity:1,accentAmount:.5,softness:.28,sheen:.5,speed:1,scale:1.6,warp:1.2,parallax:.1,
    displace:.12,trailSize:450,trailStrength:.45,trailDecay:.98,trailGrowth:1.67,scrollWaves:1,grain:0,resolution:.5,
    sideGutter:13.25,pDuration:1100,pSize:1,pScatter:.18,pSpread:.6};
  function fresh() { return {variant:query.get('bg') === 'pink' ? 'pink' : 'brown',
    colors:{brown:Object.assign({},PALETTES.brown),pink:Object.assign({},PALETTES.pink)},motion:Object.assign({},MOTION)}; }
  var key = 'pm-beauty:v2:settings:v3', uiKey = 'pm-beauty:1:background-ui:v1';
  var state = fresh();
  if (tuning) try {
    var saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      if (saved.variant === 'brown' || saved.variant === 'pink') state.variant = saved.variant;
      ['brown','pink'].forEach(function (v) { if (saved.colors && saved.colors[v]) Object.keys(PALETTES[v]).forEach(function (k) { if (/^#[0-9a-f]{6}$/i.test(saved.colors[v][k])) state.colors[v][k] = saved.colors[v][k]; }); });
      if (saved.motion) Object.keys(MOTION).forEach(function (k) { if (Number.isFinite(saved.motion[k])) state.motion[k] = saved.motion[k]; });
    }
    if (query.get('bg') === 'pink' || query.get('bg') === 'brown') state.variant = query.get('bg');
  } catch (e) {}

  var layer = document.createElement('div'); layer.className = 'flow-bg'; layer.setAttribute('aria-hidden','true');
  var canvas = document.createElement('canvas'), grain = document.createElement('div'); grain.className = 'flow-bg-grain';
  layer.append(canvas, grain); document.body.prepend(layer);
  function hex(h) { return [parseInt(h.slice(1,3),16)/255, parseInt(h.slice(3,5),16)/255, parseInt(h.slice(5,7),16)/255]; }
  // Side padding of all content except the hero (desktop only, see service-panels.css).
  function applyLayout() { document.documentElement.style.setProperty('--v2-side', Math.max(0, state.motion.sideGutter) + 'vw'); }
  applyLayout();
  var api = {state:state, defaults:{palettes:PALETTES, motion:MOTION}, fresh:fresh, key:key, uiKey:uiKey, tuning:tuning, apply:function () {}};
  window.pmFlowBackground = api;
  function fallback() {
    layer.classList.add('is-fallback');
    api.apply = function () { applyLayout(); var c = state.colors[state.variant]; grain.style.opacity = state.motion.grain;
      layer.style.background = 'radial-gradient(70% 60% at 25% 30%,' + c.tone2 + ',transparent),radial-gradient(60% 70% at 80% 75%,' + c.tone1 + ',transparent),' + c.base; };
    api.apply();
  }
  var gl = canvas.getContext('webgl', {antialias:false, depth:false, stencil:false, alpha:false, powerPreference:'low-power'});
  if (!gl) return fallback();

  function program(vs, fs) {
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
    var p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    return p;
  }
  function uniforms(p, names) { var u = {}; names.forEach(function (n) { u[n] = gl.getUniformLocation(p, n); }); return u; }
  var spriteProg, mainProg;
  try {
    spriteProg = program(
      'attribute vec2 p;uniform vec2 uRes,uCenter,uSize;uniform float uRot;varying vec2 vUv;' +
      'void main(){vUv=p*.5+.5;float c=cos(uRot),s=sin(uRot);vec2 q=p*uSize;q=vec2(c*q.x-s*q.y,s*q.x+c*q.y)+uCenter;' +
      'gl_Position=vec4(q.x/uRes.x*2.-1.,1.-q.y/uRes.y*2.,0.,1.);}',
      'precision mediump float;uniform sampler2D uBrush;uniform float uAlpha;varying vec2 vUv;' +
      'void main(){gl_FragColor=vec4(1.,1.,1.,texture2D(uBrush,vUv).a*uAlpha);}');
    mainProg = program(
      'attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}',
      ['precision highp float;varying vec2 vUv;uniform sampler2D uDisp;',
       'uniform vec2 uRes;uniform float uTime,uScroll,uIntensity,uAccent,uSoft,uSheen,uScale,uWarp,uDisp2;',
       'uniform vec3 uBase,uC1,uC2,uC3,uAcc;',
       'float band(float v){return smoothstep(.5-uSoft,.5+uSoft,v);}',
       'void main(){',
       '  float d=texture2D(uDisp,vUv).r;float th=d*6.2831853;',
       '  vec2 uv=vUv+vec2(sin(th),cos(th))*d*uDisp2;',
       // folded sheets: iterated sine warp gives smooth, large, liquid folds (no noise grain)
       '  vec2 p=(uv-.5)*vec2(uRes.x/uRes.y,1.)*uScale+vec2(0.,-uScroll);float t=uTime*.34;',
       '  for(int i=1;i<6;i++){float f=float(i);',
       '    p.x+=uWarp*.42/f*sin(f*1.27*p.y+t*(.9+f*.21)+f*1.7);',
       '    p.y+=uWarp*.42/f*cos(f*1.13*p.x-t*(.7+f*.17)+f*2.3);}',
       '  float a=.5+.5*sin(p.x*1.1+t*.3),b=.5+.5*sin(p.y*1.3+1.3-t*.2),c=.5+.5*sin((p.x-p.y)*.8+2.1);',
       '  float A=band(a),B=band(b),Cc=band(c);',
       '  vec3 col=uBase;',
       '  col=mix(col,uC1,clamp(A*uIntensity,0.,1.));',
       '  col=mix(col,uC2,clamp(B*uIntensity*.85,0.,1.));',
       '  col=mix(col,uC3,clamp(A*B*uIntensity*.9,0.,1.));',
       '  col=mix(col,uAcc,clamp(Cc*(1.-A)*uAccent,0.,1.));',
       // light rim where one sheet folds over the next, like the edges in the reference video
       '  float rim=pow(1.-abs(a-.5)*2.,10.)+pow(1.-abs(b-.5)*2.,10.)*.6;',
       '  col=mix(col,vec3(1.),clamp(rim*uSheen*.3,0.,.6));',
       '  col+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)/255.;',
       '  gl_FragColor=vec4(col,1.);}'].join('\n'));
  } catch (e) { console.warn('flow background', e); return fallback(); }

  var quad = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  var SU = uniforms(spriteProg, ['uRes','uCenter','uSize','uRot','uBrush','uAlpha']);
  var MU = uniforms(mainProg, ['uDisp','uRes','uTime','uScroll','uIntensity','uAccent','uSoft','uSheen','uScale','uWarp','uDisp2','uBase','uC1','uC2','uC3','uAcc']);
  function bindQuad(p) { var l = gl.getAttribLocation(p, 'p'); gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0); }

  // Brushes drawn like Tux's PNGs: five blurred lumps on a ring; "water" with a filled core, "ring" hollow; "bar" for panel edges.
  function brush(kind) {
    var c = document.createElement('canvas'); c.width = c.height = 256; var x = c.getContext('2d');
    x.filter = 'blur(11px)'; x.fillStyle = '#fff';
    if (kind === 'bar') { x.filter = 'blur(18px)'; x.beginPath(); x.ellipse(128,128,96,40,0,0,Math.PI*2); x.fill(); }
    else {
      for (var i = 0; i < 5; i++) { var a = i / 5 * Math.PI * 2 + .3; x.globalAlpha = .75 + .25 * Math.sin(i * 2.1); x.beginPath(); x.ellipse(128 + Math.cos(a) * 74, 128 + Math.sin(a) * 74, 30, 20, a + Math.PI / 2, 0, Math.PI * 2); x.fill(); }
      x.globalAlpha = .7;
      if (kind === 'water') { x.beginPath(); x.arc(128,128,30,0,Math.PI*2); x.fill(); }
      else { x.lineWidth = 7; x.setLineDash([14,9]); x.strokeStyle = '#fff'; x.beginPath(); x.arc(128,128,30,0,Math.PI*2); x.stroke(); }
    }
    var t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  }
  var BRUSH = {water:brush('water'), ring:brush('ring'), bar:brush('bar')};

  var target = gl.createTexture(), fbo = gl.createFramebuffer(), w = 0, h = 0;
  function resize() {
    var r = Math.max(.05, state.motion.resolution);
    w = innerWidth; h = innerHeight;
    canvas.width = Math.max(1, Math.round(w * r)); canvas.height = Math.max(1, Math.round(h * r));
    gl.bindTexture(gl.TEXTURE_2D, target);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
  resize();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  var complete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  if (!complete) return fallback();

  // Sprite pool. Values per 60 fps frame, as in Tux; scaled by dt so slower devices fade at the same speed.
  var MAX = 90, sprites = [], next = 0;
  function stamp(o) { sprites[next] = o; next = (next + 1) % MAX; }
  function baseSize() { return state.motion.trailSize * (innerWidth < 768 ? 350 / 450 : 1); }
  var mouse = {x:null, y:null}, prev = {x:null, y:null};
  window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, {passive:true});
  function trackMouse() {
    if (mouse.x === null) return;
    if (prev.x === null || Math.abs(mouse.x - prev.x) >= 4 || Math.abs(mouse.y - prev.y) >= 4) {
      var m = state.motion;
      stamp({brush:'water', x:mouse.x, y:mouse.y, sx:baseSize(), sy:baseSize(), s:.7, a:.55 * m.trailStrength / .45, rot:Math.random() * Math.PI * 2,
        decay:m.trailDecay, grow:m.trailGrowth, spin:.5});
    }
    prev.x = mouse.x; prev.y = mouse.y;
  }
  // Scroll waves: frames leave a wave at their leading edge (bottom when scrolling down, top when up).
  var panels = [], lastScroll = scrollY, panelPrev = new Map();
  function collectPanels() { panels = Array.from(document.querySelectorAll('.preview-frame-host,.services .accordion,.course-panel')).filter(function (el) { return el.getBoundingClientRect().width > 240; }); }
  setTimeout(collectPanels, 700); window.addEventListener('resize', collectPanels);
  function trackPanels() {
    var amount = state.motion.scrollWaves, dir = scrollY - lastScroll; lastScroll = scrollY;
    if (amount <= 0 || dir === 0) return;
    panels.forEach(function (el) {
      var b = el.getBoundingClientRect(), y = dir > 0 ? b.bottom : b.top, py = panelPrev.get(el);
      if (y < -60 || y > h + 60) return;
      if (py !== undefined && Math.abs(y - py) < 4) return;
      panelPrev.set(el, y);
      var x = b.left + b.width / 2, sx = b.width / 2 * 1.05;
      stamp({brush:'bar', x:x, y:y, sx:sx, sy:70, s:1.2, a:.5 * amount, rot:0, decay:.92, grow:1.11, spin:0, stretch:true});
      stamp({brush:'ring', x:x, y:y, sx:sx * .6, sy:sx * .6, s:1, a:.2 * amount, rot:Math.random() * 6.28, decay:.98, grow:2.2, spin:.5});
    });
  }

  api.apply = function () { applyLayout(); grain.style.opacity = state.motion.grain; document.body.style.backgroundColor = state.colors[state.variant].base; resize(); if (!running) render(0); };
  var time = 0, last = performance.now(), running = false;
  function render(dt) {
    var m = state.motion, c = state.colors[state.variant], f = dt * 60, r = canvas.width / Math.max(1, w);
    // 1. displacement target
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo); gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(spriteProg); bindQuad(spriteProg);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform2f(SU.uRes, canvas.width, canvas.height); gl.uniform1i(SU.uBrush, 0); gl.activeTexture(gl.TEXTURE0);
    for (var i = 0; i < MAX; i++) {
      var s = sprites[i]; if (!s || s.a < .002) continue;
      gl.bindTexture(gl.TEXTURE_2D, BRUSH[s.brush]);
      gl.uniform2f(SU.uCenter, s.x * r, s.y * r);
      gl.uniform2f(SU.uSize, s.sx * s.s * r / 2, (s.stretch ? s.sy : s.sy * s.s) * r / 2);
      gl.uniform1f(SU.uRot, s.rot); gl.uniform1f(SU.uAlpha, Math.min(1, s.a));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (f > 0) {
        var k = Math.pow(.982, f);
        s.a *= Math.pow(Math.min(.9999, Math.max(0, s.decay)), f);
        s.s = s.s * k + s.grow * (1 - k);
        s.rot += dt * s.spin;
      }
    }
    gl.disable(gl.BLEND); gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // 2. colour pass
    gl.viewport(0, 0, canvas.width, canvas.height); gl.useProgram(mainProg); bindQuad(mainProg);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, target); gl.uniform1i(MU.uDisp, 0);
    gl.uniform2f(MU.uRes, w, h); gl.uniform1f(MU.uTime, time); gl.uniform1f(MU.uScroll, scrollY / Math.max(1, h) * m.parallax);
    gl.uniform1f(MU.uIntensity, m.intensity); gl.uniform1f(MU.uAccent, m.accentAmount); gl.uniform1f(MU.uSoft, Math.max(.005, m.softness));
    gl.uniform1f(MU.uSheen, m.sheen); gl.uniform1f(MU.uScale, m.scale); gl.uniform1f(MU.uWarp, m.warp); gl.uniform1f(MU.uDisp2, m.displace);
    gl.uniform3fv(MU.uBase, hex(c.base)); gl.uniform3fv(MU.uC1, hex(c.tone1)); gl.uniform3fv(MU.uC2, hex(c.tone2)); gl.uniform3fv(MU.uC3, hex(c.tone3)); gl.uniform3fv(MU.uAcc, hex(c.accent));
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  function frame(ts) {
    if (!running) return;
    var dt = Math.min(.05, (ts - last) / 1000); last = ts;
    time += dt * state.motion.speed;
    trackMouse(); trackPanels(); render(dt);
    requestAnimationFrame(frame);
  }
  function setRunning() {
    var go = !document.hidden && !reduce.matches;
    if (go && !running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
    if (!go) { running = false; sprites = []; render(0); }
  }
  document.addEventListener('visibilitychange', setRunning); reduce.addEventListener('change', setRunning);
  window.addEventListener('resize', function () { resize(); if (!running) render(0); });
  api.apply(); setRunning();
})();

// Dial for the flow background, always on /1/. Bottom right, draggable, collapsible.
(function () {
  'use strict';
  var bg = window.pmFlowBackground;
  if (!bg || !bg.tuning) return;
  var state = bg.state;
  var ui = {x:null, y:null, collapsed:innerWidth < 600};
  try { var su = JSON.parse(localStorage.getItem(bg.uiKey)); if (su) { if (Number.isFinite(su.x) && Number.isFinite(su.y)) { ui.x = su.x; ui.y = su.y; } ui.collapsed = su.collapsed === true; } } catch (e) {}
  var COLORS = [['base','Grund'],['tone1','Ton hell'],['tone2','Ton mittel'],['tone3','Ton tief'],['accent','Akzent (andere Palette)']];
  var SLIDERS = [
    ['Layout', [['sideGutter','Seitenrand links/rechts (Desktop)',0,35,.25,'vw']]],
    ['Partikel (Hover-Flächen)', [['pDuration','Dauer',0,4000,10,'ms'],['pSize','Korngröße (Gerätepixel)',1,24,1,'px'],['pScatter','Flimmern am Rand',0,1,.01,''],['pSpread','Staffelung',0,.9,.01,'']]],
    ['Hintergrund: Farbe', [['intensity','Farbstärke',0,3,.01,'×'],['accentAmount','Akzentmenge',0,2,.01,'×'],['softness','Kantenweichheit',.005,.6,.005,''],['sheen','Glanz an den Falten',0,3,.01,'×']]],
    ['Hintergrund: Fluss', [['speed','Tempo',0,6,.05,'×'],['scale','Formgröße (klein = groß)',.1,8,.05,'×'],['warp','Faltung',0,4,.02,''],['parallax','Scroll-Mitlauf',-2,2,.01,'']]],
    ['Hintergrund: Maus und Scroll', [['displace','Verzerrung (Tux: 0,2)',0,1,.005,''],['trailSize','Spurgröße (Tux: 450)',20,2000,5,'px'],['trailStrength','Spurstärke',0,2,.01,''],['trailDecay','Nachleuchten (Tux: 0,98)',.8,.999,.001,''],['trailGrowth','Wachstum (Tux: 1,67)',.2,5,.01,'×'],['scrollWaves','Scroll-Wellen',0,3,.01,'×']]],
    ['Hintergrund: Oberfläche', [['grain','Körnung',0,.6,.005,''],['resolution','Auflösung (Tux: 0,5)',.05,2,.01,'×']]]
  ];
  var panel = document.createElement('aside'); panel.id = 'bg-tuner'; panel.setAttribute('aria-label','Regler');
  var html = '<div class="bg-tuner-header"><strong>Regler</strong><button type="button" id="bg-tuner-collapse" aria-controls="bg-tuner-body" aria-expanded="true">Einklappen</button></div><div class="bg-tuner-body" id="bg-tuner-body">';
  html += '<div class="bg-tuner-seg" role="group" aria-label="Variante"><button type="button" data-variant="brown">Braun</button><button type="button" data-variant="pink">Pink</button></div>';
  html += '<fieldset><legend>Farben <span id="bg-variant-name"></span></legend>' + COLORS.map(function (c) { return '<label for="bg-c-' + c[0] + '">' + c[1] + '</label><div class="bg-tuner-row"><input type="color" id="bg-c-' + c[0] + '" data-color="' + c[0] + '"><output id="bg-c-' + c[0] + '-v"></output></div>'; }).join('') + '</fieldset>';
  SLIDERS.forEach(function (g) {
    html += '<fieldset><legend>' + g[0] + '</legend>' + g[1].map(function (s) {
      return '<label for="bg-s-' + s[0] + '">' + s[1] + '</label><div class="bg-tuner-row"><input type="range" id="bg-s-' + s[0] + '" data-key="' + s[0] + '" min="' + s[2] + '" max="' + s[3] + '" step="' + s[4] + '"><input type="number" aria-label="' + s[1] + '" data-num="' + s[0] + '" step="' + s[4] + '"><span>' + s[5] + '</span></div>';
    }).join('') + '</fieldset>';
  });
  html += '<pre id="bg-settings" tabindex="0" aria-label="Aktuelle Hintergrundwerte"></pre><div class="bg-tuner-actions"><button type="button" id="bg-copy">Kopieren</button><button type="button" id="bg-reset">Zurücksetzen</button></div></div>';
  panel.innerHTML = html; document.body.append(panel);
  var body = panel.querySelector('#bg-tuner-body'), collapse = panel.querySelector('#bg-tuner-collapse'), out = panel.querySelector('#bg-settings');
  var limits = {}; SLIDERS.forEach(function (g) { g[1].forEach(function (s) { limits[s[0]] = {min:s[2], max:s[3]}; }); });
  function saveState() { try { localStorage.setItem(bg.key, JSON.stringify(state)); } catch (e) {} }
  function saveUi() { try { localStorage.setItem(bg.uiKey, JSON.stringify(ui)); } catch (e) {} }
  function exported() { return JSON.stringify({variant:state.variant, colors:state.colors[state.variant], motion:state.motion}, null, 2); }
  function sync() {
    panel.querySelectorAll('[data-variant]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.variant === state.variant)); });
    panel.querySelector('#bg-variant-name').textContent = state.variant === 'pink' ? '(Pink)' : '(Braun)';
    COLORS.forEach(function (c) { var v = state.colors[state.variant][c[0]]; panel.querySelector('#bg-c-' + c[0]).value = v; panel.querySelector('#bg-c-' + c[0] + '-v').textContent = v; });
    Object.keys(limits).forEach(function (k) {
      var v = state.motion[k], r = panel.querySelector('#bg-s-' + k), n = panel.querySelector('[data-num="' + k + '"]');
      r.min = Math.min(limits[k].min, v); r.max = Math.max(limits[k].max, v); r.value = v;
      if (document.activeElement !== n) n.value = v;
    });
    out.textContent = exported();
  }
  function changed() { bg.apply(); saveState(); sync(); }
  panel.querySelectorAll('[data-variant]').forEach(function (b) { b.addEventListener('click', function () { state.variant = b.dataset.variant; changed(); }); });
  panel.querySelectorAll('[data-color]').forEach(function (i) { i.addEventListener('input', function () { state.colors[state.variant][i.dataset.color] = i.value; changed(); }); });
  panel.querySelectorAll('[data-key],[data-num]').forEach(function (i) {
    i.addEventListener('input', function () {
      if (i.value === '') return; var v = Number(i.value), k = i.dataset.key || i.dataset.num;
      if (!Number.isFinite(v)) return;
      if (k === 'resolution' && v <= 0) return; if (k === 'trailSize' && v <= 0) return;
      state.motion[k] = v; changed();
    });
  });
  panel.querySelector('#bg-reset').addEventListener('click', function () { var f = bg.fresh(); f.variant = state.variant; state.colors = f.colors; state.motion = f.motion; changed(); });
  var copy = panel.querySelector('#bg-copy');
  copy.addEventListener('click', function () { if (navigator.clipboard) navigator.clipboard.writeText(exported()).then(function () { copy.textContent = 'Kopiert'; setTimeout(function () { copy.textContent = 'Kopieren'; }, 1200); }); });
  function clamp() {
    var b = panel.getBoundingClientRect();
    ui.x = Math.max(8, Math.min(ui.x === null ? b.left : ui.x, innerWidth - b.width - 8));
    ui.y = Math.max(8, Math.min(ui.y === null ? b.top : ui.y, innerHeight - Math.min(b.height, 56) - 8));
    panel.style.left = ui.x + 'px'; panel.style.top = ui.y + 'px'; panel.style.right = panel.style.bottom = 'auto';
  }
  function setCollapsed() {
    body.hidden = ui.collapsed; collapse.setAttribute('aria-expanded', String(!ui.collapsed)); collapse.textContent = ui.collapsed ? 'Ausklappen' : 'Einklappen';
    if (ui.x !== null) { var b = panel.getBoundingClientRect(); if (ui.y + b.height > innerHeight - 8) ui.y = innerHeight - b.height - 8; clamp(); }
    saveUi();
  }
  collapse.addEventListener('click', function () { if (ui.x === null) { var b = panel.getBoundingClientRect(); ui.x = b.left; ui.y = b.top; } ui.collapsed = !ui.collapsed; setCollapsed(); });
  var drag = null;
  panel.addEventListener('pointerdown', function (e) {
    if (e.button !== 0 || e.target.closest('input,button,label,pre,output')) return;
    var b = panel.getBoundingClientRect(); drag = {id:e.pointerId, x:e.clientX - b.left, y:e.clientY - b.top};
    panel.setPointerCapture(e.pointerId); panel.classList.add('is-dragging'); e.preventDefault();
  });
  panel.addEventListener('pointermove', function (e) { if (!drag || e.pointerId !== drag.id) return; ui.x = e.clientX - drag.x; ui.y = e.clientY - drag.y; clamp(); });
  function end() { if (!drag) return; drag = null; panel.classList.remove('is-dragging'); saveUi(); }
  panel.addEventListener('pointerup', end); panel.addEventListener('pointercancel', end);
  window.addEventListener('resize', function () { if (ui.x !== null) { clamp(); saveUi(); } });
  if (ui.x !== null) clamp();
  setCollapsed(); sync();
})();
