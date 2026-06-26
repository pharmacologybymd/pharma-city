// Flowchart overlay — embeds the standalone classification.html as a
// full-screen iframe inside the main city app, so the user can browse the
// drug classification tree without losing their 3D scene state.
//
// PHARMA.flowchart.open()  — show the overlay (lazy-loads the iframe)
// PHARMA.flowchart.close()
// PHARMA.flowchart.toggle()
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  let overlay = null;
  let iframe = null;
  let visible = false;
  let loaded = false;

  function ensure(rootEl) {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'flowchart-overlay';
    overlay.style.display = 'none';
    overlay.innerHTML = `
      <div class="fc-bar">
        <span class="fc-title">Drug classification flowchart</span>
        <a class="btn btn-brand fc-open-tab" href="classification.html" target="_blank" rel="noopener" aria-label="open in new tab">Open in new tab ↗</a>
        <button class="btn fc-close" id="fcClose" aria-label="close flowchart">× Close</button>
      </div>
      <div class="fc-iframe-wrap"><iframe class="fc-iframe" title="Classification flowchart" loading="lazy"></iframe></div>
    `;
    rootEl.appendChild(overlay);
    iframe = overlay.querySelector('.fc-iframe');
    overlay.querySelector('#fcClose').addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && visible) close();
    });
  }

  function open() {
    if (!overlay) return;
    if (!loaded) {
      // Load lazily so the iframe only fetches when the user actually opens it.
      iframe.src = 'classification.html';
      loaded = true;
    }
    // Keep the iframe's theme in sync with the host on first open.
    syncTheme();
    overlay.style.display = 'flex';
    visible = true;
  }
  function close() {
    if (overlay) overlay.style.display = 'none';
    visible = false;
  }
  function toggle() { visible ? close() : open(); }

  function syncTheme() {
    // The classification page reads localStorage too, so themes already
    // match on initial load. This is a best-effort post-message in case the
    // host has toggled while the iframe is already loaded.
    try {
      const t = P.theme?.getTheme?.() || 'day';
      if (iframe?.contentWindow) iframe.contentWindow.postMessage({ type: 'theme', value: t }, '*');
    } catch (_) {}
  }

  function mount(rootEl) {
    ensure(rootEl);
    P.theme?.onChange?.(syncTheme);
  }

  P.flowchart = { mount, open, close, toggle };
})();
