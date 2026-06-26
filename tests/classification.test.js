import { describe, it, expect, beforeEach } from 'vitest';

const CLASSIFICATION = {
  sources: [
    {
      label: 'G&G 14e',
      cite: 'ch. 11–13',
      groups: [
        { heading: 'I. Direct-acting', groups: [
          { heading: 'A. Choline esters', drugs: ['Acetylcholine', 'Bethanechol'] },
        ]},
        { heading: 'II. Anticholinesterases', drugs: ['Neostigmine'] },
      ],
    },
    { label: 'KDT 9e', cite: 'ch. 7–9', groups: [
      { heading: 'Cholinergic agonists', drugs: ['Pilocarpine <evil>'] },
    ]},
  ],
};

async function load() {
  globalThis.window = {};
  await import('../src/classification-panel.js?bust=' + Math.random());
  return globalThis.window.PHARMA.classification;
}

describe('renderClassificationHTML', () => {
  let render;
  beforeEach(async () => { render = (await load()).renderClassificationHTML; });

  it('renders both source headings with citations', () => {
    const html = render(CLASSIFICATION);
    expect(html).toMatch(/G&amp;G 14e/);
    expect(html).toMatch(/KDT 9e/);
    expect(html).toMatch(/ch\. 11–13/);
  });

  it('renders nested lists with headings and drug names', () => {
    const html = render(CLASSIFICATION);
    expect(html).toMatch(/<ul class="cls-list">/);
    expect(html).toMatch(/A\. Choline esters/);
    expect(html).toMatch(/Acetylcholine/);
    expect(html).toMatch(/Neostigmine/);
  });

  it('HTML-escapes drug and heading text', () => {
    const html = render(CLASSIFICATION);
    expect(html).toMatch(/Pilocarpine &lt;evil&gt;/);
    expect(html).not.toMatch(/<evil>/);
  });

  it('returns a friendly message when classification is missing', () => {
    expect(render(undefined)).toMatch(/No classification/);
    expect(render({ sources: [] })).toMatch(/No classification/);
  });
});
