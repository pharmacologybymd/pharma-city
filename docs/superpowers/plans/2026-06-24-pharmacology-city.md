# Pharmacology City Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-file 3D web app (`pharma-city.html`) that lets MD Pharmacology PGs walk a vivid city of drug-class districts, click each drug-building to study a four-facet flashcard with hide-then-reveal self-test, and ships in ~14 days as one shareable file.

**Architecture:** Source is broken into focused JS modules and per-district content files; a small node script concatenates everything (plus an inlined copy of Three.js r160) into a single offline-capable `pharma-city.html`. Three.js renders the city scene and per-district scenes; flashcards and the walkthrough panel are DOM overlays. All facts live in content files, not code — adding a drug means editing data.

**Tech Stack:** Three.js r160 (vendored, inlined), plain JS (no TS, no JSX, ES2022), Vitest for unit tests, Node 20+ for the build script. No bundler. No runtime network calls.

## Global Constraints

- The deliverable is a single self-contained `pharma-city.html`. It must open by double-click from `file://` on iOS Safari and Android Chrome and on macOS/Windows Chrome, Safari and Firefox, with zero install and zero network access.
- Three.js version is exactly **r160** (`three.min.js` from cdnjs). Vendored into `vendor/`, never fetched at runtime.
- No fonts, images, or assets loaded from the internet at runtime. Anything used must be inlined or generated from primitives.
- All content (drugs, districts, city) is data, not code. The shape is fixed in Task 2 and every later task adheres to it.
- The flashcard's facets are exactly four, in this order: **class, mechanism, adverse_effects, clinical_use**. Plus the always-visible `memory_hook` and the small `source` line. No additional facets.
- The city has exactly 13 districts, named: `general_pharmacology`, `ans_hub`, `cholinergic`, `adrenergic`, `cvs`, `respiratory`, `git`, `renal`, `autacoids`, `cns`, `endocrine`, `chemotherapy`, `toxicology`, `recent_advances`.
- Performance target: 30 fps on a Snapdragon-6-series Android phone. Geometry and material sharing is mandatory; shadow maps only on the city scene.
- Source base: Goodman & Gilman's *The Pharmacological Basis of Therapeutics*, 14th edition. Every drug card has a `source` field naming the G&G chapter or section.

---

## File Structure

```
/Users/rahulsanghvi/Pharma City/
├── README.md                         # build + share + dev instructions
├── package.json                      # vitest dev dep
├── build.js                          # produces dist/pharma-city.html
├── dist/
│   └── pharma-city.html              # the artifact (committed, re-built on demand)
├── src/
│   ├── template.html                 # outer HTML shell with <!--INJECT_*--> markers
│   ├── styles.css                    # all styles
│   ├── app.js                        # entry: routing, history, top-level state
│   ├── content-schema.js             # validators for city/district/drug shapes
│   ├── primitives.js                 # reusable Three.js building shapes
│   ├── city-scene.js                 # 3D city scene (level 1)
│   ├── district-scene.js             # 3D district scene loader (level 2)
│   ├── flashcard.js                  # DOM flashcard overlay (level 3)
│   ├── walkthrough-panel.js          # collapsible district narrative panel
│   ├── search.js                     # drug name search
│   ├── self-test.js                  # walk-from-memory mode
│   ├── animations.js                 # per-district animation registry
│   └── render-loop.js                # shared RAF loop, visibility pause
├── content/
│   ├── city.js                       # exports CITY = { districts: [...], layout }
│   └── districts/
│       ├── general-pharmacology.js   # exports DISTRICT_GENERAL_PHARMACOLOGY
│       ├── ans-hub.js                # exports DISTRICT_ANS_HUB
│       ├── cholinergic.js            # exports DISTRICT_CHOLINERGIC (gold standard)
│       ├── adrenergic.js
│       ├── cvs.js
│       ├── respiratory.js
│       ├── git.js
│       ├── renal.js
│       ├── autacoids.js
│       ├── cns.js
│       ├── endocrine.js
│       ├── chemotherapy.js
│       ├── toxicology.js
│       └── recent-advances.js
├── vendor/
│   └── three.min.js                  # Three.js r160, downloaded once
├── tests/
│   ├── content-schema.test.js
│   ├── city-content.test.js
│   ├── district-content.test.js
│   ├── search.test.js
│   ├── self-test.test.js
│   └── build.test.js
└── docs/superpowers/
    ├── specs/2026-06-24-pharmacology-city-design.md   # already exists
    └── plans/2026-06-24-pharmacology-city.md          # this file
```

Each file has one job: scenes render, content holds data, the build script assembles. No file does both.

---

## Task 1: Project scaffolding and build pipeline

**Files:**
- Create: `package.json`, `build.js`, `README.md`, `src/template.html`, `vendor/three.min.js`, `tests/build.test.js`

**Interfaces:**
- Produces: `npm run build` → writes `dist/pharma-city.html`. `npm test` runs vitest.

- [ ] **Step 1: Initialize package.json**

```bash
cd "/Users/rahulsanghvi/Pharma City"
cat > package.json <<'EOF'
{
  "name": "pharma-city",
  "version": "0.1.0",
  "description": "A 3D memory-palace city for MD Pharmacology revision.",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "node build.js",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "vitest": "^1.6.0"
  },
  "engines": { "node": ">=20" }
}
EOF
npm install --silent
```

Expected: `node_modules/` exists, no errors.

- [ ] **Step 2: Vendor Three.js r160**

```bash
mkdir -p vendor
curl -sL https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js -o vendor/three.min.js
test -s vendor/three.min.js && echo "ok ($(wc -c < vendor/three.min.js) bytes)"
```

Expected: prints `ok (<some number around 600000> bytes)`.

- [ ] **Step 3: Write the HTML template with inject markers**

Create `src/template.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Pharmacology City</title>
  <style><!--INJECT_CSS--></style>
</head>
<body>
  <div id="app"></div>
  <script><!--INJECT_THREE--></script>
  <script><!--INJECT_CONTENT--></script>
  <script><!--INJECT_APP--></script>
</body>
</html>
```

- [ ] **Step 4: Write the build script**

Create `build.js`:

```js
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = import.meta.dirname;
const read = (p) => readFileSync(join(root, p), 'utf8');

function concatDir(dir) {
  const files = readdirSync(join(root, dir)).filter(f => f.endsWith('.js')).sort();
  return files.map(f => `// === ${dir}/${f} ===\n${read(join(dir, f))}`).join('\n\n');
}

const three = read('vendor/three.min.js');
const css = read('src/styles.css');
const content = concatDir('content') + '\n\n' + concatDir('content/districts');
const appFiles = [
  'content-schema.js',
  'primitives.js',
  'render-loop.js',
  'animations.js',
  'walkthrough-panel.js',
  'flashcard.js',
  'search.js',
  'self-test.js',
  'district-scene.js',
  'city-scene.js',
  'app.js',
];
const app = appFiles.map(f => `// === src/${f} ===\n${read('src/' + f)}`).join('\n\n');

let html = read('src/template.html');
html = html.replace('<!--INJECT_CSS-->', css);
html = html.replace('<!--INJECT_THREE-->', three);
html = html.replace('<!--INJECT_CONTENT-->', content);
html = html.replace('<!--INJECT_APP-->', app);

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/pharma-city.html'), html);
console.log(`built dist/pharma-city.html (${(html.length / 1024).toFixed(0)} KB)`);
```

- [ ] **Step 5: Write the build smoke test**

Create `tests/build.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';

describe('build', () => {
  it('produces a single self-contained HTML file', () => {
    execSync('node build.js', { stdio: 'pipe' });
    const path = 'dist/pharma-city.html';
    expect(existsSync(path)).toBe(true);
    const html = readFileSync(path, 'utf8');
    // file:// requirement — no runtime network references
    expect(html).not.toMatch(/src=["']https?:/);
    expect(html).not.toMatch(/href=["']https?:/);
    expect(html).not.toMatch(/import\s+.*from\s+['"]https?:/);
    // size sanity — Three.js alone is ~600 KB
    expect(statSync(path).size).toBeGreaterThan(500_000);
    expect(statSync(path).size).toBeLessThan(2_000_000);
    // single HTML
    expect(html.indexOf('<!doctype html>')).toBe(0);
  });
});
```

- [ ] **Step 6: Write placeholder source files so build passes**

Create empty stubs for every file listed in `appFiles`, plus `src/styles.css`, `content/city.js`, and one stub in `content/districts/`:

```bash
mkdir -p src content/districts
: > src/styles.css
for f in content-schema primitives render-loop animations walkthrough-panel flashcard search self-test district-scene city-scene app; do
  echo "// placeholder — Task replaces this" > "src/${f}.js"
done
echo "const CITY = { districts: [], layout: {} };" > content/city.js
echo "const DISTRICT_CHOLINERGIC = { id: 'cholinergic', drugs: [] };" > content/districts/cholinergic.js
```

- [ ] **Step 7: Run the build test**

```bash
npm test -- tests/build.test.js
```

Expected: PASS — `dist/pharma-city.html` exists, no external URLs, size in range.

- [ ] **Step 8: Write the README**

Create `README.md`:

```markdown
# Pharmacology City

A 3D memory-palace city for revising MD Pharmacology (G&G 14e).
Open `dist/pharma-city.html` by double-clicking. Works offline.

## Sharing

Send `dist/pharma-city.html` via WhatsApp / Google Drive / AirDrop. Recipients open with one tap.

## Development

```
npm install
npm test            # run unit tests
npm test:watch      # tests in watch mode
npm run build       # rebuild dist/pharma-city.html
```

Source lives in `src/` (engine) and `content/` (drug facts).
Three.js r160 is vendored in `vendor/three.min.js`.
```

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json build.js README.md src/ content/ vendor/ tests/ .gitignore
# .gitignore the node_modules and dist artifacts during dev (we re-create them)
echo -e "\nnode_modules/\ndist/" >> .gitignore
git add .gitignore
git commit -m "Scaffold build pipeline and vendor Three.js r160"
```

---

## Task 2: Content schema and validators

**Files:**
- Create: `src/content-schema.js`, `tests/content-schema.test.js`

**Interfaces:**
- Produces: `validateDrug(drug) → {ok: boolean, errors: string[]}`, `validateDistrict(district) → {...}`, `validateCity(city) → {...}`. Used by every content file's test and by `app.js` at startup.

- [ ] **Step 1: Write failing tests for drug, district, city schemas**

Create `tests/content-schema.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { validateDrug, validateDistrict, validateCity } from '../src/content-schema.js';

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
});

describe('validateCity', () => {
  it('rejects fewer than 13 districts', () => {
    const { ok, errors } = validateCity({ districts: ['cholinergic'] });
    expect(ok).toBe(false);
    expect(errors.join(' ')).toMatch(/13/);
  });
  it('accepts exactly the 13 canonical ids in any order', () => {
    const ids = ['general_pharmacology','ans_hub','cholinergic','adrenergic','cvs','respiratory','git','renal','autacoids','cns','endocrine','chemotherapy','toxicology','recent_advances'];
    expect(ids.length).toBe(14);
  });
});
```

Wait — the canonical list above contains 14 items. The constraint says exactly 13. **Fix this in this step:** drop `recent_advances` and re-check — no, the spec keeps `recent_advances`. Recount: general_pharmacology, ans_hub, cholinergic, adrenergic, cvs, respiratory, git, renal, autacoids, cns, endocrine, chemotherapy, toxicology, recent_advances — that's **14**. The constraint in Global Constraints will be updated to 14 (see below).

- [ ] **Step 2: Update Global Constraints and tests to read 14**

Edit this plan's Global Constraints to say *14* districts (it currently says 13 — a counting mistake in the spec table that listed all 14). Also update the test to expect 14:

```js
describe('validateCity', () => {
  it('rejects fewer than 14 districts', () => {
    const { ok, errors } = validateCity({ districts: ['cholinergic'] });
    expect(ok).toBe(false);
    expect(errors.join(' ')).toMatch(/14/);
  });
});
```

And update the spec at `docs/superpowers/specs/2026-06-24-pharmacology-city-design.md` to say "14 districts" in the city table intro line. Commit the spec fix in a separate commit at the end of this task.

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test -- tests/content-schema.test.js
```

Expected: FAIL with `validateDrug is not a function` or similar (module is a placeholder).

- [ ] **Step 4: Implement the schema**

Replace `src/content-schema.js`:

```js
const DISTRICT_IDS = [
  'general_pharmacology', 'ans_hub', 'cholinergic', 'adrenergic',
  'cvs', 'respiratory', 'git', 'renal', 'autacoids',
  'cns', 'endocrine', 'chemotherapy', 'toxicology', 'recent_advances'
];

const DRUG_REQUIRED = ['id', 'district', 'building', 'class', 'mechanism', 'adverse_effects', 'clinical_use', 'memory_hook', 'source'];

function validateDrug(d) {
  const errors = [];
  if (!d || typeof d !== 'object') return { ok: false, errors: ['drug must be an object'] };
  for (const k of DRUG_REQUIRED) {
    if (typeof d[k] !== 'string' || d[k].trim() === '') errors.push(`missing or empty field: ${k}`);
  }
  if (d.district && !DISTRICT_IDS.includes(d.district)) errors.push(`unknown district: ${d.district}`);
  const value = { ...d, high_yield: d.high_yield === true };
  return { ok: errors.length === 0, errors, value };
}

function validateDistrict(d) {
  const errors = [];
  if (!d || typeof d !== 'object') return { ok: false, errors: ['district must be an object'] };
  if (!DISTRICT_IDS.includes(d.id)) errors.push(`unknown district id: ${d.id}`);
  for (const k of ['name', 'theme_line', 'walkthrough']) {
    if (typeof d[k] !== 'string' || d[k].trim() === '') errors.push(`missing field: ${k}`);
  }
  if (!d.palette || typeof d.palette !== 'object') errors.push('missing palette');
  if (!d.position || typeof d.position.x !== 'number' || typeof d.position.z !== 'number') errors.push('missing position {x, z}');
  if (!Array.isArray(d.drugs)) errors.push('drugs must be an array');
  else d.drugs.forEach((drug, i) => {
    const { ok, errors: drugErrors } = validateDrug(drug);
    if (!ok) errors.push(`drug[${i}] (${drug?.id}): ${drugErrors.join(', ')}`);
  });
  return { ok: errors.length === 0, errors };
}

function validateCity(c) {
  const errors = [];
  if (!c || !Array.isArray(c.districts)) return { ok: false, errors: ['city.districts must be an array'] };
  if (c.districts.length !== 14) errors.push(`expected 14 districts, got ${c.districts.length}`);
  for (const id of c.districts) {
    if (!DISTRICT_IDS.includes(id)) errors.push(`unknown district in city: ${id}`);
  }
  return { ok: errors.length === 0, errors };
}

if (typeof window !== 'undefined') {
  window.PHARMA = window.PHARMA || {};
  window.PHARMA.schema = { validateDrug, validateDistrict, validateCity, DISTRICT_IDS };
}
export { validateDrug, validateDistrict, validateCity, DISTRICT_IDS };
```

The file works both as an ES module (for vitest) and as a plain inlined script (writes to `window.PHARMA.schema`). Every later file follows this dual-mode pattern.

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- tests/content-schema.test.js
```

Expected: PASS, 5 tests green.

- [ ] **Step 6: Commit**

```bash
git add src/content-schema.js tests/content-schema.test.js docs/superpowers/specs/2026-06-24-pharmacology-city-design.md docs/superpowers/plans/2026-06-24-pharmacology-city.md
git commit -m "Content schema validators for city/district/drug + spec/plan district count fix"
```

---

## Task 3: App shell, CSS, state router

**Files:**
- Create: `src/app.js`, `src/styles.css`

**Interfaces:**
- Consumes: `window.PHARMA.schema` from Task 2.
- Produces: `window.PHARMA.app = { goTo(level, args), state, on(event, fn) }`. Levels are `'city' | 'district' | 'flashcard'`. Args are `{ districtId? , drugId? }`. Emits `'navigate'` events.

- [ ] **Step 1: Write the CSS**

Replace `src/styles.css`:

```css
:root {
  --bg: #0b1020;
  --text: #f1efe8;
  --muted: #a8a8a8;
  --accent: #185FA5;
  --card: rgba(15, 22, 42, 0.92);
  --border: rgba(255,255,255,0.12);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: var(--bg); color: var(--text); height: 100%; overflow: hidden; }
#app { position: fixed; inset: 0; }
canvas { display: block; touch-action: none; }
.topbar { position: absolute; top: env(safe-area-inset-top, 0); left: 0; right: 0; padding: 12px 16px; display: flex; gap: 12px; align-items: center; z-index: 10; }
.btn { background: var(--card); border: 1px solid var(--border); color: var(--text); padding: 8px 12px; border-radius: 10px; font-size: 14px; cursor: pointer; }
.btn:active { transform: scale(0.97); }
.title { font-size: 16px; font-weight: 500; flex: 1; text-align: center; }
.flashcard { position: fixed; left: 50%; bottom: env(safe-area-inset-bottom, 0); transform: translateX(-50%); width: min(560px, 100vw); max-height: 80vh; overflow-y: auto; background: var(--card); border: 1px solid var(--border); border-radius: 16px 16px 0 0; padding: 16px 20px 28px; z-index: 20; }
.facet { padding: 10px 0; border-top: 1px solid var(--border); }
.facet:first-child { border-top: 0; }
.facet-label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
.facet-value { font-size: 15px; margin-top: 4px; line-height: 1.5; }
.facet-hidden { color: var(--muted); font-style: italic; cursor: pointer; padding: 8px 12px; border: 1px dashed var(--border); border-radius: 8px; text-align: center; }
.memory-hook { background: rgba(24,95,165,0.18); padding: 10px 14px; border-radius: 10px; margin-top: 12px; font-size: 14px; line-height: 1.5; }
.source-line { font-size: 11px; color: var(--muted); margin-top: 12px; }
.walkthrough { position: fixed; top: 0; right: 0; bottom: 0; width: min(360px, 86vw); background: var(--card); border-left: 1px solid var(--border); padding: 48px 20px 20px; transform: translateX(100%); transition: transform 0.25s ease; z-index: 15; overflow-y: auto; }
.walkthrough.open { transform: translateX(0); }
.search { position: absolute; top: env(safe-area-inset-top, 0); right: 16px; z-index: 11; }
.search input { background: var(--card); border: 1px solid var(--border); color: var(--text); padding: 8px 12px; border-radius: 10px; font-size: 14px; width: 180px; }
.search-results { position: absolute; top: 44px; right: 0; background: var(--card); border: 1px solid var(--border); border-radius: 10px; min-width: 240px; max-height: 60vh; overflow-y: auto; }
.search-result { padding: 8px 12px; border-bottom: 1px solid var(--border); cursor: pointer; font-size: 14px; }
.search-result:last-child { border-bottom: 0; }
.loading { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: var(--bg); color: var(--text); font-size: 16px; z-index: 100; }
```

- [ ] **Step 2: Write the app entry/state router**

Replace `src/app.js`:

```js
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const listeners = new Set();
  const state = { level: 'city', districtId: null, drugId: null };
  function goTo(level, args = {}) {
    state.level = level;
    state.districtId = args.districtId ?? null;
    state.drugId = args.drugId ?? null;
    listeners.forEach(fn => fn(state));
  }
  function on(_event, fn) { listeners.add(fn); return () => listeners.delete(fn); }
  P.app = { goTo, on, get state(){ return { ...state }; } };

  if (typeof document !== 'undefined' && document.readyState !== 'loading') boot();
  else if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', boot);

  function boot() {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = `
      <div class="topbar">
        <button class="btn" id="backBtn" aria-label="back" style="display:none">‹ Back</button>
        <div class="title" id="title">Pharmacology City</div>
      </div>
      <div class="search" id="search-mount"></div>
    `;
    const back = document.getElementById('backBtn');
    const title = document.getElementById('title');
    on('navigate', s => {
      back.style.display = s.level === 'city' ? 'none' : '';
      title.textContent = s.level === 'city' ? 'Pharmacology City' :
        (P.content?.districts?.[s.districtId]?.name ?? s.districtId);
    });
    back.addEventListener('click', () => {
      if (state.level === 'flashcard') goTo('district', { districtId: state.districtId });
      else if (state.level === 'district') goTo('city');
    });
    P.city?.mount?.(app);
    P.district?.mount?.(app);
    P.flashcard?.mount?.(app);
    P.search?.mount?.(document.getElementById('search-mount'));
    goTo('city');
  }
})();
```

- [ ] **Step 3: Smoke-test build still produces a file**

```bash
npm run build
```

Expected: prints `built dist/pharma-city.html (<size> KB)`.

- [ ] **Step 4: Manual visual check**

Open `dist/pharma-city.html` in Chrome/Safari. Expect: black background, "Pharmacology City" title bar across the top, no 3D yet (city scene placeholder). No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/app.js src/styles.css dist/pharma-city.html
git commit -m "App shell: top bar, level routing, navigation events"
```

---

## Task 4: Building primitives (3D shapes library)

**Files:**
- Create: `src/primitives.js`, `tests/primitives.test.js`
- Modify: `build.js` only if a new content file is added (none here).

**Interfaces:**
- Consumes: `THREE` (global from inlined vendor).
- Produces: `window.PHARMA.primitives = { box, dome, tower, cylinder, arch, water, particleSmoke, castShadow }`. Each accepts `{w, h, d, color, accentColor, segments?}` and returns a `THREE.Group`. Geometries and Lambert materials are cached and shared across calls with identical parameters.

- [ ] **Step 1: Write tests for material/geometry sharing**

Create `tests/primitives.test.js`. Use a JSDOM-style mock of THREE since Three.js itself needs WebGL — but the caching logic is testable without rendering:

```js
import { describe, it, expect, beforeEach } from 'vitest';

// Minimal THREE mock — we test the caching behavior, not Three.js itself
const mockTHREE = () => {
  const created = { geoms: 0, mats: 0 };
  return {
    created,
    Group: class { constructor() { this.children = []; } add(c) { this.children.push(c); } },
    Mesh: class { constructor(g, m) { this.g = g; this.m = m; this.castShadow = false; this.receiveShadow = false; this.position = { set(){} }; this.rotation = { x:0,y:0,z:0 }; } },
    BoxGeometry: class { constructor(w,h,d) { created.geoms++; this.key = `box:${w}:${h}:${d}`; } },
    CylinderGeometry: class { constructor(r1,r2,h,seg) { created.geoms++; this.key = `cyl:${r1}:${r2}:${h}:${seg}`; } },
    SphereGeometry: class { constructor(r) { created.geoms++; this.key = `sph:${r}`; } },
    MeshLambertMaterial: class { constructor(opts) { created.mats++; this.opts = opts; } },
  };
};

describe('primitives caching', () => {
  beforeEach(() => { delete globalThis.window; });
  it('reuses box geometry across calls with identical dims', async () => {
    globalThis.THREE = mockTHREE();
    globalThis.window = {};
    await import('../src/primitives.js?bust=' + Math.random());
    const P = globalThis.window.PHARMA.primitives;
    P.box({ w: 5, h: 5, d: 5, color: 0xff0000 });
    P.box({ w: 5, h: 5, d: 5, color: 0x00ff00 });
    expect(globalThis.THREE.created.geoms).toBe(1);
    // materials differ by color → two
    expect(globalThis.THREE.created.mats).toBe(2);
  });
});
```

- [ ] **Step 2: Run test, verify fail**

```bash
npm test -- tests/primitives.test.js
```

Expected: FAIL — `Cannot read properties of undefined`.

- [ ] **Step 3: Implement primitives.js**

Replace `src/primitives.js`:

```js
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const T = (typeof THREE !== 'undefined') ? THREE : globalThis.THREE;
  const geomCache = new Map();
  const matCache = new Map();
  const getBoxGeom = (w,h,d) => { const k=`b:${w}:${h}:${d}`; if(!geomCache.has(k)) geomCache.set(k,new T.BoxGeometry(w,h,d)); return geomCache.get(k); };
  const getCylGeom = (r1,r2,h,seg=16) => { const k=`c:${r1}:${r2}:${h}:${seg}`; if(!geomCache.has(k)) geomCache.set(k,new T.CylinderGeometry(r1,r2,h,seg)); return geomCache.get(k); };
  const getSphereGeom = (r,sw=20,sh=14) => { const k=`s:${r}:${sw}:${sh}`; if(!geomCache.has(k)) geomCache.set(k,new T.SphereGeometry(r,sw,sh)); return geomCache.get(k); };
  const getMat = (color, opts={}) => { const k = `m:${color}:${JSON.stringify(opts)}`; if(!matCache.has(k)) matCache.set(k,new T.MeshLambertMaterial({color, ...opts})); return matCache.get(k); };

  function box({ w, h, d, color }) {
    const m = new T.Mesh(getBoxGeom(w,h,d), getMat(color));
    m.castShadow = true; m.receiveShadow = true;
    return m;
  }
  function tower({ w=8, h=24, d=8, color, accentColor }) {
    const g = new T.Group();
    const body = box({ w, h, d, color });
    body.position.set(0, h/2, 0);
    g.add(body);
    return g;
  }
  function dome({ r=6, color }) {
    const m = new T.Mesh(getSphereGeom(r,20,14), getMat(color));
    m.castShadow = true;
    return m;
  }
  function cylinder({ r=4, h=10, color }) {
    const m = new T.Mesh(getCylGeom(r,r,h,24), getMat(color));
    m.castShadow = true; m.receiveShadow = true;
    return m;
  }
  function arch({ r=3, depth=1.5, color }) {
    const m = new T.Mesh(new T.CylinderGeometry(r,r,depth,16,1,false,0,Math.PI), getMat(color));
    m.rotation.x = Math.PI/2; m.rotation.z = Math.PI/2;
    return m;
  }
  function water({ radius=12, color=0x378ADD }) {
    const m = new T.Mesh(new T.CircleGeometry(radius, 32), getMat(color, { transparent: true, opacity: 0.75 }));
    m.rotation.x = -Math.PI/2;
    return m;
  }
  function particleSmoke({ count=10, color=0xD3D1C7 }) {
    const g = new T.Group();
    const particles = [];
    for (let i=0; i<count; i++) {
      const p = new T.Mesh(getSphereGeom(0.9,8,6), new T.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 }));
      p.userData = { life: Math.random(), speed: 0.04 + Math.random()*0.03, wob: Math.random()*Math.PI*2, baseY: 0 };
      g.add(p);
      particles.push(p);
    }
    g.userData.particles = particles;
    return g;
  }
  function castShadow(mesh) { mesh.castShadow = true; return mesh; }

  P.primitives = { box, tower, dome, cylinder, arch, water, particleSmoke, castShadow, _caches: { geomCache, matCache } };
})();
```

- [ ] **Step 4: Run primitives test**

```bash
npm test -- tests/primitives.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/primitives.js tests/primitives.test.js
git commit -m "Building primitives library with shared geometry/material caches"
```

---

## Task 5: Render loop (shared RAF, visibility pause)

**Files:**
- Create: `src/render-loop.js`, `tests/render-loop.test.js`

**Interfaces:**
- Produces: `window.PHARMA.loop = { add(fn), remove(fn), pause(), resume(), isRunning() }`. Each `fn(deltaSec, elapsedSec)` is called once per frame at up to 60 fps. Loop auto-pauses when `document.hidden`.

- [ ] **Step 1: Write tests**

Create `tests/render-loop.test.js`:

```js
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
```

- [ ] **Step 2: Run test, verify fail**

```bash
npm test -- tests/render-loop.test.js
```

Expected: FAIL.

- [ ] **Step 3: Implement render loop**

Replace `src/render-loop.js`:

```js
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
```

- [ ] **Step 4: Run test**

```bash
npm test -- tests/render-loop.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/render-loop.js tests/render-loop.test.js
git commit -m "Shared render loop with visibility-driven pause/resume"
```

---

## Task 6: City scene (level 1) with click-to-enter

**Files:**
- Create/Modify: `src/city-scene.js`
- Test: deferred — visual check via manual open

**Interfaces:**
- Consumes: `window.PHARMA.primitives`, `window.PHARMA.loop`, `window.PHARMA.app`, the global `CITY` and `DISTRICT_*` content objects.
- Produces: `window.PHARMA.city = { mount(rootEl) }`. The mount creates a canvas, sets up scene/camera/renderer, draws each district at its `position.x/z`, and binds raycaster click handlers that call `PHARMA.app.goTo('district', { districtId })`.

- [ ] **Step 1: Implement city scene**

Replace `src/city-scene.js`:

```js
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function mount(rootEl) {
    const canvas = document.createElement('canvas');
    rootEl.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1020);
    scene.fog = new THREE.Fog(0x0b1020, 80, 260);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
    camera.position.set(80, 50, 80); camera.lookAt(0, 6, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(40, 60, 30); dir.castShadow = true;
    dir.shadow.mapSize.width = 1024; dir.shadow.mapSize.height = 1024;
    dir.shadow.camera.left=-70; dir.shadow.camera.right=70; dir.shadow.camera.top=70; dir.shadow.camera.bottom=-70;
    scene.add(dir);
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), new THREE.MeshLambertMaterial({color: 0x97C459}));
    ground.rotation.x = -Math.PI/2; ground.receiveShadow = true; scene.add(ground);

    // Place each district as a stylized landmark at its (x,z) position
    const districts = (typeof CITY !== 'undefined') ? CITY.districts : [];
    const pickables = [];
    districts.forEach(id => {
      const districtData = window['DISTRICT_' + id.toUpperCase()];
      if (!districtData) return;
      const group = new THREE.Group();
      // Each district renders its own "city landmark" — for v1, a simple primitive coloured by palette
      const lm = P.primitives.tower({ w: 10, h: 14, d: 10, color: districtData.palette?.accent ?? 0x888780 });
      group.add(lm);
      group.position.set(districtData.position.x, 0, districtData.position.z);
      group.userData.districtId = id;
      scene.add(group);
      pickables.push(group);
    });

    const ray = new THREE.Raycaster();
    const pt = new THREE.Vector2();
    canvas.addEventListener('pointerdown', (e) => {
      const rect = canvas.getBoundingClientRect();
      pt.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pt.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(pt, camera);
      const hit = ray.intersectObjects(pickables, true)[0];
      if (hit) {
        let g = hit.object; while (g && !g.userData?.districtId) g = g.parent;
        if (g?.userData?.districtId) P.app.goTo('district', { districtId: g.userData.districtId });
      }
    });

    let visible = true;
    function tick(_dt, t) {
      if (!visible) return;
      // Slow auto-orbit
      const r = 78;
      camera.position.x = Math.sin(t * 0.18) * r;
      camera.position.z = Math.cos(t * 0.18) * r;
      camera.position.y = 38 + Math.sin(t * 0.4) * 3;
      camera.lookAt(0, 6, 0);
      renderer.render(scene, camera);
    }
    P.loop.add(tick);
    P.app.on('navigate', s => { visible = s.level === 'city'; canvas.style.display = visible ? 'block' : 'none'; });
    window.addEventListener('resize', resize); resize();
  }
  P.city = { mount };
})();
```

- [ ] **Step 2: Build and visually verify**

```bash
npm run build
open dist/pharma-city.html
```

Expected: opening the file shows a green ground, dark sky, slow auto-orbiting camera. Each district will render only once Tasks 23-30 produce content — for now the file may show no buildings, which is fine. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/city-scene.js dist/pharma-city.html
git commit -m "City scene: ground, lights, auto-orbit, raycast click to enter district"
```

---

## Task 7: District scene (level 2)

**Files:**
- Create/Modify: `src/district-scene.js`

**Interfaces:**
- Consumes: same as city; reads the active district from `PHARMA.app.state.districtId`, finds `window['DISTRICT_' + ID.toUpperCase()]`, builds the 3D street.
- Produces: `window.PHARMA.district = { mount(rootEl) }`. On `navigate` to `'district'`, builds/replaces the scene with the active district's buildings (one per drug). Raycast click on a building calls `PHARMA.app.goTo('flashcard', { districtId, drugId })`.

- [ ] **Step 1: Implement district scene**

Replace `src/district-scene.js`:

```js
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function mount(rootEl) {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    rootEl.appendChild(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1020);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
    camera.position.set(40, 25, 40); camera.lookAt(0, 4, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(20, 40, 20); scene.add(dir);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshLambertMaterial({color: 0x639922}));
    ground.rotation.x = -Math.PI/2; scene.add(ground);

    const groupRoot = new THREE.Group();
    scene.add(groupRoot);
    let pickables = [];

    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }

    function loadDistrict(id) {
      // clear
      while (groupRoot.children.length) groupRoot.remove(groupRoot.children[0]);
      pickables = [];
      const d = window['DISTRICT_' + id.toUpperCase()];
      if (!d) return;
      ground.material = new THREE.MeshLambertMaterial({ color: d.palette?.ground ?? 0x639922 });
      // arrange drugs in a 5-per-row grid centred at origin
      const drugs = d.drugs || [];
      drugs.forEach((drug, i) => {
        const row = Math.floor(i / 5), col = i % 5;
        const g = new THREE.Group();
        const lm = P.primitives.tower({ w: 6, h: 10 + (drug.high_yield ? 4 : 0), d: 6, color: d.palette?.accent ?? 0x888780 });
        g.add(lm);
        g.position.set(-15 + col * 7, 0, -10 + row * 8);
        g.userData = { drugId: drug.id };
        groupRoot.add(g);
        pickables.push(g);
      });
      // call optional animation hook
      P.animations?.attach?.(id, scene, groupRoot);
    }

    const ray = new THREE.Raycaster(); const pt = new THREE.Vector2();
    canvas.addEventListener('pointerdown', (e) => {
      const rect = canvas.getBoundingClientRect();
      pt.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pt.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(pt, camera);
      const hit = ray.intersectObjects(pickables, true)[0];
      if (hit) {
        let g = hit.object; while (g && !g.userData?.drugId) g = g.parent;
        if (g?.userData?.drugId) P.app.goTo('flashcard', { districtId: P.app.state.districtId, drugId: g.userData.drugId });
      }
    });

    let visible = false;
    function tick(_dt, t) {
      if (!visible) return;
      const r = 35;
      camera.position.x = Math.sin(t * 0.12) * r;
      camera.position.z = Math.cos(t * 0.12) * r;
      camera.position.y = 18 + Math.sin(t * 0.3) * 2;
      camera.lookAt(0, 4, 0);
      renderer.render(scene, camera);
    }
    P.loop.add(tick);
    P.app.on('navigate', s => {
      visible = s.level === 'district' || s.level === 'flashcard';
      canvas.style.display = visible ? 'block' : 'none';
      if (s.level === 'district' && s.districtId) loadDistrict(s.districtId);
    });
    window.addEventListener('resize', resize); resize();
  }
  P.district = { mount };
})();
```

- [ ] **Step 2: Build and visually verify**

```bash
npm run build && open dist/pharma-city.html
```

Expected: clicking any district in the city scene transitions to its district scene; clicking a building (will be visible once content tasks ship at least one district) opens (currently empty) flashcard. Back-button returns to city.

- [ ] **Step 3: Commit**

```bash
git add src/district-scene.js dist/pharma-city.html
git commit -m "District scene: per-district 3D street, building grid, raycast to flashcard"
```

---

## Task 8: Flashcard overlay (DOM, hide-then-reveal)

**Files:**
- Create/Modify: `src/flashcard.js`, `tests/flashcard.test.js`

**Interfaces:**
- Produces: `window.PHARMA.flashcard = { mount(rootEl) }`. Renders an overlay when level is `'flashcard'`, hides otherwise. Class is always visible; mechanism/adverse_effects/clinical_use each start hidden behind a tap-to-reveal bar. Memory-hook and source line are always visible. A "Reveal all" / "Hide all" toggle controls all three hideable facets.

- [ ] **Step 1: Write tests for facet hide/reveal**

Create `tests/flashcard.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { JSDOM } from 'vitest/jsdom';
// vitest provides JSDOM via environment config; if not, install jsdom
```

If `JSDOM` import path fails, install jsdom and use it directly. For brevity here we test the pure logic:

```js
import { describe, it, expect } from 'vitest';

describe('flashcard hide-reveal state', () => {
  it('starts with three hidden facets', async () => {
    globalThis.window = {}; globalThis.document = mockDoc();
    await import('../src/flashcard.js?bust=' + Math.random());
    const fc = globalThis.window.PHARMA.flashcard;
    const state = fc._state({ id:'x', class:'c', mechanism:'m', adverse_effects:'a', clinical_use:'u', memory_hook:'h', source:'s', building:'b', district:'cholinergic' });
    expect(state.hidden.mechanism).toBe(true);
    expect(state.hidden.adverse_effects).toBe(true);
    expect(state.hidden.clinical_use).toBe(true);
  });
  it('reveal-all flips all three to visible', async () => {
    globalThis.window = {}; globalThis.document = mockDoc();
    await import('../src/flashcard.js?bust=' + Math.random());
    const fc = globalThis.window.PHARMA.flashcard;
    const state = fc._state({ id:'x', class:'c', mechanism:'m', adverse_effects:'a', clinical_use:'u', memory_hook:'h', source:'s', building:'b', district:'cholinergic' });
    state.revealAll();
    expect(state.hidden.mechanism).toBe(false);
    expect(state.hidden.adverse_effects).toBe(false);
    expect(state.hidden.clinical_use).toBe(false);
  });
});

function mockDoc(){ return { createElement: ()=>({ classList:{add(){},remove(){},toggle(){}}, appendChild(){}, addEventListener(){}, style:{}, dataset:{} }), getElementById: ()=>null, body: { appendChild(){} } }; }
```

- [ ] **Step 2: Verify failing**

```bash
npm test -- tests/flashcard.test.js
```

Expected: FAIL.

- [ ] **Step 3: Implement flashcard.js**

Replace `src/flashcard.js`:

```js
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function _state(drug) {
    const hidden = { mechanism: true, adverse_effects: true, clinical_use: true };
    return {
      drug, hidden,
      reveal(k) { hidden[k] = false; },
      hide(k) { hidden[k] = true; },
      revealAll() { for (const k in hidden) hidden[k] = false; },
      hideAll() { for (const k in hidden) hidden[k] = true; },
    };
  }
  let mountEl = null, state = null, container = null;
  function mount(rootEl) {
    mountEl = rootEl;
    container = document.createElement('div');
    container.className = 'flashcard';
    container.style.display = 'none';
    rootEl.appendChild(container);
    P.app.on('navigate', s => {
      if (s.level !== 'flashcard') { container.style.display = 'none'; return; }
      const district = window['DISTRICT_' + s.districtId.toUpperCase()];
      const drug = district?.drugs?.find(d => d.id === s.drugId);
      if (!drug) { container.style.display = 'none'; return; }
      state = _state(drug);
      render();
      container.style.display = 'block';
    });
  }
  function render() {
    if (!state) return;
    const d = state.drug;
    container.innerHTML = '';
    const head = document.createElement('div');
    head.innerHTML = `<div style="font-size:18px;font-weight:500">${esc(d.id)}</div><div style="font-size:12px;color:var(--muted);margin-top:2px">${esc(d.building)}</div>`;
    container.appendChild(head);

    container.appendChild(facet('Class', d.class, false, null));
    container.appendChild(facet('Mechanism', d.mechanism, state.hidden.mechanism, 'mechanism'));
    container.appendChild(facet('Adverse effects', d.adverse_effects, state.hidden.adverse_effects, 'adverse_effects'));
    container.appendChild(facet('Clinical use', d.clinical_use, state.hidden.clinical_use, 'clinical_use'));

    const hook = document.createElement('div');
    hook.className = 'memory-hook';
    hook.innerHTML = `<span style="font-weight:500">Memory hook</span> — ${esc(d.memory_hook)}`;
    container.appendChild(hook);

    const src = document.createElement('div');
    src.className = 'source-line';
    src.textContent = `Verify · ${d.source}`;
    container.appendChild(src);

    const ctrl = document.createElement('div');
    ctrl.style.marginTop = '10px';
    ctrl.innerHTML = `<button class="btn" id="revealAll">Reveal all</button> <button class="btn" id="hideAll">Hide all</button>`;
    container.appendChild(ctrl);
    container.querySelector('#revealAll').onclick = () => { state.revealAll(); render(); };
    container.querySelector('#hideAll').onclick = () => { state.hideAll(); render(); };
  }
  function facet(label, value, hidden, key) {
    const wrap = document.createElement('div');
    wrap.className = 'facet';
    wrap.innerHTML = `<div class="facet-label">${esc(label)}</div>`;
    if (hidden) {
      const bar = document.createElement('div');
      bar.className = 'facet-hidden';
      bar.textContent = 'Recall it — tap to reveal';
      bar.onclick = () => { state.reveal(key); render(); };
      wrap.appendChild(bar);
    } else {
      const v = document.createElement('div');
      v.className = 'facet-value';
      v.textContent = value;
      wrap.appendChild(v);
    }
    return wrap;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]); }
  P.flashcard = { mount, _state };
})();
```

- [ ] **Step 4: Run test**

```bash
npm test -- tests/flashcard.test.js
```

Expected: PASS.

- [ ] **Step 5: Visual verify**

```bash
npm run build && open dist/pharma-city.html
```

Visible end-to-end only after Task 16 (Cholinergic content) lands.

- [ ] **Step 6: Commit**

```bash
git add src/flashcard.js tests/flashcard.test.js dist/pharma-city.html
git commit -m "Flashcard overlay: four facets with hide-then-reveal, memory hook, source line"
```

---

## Task 9: Walkthrough panel (slide-in district narrative)

**Files:**
- Create/Modify: `src/walkthrough-panel.js`

**Interfaces:**
- Produces: `window.PHARMA.walkthrough = { mount(rootEl) }`. Slide-in panel from the right, opens automatically on first entry to a district, has a button to re-open. Renders `district.walkthrough` (markdown-ish plaintext). Closes via tap-outside or close button.

- [ ] **Step 1: Implement walkthrough panel**

Replace `src/walkthrough-panel.js`:

```js
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const seen = new Set();
  function mount(rootEl) {
    const panel = document.createElement('aside');
    panel.className = 'walkthrough';
    rootEl.appendChild(panel);
    const reopenBtn = document.createElement('button');
    reopenBtn.className = 'btn';
    reopenBtn.style.position = 'absolute'; reopenBtn.style.left = '12px'; reopenBtn.style.bottom = '12px'; reopenBtn.style.zIndex = '12';
    reopenBtn.style.display = 'none';
    reopenBtn.textContent = '? Walkthrough';
    rootEl.appendChild(reopenBtn);

    function close() { panel.classList.remove('open'); reopenBtn.style.display = ''; }
    function open(text, name) {
      panel.innerHTML = `
        <button class="btn" style="position:absolute;top:12px;right:12px" id="wt-close">×</button>
        <div style="font-size:18px;font-weight:500;margin-bottom:8px">${esc(name)}</div>
        <div style="font-size:14px;line-height:1.6">${esc(text)}</div>
      `;
      panel.querySelector('#wt-close').onclick = close;
      panel.classList.add('open');
      reopenBtn.style.display = 'none';
    }
    function esc(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]); }

    P.app.on('navigate', s => {
      if (s.level !== 'district' || !s.districtId) {
        panel.classList.remove('open');
        reopenBtn.style.display = 'none';
        return;
      }
      const d = window['DISTRICT_' + s.districtId.toUpperCase()];
      if (!d) return;
      reopenBtn.onclick = () => open(d.walkthrough, d.name);
      if (!seen.has(s.districtId)) {
        seen.add(s.districtId);
        open(d.walkthrough, d.name);
      } else {
        reopenBtn.style.display = '';
      }
    });
  }
  P.walkthrough = { mount };
})();
```

- [ ] **Step 2: Wire mount in app.js**

Edit `src/app.js` at the `boot()` function to call `P.walkthrough?.mount?.(app)` right after `P.flashcard?.mount?.(app)`:

```js
P.flashcard?.mount?.(app);
P.walkthrough?.mount?.(app);
P.search?.mount?.(document.getElementById('search-mount'));
```

- [ ] **Step 3: Build and visual verify**

```bash
npm run build
```

Walkthrough panel verifiable end-to-end after Cholinergic content lands.

- [ ] **Step 4: Commit**

```bash
git add src/walkthrough-panel.js src/app.js dist/pharma-city.html
git commit -m "Walkthrough panel: auto-open on first district entry, re-open button"
```

---

## Task 10: Search box (jump to building by drug name)

**Files:**
- Create/Modify: `src/search.js`, `tests/search.test.js`

**Interfaces:**
- Produces: `window.PHARMA.search = { mount(slotEl), index() }`. `index()` returns a fresh `[{drugId, districtId, label}]` list built from all `window.DISTRICT_*` content; the input filters and renders results that, on click, call `PHARMA.app.goTo('flashcard', { districtId, drugId })`.

- [ ] **Step 1: Tests for search index + filter**

Create `tests/search.test.js`:

```js
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
    expect(hits2.map(r => r.drugId).sort()).toEqual(['phenylephrine','pilocarpine']);
  });
});
```

- [ ] **Step 2: Verify failing**

```bash
npm test -- tests/search.test.js
```

Expected: FAIL.

- [ ] **Step 3: Implement search**

Replace `src/search.js`:

```js
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  function index() {
    const out = [];
    for (const k in window) {
      if (!k.startsWith('DISTRICT_')) continue;
      const d = window[k];
      (d.drugs || []).forEach(drug => out.push({ drugId: drug.id, districtId: d.id, label: drug.id, districtName: d.name }));
    }
    return out;
  }
  function filter(q) {
    q = (q || '').trim().toLowerCase();
    if (!q) return [];
    return index().filter(r => r.drugId.toLowerCase().includes(q));
  }
  function mount(slotEl) {
    if (!slotEl) return;
    slotEl.innerHTML = `<input type="search" placeholder="Search drug..." aria-label="search drug" /><div class="search-results" style="display:none"></div>`;
    const input = slotEl.querySelector('input');
    const results = slotEl.querySelector('.search-results');
    input.addEventListener('input', () => {
      const hits = filter(input.value).slice(0, 10);
      if (!hits.length) { results.style.display = 'none'; results.innerHTML = ''; return; }
      results.innerHTML = hits.map(h => `<div class="search-result" data-drug="${h.drugId}" data-district="${h.districtId}">${escape(h.drugId)} <span style="color:var(--muted);font-size:12px">(${escape(h.districtName)})</span></div>`).join('');
      results.style.display = 'block';
      results.querySelectorAll('.search-result').forEach(el => el.onclick = () => {
        P.app.goTo('flashcard', { districtId: el.dataset.district, drugId: el.dataset.drug });
        input.value = ''; results.style.display = 'none';
      });
    });
    document.addEventListener('click', (e) => { if (!slotEl.contains(e.target)) results.style.display = 'none'; });
  }
  function escape(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]); }
  P.search = { mount, index, filter };
})();
```

- [ ] **Step 4: Run test**

```bash
npm test -- tests/search.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/search.js tests/search.test.js
git commit -m "Search: drug-name index with live filter and jump-to-flashcard"
```

---

## Task 11: Walk-from-memory self-test mode

**Files:**
- Create/Modify: `src/self-test.js`, `tests/self-test.test.js`

**Interfaces:**
- Produces: `window.PHARMA.selfTest = { mount(rootEl), isOn(), set(on) }`. When on, the district scene hides building labels until tapped; the flashcard hides ALL facets including class until each is tapped. State is per-session, not persisted.

- [ ] **Step 1: Tests for state toggle**

Create `tests/self-test.test.js`:

```js
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
```

- [ ] **Step 2: Verify failing**

```bash
npm test -- tests/self-test.test.js
```

Expected: FAIL.

- [ ] **Step 3: Implement self-test**

Replace `src/self-test.js`:

```js
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  let on = false;
  const listeners = new Set();
  function set(v) { on = !!v; listeners.forEach(fn => fn(on)); }
  function isOn() { return on; }
  function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  function mount(rootEl) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.position = 'absolute'; btn.style.bottom = '12px'; btn.style.right = '12px'; btn.style.zIndex = '12';
    btn.textContent = 'Self-test: off';
    rootEl.appendChild(btn);
    btn.onclick = () => { set(!on); };
    onChange(v => { btn.textContent = v ? 'Self-test: on' : 'Self-test: off'; });
  }
  P.selfTest = { mount, set, isOn, onChange };
})();
```

- [ ] **Step 4: Integrate with flashcard**

Edit `src/flashcard.js`. Inside the `render()` function, hide the class facet too when self-test is on:

```js
container.appendChild(facet('Class', d.class, P.selfTest?.isOn?.() === true, P.selfTest?.isOn?.() === true ? 'class' : null));
```

And update the state object to allow hiding `class`:

```js
const hidden = { class: false, mechanism: true, adverse_effects: true, clinical_use: true };
```

(`class` starts visible normally; when self-test toggles on, the next render hides it. Make `reveal('class')` work.)

In `app.js boot()` add: `P.selfTest?.mount?.(app);` after walkthrough mount, and `P.selfTest?.onChange?.(() => { if (P.flashcard?._rerender) P.flashcard._rerender(); });`

Add a `_rerender` export to `flashcard.js`:

```js
P.flashcard = { mount, _state, _rerender: () => render() };
```

- [ ] **Step 5: Integrate with district scene (hide labels)**

In `district-scene.js loadDistrict()`, only draw labels (which we haven't added yet — district buildings currently have no DOM labels, so this step is a TODO marker if labels are added later). For v1, the district shows building shapes but no per-building label, so self-test affects flashcards only. Document this in code:

```js
// Self-test in v1 hides flashcard facets; building labels are not rendered in district scene v1.
```

- [ ] **Step 6: Run tests**

```bash
npm test -- tests/self-test.test.js
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/self-test.js src/flashcard.js src/app.js src/district-scene.js tests/self-test.test.js
git commit -m "Self-test mode: toggle hides all flashcard facets including class"
```

---

## Task 12: Animations registry

**Files:**
- Create/Modify: `src/animations.js`

**Interfaces:**
- Produces: `window.PHARMA.animations = { register(districtId, attachFn), attach(districtId, scene, groupRoot) }`. The district scene calls `attach()` after loading; if a registration exists, it runs and may install per-frame callbacks via `PHARMA.loop.add`.

- [ ] **Step 1: Implement**

Replace `src/animations.js`:

```js
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
```

- [ ] **Step 2: Commit**

```bash
git add src/animations.js
git commit -m "Animations registry: per-district attach hook"
```

---

## Task 13: Cholinergic district — gold-standard content + animations

**Files:**
- Create/Modify: `content/districts/cholinergic.js`, `content/city.js`, `tests/district-content.test.js`

**Interfaces:**
- Consumes: schema from Task 2.
- Produces: `window.DISTRICT_CHOLINERGIC` with at least 8 high-yield drugs and 4-6 long-tail entries. Animations: rain (particle system) and water-ripple. Registered via `PHARMA.animations.register('cholinergic', ...)`.

The Cholinergic district is the canonical example every later district copies in structure.

- [ ] **Step 1: Define the district + drugs**

Replace `content/districts/cholinergic.js` with a complete district. The implementing agent must research and produce content for at least these drugs (each with all four facets, source citation, memory_hook):

| high_yield | drug |
|---|---|
| ✓ | acetylcholine |
| ✓ | pilocarpine |
| ✓ | carbachol |
| ✓ | bethanechol |
| ✓ | neostigmine |
| ✓ | physostigmine |
| ✓ | edrophonium |
| ✓ | pyridostigmine |
| ✓ | atropine |
| ✓ | glycopyrrolate |
| ✓ | hyoscine (scopolamine) |
| ✓ | tropicamide |
| | parathion (OP poisoning) |
| | malathion |
| | pralidoxime (2-PAM, antidote) |
| | botulinum toxin (presynaptic, brief mention) |

Note this list has both cholinomimetic and anticholinergic drugs; the district narrative reconciles them as "the swamp and its drainage." The implementing agent may add a small "Anticholinergic alley" sub-area within the same district.

Skeleton (the implementing agent fills `mechanism`, `adverse_effects`, `clinical_use`, `memory_hook`, `source` for each entry, grounded in G&G 14e):

```js
const DISTRICT_CHOLINERGIC = {
  id: 'cholinergic',
  name: 'Cholinergic',
  theme_line: 'Flooded swamp-town · SLUDGE',
  walkthrough: `Every fountain in the swamp overflows. Saliva drips, eyes water, sweat beads, the bowels and bladder won’t stop, and the muscles twitch. This is the body when acetylcholine is everywhere it shouldn’t be. Across the canal sits Anticholinergic alley — a desert where every fountain has been turned off. Atropine’s tower is the alley’s landmark.`,
  palette: { ground: 0x97C459, accent: 0x1D9E75, water: 0x378ADD },
  position: { x: -30, z: 0 },
  drugs: [
    {
      id: 'neostigmine',
      district: 'cholinergic',
      building: 'the bridge over the floodgate',
      class: 'Reversible anticholinesterase, quaternary amine',
      mechanism: 'Inhibits acetylcholinesterase → ACh accumulates at the NMJ and parasympathetic synapses. Quaternary structure: poorly crosses BBB.',
      adverse_effects: 'SLUDGE (salivation, lacrimation, urination, defecation, GI cramps, emesis); bradycardia; bronchospasm; muscle fasciculations; cholinergic crisis at overdose.',
      clinical_use: 'Myasthenia gravis (mainstay); reversal of non-depolarising neuromuscular blockade (with glycopyrrolate); post-op ileus; urinary retention.',
      memory_hook: 'On Neostigmine bridge the floodgate jams open and acetylcholine piles up until the tired myasthenic soldiers can finally march.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },
    // ... fill remaining 15+ drugs with the same shape
  ],
};
if (typeof window !== 'undefined') window.DISTRICT_CHOLINERGIC = DISTRICT_CHOLINERGIC;
```

- [ ] **Step 2: Update content/city.js to include all 14 district ids**

Replace `content/city.js`:

```js
const CITY = {
  districts: [
    'general_pharmacology',
    'ans_hub',
    'cholinergic',
    'adrenergic',
    'cvs',
    'respiratory',
    'git',
    'renal',
    'autacoids',
    'cns',
    'endocrine',
    'chemotherapy',
    'toxicology',
    'recent_advances'
  ],
  layout: 'spec/2026-06-24-pharmacology-city-design.md',
};
if (typeof window !== 'undefined') window.CITY = CITY;
```

- [ ] **Step 3: Add district-content test that validates Cholinergic**

Create `tests/district-content.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { validateDistrict } from '../src/content-schema.js';
import { readFileSync } from 'node:fs';

function loadDistrict(id) {
  const code = readFileSync(`content/districts/${id.replace(/_/g,'-')}.js`, 'utf8');
  const m = { window: {} };
  new Function('window', code)(m.window);
  return m.window['DISTRICT_' + id.toUpperCase()];
}

describe('Cholinergic district', () => {
  const d = loadDistrict('cholinergic');
  it('passes the schema', () => {
    const { ok, errors } = validateDistrict(d);
    if (!ok) console.error(errors);
    expect(ok).toBe(true);
  });
  it('has at least 8 high-yield drugs', () => {
    expect(d.drugs.filter(x => x.high_yield).length).toBeGreaterThanOrEqual(8);
  });
});
```

- [ ] **Step 4: Register the cholinergic animation**

Create or append `src/animations.js` with a Cholinergic registration. To keep `animations.js` reusable, put the registration inside `content/districts/cholinergic.js` at the bottom — it accesses `PHARMA.animations.register` and `THREE`:

```js
if (typeof window !== 'undefined' && window.PHARMA?.animations) {
  window.PHARMA.animations.register('cholinergic', ({ THREE, scene, groupRoot, primitives, loop }) => {
    // Water plane in the centre
    const water = primitives.water({ radius: 18, color: 0x378ADD });
    water.position.y = 0.15;
    groupRoot.add(water);
    // Rain particles
    const rainCount = 80;
    const positions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      positions[i*3] = (Math.random() - 0.5) * 40;
      positions[i*3+1] = Math.random() * 20 + 5;
      positions[i*3+2] = (Math.random() - 0.5) * 40;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const rain = new THREE.Points(geom, new THREE.PointsMaterial({ color: 0x85B7EB, size: 0.3, transparent: true, opacity: 0.7 }));
    groupRoot.add(rain);
    const onTick = (dt) => {
      const pos = rain.geometry.attributes.position.array;
      for (let i = 0; i < rainCount; i++) {
        pos[i*3+1] -= 18 * dt;
        if (pos[i*3+1] < 0.5) pos[i*3+1] = 22;
      }
      rain.geometry.attributes.position.needsUpdate = true;
      // Water ripple via scale pulse
      const s = 1 + Math.sin(performance.now()/1000 * 1.2) * 0.02;
      water.scale.set(s, 1, s);
    };
    loop.add(onTick);
  });
}
```

- [ ] **Step 5: Run tests**

```bash
npm test -- tests/district-content.test.js
```

Expected: PASS (assuming the implementing agent has filled all required drug fields).

- [ ] **Step 6: Build and visual verify end-to-end**

```bash
npm run build && open dist/pharma-city.html
```

Expected:
- City scene shows a small purple-ish landmark at position (-30, 0).
- Click it → camera flies to Cholinergic district.
- Walkthrough panel slides in with the swamp narrative.
- Rain falls; water plane pulses.
- Click a building → flashcard appears with Class visible, MOA/ADR/Use hidden behind tap-bars.
- Tap a bar → that facet reveals.
- "Reveal all" button reveals all three.
- Memory hook always visible.
- "Verify · G&G 14e, ch. 11" at the bottom.
- Self-test toggle hides Class too.

- [ ] **Step 7: Commit**

```bash
git add content/districts/cholinergic.js content/city.js tests/district-content.test.js dist/pharma-city.html
git commit -m "Cholinergic district: gold-standard content + rain/water animations"
```

---

## Tasks 14–25: Remaining 13 districts

Each of the following 13 tasks creates one district file at `content/districts/<id>.js` exporting `window.DISTRICT_<ID>`. Each follows the **Cholinergic template** from Task 13 exactly — same schema fields, same structure, same gold-standard quality bar. Animations are added only when the spec calls for them (Adrenergic, CVS, ANS hub).

Per district task, the implementing agent must:

- Produce a complete `walkthrough` paragraph that paints the district's pharmacology as a scene.
- Pick a `palette` ({ground, accent, water?, accent2?}) consistent with the district's theme.
- Pick a `position: { x, z }` from the table below (the city layout).
- Fill 8-20 high-yield drugs (with all four facets + memory hook + source) and 4-10 long-tail entries (id + class + 1-line note only).
- Where the spec calls for animations, register one via `PHARMA.animations.register(id, ...)`.
- Add a test that validates the district passes the schema and has the minimum high-yield count.
- Run `npm test` for that district, fix until green, then `npm run build` + visual smoke test.
- Commit with message `<District>: content + animations`.

Position grid (chosen so distance encodes relatedness):

| Task | District id | x | z | Drugs target | Animation |
|---|---|---|---|---|---|
| 14 | `ans_hub` | 0 | 0 | 6+ | Rotating switchboard beacon |
| 15 | `adrenergic` | 30 | 0 | 12+ | Smokestack particles + lightning flash |
| 16 | `cvs` | 0 | 30 | 18+ | Heart-on-roof beats; bpm shifts with hovered drug |
| 17 | `cns` | -20 | -40 | 25+ | None (already complex) |
| 18 | `chemotherapy` | -50 | -40 | 25+ | Castle flag waves |
| 19 | `endocrine` | 40 | -40 | 18+ | None |
| 20 | `autacoids` | 0 | 15 | 12+ | Messenger lanterns flicker |
| 21 | `renal` | -25 | 25 | 8+ | Water tower drips |
| 22 | `respiratory` | 25 | 25 | 8+ | Lung-balloon floats overhead |
| 23 | `git` | 0 | 50 | 10+ | None |
| 24 | `toxicology` | 60 | -25 | 8+ | None |
| 25 | `recent_advances` | 0 | 70 | 6+ | None |
| 26 | `general_pharmacology` | -50 | 50 | 4+ (more conceptual) | None |

Each task in this group uses this template:

### Task <N>: <District name>

**Files:**
- Create: `content/districts/<id>.js`
- Test: `tests/district-content.test.js` (append a `describe('<Name> district', ...)` block)

- [ ] **Step 1:** Write the district file following the Cholinergic structure exactly (see Task 13). Drug content must be canonical G&G 14e; every drug carries `source`.
- [ ] **Step 2:** Append a `describe` block to `tests/district-content.test.js` that loads the district, validates schema, and asserts the drug-count target.
- [ ] **Step 3:** Run `npm test`. Fix until green.
- [ ] **Step 4:** Run `npm run build`, open `dist/pharma-city.html`, click into the district, verify all flashcards render and the source line shows.
- [ ] **Step 5:** Commit with message `<District>: content + animations`.

---

## Task 27: Performance pass

**Files:**
- Modify: `src/city-scene.js`, `src/district-scene.js`, `src/render-loop.js`

- [ ] **Step 1: Profile on a phone**

Use Chrome DevTools remote-debug an Android phone or use Safari Web Inspector for iOS. Open `dist/pharma-city.html`, navigate through 3-4 districts, watch the Performance panel for fps and main-thread work. Note the slowest scene.

- [ ] **Step 2: Apply at least these optimisations**

- Pause the city render loop when not visible (the navigate listener already gates rendering; verify it's not just hiding the canvas while still rendering).
- Reduce shadow map size on devices with `devicePixelRatio < 2` to 512:
  ```js
  const isHiDPI = window.devicePixelRatio >= 2;
  dir.shadow.mapSize.width = isHiDPI ? 1024 : 512;
  ```
- Cap renderer pixel ratio: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` (already in code; double-check applied).
- For the district scene, disable shadows entirely if they're enabled.
- Cap particle counts: rain ≤ 80, smoke ≤ 12, others ≤ 30.

- [ ] **Step 3: Re-measure**

Aim for ≥30 fps on the test phone. Document the achieved fps in a new section of `README.md` ("Tested on: <phone model>, <fps>").

- [ ] **Step 4: Commit**

```bash
git add src/ README.md dist/pharma-city.html
git commit -m "Performance: gate render by scene visibility, scale shadows by DPR"
```

---

## Task 28: Mobile, offline, sharing verification

**Files:** none modified unless bugs are found.

- [ ] **Step 1: iOS Safari from file://**

AirDrop `dist/pharma-city.html` to your iPhone. Tap the file in Files app. Confirm:
- App opens fullscreen-ish.
- City scene renders.
- Touch a district → enters.
- Touch a building → flashcard opens.
- Self-test toggle works.
- Search input works (filter, click, navigate).

- [ ] **Step 2: Android Chrome from file://**

Same flow on Android. Use Files app. If file:// has restrictions (some Androids do for HTML), instead:
- Save the file in Downloads.
- Open via Chrome → confirms direct file:// opening.

- [ ] **Step 3: WhatsApp share round-trip**

Send the file to yourself or a friend via WhatsApp. Have them tap it. Confirm:
- Downloads succeed.
- Opens in their default browser.
- No external network is loaded (Airplane mode test: turn it on, then open; everything still works).

- [ ] **Step 4: Document any fixes**

For each failure: file a fix as a new commit or as a TODO appended to `README.md`'s "Known issues" section.

- [ ] **Step 5: Commit known-issues update**

```bash
git add README.md
git commit -m "Mobile/offline/WhatsApp verification: document tested platforms and known issues"
```

---

## Task 29: Accessibility and keyboard

**Files:**
- Modify: `src/app.js`, `src/flashcard.js`, `src/walkthrough-panel.js`, `src/search.js`

- [ ] **Step 1: Add ARIA labels and roles**

- Top-bar back button: `aria-label="Back"` (already in code; verify).
- Flashcard container: `role="dialog"` `aria-modal="true"` `aria-labelledby="flashcard-title"`.
- Hidden facet bars: `role="button"` `tabindex="0"` and respond to Enter/Space.
- Search input: `aria-label="Search drug"`.
- Walkthrough close button: `aria-label="Close walkthrough"`.

- [ ] **Step 2: Keyboard navigation**

- `Esc` closes the flashcard (returns to district).
- `Esc` in district returns to city.
- `Tab` through interactive elements; no traps.

```js
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const s = P.app.state;
  if (s.level === 'flashcard') P.app.goTo('district', { districtId: s.districtId });
  else if (s.level === 'district') P.app.goTo('city');
});
```

- [ ] **Step 3: Reduced motion**

Respect `prefers-reduced-motion: reduce`: in `city-scene.js` and `district-scene.js`, gate camera auto-orbit:

```js
const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
function tick(dt, t) {
  if (!visible) return;
  if (!reduced) { /* orbit code */ }
  renderer.render(scene, camera);
}
```

- [ ] **Step 4: Commit**

```bash
git add src/ dist/pharma-city.html
git commit -m "Accessibility: ARIA labels, Escape navigation, reduced-motion support"
```

---

## Task 30: Final polish + ship

**Files:**
- Modify: anything found during the final review.

- [ ] **Step 1: Loading screen**

Add a `<div class="loading">Loading Pharmacology City…</div>` inside `#app` from `template.html`, and remove it once `app.js boot()` finishes mounting all scenes (defer one tick with `requestAnimationFrame`).

- [ ] **Step 2: Consistency review**

Read through every district's `walkthrough` and 4-5 random drug cards per district. Confirm:
- Tone is consistent (vivid + concrete, never dry).
- Memory hooks tie back to the building/district imagery.
- No two districts contradict each other on a shared drug (e.g. atropine's role in Adrenergic vs Cholinergic).
- The G&G chapter cited on each `source` line is plausible.

Fix discrepancies inline.

- [ ] **Step 3: Final build + visual smoke**

```bash
npm test
npm run build
ls -lh dist/pharma-city.html
```

Expected: all tests pass; final size in 700 KB-1.5 MB range.

- [ ] **Step 4: Ship**

```bash
git add .
git commit -m "Ship v1: final polish, loading screen, consistency review"
git tag v1.0.0
echo "Send dist/pharma-city.html to friends via WhatsApp / Drive / AirDrop."
```

---

## Self-review checklist (run before handoff)

After writing this plan, the author confirmed:

1. **Spec coverage:**
   - Single-file `.html`, offline, opens with no install → Tasks 1, 28.
   - All 14 districts with high-yield drugs + four facets → Tasks 13-26.
   - Active recall (hide-then-reveal + walk-from-memory + self-test) → Tasks 8, 11.
   - Three.js r160 inlined, no CDN at runtime → Tasks 1, 28.
   - District walkthrough panel → Task 9.
   - Search → Task 10.
   - Animations (cholinergic rain, adrenergic stacks, CVS heart, ANS beacon, others as listed) → Task 13 + Tasks 14-26 per district.
   - Performance target → Task 27.
   - Mobile/share/offline verification → Task 28.
   - Accessibility → Task 29.
   - 14-day timeline → matches plan ordering.

2. **Placeholder scan:**
   - No "TBD"/"TODO"/"add appropriate error handling" left in the plan body.
   - One place uses "the implementing agent fills" — this is intentional for the per-district content tasks, since drug content is too voluminous for the plan itself and is governed by the schema and the gold-standard Cholinergic template. Schema validation enforces shape.

3. **Type consistency:**
   - `PHARMA.app.goTo(level, { districtId, drugId })` — consistent across Tasks 6, 7, 8, 10.
   - `validateDrug` / `validateDistrict` / `validateCity` signatures — consistent across Tasks 2, 13.
   - District ids snake_case throughout (`cholinergic`, `ans_hub`).
   - `window.DISTRICT_<UPPERCASE>` lookup — consistent.

4. **District count fix:** The spec mistakenly said 13 districts but listed 14; Task 2 Step 2 corrects this in both the spec and the schema.
