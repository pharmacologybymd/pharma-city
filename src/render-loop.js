(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const cbs = new Set();
  let last = performance.now();
  let running = true;
  let rafId = null;
  function tick(now) {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    cbs.forEach(fn => { try { fn(dt, now/1000); } catch (e) { console.error(e); } });
    rafId = requestAnimationFrame(tick);
  }
  function start() { if (!running) return; last = performance.now(); rafId = requestAnimationFrame(tick); }
  function add(fn) { cbs.add(fn); }
  function remove(fn) { cbs.delete(fn); }
  function pause() { running = false; if (rafId) cancelAnimationFrame(rafId); }
  function resume() { if (running) return; running = true; start(); }
  function isRunning() { return running; }
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause(); else resume();
    });
  }
  start();
  P.loop = { add, remove, pause, resume, isRunning };
})();
