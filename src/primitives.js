(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const T = (typeof THREE !== 'undefined') ? THREE : globalThis.THREE;
  const geomCache = new Map();
  const matCache = new Map();
  const getBoxGeom = (w,h,d) => { const k=`b:${w}:${h}:${d}`; if(!geomCache.has(k)) geomCache.set(k,new T.BoxGeometry(w,h,d)); return geomCache.get(k); };
  const getCylGeom = (r1,r2,h,seg=16) => { const k=`c:${r1}:${r2}:${h}:${seg}`; if(!geomCache.has(k)) geomCache.set(k,new T.CylinderGeometry(r1,r2,h,seg)); return geomCache.get(k); };
  const getSphereGeom = (r,sw=20,sh=14) => { const k=`s:${r}:${sw}:${sh}`; if(!geomCache.has(k)) geomCache.set(k,new T.SphereGeometry(r,sw,sh)); return geomCache.get(k); };
  const getMat = (color, opts={}) => { const k = `m:${color}:${JSON.stringify(opts)}`; if(!matCache.has(k)) matCache.set(k,new T.MeshLambertMaterial({color, ...opts})); return matCache.get(k); };

  function box({ w, h, d, color }) {
    const m = new T.Mesh(getBoxGeom(w,h,d), getMat(color));
    m.castShadow = true; m.receiveShadow = true;
    return m;
  }
  function tower({ w=8, h=24, d=8, color, accentColor }) {
    const g = new T.Group();
    const body = box({ w, h, d, color });
    body.position.set(0, h/2, 0);
    g.add(body);
    return g;
  }
  function dome({ r=6, color }) {
    const m = new T.Mesh(getSphereGeom(r,20,14), getMat(color));
    m.castShadow = true;
    return m;
  }
  function cylinder({ r=4, h=10, color }) {
    const m = new T.Mesh(getCylGeom(r,r,h,24), getMat(color));
    m.castShadow = true; m.receiveShadow = true;
    return m;
  }
  function arch({ r=3, depth=1.5, color }) {
    const m = new T.Mesh(new T.CylinderGeometry(r,r,depth,16,1,false,0,Math.PI), getMat(color));
    m.rotation.x = Math.PI/2; m.rotation.z = Math.PI/2;
    return m;
  }
  function water({ radius=12, color=0x378ADD }) {
    const m = new T.Mesh(new T.CircleGeometry(radius, 32), getMat(color, { transparent: true, opacity: 0.75 }));
    m.rotation.x = -Math.PI/2;
    return m;
  }
  function particleSmoke({ count=10, color=0xD3D1C7 }) {
    const g = new T.Group();
    const particles = [];
    for (let i=0; i<count; i++) {
      const p = new T.Mesh(getSphereGeom(0.9,8,6), new T.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 }));
      p.userData = { life: Math.random(), speed: 0.04 + Math.random()*0.03, wob: Math.random()*Math.PI*2, baseY: 0 };
      g.add(p);
      particles.push(p);
    }
    g.userData.particles = particles;
    return g;
  }
  function castShadow(mesh) { mesh.castShadow = true; return mesh; }

  P.primitives = { box, tower, dome, cylinder, arch, water, particleSmoke, castShadow, _caches: { geomCache, matCache } };
})();
