(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  let on = false;
  const listeners = new Set();
  function set(v) { on = !!v; listeners.forEach(fn => fn(on)); }
  function isOn() { return on; }
  function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  function mount(rootEl) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.position = 'absolute'; btn.style.bottom = '12px'; btn.style.right = '12px'; btn.style.zIndex = '12';
    btn.textContent = 'Self-test: off';
    rootEl.appendChild(btn);
    btn.onclick = () => { set(!on); };
    onChange(v => { btn.textContent = v ? 'Self-test: on' : 'Self-test: off'; });
  }
  P.selfTest = { mount, set, isOn, onChange };
})();
