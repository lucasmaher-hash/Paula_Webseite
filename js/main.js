// PM Beauty — sanfte Einblend-Animation, respektiert prefers-reduced-motion
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });

  // Immer nur ein Akkordeon offen halten
  var groups = document.querySelectorAll('.accordion details');
  groups.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        groups.forEach(function (other) { if (other !== d) other.open = false; });
      }
    });
  });
})();
