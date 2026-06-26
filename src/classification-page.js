(function () {
  const DATA = (typeof window !== 'undefined' && window.PHARMA_CLASSIFICATION_DATA) || [];
  const SRC_KEYS = ['gng', 'kdt'];

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]); }
  function normKey(s) { return String(s).toLowerCase().replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }

  // Build a normalized lookup index for a district's details once.
  function detailIndex(details) {
    const idx = {};
    for (const k of Object.keys(details || {})) idx[normKey(k)] = details[k];
    return idx;
  }
  function lookup(name, details, idx) {
    if (details && Object.prototype.hasOwnProperty.call(details, name)) return details[name];
    return idx[normKey(name)] || null;
  }
  function hasCard(d) { return d && (d.adme || d.moa || d.uses || d.adr || d.note); }

  function detailCardHTML(name, d, klass) {
    if (d && d.note && !d.adme && !d.moa && !d.uses && !d.adr) {
      return `<div class="cf-card"><div class="cf-card-head">${esc(name)}</div><div class="cf-note">${esc(d.note)}</div></div>`;
    }
    const row = (cls, label, val) => val ? `<div class="cf-row ${cls}"><div class="cf-k">${label}</div><div class="cf-v">${esc(val)}</div></div>` : '';
    return `<div class="cf-card">
      <div class="cf-card-head"><span>${esc(name)}</span>${klass ? `<span class="cf-klass">${esc(klass)}</span>` : ''}</div>
      ${row('adme', 'ADME', d.adme)}
      ${row('moa', 'Mechanism', d.moa)}
      ${row('uses', 'Uses', d.uses)}
      ${row('adr', 'Adverse effects', d.adr)}
    </div>`;
  }

  // Recursive tree builder. depth controls default-collapsed state.
  function buildGroup(group, srcKey, details, idx, depth) {
    const li = document.createElement('li');
    li.className = 'cf-group ' + srcKey + (depth >= 1 ? ' cf-collapsed' : '');
    const node = document.createElement('div');
    node.className = 'cf-node';
    node.innerHTML = `<span class="cf-caret">▼</span><span>${esc(group.heading)}</span>`;
    node.addEventListener('click', () => li.classList.toggle('cf-collapsed'));
    li.appendChild(node);

    const ul = document.createElement('ul');
    if (Array.isArray(group.groups)) group.groups.forEach(g => ul.appendChild(buildGroup(g, srcKey, details, idx, depth + 1)));
    if (Array.isArray(group.drugs)) group.drugs.forEach(name => ul.appendChild(buildDrug(name, details, idx)));
    li.appendChild(ul);
    return li;
  }

  function buildDrug(name, details, idx) {
    const li = document.createElement('li');
    const d = lookup(name, details, idx);
    const card = hasCard(d);
    li.className = 'cf-drug' + (card ? '' : ' nodata');
    li.dataset.name = name;
    const node = document.createElement('div');
    node.className = 'cf-node';
    node.innerHTML = `<span class="cf-dot"></span><span>${esc(name)}</span>`;
    li.appendChild(node);
    if (card) {
      node.addEventListener('click', () => {
        if (li.classList.contains('open')) { li.classList.remove('open'); const c = li.querySelector(':scope > .cf-card'); if (c) c.remove(); return; }
        li.classList.add('open');
        li.insertAdjacentHTML('beforeend', detailCardHTML(name, d, ''));
      });
    }
    return li;
  }

  function mount() {
    const root = document.getElementById('cf-root');
    root.innerHTML = `
      <div class="cf-app">
        <aside class="cf-sidebar" id="cf-sidebar">
          <div class="cf-brand">Pharmacology Classification<small>G&amp;G 14e + KDT · flowchart with ADME / MOA / uses / ADR</small></div>
          <ul class="cf-dlist" id="cf-dlist"></ul>
        </aside>
        <main class="cf-main">
          <div class="cf-topbar">
            <h1 class="cf-title" id="cf-title"></h1>
            <input class="cf-search" id="cf-search" placeholder="Find a drug…" />
            <div class="cf-tabs" id="cf-tabs">
              <button class="cf-tab gng active" data-src="gng">G&amp;G 14e</button>
              <button class="cf-tab kdt" data-src="kdt">KDT</button>
            </div>
            <button class="cf-btn" id="cf-expand">Expand all</button>
            <button class="cf-btn" id="cf-collapse">Collapse all</button>
            <button class="cf-btn" id="cf-theme">🌙</button>
          </div>
          <div class="cf-cite" id="cf-cite"></div>
          <div class="cf-diagrams" id="cf-diagrams"></div>
          <ul class="cf-tree" id="cf-tree"></ul>
        </main>
      </div>`;

    const state = { di: 0, src: 'gng' };
    const dlist = document.getElementById('cf-dlist');
    DATA.forEach((d, i) => {
      const li = document.createElement('li');
      li.innerHTML = `${esc(d.name)}<small>${esc(d.theme_line || '')}</small>`;
      li.addEventListener('click', () => { state.di = i; renderDistrict(); });
      dlist.appendChild(li);
    });

    function renderDiagrams() {
      const d = DATA[state.di];
      const box = document.getElementById('cf-diagrams');
      const diags = d.diagrams || [];
      if (!diags.length) { box.innerHTML = ''; return; }
      box.innerHTML = `
        <div class="cf-diagrams-head" id="cf-diag-toggle"><span class="cf-caret">▼</span> 📊 Diagrams &amp; graphs (${diags.length})</div>
        <div class="cf-diagrams-grid" id="cf-diag-grid">
          ${diags.map(g => `<figure class="cf-fig"><div class="cf-fig-title">${esc(g.title)}</div><div class="cf-fig-svg">${g.svg}</div><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}
        </div>`;
      document.getElementById('cf-diag-toggle').addEventListener('click', () => box.classList.toggle('cf-collapsed'));
    }

    function renderDistrict() {
      const d = DATA[state.di];
      document.getElementById('cf-title').textContent = d.name;
      [...dlist.children].forEach((li, i) => li.classList.toggle('active', i === state.di));
      renderDiagrams();
      renderSource();
    }
    function renderSource() {
      const d = DATA[state.di];
      const src = (d.classification.sources || []).find(s => srcLabelKey(s.label) === state.src) || d.classification.sources[0];
      document.getElementById('cf-cite').textContent = src ? `${src.label} — ${src.cite}` : '';
      document.querySelectorAll('.cf-tab').forEach(t => t.classList.toggle('active', t.dataset.src === state.src));
      const tree = document.getElementById('cf-tree');
      tree.innerHTML = '';
      const idx = detailIndex(d.details);
      (src ? src.groups : []).forEach(g => tree.appendChild(buildGroup(g, state.src, d.details, idx, 0)));
      const q = document.getElementById('cf-search').value.trim();
      if (q) runSearch(q);
    }
    function srcLabelKey(label) { return /kdt/i.test(label) ? 'kdt' : 'gng'; }

    document.getElementById('cf-tabs').addEventListener('click', e => {
      const b = e.target.closest('.cf-tab'); if (!b) return;
      state.src = b.dataset.src; renderSource();
    });
    document.getElementById('cf-expand').addEventListener('click', () => document.querySelectorAll('#cf-tree .cf-group').forEach(g => g.classList.remove('cf-collapsed')));
    document.getElementById('cf-collapse').addEventListener('click', () => document.querySelectorAll('#cf-tree .cf-group').forEach(g => g.classList.add('cf-collapsed')));
    const themeBtn = document.getElementById('cf-theme');
    themeBtn.addEventListener('click', () => { document.body.classList.toggle('cf-night'); themeBtn.textContent = document.body.classList.contains('cf-night') ? '☀️' : '🌙'; });

    const search = document.getElementById('cf-search');
    search.addEventListener('input', () => runSearch(search.value.trim()));
    function runSearch(q) {
      const tree = document.getElementById('cf-tree');
      tree.querySelectorAll('.cf-hit').forEach(n => n.classList.remove('cf-hit'));
      if (!q) return;
      const needle = q.toLowerCase();
      let first = null;
      tree.querySelectorAll('.cf-drug').forEach(li => {
        if ((li.dataset.name || '').toLowerCase().includes(needle)) {
          li.classList.add('cf-hit');
          if (!first) first = li;
          // expand all ancestor groups
          let p = li.parentElement;
          while (p && p !== tree) { if (p.classList && p.classList.contains('cf-group')) p.classList.remove('cf-collapsed'); p = p.parentElement; }
        }
      });
      if (first) first.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    renderDistrict();
  }

  if (document.readyState !== 'loading') mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
