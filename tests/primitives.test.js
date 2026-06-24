import { describe, it, expect, beforeEach } from 'vitest';

// Minimal THREE mock — we test the caching behavior, not Three.js itself
const mockTHREE = () => {
  const created = { geoms: 0, mats: 0 };
  return {
    created,
    Group: class { constructor() { this.children = []; } add(c) { this.children.push(c); } },
    Mesh: class { constructor(g, m) { this.g = g; this.m = m; this.castShadow = false; this.receiveShadow = false; this.position = { set(){} }; this.rotation = { x:0,y:0,z:0 }; } },
    BoxGeometry: class { constructor(w,h,d) { created.geoms++; this.key = `box:${w}:${h}:${d}`; } },
    CylinderGeometry: class { constructor(r1,r2,h,seg) { created.geoms++; this.key = `cyl:${r1}:${r2}:${h}:${seg}`; } },
    SphereGeometry: class { constructor(r) { created.geoms++; this.key = `sph:${r}`; } },
    CircleGeometry: class { constructor(r, seg) { created.geoms++; this.key = `circ:${r}:${seg}`; } },
    MeshLambertMaterial: class { constructor(opts) { created.mats++; this.opts = opts; } },
    MeshBasicMaterial: class { constructor(opts) { created.mats++; this.opts = opts; } },
  };
};

describe('primitives caching', () => {
  beforeEach(() => { delete globalThis.window; });
  it('reuses box geometry across calls with identical dims', async () => {
    globalThis.THREE = mockTHREE();
    globalThis.window = {};
    await import('../src/primitives.js?bust=' + Math.random());
    const P = globalThis.window.PHARMA.primitives;
    P.box({ w: 5, h: 5, d: 5, color: 0xff0000 });
    P.box({ w: 5, h: 5, d: 5, color: 0x00ff00 });
    expect(globalThis.THREE.created.geoms).toBe(1);
    // materials differ by color → two
    expect(globalThis.THREE.created.mats).toBe(2);
  });

  it('reuses arch and water geometry across identical calls', async () => {
    globalThis.THREE = mockTHREE();
    globalThis.window = {};
    await import('../src/primitives.js?bust=' + Math.random());
    const P = globalThis.window.PHARMA.primitives;
    P.arch({ r: 3, depth: 1.5, color: 0xff0000 });
    P.arch({ r: 3, depth: 1.5, color: 0x00ff00 });
    P.water({ radius: 12, color: 0x0000ff });
    P.water({ radius: 12, color: 0xffff00 });
    // 1 arch geom + 1 water geom = 2; perf-mandate: no per-call allocation.
    expect(globalThis.THREE.created.geoms).toBe(2);
  });

  it('exposes cache objects for testing', async () => {
    globalThis.THREE = mockTHREE();
    globalThis.window = {};
    await import('../src/primitives.js?bust=' + Math.random());
    const P = globalThis.window.PHARMA.primitives;

    // Verify caches are accessible
    expect(P._caches).toBeDefined();
    expect(P._caches.geomCache).toBeDefined();
    expect(P._caches.matCache).toBeDefined();

    // Create a few shapes and verify cache state
    P.box({ w: 3, h: 3, d: 3, color: 0xaabbcc });
    expect(P._caches.geomCache.size).toBe(1);
    expect(P._caches.matCache.size).toBe(1);

    // Identical geometry, same color → should reuse both
    P.box({ w: 3, h: 3, d: 3, color: 0xaabbcc });
    expect(P._caches.geomCache.size).toBe(1);
    expect(P._caches.matCache.size).toBe(1);

    // Identical geometry, different color → new material
    P.box({ w: 3, h: 3, d: 3, color: 0xffffff });
    expect(P._caches.geomCache.size).toBe(1);
    expect(P._caches.matCache.size).toBe(2);
  });
});
