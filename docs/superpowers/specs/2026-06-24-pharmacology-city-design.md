# Pharmacology City — design

Author: Rahul Sanghvi · 2026-06-24

## Goal

Build a single-file, shareable 3D web app that helps Rahul and his friends memorize MD Pharmacology by walking through a vivid 3D city where every district is a drug class and every building is a drug. The exam is in two months; this tool exists to compress revision and make recall durable.

Success is defined as:

1. The shared `.html` file opens with one tap on any modern phone or laptop, offline, with no install step.
2. Every district from the Goodman & Gilman 14e syllabus has a place in the city; every high-yield drug has a building with its class / mechanism / adverse effects / clinical use.
3. The viewer supports active recall (hide-then-reveal flashcards) plus a "walk the district from memory" mode.
4. Built and handed to Rahul and his friends within ~14 days of starting.

## User

MD Pharmacology postgraduates, ~2 months before final exam. The author and a small group of friends will share one file via WhatsApp / Google Drive / AirDrop and study from it on their phones and laptops. Authoritative base text: **Goodman & Gilman's The Pharmacological Basis of Therapeutics, 14th edition**.

## Core concept — three levels

The city has exactly three levels of zoom; each level has a clear job:

1. **City (3D map).** A 3D animated overview. Every district has a fixed spatial position; *distance encodes relatedness* (ANS sits in the centre because it drives the heart, lungs, gut and eye, which radiate out from it). The user looks at the city from above and clicks any district to enter.
2. **District (3D scene).** Each drug class becomes a themed 3D neighborhood — buildings, ground, props chosen so the *whole vibe of the district encodes its core pharmacology* (the Cholinergic district is a flooded swamp-town because cholinergic excess floods the body — SLUDGE). Each building is a drug. The user walks the street, then clicks a building.
3. **Building (drug flashcard).** Each drug exposes four facets — **Class · Mechanism · Adverse effects · Clinical use** — initially hidden, revealed one tap at a time. A mnemonic *memory hook* ties the facts to the building's appearance and the district's theme.

This hierarchy is deliberately rigid. Three levels, in this order, every drug. No fourth level, no skipped level.

## Content model — data, not code

Every fact in the city lives in a single structured content file, not in the rendering code. A drug looks like this in spirit:

```
neostigmine:
  district: cholinergic
  building: "the bridge over the floodgate"
  class: "Reversible anticholinesterase, quaternary amine"
  mechanism: "Inhibits AChE → ACh accumulates at NMJ and synapse"
  adverse_effects: "SLUDGE; bradycardia; bronchospasm"
  clinical_use: "Myasthenia gravis; reversal of non-depolarising blockade; post-op ileus"
  memory_hook: "On Neostigmine bridge the floodgate jams open; ACh piles up until tired soldiers (myasthenic muscles) can march."
  source: "G&G 14e, ch. 11"
  high_yield: true
```

The same shape applies to every drug. A separate file describes districts (theme, ground colour, props, position in the city, walkthrough narrative). A separate file again describes the city (district list, spatial layout, defaults).

**High-yield vs long-tail drugs.** A `high_yield: true` flag drives detail. High-yield drugs get a *full building* (its own visible structure, all four facets, mnemonic hook, animations where relevant). Long-tail drugs are placed on the district map as small labelled landmarks — a name plate the user can tap to see a one-line summary card. Nothing is homeless; nothing fake-fills the city either. The flag is a separate axis from district, so we can promote a long-tail drug to high-yield later by flipping one field.

Two reasons this matters:

- I can extend the city by editing data. The viewer code never needs to change once the schema is locked.
- A reviewer (one of Rahul's friends, or a senior) can read the content file end-to-end without parsing rendering code, which makes accuracy checks against G&G easier.

## The city — districts and layout

The city covers the whole G&G 14e syllabus. There are 13 districts. Position on the map is chosen to mirror conceptual proximity, not the alphabet.

| Zone | District | Theme (1-line) |
|---|---|---|
| Entrance (south gate) | General pharmacology | City gates · ADME = roads, liver-factory, drainage |
| Centre (cross) | ANS hub | Switchboard plaza · receptors are the city dispatcher |
| Centre west | Cholinergic | Flooded swamp-town · SLUDGE |
| Centre east | Adrenergic | Power plant with stacks, lightning · fight-or-flight |
| Effector ring east | CVS | Heart plaza · hospital with a heart on the roof |
| Effector ring south-east | Respiratory | Airway avenue · lung-shaped balloon docks |
| Effector ring south | GIT | Market row · stalls and digestion |
| Effector ring south-west | Renal | Waterworks · the city's plumbing |
| Inner ring | Autacoids | Messenger lane · post office, histamine bells, 5-HT couriers |
| North hill | CNS quarter | Mind & nerves · sedation, fits, mood, anaesthetics, opioids |
| North-east plateau | Endocrine | Glandular heights · hormones above the city |
| North-west bastion | Chemotherapy | War fortress · ABx, antifungals, antivirals, anticancer |
| North-east edge | Toxicology | Hazmat silo · poisons + antidotes outside the wall |
| New town (south outskirts) | Recent advances | Clinical pharma, pharmacogenomics, biologics, trials |

Every district carries a *vibe* (geometry + colour + props) that encodes its pharmacology before any text is read. The vivid-and-themed style was chosen deliberately — absurd, exaggerated imagery is what sticks.

## The 3D viewer

A single-page WebGL app rendered with **Three.js** (loaded from cdnjs, bundled inline so the final file is fully offline-capable).

### Stack

- One self-contained `pharma-city.html` — HTML + CSS + JS + content data + the Three.js source, all inlined. WhatsApp-shareable.
- Three.js r160 for rendering. No bundler, no build step. The file is the deliverable.
- No external network calls at runtime. No fonts loaded from the internet. The app works offline forever.

### Scene structure

- One Three.js scene per *level*. City scene, district scene, and (for cohesion) the drug card is a DOM overlay rather than a third scene — flashcards are read, not flown around.
- Each district scene shares a small set of reusable building primitives (extruded box, tower, dome, cylinder, arch, water plane, particle smoke). Themed districts compose these primitives with class-specific colours, layout and props.
- A single shared camera-rig (orbiting, with click-to-focus on a building) is reused at the city and district levels.

### Navigation flow

1. Open file → loading screen → city scene flies in.
2. Auto-orbit until the user touches a district. On touch, the camera smoothly flies in and the district scene loads.
3. In the district, the camera orbits the local street. A collapsible "walkthrough" panel slides in from the side on first entry — the narrative description of the district that the user mentally re-reads to anchor the place — dismissable, recallable from a panel button. Touching a building opens its flashcard overlay.
4. Flashcard has four facets, each hidden until tapped — *recall first, then reveal*. A memory-hook line is always visible (the hook should pull you back to the place).
5. Back-button (top-left) returns to district; another back returns to city. Position in the city is preserved across visits in the same session.

### Animations

Used sparingly, always tied to the pharmacology so the motion is a mnemonic, not decoration:

- Cholinergic district: rain falling on the swamp, water rippling, the river rising.
- Adrenergic district: smokestacks puff, lightning bolt flashes, the power-plant hums.
- CVS district: hospital heart beats at a baseline ~70 bpm. (Click a drug and it shifts — bradycardia for digoxin, tachy for adrenaline, etc.)
- Cholinergic *selected*: pulsing info-blue halo + bobbing "you are here" pin.
- ANS hub: rotating beacon — the switchboard.
- City-level: sun arc, drifting clouds, the Respiratory lung-balloon floating between districts.

### Active-recall features

- **Hide-by-default flashcards.** Class is visible (district + building make it obvious anyway); MOA / ADR / clinical-use each start hidden behind a "recall it, then tap to reveal" bar.
- **Walk the district from memory.** A district mode that hides every building label; you fly through and try to name each building before tapping. Each tap reveals the drug name and lets you self-grade.
- **Self-test all (district).** Same as above but for the four facets, not just the names.
- **Search.** A quick search box jumps to a building by drug name (escape hatch for "I forgot where neostigmine lives").

### Performance

- Target: 30 fps on a mid-range Android phone (e.g. Snapdragon 6-series). Achieved by:
  - Sharing geometries and materials across buildings of the same primitive.
  - One directional light + one ambient. Shadows only on the city scene.
  - Particle smoke / rain pooled and capped per district.
  - Pause render loop when the tab is hidden or canvas is off-screen.
- Aspect-ratio-respecting full-bleed canvas with safe-area insets on mobile.

## Sharing and deployment

The deliverable is one file: `pharma-city.html`, expected ~700 KB-1 MB. It is shared by:

- WhatsApp (file attachment)
- Google Drive / iCloud Drive
- AirDrop
- Email

On the receiving side the file opens by double-tap with no install, no server, no internet.

### Updates

A new version is just a new copy of the file. Re-share to upgrade. There is no auto-update.

## Accuracy and sources

Every drug-fact card carries a `source` field — at minimum the G&G 14e chapter. A "Verify" line is rendered subtly on every flashcard, naming that source, as a deliberate prompt for the user to spot-check the borderline cases against the book before relying on them in exam answers.

For the first version I will:

- Use canonical pharmacology consistent with G&G 14e (mechanisms, classes, ADRs, drugs of choice).
- Flag drugs / facts where the 14th edition specifically diverges from earlier editions (newer biologics, updated drug-of-choice tables) for human verification.
- Not invent drugs, indications, or doses. When uncertain, I omit and flag.

The friends doing the sharing also become the second-pass reviewers — each takes 2-3 districts and cross-reads against G&G during the first revision week.

## Out of scope (v1)

- Spaced-repetition scheduling. (Possible v1.5; the city already has built-in self-test, so SRS is an enhancement, not a blocker.)
- User accounts / sync across devices.
- Live editing inside the app — content is edited by hand in the source file and re-shared.
- Any topic not in the G&G 14e syllabus (e.g. veterinary pharmacology, deep medicinal-chem synthesis routes).
- Animations beyond the pharmacology-mnemonic set above.
- Voice / audio.

## Timeline — ~14 days

Day-numbered, calibrated to two weeks of work starting on the build-start date. Assumes Rahul approves the spec promptly and content review by his friends happens in parallel.

| Day | Work |
|---|---|
| 1 | Lock the content schema. Build the Three.js shell — city scene, one district scene, one flashcard overlay, navigation. Single shareable HTML file packaging works end to end. |
| 2 | Build the **Cholinergic district** all the way through as the gold-standard pattern: 3D street, building primitives, drug cards, walkthrough text, animations, self-test, "verify against G&G" line. Everything else copies this. |
| 3-9 | **Generate content for the other 12 districts**, two or three districts per day, in priority order (highest-yield first): ANS · Adrenergic · CVS · CNS · Chemotherapy · Endocrine · Autacoids/NSAIDs · Renal · Respiratory · GIT · Toxicology · Recent Advances · General Pharmacology. Each district gets the same five components built in Day 2. |
| 10 | **Accuracy pass.** Cross-check every flashcard against G&G 14e, fix discrepancies, flag remaining borderline cases inside the app. |
| 11 | **Consistency pass.** Every district's vibe is internally consistent; every building's memory-hook ties to its place; the city's spatial layout reads logically. |
| 12 | **Performance and mobile pass.** Phone test on iOS Safari and Android Chrome; tune fps; verify offline `file://` opening; verify WhatsApp / Drive / AirDrop sharing. |
| 13 | **Polish.** Loading screen, back-button hit areas, accessibility (screen-reader labels on flashcards), keyboard support. |
| 14 | **Ship.** Final review with Rahul and friends; hand over the file. Buffer day for last-minute fixes. |

## Open questions for v1.5+ (not blocking)

- Whether to add a spaced-repetition schedule that highlights districts due for revision today.
- Whether the city should track per-user "districts I find hardest" and offer a randomized harder-first mode.
- Whether to add a printable PDF "atlas" companion for offline-on-paper revision.

These are not blocking; the v1 hands over a complete, shareable, self-testable city.
