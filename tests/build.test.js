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
