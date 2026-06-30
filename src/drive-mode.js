// User-controlled driving for the city car. Toggling drive mode pauses the
// autonomous tour, hands the car over to WASD/arrow-key control, and gently
// pans the camera to follow it. When the car is close to a district plinth,
// a "Press E to enter <name>" prompt appears; pressing E (or Enter) navigates
// into that district. Escape exits drive mode.
//
// PHARMA.drive.activate() / deactivate() / toggle() / isActive()
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};

  let active = false;
  let banner = null, prompt = null;
  let nearestId = null;

  // Physics tunables. ACCEL is forward acceleration; FRICTION damps speed
  // when no throttle. MAX_SPEED is forward, REVERSE_MAX is backward.
  // TURN_RATE scales with speed so the car only turns while moving.
  const ACCEL = 14;
  const FRICTION = 10;
  const MAX_SPEED = 22;
  const REVERSE_MAX = 8;
  const TURN_RATE = 2.2;
  const WHEEL_RADIUS = 0.42;
  const ENTRY_RANGE = 16; // distance from district center to allow Enter
  const CITY_HALF = 110;  // soft bound — keeps the car inside the city plane

  const keys = { up: false, down: false, left: false, right: false };
  let velocity = 0;

  function onKeyDown(e) {
    if (!active) return;
    const k = e.key;
    if (k === 'w' || k === 'W' || k === 'ArrowUp')    { keys.up    = true; e.preventDefault(); }
    if (k === 's' || k === 'S' || k === 'ArrowDown')  { keys.down  = true; e.preventDefault(); }
    if (k === 'a' || k === 'A' || k === 'ArrowLeft')  { keys.left  = true; e.preventDefault(); }
    if (k === 'd' || k === 'D' || k === 'ArrowRight') { keys.right = true; e.preventDefault(); }
    if (k === 'e' || k === 'E' || k === 'Enter')      { tryEnter(); e.preventDefault(); }
    if (k === 'Escape')                                { deactivate(); }
  }
  function onKeyUp(e) {
    if (!active) return;
    const k = e.key;
    if (k === 'w' || k === 'W' || k === 'ArrowUp')    keys.up    = false;
    if (k === 's' || k === 'S' || k === 'ArrowDown')  keys.down  = false;
    if (k === 'a' || k === 'A' || k === 'ArrowLeft')  keys.left  = false;
    if (k === 'd' || k === 'D' || k === 'ArrowRight') keys.right = false;
  }

  function tryEnter() {
    // Recompute proximity on every press — don't rely on the cached
    // `nearestId` from the last tick. (At 60 fps that's irrelevant, but
    // if the tab is throttled, the cache can lag by a full second and
    // the user would press E "near a building" and nothing would happen.)
    const car = P.car?.getMesh?.();
    if (!car) return;
    const near = nearestDistrict(car.position);
    if (!near.id || near.dist >= ENTRY_RANGE) return;
    deactivate();
    P.app?.goTo?.('district', { districtId: near.id });
  }

  function nearestDistrict(carPos) {
    const ids = window.CITY?.districts || [];
    let id = null, best = Infinity, name = null;
    for (const x of ids) {
      const d = window['DISTRICT_' + x.toUpperCase()];
      if (!d) continue;
      const dx = d.position.x - carPos.x;
      const dz = d.position.z - carPos.z;
      const dist = Math.hypot(dx, dz);
      if (dist < best) { best = dist; id = x; name = d.name; }
    }
    return { id, name, dist: best };
  }

  function tick(dt) {
    if (!active) return;
    const car = P.car?.getMesh?.();
    if (!car) return;

    // Throttle / brake.
    let targetSpeed = 0;
    if (keys.up && !keys.down) targetSpeed = MAX_SPEED;
    else if (keys.down && !keys.up) targetSpeed = -REVERSE_MAX;
    const goingFaster = Math.sign(targetSpeed - velocity) === Math.sign(targetSpeed) && targetSpeed !== 0;
    const accel = goingFaster ? ACCEL : -FRICTION * Math.sign(velocity || targetSpeed || 1);
    velocity += (targetSpeed === 0 ? -Math.sign(velocity) * FRICTION : (targetSpeed > velocity ? ACCEL : -ACCEL)) * dt;
    if (velocity > MAX_SPEED) velocity = MAX_SPEED;
    if (velocity < -REVERSE_MAX) velocity = -REVERSE_MAX;
    if (targetSpeed === 0 && Math.abs(velocity) < FRICTION * dt) velocity = 0;

    // Steering — only when moving.
    let steer = 0;
    if (keys.left) steer += 1;
    if (keys.right) steer -= 1;
    const speedFraction = Math.min(1, Math.abs(velocity) / 5);
    const yawDir = velocity >= 0 ? 1 : -1; // reverse steers the back wheels
    car.rotation.y += steer * TURN_RATE * dt * speedFraction * yawDir;

    // Apply velocity in the car's facing direction. Three.js's rotation.y
    // takes local +X to world (cos θ, 0, -sin θ), so forward_z is -sin θ.
    const heading = car.rotation.y;
    const fx = Math.cos(heading);
    const fz = -Math.sin(heading);
    car.position.x += fx * velocity * dt;
    car.position.z += fz * velocity * dt;

    // Soft bounds so the car can't drive out of the city plane.
    if (car.position.x > CITY_HALF) car.position.x = CITY_HALF;
    if (car.position.x < -CITY_HALF) car.position.x = -CITY_HALF;
    if (car.position.z > CITY_HALF) car.position.z = CITY_HALF;
    if (car.position.z < -CITY_HALF) car.position.z = -CITY_HALF;

    // Building collision — push the car back outside any plinth it crosses.
    const PLINTH = 6.5; // 6u plinth + ~0.5u car body half-width
    for (const id of (window.CITY?.districts || [])) {
      const d = window['DISTRICT_' + id.toUpperCase()];
      if (!d) continue;
      const dx = car.position.x - d.position.x;
      const dz = car.position.z - d.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist < PLINTH && dist > 0.001) {
        const k = PLINTH / dist;
        car.position.x = d.position.x + dx * k;
        car.position.z = d.position.z + dz * k;
        velocity *= 0.6; // bonk
      }
    }

    // Spin wheels.
    const dTheta = (velocity * dt) / WHEEL_RADIUS;
    if (car.userData.wheels) for (const w of car.userData.wheels) w.rotation.y += dTheta;

    // Proximity prompt.
    const near = nearestDistrict(car.position);
    nearestId = (near.id && near.dist < ENTRY_RANGE) ? near.id : null;
    if (prompt) {
      if (nearestId) {
        prompt.textContent = `Press E to enter ${near.name}`;
        prompt.style.display = 'block';
      } else {
        prompt.style.display = 'none';
      }
    }
  }

  function activate() {
    if (active) return;
    active = true;
    velocity = 0;
    if (banner) banner.style.display = 'block';
    syncToggleBtn();
  }
  function deactivate() {
    if (!active) return;
    active = false;
    velocity = 0;
    keys.up = keys.down = keys.left = keys.right = false;
    if (banner) banner.style.display = 'none';
    if (prompt) prompt.style.display = 'none';
    nearestId = null;
    syncToggleBtn();
  }
  function toggle() { active ? deactivate() : activate(); }
  function isActive() { return active; }
  function syncToggleBtn() {
    const btn = document.getElementById('driveBtn');
    if (!btn) return;
    btn.textContent = active ? '🚗 Driving' : '🚗 Drive';
    btn.classList.toggle('btn-driving', active);
  }

  function mount(rootEl) {
    banner = document.createElement('div');
    banner.className = 'drive-banner';
    banner.innerHTML = '<b>🚗 Drive mode</b> &nbsp;·&nbsp; <kbd>W</kbd>/<kbd>↑</kbd> go &nbsp; <kbd>S</kbd>/<kbd>↓</kbd> brake &nbsp; <kbd>A</kbd><kbd>D</kbd> steer &nbsp; <kbd>E</kbd> enter &nbsp; <kbd>Esc</kbd> exit';
    banner.style.display = 'none';
    rootEl.appendChild(banner);

    prompt = document.createElement('div');
    prompt.className = 'drive-prompt';
    prompt.style.display = 'none';
    rootEl.appendChild(prompt);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    // Auto-disable when navigating away from the city level.
    P.app?.on?.('navigate', s => { if (s.level !== 'city' && active) deactivate(); });
    P.loop?.add?.(tick);
    syncToggleBtn();
  }

  P.drive = { mount, activate, deactivate, toggle, isActive };
})();
