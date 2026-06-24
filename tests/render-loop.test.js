import { describe, it, expect } from 'vitest';

describe('render loop', () => {
  it('calls registered callbacks with deltaSec', async () => {
    globalThis.window = {};
    globalThis.document = { hidden: false, addEventListener: () => {} };
    let fakeNow = 0;
    globalThis.performance = { now: () => fakeNow };
    const rafCallbacks = [];
    globalThis.requestAnimationFrame = (fn) => { rafCallbacks.push(fn); return rafCallbacks.length; };
    globalThis.cancelAnimationFrame = () => {};

    await import('../src/render-loop.js?bust=' + Math.random());
    const loop = globalThis.window.PHARMA.loop;

    const calls = [];
    loop.add((dt, t) => calls.push({ dt, t }));
    fakeNow = 16;
    rafCallbacks.shift()(16);
    expect(calls.length).toBe(1);
    expect(calls[0].dt).toBeCloseTo(0.016, 2);
  });
});
