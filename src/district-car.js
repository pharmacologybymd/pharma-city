// User-drivable car inside a district scene. Like the city car, but with no
// autonomous tour — it just sits parked until the user toggles drive mode.
// Spawned position resets each time a new district loads (south edge of the
// drug-tower grid, facing the buildings).
//
// PHARMA.districtCar.mount(scene) — adds the car once per district scene.
// PHARMA.districtCar.setTowers(pickables) — call on every loadDistrict so the
//   car has fresh target info and gets re-parked at the new district's edge.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  let car = null;
  let targets = [];

  function mount(scene) {
    if (car) return car;
    // Reuse the same 3D car model as the city. P.car must have loaded by now;
    // build.js orders car.js before district-car.js.
    car = (P.car?.build?.()) || new THREE.Group();
    car.visible = false; // hidden until a district is loaded
    scene.add(car);
    return car;
  }

  function setTowers(towers) {
    if (!car) return;
    targets = towers.map(t => ({
      id: t.userData?.drugId,
      name: (t.userData?.drugId || '').replace(/_/g, ' '),
      pos: { x: t.position.x, z: t.position.z },
    })).filter(t => t.id);
    if (!targets.length) { car.visible = false; return; }
    // Park at the south edge of the grid, centered on X, facing into the grid
    // (+Z direction). The autonomous car heading convention: rotation.y = -π/2
    // maps local +X → world +Z, so the nose faces +Z.
    let minZ = Infinity, sumX = 0;
    for (const t of targets) { if (t.pos.z < minZ) minZ = t.pos.z; sumX += t.pos.x; }
    car.position.set(sumX / targets.length, 0.12, minZ - 12);
    car.rotation.y = -Math.PI / 2;
    car.visible = true;
  }

  function getMesh() { return car; }
  function getTargets() { return targets; }

  P.districtCar = { mount, setTowers, getMesh, getTargets };
})();
