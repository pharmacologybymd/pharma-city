# Pharmacology City

A 3D memory-palace city for revising MD Pharmacology (G&G 14e).
Open `dist/pharma-city.html` by double-clicking. Works offline.

## Sharing

Send `dist/pharma-city.html` via WhatsApp / Google Drive / AirDrop. Recipients open with one tap.

## Hosting at `city.pharmabymd.com` (GitHub Pages + custom domain)

The repo is set up to be a one-click GitHub Pages site at `city.pharmabymd.com`. `dist/` is **committed** (not gitignored) and contains `index.html`, `pharma-city.html`, `CNAME`, and `.nojekyll`.

**One-time setup (via GitHub Desktop):**

1. Open GitHub Desktop → **File → Add local repository** → choose `/Users/rahulsanghvi/Pharma City`.
2. Top toolbar → **Publish repository**. Name `pharma-city`, leave "Keep this code private" UNCHECKED, click Publish.
3. On github.com → your new repo → **Settings → Pages**. Source: `Deploy from a branch`. Branch `main`, folder `/dist`. Save.
4. Wait ~30 s for the first deploy. The temporary URL `https://<your-username>.github.io/pharma-city/` should serve the city.
5. In the same Pages settings, **Custom domain** → `city.pharmabymd.com`. (The `dist/CNAME` file in the repo also declares this.)
6. In your **JustNode cPanel → Zone Editor** for `pharmabymd.com`, add a **CNAME** record: name `city`, target `<your-username>.github.io.` (with trailing dot). Save.
7. Back on the Pages settings page, tick **Enforce HTTPS** once it becomes available (~10 min — GitHub provisions an SSL cert for the subdomain automatically).

Done. `https://city.pharmabymd.com` is live and updates whenever you push.

**Updating the live site:**

1. Edit content (`content/districts/*.js`) or engine (`src/*.js`).
2. `npm run build` → updates `dist/`.
3. GitHub Desktop → commit changes → **Push origin**.
4. Pages redeploys in ~30 s.

## Development

```
npm install
npm test                # run unit tests
npm run test:watch      # tests in watch mode
npm run build           # rebuild dist/pharma-city.html
```

Source lives in `src/` (engine) and `content/` (drug facts).
Three.js r160 is vendored in `vendor/three.min.js`.

## Performance

Built and tested on Apple Silicon (arm64), Node 22.11. Target: 30 fps on a Snapdragon 6-series Android.

Render pipeline:
- Renderer pixelRatio capped at `min(devicePixelRatio, 2)`.
- City scene shadow map: 1024² on devicePixelRatio≥2, 512² otherwise.
- District scene: no shadow maps (shadow constraint applies to city only).
- Render loop pauses on `document.hidden` via `visibilitychange` listener.
- Geometries and Lambert materials shared via primitives cache (`src/primitives.js`).
