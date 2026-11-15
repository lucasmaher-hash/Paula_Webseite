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
  var booking = section.querySelector('.section-head .btn') || document.querySelector('.fab[href*="beautinda"]');   // the head button may be gone; the booking FAB has the same link
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
  // Design the open layout first. Only the title travels from the closed centre to its final position.
  var titleSizes = new ResizeObserver(function (entries) {
    new Set(entries.map(function (entry) { return entry.target.closest('.hv'); })).forEach(function (panel) {
      var layer = panel.querySelector('.hv-layer:not(.hv-ghost)'), title = layer.querySelector('.hv-sum'), detail = layer.querySelector('.hv-det');
      panel.style.setProperty('--hv-title-shift', (detail.getBoundingClientRect().height / 2) + 'px');
      panel.style.setProperty('--hv-title-shift-x', Math.max(0,(detail.getBoundingClientRect().width-title.getBoundingClientRect().width)/2) + 'px');
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
    titleSizes.observe(det); titleSizes.observe(layer.querySelector('.hv-sum'));
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

// Lucas' four grid shapes (IMG_0370): 12 px seams like the contact frames, one shared corner radius.
(function () {
  var grid = document.querySelector('.reviews-grid');
  if (!grid) return;
  var reviews = Array.from(grid.querySelectorAll('article.review')), link = grid.querySelector('.review-all');
  if (reviews.length < 3 || !link) return;
  var mosaic = document.createElement('div'); mosaic.className = 'reviews-mosaic';
  grid.prepend(mosaic); grid.classList.add('has-review-mosaic');
  // Eyebrow, hidden heading and score move with the mosaic so they can sit in its top-left hollow.
  var badge = grid.parentElement.querySelector(':scope>.rating-badge'), head = null;
  if (badge) {
    head = document.createElement('div'); head.className = 'reviews-head';
    Array.from(grid.parentElement.children).filter(function (el) { return el.matches('.eyebrow,#reviews-heading,.rating-badge'); }).forEach(function (el) { head.append(el); });
    grid.prepend(head);
  }
  // Longest quote in the tallest shape, shortest under the bottom diagonal, so no line runs into a cut.
  var cards = [reviews[2], reviews[0], link, reviews[1]];
  cards.forEach(function (card) { mosaic.append(card); });
  // Retain the fourth real quote in the source, outside the requested three-quote composition.
  reviews.slice(3).forEach(function (card) { card.hidden = true; card.setAttribute('data-review-unplaced', ''); });
  var defs = [
    {w:7,h:8,p:[[2,0],[7,0],[7,8],[0,8],[0,3]]},
    {w:9,h:6,p:[[0,0],[6,0],[9,2],[9,6],[0,6]]},
    {w:13,h:7,p:[[0,0],[13,0],[13,7],[2,7],[0,5]]},
    {w:8,h:6,p:[[0,0],[6-Math.SQRT2,0],[8,2+Math.SQRT2],[8,6],[0,6]]}
  ];
  var paths = cards.map(function (card, i) {
    if (card !== link) {
      var content = document.createElement('div'); content.className = 'review-shape-content';
      while (card.firstChild) content.append(card.firstChild);
      card.append(content);
    }
    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.classList.add('review-shape'); svg.setAttribute('aria-hidden','true');
    var path = document.createElementNS(svg.namespaceURI,'path'); svg.append(path); card.prepend(svg);
    return path;
  });
  // Desktop: shapes keep their sketch size in cells s, but every seam is the panel gap g
  // (same 12 px as the contact frames below). The diagonal seam is measured normal to both edges.
  var wide = matchMedia('(min-width:1000px)'), SQ = Math.SQRT2;
  function gap() { return parseFloat(getComputedStyle(mosaic).getPropertyValue('--frame-space')) || 12; }
  function cellSize() { return wide.matches ? (mosaic.clientWidth-gap())/20 : mosaic.clientWidth/9; }
  function desk(s,g) {
    return [
      {x:0,y:3*s,w:7*s,h:8*s,p:[[2*s,0],[7*s,0],[7*s,8*s],[0,8*s],[0,3*s]]},
      {x:7*s+g,y:0,w:9*s,h:6*s,p:[[0,0],[6*s,0],[9*s,2*s],[9*s,6*s],[0,6*s]]},
      {x:7*s+g,y:6*s+g,w:13*s,h:7*s,p:[[0,0],[13*s,0],[13*s,7*s],[2*s,7*s],[0,5*s]]},
      {x:2*s,y:11*s+g,w:8*s,h:6*s,p:[[0,0],[5*s+g*(1-SQ),0],[8*s,3*s+g*(SQ-1)],[8*s,6*s],[0,6*s]]}
    ];
  }
  function layout() {
    if (!wide.matches) { mosaic.style.height = ''; cards.forEach(function (c) { c.style.left = c.style.top = c.style.width = c.style.height = ''; }); return null; }
    var s = cellSize(), g = gap(), L = desk(s,g);
    mosaic.style.height = (17*s+g)+'px';
    cards.forEach(function (c,i) { c.style.left = L[i].x+'px'; c.style.top = L[i].y+'px'; c.style.width = L[i].w+'px'; c.style.height = L[i].h+'px'; });
    return L;
  }
  var placed = null;
  function vertices(i) {
    if (placed) return placed[i].p;
    var box = cards[i].getBoundingClientRect(), def = defs[i];
    return def.p.map(function (p) { return [p[0]/def.w*box.width,p[1]/def.h*box.height]; });
  }
  function corners(points) {
    return points.map(function (p,i) {
      var a = points[(i+points.length-1)%points.length], b = points[(i+1)%points.length];
      var al = Math.hypot(a[0]-p[0],a[1]-p[1]), bl = Math.hypot(b[0]-p[0],b[1]-p[1]);
      var u = [(a[0]-p[0])/al,(a[1]-p[1])/al], v = [(b[0]-p[0])/bl,(b[1]-p[1])/bl];
      var tan = Math.tan(Math.acos(Math.max(-1,Math.min(1,u[0]*v[0]+u[1]*v[1])))/2);
      return {p:p,u:u,v:v,tan:tan,limit:Math.min(al,bl)*.48*tan};
    });
  }
  // r is the radius of the right-angled corners. Blunt corners (at the diagonal cuts) get a larger radius,
  // r * tan(half angle)^.75 (about 1.9 r at 135 degrees), so they read as rounded too; each stays within its own limit.
  function rounded(cs,r) {
    var ends = cs.map(function (c) { var ri = r ? Math.min(r*Math.pow(Math.max(1,c.tan),.75), c.limit) : 0, t = ri ? ri/c.tan : 0;
      return {r:ri,a:[c.p[0]+c.u[0]*t,c.p[1]+c.u[1]*t],b:[c.p[0]+c.v[0]*t,c.p[1]+c.v[1]*t]};
    });
    return ends.map(function (c,i) { return (i?'L':'M')+c.a.join(',')+(c.r?' A'+c.r+','+c.r+' 0 0 1 '+c.b.join(','):''); }).join(' ')+' Z';
  }
  // Inset the outlined link by half its stroke so its visible edge stays on the grid.
  function inset(points,d) {
    return corners(points).map(function (c) {
      var bis = [c.u[0]+c.v[0],c.u[1]+c.v[1]], len = Math.hypot(bis[0],bis[1]);
      var sin = Math.sqrt((1-(c.u[0]*c.v[0]+c.u[1]*c.v[1]))/2);
      return [c.p[0]+bis[0]/len*d/sin,c.p[1]+bis[1]/len*d/sin];
    });
  }
  // Same corner radius as the contact frames below: 46 sketch units there (js/contact-shapes.js sets --u),
  // otherwise the plain contact card radius (phone, where the contact shapes are off).
  function cardRadius() {
    var cg = document.querySelector('.contact-grid'), u = cg && parseFloat(cg.style.getPropertyValue('--u'));
    if (u) return 46*u;
    var card = document.querySelector('.contact .hours');
    return card ? parseFloat(getComputedStyle(card).borderTopLeftRadius) || 0 : 0;
  }
  window.pmShape = {corners: corners, rounded: rounded, inset: inset, radius: cardRadius};
  // Heading and score sit in the hollow above the left shape, left of the top shape.
  function placeHead(s) {
    if (!head) return;
    if (!placed) { head.style.left = head.style.top = head.style.width = head.style.height = ''; return; }
    var inset = mosaic.getBoundingClientRect().left - grid.getBoundingClientRect().left;
    head.style.left = '0px'; head.style.top = '0px';
    head.style.width = (inset + 7*s) + 'px'; head.style.height = (3*s - gap()) + 'px';
  }
  function draw() {
    // Below the breakpoint the quotes no longer fit their shapes, so the cards stack (same breakpoint as the CSS).
    placed = layout();
    var cell = cellSize();
    var sets = cards.map(function (_,i) { var p = vertices(i); return corners(i===2?inset(p,1.5):p); });
    var r = Math.min(cardRadius(),...sets.flat().map(function (c) { return c.limit; }));
    sets.forEach(function (cs,i) {
      paths[i].setAttribute('d',rounded(cs,r));
      // Solid cards have the same visible path as their SVG; content stays in the safe rectangle.
      cards[i].style.clipPath = 'path("'+rounded(corners(vertices(i)),r+(i===2?1.5:0))+'")';
    });
    mosaic.style.setProperty('--review-cell',cell+'px'); grid.style.setProperty('--review-cell',cell+'px');
    placeHead(cell);
  }
  // Two frames later, so the contact shapes have set their unit first.
  var raf = 0; function later() { cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { raf = requestAnimationFrame(draw); }); }
  var ro = new ResizeObserver(later); [mosaic].concat(cards).forEach(function (el) { ro.observe(el); });
  var contactGrid = document.querySelector('.contact-grid'); if (contactGrid) ro.observe(contactGrid);
  window.addEventListener('load', later);
  draw();
})();

// Assemble and drift (Lucas, 10.11.2026, reference vivmgmt.com): when a group of panels comes into view, the seams between stacked items
// start at about five times the normal gap and close as the group reaches its place. Afterwards the columns drift
// slightly up and down against each other while scrolling, vertically only. Uses the CSS `translate` property, so the
// existing transforms (reveal, hover flips) stay untouched. Desktop only; off with reduced motion.
(function () {
  'use strict';
  var mq = matchMedia('(min-width:900px)'), reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var specs = [
    {group: '.results .strip', items: ':scope>figure', drift: 56, stagger: 60},
    {group: '.about-grid', items: ':scope>.about-figure,:scope>.about-panel', drift: 36, stagger: 48, rest: 25},
    {group: '.service-ovals', items: ':scope>.service-oval', drift: 36, stagger: 48},   // after Lucas' sketch: left far higher, right a little higher than the middle
    {group: '.courses', items: ':scope>.course>.course-media,:scope>.course>.course-panel,:scope>.course-intro', drift: 36, stagger: 48},
    {group: '.vouchers-grid', items: ':scope>.voucher', drift: 36, stagger: 48},
    {group: '.reviews-grid', items: ':scope>.reviews-head,:scope>.reviews-mosaic>.review', drift: 24, stagger: 48},
    {group: '.contact-grid', items: ':scope>*', drift: 36, stagger: 48}
  ];
  var groups = [], raf = 0, last = 0, settled = false;
  function abs(el) { var x = 0, y = 0; for (var e = el; e; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; } return [x, y]; }
  // Rank = length of the longest chain of items fully before this one (left of it, or above it).
  function ranks(boxes, a, b) {
    var order = boxes.map(function (_, i) { return i; }).sort(function (i, j) { return boxes[i][a] - boxes[j][a]; }), r = [];
    order.forEach(function (i) {
      r[i] = 0;
      order.forEach(function (j) { if (r[j] !== undefined && j !== i && boxes[j][b] <= boxes[i][a] + 1) r[i] = Math.max(r[i], r[j] + 1); });
    });
    return r;
  }
  // Column clusters: items whose horizontal extents overlap (stacked, or interlocking along a diagonal) are joined and
  // always move together; different clusters are separated horizontally, so moving them vertically never makes them overlap.
  // Returns the cluster index (left to right) per item. A group that forms one cluster breathes instead.
  function clusters(boxes) {
    var id = boxes.map(function (_, i) { return i; });
    function root(i) { while (id[i] !== i) i = id[i] = id[id[i]]; return i; }
    boxes.forEach(function (a, i) { boxes.forEach(function (b, j) { if (j > i && a.l < b.r - 1 && b.l < a.r - 1) id[root(j)] = root(i); }); });
    var roots = [], left = {};
    boxes.forEach(function (b, i) { var r = root(i); if (!(r in left)) { left[r] = b.l; roots.push(r); } else left[r] = Math.min(left[r], b.l); });
    roots.sort(function (a, b) { return left[a] - left[b]; });
    return boxes.map(function (_, i) { return roots.indexOf(root(i)); });
  }
  function measure() {
    groups = [];
    if (!mq.matches || reduce.matches) return;
    specs.forEach(function (s) {
      var g = document.querySelector(s.group); if (!g || !g.offsetParent) return;
      var items = Array.from(g.querySelectorAll(s.items)).filter(function (el) { return el.offsetParent && !el.hidden; });
      if (items.length < 2) return;
      var boxes = items.map(function (el) { var p = abs(el); return {l: p[0], t: p[1], r: p[0] + el.offsetWidth, b: p[1] + el.offsetHeight}; });
      var rx = clusters(boxes), ry = ranks(boxes, 't', 'b');
      var mx = Math.max.apply(null, rx), my = Math.max.apply(null, ry);
      var gap = parseFloat(getComputedStyle(g).columnGap) || parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--frame-space')) || 12;
      groups.push({el: g, spec: s, items: items.map(function (el, i) {
        return {el: el, i: i, sy: (ry[i] - my / 2) * 4 * gap, row: ry[i] - my / 2, col: rx[i], x: el._pmx || 0, y: el._pmy || 0};
      }), single: mx === 0});
    });
  }
  function clear() { document.querySelectorAll('[data-pm-drift]').forEach(function (el) { el.style.translate = el.style.transition = ''; el.removeAttribute('data-pm-drift'); el._pmx = el._pmy = 0; el._pmTr = false; }); }
  // The older drift-together rules (vouchers in js/main.js, courses above) animate `translate` over 1.4 s. This script
  // replaces them, so their translate transition is dropped per element; every other transition stays as it was.
  function noTranslateTransition(el) {
    if (el._pmTr) return; el._pmTr = true;
    var cs = getComputedStyle(el), split = function (s) { return s.split(/,(?![^(]*\))/).map(function (x) { return x.trim(); }); };
    var p = split(cs.transitionProperty), du = split(cs.transitionDuration), tf = split(cs.transitionTimingFunction), de = split(cs.transitionDelay);
    if (p.indexOf('translate') < 0 && p.indexOf('all') < 0) return;
    var keep = p.map(function (name, i) { return name === 'translate' ? null : (name === 'all' ? 'opacity' : name) + ' ' + du[i % du.length] + ' ' + tf[i % tf.length] + ' ' + de[i % de.length]; }).filter(Boolean);
    el.style.transition = keep.join(', ') || 'none';
  }
  function ease(t) { return t * t * (3 - 2 * t); }   // smoothstep: the seams close visibly over the whole approach
  function frame(now) {
    raf = 0;
    var dt = Math.min(64, now - (last || now)); last = now;
    var k = last && dt ? 1 - Math.exp(-dt / 140) : 1, vh = innerHeight, moving = false;
    groups.forEach(function (G) {
      var r = G.el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > 2 * vh) return;
      var p = Math.max(0, Math.min(1, (vh * .95 - r.top) / (vh * .55))), open = 1 - ease(p);
      var d = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
      G.items.forEach(function (it) {
        var side = it.col % 2 ? 1 : -1;
        // Column clusters drift against each other; a group that is one cluster (everything interlocks) "breathes"
        // instead (rows spread apart away from the screen centre), so its seams only ever widen.
        var move = G.single ? it.row * G.spec.drift * Math.abs(d) : side * ((G.spec.stagger || 0) * open + G.spec.drift * d + (G.spec.rest || 0)) + (G.spec.restH ? G.spec.restH[it.i] * G.el.clientHeight : 0);   // rest/restH: offset kept once assembled (px / share of the group height)
        var tx = 0, ty = it.sy * open + move;
        it.x += (tx - it.x) * (settled ? k : 1); it.y += (ty - it.y) * (settled ? k : 1);
        if (Math.abs(tx - it.x) > .1 || Math.abs(ty - it.y) > .1) moving = true;
        it.el._pmx = it.x; it.el._pmy = it.y; it.el.setAttribute('data-pm-drift', ''); noTranslateTransition(it.el);
        it.el.style.translate = it.x.toFixed(2) + 'px ' + it.y.toFixed(2) + 'px';
      });
    });
    settled = true;
    if (moving) raf = requestAnimationFrame(frame); else last = 0;
  }
  function kick() { if (!raf) raf = requestAnimationFrame(frame); }
  function rebuild() { if (!mq.matches || reduce.matches) { groups = []; clear(); return; } measure(); kick(); }
  var t = 0; function later() { clearTimeout(t); t = setTimeout(rebuild, 120); }
  addEventListener('scroll', kick, {passive: true});
  addEventListener('resize', later);
  addEventListener('load', later);
  mq.addEventListener('change', later); reduce.addEventListener('change', later);
  if ('ResizeObserver' in window) { var ro = new ResizeObserver(later); specs.forEach(function (s) { var g = document.querySelector(s.group); if (g) ro.observe(g); }); }
  rebuild();
})();

// About (Lucas' sketch, 10.11.2026): photo 9 x 12 cells with the bottom-left corner cut 3 x 3, text panel 12 x 12 with the
// top-right corner cut 3 x 3. Same seam (--frame-space, 12 px) and the same corner radius as the reviews (window.pmShape).
(function () {
  var grid = document.querySelector('.about-grid'), fig = grid && grid.querySelector('.about-figure'), panel = grid && grid.querySelector('.about-panel');
  if (!fig || !panel || !window.pmShape) return;
  var S = window.pmShape, mq = matchMedia('(min-width:900px)'), NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg'); svg.classList.add('about-shape'); svg.setAttribute('aria-hidden', 'true');
  var path = document.createElementNS(NS, 'path'); svg.append(path);
  function draw() {
    if (!mq.matches) { grid.classList.remove('has-about-shape'); fig.style.clipPath = panel.style.clipPath = ''; svg.remove(); grid.style.removeProperty('--about-s'); return; }
    grid.classList.add('has-about-shape'); if (!svg.parentNode) panel.prepend(svg);
    var g = parseFloat(getComputedStyle(grid).columnGap) || 12, s = (fig.offsetWidth + panel.offsetWidth) / 21;
    grid.style.setProperty('--about-s', s + 'px');
    var fw = fig.offsetWidth, fh = fig.offsetHeight, pw = panel.offsetWidth, ph = panel.offsetHeight;
    var F = [[0,0],[fw,0],[fw,fh],[3*s,fh],[0,fh-3*s]], P = [[0,0],[pw-3*s,0],[pw,3*s],[pw,ph],[0,ph]];
    var cf = S.corners(F), cp = S.corners(S.inset(P, 1.5));
    var r = Math.min(S.radius(), ...cf.concat(cp).map(function (c) { return c.limit; }));
    fig.style.clipPath = 'path("' + S.rounded(cf, r) + '")';
    path.setAttribute('d', S.rounded(cp, r));
    panel.style.clipPath = 'path("' + S.rounded(S.corners(P), r + 1.5) + '")';
  }
  var raf = 0; function later() { cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { raf = requestAnimationFrame(draw); }); }
  var ro = new ResizeObserver(later); [grid, fig, panel].forEach(function (el) { ro.observe(el); });
  var cg = document.querySelector('.contact-grid'); if (cg) ro.observe(cg);
  mq.addEventListener('change', later); addEventListener('load', later); draw();
})();

// Three Figma polygons (68:11, 67:6, 68:7), rounded with the shared frame geometry.
(function () {
  var wrap = document.querySelector('.service-ovals'); if (!wrap) return;
  var slices = Array.from(wrap.querySelectorAll(':scope>.service-oval')); if (slices.length !== 3) return;
  var mq = matchMedia('(min-width:900px)'), NS = 'http://www.w3.org/2000/svg';
  var vertices = [
    [[0,0],[263,0],[263,513.5],[0,337]],
    [[0,129],[263,0],[263,513.5],[0,639.5]],
    [[0,0],[244.5,192.5],[244.5,380.5],[0,506]]
  ];
  var widths = [263,263,244.5];
  var shapes = slices.map(function (el) {
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'oval-slice-shape'); svg.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS(NS, 'path'); svg.append(path); return {svg: svg, path: path};
  });
  function draw() {
    if (!mq.matches) {
      wrap.classList.remove('is-sliced');
      slices.forEach(function (el, i) { el.style.clipPath = ''; shapes[i].svg.remove(); });
      return;
    }
    wrap.classList.add('is-sliced');
    var S = window.pmShape; if (!S) return;
    var scale = slices[0].offsetWidth / 263, r = S.radius(), sw = 1.5;
    slices.forEach(function (el, i) {
      if (!shapes[i].svg.parentNode) el.prepend(shapes[i].svg);
      var points = vertices[i].map(function (p) { return [p[0] * el.offsetWidth / widths[i], p[1] * scale]; });
      el.style.clipPath = 'path("' + S.rounded(S.corners(points), r) + '")';
      shapes[i].path.setAttribute('d', S.rounded(S.corners(S.inset(points, sw)), Math.max(0, r - sw)));
    });
  }
  var raf = 0; function later() { cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { raf = requestAnimationFrame(draw); }); }
  var ro = new ResizeObserver(later); ro.observe(wrap);
  var cg = document.querySelector('.contact-grid'); if (cg) ro.observe(cg);
  mq.addEventListener('change', later); addEventListener('load', later); draw();
})();
