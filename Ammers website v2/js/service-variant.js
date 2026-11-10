// Ammers website v2: services as three ovals, particle fills and the flowing background.

// Particle fill for panels: on hover/focus/tap, fine grain gathers from the pointer and densifies into the
// solid colour; on leave it dissolves the same way. The element's own background stays transparent; a canvas inside
// (clipped by the element's radius) paints the fill. `.pf-on` switches the content once the fill is mostly there.
window.pmParticleFill = (function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var touch = matchMedia('(hover: none)');
  function settings() {
    var m = window.pmFlowBackground && window.pmFlowBackground.state.motion || {};
    return {duration:Number.isFinite(m.pDuration) ? m.pDuration : 367, size:Number.isFinite(m.pSize) ? m.pSize : 1,
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
  var wrap = document.createElement('div'); wrap.className = 'service-ovals';
  groups.forEach(function (g, i) {
    var items = g.pick.map(function (p) { return all[p[0]] && all[p[0]][p[1]]; }).filter(Boolean);
    var oval = document.createElement('div');
    oval.className = 'service-oval'; oval.id = g.id; oval.tabIndex = 0; oval.setAttribute('role', 'group'); oval.setAttribute('aria-label', g.title);
    oval.innerHTML = g.anchors.map(function (a) { return '<span class="service-oval-anchor" id="' + a + '"></span>'; }).join('') +
      '<h3 class="service-oval-title">' + g.title + '</h3>' +
      '<span class="service-oval-hint mono" aria-hidden="true">Leistungen ansehen</span>' +
      '<ul class="service-oval-list">' + items.map(function (n) { return '<li><a href="' + url + '" target="_blank" rel="noopener">' + short(n) + '<span class="arr" aria-hidden="true">↗</span></a></li>'; }).join('') + '</ul>';
    wrap.append(oval);
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
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  // design.md Hintergrund/Fläche/Fläche tief, plus a deeper step towards the button colour. Accent from the other palette.
  var PALETTES = {
    // Brown: Lucas' tuned values, then 8 % darker (brightness dial -8, 10.11.2026).
    brown:{base:'#a17062',tone1:'#d5bcb0',tone2:'#c2a79a',tone3:'#c99b89',accent:'#d4a8af'},
    // Pink: Lucas' tuned values, then 6 % darker (brightness dial -6, 10.11.2026).
    pink:{base:'#e2d3d4',tone1:'#d7b6bd',tone2:'#bd9ca3',tone3:'#a27881',accent:'#d8c4ba'}
  };
  // Background movement per variant; layout and particle values are shared by both (SHARED).
  var SHARED = ['sideGutter','pDuration','pSize','pScatter','pSpread'];
  var MOTIONS = {
    // Brown: Lucas' tuned values from the dial, 10.11.2026.
    brown:{intensity:2.4,accentAmount:.18,softness:.585,sheen:.75,speed:.3,scale:3.6,warp:.76,parallax:1,
      displace:.08,trailSize:345,trailStrength:.45,trailDecay:.935,trailGrowth:2.38,scrollWaves:1.67,grain:.08,resolution:.99,
      sideGutter:13.25,pDuration:367,pSize:1,pScatter:.12,pSpread:.6},
    // Pink: Lucas' tuned values, 10.11.2026 (Formgröße 3.6 also used for brown).
    pink:{intensity:2.4,accentAmount:.18,softness:.585,sheen:.75,speed:.3,scale:3.6,warp:.76,parallax:1,
      displace:.08,trailSize:345,trailStrength:.45,trailDecay:.935,trailGrowth:2.38,scrollWaves:1.67,grain:.08,resolution:.99,
      sideGutter:13.25,pDuration:367,pSize:1,pScatter:.12,pSpread:.6}
  };
  var MOTION = MOTIONS.brown;
  function fresh() {
    var f = {variant:query.get('bg') === 'pink' ? 'pink' : 'brown',
      colors:{brown:Object.assign({},PALETTES.brown),pink:Object.assign({},PALETTES.pink)},
      motions:{brown:Object.assign({},MOTIONS.brown),pink:Object.assign({},MOTIONS.pink)}};
    f.motion = f.motions[f.variant]; return f;
  }
  var state = fresh();
  // Dial removed 10.11.2026: the approved values above are fixed; ?bg=pink shows the pink variant.

  var layer = document.createElement('div'); layer.className = 'flow-bg'; layer.setAttribute('aria-hidden','true');
  var canvas = document.createElement('canvas'), grain = document.createElement('div'); grain.className = 'flow-bg-grain';
  layer.append(canvas, grain); document.body.prepend(layer);
  function hex(h) { return [parseInt(h.slice(1,3),16)/255, parseInt(h.slice(3,5),16)/255, parseInt(h.slice(5,7),16)/255]; }
  // Side padding of all content except the hero (desktop only, see service-panels.css).
  function applyLayout() { document.documentElement.style.setProperty('--v2-side', Math.max(0, state.motion.sideGutter) + 'vw'); }
  applyLayout();
  var api_setVariant = function (v) { var prev = state.motion; state.variant = v; state.motion = state.motions[v]; SHARED.forEach(function (k) { state.motion[k] = prev[k]; }); };
  var api = {state:state, shared:SHARED, setVariant:function (v) { api_setVariant(v); }, defaults:{palettes:PALETTES, motions:MOTIONS}, fresh:fresh, apply:function () {}};
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
  function collectPanels() { panels = Array.from(document.querySelectorAll('.review,.voucher,.contact-panel,.hours,.about-panel,.course-panel')).filter(function (el) { return el.getBoundingClientRect().width > 240; }); }
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

  // Brown <-> pink follows the sections: pink for .services/.reviews/.theme-pink, brown elsewhere.
  // The share of pink sections in a band around the viewport centre is the target; the shown mix eases
  // towards it (time constant .9 s), so colours drift over softly instead of switching. ?bg=pink|brown fixes one.
  var forced = query.get('bg') === 'pink' ? 1 : query.get('bg') === 'brown' ? 0 : null;
  var mix = forced !== null ? forced : null, sections = [], lastBody = '';
  function collectSections() { sections = Array.from(document.querySelectorAll('main > section, .site-footer')).map(function (el) { return {el:el, pink:el.matches('.services,.reviews,.theme-pink')}; }); }
  collectSections();
  function mixTarget() {
    if (forced !== null) return forced;
    var c = innerHeight / 2, z = innerHeight * .35, a = c - z, b = c + z, pink = 0, all = 0;
    sections.forEach(function (sec) { var r = sec.el.getBoundingClientRect(), o = Math.max(0, Math.min(b, r.bottom) - Math.max(a, r.top)); all += o; if (sec.pink) pink += o; });
    return all ? pink / all : 0;
  }
  function blended() {
    var b = state.colors.brown, p = state.colors.pink, out = {};
    ['base','tone1','tone2','tone3','accent'].forEach(function (k) { var x = hex(b[k]), y = hex(p[k]); out[k] = [x[0] + (y[0] - x[0]) * mix, x[1] + (y[1] - x[1]) * mix, x[2] + (y[2] - x[2]) * mix]; });
    var css = 'rgb(' + out.base.map(function (v) { return Math.round(v * 255); }).join(',') + ')';
    if (css !== lastBody) { document.body.style.backgroundColor = css; lastBody = css; }
    return out;
  }
  function stepMix(dt) { var t = mixTarget(); if (mix === null) mix = t; else mix += (t - mix) * (1 - Math.exp(-dt / .9)); }
  api.apply = function () { applyLayout(); grain.style.opacity = state.motion.grain; stepMix(0); resize(); if (!running) render(0); };
  var time = 0, last = performance.now(), running = false;
  function render(dt) {
    var m = state.motion, c = blended(), f = dt * 60, r = canvas.width / Math.max(1, w);
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
    gl.uniform3fv(MU.uBase, c.base); gl.uniform3fv(MU.uC1, c.tone1); gl.uniform3fv(MU.uC2, c.tone2); gl.uniform3fv(MU.uC3, c.tone3); gl.uniform3fv(MU.uAcc, c.accent);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  function frame(ts) {
    if (!running) return;
    var dt = Math.min(.05, (ts - last) / 1000); last = ts;
    time += dt * state.motion.speed;
    stepMix(dt); trackMouse(); trackPanels(); render(dt);
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

// Photo frames: a 3 px gap is cut 3 px inside the edge of every photo (SVG mask), so the photo's own outer 3 px is its frame.
// Rounded rectangles use the element's radius; the course photos repeat their clip shape from css/service-panels.css.
(function () {
  var courses = document.querySelector('.courses'), mobile = matchMedia('(max-width:899px)');
  function px(expr) { if (!courses) return 0; var d = document.createElement('div'); d.style.cssText = 'position:absolute;visibility:hidden;height:0;width:' + expr; courses.append(d); var w = d.getBoundingClientRect().width; d.remove(); return w; }
  function A(r, x, y) { return ' A' + r + ' ' + r + ' 0 0 1 ' + x + ' ' + y; }
  function rect(W, H, r) { r = Math.min(r, W / 2, H / 2);
    return 'M' + r + ' 0 L' + (W - r) + ' 0' + A(r, W, r) + ' L' + W + ' ' + (H - r) + A(r, W - r, H) + ' L' + r + ' ' + H + A(r, 0, H - r) + ' L0 ' + r + A(r, r, 0) + 'Z'; }
  function course(odd, W, H, cw, f, r) {
    var a = cw * .76, b = cw * .942, fx = f * .628, fy = f * .778;
    return odd
      ? 'M' + r + ' 0 L' + (W - r) + ' 0' + A(r, W, r) + ' L' + W + ' ' + (H - r) + A(r, W - r, H) + ' L' + (a + f) + ' ' + H +
        ' Q' + a + ' ' + H + ' ' + (a - fx) + ' ' + (H - fy) + ' L' + fx + ' ' + (H - b + fy) + ' Q0 ' + (H - b) + ' 0 ' + (H - b - f) + ' L0 ' + r + A(r, r, 0) + 'Z'
      : 'M' + r + ' 0 L' + (W - a - f) + ' 0 Q' + (W - a) + ' 0 ' + (W - a + fx) + ' ' + fy + ' L' + (W - fx) + ' ' + (b - fy) +
        ' Q' + W + ' ' + b + ' ' + W + ' ' + (b + f) + ' L' + W + ' ' + (H - r) + A(r, W - r, H) + ' L' + r + ' ' + H + A(r, 0, H - r) + ' L0 ' + r + A(r, r, 0) + 'Z';
  }
  function targets() {
    var list = [];
    document.querySelectorAll('.strip figure,.contact-figure').forEach(function (el) { list.push({el:el}); });
    var about = document.querySelector('.about-figure'); if (about) list.push({el: mobile.matches ? about.querySelector('img') : about, other: mobile.matches ? about : about.querySelector('img')});
    if (courses) courses.querySelectorAll('.course').forEach(function (c, i) { var m = c.querySelector('.course-media'); if (m) list.push({el:m, course:i % 2 === 0 ? 'odd' : 'even'}); });
    return list;
  }
  function cut() {
    var w = 3, cw = px('var(--cw)'), f = px('var(--f)'), cr = px('var(--r)');
    targets().forEach(function (t) {
      if (t.other) { t.other.style.webkitMaskImage = t.other.style.maskImage = ''; t.other.classList.remove('pm-cut'); }
      var el = t.el; if (!el) return; var W = el.offsetWidth, H = el.offsetHeight; if (!W || !H) return;
      var d = t.course ? course(t.course === 'odd', W, H, cw, f, cr) : rect(W, H, parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0);
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none"><defs><mask id="c" maskUnits="userSpaceOnUse" x="0" y="0" width="' + W + '" height="' + H + '"><path d="' + d + '" fill="#fff"/>' +
        '<path d="' + d + '" fill="none" stroke="#000" stroke-width="' + 4 * w + '"/><path d="' + d + '" fill="none" stroke="#fff" stroke-width="' + 2 * w + '"/></mask></defs>' +
        '<rect width="' + W + '" height="' + H + '" fill="#000" mask="url(#c)"/></svg>';   // luminance mask inside the SVG -> alpha for CSS
      var url = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
      el.classList.add('pm-cut'); el.style.webkitMaskImage = url; el.style.maskImage = url;
    });
  }
  var queued = false; function schedule() { if (!queued) { queued = true; requestAnimationFrame(function () { queued = false; cut(); }); } }
  cut();
  if ('ResizeObserver' in window) { var ro = new ResizeObserver(schedule); targets().forEach(function (t) { ro.observe(t.el); if (t.other) ro.observe(t.other); }); }
  addEventListener('resize', schedule); mobile.addEventListener('change', schedule); if (document.fonts) document.fonts.ready.then(schedule);
  addEventListener('load', schedule);
})();

// Courses drift together when the section is reached and apart when it is left (css/service-panels.css, like the vouchers in js/main.js).
(function () {
  var c = document.querySelector('.courses'); if (!c) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { c.classList.add('together'); return; }
  new IntersectionObserver(function (e) { c.classList.toggle('together', e[0].isIntersecting); }, {threshold:.35}).observe(c);
})();

// Course panels (desktop): the whole panel books via Instagram DM; on hover it fills like the ovals (css/service-panels.css).
(function () {
  if (!matchMedia('(min-width:900px)').matches || !window.pmParticleFill) return;
  var panels = Array.from(document.querySelectorAll('.course-panel'));
  panels.forEach(function (p) {
    var btn = p.querySelector('.course-content > .btn'), a = document.createElement('a');
    a.className = 'course-book'; a.href = btn ? btn.href : 'https://www.instagram.com/pm_beauty___/'; a.target = '_blank'; a.rel = 'noopener';
    var t = p.querySelector('h3'); a.setAttribute('aria-label', 'Per DM buchen' + (t ? ': ' + t.textContent.trim() : ''));
    a.innerHTML = '<span>Per DM buchen<span class="arr" aria-hidden="true">↗</span></span>';
    p.append(a);
    window.pmParticleFill.attach(p, {group:panels});
  });
})();
