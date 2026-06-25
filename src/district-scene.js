// District scene (level 2). Mounted ONCE per page from app.js boot(); no dispose path.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function mount(rootEl) {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    canvas.style.touchAction = 'none';
    canvas.style.cursor = 'grab';
    rootEl.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    // Bright daytime sky, matching the city overview.
    scene.background = new THREE.Color(0xa6dcef);
    scene.fog = new THREE.Fog(0xc9e8f5, 70, 220);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
    scene.add(new THREE.HemisphereLight(0xfff7e6, 0x6cb56b, 0.45));
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xfff5d6, 1.0);
    dir.position.set(20, 50, 20); scene.add(dir);

    // Sun + lightweight clouds — fewer/smaller than city since camera is closer.
    const sun = new THREE.Mesh(new THREE.SphereGeometry(4, 18, 12), new THREE.MeshBasicMaterial({ color: 0xfff2a8 }));
    sun.position.set(30, 55, -40); scene.add(sun);
    const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
    const clouds = [];
    for (let i = 0; i < 3; i++) {
      const cloud = new THREE.Group();
      [[0,0,0,3.5],[3,0.5,1,2.6],[-2.5,0,0.5,2.8]].forEach(([x,y,z,r]) => {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), cloudMat);
        puff.position.set(x, y, z); cloud.add(puff);
      });
      cloud.position.set(-40 + Math.random() * 80, 30 + Math.random() * 8, -30 + Math.random() * 20);
      cloud.userData.driftSpeed = 0.2 + Math.random() * 0.3;
      scene.add(cloud); clouds.push(cloud);
    }

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(140, 140), new THREE.MeshLambertMaterial({color: 0x639922}));
    ground.rotation.x = -Math.PI/2; ground.receiveShadow = true; scene.add(ground);

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

    // Multi-tier drug building — plinth + accent body + lighter dome + window strip.
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xfff2b3 });
    const winGeom = new THREE.BoxGeometry(0.45, 0.9, 0.18);
    function buildDrugTower(h, accentHex) {
      const group = new THREE.Group();
      const accentCol = new THREE.Color(accentHex);
      const hsl = { h:0, s:0, l:0 }; accentCol.getHSL(hsl);
      const lighter = new THREE.Color().setHSL(hsl.h, Math.min(1, hsl.s * 0.9), Math.min(0.92, hsl.l + 0.18));
      const darker = new THREE.Color().setHSL(hsl.h, hsl.s, Math.max(0.05, hsl.l - 0.18));

      const plinth = new THREE.Mesh(new THREE.BoxGeometry(7, 1.4, 7), new THREE.MeshLambertMaterial({ color: darker }));
      plinth.position.y = 0.7; plinth.castShadow = true; plinth.receiveShadow = true;
      group.add(plinth);

      const body = new THREE.Mesh(new THREE.BoxGeometry(6, h, 6), new THREE.MeshLambertMaterial({ color: accentCol }));
      body.position.y = 1.4 + h / 2; body.castShadow = true; body.receiveShadow = true;
      group.add(body);

      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(3.2, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshLambertMaterial({ color: lighter })
      );
      dome.position.y = 1.4 + h; dome.castShadow = true;
      group.add(dome);

      // 1 row of lit windows × 4 faces × 3 columns — keeps total mesh count manageable.
      const FACE_OFFS = [
        [0, 3.05, 0], [0, -3.05, Math.PI], [3.05, 0, Math.PI/2], [-3.05, 0, -Math.PI/2],
      ];
      const winY = 1.4 + h * 0.55;
      FACE_OFFS.forEach(([fx, fz, ry]) => {
        for (let col = -1; col <= 1; col++) {
          const w = new THREE.Mesh(winGeom, windowMat);
          if (ry === 0 || ry === Math.PI) {
            w.position.set(col * 1.3, winY, fz === 0 ? fx : fz);
          } else {
            w.position.set(fx, winY, col * 1.3);
          }
          w.rotation.y = ry;
          group.add(w);
        }
      });

      return group;
    }

    const districtRoadMat = new THREE.MeshLambertMaterial({ color: 0xeadcb6 });

    function loadDistrict(id) {
      while (groupRoot.children.length) groupRoot.remove(groupRoot.children[0]);
      pickables = [];
      clearLabels();
      const d = window['DISTRICT_' + id.toUpperCase()];
      if (!d) return;
      ground.material.dispose();
      ground.material = new THREE.MeshLambertMaterial({ color: d.palette?.ground ?? 0x639922 });
      const drugs = d.drugs || [];
      const accentHex = d.palette?.accent ?? 0x888780;

      // Grid layout: 5 columns, variable rows. Spacing widened so there is
      // room for a visible road between every pair of buildings.
      const COLS = 5;
      const COL_SPACING = 10;
      const ROW_SPACING = 11;
      const rows = Math.max(1, Math.ceil(drugs.length / COLS));
      const xMin = -(COLS - 1) * COL_SPACING / 2;
      const zMin = -(rows - 1) * ROW_SPACING / 2;

      // Vertical roads (running along z) between every pair of columns.
      const verticalRoadLen = (rows - 1) * ROW_SPACING + 9;
      for (let c = 0; c < COLS - 1; c++) {
        const x = xMin + (c + 0.5) * COL_SPACING;
        const road = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.05, verticalRoadLen), districtRoadMat);
        road.position.set(x, 0.06, 0);
        road.receiveShadow = true;
        groupRoot.add(road);
      }
      // Horizontal roads (running along x) between every pair of rows.
      const horizontalRoadLen = (COLS - 1) * COL_SPACING + 8;
      for (let r = 0; r < rows - 1; r++) {
        const z = zMin + (r + 0.5) * ROW_SPACING;
        const road = new THREE.Mesh(new THREE.BoxGeometry(horizontalRoadLen, 0.05, 2.2), districtRoadMat);
        road.position.set(0, 0.06, z);
        road.receiveShadow = true;
        groupRoot.add(road);
      }

      drugs.forEach((drug, i) => {
        const row = Math.floor(i / COLS), col = i % COLS;
        const h = 7 + (drug.high_yield ? 3.5 : 0);
        const tower = buildDrugTower(h, accentHex);
        tower.position.set(xMin + col * COL_SPACING, 0, zMin + row * ROW_SPACING);
        tower.userData = { drugId: drug.id, baseY: 0 };
        groupRoot.add(tower);
        pickables.push(tower);

        const el = document.createElement('div');
        el.className = 'wlabel wlabel--drug';
        el.textContent = drug.id;
        labelLayer.appendChild(el);
        labelEntries.push({ el, worldPos: new THREE.Vector3(tower.position.x, 1.4 + h + 4, tower.position.z), drugId: drug.id });
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
    const MIN_DIST = 14, MAX_DIST = 110;
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
    let hoveredDrug = null;

    function raycastHover(e) {
      const rect = canvas.getBoundingClientRect();
      pt.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pt.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      camera.updateMatrixWorld();
      ray.setFromCamera(pt, camera);
      const hit = ray.intersectObjects(pickables, true)[0];
      if (hit) {
        let g = hit.object; while (g && !g.userData?.drugId) g = g.parent;
        return g?.userData?.drugId ?? null;
      }
      return null;
    }

    canvas.addEventListener('pointerdown', (e) => {
      if (activePointer !== null) return;
      activePointer = e.pointerId;
      startX = lastX = e.clientX;
      startY = lastY = e.clientY;
      dragMoved = false;
      canvas.style.cursor = 'grabbing';
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    });
    canvas.addEventListener('pointermove', (e) => {
      if (activePointer === null) {
        hoveredDrug = raycastHover(e);
        canvas.style.cursor = hoveredDrug ? 'pointer' : 'grab';
        return;
      }
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
    canvas.addEventListener('pointerleave', () => { hoveredDrug = null; canvas.style.cursor = 'grab'; });
    function endPointer(e) {
      if (e.pointerId !== activePointer) return;
      activePointer = null;
      canvas.style.cursor = hoveredDrug ? 'pointer' : 'grab';
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
        const { el, worldPos, drugId } = labelEntries[i];
        labelVec.copy(worldPos).project(camera);
        if (labelVec.z > 1 || labelVec.z < -1) { el.style.display = 'none'; continue; }
        el.style.display = '';
        el.style.left = ((labelVec.x * 0.5 + 0.5) * w + rect.left) + 'px';
        el.style.top = ((-labelVec.y * 0.5 + 0.5) * h + rect.top) + 'px';
        el.classList.toggle('wlabel--hover', drugId === hoveredDrug);
      }
    }

    function updateHoverAnimations(dt) {
      const k = 1 - Math.exp(-dt * 14);
      for (const g of pickables) {
        const isHover = g.userData.drugId === hoveredDrug;
        const tgtScale = isHover ? 1.18 : 1.0;
        const tgtY = isHover ? 1.4 : 0;
        g.scale.x += (tgtScale - g.scale.x) * k;
        g.scale.y += (tgtScale - g.scale.y) * k;
        g.scale.z += (tgtScale - g.scale.z) * k;
        g.position.y += (tgtY - g.position.y) * k;
      }
    }

    let visible = false;
    function tick(dt, t) {
      if (!visible) return;
      updateCamera();
      updateHoverAnimations(dt);
      for (const c of clouds) {
        c.position.x += c.userData.driftSpeed * dt;
        if (c.position.x > 80) c.position.x = -80;
      }
      sun.position.y = 55 + Math.sin(t * 0.2) * 1.0;
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
