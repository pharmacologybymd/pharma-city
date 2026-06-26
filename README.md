# Pharmacology City

A 3D memory-palace city for revising MD Pharmacology, sourced to Goodman & Gilman 14e.

**Live:** [https://city.pharmabymd.com](https://city.pharmabymd.com)

14 districts, ~290 drugs, single-file HTML — works offline once loaded, opens by double-clicking, mobile-friendly.

## Features

### Study
- **Hide-then-reveal flashcards** for every drug: class, mechanism, adverse effects, clinical use, plus a memory hook and the G&G chapter citation.
- **Quiz me** picks any drug at random.
- **Practise missed** surfaces the drugs your "Knew it / Missed it" history says are weakest.
- **Due today** uses a Leitner spaced-repetition box (1d / 3d / 7d / 14d) to schedule each drug; the badge counts unseen + due.
- **MCQ mode** — 4-option multiple-choice questions; wrong answers are drawn from same-district drugs so they read plausibly.
- **Compare drugs** — pick 2–4 drugs from any district, see them in a side-by-side table (class / mechanism / ADR / clinical use / memory hook / source).
- **Self-test mode** hides every label so you can walk the city from memory and identify drugs by their building shape and position.
- **Drug-name search** jumps straight to any drug's flashcard.

### Visual / navigation
- Sky-blue **3D city** with sun, drifting clouds, beige road network. District position encodes relatedness (autonomic spine, effector ring, CNS hill cluster).
- 3-tier buildings (plinth + body + dome) with lit yellow windows.
- **Hover any building** → lifts and grows; cursor becomes a pointer.
- **Drag** to rotate, **scroll** to zoom, **click** a building → smooth fly-in then enter.
- Inside districts: drug buildings on city-block grid with palette-tinted road network.
- **Mastery visualisation** — every "Knew it" makes a building taller and shifts its dome yellow → lime → green. Missed drugs turn red. The whole district shows you visually where you're strong vs weak.
- **Day/night theme** (🌙 / ☀️) persists in localStorage.
- **Mini-map** (press M or click Map) — SVG overlay of all 14 districts with click-to-navigate dots.
- **Deep links** — `?d=cholinergic&drug=neostigmine` opens directly on that flashcard.

## Sharing

Send `dist/pharma-city.html` via WhatsApp, AirDrop, Drive, or just share the URL — `https://city.pharmabymd.com`.

## Development

```sh
npm install
npm test                # run unit tests
npm run test:watch
npm run build           # rebuild dist/ and docs/
```

Source lives in `src/` (engine) and `content/districts/` (drug facts). Three.js r160 is vendored in `vendor/three.min.js`. The build script concatenates everything into a single `dist/pharma-city.html` (and a copy at `docs/index.html` for GitHub Pages).

## Hosting at `city.pharmabymd.com`

GitHub Pages serves from `main` branch, `/docs` folder. `docs/CNAME` declares the custom domain; a CNAME record on `pharmabymd.com` DNS points `city` → `pharmacologybymd.github.io`. Every `git push` redeploys in ~30 s.

## Performance

Tested on Apple Silicon (arm64), Node 22.11. Target: 30 fps on a Snapdragon-6-series Android.

Render pipeline:
- Renderer pixelRatio capped at `min(devicePixelRatio, 2)`.
- City scene shadow map: 1024² on devicePixelRatio ≥ 2, 512² otherwise.
- District scene: no shadow maps (shadow constraint applies to city only).
- Render loop pauses on `document.hidden` via `visibilitychange` listener.
- Geometries and Lambert materials shared via primitives cache (`src/primitives.js`).

## Accuracy

Every flashcard cites its G&G chapter. Use the citation to spot-check borderline cases against the book. See `docs/superpowers/specs/2026-06-24-pharmacology-city-design.md` for the original design and accuracy policy.
