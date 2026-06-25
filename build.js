import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
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
  'walkthrough-panel.js',
  'flashcard.js',
  'search.js',
  'self-test.js',
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

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/pharma-city.html'), html);
const bytes = Buffer.byteLength(html, 'utf8');
console.log(`built dist/pharma-city.html (${(bytes / 1024).toFixed(0)} KB)`);
