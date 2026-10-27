// Experiment only: borders remain independent of content layout and SVG icon styles.
(function () {
  'use strict';
  var root = document.documentElement;
  var mobile = matchMedia('(max-width:899px)');
  var selector = '.tile,.strip figure,.services,.reviews,.accordion details,.voucher,.review,.contact-panel,.contact-figure,.hours,.about-grid,.about-figure,.about-panel,.course,.course-media,.course-panel,.perks li';
  var hosts = Array.from(document.querySelectorAll(selector));
  var queued = false;
  function update() {
    queued = false;
    hosts.forEach(function (host) {
      var target = mobile.matches && host.matches('.about-figure,.course-media') ? host.querySelector('img') : host;
      if (!target) return;
      var cs = getComputedStyle(target), box = target.getBoundingClientRect();
      var active = box.width > 0 && box.height > 0 && parseFloat(cs.borderTopWidth) > 0;
      host.classList.toggle('preview-frame-host', active);
      host.dataset.framePalette = host.closest('.theme-pink,.services,.reviews') ? 'pink' : 'brown';
      if (!active) { host.classList.remove('preview-frame-clip'); return; }
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      var hs = getComputedStyle(host), h = host.getBoundingClientRect();
      if (hs.overflowX === 'hidden' || hs.overflowY === 'hidden') host.classList.add('preview-frame-clip');
      var offsets = {
        top: box.top - h.top - parseFloat(hs.borderTopWidth),
        right: h.right - box.right - parseFloat(hs.borderRightWidth),
        bottom: h.bottom - box.bottom - parseFloat(hs.borderBottomWidth),
        left: box.left - h.left - parseFloat(hs.borderLeftWidth)
      };
      Object.keys(offsets).forEach(function (side) { host.style.setProperty('--preview-frame-' + side, offsets[side] + 'px'); });
      host.style.setProperty('--preview-frame-radius', [cs.borderTopLeftRadius,cs.borderTopRightRadius,cs.borderBottomRightRadius,cs.borderBottomLeftRadius].join(' '));
      if (target !== host) target.style.borderColor = 'transparent';
    });
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  update();
  if ('ResizeObserver' in window) {
    var resize = new ResizeObserver(schedule);
    hosts.forEach(function (host) { resize.observe(host); var img = host.querySelector('img'); if (img) resize.observe(img); });
  }
  window.addEventListener('resize', schedule);
  mobile.addEventListener('change', schedule);
  if (document.fonts) document.fonts.ready.then(schedule);
  if ('IntersectionObserver' in window) {
    // Keep visible contours moving continuously; pause off-screen work without hiding any line.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { entry.target.classList.toggle('is-frame-active',entry.isIntersecting); });
    }, {threshold:0});
    hosts.forEach(function (host) { io.observe(host); });
  } else {
    hosts.forEach(function (host) { host.classList.add('is-frame-active'); });
  }

  if (!['localhost','127.0.0.1','[::1]'].includes(location.hostname) && new URLSearchParams(location.search).get('regler') !== '1') return;
  var key = 'pm-beauty:experiment:frame-tuner:v2';
  var palettes = ['brown','pink'];
  var defaults = {
    brown:{width:1,start:'#dac6be',end:'#f5eeeb'},
    pink:{width:1,start:'#d6b9be',end:'#f6eced'}
  };
  function freshAppearance() { return {brown:Object.assign({},defaults.brown),pink:Object.assign({},defaults.pink)}; }
  var appearance = freshAppearance(), ui = {x:null,y:null,collapsed:false};
  try {
    var saved = JSON.parse(localStorage.getItem(key));
    if (saved && saved.appearance) palettes.forEach(function (palette) {
      var values = saved.appearance[palette];
      if (!values) return;
      if (Number.isFinite(values.width) && values.width >= 0) appearance[palette].width = values.width;
      ['start','end'].forEach(function (part) { if (/^#[0-9a-f]{6}$/i.test(values[part])) appearance[palette][part] = values[part]; });
    });
    if (saved && saved.ui) {
      if (Number.isFinite(saved.ui.x) && Number.isFinite(saved.ui.y)) { ui.x = saved.ui.x; ui.y = saved.ui.y; }
      ui.collapsed = saved.ui.collapsed === true;
    }
  } catch (e) {}
  var panel = document.createElement('aside');
  panel.id = 'frame-tuner';
  panel.setAttribute('aria-label','Rahmen einstellen');
  function colorField(palette,part,label) {
    var id = 'frame-' + palette + '-' + part;
    return '<label for="' + id + '">' + label + '</label><div class="frame-tuner-row"><input type="color" id="' + id + '"><output id="' + id + '-value"></output></div>';
  }
  panel.innerHTML = '<div class="frame-tuner-header"><strong>Rahmen einstellen</strong><button type="button" aria-controls="frame-tuner-body" aria-expanded="true" id="frame-tuner-collapse">Einklappen</button></div>' +
    '<div class="frame-tuner-body" id="frame-tuner-body">' + palettes.map(function (palette) {
      var id = 'frame-' + palette + '-width';
      var title = palette === 'brown' ? 'Beige / Braun' : 'Pink';
      return '<fieldset><legend>' + title + '</legend><label for="' + id + '">Linienbreite</label><div class="frame-tuner-row"><input id="' + id + '" type="range" min="0" max="12" step="0.1"><input aria-label="Linienbreite ' + title + ' in Pixeln" id="' + id + '-number" type="number" min="0" step="0.1"><span>px</span></div>' +
        colorField(palette,'start','Farbe vorne') + colorField(palette,'end','Farbe hinten') + '</fieldset>';
    }).join('') + '<pre id="frame-settings" tabindex="0" aria-label="Aktuelle Rahmenwerte"></pre><button id="frame-reset" type="button">Zurücksetzen</button><div class="frame-tuner-gap" aria-hidden="true"></div></div>';
  document.body.appendChild(panel);
  var body = panel.querySelector('#frame-tuner-body'), collapse = panel.querySelector('#frame-tuner-collapse');
  function save() { try { localStorage.setItem(key, JSON.stringify({appearance:appearance,ui:ui})); } catch (e) {} }
  function apply() {
    var exported = {};
    palettes.forEach(function (palette) {
      var values = appearance[palette], id = '#frame-' + palette;
      root.style.setProperty('--preview-frame-' + palette + '-width', values.width + 'px');
      var slider = panel.querySelector(id + '-width'), number = panel.querySelector(id + '-width-number');
      slider.max = Math.max(12,values.width); slider.value = number.value = values.width;
      ['start','end'].forEach(function (part) {
        root.style.setProperty('--preview-frame-' + palette + '-' + part,values[part]);
        panel.querySelector(id + '-' + part).value = values[part];
        panel.querySelector(id + '-' + part + '-value').textContent = values[part];
      });
      exported[palette] = {width:values.width + 'px',start:values.start,end:values.end};
    });
    panel.querySelector('#frame-settings').textContent = JSON.stringify(exported,null,2);
    save();
  }
  function clampPosition() {
    var box = panel.getBoundingClientRect();
    ui.x = Math.max(12, Math.min(ui.x === null ? box.left : ui.x, innerWidth - box.width - 12));
    ui.y = Math.max(12, Math.min(ui.y === null ? box.top : ui.y, innerHeight - box.height - 12));
    panel.style.left = ui.x + 'px'; panel.style.top = ui.y + 'px'; panel.style.right = panel.style.bottom = 'auto';
  }
  function setCollapsed() {
    body.hidden = ui.collapsed; collapse.setAttribute('aria-expanded', String(!ui.collapsed));
    collapse.textContent = ui.collapsed ? 'Ausklappen' : 'Einklappen';
    if (ui.x !== null) clampPosition();
    save();
  }
  palettes.forEach(function (palette) {
    var id = '#frame-' + palette;
    [panel.querySelector(id + '-width'),panel.querySelector(id + '-width-number')].forEach(function (input) {
      input.addEventListener('input',function () {
        if (input.value === '') return;
        var value = Number(input.value);
        if (Number.isFinite(value) && value >= 0) { appearance[palette].width = value; apply(); }
      });
    });
    ['start','end'].forEach(function (part) {
      var input = panel.querySelector(id + '-' + part);
      input.addEventListener('input',function () { appearance[palette][part] = input.value; apply(); });
    });
  });
  panel.querySelector('#frame-reset').addEventListener('click',function () { appearance = freshAppearance(); apply(); });
  collapse.addEventListener('click',function () {
    if (ui.x === null) { var box = panel.getBoundingClientRect(); ui.x = box.left; ui.y = box.top; }
    ui.collapsed = !ui.collapsed; setCollapsed();
  });
  var drag = null;
  panel.addEventListener('pointerdown',function (event) {
    if (event.button !== 0 || event.target.closest('input,button,label,pre,output')) return;
    var box = panel.getBoundingClientRect();
    drag = {id:event.pointerId,x:event.clientX-box.left,y:event.clientY-box.top};
    panel.setPointerCapture(event.pointerId); panel.classList.add('is-dragging'); event.preventDefault();
  });
  panel.addEventListener('pointermove',function (event) {
    if (!drag || event.pointerId !== drag.id) return;
    ui.x = event.clientX-drag.x; ui.y = event.clientY-drag.y; clampPosition();
  });
  function endDrag() { drag = null; panel.classList.remove('is-dragging'); save(); }
  panel.addEventListener('pointerup',endDrag); panel.addEventListener('pointercancel',endDrag);
  window.addEventListener('resize',function () { if (ui.x !== null) { clampPosition(); save(); } });
  setCollapsed(); apply();
})();
