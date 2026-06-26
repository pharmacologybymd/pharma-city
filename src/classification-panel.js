(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]); }

  // Recursively render a classification group as a nested list item.
  function renderGroup(g) {
    const heading = `<span class="cls-heading">${esc(g.heading)}</span>`;
    let inner = '';
    if (Array.isArray(g.groups) && g.groups.length) {
      inner += `<ul class="cls-list">${g.groups.map(renderGroup).join('')}</ul>`;
    }
    if (Array.isArray(g.drugs) && g.drugs.length) {
      inner += `<ul class="cls-drugs">${g.drugs.map(d => `<li>${esc(d)}</li>`).join('')}</ul>`;
    }
    return `<li>${heading}${inner}</li>`;
  }

  // Pure renderer: classification object → HTML string. One <section> per
  // source (G&G, KDT), each labelled with its citation, then the nested
  // outline. Returns a friendly message when there is no classification yet.
  function renderClassificationHTML(classification) {
    if (!classification || !Array.isArray(classification.sources) || classification.sources.length === 0) {
      return `<div class="cls-empty">No classification recorded for this district yet.</div>`;
    }
    return classification.sources.map(s => `
      <section class="cls-source">
        <h3 class="cls-source-title">${esc(s.label)} <span class="cls-cite">${esc(s.cite)}</span></h3>
        <ul class="cls-list">${(s.groups || []).map(renderGroup).join('')}</ul>
      </section>
    `).join('');
  }

  function mount(rootEl) {
    const panel = document.createElement('aside');
    panel.className = 'walkthrough classification-panel';
    rootEl.appendChild(panel);

    let currentId = null;

    function close() { panel.classList.remove('open'); }
    function render(d) {
      panel.innerHTML = `
        <button class="btn" style="position:absolute;top:12px;right:12px" id="cls-close" aria-label="Close classification">×</button>
        <div class="cls-title">${esc(d.name ?? '')} — Classification</div>
        <a class="cls-flowchart-link" href="classification.html" target="_blank" rel="noopener">Open full flowchart (ADME · MOA · uses · ADR) ↗</a>
        <div class="cls-body">${renderClassificationHTML(d.classification)}</div>
      `;
      panel.querySelector('#cls-close').onclick = close;
    }
    function open() {
      if (!currentId) return;
      const d = window['DISTRICT_' + currentId.toUpperCase()];
      if (!d) return;
      render(d);
      panel.classList.add('open');
    }

    // Tapping anywhere outside the open panel dismisses it.
    document.addEventListener('pointerdown', (e) => {
      if (!panel.classList.contains('open')) return;
      if (panel.contains(e.target)) return;
      // Don't close when the click is the Classify button re-opening us.
      if (e.target && e.target.id === 'classifyBtn') return;
      close();
    });

    P.app.on('navigate', s => {
      // Classification is per-district; keep the district context when on a
      // flashcard so the button still works, otherwise drop it.
      currentId = (s.level === 'district' || s.level === 'flashcard') ? s.districtId : null;
      if (!currentId) close();
    });

    P.classification.open = open;
    P.classification.close = close;
  }

  P.classification = { mount, renderClassificationHTML };
})();

export { };
