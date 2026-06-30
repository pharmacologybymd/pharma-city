// A little red car that drives the city's road network between districts.
// Tours connected districts in a loop, turns smoothly into corners, wheels
// spin at travel speed. Pauses when the city level isn't on-screen so it
// doesn't waste cycles inside a district or flashcard.
//
// PHARMA.car.mount(scene) — adds the car + registers a per-frame tick.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};

  // Route — must walk only along edges that exist in the ROADS array in
  // city-scene.js, otherwise the car cuts across grass. Loops naturally.
  const ROUTE = [
    'ans_hub', 'cholinergic',
    'ans_hub', 'adrenergic',
    'ans_hub', 'autacoids', 'cvs', 'respiratory',
    'cvs', 'git', 'recent_advances',
    'git', 'cvs',
    'ans_hub', 'renal',
    'ans_hub', 'cns', 'endocrine',
    'cns', 'chemotherapy', 'toxicology',
    'chemotherapy', 'cns',
    'ans_hub', 'general_pharmacology',
  ];

  function buildCar() {
    const group = new THREE.Group();

    // Lower chassis — slightly darker; gives the car a "shadow line".
    const chassis = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.5, 1.7),
      new THREE.MeshLambertMaterial({ color: 0x8b1a1a })
    );
    chassis.position.y = 0.55; chassis.castShadow = true;
    group.add(chassis);

    // Main body — bright red.
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 0.7, 1.6),
      new THREE.MeshLambertMaterial({ color: 0xe53935 })
    );
    body.position.y = 0.95; body.castShadow = true; body.receiveShadow = true;
    group.add(body);

    // Cabin (roof) — slightly inset, darker.
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 0.65, 1.45),
      new THREE.MeshLambertMaterial({ color: 0xb71c1c })
    );
    cabin.position.set(-0.15, 1.55, 0); cabin.castShadow = true;
    group.add(cabin);

    // Side windows — light blue tint on each flank.
    const winMat = new THREE.MeshLambertMaterial({ color: 0x8ecae6 });
    const sideGeom = new THREE.BoxGeometry(1.5, 0.45, 0.05);
    [-0.74, 0.74].forEach(z => {
      const w = new THREE.Mesh(sideGeom, winMat);
      w.position.set(-0.15, 1.6, z);
      group.add(w);
    });
    // Windshield (front) + rear window.
    const endGeom = new THREE.BoxGeometry(0.05, 0.5, 1.3);
    const ws = new THREE.Mesh(endGeom, winMat); ws.position.set(0.72, 1.55, 0); group.add(ws);
    const rw = new THREE.Mesh(endGeom, winMat); rw.position.set(-1.02, 1.55, 0); group.add(rw);

    // Headlights — soft yellow on the +X (forward) face.
    const headMat = new THREE.MeshBasicMaterial({ color: 0xfff5b8 });
    [-0.55, 0.55].forEach(dz => {
      const h = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), headMat);
      h.position.set(1.55, 0.95, dz);
      group.add(h);
    });
    // Tail lights — red glow.
    const tailMat = new THREE.MeshBasicMaterial({ color: 0xff4040 });
    [-0.55, 0.55].forEach(dz => {
      const t = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 8), tailMat);
      t.position.set(-1.55, 0.95, dz);
      group.add(t);
    });

    // Four wheels. Each wheel is two nested groups so spin can be applied
    // independently of the chassis heading — the outer group orients the
    // cylinder onto its side, the inner mesh rotates on its own axle.
    const wheelMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
    const wheelGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 16);
    const wheels = [];
    [[1.05, -0.85], [1.05, 0.85], [-1.05, -0.85], [-1.05, 0.85]].forEach(([dx, dz]) => {
      const axle = new THREE.Group();
      axle.position.set(dx, 0.42, dz);
      axle.rotation.x = Math.PI / 2; // lay cylinder on its side, axle along world Z
      const tire = new THREE.Mesh(wheelGeom, wheelMat);
      tire.castShadow = true;
      axle.add(tire);
      group.add(axle);
      wheels.push(tire);
    });

    group.userData.wheels = wheels;
    group.userData.bodyParts = { headMat, tailMat };
    return group;
  }

  let car = null;
  let visible = true;
  let segIdx = 0;
  let segT = 0;
  let heading = 0;
  let waypoints = [];

  // Tunables. SPEED is world-units/sec; WHEEL_RADIUS feeds the spin rate so
  // wheels look correct at any speed. TURN_K is the heading-smoothing factor
  // (higher = sharper, snappier corners).
  const SPEED = 9;
  const WHEEL_RADIUS = 0.42;
  const TURN_K = 5;
  const CAR_Y = 0.12; // sits just above the road slab (road top ≈ 0.085)

  function tick(dt) {
    if (!car || !visible || waypoints.length < 2) return;
    const from = waypoints[segIdx];
    const to = waypoints[(segIdx + 1) % waypoints.length];
    const segLen = from.distanceTo(to);
    if (segLen < 0.01) {
      segIdx = (segIdx + 1) % waypoints.length;
      return;
    }
    segT += (dt * SPEED) / segLen;
    while (segT >= 1) {
      segT -= 1;
      segIdx = (segIdx + 1) % waypoints.length;
    }
    const a = waypoints[segIdx];
    const b = waypoints[(segIdx + 1) % waypoints.length];
    car.position.lerpVectors(a, b, segT);
    car.position.y = CAR_Y;

    // Smoothly approach the desired heading; wrap the diff into [-π, π] so
    // we always rotate the short way around a corner.
    const desired = Math.atan2(b.z - a.z, b.x - a.x);
    let diff = desired - heading;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    const k = 1 - Math.exp(-dt * TURN_K);
    heading += diff * k;
    car.rotation.y = heading;

    // Spin wheels at travel speed (ω = v / r).
    const dTheta = (SPEED * dt) / WHEEL_RADIUS;
    for (const w of car.userData.wheels) w.rotation.y += dTheta;
  }

  function mount(scene) {
    car = buildCar();
    waypoints = ROUTE.map(id => {
      const d = window['DISTRICT_' + id.toUpperCase()];
      return d ? new THREE.Vector3(d.position.x, CAR_Y, d.position.z) : null;
    }).filter(Boolean);
    if (waypoints.length < 2) return null;
    car.position.copy(waypoints[0]);
    heading = Math.atan2(waypoints[1].z - waypoints[0].z, waypoints[1].x - waypoints[0].x);
    car.rotation.y = heading;
    scene.add(car);
    P.loop.add(tick);
    P.app?.on?.('navigate', s => { visible = s.level === 'city'; if (car) car.visible = visible; });
    return car;
  }

  P.car = { mount };
})();
