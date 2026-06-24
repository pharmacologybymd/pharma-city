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
