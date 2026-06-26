import { describe, it, expect } from 'vitest';
import { validateDrug, validateDistrict, validateCity, validateClassification } from '../src/content-schema.js';

describe('validateDrug', () => {
  const valid = {
    id: 'neostigmine',
    district: 'cholinergic',
    building: 'the bridge over the floodgate',
    class: 'Reversible anticholinesterase, quaternary amine',
    mechanism: 'Inhibits AChE → ACh accumulates at NMJ and synapse',
    adverse_effects: 'SLUDGE; bradycardia; bronchospasm',
    clinical_use: 'Myasthenia gravis; reversal of non-depolarising blockade',
    memory_hook: 'On Neostigmine bridge the floodgate jams open.',
    source: 'G&G 14e, ch. 11',
    high_yield: true,
  };
  it('accepts a complete drug', () => {
    expect(validateDrug(valid).ok).toBe(true);
  });
  it('rejects missing class', () => {
    const { ok, errors } = validateDrug({ ...valid, class: undefined });
    expect(ok).toBe(false);
    expect(errors.join(' ')).toMatch(/class/);
  });
  it('rejects unknown district', () => {
    const { ok, errors } = validateDrug({ ...valid, district: 'nope' });
    expect(ok).toBe(false);
    expect(errors.join(' ')).toMatch(/district/);
  });
  it('defaults high_yield to false when omitted', () => {
    const { ok, value } = validateDrug({ ...valid, high_yield: undefined });
    expect(ok).toBe(true);
    expect(value.high_yield).toBe(false);
  });
});

describe('validateDistrict', () => {
  const valid = {
    id: 'cholinergic',
    name: 'Cholinergic',
    theme_line: 'Flooded swamp-town · SLUDGE',
    walkthrough: 'Every fountain overflows; the streets are ankle-deep.',
    palette: { ground: 0x97C459, accent: 0x1D9E75, water: 0x378ADD },
    position: { x: -30, z: 0 },
    drugs: [],
  };
  it('accepts a complete district', () => {
    expect(validateDistrict(valid).ok).toBe(true);
  });
  it('rejects unknown district id', () => {
    const { ok, errors } = validateDistrict({ ...valid, id: 'banana' });
    expect(ok).toBe(false);
    expect(errors.join(' ')).toMatch(/id/);
  });
  it('accepts a district with no classification (optional field)', () => {
    expect(validateDistrict(valid).ok).toBe(true);
  });
  it('accepts a district with a well-formed classification', () => {
    const withClass = { ...valid, classification: goodClassification };
    expect(validateDistrict(withClass).ok).toBe(true);
  });
  it('rejects a district with a malformed classification', () => {
    const withClass = { ...valid, classification: { sources: [] } };
    const { ok, errors } = validateDistrict(withClass);
    expect(ok).toBe(false);
    expect(errors.join(' ')).toMatch(/classification/);
  });
});

const goodClassification = {
  sources: [
    {
      label: 'G&G 14e',
      cite: 'ch. 11–13',
      groups: [
        { heading: 'I. Direct-acting cholinomimetics', groups: [
          { heading: 'A. Choline esters', drugs: ['Acetylcholine', 'Bethanechol'] },
        ]},
        { heading: 'II. Anticholinesterases', drugs: ['Neostigmine', 'Physostigmine'] },
      ],
    },
    { label: 'KDT 9e', cite: 'ch. 7–9', groups: [
      { heading: 'Cholinergic agonists', drugs: ['Pilocarpine'] },
    ]},
  ],
};

describe('validateClassification', () => {
  it('accepts a well-formed classification', () => {
    expect(validateClassification(goodClassification).ok).toBe(true);
  });
  it('rejects empty sources', () => {
    const { ok, errors } = validateClassification({ sources: [] });
    expect(ok).toBe(false);
    expect(errors.join(' ')).toMatch(/sources/);
  });
  it('rejects a source missing label or cite', () => {
    const { ok } = validateClassification({ sources: [{ label: '', cite: 'x', groups: [{ heading: 'h', drugs: ['a'] }] }] });
    expect(ok).toBe(false);
  });
  it('rejects a source with empty groups', () => {
    const { ok } = validateClassification({ sources: [{ label: 'G&G', cite: 'x', groups: [] }] });
    expect(ok).toBe(false);
  });
  it('rejects a group with neither drugs nor sub-groups', () => {
    const { ok } = validateClassification({ sources: [{ label: 'G&G', cite: 'x', groups: [{ heading: 'h' }] }] });
    expect(ok).toBe(false);
  });
  it('rejects a group with an empty heading', () => {
    const { ok } = validateClassification({ sources: [{ label: 'G&G', cite: 'x', groups: [{ heading: '', drugs: ['a'] }] }] });
    expect(ok).toBe(false);
  });
  it('rejects empty drug names', () => {
    const { ok } = validateClassification({ sources: [{ label: 'G&G', cite: 'x', groups: [{ heading: 'h', drugs: [''] }] }] });
    expect(ok).toBe(false);
  });
});

describe('validateCity', () => {
  it('rejects fewer than 14 districts', () => {
    const { ok, errors } = validateCity({ districts: ['cholinergic'] });
    expect(ok).toBe(false);
    expect(errors.join(' ')).toMatch(/14/);
  });
  it('accepts exactly the 14 canonical ids in any order', () => {
    const ids = ['general_pharmacology','ans_hub','cholinergic','adrenergic','cvs','respiratory','git','renal','autacoids','cns','endocrine','chemotherapy','toxicology','recent_advances'];
    const shuffled = [...ids].reverse();
    expect(validateCity({ districts: shuffled }).ok).toBe(true);
  });
  it('rejects unknown district ids in the city list', () => {
    const ids = ['general_pharmacology','ans_hub','cholinergic','adrenergic','cvs','respiratory','git','renal','autacoids','cns','endocrine','chemotherapy','toxicology','banana'];
    const { ok, errors } = validateCity({ districts: ids });
    expect(ok).toBe(false);
    expect(errors.join(' ')).toMatch(/banana/);
  });
});
