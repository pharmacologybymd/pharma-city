// Comparison tool — pick 2-4 drugs (from any district) and see them
// side-by-side in a table. Examiners love "compare and contrast" Qs;
// this is the practice version.
//
// PHARMA.compare.open()  — open the panel, default to current district
// PHARMA.compare.close()
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const MAX_PICKED = 4;
  const MIN_PICKED = 2;
  const FACET_ORDER = [
    { key: 'class', label: 'Class' },
    { key: 'mechanism', label: 'Mechanism' },
    { key: 'adverse_effects', label: 'Adverse effects' },
    { key: 'clinical_use', label: 'Clinical use' },
    { key: 'memory_hook', label: 'Memory hook' },
    { key: 'source', label: 'Source' },
  ];
  let panel = null;
  let activeDistrictId = null;
  let picked = new Set();

  function esc(s) { return String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]); }

  function districtList() {
    const out = [];
    if (typeof window === 'undefined') return out;
    for (const k in window) {
      if (!k.startsWith('DISTRICT_')) continue;
      const d = window[k];
      if (d?.id && d?.name) out.push({ id: d.id, name: d.name, drugs: d.drugs || [] });
    }
    return out;
  }

  function getDistrict(id) {
    return window['DISTRICT_' + id.toUpperCase()];
  }

  function ensurePanel(rootEl) {
    if (panel) return;
    panel = document.createElement('aside');
    panel.className = 'compare-panel';
    panel.style.display = 'none';
    rootEl.appendChild(panel);
  }

  function render() {
    if (!panel) return;
    const d = activeDistrictId ? getDistrict(activeDistrictId) : null;
    const districts = districtList();
    const drugs = d?.drugs || [];

    const parts = [];
    parts.push(`<div class="compare-head">`);
    parts.push(`<div class="compare-title">Compare drugs</div>`);
    parts.push(`<button class="btn compare-close" id="cmpClose" aria-label="close">×</button>`);
    parts.push(`</div>`);

    parts.push(`<div class="compare-select-row">`);
    parts.push(`<label class="compare-label">District</label>`);
    parts.push(`<select class="compare-dropdown" id="cmpDistrict">`);
    districts.forEach(dd => {
      const sel = dd.id === activeDistrictId ? ' selected' : '';
      parts.push(`<option value="${esc(dd.id)}"${sel}>${esc(dd.name)} (${dd.drugs.length})</option>`);
    });
    parts.push(`</select>`);
    parts.push(`</div>`);

    parts.push(`<div class="compare-pickline">Pick ${MIN_PICKED}–${MAX_PICKED} drugs (chosen: ${picked.size})</div>`);
    parts.push(`<div class="compare-druglist">`);
    drugs.forEach(drug => {
      const checked = picked.has(drug.id) ? ' checked' : '';
      const disabled = (!picked.has(drug.id) && picked.size >= MAX_PICKED) ? ' disabled' : '';
      parts.push(`<label class="compare-drug"><input type="checkbox" data-drug="${esc(drug.id)}"${checked}${disabled} /> ${esc(drug.id)}${drug.high_yield ? ' <span class="compare-hy">HY</span>' : ''}</label>`);
    });
    parts.push(`</div>`);

    if (picked.size >= MIN_PICKED) {
      const pickedDrugs = drugs.filter(x => picked.has(x.id));
      parts.push(`<div class="compare-table-wrap"><table class="compare-table">`);
      parts.push(`<thead><tr><th></th>${pickedDrugs.map(p => `<th>${esc(p.id)}</th>`).join('')}</tr></thead>`);
      parts.push(`<tbody>`);
      FACET_ORDER.forEach(f => {
        parts.push(`<tr><th>${esc(f.label)}</th>${pickedDrugs.map(p => `<td>${esc(p[f.key])}</td>`).join('')}</tr>`);
      });
      parts.push(`</tbody></table></div>`);
    } else {
      parts.push(`<div class="compare-hint">Tick ${MIN_PICKED - picked.size} more drug${MIN_PICKED - picked.size === 1 ? '' : 's'} to see the comparison table.</div>`);
    }

    panel.innerHTML = parts.join('');

    panel.querySelector('#cmpClose')?.addEventListener('click', close);
    panel.querySelector('#cmpDistrict')?.addEventListener('change', (e) => {
      activeDistrictId = e.target.value;
      picked = new Set();
      render();
    });
    panel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.dataset.drug;
        if (cb.checked) picked.add(id); else picked.delete(id);
        render();
      });
    });
  }

  function open(districtId) {
    if (!panel) return;
    activeDistrictId = districtId || P.app?.state?.districtId || districtList()[0]?.id;
    if (!activeDistrictId) return;
    picked = new Set();
    render();
    panel.style.display = 'flex';
    panel.classList.add('open');
  }

  function close() {
    if (panel) { panel.style.display = 'none'; panel.classList.remove('open'); }
  }

  function mount(rootEl) {
    ensurePanel(rootEl);
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel && panel.style.display !== 'none') close();
      });
    }
  }

  P.compare = { mount, open, close };
})();
