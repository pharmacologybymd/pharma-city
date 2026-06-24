(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function index() {
    const out = [];
    for (const k in window) {
      if (!k.startsWith('DISTRICT_')) continue;
      const d = window[k];
      (d.drugs || []).forEach(drug => out.push({ drugId: drug.id, districtId: d.id, label: drug.id, districtName: d.name }));
    }
    return out;
  }
  function filter(q) {
    q = (q || '').trim().toLowerCase();
    if (!q) return [];
    return index().filter(r => r.drugId.toLowerCase().includes(q));
  }
  function mount(slotEl) {
    if (!slotEl) return;
    slotEl.innerHTML = `<input type="search" placeholder="Search drug..." aria-label="search drug" /><div class="search-results" style="display:none"></div>`;
    const input = slotEl.querySelector('input');
    const results = slotEl.querySelector('.search-results');
    input.addEventListener('input', () => {
      const hits = filter(input.value).slice(0, 10);
      if (!hits.length) { results.style.display = 'none'; results.innerHTML = ''; return; }
      results.innerHTML = hits.map(h => `<div class="search-result" data-drug="${h.drugId}" data-district="${h.districtId}">${escape(h.drugId)} <span style="color:var(--muted);font-size:12px">(${escape(h.districtName)})</span></div>`).join('');
      results.style.display = 'block';
      results.querySelectorAll('.search-result').forEach(el => el.onclick = () => {
        P.app.goTo('flashcard', { districtId: el.dataset.district, drugId: el.dataset.drug });
        input.value = ''; results.style.display = 'none';
      });
    });
    document.addEventListener('click', (e) => { if (!slotEl.contains(e.target)) results.style.display = 'none'; });
  }
  function escape(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]); }
  P.search = { mount, index, filter };
})();
