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
      </div>
      <div class="search" id="search-mount"></div>
    `;
    const back = document.getElementById('backBtn');
    const title = document.getElementById('title');
    on('navigate', s => {
      back.style.display = s.level === 'city' ? 'none' : '';
      title.textContent = s.level === 'city' ? 'Pharmacology City' :
        (P.content?.districts?.[s.districtId]?.name ?? s.districtId);
    });
    back.addEventListener('click', () => {
      if (state.level === 'flashcard') goTo('district', { districtId: state.districtId });
      else if (state.level === 'district') goTo('city');
    });
    P.city?.mount?.(app);
    P.district?.mount?.(app);
    P.flashcard?.mount?.(app);
    P.walkthrough?.mount?.(app);
    P.selfTest?.mount?.(app);
    P.selfTest?.onChange?.(() => { if (P.flashcard?._rerender) P.flashcard._rerender(); });
    P.search?.mount?.(document.getElementById('search-mount'));
    goTo('city');
  }
})();
