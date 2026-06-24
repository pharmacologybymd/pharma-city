(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const reg = new Map();
  function register(id, fn) { reg.set(id, fn); }
  function attach(id, scene, groupRoot) {
    const fn = reg.get(id);
    if (!fn) return;
    fn({ THREE, scene, groupRoot, primitives: P.primitives, loop: P.loop });
  }
  P.animations = { register, attach };
})();
