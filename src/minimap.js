// Mini-map — SVG overlay top-right, dot per district at its world (x,z),
// click a dot to navigate. Press M or click the map button to toggle.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  let svg = null;
  let mapEl = null;
  let visible = false;

  function districts() {
    const out = [];
    if (typeof window === 'undefined') return out;
    for (const k in window) {
      if (!k.startsWith('DISTRICT_')) continue;
      const d = window[k];
      if (d?.id && d?.name && d?.position) out.push(d);
    }
    return out;
  }

  function render() {
    if (!svg) return;
    const ds = districts();
    if (ds.length === 0) return;
    // Find bounds of district positions.
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    ds.forEach(d => {
      minX = Math.min(minX, d.position.x); maxX = Math.max(maxX, d.position.x);
      minZ = Math.min(minZ, d.position.z); maxZ = Math.max(maxZ, d.position.z);
    });
    const padding = 15;
    const w = (maxX - minX) + padding * 2;
    const h = (maxZ - minZ) + padding * 2;
    const viewW = 240, viewH = 240;
    const scale = Math.min(viewW / w, viewH / h);
    const offX = (viewW - w * scale) / 2 - (minX - padding) * scale;
    const offZ = (viewH - h * scale) / 2 - (minZ - padding) * scale;
    const proj = (px, pz) => ({ x: px * scale + offX, y: pz * scale + offZ });

    // Roads — same edges as city-scene.
    const ROADS = [
      ['cholinergic','ans_hub'],['ans_hub','adrenergic'],
      ['ans_hub','autacoids'],['autacoids','cvs'],
      ['cvs','respiratory'],['cvs','git'],
      ['ans_hub','renal'],['ans_hub','respiratory'],
      ['ans_hub','cns'],['cns','endocrine'],['cns','chemotherapy'],
      ['chemotherapy','toxicology'],
      ['general_pharmacology','ans_hub'],['git','recent_advances'],
    ];
    const byId = {}; ds.forEach(d => byId[d.id] = d);
    const parts = [];
    parts.push(`<svg width="${viewW}" height="${viewH}" viewBox="0 0 ${viewW} ${viewH}" xmlns="http://www.w3.org/2000/svg">`);
    parts.push(`<rect x="0" y="0" width="${viewW}" height="${viewH}" fill="#b5e26b" rx="10"/>`);
    ROADS.forEach(([a, b]) => {
      const A = byId[a], B = byId[b]; if (!A || !B) return;
      const pa = proj(A.position.x, A.position.z), pb = proj(B.position.x, B.position.z);
      parts.push(`<line x1="${pa.x.toFixed(1)}" y1="${pa.y.toFixed(1)}" x2="${pb.x.toFixed(1)}" y2="${pb.y.toFixed(1)}" stroke="#eadcb6" stroke-width="3" stroke-linecap="round"/>`);
    });
    ds.forEach(d => {
      const p = proj(d.position.x, d.position.z);
      const color = '#' + ((d.palette?.accent ?? 0x888780) >>> 0).toString(16).padStart(6, '0');
      parts.push(`<circle data-d="${d.id}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="7" fill="${color}" stroke="#1a2238" stroke-width="1.2" class="mm-dot" />`);
      parts.push(`<text x="${p.x.toFixed(1)}" y="${(p.y - 10).toFixed(1)}" font-size="9" font-weight="600" text-anchor="middle" fill="#1a2238" pointer-events="none">${d.name}</text>`);
    });
    parts.push(`</svg>`);
    svg.innerHTML = parts.join('');
    svg.querySelectorAll('.mm-dot').forEach(el => {
      el.addEventListener('click', () => {
        P.app?.goTo?.('district', { districtId: el.getAttribute('data-d') });
      });
    });
  }

  function open() { if (!mapEl) return; render(); mapEl.style.display = 'block'; visible = true; }
  function close() { if (mapEl) { mapEl.style.display = 'none'; visible = false; } }
  function toggle() { visible ? close() : open(); }

  function mount(rootEl) {
    if (mapEl) return;
    mapEl = document.createElement('div');
    mapEl.className = 'minimap';
    mapEl.style.display = 'none';
    svg = document.createElement('div');
    svg.className = 'minimap-svg';
    mapEl.appendChild(svg);
    rootEl.appendChild(mapEl);
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'm' || e.key === 'M') {
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
          toggle();
        }
      });
    }
  }

  P.minimap = { mount, open, close, toggle };
})();
