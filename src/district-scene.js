// District scene (level 2). Mounted ONCE per page from app.js boot(); no dispose path.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function mount(rootEl) {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    rootEl.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1020);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
    camera.position.set(40, 25, 40); camera.lookAt(0, 4, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(20, 40, 20); scene.add(dir);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshLambertMaterial({color: 0x639922}));
    ground.rotation.x = -Math.PI/2; scene.add(ground);

    const groupRoot = new THREE.Group();
    scene.add(groupRoot);
    let pickables = [];

    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }

    function loadDistrict(id) {
      // clear
      while (groupRoot.children.length) groupRoot.remove(groupRoot.children[0]);
      pickables = [];
      const d = window['DISTRICT_' + id.toUpperCase()];
      if (!d) return;
      // Dispose the previous ground material before swapping — otherwise
      // every district navigation orphans a MeshLambertMaterial in GPU mem.
      ground.material.dispose();
      ground.material = new THREE.MeshLambertMaterial({ color: d.palette?.ground ?? 0x639922 });
      // arrange drugs in a 5-per-row grid centred at origin
      const drugs = d.drugs || [];
      drugs.forEach((drug, i) => {
        const row = Math.floor(i / 5), col = i % 5;
        const g = new THREE.Group();
        const lm = P.primitives.tower({ w: 6, h: 10 + (drug.high_yield ? 4 : 0), d: 6, color: d.palette?.accent ?? 0x888780 });
        g.add(lm);
        g.position.set(-15 + col * 7, 0, -10 + row * 8);
        g.userData = { drugId: drug.id };
        groupRoot.add(g);
        pickables.push(g);
      });
      // call optional animation hook
      P.animations?.attach?.(id, scene, groupRoot);
    }

    const ray = new THREE.Raycaster(); const pt = new THREE.Vector2();
    canvas.addEventListener('pointerdown', (e) => {
      const rect = canvas.getBoundingClientRect();
      pt.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pt.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(pt, camera);
      const hit = ray.intersectObjects(pickables, true)[0];
      if (hit) {
        let g = hit.object; while (g && !g.userData?.drugId) g = g.parent;
        if (g?.userData?.drugId) P.app.goTo('flashcard', { districtId: P.app.state.districtId, drugId: g.userData.drugId });
      }
    });

    let visible = false;
    function tick(_dt, t) {
      if (!visible) return;
      const r = 35;
      camera.position.x = Math.sin(t * 0.12) * r;
      camera.position.z = Math.cos(t * 0.12) * r;
      camera.position.y = 18 + Math.sin(t * 0.3) * 2;
      camera.lookAt(0, 4, 0);
      renderer.render(scene, camera);
    }
    P.loop.add(tick);
    P.app.on('navigate', s => {
      visible = s.level === 'district' || s.level === 'flashcard';
      canvas.style.display = visible ? 'block' : 'none';
      if (s.level === 'district' && s.districtId) loadDistrict(s.districtId);
    });
    window.addEventListener('resize', resize); resize();
  }
  P.district = { mount };
})();
