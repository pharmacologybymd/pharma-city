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
    canvas.style.cursor = 'grab';
    rootEl.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    // Bright daytime sky. setSkyForTheme() swaps colors / objects for night mode.
    scene.background = new THREE.Color(0xa6dcef);
    scene.fog = new THREE.Fog(0xc9e8f5, 110, 320);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    scene.add(new THREE.HemisphereLight(0xfff7e6, 0x6cb56b, 0.45));
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0xfff5d6, 1.0);
    dir.position.set(40, 80, 30); dir.castShadow = true;
    const isHiDPI = window.devicePixelRatio >= 2;
    dir.shadow.mapSize.width = isHiDPI ? 1024 : 512;
    dir.shadow.mapSize.height = isHiDPI ? 1024 : 512;
    dir.shadow.camera.left=-80; dir.shadow.camera.right=80; dir.shadow.camera.top=80; dir.shadow.camera.bottom=-80;
    scene.add(dir);
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Sun (day) + moon + stars (night).
    const sun = new THREE.Mesh(new THREE.SphereGeometry(8, 24, 16), new THREE.MeshBasicMaterial({ color: 0xfff2a8 }));
    sun.position.set(70, 90, -70); scene.add(sun);
    const moon = new THREE.Mesh(new THREE.SphereGeometry(7, 24, 16), new THREE.MeshBasicMaterial({ color: 0xf0f0ff }));
    moon.position.set(70, 90, -70); moon.visible = false; scene.add(moon);
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const r = 180 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(0.2 + Math.random() * 0.8); // upper hemisphere
      starPositions[i*3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i*3+1] = r * Math.cos(phi);
      starPositions[i*3+2] = r * Math.sin(phi) * Math.sin(theta);
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starGeom, new THREE.PointsMaterial({ color: 0xffffff, size: 0.9, transparent: true, opacity: 0.85 }));
    stars.visible = false; scene.add(stars);
    function setSkyForTheme(t) {
      if (t === 'night') {
        scene.background.set(0x0a1530); scene.fog.color.set(0x101b3c);
        sun.visible = false; moon.visible = true; stars.visible = true;
        dir.intensity = 0.45; dir.color.set(0xbfd0ff);
      } else {
        scene.background.set(0xa6dcef); scene.fog.color.set(0xc9e8f5);
        sun.visible = true; moon.visible = false; stars.visible = false;
        dir.intensity = 1.0; dir.color.set(0xfff5d6);
      }
    }
    const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
    const clouds = [];
    for (let i = 0; i < 6; i++) {
      const cloud = new THREE.Group();
      [[0,0,0,8],[6,1,2,6],[-5,0,1,6.5],[3,-1,-3,5.5]].forEach(([x,y,z,r]) => {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 8), cloudMat);
        puff.position.set(x, y, z);
        cloud.add(puff);
      });
      cloud.position.set(-100 + Math.random() * 200, 55 + Math.random() * 15, -80 + Math.random() * 60);
      cloud.userData.driftSpeed = 0.3 + Math.random() * 0.4;
      scene.add(cloud);
      clouds.push(cloud);
    }

    // Brighter grass.
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(260, 260), new THREE.MeshLambertMaterial({color: 0xb5e26b}));
    ground.rotation.x = -Math.PI/2; ground.receiveShadow = true; scene.add(ground);

    // Road network — conceptual edges between districts so distance reads
    // as relatedness. Drawn at y=0.05 to avoid z-fighting with the ground.
    const ROADS = [
      ['cholinergic', 'ans_hub'], ['ans_hub', 'adrenergic'],
      ['ans_hub', 'autacoids'], ['autacoids', 'cvs'],
      ['cvs', 'respiratory'], ['cvs', 'git'],
      ['ans_hub', 'renal'], ['ans_hub', 'respiratory'],
      ['ans_hub', 'cns'], ['cns', 'endocrine'], ['cns', 'chemotherapy'],
      ['chemotherapy', 'toxicology'],
      ['general_pharmacology', 'ans_hub'],
      ['git', 'recent_advances'],
    ];
    const roadMat = new THREE.MeshLambertMaterial({ color: 0xeadcb6 });
    function districtVec(id) {
      const d = window['DISTRICT_' + id.toUpperCase()];
      return d ? new THREE.Vector3(d.position.x, 0.06, d.position.z) : null;
    }
    ROADS.forEach(([a, b]) => {
      const A = districtVec(a), B = districtVec(b);
      if (!A || !B) return;
      const len = A.distanceTo(B);
      const road = new THREE.Mesh(new THREE.BoxGeometry(len, 0.05, 2.6), roadMat);
      const mid = A.clone().add(B).multiplyScalar(0.5);
      road.position.copy(mid);
      road.rotation.y = -Math.atan2(B.z - A.z, B.x - A.x);
      road.receiveShadow = true;
      scene.add(road);
    });

    // Roving car that tours the road network — adds a touch of life to the
    // city. Placed after roads so it spawns on top of them.
    P.car?.mount?.(scene);

    const districts = (typeof CITY !== 'undefined') ? CITY.districts : [];
    const pickables = [];
    const labels = [];
    const labelLayer = document.createElement('div');
    labelLayer.className = 'label-layer';
    rootEl.appendChild(labelLayer);

    // Multi-tier landmark builder — darker plinth + accent body + lighter dome.
    // Adds a strip of lit windows around the body so each building reads as 3D.
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xfff2b3 });
    const winGeom = new THREE.BoxGeometry(0.7, 1.3, 0.25);
    function buildLandmark(districtData) {
      const group = new THREE.Group();
      const accentHex = districtData.palette?.accent ?? 0x888780;
      const accentCol = new THREE.Color(accentHex);
      const lighterHsl = { h: 0, s: 0, l: 0 };
      const darkerHsl = { h: 0, s: 0, l: 0 };
      accentCol.getHSL(lighterHsl); accentCol.getHSL(darkerHsl);
      const lighter = new THREE.Color().setHSL(lighterHsl.h, Math.min(1, lighterHsl.s * 0.9), Math.min(0.92, lighterHsl.l + 0.18));
      const darker = new THREE.Color().setHSL(darkerHsl.h, darkerHsl.s, Math.max(0.05, darkerHsl.l - 0.18));

      // Plinth — slightly wider, darker.
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(12, 3, 12), new THREE.MeshLambertMaterial({ color: darker }));
      plinth.position.y = 1.5; plinth.castShadow = true; plinth.receiveShadow = true;
      group.add(plinth);

      // Main body — accent.
      const body = new THREE.Mesh(new THREE.BoxGeometry(10, 14, 10), new THREE.MeshLambertMaterial({ color: accentCol }));
      body.position.y = 10; body.castShadow = true; body.receiveShadow = true;
      group.add(body);

      // Dome roof — lighter shade.
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(5.4, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshLambertMaterial({ color: lighter })
      );
      dome.position.y = 17; dome.castShadow = true;
      group.add(dome);

      // Window strip — 3 rows × 4 faces × 3 columns of lit yellow windows.
      const FACE_OFFS = [
        [0, 5.05, 0],         // +Z
        [0, -5.05, Math.PI],  // -Z
        [5.05, 0, Math.PI/2], // +X
        [-5.05, 0, -Math.PI/2],// -X
      ];
      FACE_OFFS.forEach(([fx, fz, ry]) => {
        for (let row = 0; row < 3; row++) {
          for (let col = -1; col <= 1; col++) {
            const w = new THREE.Mesh(winGeom, windowMat);
            // along the face: position col across the face then rotate.
            if (ry === 0 || ry === Math.PI) {
              w.position.set(col * 2.4, 6 + row * 3, fz === 0 ? fx : fz);
            } else {
              w.position.set(fx, 6 + row * 3, col * 2.4);
            }
            w.rotation.y = ry;
            group.add(w);
          }
        }
      });

      return group;
    }

    districts.forEach(id => {
      const districtData = window['DISTRICT_' + id.toUpperCase()];
      if (!districtData) return;
      const group = buildLandmark(districtData);
      group.position.set(districtData.position.x, 0, districtData.position.z);
      group.userData = { districtId: id, baseY: 0, hoverScale: 1, hoverY: 0 };
      scene.add(group);
      pickables.push(group);

      const el = document.createElement('div');
      el.className = 'wlabel';
      el.textContent = districtData.name || id;
      labelLayer.appendChild(el);
      labels.push({ el, worldPos: new THREE.Vector3(districtData.position.x, 22, districtData.position.z), id });
    });

    // Spherical orbit state. Drag to rotate, scroll to zoom. No more auto-orbit.
    const target = new THREE.Vector3(0, 6, 0);
    let yaw = Math.PI * 0.25;
    let pitch = Math.PI * 0.32;
    let distance = 90;
    const MIN_DIST = 30, MAX_DIST = 200;
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
    let hoveredId = null;

    function raycastHover(e) {
      const rect = canvas.getBoundingClientRect();
      pt.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pt.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      camera.updateMatrixWorld();
      ray.setFromCamera(pt, camera);
      const hit = ray.intersectObjects(pickables, true)[0];
      if (hit) {
        let g = hit.object; while (g && !g.userData?.districtId) g = g.parent;
        return g?.userData?.districtId ?? null;
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
        // Hover detection while idle
        hoveredId = raycastHover(e);
        canvas.style.cursor = hoveredId ? 'pointer' : 'grab';
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
    canvas.addEventListener('pointerleave', () => { hoveredId = null; canvas.style.cursor = 'grab'; });
    // Click-to-fly state. When the user taps a landmark we ease the camera
    // toward it before firing goTo for a cinematic feel.
    let flying = null;

    function endPointer(e) {
      if (e.pointerId !== activePointer) return;
      activePointer = null;
      canvas.style.cursor = hoveredId ? 'pointer' : 'grab';
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
          if (g?.userData?.districtId) {
            flying = {
              districtId: g.userData.districtId,
              tStart: performance.now(),
              tEnd: performance.now() + 550,
              targetFrom: target.clone(),
              targetTo: new THREE.Vector3(g.position.x, 6, g.position.z),
              distFrom: distance,
              distTo: Math.max(35, distance * 0.55),
            };
          }
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
        const { el, worldPos, id } = labels[i];
        labelVec.copy(worldPos).project(camera);
        if (labelVec.z > 1 || labelVec.z < -1) { el.style.display = 'none'; continue; }
        el.style.display = '';
        el.style.left = ((labelVec.x * 0.5 + 0.5) * w + rect.left) + 'px';
        el.style.top = ((-labelVec.y * 0.5 + 0.5) * h + rect.top) + 'px';
        el.classList.toggle('wlabel--hover', id === hoveredId);
      }
    }

    function updateHoverAnimations(dt) {
      const k = 1 - Math.exp(-dt * 14);
      for (const g of pickables) {
        const isHover = g.userData.districtId === hoveredId;
        const tgtScale = isHover ? 1.18 : 1.0;
        const tgtY = isHover ? 2.2 : 0;
        g.scale.x += (tgtScale - g.scale.x) * k;
        g.scale.y += (tgtScale - g.scale.y) * k;
        g.scale.z += (tgtScale - g.scale.z) * k;
        g.position.y += (tgtY - g.position.y) * k;
      }
    }

    let visible = true;
    function tick(dt, t) {
      if (!visible) return;
      if (flying) {
        const now = performance.now();
        const p = Math.min(1, (now - flying.tStart) / (flying.tEnd - flying.tStart));
        // ease-in-out cubic
        const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        target.lerpVectors(flying.targetFrom, flying.targetTo, eased);
        distance = flying.distFrom + (flying.distTo - flying.distFrom) * eased;
        if (p >= 1) {
          const id = flying.districtId; flying = null;
          // Reset camera state for next time entering the city.
          target.set(0, 6, 0); distance = 90;
          P.app.goTo('district', { districtId: id });
        }
      }
      updateCamera();
      updateHoverAnimations(dt);
      // Drift clouds slowly across the sky.
      for (const c of clouds) {
        c.position.x += c.userData.driftSpeed * dt;
        if (c.position.x > 130) c.position.x = -130;
      }
      // Subtle sun bob so the scene reads as alive even when idle.
      sun.position.y = 90 + Math.sin(t * 0.2) * 1.5;
      renderer.render(scene, camera);
      updateLabels();
    }
    P.loop.add(tick);
    P.app.on('navigate', s => {
      visible = s.level === 'city';
      canvas.style.display = visible ? 'block' : 'none';
      labelLayer.style.display = visible ? '' : 'none';
    });
    // Theme: apply current + subscribe to changes.
    setSkyForTheme(P.theme?.getTheme?.() ?? 'day');
    P.theme?.onChange?.((t) => setSkyForTheme(t));
    window.addEventListener('resize', resize); resize();
  }
  P.city = { mount };
})();
