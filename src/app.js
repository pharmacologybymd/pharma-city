(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const listeners = new Set();
  const state = { level: 'city', districtId: null, drugId: null };
  function goTo(level, args = {}) {
    state.level = level;
    state.districtId = args.districtId ?? null;
    state.drugId = args.drugId ?? null;
    listeners.forEach(fn => fn(state));
  }
  function on(_event, fn) { listeners.add(fn); return () => listeners.delete(fn); }
  P.app = { goTo, on, get state(){ return { ...state }; } };

  if (typeof document !== 'undefined' && document.readyState !== 'loading') boot();
  else if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', boot);

  function boot() {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = `
      <div class="topbar">
        <button class="btn" id="backBtn" aria-label="back" style="display:none">‹ Back</button>
        <a class="btn btn-brand" id="brandBtn" href="https://pharmabymd.com" target="_blank" rel="noopener" aria-label="visit pharmabymd.com">pharmabymd.com ↗</a>
        <div class="title" id="title">Pharmacology City</div>
        <button class="btn" id="quizBtn" aria-label="quiz a random drug">Quiz me</button>
        <button class="btn" id="weakBtn" aria-label="practise missed drugs">Practise missed</button>
        <button class="btn btn-due" id="dueBtn" aria-label="review drugs due today">Due today</button>
        <button class="btn" id="mcqBtn" aria-label="multiple choice question">MCQ</button>
        <button class="btn" id="compareBtn" aria-label="compare drugs">Compare</button>
        <button class="btn" id="classifyBtn" aria-label="drug classification" style="display:none">Classify</button>
        <button class="btn" id="flowBtn" aria-label="full classification flowchart">Flowchart</button>
        <button class="btn" id="mapBtn" aria-label="mini map" title="Press M">Map</button>
        <button class="btn" id="driveBtn" aria-label="drive the car" title="Drive the car around the city">🚗 Drive</button>
        <button class="btn btn-theme" id="themeBtn" aria-label="toggle day/night">🌙</button>
      </div>
      <div class="search" id="search-mount"></div>
    `;
    const back = document.getElementById('backBtn');
    const title = document.getElementById('title');
    document.getElementById('quizBtn').addEventListener('click', () => P.quiz?.startRandom?.());
    document.getElementById('weakBtn').addEventListener('click', () => P.quiz?.startWeakest?.());
    document.getElementById('dueBtn').addEventListener('click', () => P.quiz?.startDue?.());
    // Shift-click the Due-today badge to reset progress.
    document.getElementById('dueBtn').title = 'Click to study drugs due today. Shift-click to reset progress.';
    document.getElementById('dueBtn').addEventListener('click', (e) => {
      if (!e.shiftKey) return;
      e.stopImmediatePropagation();
      if (!confirm('Reset all study progress? (Mastery, streaks, due-dates.) This cannot be undone.')) return;
      P.quiz?.reset?.();
      updateDueBadge();
      window.location.reload();
    });
    document.getElementById('mcqBtn').addEventListener('click', () => P.mcq?.open?.());
    document.getElementById('compareBtn').addEventListener('click', () => P.compare?.open?.());
    document.getElementById('classifyBtn').addEventListener('click', () => P.classification?.open?.());
    document.getElementById('flowBtn').addEventListener('click', () => P.flowchart?.open?.());
    document.getElementById('mapBtn').addEventListener('click', () => P.minimap?.toggle?.());
    document.getElementById('driveBtn').addEventListener('click', () => P.drive?.toggle?.());
    const themeBtn = document.getElementById('themeBtn');
    function syncThemeBtn() { if (themeBtn) themeBtn.textContent = (P.theme?.getTheme?.() === 'night') ? '☀️' : '🌙'; }
    themeBtn?.addEventListener('click', () => { P.theme?.toggle?.(); syncThemeBtn(); });
    // Sync on initial load AND when the theme changes from any source.
    P.theme?.onChange?.(syncThemeBtn);
    syncThemeBtn();
    function updateDueBadge() {
      const btn = document.getElementById('dueBtn');
      if (!btn || !P.quiz) return;
      const s = P.quiz.getStats();
      btn.textContent = s.due > 0 ? `Due today · ${s.due}` : 'Due today';
    }
    updateDueBadge();
    setInterval(updateDueBadge, 5000);
    const classifyBtn = document.getElementById('classifyBtn');
    on('navigate', s => {
      back.style.display = s.level === 'city' ? 'none' : '';
      // Classify is per-district — hidden in the city overview.
      classifyBtn.style.display = (s.level === 'city') ? 'none' : '';
      const districtName = s.districtId
        ? (window['DISTRICT_' + s.districtId.toUpperCase()]?.name ?? s.districtId)
        : null;
      title.textContent = s.level === 'city' ? 'Pharmacology City' : (districtName ?? s.districtId);
    });
    back.addEventListener('click', () => {
      if (state.level === 'flashcard') goTo('district', { districtId: state.districtId });
      else if (state.level === 'district') goTo('city');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const s = state;
      if (s.level === 'flashcard') goTo('district', { districtId: s.districtId });
      else if (s.level === 'district') goTo('city');
    });
    P.city?.mount?.(app);
    P.district?.mount?.(app);
    P.flashcard?.mount?.(app);
    P.walkthrough?.mount?.(app);
    P.classification?.mount?.(app);
    P.mcq?.mount?.(app);
    P.compare?.mount?.(app);
    P.minimap?.mount?.(app);
    P.flowchart?.mount?.(app);
    P.drive?.mount?.(app);
    P.selfTest?.mount?.(app);
    P.selfTest?.onChange?.(() => { P.flashcard?._onSelfTestChange?.(); });
    P.search?.mount?.(document.getElementById('search-mount'));

    // Deep links — keep URL ?d=…&drug=… in sync with state.
    function syncURL(s) {
      try {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        if (s.level === 'city') { params.delete('d'); params.delete('drug'); }
        else if (s.level === 'district') { params.set('d', s.districtId); params.delete('drug'); }
        else if (s.level === 'flashcard') { params.set('d', s.districtId); params.set('drug', s.drugId); }
        history.replaceState(null, '', url.toString());
      } catch (_) {}
    }
    on('navigate', syncURL);

    // Boot to the URL-provided state if present.
    const initial = (() => {
      try {
        const url = new URL(window.location.href);
        const d = url.searchParams.get('d');
        const drug = url.searchParams.get('drug');
        if (d && drug) return { level: 'flashcard', districtId: d, drugId: drug };
        if (d) return { level: 'district', districtId: d };
      } catch (_) {}
      return { level: 'city' };
    })();
    if (initial.level === 'flashcard') goTo('flashcard', { districtId: initial.districtId, drugId: initial.drugId });
    else if (initial.level === 'district') goTo('district', { districtId: initial.districtId });
    else goTo('city');
  }
})();
