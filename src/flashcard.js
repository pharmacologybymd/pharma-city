(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function _state(drug) {
    // class hides only when self-test is on at card-load; tapping reveals
    // it for the rest of this card's view via state.hidden.class below.
    const hidden = {
      class: (typeof window !== 'undefined' && window.PHARMA?.selfTest?.isOn?.() === true),
      mechanism: true, adverse_effects: true, clinical_use: true,
    };
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
    container.setAttribute('role', 'dialog');
    container.setAttribute('aria-modal', 'true');
    container.setAttribute('aria-labelledby', 'fc-title');
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
    head.id = 'fc-title';
    head.innerHTML = `<div style="font-size:18px;font-weight:500">${esc(d.id)}</div><div style="font-size:12px;color:var(--muted);margin-top:2px">${esc(d.building)}</div>`;
    container.appendChild(head);

    container.appendChild(facet('Class', d.class, state.hidden.class, 'class'));
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

    // Link to this drug's spot in the classification flowchart (opens the
    // in-app overlay and drives its search box to filter to this drug).
    if (P.flowchart) {
      const link = document.createElement('button');
      link.className = 'fc-link';
      link.type = 'button';
      link.innerHTML = '📊 See in classification flowchart ↗';
      link.onclick = () => P.flowchart.open({ districtId: d.district, drugId: d.id });
      container.appendChild(link);
    }

    const ctrl = document.createElement('div');
    ctrl.style.marginTop = '10px';
    ctrl.innerHTML = `<button class="btn" id="revealAll">Reveal all</button> <button class="btn" id="hideAll">Hide all</button>`;
    container.appendChild(ctrl);
    container.querySelector('#revealAll').onclick = () => { state.revealAll(); render(); };
    container.querySelector('#hideAll').onclick = () => { state.hideAll(); render(); };

    // Self-grade — feeds the quiz module's mastery tracking. Auto-advances
    // to the next card so quiz mode flows.
    if (P.quiz) {
      const grade = document.createElement('div');
      grade.style.marginTop = '14px';
      grade.style.display = 'flex';
      grade.style.gap = '8px';
      grade.innerHTML = `<button class="btn btn-good" id="knewIt">✓ Knew it</button> <button class="btn btn-bad" id="missedIt">✗ Missed it</button>`;
      container.appendChild(grade);
      container.querySelector('#knewIt').onclick = () => {
        P.quiz.recordResult(d.id, 'knew');
        setTimeout(() => P.quiz.startRandom(), 80);
      };
      container.querySelector('#missedIt').onclick = () => {
        P.quiz.recordResult(d.id, 'missed');
        setTimeout(() => P.quiz.startWeakest(), 80);
      };
      const s = P.quiz.getStats();
      const dstat = P.quiz.getDrugStat(d.id);
      const statEl = document.createElement('div');
      statEl.className = 'quiz-stats';
      statEl.textContent = `Seen ${s.seen}/${s.totalDrugs} · Mastered ${s.mastered} · Streak ${s.streak} (best ${s.bestStreak}) · This drug: ${dstat.knew}✓ ${dstat.missed}✗`;
      container.appendChild(statEl);
    }

    container.scrollTop = prevScroll;
  }
  function facet(label, value, hidden, key) {
    const wrap = document.createElement('div');
    wrap.className = 'facet';
    wrap.innerHTML = `<div class="facet-label">${esc(label)}</div>`;
    if (hidden) {
      const bar = document.createElement('div');
      bar.className = 'facet-hidden';
      bar.setAttribute('role', 'button');
      bar.setAttribute('tabindex', '0');
      bar.textContent = 'Recall it — tap to reveal';
      bar.onclick = () => { state.reveal(key); render(); };
      bar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); state.reveal(key); render(); }
      });
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
  // _onSelfTestChange re-seeds class hidden state from the live toggle.
  // _rerender just repaints the current state (used elsewhere).
  function _onSelfTestChange() {
    if (state) state.hidden.class = P.selfTest?.isOn?.() === true;
    render();
  }
  P.flashcard = { mount, _state, _rerender: () => render(), _onSelfTestChange };
})();
