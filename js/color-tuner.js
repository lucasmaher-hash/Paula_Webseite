// A local colour preview, explicitly enabled through ?tune=1. No visitor preferences change.
(function () {
  if (new URLSearchParams(location.search).get('tune') !== '1') return;
  var root = document.documentElement;
  var key = 'pm-beauty-palettes-v1';
  var fields = [
    ['hue', 'Farbton', 0, 360, '°'],
    ['saturation', 'Sättigung', 5, 50, '%'],
    ['brightness', 'Flächenhelligkeit', -8, 2, ''],
    ['text', 'Texthelligkeit', 24, 46, '%'],
    ['button', 'Buttonhelligkeit', 36, 62, '%'],
    ['opacity', 'Flächendeckkraft', 0, 100, '%'],
    ['border', 'Rahmenkontrast', 10, 50, '%']
  ];
  var defaults = {}, values = {}, saved = {};
  try { saved = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { /* Preview also works without storage. */ }
  ['brown', 'pink'].forEach(function (tone) {
    fields.forEach(function (field) {
      var name = '--' + tone + '-' + field[0];
      defaults[name] = Number(getComputedStyle(root).getPropertyValue(name));
      var value = saved[name];
      values[name] = typeof value === 'number' && Number.isFinite(value) ? Math.min(field[3], Math.max(field[2], value)) : defaults[name];
      root.style.setProperty(name, values[name]);
    });
  });
  var launcher = document.createElement('button');
  launcher.className = 'tuner-launch';
  launcher.textContent = 'Farben anpassen';
  launcher.setAttribute('aria-controls', 'color-tuner');
  launcher.setAttribute('aria-expanded', 'true');
  var panel = document.createElement('aside');
  panel.id = 'color-tuner';
  panel.className = 'color-tuner';
  panel.setAttribute('aria-label', 'Farbregler');
  panel.innerHTML = '<div class="tuner-head"><h2>Farbregler</h2><button type="button" class="icon-btn" aria-label="Farbregler schließen">×</button></div>' +
    '<p class="tuner-note">Live-Vorschau, nur in diesem Browser gespeichert. Die öffentliche Website bleibt beim veröffentlichten Stand.</p>' +
    '<div class="tuner-palettes"></div>' +
    '<div class="tuner-actions"><button type="button" class="btn btn-soft" data-reset>Zurücksetzen</button><button type="button" class="btn btn-primary" data-export>Werte exportieren</button></div>' +
    '<p class="tuner-status" role="status" aria-live="polite"></p><textarea class="tuner-export" aria-label="Farbwerte zum Kopieren" readonly hidden></textarea>';
  ['brown', 'pink'].forEach(function (tone) {
    var fieldset = document.createElement('fieldset');
    fieldset.className = 'theme-' + tone;
    fieldset.innerHTML = '<legend>' + (tone === 'brown' ? 'Braun' : 'Pink') + '</legend>';
    fields.forEach(function (field) {
      var name = '--' + tone + '-' + field[0], id = tone + '-' + field[0];
      var label = document.createElement('label');
      label.htmlFor = id;
      label.innerHTML = '<span>' + field[1] + '</span><output for="' + id + '">' + values[name] + field[4] + '</output>';
      var input = document.createElement('input');
      input.type = 'range'; input.id = id; input.min = field[2]; input.max = field[3]; input.step = 1; input.value = values[name];
      input.dataset.variable = name; input.dataset.unit = field[4];
      input.addEventListener('input', function () {
        values[name] = Number(input.value);
        root.style.setProperty(name, input.value);
        label.querySelector('output').textContent = input.value + field[4];
        panel.querySelector('.tuner-export').hidden = true;
        try { localStorage.setItem(key, JSON.stringify(values)); } catch (e) { panel.querySelector('.tuner-status').textContent = 'Speichern nicht verfügbar; Vorschau bleibt bis zum Neuladen.'; }
      });
      fieldset.append(label, input);
    });
    panel.querySelector('.tuner-palettes').append(fieldset);
  });
  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (!open) launcher.focus();
  }
  launcher.addEventListener('click', function () { setOpen(panel.hidden); });
  panel.querySelector('.tuner-head button').addEventListener('click', function () { setOpen(false); });
  panel.addEventListener('keydown', function (event) { if (event.key === 'Escape') setOpen(false); });
  panel.querySelector('[data-reset]').addEventListener('click', function () {
    panel.querySelectorAll('input').forEach(function (input) {
      var name = input.dataset.variable;
      values[name] = defaults[name]; root.style.setProperty(name, defaults[name]); input.value = defaults[name];
      panel.querySelector('output[for="' + input.id + '"]').textContent = input.value + input.dataset.unit;
    });
    try { localStorage.removeItem(key); } catch (e) { /* No storage to clear. */ }
    panel.querySelector('.tuner-export').hidden = true;
    panel.querySelector('.tuner-status').textContent = 'Veröffentlichte Farben wiederhergestellt.';
  });
  panel.querySelector('[data-export]').addEventListener('click', function () {
    var output = panel.querySelector('.tuner-export');
    output.value = ':root {\n' + Object.keys(values).map(function (name) { return '  ' + name + ': ' + values[name] + ';'; }).join('\n') + '\n}';
    output.hidden = false; output.focus(); output.select();
    panel.querySelector('.tuner-status').textContent = 'Werte kopieren und Lucas / Codex zur Veröffentlichung geben.';
  });
  document.body.append(launcher, panel);
})();
