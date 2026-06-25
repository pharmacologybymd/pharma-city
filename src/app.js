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
        <div class="title" id="title">Pharmacology City</div>
        <button class="btn" id="quizBtn" aria-label="quiz a random drug">Quiz me</button>
        <button class="btn" id="weakBtn" aria-label="practise missed drugs">Practise missed</button>
      </div>
      <div class="search" id="search-mount"></div>
    `;
    const back = document.getElementById('backBtn');
    const title = document.getElementById('title');
    document.getElementById('quizBtn').addEventListener('click', () => P.quiz?.startRandom?.());
    document.getElementById('weakBtn').addEventListener('click', () => P.quiz?.startWeakest?.());
    on('navigate', s => {
      back.style.display = s.level === 'city' ? 'none' : '';
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
    P.selfTest?.mount?.(app);
    P.selfTest?.onChange?.(() => { P.flashcard?._onSelfTestChange?.(); });
    P.search?.mount?.(document.getElementById('search-mount'));
    goTo('city');
  }
})();
