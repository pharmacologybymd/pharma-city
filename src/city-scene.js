// City scene (level 1). Mounts ONCE per page from app.js boot(); no dispose
// path is provided because we never tear it down. If you ever change the
// app to remount, also wire P.loop.remove(tick) + window.removeEventListener
// before remount or the listeners will accumulate.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function mount(rootEl) {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.touchAction = 'none';
    rootEl.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1020);
    scene.fog = new THREE.Fog(0x0b1020, 80, 260);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(40, 60, 30); dir.castShadow = true;
    const isHiDPI = window.devicePixelRatio >= 2;
    dir.shadow.mapSize.width = isHiDPI ? 1024 : 512;
    dir.shadow.mapSize.height = isHiDPI ? 1024 : 512;
    dir.shadow.camera.left=-70; dir.shadow.camera.right=70; dir.shadow.camera.top=70; dir.shadow.camera.bottom=-70;
    scene.add(dir);
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), new THREE.MeshLambertMaterial({color: 0x97C459}));
    ground.rotation.x = -Math.PI/2; ground.receiveShadow = true; scene.add(ground);

    const districts = (typeof CITY !== 'undefined') ? CITY.districts : [];
    const pickables = [];
    const labels = [];
    const labelLayer = document.createElement('div');
    labelLayer.className = 'label-layer';
    rootEl.appendChild(labelLayer);

    districts.forEach(id => {
      const districtData = window['DISTRICT_' + id.toUpperCase()];
      if (!districtData) return;
      const group = new THREE.Group();
      const lm = P.primitives.tower({ w: 10, h: 14, d: 10, color: districtData.palette?.accent ?? 0x888780 });
      group.add(lm);
      group.position.set(districtData.position.x, 0, districtData.position.z);
      group.userData.districtId = id;
      scene.add(group);
      pickables.push(group);

      const el = document.createElement('div');
      el.className = 'wlabel';
      el.textContent = districtData.name || id;
      labelLayer.appendChild(el);
      labels.push({ el, worldPos: new THREE.Vector3(districtData.position.x, 16, districtData.position.z) });
    });

    // Spherical orbit state. Drag to rotate, scroll to zoom. No more auto-orbit.
    const target = new THREE.Vector3(0, 6, 0);
    let yaw = Math.PI * 0.25;
    let pitch = Math.PI * 0.32;
    let distance = 90;
    const MIN_DIST = 30, MAX_DIST = 180;
    const MIN_PITCH = 0.15, MAX_PITCH = Math.PI / 2 - 0.05;

    function updateCamera() {
      const sinP = Math.sin(pitch);
      camera.position.x = target.x + distance * sinP * Math.sin(yaw);
      camera.position.y = target.y + distance * Math.cos(pitch);
      camera.position.z = target.z + distance * sinP * Math.cos(yaw);
      camera.lookAt(target);
    }
    updateCamera();

    // Drag vs click: a pointerdown that moves more than DRAG_THRESHOLD px
    // becomes a drag (orbit). Less than that and a pointerup fires a click
    // through the raycaster.
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
          let g = hit.object; while (g && !g.userData?.districtId) g = g.parent;
          if (g?.userData?.districtId) P.app.goTo('district', { districtId: g.userData.districtId });
        }
      }
    }
    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', endPointer);

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      distance += e.deltaY * 0.12;
      if (distance < MIN_DIST) distance = MIN_DIST;
      if (distance > MAX_DIST) distance = MAX_DIST;
    }, { passive: false });

    const labelVec = new THREE.Vector3();
    function updateLabels() {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      for (let i = 0; i < labels.length; i++) {
        const { el, worldPos } = labels[i];
        labelVec.copy(worldPos).project(camera);
        if (labelVec.z > 1 || labelVec.z < -1) { el.style.display = 'none'; continue; }
        el.style.display = '';
        el.style.left = ((labelVec.x * 0.5 + 0.5) * w + rect.left) + 'px';
        el.style.top = ((-labelVec.y * 0.5 + 0.5) * h + rect.top) + 'px';
      }
    }

    let visible = true;
    function tick(_dt, _t) {
      if (!visible) return;
      updateCamera();
      renderer.render(scene, camera);
      updateLabels();
    }
    P.loop.add(tick);
    P.app.on('navigate', s => {
      visible = s.level === 'city';
      canvas.style.display = visible ? 'block' : 'none';
      labelLayer.style.display = visible ? '' : 'none';
    });
    window.addEventListener('resize', resize); resize();
  }
  P.city = { mount };
})();
