// City scene (level 1). Mounts ONCE per page from app.js boot(); no dispose
// path is provided because we never tear it down. If you ever change the
// app to remount, also wire P.loop.remove(tick) + window.removeEventListener
// before remount or the listeners will accumulate.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function mount(rootEl) {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    rootEl.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1020);
    scene.fog = new THREE.Fog(0x0b1020, 80, 260);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
    camera.position.set(80, 50, 80); camera.lookAt(0, 6, 0);
    // resize closes over renderer + camera — defined AFTER both exist.
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(40, 60, 30); dir.castShadow = true;
    dir.shadow.mapSize.width = 1024; dir.shadow.mapSize.height = 1024;
    dir.shadow.camera.left=-70; dir.shadow.camera.right=70; dir.shadow.camera.top=70; dir.shadow.camera.bottom=-70;
    scene.add(dir);
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), new THREE.MeshLambertMaterial({color: 0x97C459}));
    ground.rotation.x = -Math.PI/2; ground.receiveShadow = true; scene.add(ground);

    // Place each district as a stylized landmark at its (x,z) position
    const districts = (typeof CITY !== 'undefined') ? CITY.districts : [];
    const pickables = [];
    districts.forEach(id => {
      const districtData = window['DISTRICT_' + id.toUpperCase()];
      if (!districtData) return;
      const group = new THREE.Group();
      // Each district renders its own "city landmark" — for v1, a simple primitive coloured by palette
      const lm = P.primitives.tower({ w: 10, h: 14, d: 10, color: districtData.palette?.accent ?? 0x888780 });
      group.add(lm);
      group.position.set(districtData.position.x, 0, districtData.position.z);
      group.userData.districtId = id;
      scene.add(group);
      pickables.push(group);
    });

    const ray = new THREE.Raycaster();
    const pt = new THREE.Vector2();
    canvas.addEventListener('pointerdown', (e) => {
      const rect = canvas.getBoundingClientRect();
      pt.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pt.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(pt, camera);
      const hit = ray.intersectObjects(pickables, true)[0];
      if (hit) {
        let g = hit.object; while (g && !g.userData?.districtId) g = g.parent;
        if (g?.userData?.districtId) P.app.goTo('district', { districtId: g.userData.districtId });
      }
    });

    let visible = true;
    function tick(_dt, t) {
      if (!visible) return;
      // Slow auto-orbit
      const r = 78;
      camera.position.x = Math.sin(t * 0.18) * r;
      camera.position.z = Math.cos(t * 0.18) * r;
      camera.position.y = 38 + Math.sin(t * 0.4) * 3;
      camera.lookAt(0, 6, 0);
      renderer.render(scene, camera);
    }
    P.loop.add(tick);
    P.app.on('navigate', s => { visible = s.level === 'city'; canvas.style.display = visible ? 'block' : 'none'; });
    window.addEventListener('resize', resize); resize();
  }
  P.city = { mount };
})();
