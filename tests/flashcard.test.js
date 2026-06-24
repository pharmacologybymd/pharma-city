import { describe, it, expect, beforeEach } from 'vitest';

const DRUG = {
  id: 'neostigmine',
  class: 'Reversible anticholinesterase',
  mechanism: 'Inhibits AChE → ACh accumulates',
  adverse_effects: 'SLUDGE; bradycardia',
  clinical_use: 'Myasthenia gravis',
  memory_hook: 'The floodgate jams open.',
  source: 'G&G 14e, ch. 11',
  building: 'the bridge over the floodgate',
  district: 'cholinergic',
};

describe('flashcard _state()', () => {
  beforeEach(() => {
    // Ensure a clean window each test; no document needed — mount() is never called.
    globalThis.window = {};
  });

  it('starts with all three facets hidden', async () => {
    await import('../src/flashcard.js?bust=' + Math.random());
    const fc = globalThis.window.PHARMA.flashcard;
    const state = fc._state(DRUG);
    expect(state.hidden.mechanism).toBe(true);
    expect(state.hidden.adverse_effects).toBe(true);
    expect(state.hidden.clinical_use).toBe(true);
  });

  it('revealAll() flips all three to visible', async () => {
    await import('../src/flashcard.js?bust=' + Math.random());
    const fc = globalThis.window.PHARMA.flashcard;
    const state = fc._state(DRUG);
    state.revealAll();
    expect(state.hidden.mechanism).toBe(false);
    expect(state.hidden.adverse_effects).toBe(false);
    expect(state.hidden.clinical_use).toBe(false);
  });

  it('hideAll() after revealAll() flips all three back to hidden', async () => {
    await import('../src/flashcard.js?bust=' + Math.random());
    const fc = globalThis.window.PHARMA.flashcard;
    const state = fc._state(DRUG);
    state.revealAll();
    state.hideAll();
    expect(state.hidden.mechanism).toBe(true);
    expect(state.hidden.adverse_effects).toBe(true);
    expect(state.hidden.clinical_use).toBe(true);
  });

  it('reveal(key) flips only that one facet', async () => {
    await import('../src/flashcard.js?bust=' + Math.random());
    const fc = globalThis.window.PHARMA.flashcard;
    const state = fc._state(DRUG);
    state.reveal('mechanism');
    expect(state.hidden.mechanism).toBe(false);
    expect(state.hidden.adverse_effects).toBe(true);
    expect(state.hidden.clinical_use).toBe(true);
  });
});
