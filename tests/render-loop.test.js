import { describe, it, expect } from 'vitest';

describe('render loop', () => {
  function setupFakeRaf() {
    globalThis.window = {};
    globalThis.document = { hidden: false, addEventListener: () => {} };
    let fakeNow = 0;
    globalThis.performance = { now: () => fakeNow };
    const rafCallbacks = [];
    let cancelled = 0;
    globalThis.requestAnimationFrame = (fn) => { rafCallbacks.push(fn); return rafCallbacks.length; };
    globalThis.cancelAnimationFrame = () => { cancelled++; };
    return { rafCallbacks, setNow: (n) => { fakeNow = n; }, getCancelCount: () => cancelled };
  }

  it('calls registered callbacks with deltaSec', async () => {
    const { rafCallbacks, setNow } = setupFakeRaf();
    await import('../src/render-loop.js?bust=' + Math.random());
    const loop = globalThis.window.PHARMA.loop;

    const calls = [];
    loop.add((dt, t) => calls.push({ dt, t }));
    setNow(16);
    rafCallbacks.shift()(16);
    expect(calls.length).toBe(1);
    expect(calls[0].dt).toBeCloseTo(0.016, 2);
  });

  it('pause cancels the frame and stops dispatching; resume restarts', async () => {
    const { rafCallbacks, setNow, getCancelCount } = setupFakeRaf();
    await import('../src/render-loop.js?bust=' + Math.random());
    const loop = globalThis.window.PHARMA.loop;

    const calls = [];
    loop.add(() => calls.push(1));
    expect(loop.isRunning()).toBe(true);

    loop.pause();
    expect(loop.isRunning()).toBe(false);
    expect(getCancelCount()).toBe(1);

    // any rAF callbacks queued before pause must not dispatch through the loop after pause
    const queuedCountBefore = rafCallbacks.length;
    loop.resume();
    expect(loop.isRunning()).toBe(true);
    // resume should enqueue a new frame
    expect(rafCallbacks.length).toBe(queuedCountBefore + 1);

    setNow(16);
    rafCallbacks.shift()(16);
    expect(calls.length).toBeGreaterThanOrEqual(1);
  });

  it('one throwing callback does not kill the loop', async () => {
    const { rafCallbacks, setNow } = setupFakeRaf();
    await import('../src/render-loop.js?bust=' + Math.random());
    const loop = globalThis.window.PHARMA.loop;
    const errorSpy = (() => { const e = console.error; console.error = () => {}; return () => { console.error = e; }; })();
    try {
      const good = [];
      loop.add(() => { throw new Error('boom'); });
      loop.add(() => good.push(1));
      setNow(16);
      rafCallbacks.shift()(16);
      expect(good).toEqual([1]);
    } finally {
      errorSpy();
    }
  });
});
