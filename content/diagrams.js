// ── Curated pharmacology diagram library ──────────────────────────────────
// Themeable inline SVGs (axes/labels use currentColor so they read on both the
// light and night themes; a small fixed accent palette highlights key items).
// DIAGRAMS[key] = { title, caption, svg }. DISTRICT_DIAGRAMS maps each district
// id to the diagrams shown for it (flowchart page + main-app Classification panel).
const DIAGRAMS = {
  graded_dr: {
    title: 'Graded dose–response curve',
    caption: 'Response rises sigmoidally with log dose. EC50 = potency (left = more potent); plateau height = efficacy (Emax). Drug A is more potent than B; both reach the same Emax.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Graded dose-response curve">
      <line x1="62" y1="26" x2="62" y2="212" stroke="currentColor" stroke-width="1.4"/>
      <line x1="62" y1="212" x2="418" y2="212" stroke="currentColor" stroke-width="1.4"/>
      <line x1="62" y1="118" x2="250" y2="118" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="0.5"/>
      <line x1="250" y1="212" x2="250" y2="118" stroke="#2e7be0" stroke-width="1" stroke-dasharray="4 4" opacity="0.7"/>
      <path d="M62,208 C150,208 175,202 210,128 C238,66 292,42 418,40" fill="none" stroke="#2e7be0" stroke-width="2.6"/>
      <path d="M120,208 C212,208 238,202 274,128 C302,66 352,46 418,44" fill="none" stroke="#d98c00" stroke-width="2.2" stroke-dasharray="6 4"/>
      <text x="30" y="40" fill="currentColor" font-size="11" font-family="sans-serif">100%</text>
      <text x="38" y="122" fill="currentColor" font-size="11" font-family="sans-serif">50%</text>
      <text x="232" y="228" fill="#2e7be0" font-size="11" font-family="sans-serif">EC50</text>
      <text x="150" y="58" fill="#2e7be0" font-size="12" font-family="sans-serif" font-weight="600">A</text>
      <text x="330" y="74" fill="#d98c00" font-size="12" font-family="sans-serif" font-weight="600">B</text>
      <text x="300" y="34" fill="currentColor" font-size="11" font-family="sans-serif">Emax (efficacy)</text>
      <text x="190" y="244" fill="currentColor" font-size="11" font-family="sans-serif">log [Dose] →</text>
      <text x="14" y="150" fill="currentColor" font-size="11" font-family="sans-serif" transform="rotate(-90 14 150)">Response →</text>
    </svg>`,
  },
  quantal_ti: {
    title: 'Quantal curves & therapeutic index',
    caption: 'Cumulative % of population responding vs log dose. Therapeutic index TI = TD50 / ED50; the wider the gap between the green (therapeutic) and red (lethal) curves, the safer the drug.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Quantal dose-response and therapeutic index">
      <line x1="56" y1="26" x2="56" y2="212" stroke="currentColor" stroke-width="1.4"/>
      <line x1="56" y1="212" x2="420" y2="212" stroke="currentColor" stroke-width="1.4"/>
      <path d="M56,208 C108,208 120,200 142,120 C160,58 196,44 236,42" fill="none" stroke="#14a06a" stroke-width="2.4"/>
      <path d="M150,208 C202,208 214,200 236,120 C254,58 290,44 330,42" fill="none" stroke="#d98c00" stroke-width="2.4"/>
      <path d="M236,208 C288,208 300,200 322,120 C340,58 376,44 416,42" fill="none" stroke="#c0392b" stroke-width="2.4"/>
      <text x="120" y="36" fill="#14a06a" font-size="11" font-family="sans-serif" font-weight="600">ED (effective)</text>
      <text x="226" y="34" fill="#d98c00" font-size="11" font-family="sans-serif" font-weight="600">TD (toxic)</text>
      <text x="330" y="36" fill="#c0392b" font-size="11" font-family="sans-serif" font-weight="600">LD (lethal)</text>
      <line x1="142" y1="120" x2="142" y2="212" stroke="#14a06a" stroke-dasharray="3 3" opacity="0.6"/>
      <line x1="322" y1="120" x2="322" y2="212" stroke="#c0392b" stroke-dasharray="3 3" opacity="0.6"/>
      <text x="126" y="226" fill="#14a06a" font-size="10" font-family="sans-serif">ED50</text>
      <text x="306" y="226" fill="#c0392b" font-size="10" font-family="sans-serif">LD50</text>
      <text x="150" y="246" fill="currentColor" font-size="11" font-family="sans-serif">log [Dose] →</text>
      <text x="14" y="160" fill="currentColor" font-size="11" font-family="sans-serif" transform="rotate(-90 14 160)">% responding →</text>
    </svg>`,
  },
  kinetics_order: {
    title: 'Zero- vs first-order kinetics',
    caption: 'First-order: a constant FRACTION is eliminated per unit time → exponential decay, constant half-life (most drugs). Zero-order: a constant AMOUNT is eliminated → straight-line fall, saturable (ethanol, phenytoin, aspirin in overdose).',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Zero order versus first order elimination">
      <line x1="58" y1="26" x2="58" y2="212" stroke="currentColor" stroke-width="1.4"/>
      <line x1="58" y1="212" x2="420" y2="212" stroke="currentColor" stroke-width="1.4"/>
      <path d="M58,40 C150,150 230,196 410,208" fill="none" stroke="#2e7be0" stroke-width="2.6"/>
      <line x1="58" y1="40" x2="300" y2="208" stroke="#c0392b" stroke-width="2.6"/>
      <text x="250" y="120" fill="#2e7be0" font-size="12" font-family="sans-serif" font-weight="600">first-order (exponential)</text>
      <text x="120" y="100" fill="#c0392b" font-size="12" font-family="sans-serif" font-weight="600">zero-order</text>
      <text x="190" y="244" fill="currentColor" font-size="11" font-family="sans-serif">Time →</text>
      <text x="14" y="170" fill="currentColor" font-size="11" font-family="sans-serif" transform="rotate(-90 14 170)">Plasma conc →</text>
    </svg>`,
  },
  plasma_time: {
    title: 'Plasma concentration–time curve',
    caption: 'Single oral dose. Effect appears once conc crosses the MEC (onset) and lasts until it falls below it (duration); above the MTC = toxicity. The band between MEC and MTC is the therapeutic window; AUC reflects total exposure (bioavailability).',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Plasma concentration time curve">
      <line x1="58" y1="26" x2="58" y2="212" stroke="currentColor" stroke-width="1.4"/>
      <line x1="58" y1="212" x2="420" y2="212" stroke="currentColor" stroke-width="1.4"/>
      <rect x="58" y="78" width="362" height="66" fill="#14a06a" opacity="0.10"/>
      <line x1="58" y1="78" x2="420" y2="78" stroke="#c0392b" stroke-width="1.2" stroke-dasharray="5 4"/>
      <line x1="58" y1="144" x2="420" y2="144" stroke="#14a06a" stroke-width="1.2" stroke-dasharray="5 4"/>
      <path d="M58,210 C110,210 120,70 168,64 C235,56 300,150 416,196" fill="#2e7be0" opacity="0.10"/>
      <path d="M58,210 C110,210 120,70 168,64 C235,56 300,150 416,196" fill="none" stroke="#2e7be0" stroke-width="2.6"/>
      <line x1="168" y1="64" x2="168" y2="212" stroke="currentColor" stroke-dasharray="3 3" opacity="0.5"/>
      <text x="424" y="82" fill="#c0392b" font-size="10" font-family="sans-serif">MTC</text>
      <text x="424" y="148" fill="#14a06a" font-size="10" font-family="sans-serif">MEC</text>
      <text x="150" y="56" fill="#2e7be0" font-size="10" font-family="sans-serif">Cmax</text>
      <text x="150" y="228" fill="currentColor" font-size="10" font-family="sans-serif">Tmax</text>
      <text x="250" y="120" fill="#14a06a" font-size="10" font-family="sans-serif">therapeutic window (AUC)</text>
      <text x="200" y="244" fill="currentColor" font-size="11" font-family="sans-serif">Time →</text>
    </svg>`,
  },
  antagonism: {
    title: 'Competitive vs non-competitive antagonism',
    caption: 'Competitive antagonist → parallel RIGHT shift of the agonist curve, Emax unchanged (surmountable by more agonist). Non-competitive/irreversible → DEPRESSED Emax, not surmountable.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Competitive versus non-competitive antagonism">
      <line x1="58" y1="26" x2="58" y2="212" stroke="currentColor" stroke-width="1.4"/>
      <line x1="58" y1="212" x2="420" y2="212" stroke="currentColor" stroke-width="1.4"/>
      <path d="M58,206 C120,206 140,200 168,120 C190,58 232,44 300,42" fill="none" stroke="currentColor" stroke-width="2.4"/>
      <path d="M150,206 C212,206 232,200 260,120 C282,58 324,44 392,42" fill="none" stroke="#2e7be0" stroke-width="2.4" stroke-dasharray="6 4"/>
      <path d="M58,206 C120,206 140,176 168,150 C190,128 232,120 300,118" fill="none" stroke="#c0392b" stroke-width="2.4" stroke-dasharray="6 4"/>
      <text x="92" y="38" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="600">agonist alone</text>
      <text x="312" y="38" fill="#2e7be0" font-size="11" font-family="sans-serif" font-weight="600">+ competitive</text>
      <text x="250" y="138" fill="#c0392b" font-size="11" font-family="sans-serif" font-weight="600">+ non-competitive</text>
      <text x="170" y="244" fill="currentColor" font-size="11" font-family="sans-serif">log [Agonist] →</text>
      <text x="14" y="150" fill="currentColor" font-size="11" font-family="sans-serif" transform="rotate(-90 14 150)">Response →</text>
    </svg>`,
  },
  cholinergic_synapse: {
    title: 'Cholinergic synapse',
    caption: 'Choline + acetyl-CoA →(ChAT)→ ACh, stored via VAChT, released to act on muscarinic (M) & nicotinic (N) receptors; acetylcholinesterase (AChE) terminates the signal. Anti-AChE drugs raise ACh; antimuscarinics block M; choline reuptake blocked by hemicholinium.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Cholinergic synapse">
      <path d="M40,30 H300 V120 Q300,150 250,150 H40 Z" fill="#2e7be0" opacity="0.07" stroke="currentColor" stroke-width="1.2"/>
      <rect x="40" y="186" width="360" height="44" rx="8" fill="#14a06a" opacity="0.08" stroke="currentColor" stroke-width="1.2"/>
      <text x="52" y="48" fill="currentColor" font-size="11" font-family="sans-serif">Choline + AcCoA</text>
      <text x="120" y="70" fill="#14a06a" font-size="10" font-family="sans-serif">ChAT</text>
      <text x="70" y="92" fill="currentColor" font-size="12" font-family="sans-serif" font-weight="600">ACh</text>
      <circle cx="150" cy="120" r="5" fill="#2e7be0"/><circle cx="178" cy="132" r="5" fill="#2e7be0"/><circle cx="206" cy="124" r="5" fill="#2e7be0"/>
      <line x1="150" y1="125" x2="150" y2="186" stroke="#2e7be0" stroke-width="1" opacity="0.6"/>
      <rect x="120" y="186" width="40" height="10" fill="#14a06a"/><text x="124" y="216" fill="currentColor" font-size="10" font-family="sans-serif">M / N</text>
      <text x="250" y="120" fill="#c0392b" font-size="11" font-family="sans-serif" font-weight="600">AChE</text>
      <text x="250" y="136" fill="currentColor" font-size="9" font-family="sans-serif">→ choline + acetate</text>
      <text x="300" y="208" fill="currentColor" font-size="10" font-family="sans-serif">postsynaptic effector cell</text>
      <text x="44" y="22" fill="currentColor" font-size="10" font-family="sans-serif">cholinergic nerve terminal</text>
    </svg>`,
  },
  adrenergic_synapse: {
    title: 'Adrenergic (noradrenergic) synapse',
    caption: 'Tyrosine → DOPA → dopamine → noradrenaline (stored via VMAT). Released NA acts on α/β receptors; action ends mainly by reuptake (NET, blocked by cocaine/TCAs); MAO & COMT degrade it. Indirect sympathomimetics displace stored NA.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Adrenergic synapse">
      <path d="M40,30 H300 V120 Q300,150 250,150 H40 Z" fill="#e8550a" opacity="0.07" stroke="currentColor" stroke-width="1.2"/>
      <rect x="40" y="186" width="360" height="44" rx="8" fill="#14a06a" opacity="0.08" stroke="currentColor" stroke-width="1.2"/>
      <text x="52" y="48" fill="currentColor" font-size="10" font-family="sans-serif">Tyr → DOPA → DA → NA</text>
      <text x="60" y="70" fill="#d98c00" font-size="10" font-family="sans-serif">VMAT (stores NA)</text>
      <circle cx="150" cy="120" r="5" fill="#e8550a"/><circle cx="178" cy="132" r="5" fill="#e8550a"/><circle cx="206" cy="124" r="5" fill="#e8550a"/>
      <line x1="178" y1="137" x2="178" y2="186" stroke="#e8550a" stroke-width="1" opacity="0.6"/>
      <rect x="158" y="186" width="40" height="10" fill="#14a06a"/><text x="150" y="216" fill="currentColor" font-size="10" font-family="sans-serif">α / β receptors</text>
      <path d="M230,128 C250,150 250,110 232,104" fill="none" stroke="#2e7be0" stroke-width="1.4"/>
      <text x="244" y="120" fill="#2e7be0" font-size="10" font-family="sans-serif">NET reuptake</text>
      <text x="244" y="136" fill="#c0392b" font-size="9" font-family="sans-serif">MAO / COMT</text>
      <text x="44" y="22" fill="currentColor" font-size="10" font-family="sans-serif">sympathetic nerve terminal</text>
    </svg>`,
  },
  nephron: {
    title: 'Nephron — sites of diuretic action',
    caption: 'PCT: carbonic-anhydrase inhibitors. Thick ascending limb: loop diuretics (NKCC2). DCT: thiazides (NCC). Collecting duct: K-sparing (ENaC blockers / aldosterone antagonists); ADH V2 antagonists (vaptans). Osmotic diuretics act along water-permeable segments.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Nephron diuretic sites">
      <path d="M70,30 C70,90 90,110 120,150 C150,190 110,210 150,210" fill="none" stroke="currentColor" stroke-width="3"/>
      <path d="M150,210 C190,210 150,150 175,110 C195,78 210,70 230,40" fill="none" stroke="currentColor" stroke-width="3"/>
      <path d="M230,40 H300 C340,40 340,210 300,210 H280" fill="none" stroke="currentColor" stroke-width="3"/>
      <circle cx="70" cy="36" r="14" fill="none" stroke="currentColor" stroke-width="2"/><text x="40" y="40" fill="currentColor" font-size="10" font-family="sans-serif">glom.</text>
      <circle cx="95" cy="120" r="5" fill="#8b5cf6"/><text x="104" y="118" fill="#8b5cf6" font-size="10" font-family="sans-serif">CA inhibitors (PCT)</text>
      <circle cx="150" cy="200" r="5" fill="#c0392b"/><text x="160" y="204" fill="#c0392b" font-size="10" font-family="sans-serif">loop diuretics (NKCC2)</text>
      <circle cx="200" cy="70" r="5" fill="#2e7be0"/><text x="210" y="68" fill="#2e7be0" font-size="10" font-family="sans-serif">thiazides (DCT, NCC)</text>
      <circle cx="320" cy="120" r="5" fill="#14a06a"/><text x="332" y="118" fill="#14a06a" font-size="10" font-family="sans-serif">K-sparing (ENaC / aldo)</text>
      <text x="332" y="170" fill="#d98c00" font-size="10" font-family="sans-serif">vaptans (ADH V2)</text>
      <text x="240" y="244" fill="currentColor" font-size="10" font-family="sans-serif">collecting duct →</text>
    </svg>`,
  },
  cardiac_ap: {
    title: 'Cardiac action potential & antiarrhythmics',
    caption: 'Phase 0 (Na influx) — Class I; Phase 1 (transient K); Phase 2 plateau (Ca influx) — Class IV at nodes; Phase 3 repolarisation (K efflux) — Class III prolongs it; Phase 4. Class II (β-blockers) act on nodal SA/AV tissue.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Cardiac action potential phases">
      <line x1="50" y1="30" x2="50" y2="210" stroke="currentColor" stroke-width="1.4"/>
      <line x1="50" y1="210" x2="420" y2="210" stroke="currentColor" stroke-width="1.4"/>
      <path d="M50,190 L110,190 L118,46 L138,70 L150,80 L300,86 L330,200 L420,200" fill="none" stroke="#2e7be0" stroke-width="2.6"/>
      <text x="118" y="40" fill="#c0392b" font-size="11" font-family="sans-serif" font-weight="600">0</text>
      <text x="146" y="66" fill="currentColor" font-size="10" font-family="sans-serif">1</text>
      <text x="210" y="78" fill="#d98c00" font-size="11" font-family="sans-serif" font-weight="600">2</text>
      <text x="330" y="150" fill="#14a06a" font-size="11" font-family="sans-serif" font-weight="600">3</text>
      <text x="380" y="200" fill="currentColor" font-size="10" font-family="sans-serif">4</text>
      <text x="120" y="232" fill="#c0392b" font-size="10" font-family="sans-serif">Class I: Na⁺</text>
      <text x="200" y="232" fill="#d98c00" font-size="10" font-family="sans-serif">Class IV: Ca²⁺</text>
      <text x="312" y="232" fill="#14a06a" font-size="10" font-family="sans-serif">Class III: K⁺</text>
      <text x="60" y="44" fill="currentColor" font-size="10" font-family="sans-serif">Class II (β-block) → nodes</text>
    </svg>`,
  },
  raas: {
    title: 'Renin–angiotensin–aldosterone system',
    caption: 'Angiotensinogen →(renin)→ ATI →(ACE)→ ATII → AT1 receptor (vasoconstriction) + aldosterone (Na/water retention). Blocked by: renin inhibitors (aliskiren), ACE inhibitors, ARBs, aldosterone antagonists; ARNI adds neprilysin inhibition.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="RAAS pathway">
      <text x="20" y="50" fill="currentColor" font-size="11" font-family="sans-serif">Angiotensinogen</text>
      <line x1="60" y1="58" x2="60" y2="92" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah)"/>
      <text x="66" y="80" fill="#c0392b" font-size="10" font-family="sans-serif">renin ✕ aliskiren</text>
      <text x="40" y="108" fill="currentColor" font-size="11" font-family="sans-serif">Angiotensin I</text>
      <line x1="60" y1="116" x2="60" y2="150" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah)"/>
      <text x="66" y="138" fill="#c0392b" font-size="10" font-family="sans-serif">ACE ✕ -prils</text>
      <text x="36" y="166" fill="currentColor" font-size="12" font-family="sans-serif" font-weight="600">Angiotensin II</text>
      <line x1="110" y1="162" x2="200" y2="120" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah)"/>
      <line x1="110" y1="170" x2="200" y2="200" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah)"/>
      <text x="206" y="118" fill="currentColor" font-size="11" font-family="sans-serif">AT1 → vasoconstriction</text>
      <text x="206" y="100" fill="#2e7be0" font-size="10" font-family="sans-serif">✕ ARBs (-sartans)</text>
      <text x="206" y="200" fill="currentColor" font-size="11" font-family="sans-serif">Aldosterone → Na⁺/H₂O</text>
      <text x="206" y="218" fill="#14a06a" font-size="10" font-family="sans-serif">✕ spironolactone</text>
      <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
  coagulation: {
    title: 'Coagulation cascade & anticoagulants',
    caption: 'Intrinsic + extrinsic pathways converge on factor X → Xa → thrombin (IIa) → fibrin. Heparin (via antithrombin) inhibits Xa & IIa; LMWH/fondaparinux mainly Xa; warfarin blocks vitamin-K factors II, VII, IX, X; DOACs directly inhibit Xa (-xabans) or IIa (dabigatran); fibrinolytics lyse formed clot.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Coagulation cascade">
      <text x="20" y="44" fill="currentColor" font-size="10" font-family="sans-serif">Intrinsic (XII→XI→IX→VIII)</text>
      <text x="270" y="44" fill="currentColor" font-size="10" font-family="sans-serif">Extrinsic (TF→VII)</text>
      <line x1="110" y1="52" x2="200" y2="92" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah2)"/>
      <line x1="320" y1="52" x2="240" y2="92" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah2)"/>
      <text x="206" y="108" fill="currentColor" font-size="12" font-family="sans-serif" font-weight="600">X → Xa</text>
      <text x="300" y="104" fill="#2e7be0" font-size="10" font-family="sans-serif">✕ -xabans, LMWH</text>
      <line x1="224" y1="116" x2="224" y2="150" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah2)"/>
      <text x="180" y="168" fill="currentColor" font-size="12" font-family="sans-serif" font-weight="600">Prothrombin → Thrombin (IIa)</text>
      <text x="300" y="186" fill="#c0392b" font-size="10" font-family="sans-serif">✕ dabigatran, heparin</text>
      <line x1="224" y1="176" x2="224" y2="206" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah2)"/>
      <text x="196" y="224" fill="currentColor" font-size="12" font-family="sans-serif" font-weight="600">Fibrin clot</text>
      <text x="40" y="120" fill="#14a06a" font-size="10" font-family="sans-serif">warfarin ✕ II, VII, IX, X</text>
      <text x="40" y="200" fill="#d98c00" font-size="10" font-family="sans-serif">fibrinolytics lyse clot</text>
      <defs><marker id="ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
  eicosanoid: {
    title: 'Arachidonic-acid (eicosanoid) pathway',
    caption: 'Membrane phospholipid →(phospholipase A2; blocked by corticosteroids)→ arachidonic acid. COX → prostaglandins & thromboxane (blocked by NSAIDs / coxibs / aspirin). 5-LOX → leukotrienes (zileuton blocks 5-LOX; montelukast/zafirlukast block CysLT1 receptors).',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Arachidonic acid pathway">
      <text x="150" y="36" fill="currentColor" font-size="11" font-family="sans-serif">Membrane phospholipids</text>
      <line x1="220" y1="42" x2="220" y2="74" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah3)"/>
      <text x="226" y="62" fill="#c0392b" font-size="10" font-family="sans-serif">PLA₂ ✕ steroids</text>
      <text x="172" y="92" fill="currentColor" font-size="12" font-family="sans-serif" font-weight="600">Arachidonic acid</text>
      <line x1="200" y1="100" x2="120" y2="140" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah3)"/>
      <line x1="240" y1="100" x2="320" y2="140" stroke="currentColor" stroke-width="1.4" marker-end="url(#ah3)"/>
      <text x="70" y="156" fill="#2e7be0" font-size="11" font-family="sans-serif" font-weight="600">COX</text>
      <text x="40" y="172" fill="#2e7be0" font-size="9" font-family="sans-serif">✕ NSAIDs / coxibs</text>
      <text x="60" y="196" fill="currentColor" font-size="10" font-family="sans-serif">Prostaglandins, TXA₂</text>
      <text x="300" y="156" fill="#14a06a" font-size="11" font-family="sans-serif" font-weight="600">5-LOX</text>
      <text x="284" y="172" fill="#14a06a" font-size="9" font-family="sans-serif">✕ zileuton</text>
      <text x="290" y="196" fill="currentColor" font-size="10" font-family="sans-serif">Leukotrienes</text>
      <text x="276" y="212" fill="#d98c00" font-size="9" font-family="sans-serif">CysLT1 ✕ -lukasts</text>
      <defs><marker id="ah3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
  gaba_a: {
    title: 'GABA-A receptor–chloride channel',
    caption: 'GABA opens the Cl⁻ channel → hyperpolarisation. Benzodiazepines increase the FREQUENCY of channel opening (need GABA); barbiturates increase the DURATION of opening (and open it directly at high dose). Flumazenil blocks the BZD site.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="GABA-A receptor">
      <rect x="150" y="40" width="140" height="170" rx="14" fill="#2e7be0" opacity="0.08" stroke="currentColor" stroke-width="1.4"/>
      <rect x="206" y="40" width="28" height="170" fill="#2e7be0" opacity="0.12"/>
      <text x="196" y="30" fill="currentColor" font-size="10" font-family="sans-serif">Cl⁻ channel</text>
      <line x1="220" y1="48" x2="220" y2="200" stroke="#2e7be0" stroke-width="1" stroke-dasharray="3 4"/>
      <text x="224" y="120" fill="#2e7be0" font-size="11" font-family="sans-serif">Cl⁻ →</text>
      <circle cx="150" cy="80" r="7" fill="#14a06a"/><text x="40" y="84" fill="#14a06a" font-size="10" font-family="sans-serif">GABA site</text>
      <circle cx="150" cy="140" r="7" fill="#d98c00"/><text x="30" y="144" fill="#d98c00" font-size="10" font-family="sans-serif">BZD (↑ frequency)</text>
      <circle cx="290" cy="110" r="7" fill="#8b5cf6"/><text x="300" y="114" fill="#8b5cf6" font-size="10" font-family="sans-serif">barbiturate</text>
      <text x="300" y="130" fill="#8b5cf6" font-size="9" font-family="sans-serif">(↑ duration)</text>
      <text x="30" y="160" fill="#c0392b" font-size="9" font-family="sans-serif">flumazenil ✕ BZD site</text>
    </svg>`,
  },
  gastric_acid: {
    title: 'Gastric parietal cell & acid suppression',
    caption: 'Histamine (H2), gastrin (CCK2) and ACh (M3) stimulate the parietal cell; all converge on the H⁺/K⁺-ATPase (proton pump) that secretes acid. H2 blockers and antimuscarinics act upstream; PPIs irreversibly block the final pump; misoprostol (PGE1) is protective.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Gastric parietal cell">
      <rect x="120" y="40" width="200" height="170" rx="16" fill="#2e7be0" opacity="0.06" stroke="currentColor" stroke-width="1.4"/>
      <text x="150" y="34" fill="currentColor" font-size="10" font-family="sans-serif">parietal cell</text>
      <circle cx="120" cy="70" r="6" fill="#14a06a"/><text x="20" y="74" fill="#14a06a" font-size="10" font-family="sans-serif">Histamine → H2</text>
      <circle cx="120" cy="110" r="6" fill="#d98c00"/><text x="34" y="114" fill="#d98c00" font-size="10" font-family="sans-serif">Gastrin → CCK2</text>
      <circle cx="120" cy="150" r="6" fill="#8b5cf6"/><text x="52" y="154" fill="#8b5cf6" font-size="10" font-family="sans-serif">ACh → M3</text>
      <line x1="126" y1="70" x2="280" y2="120" stroke="currentColor" stroke-width="1" opacity="0.5"/>
      <line x1="126" y1="110" x2="280" y2="124" stroke="currentColor" stroke-width="1" opacity="0.5"/>
      <line x1="126" y1="150" x2="280" y2="128" stroke="currentColor" stroke-width="1" opacity="0.5"/>
      <rect x="280" y="112" width="40" height="30" rx="5" fill="#c0392b" opacity="0.8"/>
      <text x="246" y="160" fill="#c0392b" font-size="10" font-family="sans-serif">H⁺/K⁺-ATPase</text>
      <text x="324" y="128" fill="currentColor" font-size="12" font-family="sans-serif">H⁺ →</text>
      <text x="200" y="200" fill="#c0392b" font-size="10" font-family="sans-serif" font-weight="600">PPIs ✕ pump · H2RAs/antimuscarinics upstream</text>
    </svg>`,
  },
  insulin_secretion: {
    title: 'Pancreatic β-cell insulin secretion',
    caption: 'Glucose enters (GLUT) → ATP rises → closes K-ATP channel → depolarisation → voltage-gated Ca²⁺ influx → insulin release. Sulfonylureas & meglitinides close the K-ATP channel; incretins (GLP-1 agonists, DPP-4 inhibitors) amplify glucose-dependent release.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Insulin secretion from beta cell">
      <rect x="90" y="40" width="240" height="170" rx="18" fill="#d98c00" opacity="0.07" stroke="currentColor" stroke-width="1.4"/>
      <text x="120" y="34" fill="currentColor" font-size="10" font-family="sans-serif">pancreatic β-cell</text>
      <text x="40" y="80" fill="currentColor" font-size="11" font-family="sans-serif">Glucose</text>
      <line x1="86" y1="76" x2="140" y2="84" stroke="currentColor" stroke-width="1.2" marker-end="url(#ah4)"/>
      <text x="120" y="100" fill="currentColor" font-size="10" font-family="sans-serif">↑ ATP</text>
      <text x="120" y="124" fill="#c0392b" font-size="10" font-family="sans-serif">close K-ATP ✕ sulfonylureas</text>
      <text x="120" y="148" fill="currentColor" font-size="10" font-family="sans-serif">depolarise → Ca²⁺ influx</text>
      <circle cx="300" cy="120" r="10" fill="#14a06a"/><text x="250" y="180" fill="#14a06a" font-size="11" font-family="sans-serif" font-weight="600">Insulin release</text>
      <line x1="240" y1="148" x2="290" y2="128" stroke="currentColor" stroke-width="1.2" marker-end="url(#ah4)"/>
      <text x="120" y="200" fill="#2e7be0" font-size="9" font-family="sans-serif">incretins (GLP-1, DPP-4i) amplify</text>
      <defs><marker id="ah4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
  airway: {
    title: 'Airway tone & asthma drugs',
    caption: 'β2 agonists (SABA/LABA) relax bronchial smooth muscle → bronchodilation; muscarinic M3 antagonists (ipratropium/tiotropium) block constriction; methylxanthines also dilate. Inflammation is controlled by ICS, leukotriene modifiers, mast-cell stabilisers and biologics.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Airway tone in asthma">
      <circle cx="150" cy="120" r="64" fill="none" stroke="currentColor" stroke-width="10" opacity="0.35"/>
      <circle cx="150" cy="120" r="30" fill="#2e7be0" opacity="0.10"/>
      <text x="120" y="124" fill="currentColor" font-size="10" font-family="sans-serif">lumen</text>
      <text x="120" y="40" fill="currentColor" font-size="10" font-family="sans-serif">bronchial smooth muscle</text>
      <text x="240" y="80" fill="#14a06a" font-size="11" font-family="sans-serif" font-weight="600">β2 agonists → relax</text>
      <text x="240" y="104" fill="#2e7be0" font-size="11" font-family="sans-serif" font-weight="600">M3 block → relax</text>
      <text x="240" y="128" fill="#d98c00" font-size="11" font-family="sans-serif">methylxanthines</text>
      <text x="240" y="160" fill="#c0392b" font-size="11" font-family="sans-serif" font-weight="600">inflammation:</text>
      <text x="240" y="178" fill="#c0392b" font-size="10" font-family="sans-serif">ICS, LTRA, anti-IgE/IL5</text>
    </svg>`,
  },
  bacterial_targets: {
    title: 'Antibacterial drug targets',
    caption: 'Cell wall: β-lactams, glycopeptides. 30S ribosome: aminoglycosides, tetracyclines. 50S ribosome: macrolides, clindamycin, linezolid. DNA gyrase/topoisomerase: fluoroquinolones. RNA polymerase: rifampicin. Folate synthesis: sulfonamides + trimethoprim.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Antibacterial targets in a bacterial cell">
      <ellipse cx="220" cy="125" rx="170" ry="92" fill="#14a06a" opacity="0.06" stroke="currentColor" stroke-width="2"/>
      <ellipse cx="220" cy="125" rx="170" ry="92" fill="none" stroke="currentColor" stroke-width="6" opacity="0.25"/>
      <text x="150" y="40" fill="#2e7be0" font-size="10" font-family="sans-serif">cell wall: β-lactams, glycopeptides</text>
      <circle cx="160" cy="110" r="6" fill="#d98c00"/><text x="172" y="114" fill="#d98c00" font-size="10" font-family="sans-serif">30S: aminoglycosides, tetracyclines</text>
      <circle cx="160" cy="140" r="6" fill="#8b5cf6"/><text x="172" y="144" fill="#8b5cf6" font-size="10" font-family="sans-serif">50S: macrolides, clindamycin, linezolid</text>
      <circle cx="160" cy="170" r="6" fill="#c0392b"/><text x="172" y="174" fill="#c0392b" font-size="10" font-family="sans-serif">DNA gyrase: fluoroquinolones</text>
      <text x="120" y="196" fill="currentColor" font-size="10" font-family="sans-serif">RNA pol: rifampicin · folate: sulfonamides+TMP</text>
    </svg>`,
  },
  emetic_pathway: {
    title: 'Vomiting reflex & antiemetic targets',
    caption: 'The vomiting centre receives input from the chemoreceptor trigger zone (CTZ — D2, 5-HT3, NK1), the GI tract/vagus (5-HT3), the vestibular apparatus (H1, M) and the cortex. Antiemetics block the matching receptor: 5-HT3 (-setrons), D2 (metoclopramide, prochlorperazine), NK1 (aprepitant), H1/M (cyclizine, hyoscine).',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Vomiting reflex and antiemetic targets">
      <rect x="170" y="100" width="100" height="44" rx="10" fill="#c0392b" opacity="0.12" stroke="currentColor" stroke-width="1.4"/>
      <text x="178" y="126" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="600">Vomiting centre</text>
      <text x="20" y="40" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="600">CTZ</text>
      <text x="20" y="56" fill="#2e7be0" font-size="9" font-family="sans-serif">D2, 5-HT3, NK1</text>
      <line x1="70" y1="48" x2="172" y2="108" stroke="currentColor" stroke-width="1" marker-end="url(#da1)"/>
      <text x="350" y="40" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="600">Vestibular</text>
      <text x="360" y="56" fill="#14a06a" font-size="9" font-family="sans-serif">H1, M</text>
      <line x1="380" y1="48" x2="268" y2="108" stroke="currentColor" stroke-width="1" marker-end="url(#da1)"/>
      <text x="20" y="210" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="600">GI / vagus</text>
      <text x="20" y="226" fill="#d98c00" font-size="9" font-family="sans-serif">5-HT3</text>
      <line x1="80" y1="202" x2="180" y2="142" stroke="currentColor" stroke-width="1" marker-end="url(#da1)"/>
      <text x="330" y="210" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="600">Cortex</text>
      <line x1="360" y1="202" x2="262" y2="142" stroke="currentColor" stroke-width="1" marker-end="url(#da1)"/>
      <text x="150" y="170" fill="currentColor" font-size="9" font-family="sans-serif">→ emesis</text>
      <defs><marker id="da1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
  monoamine_synapse: {
    title: 'Monoamine synapse & antidepressants',
    caption: 'Serotonin/noradrenaline are released, act on postsynaptic receptors, and are removed by reuptake transporters (SERT/NET) and degraded by MAO. SSRIs block SERT; SNRIs block SERT+NET; TCAs block both (plus muscarinic/H1/α1 effects); MAO inhibitors block degradation; mirtazapine blocks presynaptic α2 autoreceptors.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Monoamine synapse and antidepressant targets">
      <path d="M40,30 H300 V120 Q300,150 250,150 H40 Z" fill="#8b5cf6" opacity="0.07" stroke="currentColor" stroke-width="1.2"/>
      <rect x="40" y="186" width="360" height="44" rx="8" fill="#14a06a" opacity="0.08" stroke="currentColor" stroke-width="1.2"/>
      <text x="52" y="48" fill="currentColor" font-size="10" font-family="sans-serif">5-HT / NA vesicles</text>
      <circle cx="150" cy="120" r="5" fill="#8b5cf6"/><circle cx="178" cy="132" r="5" fill="#8b5cf6"/><circle cx="206" cy="124" r="5" fill="#8b5cf6"/>
      <path d="M210,128 C232,150 232,108 214,104" fill="none" stroke="#2e7be0" stroke-width="1.6"/>
      <text x="236" y="118" fill="#2e7be0" font-size="10" font-family="sans-serif">SERT/NET reuptake</text>
      <text x="236" y="133" fill="#2e7be0" font-size="9" font-family="sans-serif">✕ SSRI / SNRI / TCA</text>
      <text x="60" y="70" fill="#c0392b" font-size="9" font-family="sans-serif">MAO ✕ MAOIs</text>
      <text x="60" y="100" fill="#d98c00" font-size="9" font-family="sans-serif">α2 autoreceptor ✕ mirtazapine</text>
      <rect x="150" y="186" width="60" height="10" fill="#14a06a"/><text x="150" y="216" fill="currentColor" font-size="10" font-family="sans-serif">postsynaptic receptors</text>
    </svg>`,
  },
  dopamine_pathways: {
    title: 'Dopamine pathways & antipsychotics',
    caption: 'Four dopaminergic tracts: mesolimbic (D2 blockade → antipsychotic effect on positive symptoms), mesocortical (blockade worsens negative/cognitive symptoms), nigrostriatal (blockade → extrapyramidal side-effects), tuberoinfundibular (blockade → hyperprolactinaemia). Atypicals (5-HT2A/D2) spare the motor pathway more.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Dopaminergic pathways">
      <circle cx="90" cy="130" r="16" fill="#d98c00" opacity="0.25" stroke="currentColor" stroke-width="1.4"/>
      <text x="64" y="160" fill="currentColor" font-size="9" font-family="sans-serif">midbrain</text>
      <line x1="106" y1="124" x2="210" y2="70" stroke="#2e7be0" stroke-width="2" marker-end="url(#dp1)"/>
      <text x="214" y="68" fill="#2e7be0" font-size="10" font-family="sans-serif">Mesolimbic → +symptoms (D2 block helps)</text>
      <line x1="106" y1="130" x2="210" y2="120" stroke="#14a06a" stroke-width="2" marker-end="url(#dp1)"/>
      <text x="214" y="120" fill="#14a06a" font-size="10" font-family="sans-serif">Mesocortical → −symptoms</text>
      <line x1="106" y1="136" x2="210" y2="170" stroke="#c0392b" stroke-width="2" marker-end="url(#dp1)"/>
      <text x="214" y="172" fill="#c0392b" font-size="10" font-family="sans-serif">Nigrostriatal → EPS if blocked</text>
      <line x1="100" y1="146" x2="170" y2="210" stroke="#8b5cf6" stroke-width="2" marker-end="url(#dp1)"/>
      <text x="174" y="214" fill="#8b5cf6" font-size="10" font-family="sans-serif">Tuberoinfundibular → ↑prolactin</text>
      <defs><marker id="dp1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
  aed_targets: {
    title: 'Antiepileptic drug targets',
    caption: 'Seizures arise from excess excitation/deficient inhibition. AEDs act by: blocking voltage-gated Na⁺ channels (phenytoin, carbamazepine, lamotrigine); blocking T-type Ca²⁺ channels (ethosuximide); enhancing GABA (benzodiazepines, barbiturates, vigabatrin, tiagabine); binding SV2A (levetiracetam); or multiple actions (valproate, topiramate).',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Antiepileptic drug mechanisms">
      <rect x="60" y="40" width="320" height="170" rx="16" fill="#2e7be0" opacity="0.05" stroke="currentColor" stroke-width="1.2"/>
      <text x="70" y="34" fill="currentColor" font-size="10" font-family="sans-serif">neuron</text>
      <circle cx="80" cy="80" r="6" fill="#c0392b"/><text x="92" y="84" fill="#c0392b" font-size="10" font-family="sans-serif">Na⁺ channel: phenytoin, carbamazepine, lamotrigine</text>
      <circle cx="80" cy="115" r="6" fill="#d98c00"/><text x="92" y="119" fill="#d98c00" font-size="10" font-family="sans-serif">T-type Ca²⁺: ethosuximide</text>
      <circle cx="80" cy="150" r="6" fill="#14a06a"/><text x="92" y="154" fill="#14a06a" font-size="10" font-family="sans-serif">↑ GABA: BZD, barbiturate, vigabatrin</text>
      <circle cx="80" cy="185" r="6" fill="#8b5cf6"/><text x="92" y="189" fill="#8b5cf6" font-size="10" font-family="sans-serif">SV2A: levetiracetam · broad: valproate, topiramate</text>
    </svg>`,
  },
  hpa_axis: {
    title: 'HPA axis & corticosteroid feedback',
    caption: 'Hypothalamus (CRH) → pituitary (ACTH) → adrenal cortex (cortisol). Cortisol exerts negative feedback on the hypothalamus and pituitary. Exogenous glucocorticoids suppress this axis — abrupt withdrawal after prolonged use risks adrenal insufficiency, so steroids must be tapered.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="HPA axis">
      <rect x="150" y="24" width="140" height="34" rx="8" fill="#2e7be0" opacity="0.10" stroke="currentColor" stroke-width="1.2"/><text x="176" y="46" fill="currentColor" font-size="11" font-family="sans-serif">Hypothalamus</text>
      <line x1="220" y1="58" x2="220" y2="84" stroke="currentColor" stroke-width="1.4" marker-end="url(#hp1)"/><text x="226" y="76" fill="currentColor" font-size="9" font-family="sans-serif">CRH</text>
      <rect x="150" y="86" width="140" height="34" rx="8" fill="#2e7be0" opacity="0.10" stroke="currentColor" stroke-width="1.2"/><text x="186" y="108" fill="currentColor" font-size="11" font-family="sans-serif">Pituitary</text>
      <line x1="220" y1="120" x2="220" y2="146" stroke="currentColor" stroke-width="1.4" marker-end="url(#hp1)"/><text x="226" y="138" fill="currentColor" font-size="9" font-family="sans-serif">ACTH</text>
      <rect x="150" y="148" width="140" height="34" rx="8" fill="#d98c00" opacity="0.12" stroke="currentColor" stroke-width="1.2"/><text x="166" y="170" fill="currentColor" font-size="11" font-family="sans-serif">Adrenal → cortisol</text>
      <path d="M150,165 C70,165 70,41 150,41" fill="none" stroke="#c0392b" stroke-width="1.4" stroke-dasharray="5 4" marker-end="url(#hp1)"/>
      <text x="20" y="105" fill="#c0392b" font-size="9" font-family="sans-serif">− feedback</text>
      <text x="300" y="168" fill="#8b5cf6" font-size="9" font-family="sans-serif">exogenous steroids</text>
      <text x="300" y="182" fill="#8b5cf6" font-size="9" font-family="sans-serif">suppress axis</text>
      <defs><marker id="hp1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
  thyroid_axis: {
    title: 'Thyroid axis & antithyroid drug sites',
    caption: 'Hypothalamus (TRH) → pituitary (TSH) → thyroid synthesises T4/T3 (iodide uptake → organification by thyroperoxidase → coupling). Carbimazole/PTH inhibit thyroperoxidase; PTU also blocks peripheral T4→T3; iodide inhibits release (Wolff–Chaikoff); radioiodine ablates the gland; β-blockers control peripheral symptoms.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Thyroid axis and antithyroid drugs">
      <rect x="40" y="40" width="120" height="30" rx="8" fill="#2e7be0" opacity="0.10" stroke="currentColor" stroke-width="1.2"/><text x="58" y="60" fill="currentColor" font-size="10" font-family="sans-serif">Hypothalamus TRH</text>
      <line x1="100" y1="70" x2="100" y2="96" stroke="currentColor" stroke-width="1.3" marker-end="url(#ty1)"/>
      <rect x="40" y="98" width="120" height="30" rx="8" fill="#2e7be0" opacity="0.10" stroke="currentColor" stroke-width="1.2"/><text x="60" y="118" fill="currentColor" font-size="10" font-family="sans-serif">Pituitary TSH</text>
      <line x1="160" y1="113" x2="220" y2="113" stroke="currentColor" stroke-width="1.3" marker-end="url(#ty1)"/>
      <rect x="222" y="92" width="150" height="44" rx="8" fill="#d98c00" opacity="0.12" stroke="currentColor" stroke-width="1.2"/><text x="232" y="112" fill="currentColor" font-size="10" font-family="sans-serif">Thyroid: I⁻ uptake →</text><text x="232" y="126" fill="currentColor" font-size="10" font-family="sans-serif">TPO → T4 / T3</text>
      <text x="222" y="160" fill="#c0392b" font-size="9" font-family="sans-serif">✕ TPO: carbimazole, PTU</text>
      <text x="222" y="174" fill="#14a06a" font-size="9" font-family="sans-serif">iodide ✕ release · ¹³¹I ablates</text>
      <text x="222" y="188" fill="#8b5cf6" font-size="9" font-family="sans-serif">PTU ✕ peripheral T4→T3</text>
      <defs><marker id="ty1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
  insulin_timeaction: {
    title: 'Insulin preparations — time-action profiles',
    caption: 'Onset/peak/duration distinguish insulins: rapid-acting (lispro/aspart/glulisine) — onset ~15 min, peak ~1 h; short (regular) — ~30 min, peak 2–3 h; intermediate (NPH) — peak 4–10 h; long-acting (glargine/detemir/degludec) — flat, peakless, ~24 h. Used to mimic basal–bolus physiology.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Insulin time action curves">
      <line x1="50" y1="26" x2="50" y2="200" stroke="currentColor" stroke-width="1.4"/>
      <line x1="50" y1="200" x2="420" y2="200" stroke="currentColor" stroke-width="1.4"/>
      <path d="M50,200 C70,200 80,60 110,70 C150,84 190,200 240,200" fill="none" stroke="#c0392b" stroke-width="2.2"/>
      <path d="M50,200 C90,200 110,96 150,100 C210,108 250,200 320,200" fill="none" stroke="#2e7be0" stroke-width="2.2"/>
      <path d="M50,200 C120,200 150,120 200,124 C280,132 330,196 410,198" fill="none" stroke="#d98c00" stroke-width="2.2"/>
      <path d="M50,150 C160,146 280,150 410,150" fill="none" stroke="#14a06a" stroke-width="2.2" stroke-dasharray="7 4"/>
      <text x="112" y="58" fill="#c0392b" font-size="10" font-family="sans-serif">rapid</text>
      <text x="160" y="90" fill="#2e7be0" font-size="10" font-family="sans-serif">short (regular)</text>
      <text x="210" y="116" fill="#d98c00" font-size="10" font-family="sans-serif">NPH</text>
      <text x="300" y="142" fill="#14a06a" font-size="10" font-family="sans-serif">long-acting (peakless)</text>
      <text x="200" y="222" fill="currentColor" font-size="11" font-family="sans-serif">Time (h) →</text>
      <text x="14" y="150" fill="currentColor" font-size="11" font-family="sans-serif" transform="rotate(-90 14 150)">Insulin effect →</text>
    </svg>`,
  },
  cell_cycle: {
    title: 'Cell cycle & anticancer drug action',
    caption: 'Cell-cycle-specific agents hit a phase: antimetabolites (methotrexate, 5-FU, cytarabine) act in S phase; vinca alkaloids & taxanes block M phase (mitotic spindle); bleomycin/etoposide in G2. Cell-cycle-NON-specific agents (alkylating agents, cisplatin, anthracyclines) act in all phases including G0.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Cell cycle and anticancer drugs">
      <circle cx="180" cy="125" r="80" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="168" y="40" fill="currentColor" font-size="12" font-family="sans-serif" font-weight="600">M</text>
      <text x="252" y="130" fill="currentColor" font-size="12" font-family="sans-serif" font-weight="600">G1</text>
      <text x="168" y="216" fill="currentColor" font-size="12" font-family="sans-serif" font-weight="600">S</text>
      <text x="92" y="130" fill="currentColor" font-size="12" font-family="sans-serif" font-weight="600">G2</text>
      <text x="270" y="55" fill="#2e7be0" font-size="10" font-family="sans-serif">M: vinca, taxanes</text>
      <text x="270" y="205" fill="#14a06a" font-size="10" font-family="sans-serif">S: MTX, 5-FU, cytarabine</text>
      <text x="270" y="150" fill="#d98c00" font-size="10" font-family="sans-serif">G2: bleomycin, etoposide</text>
      <text x="40" y="232" fill="#c0392b" font-size="10" font-family="sans-serif">cycle-non-specific (all phases): alkylators, cisplatin, anthracyclines</text>
    </svg>`,
  },
  hiv_cycle: {
    title: 'HIV replication cycle & ART targets',
    caption: 'Entry (CCR5 antagonists, fusion inhibitors) → reverse transcription (NRTIs, NNRTIs) → integration (integrase inhibitors, -tegravirs) → transcription/translation → protease cleaves polyprotein (protease inhibitors) → budding/maturation. Combination ART (≥3 drugs, ≥2 classes) prevents resistance.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="HIV replication cycle and antiretroviral targets">
      <text x="20" y="44" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="600">Entry / fusion</text>
      <text x="20" y="58" fill="#2e7be0" font-size="9" font-family="sans-serif">✕ maraviroc, enfuvirtide</text>
      <line x1="80" y1="66" x2="80" y2="86" stroke="currentColor" stroke-width="1.3" marker-end="url(#hv1)"/>
      <text x="20" y="100" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="600">Reverse transcription</text>
      <text x="20" y="114" fill="#14a06a" font-size="9" font-family="sans-serif">✕ NRTIs, NNRTIs</text>
      <line x1="80" y1="122" x2="80" y2="142" stroke="currentColor" stroke-width="1.3" marker-end="url(#hv1)"/>
      <text x="20" y="156" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="600">Integration</text>
      <text x="20" y="170" fill="#d98c00" font-size="9" font-family="sans-serif">✕ integrase inhib (-tegravirs)</text>
      <line x1="80" y1="178" x2="80" y2="198" stroke="currentColor" stroke-width="1.3" marker-end="url(#hv1)"/>
      <text x="20" y="212" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="600">Maturation (protease)</text>
      <text x="20" y="226" fill="#c0392b" font-size="9" font-family="sans-serif">✕ protease inhib (-navirs)</text>
      <text x="250" y="120" fill="currentColor" font-size="10" font-family="sans-serif">Combination ART</text>
      <text x="250" y="136" fill="currentColor" font-size="9" font-family="sans-serif">≥3 drugs, ≥2 classes</text>
      <defs><marker id="hv1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
  antidote_map: {
    title: 'Key poison → antidote pairs',
    caption: 'Specific antidotes: paracetamol → N-acetylcysteine; opioids → naloxone; benzodiazepines → flumazenil; organophosphates → atropine + pralidoxime; warfarin → vitamin K; heparin → protamine; iron → desferrioxamine; methanol/ethylene glycol → fomepizole; digoxin → digoxin-specific Fab; β-blockers → glucagon; cyanide → hydroxocobalamin.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Poison antidote pairs">
      <text x="40" y="34" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="700">Poison</text>
      <text x="300" y="34" fill="currentColor" font-size="11" font-family="sans-serif" font-weight="700">Antidote</text>
      <g font-size="10.5" font-family="sans-serif">
        <text x="40" y="58" fill="currentColor">Paracetamol</text><text x="240" y="58" fill="#14a06a">→ N-acetylcysteine</text>
        <text x="40" y="78" fill="currentColor">Opioids</text><text x="240" y="78" fill="#14a06a">→ Naloxone</text>
        <text x="40" y="98" fill="currentColor">Benzodiazepines</text><text x="240" y="98" fill="#14a06a">→ Flumazenil</text>
        <text x="40" y="118" fill="currentColor">Organophosphate</text><text x="240" y="118" fill="#14a06a">→ Atropine + pralidoxime</text>
        <text x="40" y="138" fill="currentColor">Warfarin</text><text x="240" y="138" fill="#14a06a">→ Vitamin K</text>
        <text x="40" y="158" fill="currentColor">Iron</text><text x="240" y="158" fill="#14a06a">→ Desferrioxamine</text>
        <text x="40" y="178" fill="currentColor">Methanol / ethylene glycol</text><text x="240" y="178" fill="#14a06a">→ Fomepizole</text>
        <text x="40" y="198" fill="currentColor">Digoxin</text><text x="240" y="198" fill="#14a06a">→ Digoxin-specific Fab</text>
        <text x="40" y="218" fill="currentColor">Cyanide</text><text x="240" y="218" fill="#14a06a">→ Hydroxocobalamin</text>
      </g>
    </svg>`,
  },
  drug_modalities: {
    title: 'Therapeutic modalities — small molecules to gene therapy',
    caption: 'The spectrum of modern drug classes: small molecules → peptides → monoclonal antibodies → antibody–drug conjugates (ADCs) → bispecifics/BiTEs → CAR-T cell therapy → RNA therapeutics (siRNA, ASO, mRNA vaccines) → gene therapy (AAV) & CRISPR gene editing. Each step adds specificity and target scope.',
    svg: `<svg viewBox="0 0 440 250" role="img" aria-label="Spectrum of therapeutic modalities">
      <line x1="40" y1="210" x2="410" y2="60" stroke="currentColor" stroke-width="1.4" marker-end="url(#dm1)"/>
      <g font-size="10" font-family="sans-serif">
        <circle cx="60" cy="200" r="4" fill="#2e7be0"/><text x="70" y="204" fill="currentColor">Small molecules</text>
        <circle cx="120" cy="176" r="4" fill="#2e7be0"/><text x="130" y="180" fill="currentColor">Peptides / biologics</text>
        <circle cx="180" cy="152" r="4" fill="#14a06a"/><text x="190" y="156" fill="currentColor">Monoclonal antibodies</text>
        <circle cx="230" cy="132" r="4" fill="#14a06a"/><text x="240" y="136" fill="currentColor">ADCs · bispecifics / BiTEs</text>
        <circle cx="290" cy="108" r="4" fill="#d98c00"/><text x="300" y="112" fill="currentColor">CAR-T cells</text>
        <circle cx="330" cy="92" r="4" fill="#8b5cf6"/><text x="250" y="92" fill="currentColor">RNA: siRNA, ASO, mRNA</text>
        <circle cx="392" cy="66" r="4" fill="#c0392b"/><text x="250" y="70" fill="currentColor">Gene therapy / CRISPR</text>
      </g>
      <text x="40" y="232" fill="currentColor" font-size="9" font-family="sans-serif">increasing specificity & target scope →</text>
      <defs><marker id="dm1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
    </svg>`,
  },
};

const DISTRICT_DIAGRAMS = {
  general_pharmacology: ['graded_dr', 'quantal_ti', 'antagonism', 'kinetics_order', 'plasma_time'],
  ans_hub: ['cholinergic_synapse'],
  cholinergic: ['cholinergic_synapse'],
  adrenergic: ['adrenergic_synapse'],
  cvs: ['cardiac_ap', 'raas', 'coagulation'],
  respiratory: ['airway'],
  git: ['gastric_acid', 'emetic_pathway'],
  renal: ['nephron'],
  autacoids: ['eicosanoid'],
  cns: ['gaba_a', 'monoamine_synapse', 'dopamine_pathways', 'aed_targets'],
  endocrine: ['insulin_secretion', 'insulin_timeaction', 'hpa_axis', 'thyroid_axis'],
  chemotherapy: ['bacterial_targets', 'cell_cycle', 'hiv_cycle'],
  toxicology: ['antidote_map'],
  recent_advances: ['drug_modalities'],
};

if (typeof window !== 'undefined') {
  window.DIAGRAMS = DIAGRAMS;
  window.DISTRICT_DIAGRAMS = DISTRICT_DIAGRAMS;
}
