import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = import.meta.dirname;
const read = (p) => readFileSync(join(root, p), 'utf8');

// Strips ESM `export` syntax so the same source files work both for vitest
// (loaded as ES modules) and inlined into a plain <script> tag in the browser.
// Handles named-list exports, named-keyword exports, and bare default exports.
function stripExports(code) {
  return code
    .replace(/^export\s+\{[^}]*\}\s*;?\s*$/gm, '')
    .replace(/^export\s+(default\s+)?(async\s+function|function|const|let|var|class|async)\s+/gm, '$2 ')
    .replace(/^export\s+default\s+/gm, '');
}

// Concatenates every .js in `dir` (alphabetical, non-recursive). Any .js file
// added to content/ or content/districts/ gets inlined automatically — don't
// drop unrelated JS into these dirs.
function concatDir(dir) {
  const files = readdirSync(join(root, dir)).filter(f => f.endsWith('.js')).sort();
  return files.map(f => `// === ${dir}/${f} ===\n${stripExports(read(join(dir, f)))}`).join('\n\n');
}

const three = read('vendor/three.min.js');
const css = read('src/styles.css');
const content = concatDir('content') + '\n\n' + concatDir('content/districts');
const appFiles = [
  'content-schema.js',
  'primitives.js',
  'render-loop.js',
  'animations.js',
  'theme.js',
  'walkthrough-panel.js',
  'classification-panel.js',
  'flashcard.js',
  'search.js',
  'self-test.js',
  'quiz.js',
  'mcq.js',
  'compare.js',
  'minimap.js',
  'flowchart-overlay.js',
  'district-scene.js',
  'city-scene.js',
  'app.js',
];
const app = appFiles.map(f => `// === src/${f} ===\n${stripExports(read('src/' + f))}`).join('\n\n');

// Anything we inline inside a <script>…</script> tag must not contain the
// literal `</script>` (or HTML comment delimiters) — the HTML parser closes
// the script tag at the first match, leaving the rest as orphaned text.
// Three.js r160's minified bundle has these substrings; escape them.
function escapeForInlineScript(code) {
  return code
    .replace(/<\/script>/gi, '<\\/script>')
    .replace(/<!--/g, '<\\!--');
}

let html = read('src/template.html');
html = html.replace('<!--INJECT_CSS-->', () => css);
html = html.replace('<!--INJECT_THREE-->', () => escapeForInlineScript(three));
html = html.replace('<!--INJECT_CONTENT-->', () => escapeForInlineScript(content));
html = html.replace('<!--INJECT_APP-->', () => escapeForInlineScript(app));

// ── Standalone classification flowchart page ──────────────────────────────
// A separate HTML page that renders the per-district drug classification as a
// collapsible tree flowchart, with an ADME / MOA / Uses / ADR card per drug.
// We evaluate each district (for its classification + name) and its optional
// details file in a bare sandbox, then inline a trimmed JSON data blob — so the
// page stays independent of the 3D engine and the large drugs[] arrays.
const DISTRICT_ORDER = [
  'general_pharmacology', 'ans_hub', 'cholinergic', 'adrenergic', 'cvs',
  'respiratory', 'git', 'renal', 'autacoids', 'cns', 'endocrine',
  'chemotherapy', 'toxicology', 'recent_advances',
];
function evalModule(code) { const w = {}; new Function('window', code)(w); return w; }
const diagW = evalModule(read('content/diagrams.js'));
const DIAGRAMS = diagW.DIAGRAMS || {};
const DISTRICT_DIAGRAMS = diagW.DISTRICT_DIAGRAMS || {};
const classificationData = DISTRICT_ORDER.map(id => {
  const slug = id.replace(/_/g, '-');
  const dist = evalModule(read(`content/districts/${slug}.js`))['DISTRICT_' + id.toUpperCase()];
  let details = {};
  const dpath = `content/details/${slug}.js`;
  if (existsSync(join(root, dpath))) details = evalModule(read(dpath))['DETAILS_' + id.toUpperCase()] || {};
  const diagrams = (DISTRICT_DIAGRAMS[id] || []).map(k => DIAGRAMS[k]).filter(Boolean);
  return { id, name: dist.name, theme_line: dist.theme_line, classification: dist.classification, details, diagrams };
});
let clsHtml = read('src/classification-page.html');
clsHtml = clsHtml.replace('<!--INJECT_CSS-->', () => read('src/classification-page.css'));
clsHtml = clsHtml.replace('<!--INJECT_DATA-->', () => 'window.PHARMA_CLASSIFICATION_DATA = ' + escapeForInlineScript(JSON.stringify(classificationData)) + ';');
clsHtml = clsHtml.replace('<!--INJECT_JS-->', () => escapeForInlineScript(read('src/classification-page.js')));

// Pages only allows serving from / (root) or /docs — not /dist — so we
// write the artifacts to BOTH: dist/ keeps the historical name for local
// double-clicking, and docs/ is what GitHub Pages reads.
mkdirSync(join(root, 'dist'), { recursive: true });
mkdirSync(join(root, 'docs'), { recursive: true });
for (const outDir of ['dist', 'docs']) {
  writeFileSync(join(root, outDir, 'pharma-city.html'), html);
  writeFileSync(join(root, outDir, 'index.html'), html);
  writeFileSync(join(root, outDir, 'classification.html'), clsHtml);
  writeFileSync(join(root, outDir, 'CNAME'), 'city.pharmabymd.com\n');
  writeFileSync(join(root, outDir, '.nojekyll'), '');
}
const bytes = Buffer.byteLength(html, 'utf8');
const clsBytes = Buffer.byteLength(clsHtml, 'utf8');
console.log(`built dist/ and docs/ index.html (${(bytes / 1024).toFixed(0)} KB) + classification.html (${(clsBytes / 1024).toFixed(0)} KB)`);
