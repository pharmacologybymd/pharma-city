# Pharmacology City

A 3D memory-palace city for revising MD Pharmacology (G&G 14e).
Open `dist/pharma-city.html` by double-clicking. Works offline.

## Sharing

Send `dist/pharma-city.html` via WhatsApp / Google Drive / AirDrop. Recipients open with one tap.

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
