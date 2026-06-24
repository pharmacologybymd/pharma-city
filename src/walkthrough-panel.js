(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const seen = new Set();
  function mount(rootEl) {
    const panel = document.createElement('aside');
    panel.className = 'walkthrough';
    rootEl.appendChild(panel);
    const reopenBtn = document.createElement('button');
    reopenBtn.className = 'btn';
    reopenBtn.style.position = 'absolute'; reopenBtn.style.left = '12px'; reopenBtn.style.bottom = '12px'; reopenBtn.style.zIndex = '12';
    reopenBtn.style.display = 'none';
    reopenBtn.textContent = '? Walkthrough';
    rootEl.appendChild(reopenBtn);

    function close() { panel.classList.remove('open'); reopenBtn.style.display = ''; }
    function open(text, name) {
      panel.innerHTML = `
        <button class="btn" style="position:absolute;top:12px;right:12px" id="wt-close">×</button>
        <div style="font-size:18px;font-weight:500;margin-bottom:8px">${esc(name)}</div>
        <div style="font-size:14px;line-height:1.6">${esc(text)}</div>
      `;
      panel.querySelector('#wt-close').onclick = close;
      panel.classList.add('open');
      reopenBtn.style.display = 'none';
    }
    function esc(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]); }

    P.app.on('navigate', s => {
      if (s.level !== 'district' || !s.districtId) {
        panel.classList.remove('open');
        reopenBtn.style.display = 'none';
        return;
      }
      const d = window['DISTRICT_' + s.districtId.toUpperCase()];
      if (!d) return;
      reopenBtn.onclick = () => open(d.walkthrough, d.name);
      if (!seen.has(s.districtId)) {
        seen.add(s.districtId);
        open(d.walkthrough, d.name);
      } else {
        reopenBtn.style.display = '';
      }
    });
  }
  P.walkthrough = { mount };
})();
