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
  // The cvs→autacoids→ans_hub return is intentional: cvs is not directly
  // adjacent to ans_hub on the city road graph, autacoids sits on that line.
  const ROUTE = [
    'ans_hub', 'cholinergic',
    'ans_hub', 'adrenergic',
    'ans_hub', 'autacoids', 'cvs', 'respiratory',
    'cvs', 'git', 'recent_advances',
    'git', 'cvs', 'autacoids', 'ans_hub',
    'renal',
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
  // (higher = sharper, snappier corners). PLINTH_HALF / ARC_OFFSET shape the
  // path around buildings (see buildWaypoints).
  const SPEED = 9;
  const WHEEL_RADIUS = 0.42;
  const TURN_K = 5;
  const CAR_Y = 0.12;
  const PLINTH_HALF = 7;   // segment endpoints sit just past each 6-unit plinth
  const ARC_OFFSET = 12;   // normal-corner / pass-through arc — small enough
                           // that the chord to it doesn't graze a nearby plinth
  const UTURN_OFFSET = 16; // U-turn arc — wider so asymmetric cases (cns→chemo→
                           // tox, dot ≈ -0.99) clear the plinth on both legs

  // Each ROUTE pair (A, B) becomes a segment driven edge-to-edge (so the car
  // is visible BETWEEN buildings, never under them). At every junction we
  // insert an arc midpoint outside the plinth so the chord into/out of the
  // arc doesn't clip the building corner.
  function buildWaypoints() {
    const center = id => {
      const d = window['DISTRICT_' + id.toUpperCase()];
      return d ? new THREE.Vector3(d.position.x, CAR_Y, d.position.z) : null;
    };
    // All district centers — used to bias arc midpoints AWAY from neighbors
    // (so e.g. the arc north of ans_hub doesn't land inside autacoids).
    const others = [];
    for (const id of (window.CITY?.districts || [])) {
      const c = center(id);
      if (c) others.push(c);
    }
    const clearance = (pt, exclude) => {
      let min = Infinity;
      for (const c of others) {
        if (c.distanceTo(exclude) < 0.01) continue;
        const d = pt.distanceTo(c);
        if (d < min) min = d;
      }
      return min;
    };
    const segs = [];
    for (let i = 0; i < ROUTE.length; i++) {
      const A = center(ROUTE[i]);
      const B = center(ROUTE[(i + 1) % ROUTE.length]);
      if (!A || !B) continue;
      const delta = B.clone().sub(A); delta.y = 0;
      const dist = delta.length();
      if (dist < 1) continue;
      const dir = delta.divideScalar(dist);
      // Close-by districts (e.g. ans_hub → autacoids, 15u apart) get a smaller
      // offset so the segment doesn't reverse — keep at least a couple of
      // visible units of road between the two plinths.
      const offset = Math.min(PLINTH_HALF, dist / 2 - 1.5);
      const aOut = A.clone().add(dir.clone().multiplyScalar(offset));
      const bIn = B.clone().sub(dir.clone().multiplyScalar(offset));
      segs.push({ B, dir, aOut, bIn });
    }
    // Detour any other district whose plinth the segment chord clips.
    // Some roads (e.g. ans_hub → general_pharmacology) are long diagonals that
    // pass through a third building (renal at (-25, 25)) — the car needs to go
    // around it, not through it.
    const PERP_CLEAR = 8;
    function segmentDetours(aOut, bIn) {
      const delta = bIn.clone().sub(aOut); delta.y = 0;
      const segLen = delta.length();
      if (segLen < 1) return [];
      const sdir = delta.divideScalar(segLen);
      const detours = [];
      for (const c of others) {
        if (c.distanceTo(aOut) < PLINTH_HALF + 0.1) continue;
        if (c.distanceTo(bIn) < PLINTH_HALF + 0.1) continue;
        const ac = c.clone().sub(aOut);
        const t = ac.dot(sdir);
        if (t < PLINTH_HALF || t > segLen - PLINTH_HALF) continue;
        const perpDist = ac.clone().sub(sdir.clone().multiplyScalar(t)).length();
        if (perpDist > PERP_CLEAR) continue;
        const ccw = new THREE.Vector3(-sdir.z, 0, sdir.x);
        const cw = new THREE.Vector3(sdir.z, 0, -sdir.x);
        const candCCW = c.clone().add(ccw.clone().multiplyScalar(ARC_OFFSET));
        const candCW = c.clone().add(cw.clone().multiplyScalar(ARC_OFFSET));
        const perp = clearance(candCCW, c) >= clearance(candCW, c) ? ccw : cw;
        const pt = c.clone().add(perp.multiplyScalar(ARC_OFFSET));
        pt.y = CAR_Y;
        detours.push({ t, pt });
      }
      detours.sort((a, b) => a.t - b.t);
      return detours.map(d => d.pt);
    }
    const points = [];
    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i];
      const next = segs[(i + 1) % segs.length];
      points.push(seg.aOut);
      for (const d of segmentDetours(seg.aOut, seg.bIn)) points.push(d);
      points.push(seg.bIn);
      // Corner arc(s) at seg.B between segments. Three cases:
      //   • Normal corner — bisect = -inDir + outDir points OUTSIDE the bend;
      //     one arc at radius ARC_OFFSET keeps the chord clear of the plinth.
      //   • U-turn (-inDir == outDir) — bisect lies along the road; one arc
      //     at the perpendicular pushes the car off-line.
      //   • Going-straight (-inDir == -outDir → bisect ≈ 0) — same fallback,
      //     but ONE arc on the perpendicular still chord-clips because bIn
      //     and aOut sit on opposite sides of the plinth. Insert TWO arcs
      //     (at ±45° from the perpendicular, biased back toward bIn / aOut)
      //     so each chord clears the plinth.
      // For perpendicular fallbacks (U-turn + straight), pick CCW vs CW by
      // whichever side is furthest from other districts.
      const inDir = seg.dir;
      const outDir = next.dir;
      const dotIO = inDir.dot(outDir);
      const isUTurn = dotIO < -0.95;
      const isStraight = dotIO > 0.95;
      if (isStraight) {
        const ccw = new THREE.Vector3(-outDir.z, 0, outDir.x);
        const cw = new THREE.Vector3(outDir.z, 0, -outDir.x);
        const candCCW = seg.B.clone().add(ccw.clone().multiplyScalar(ARC_OFFSET));
        const candCW = seg.B.clone().add(cw.clone().multiplyScalar(ARC_OFFSET));
        const side = clearance(candCCW, seg.B) >= clearance(candCW, seg.B) ? ccw : cw;
        const a1 = side.clone().add(inDir.clone().negate()).normalize();
        const a2 = side.clone().add(outDir).normalize();
        const arc1 = seg.B.clone().add(a1.multiplyScalar(ARC_OFFSET));
        const arc2 = seg.B.clone().add(a2.multiplyScalar(ARC_OFFSET));
        arc1.y = CAR_Y; arc2.y = CAR_Y;
        points.push(arc1, arc2);
      } else {
        let bisect = inDir.clone().negate().add(outDir);
        let radius = ARC_OFFSET;
        if (isUTurn) {
          // Perpendicular to inDir (not outDir) gives a chord geometry that
          // matches both chord legs symmetrically. Wider radius keeps the
          // asymmetric chemo U-turn (dot ≈ -0.99 not -1) clear of the plinth.
          const ccw = new THREE.Vector3(-inDir.z, 0, inDir.x);
          const cw = new THREE.Vector3(inDir.z, 0, -inDir.x);
          const candCCW = seg.B.clone().add(ccw.clone().multiplyScalar(UTURN_OFFSET));
          const candCW = seg.B.clone().add(cw.clone().multiplyScalar(UTURN_OFFSET));
          bisect = clearance(candCCW, seg.B) >= clearance(candCW, seg.B) ? ccw : cw;
          radius = UTURN_OFFSET;
        }
        bisect.normalize();
        const arc = seg.B.clone().add(bisect.multiplyScalar(radius));
        arc.y = CAR_Y;
        points.push(arc);
      }
    }
    return points;
  }

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
    waypoints = buildWaypoints();
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
