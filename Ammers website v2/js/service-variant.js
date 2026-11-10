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

// Reveal panels (ovals, gallery, text panels): at rest only frame and a short title; hover, keyboard focus or a first tap
// turns them solid and shows the full info (.is-open, css/service-panels.css). No spin.
window.pmFlip = function (list) {
  var touch = matchMedia('(hover: none)');
  function close(el) { el.classList.remove('is-open'); }
  function open(el) { list.forEach(function (x) { if (x !== el) close(x); }); if (el) el.classList.add('is-open'); }
  list.forEach(function (el) {
    el.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch') open(el); });
    el.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch') close(el); });
    el.addEventListener('focusin', function () { if (el.matches(':focus-visible') || el.querySelector(':focus-visible')) open(el); });
    el.addEventListener('focusout', function (e) { if (!el.contains(e.relatedTarget) && !el.matches(':hover')) close(el); });
    el.addEventListener('click', function (e) { if (touch.matches && !el.classList.contains('is-open')) { e.preventDefault(); open(el); } });
  });
  document.addEventListener('click', function (e) { if (touch.matches && !list.some(function (x) { return x.contains(e.target); })) open(null); });
  return {open:open, close:close};
};

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
  // Frame and title at rest; hover, focus or a tap turns the oval solid with its services (window.pmFlip).
  var flip = window.pmFlip(ovals);
  function fromHash(id) { var t = document.getElementById(id); var o = t && t.closest('.service-oval'); if (o) flip.open(o); }
  document.querySelectorAll('[data-open]').forEach(function (a) { a.addEventListener('click', function () { fromHash(a.dataset.open); }); });
  if (location.hash) fromHash(location.hash.slice(1));
})();

// Gallery below the hero: the photo's outer 3 px stay as its frame, the inner photo flips to a light panel with one word.
(function () {
  'use strict';
  var figures = Array.from(document.querySelectorAll('.results .strip figure')).filter(function (f) { return f.querySelector('.strip-label'); });
  figures.forEach(function (f) {
    var img = f.querySelector('img'), label = f.querySelector('.strip-label');
    var inner = document.createElement('div'); inner.className = 'fl-inner'; inner.setAttribute('aria-hidden', 'true');
    var front = document.createElement('div'); front.className = 'fl-face fl-front';
    var copy = img.cloneNode(); copy.removeAttribute('loading'); copy.alt = ''; copy.style.objectPosition = getComputedStyle(img).objectPosition; front.append(copy);
    var back = document.createElement('div'); back.className = 'fl-face fl-back'; back.append(label.cloneNode(true));
    inner.append(front, back); f.append(inner); label.classList.add('sr-only'); f.tabIndex = 0;
  });
  window.pmFlip(figures);
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
  // Each neighbouring section alternates, starting with brown for the hero.
  // Share this assignment with the header and the floating booking button.
  var sections = Array.from(document.querySelectorAll('main > section, .site-footer')).map(function (el,i) {
    var pink = i % 2 === 1; el.dataset.flowTheme = pink ? 'pink' : 'brown';
    return {el:el,pink:pink};
  });
  var forced = query.get('bg') === 'pink' ? 1 : query.get('bg') === 'brown' ? 0 : null;
  function mixTarget() {
    if (forced !== null) return forced;
    if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 2) return sections[sections.length-1].pink ? 1 : 0;
    var center = innerHeight / 2;
    for (var i = 0; i < sections.length; i++) {
      var rect = sections[i].el.getBoundingClientRect();
      if (rect.top <= center && rect.bottom > center) return sections[i].pink ? 1 : 0;
    }
    return 0;
  }
  // design.md Hintergrund/Fläche/Fläche tief, plus a deeper step towards the button colour. Accent from the other palette.
  var PALETTES = {
    // Brown and Pink: Lucas' dial values, 10.11.2026 (evening).
    brown:{base:'#744334',tone1:'#896b5d',tone2:'#6f594d',tone3:'#543327',accent:'#d4a8af'},
    pink:{base:'#825558',tone1:'#915f69',tone2:'#8b656e',tone3:'#754851',accent:'#d8c4ba'}
  };
  // Background movement per variant; layout and particle values are shared by both (SHARED).
  var SHARED = ['sideGutter','pDuration','pSize','pScatter','pSpread'];
  var MOTIONS = {
    // Lucas' dial values, 10.11.2026 (evening).
    brown:{intensity:.33,accentAmount:.18,softness:.6,sheen:.08,sheenHover:.6,speed:.3,scale:3.55,warp:1.02,parallax:1,
      displace:.08,trailSize:345,trailStrength:.45,trailDecay:.935,trailGrowth:2.38,scrollWaves:1.67,grain:.08,resolution:.99,
      sideGutter:13.25,pDuration:367,pSize:1,pScatter:.12,pSpread:.6},
    pink:{intensity:2.4,accentAmount:.18,softness:.585,sheen:.08,sheenHover:.75,speed:.3,scale:3.6,warp:.76,parallax:1,
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
    api.apply = function () { applyLayout(); var c = state.colors[mixTarget() ? 'pink' : 'brown']; grain.style.opacity = state.motion.grain;
      layer.style.background = 'radial-gradient(70% 60% at 25% 30%,' + c.tone2 + ',transparent),radial-gradient(60% 70% at 80% 75%,' + c.tone1 + ',transparent),' + c.base;
      document.body.style.backgroundColor = c.base; };
    window.addEventListener('scroll',api.apply,{passive:true});
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
       'uniform vec2 uRes;uniform float uTime,uScroll,uIntensity,uAccent,uSoft,uSheen,uSheenH,uScale,uWarp,uDisp2;',
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
       '  float sh=mix(uSheen,uSheenH,smoothstep(.02,.35,d));',
       // sheen: rest value everywhere, hover value where the mouse trail is (d = trail strength)
       '  col=mix(col,vec3(1.),clamp(rim*sh*.3,0.,.6));',
       '  col+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)/255.;',
       '  gl_FragColor=vec4(col,1.);}'].join('\n'));
  } catch (e) { console.warn('flow background', e); return fallback(); }

  var quad = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  var SU = uniforms(spriteProg, ['uRes','uCenter','uSize','uRot','uBrush','uAlpha']);
  var MU = uniforms(mainProg, ['uDisp','uRes','uTime','uScroll','uIntensity','uAccent','uSoft','uSheen','uSheenH','uScale','uWarp','uDisp2','uBase','uC1','uC2','uC3','uAcc']);
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

  // The section at the viewport centre sets the target, including short sections.
  // The displayed colour still eases towards it with the existing .9 s time constant.
  var mix = forced !== null ? forced : null, lastBody = '';
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
    gl.uniform1f(MU.uSheen, m.sheen); gl.uniform1f(MU.uSheenH, m.sheenHover === undefined ? m.sheen : m.sheenHover); gl.uniform1f(MU.uScale, m.scale); gl.uniform1f(MU.uWarp, m.warp); gl.uniform1f(MU.uDisp2, m.displace);
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
  window.addEventListener('scroll', function () { if (!running) { mix = mixTarget(); render(0); } }, {passive:true});
  window.addEventListener('resize', function () { resize(); if (!running) render(0); });
  api.apply(); setRunning();
})();

// Photos have no cut gap any more (10.11.2026): they are plain; gallery photos get the near-white frame from CSS.

// Courses drift together when the section is reached and apart when it is left (css/service-panels.css, like the vouchers in js/main.js).
(function () {
  var c = document.querySelector('.courses'); if (!c) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { c.classList.add('together'); return; }
  new IntersectionObserver(function (e) { c.classList.toggle('together', e[0].isIntersecting); }, {threshold:.35}).observe(c);
})();

// Text panels: at rest only the frame and a short title in near-white; hover/focus/tap turns them solid and shows everything.
(function () {
  if (!window.pmFlip) return;
  var desktop = matchMedia('(min-width:900px)').matches, all = [];
  // Keep the detail layout fixed; only the title travels by half the detail height.
  var titleSizes = new ResizeObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.closest('.hv').style.setProperty('--hv-title-shift', (entry.target.getBoundingClientRect().height / 2) + 'px');
    });
  });
  function sum(html) { var s = document.createElement('div'); s.className = 'hv-sum'; s.setAttribute('aria-hidden', 'true'); s.innerHTML = html; return s; }
  function make(el, html, dup) {
    var det = document.createElement('div'), inn = document.createElement('div'), layer = document.createElement('div');
    det.className = 'hv-det'; inn.className = 'hv-det-in'; layer.className = 'hv-layer';
    while (el.firstChild) inn.append(el.firstChild);
    if (dup) inn.querySelectorAll(dup).forEach(function (d) { d.classList.add('hv-dup'); });
    det.append(inn); layer.append(sum(html), det);
    var ghost = layer.cloneNode(true); ghost.classList.add('hv-ghost'); ghost.setAttribute('inert', ''); ghost.setAttribute('aria-hidden', 'true');
    ghost.querySelectorAll('[id]').forEach(function (n) { n.removeAttribute('id'); });
    el.append(layer, ghost); el.classList.add('hv'); if (!el.matches('a,button')) el.tabIndex = 0; all.push(el);
    titleSizes.observe(det);
  }
  var t = function (s) { return '<span class="hv-t">' + s + '</span>'; }, s2 = function (s) { return '<span class="hv-s">' + s + '</span>'; };
  document.querySelectorAll('.voucher').forEach(function (v) {
    var ic = v.querySelector('.voucher-ic'), am = v.querySelector('.amount');
    make(v, (ic ? ic.outerHTML : '') + t(am ? am.innerHTML : 'Gutschein'), '.voucher-top,.amount');
  });
  var names = ['Korean Lashlift', 'Russian Manicure'];
  document.querySelectorAll('.course-panel').forEach(function (p, i) { make(p, t(names[i] || (p.querySelector('h3') || {}).textContent || ''), '.course-heading'); });
  // single reviews stay plainly visible (frame + text, no hover); only "Alle Bewertungen" reveals
  document.querySelectorAll('.review-all').forEach(function (r) { make(r, t('5.0 ★') + s2('Alle Bewertungen'), '.eyebrow,.review-all-score'); });
  var c = document.querySelector('.contact-facts'); if (c) make(c, t('Adresse'));
  c = document.querySelector('.hours'); if (c) make(c, t('Öffnungszeiten'), '.eyebrow');
  c = document.querySelector('.about-panel'); if (c && desktop) make(c, t('Über mich'), '.eyebrow');
  window.pmFlip(all);
})();

// Small ink islands grow into headings on one shared GPU layer; no live SVG filters.
(function () {
  var motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  var targets = Array.from(document.querySelectorAll('.hv-layer:not(.hv-ghost) .hv-t,.service-oval-title,main h1,main h2')).filter(function (el) {
    return !el.matches('.sr-only,.hv-dup') && !el.closest('.hv-ghost,.hv-det,[hidden]');
  });
  if (!targets.length) return;
  var stage = document.createElement('canvas'), gl = stage.getContext('webgl',{alpha:true,antialias:false,depth:false,stencil:false,premultipliedAlpha:true});
  if (!gl) return;
  function shader(type,source) {
    var s = gl.createShader(type); gl.shaderSource(s,source); gl.compileShader(s);
    return gl.getShaderParameter(s,gl.COMPILE_STATUS) ? s : null;
  }
  var vertex = shader(gl.VERTEX_SHADER,[
    'attribute vec2 aPos; uniform vec4 uRect; uniform vec2 uViewport,uUV; uniform float uProgress; varying vec2 vUV;',
    'void main(){float e=1.-(1.-uProgress)*(1.-uProgress);',
    'vec2 grow=vec2(.82+.18*e,.12+.88*e);',
    'vec2 point=uRect.xy+((aPos-.5)*grow+.5)*uRect.zw;',
    'gl_Position=vec4(point.x/uViewport.x*2.-1.,1.-point.y/uViewport.y*2.,0.,1.);vUV=aPos*uUV;}'
  ].join('\n'));
  var fragment = shader(gl.FRAGMENT_SHADER,[
    'precision highp float; uniform sampler2D uText; uniform float uProgress; varying vec2 vUV;',
    'void main(){float p=uProgress;float e=1.-(1.-p)*(1.-p);float bias=4.2*pow(1.-p,1.4)+log2(.12+.88*e);',
    'vec4 ink=texture2D(uText,vUV,bias);vec4 sharp=texture2D(uText,vUV);',
    'float edge=.22*(1.-p)+.015;float alpha=smoothstep(edge,edge+.08,ink.a);',
    'alpha=mix(alpha,sharp.a,smoothstep(.45,.9,p))*smoothstep(0.,.07,p);',
    'vec3 color=ink.rgb/max(ink.a,.0001);',
    'color=mix(color,sharp.rgb/max(sharp.a,.0001),smoothstep(.5,.9,p)*step(.005,sharp.a));',
    'gl_FragColor=vec4(color*alpha,alpha);}'
  ].join('\n'));
  if (!vertex || !fragment) return;
  var program = gl.createProgram(); gl.attachShader(program,vertex); gl.attachShader(program,fragment); gl.linkProgram(program);
  if (!gl.getProgramParameter(program,gl.LINK_STATUS)) return;
  gl.deleteShader(vertex); gl.deleteShader(fragment); gl.useProgram(program);
  var buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),gl.STATIC_DRAW);
  var position = gl.getAttribLocation(program,'aPos'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  var rectU = gl.getUniformLocation(program,'uRect'), viewportU = gl.getUniformLocation(program,'uViewport'), uvU = gl.getUniformLocation(program,'uUV'), progressU = gl.getUniformLocation(program,'uProgress');
  gl.uniform1i(gl.getUniformLocation(program,'uText'),0); gl.activeTexture(gl.TEXTURE0);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
  // Compile the GPU draw path before a visible title begins to grow.
  var warm = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,warm);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(4));
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
  gl.uniform2f(viewportU,1,1); gl.uniform2f(uvU,1,1); gl.uniform4f(rectU,0,0,1,1); gl.uniform1f(progressU,1);
  gl.viewport(0,0,1,1); gl.drawArrays(gl.TRIANGLES,0,6); gl.finish(); gl.deleteTexture(warm);
  stage.className = 'ink-stage'; stage.setAttribute('aria-hidden','true'); stage.hidden = true; document.body.append(stage);
  var jobs = [], frame = 0, ratio = 1;
  function clamp(p) { return Math.max(0,Math.min(1,p)); }
  function resize() { ratio = Math.min(devicePixelRatio || 1,2); stage.width = Math.round(innerWidth*ratio); stage.height = Math.round(innerHeight*ratio); }
  resize(); targets.forEach(function (el) { el.classList.add('ink-pending'); });
  function finish(job) {
    job.source.replaceWith.apply(job.source,Array.from(job.source.childNodes));
    job.lines.forEach(function (line) { gl.deleteTexture(line.texture); });
    job.el.classList.remove('ink-forming','ink-pending');
    if (job.interactive) { job.interactive.removeEventListener('pointerenter',job.stop); job.interactive.removeEventListener('focusin',job.stop); }
  }
  function paintInk(now) {
    frame = 0; gl.viewport(0,0,stage.width,stage.height); gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program); gl.uniform2f(viewportU,innerWidth,innerHeight);
    jobs = jobs.filter(function (job) {
      var rect = job.el.getBoundingClientRect();
      job.lines.forEach(function (line,index) {
        var p = clamp((now-job.start-index*90)/780);
        gl.bindTexture(gl.TEXTURE_2D,line.texture); gl.uniform1f(progressU,p);
        gl.uniform2f(uvU,line.uvX,line.uvY);
        gl.uniform4f(rectU,rect.left+line.x,rect.top+line.y,line.width,line.height); gl.drawArrays(gl.TRIANGLES,0,6);
      });
      var last = (now-job.start-(job.lines.length-1)*90)/780;
      job.source.style.opacity = clamp((last-.9)/.1);
      if (last >= 1) { finish(job); return false; }
      return true;
    });
    stage.hidden = !jobs.length;
    if (jobs.length) frame = requestAnimationFrame(paintInk);
  }
  function form(el) {
    if (el.closest('.hv.is-open,.service-oval.is-open')) { el.classList.remove('ink-pending'); return; }
    var source = document.createElement('span'); source.className = 'ink-source';
    while (el.firstChild) source.append(el.firstChild);
    el.append(source);
    var walker = document.createTreeWalker(source,NodeFilter.SHOW_TEXT), node, rows = [];
    while ((node = walker.nextNode())) for (var i = 0; i < node.length; i++) {
      if (!node.textContent[i].trim()) continue;
      var range = document.createRange(); range.setStart(node,i); range.setEnd(node,i+1);
      var rect = range.getBoundingClientRect(); if (!rect.width || !rect.height) continue;
      var row = rows[rows.length-1];
      if (!row || Math.abs(row.top-rect.top) > 2) { row = {top:rect.top,range:range,runs:[]}; rows.push(row); }
      else row.range.setEnd(node,i+1);
      var run = row.runs[row.runs.length-1];
      if (run && run.node === node && run.end === i) run.end = i+1;
      else row.runs.push({node:node,start:i,end:i+1});
    }
    var origin = el.getBoundingClientRect(), padding = 12;
    var lines = rows.map(function (row) {
      var bounds = row.range.getBoundingClientRect(), width = bounds.width+padding*2, height = bounds.height+padding*2;
      var canvas = document.createElement('canvas');
      canvas.width = Math.pow(2,Math.ceil(Math.log2(Math.max(2,width*ratio)))); canvas.height = Math.pow(2,Math.ceil(Math.log2(Math.max(2,height*ratio))));
      var ctx = canvas.getContext('2d'); ctx.scale(ratio,ratio); ctx.textBaseline = 'alphabetic';
      row.runs.forEach(function (run) {
        var style = getComputedStyle(run.node.parentElement), range = document.createRange(); range.setStart(run.node,run.start); range.setEnd(run.node,run.end);
        var rect = range.getBoundingClientRect(), text = run.node.textContent.slice(run.start,run.end);
        ctx.font = style.fontStyle+' '+style.fontWeight+' '+style.fontSize+' '+style.fontFamily;
        ctx.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing; ctx.fontKerning = style.fontKerning;
        ctx.fillStyle = style.color;
        var ascent = ctx.measureText(text).fontBoundingBoxAscent;
        ctx.fillText(text,padding+rect.left-bounds.left,padding+rect.top-bounds.top+ascent);
      });
      var texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,texture);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,canvas); gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      return {texture:texture,x:bounds.left-origin.left-padding,y:bounds.top-origin.top-padding,width:width,height:height,uvX:width*ratio/canvas.width,uvY:height*ratio/canvas.height};
    });
    var job = {el:el,source:source,lines:lines,start:performance.now(),interactive:el.closest('.hv,.service-oval')};
    if (!lines.length) { finish(job); return; }
    job.stop = function () {
      jobs = jobs.filter(function (other) { return other !== job; }); finish(job);
      if (!jobs.length) { if (frame) cancelAnimationFrame(frame); frame = 0; stage.hidden = true; }
    };
    if (job.interactive) { job.interactive.addEventListener('pointerenter',job.stop); job.interactive.addEventListener('focusin',job.stop); }
    el.classList.remove('ink-pending'); el.classList.add('ink-forming');
    if (!jobs.length) { gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT); }
    jobs.push(job); stage.hidden = false;
    if (!frame) frame = requestAnimationFrame(paintInk);
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.intersectionRatio >= .7) { observer.unobserve(entry.target); form(entry.target); } });
  },{threshold:.7,rootMargin:'0px 0px -6% 0px'});
  var ready = document.fonts ? Promise.race([document.fonts.ready,new Promise(function (resolve) { setTimeout(resolve,1200); })]) : Promise.resolve();
  ready.then(function () { if (!motion.matches) targets.forEach(function (el) { observer.observe(el); }); });
  function settle() { if (frame) cancelAnimationFrame(frame); frame = 0; jobs.forEach(finish); jobs = []; stage.hidden = true; }
  window.addEventListener('resize',function () { settle(); resize(); });
  if (document.fonts) document.fonts.addEventListener('loadingdone',settle);
  motion.addEventListener('change',function () { if (motion.matches) { observer.disconnect(); settle(); targets.forEach(function (el) { el.classList.remove('ink-pending'); }); } });
})();
