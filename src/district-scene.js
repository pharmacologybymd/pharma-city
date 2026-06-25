// District scene (level 2). Mounted ONCE per page from app.js boot(); no dispose path.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function mount(rootEl) {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    canvas.style.touchAction = 'none';
    rootEl.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1020);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(20, 40, 20); scene.add(dir);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshLambertMaterial({color: 0x639922}));
    ground.rotation.x = -Math.PI/2; scene.add(ground);

    const groupRoot = new THREE.Group();
    scene.add(groupRoot);
    let pickables = [];
    let labelEntries = [];

    const labelLayer = document.createElement('div');
    labelLayer.className = 'label-layer';
    labelLayer.style.display = 'none';
    rootEl.appendChild(labelLayer);

    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }

    function clearLabels() {
      while (labelLayer.firstChild) labelLayer.removeChild(labelLayer.firstChild);
      labelEntries = [];
    }

    function loadDistrict(id) {
      while (groupRoot.children.length) groupRoot.remove(groupRoot.children[0]);
      pickables = [];
      clearLabels();
      const d = window['DISTRICT_' + id.toUpperCase()];
      if (!d) return;
      ground.material.dispose();
      ground.material = new THREE.MeshLambertMaterial({ color: d.palette?.ground ?? 0x639922 });
      const drugs = d.drugs || [];
      drugs.forEach((drug, i) => {
        const row = Math.floor(i / 5), col = i % 5;
        const h = 10 + (drug.high_yield ? 4 : 0);
        const g = new THREE.Group();
        const lm = P.primitives.tower({ w: 6, h, d: 6, color: d.palette?.accent ?? 0x888780 });
        g.add(lm);
        g.position.set(-15 + col * 7, 0, -10 + row * 8);
        g.userData = { drugId: drug.id };
        groupRoot.add(g);
        pickables.push(g);

        const el = document.createElement('div');
        el.className = 'wlabel wlabel--drug';
        el.textContent = drug.id;
        labelLayer.appendChild(el);
        labelEntries.push({ el, worldPos: new THREE.Vector3(g.position.x, h + 2, g.position.z) });
      });
      P.animations?.attach?.(id, scene, groupRoot);
      applyLabelMode();
    }

    function applyLabelMode() {
      const hide = (P.selfTest?.isOn?.() === true);
      labelEntries.forEach(({ el }) => { el.style.visibility = hide ? 'hidden' : ''; });
    }
    P.selfTest?.onChange?.(applyLabelMode);

    // Spherical orbit state — drag to rotate, scroll to zoom.
    const target = new THREE.Vector3(0, 4, 0);
    let yaw = Math.PI * 0.25;
    let pitch = Math.PI * 0.32;
    let distance = 45;
    const MIN_DIST = 18, MAX_DIST = 90;
    const MIN_PITCH = 0.15, MAX_PITCH = Math.PI / 2 - 0.05;

    function updateCamera() {
      const sinP = Math.sin(pitch);
      camera.position.x = target.x + distance * sinP * Math.sin(yaw);
      camera.position.y = target.y + distance * Math.cos(pitch);
      camera.position.z = target.z + distance * sinP * Math.cos(yaw);
      camera.lookAt(target);
    }
    updateCamera();

    const DRAG_THRESHOLD = 6;
    const ray = new THREE.Raycaster();
    const pt = new THREE.Vector2();
    let activePointer = null;
    let startX = 0, startY = 0, lastX = 0, lastY = 0;
    let dragMoved = false;

    canvas.addEventListener('pointerdown', (e) => {
      if (activePointer !== null) return;
      activePointer = e.pointerId;
      startX = lastX = e.clientX;
      startY = lastY = e.clientY;
      dragMoved = false;
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    });
    canvas.addEventListener('pointermove', (e) => {
      if (e.pointerId !== activePointer) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      if (Math.abs(e.clientX - startX) > DRAG_THRESHOLD || Math.abs(e.clientY - startY) > DRAG_THRESHOLD) {
        dragMoved = true;
      }
      if (dragMoved) {
        yaw -= dx * 0.005;
        pitch -= dy * 0.005;
        if (pitch < MIN_PITCH) pitch = MIN_PITCH;
        if (pitch > MAX_PITCH) pitch = MAX_PITCH;
      }
    });
    function endPointer(e) {
      if (e.pointerId !== activePointer) return;
      activePointer = null;
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      if (!dragMoved) {
        const rect = canvas.getBoundingClientRect();
        pt.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pt.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        camera.updateMatrixWorld();
        ray.setFromCamera(pt, camera);
        const hit = ray.intersectObjects(pickables, true)[0];
        if (hit) {
          let g = hit.object; while (g && !g.userData?.drugId) g = g.parent;
          if (g?.userData?.drugId) P.app.goTo('flashcard', { districtId: P.app.state.districtId, drugId: g.userData.drugId });
        }
      }
    }
    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', endPointer);

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      distance += e.deltaY * 0.08;
      if (distance < MIN_DIST) distance = MIN_DIST;
      if (distance > MAX_DIST) distance = MAX_DIST;
    }, { passive: false });

    const labelVec = new THREE.Vector3();
    function updateLabels() {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      for (let i = 0; i < labelEntries.length; i++) {
        const { el, worldPos } = labelEntries[i];
        labelVec.copy(worldPos).project(camera);
        if (labelVec.z > 1 || labelVec.z < -1) { el.style.display = 'none'; continue; }
        el.style.display = '';
        el.style.left = ((labelVec.x * 0.5 + 0.5) * w + rect.left) + 'px';
        el.style.top = ((-labelVec.y * 0.5 + 0.5) * h + rect.top) + 'px';
      }
    }

    let visible = false;
    function tick(_dt, _t) {
      if (!visible) return;
      updateCamera();
      renderer.render(scene, camera);
      updateLabels();
    }
    P.loop.add(tick);
    P.app.on('navigate', s => {
      visible = s.level === 'district' || s.level === 'flashcard';
      canvas.style.display = visible ? 'block' : 'none';
      labelLayer.style.display = visible ? '' : 'none';
      if (s.level === 'district' && s.districtId) loadDistrict(s.districtId);
    });
    window.addEventListener('resize', resize); resize();
  }
  P.district = { mount };
})();
