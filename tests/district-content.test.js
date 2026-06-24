import { describe, it, expect } from 'vitest';
import { validateDistrict } from '../src/content-schema.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadDistrict(id) {
  const filePath = resolve(process.cwd(), `content/districts/${id.replace(/_/g, '-')}.js`);
  const code = readFileSync(filePath, 'utf8');
  const m = { window: {} };
  new Function('window', code)(m.window);
  return m.window['DISTRICT_' + id.toUpperCase()];
}

describe('Cholinergic district', () => {
  const d = loadDistrict('cholinergic');

  it('loads from file', () => {
    expect(d).toBeDefined();
    expect(d.id).toBe('cholinergic');
  });

  it('passes the schema', () => {
    const { ok, errors } = validateDistrict(d);
    if (!ok) console.error(errors);
    expect(ok).toBe(true);
  });

  it('has at least 8 high-yield drugs', () => {
    expect(d.drugs.filter(x => x.high_yield).length).toBeGreaterThanOrEqual(8);
  });

  it('has all 16 required drug ids', () => {
    const ids = d.drugs.map(x => x.id);
    const required = [
      'acetylcholine', 'pilocarpine', 'carbachol', 'bethanechol',
      'neostigmine', 'physostigmine', 'edrophonium', 'pyridostigmine',
      'atropine', 'glycopyrrolate', 'hyoscine', 'tropicamide',
      'parathion', 'malathion', 'pralidoxime', 'botulinum_toxin',
    ];
    for (const req of required) {
      expect(ids, `drug "${req}" should be present`).toContain(req);
    }
  });

  it('every drug has a non-empty source in G&G 14e format', () => {
    for (const drug of d.drugs) {
      expect(drug.source, `${drug.id} source`).toMatch(/^G&G 14e, ch\. \d+$/);
    }
  });

  it('every drug has all required fields non-empty', () => {
    const required = ['id', 'district', 'building', 'class', 'mechanism', 'adverse_effects', 'clinical_use', 'memory_hook', 'source'];
    for (const drug of d.drugs) {
      for (const field of required) {
        expect(typeof drug[field], `${drug.id}.${field} should be a string`).toBe('string');
        expect(drug[field].trim(), `${drug.id}.${field} should not be empty`).not.toBe('');
      }
    }
  });

  it('high_yield is boolean on every drug', () => {
    for (const drug of d.drugs) {
      expect(typeof drug.high_yield, `${drug.id}.high_yield`).toBe('boolean');
    }
  });

  it('district has required top-level fields', () => {
    expect(d.name).toBe('Cholinergic');
    expect(d.theme_line).toBe('Flooded swamp-town · SLUDGE');
    expect(d.walkthrough.length).toBeGreaterThan(100);
    expect(d.palette).toMatchObject({ ground: expect.any(Number), accent: expect.any(Number) });
    expect(d.position).toMatchObject({ x: -30, z: 0 });
  });
});
