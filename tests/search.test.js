import { describe, it, expect } from 'vitest';

describe('search', () => {
  it('finds drugs by case-insensitive prefix or substring', async () => {
    globalThis.window = {
      DISTRICT_CHOLINERGIC: { id: 'cholinergic', name: 'Cholinergic', drugs: [
        { id: 'neostigmine' }, { id: 'pilocarpine' }, { id: 'atropine' }
      ]},
      DISTRICT_ADRENERGIC: { id: 'adrenergic', name: 'Adrenergic', drugs: [
        { id: 'adrenaline' }, { id: 'phenylephrine' }
      ]},
    };
    globalThis.document = { createElement: () => ({ appendChild(){}, addEventListener(){}, style:{}, classList:{add(){}}, innerHTML: '' }) };
    await import('../src/search.js?bust=' + Math.random());
    const s = globalThis.window.PHARMA.search;
    const idx = s.index();
    expect(idx.length).toBe(5);
    const hits = s.filter('neo');
    expect(hits.map(r => r.drugId)).toContain('neostigmine');
    const hits2 = s.filter('rine');
    expect(hits2.map(r => r.drugId).sort()).toEqual(['phenylephrine']);
  });
});
