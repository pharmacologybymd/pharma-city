import { describe, it, expect } from 'vitest';

describe('self-test mode', () => {
  it('starts off, toggles on/off, fires listeners', async () => {
    globalThis.window = {}; globalThis.document = { createElement: () => ({ appendChild(){}, addEventListener(){}, style:{}, innerHTML:'' }) };
    await import('../src/self-test.js?bust=' + Math.random());
    const st = globalThis.window.PHARMA.selfTest;
    expect(st.isOn()).toBe(false);
    let observed = null;
    st.onChange(v => { observed = v; });
    st.set(true);
    expect(st.isOn()).toBe(true);
    expect(observed).toBe(true);
  });
});
