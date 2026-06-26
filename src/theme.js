// Theme — day vs night. Drives the 3D scene sky/sun/moon and the body class
// for CSS overrides. Persisted in localStorage.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const KEY = 'pharma_theme';
  const listeners = new Set();
  function load() {
    try { return (typeof localStorage !== 'undefined' && localStorage.getItem(KEY)) || 'day'; } catch (_) { return 'day'; }
  }
  function save(t) {
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, t); } catch (_) {}
  }
  let current = load();
  function apply() {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('theme-night', current === 'night');
    }
    listeners.forEach(fn => { try { fn(current); } catch (_) {} });
  }
  function setTheme(t) {
    if (t !== 'day' && t !== 'night') return;
    if (current === t) return;
    current = t;
    save(current);
    apply();
  }
  function toggle() { setTheme(current === 'day' ? 'night' : 'day'); }
  function getTheme() { return current; }
  function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  // Initial apply on load.
  if (typeof document !== 'undefined') {
    if (document.readyState !== 'loading') apply();
    else document.addEventListener('DOMContentLoaded', apply);
  }
  P.theme = { setTheme, toggle, getTheme, onChange };
})();
