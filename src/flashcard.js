(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function _state(drug) {
    const hidden = { class: false, mechanism: true, adverse_effects: true, clinical_use: true };
    return {
      drug, hidden,
      reveal(k) { hidden[k] = false; },
      hide(k) { hidden[k] = true; },
      revealAll() { for (const k in hidden) hidden[k] = false; },
      hideAll() { for (const k in hidden) hidden[k] = true; },
    };
  }
  let state = null, container = null;
  function mount(rootEl) {
    container = document.createElement('div');
    container.className = 'flashcard';
    container.style.display = 'none';
    rootEl.appendChild(container);
    P.app.on('navigate', s => {
      if (s.level !== 'flashcard') { container.style.display = 'none'; return; }
      const district = window['DISTRICT_' + s.districtId.toUpperCase()];
      const drug = district?.drugs?.find(d => d.id === s.drugId);
      if (!drug) { container.style.display = 'none'; return; }
      state = _state(drug);
      render();
      container.style.display = 'block';
    });
  }
  function render() {
    if (!state) return;
    const d = state.drug;
    // Preserve scroll across re-renders (reveal taps rebuild the whole card).
    const prevScroll = container.scrollTop;
    container.innerHTML = '';
    const head = document.createElement('div');
    head.innerHTML = `<div style="font-size:18px;font-weight:500">${esc(d.id)}</div><div style="font-size:12px;color:var(--muted);margin-top:2px">${esc(d.building)}</div>`;
    container.appendChild(head);

    container.appendChild(facet('Class', d.class, P.selfTest?.isOn?.() === true, P.selfTest?.isOn?.() === true ? 'class' : null));
    container.appendChild(facet('Mechanism', d.mechanism, state.hidden.mechanism, 'mechanism'));
    container.appendChild(facet('Adverse effects', d.adverse_effects, state.hidden.adverse_effects, 'adverse_effects'));
    container.appendChild(facet('Clinical use', d.clinical_use, state.hidden.clinical_use, 'clinical_use'));

    const hook = document.createElement('div');
    hook.className = 'memory-hook';
    hook.innerHTML = `<span style="font-weight:500">Memory hook</span> — ${esc(d.memory_hook)}`;
    container.appendChild(hook);

    const src = document.createElement('div');
    src.className = 'source-line';
    src.textContent = `Verify · ${d.source}`;
    container.appendChild(src);

    const ctrl = document.createElement('div');
    ctrl.style.marginTop = '10px';
    ctrl.innerHTML = `<button class="btn" id="revealAll">Reveal all</button> <button class="btn" id="hideAll">Hide all</button>`;
    container.appendChild(ctrl);
    container.querySelector('#revealAll').onclick = () => { state.revealAll(); render(); };
    container.querySelector('#hideAll').onclick = () => { state.hideAll(); render(); };
    container.scrollTop = prevScroll;
  }
  function facet(label, value, hidden, key) {
    const wrap = document.createElement('div');
    wrap.className = 'facet';
    wrap.innerHTML = `<div class="facet-label">${esc(label)}</div>`;
    if (hidden) {
      const bar = document.createElement('div');
      bar.className = 'facet-hidden';
      bar.textContent = 'Recall it — tap to reveal';
      bar.onclick = () => { state.reveal(key); render(); };
      wrap.appendChild(bar);
    } else {
      const v = document.createElement('div');
      v.className = 'facet-value';
      v.textContent = value;
      wrap.appendChild(v);
    }
    return wrap;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]); }
  P.flashcard = { mount, _state, _rerender: () => render() };
})();
