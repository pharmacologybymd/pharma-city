const DISTRICT_RENAL = {
  id: 'renal',
  name: 'Renal',
  theme_line: 'Waterworks · the city\'s plumbing',
  walkthrough: `The Renal district is the city's great filtration plant — an industrial waterworks where every pipe, pump, and pressure valve corresponds to a segment of the nephron. Enormous water towers mark the skyline, each labelled with the transport protein that drives sodium, chloride, or potassium into or out of the tubular lumen. The loop of Henle runs as a deep underground aqueduct beneath the central plaza, and it is here that the mightiest pumps roar: the loop diuretics clamp down on the NKCC2 co-transporter, shutting off the countercurrent multiplier and flooding the collecting duct with a torrent of dilute urine.

Upstream in the proximal convoluted tubule stands the acetazolamide pump-house, where carbonic anhydrase churns out bicarbonate in exchange for sodium. When the enzyme is blocked, bicarbonate floods the urine and the body acidifies — a useful trick for glaucoma and altitude sickness, though at the cost of kidney stones and paraesthesias.

At the end of the nephron, in the quiet back alleys of the collecting duct, the aldosterone-sensitive principal cells run the district's finest-grained controls. Spironolactone and eplerenone bar the aldosterone receptor from its nuclear office; amiloride and triamterene block the epithelial sodium channel at the luminal membrane. Both strategies conserve potassium at the expense of sodium and water. And towering over everything is the mannitol reservoir: a massive osmotic tank that drags fluid into the tubule from every compartment — useful for raised intracranial pressure, dangerous when the drain is blocked or the heart is failing.`,
  palette: { ground: 0x9EC8E8, accent: 0x1A6FA8, water: 0x378ADD },
  position: { x: -25, z: 25 },
  classification: {
    sources: [
      {
        label: 'G&G 14e',
        cite: 'ch. 25–26',
        groups: [
          { heading: 'A. High-ceiling (loop) diuretics', drugs: ['Furosemide', 'Bumetanide', 'Torsemide', 'Ethacrynic acid'] },
          { heading: 'B. Thiazide & thiazide-like diuretics', drugs: ['Hydrochlorothiazide', 'Chlortalidone', 'Indapamide', 'Metolazone'] },
          { heading: 'C. Potassium-sparing diuretics', groups: [
            { heading: 'Aldosterone (mineralocorticoid) receptor antagonists', drugs: ['Spironolactone', 'Eplerenone', 'Canrenone'] },
            { heading: 'Epithelial Na-channel (ENaC) blockers', drugs: ['Amiloride', 'Triamterene'] },
          ]},
          { heading: 'D. Osmotic diuretics', drugs: ['Mannitol', 'Glycerol', 'Isosorbide', 'Urea'] },
          { heading: 'E. Carbonic anhydrase inhibitors', drugs: ['Acetazolamide', 'Dorzolamide', 'Brinzolamide'] },
          { heading: 'F. Vasopressin (ADH) V2 antagonists / aquaretics', drugs: ['Tolvaptan', 'Conivaptan', 'Demeclocycline'] },
        ],
      },
      {
        label: 'KDT 8e/9e',
        cite: 'ch. 41–42',
        groups: [
          { heading: 'A. High-ceiling (loop) diuretics', drugs: ['Furosemide', 'Bumetanide', 'Torsemide', 'Ethacrynic acid'] },
          { heading: 'B. Thiazide & thiazide-like diuretics', drugs: ['Hydrochlorothiazide', 'Chlortalidone', 'Indapamide', 'Metolazone'] },
          { heading: 'C. Potassium-sparing diuretics', groups: [
            { heading: 'Aldosterone antagonists', drugs: ['Spironolactone', 'Eplerenone', 'Canrenone'] },
            { heading: 'Epithelial Na-channel (ENaC) blockers / inhibitors of renal Na channel', drugs: ['Amiloride', 'Triamterene'] },
          ]},
          { heading: 'D. Osmotic diuretics', drugs: ['Mannitol', 'Glycerol', 'Isosorbide', 'Urea'] },
          { heading: 'E. Carbonic anhydrase inhibitors', drugs: ['Acetazolamide', 'Dorzolamide', 'Brinzolamide'] },
          { heading: 'F. Vasopressin (ADH) V2 antagonists / aquaretics', drugs: ['Tolvaptan', 'Conivaptan', 'Demeclocycline'] },
          { heading: 'G. Antidiuretics', drugs: ['Antidiuretic hormone (vasopressin)', 'Desmopressin', 'Thiazides (in diabetes insipidus)'] },
        ],
      },
    ],
  },
  drugs: [
    {
      id: 'furosemide',
      district: 'renal',
      building: 'the thundering loop-pump house at the base of the Henle aqueduct',
      class: 'Loop diuretic; NKCC2 inhibitor',
      mechanism: 'Inhibits the Na-K-2Cl co-transporter (NKCC2) in the thick ascending limb of the loop of Henle. This abolishes the countercurrent multiplier, preventing concentration of the medullary interstitium and producing a large-volume, isotonic diuresis. Also inhibits tubuloglomerular feedback by blocking NKCC2 in the macula densa, preserving GFR even in low-flow states. Bioavailability variable with oral administration; onset rapid with IV.',
      adverse_effects: 'Hypokalaemia (most common electrolyte disturbance); metabolic alkalosis (contraction alkalosis from volume depletion plus hypokalaemia); ototoxicity — sensorineural hearing loss especially with rapid IV infusion or concurrent aminoglycoside use; hyperuricaemia (competes with urate for proximal tubular secretion); hypomagnesaemia; hypocalcaemia; volume depletion and hypotension. Sulfonamide structure — cross-reactivity in sulfa allergy is possible.',
      clinical_use: 'Acute pulmonary oedema (IV for rapid diuresis); chronic heart failure; hypertension resistant to thiazides; cirrhotic ascites; hypercalcaemia; acute kidney injury oliguria; hypertensive urgency. Preferred diuretic when GFR is significantly reduced (thiazides ineffective below ~30 mL/min).',
      memory_hook: 'Furosemide is the fire-hose of diuretics — it blasts the loop pump and floods the collecting duct. With great power comes great potassium loss.',
      source: 'G&G 14e, ch. 25',
      high_yield: true,
    },
    {
      id: 'bumetanide',
      district: 'renal',
      building: 'the secondary loop-pump station on the east bank of the Henle aqueduct',
      class: 'Loop diuretic; NKCC2 inhibitor',
      mechanism: 'Same mechanism as furosemide — inhibits NKCC2 in the thick ascending limb. More potent on a weight basis than furosemide. Oral bioavailability is higher and more consistent than furosemide (nearly complete absorption). Shorter duration of action than furosemide.',
      adverse_effects: 'Hypokalaemia; metabolic alkalosis; ototoxicity (less than furosemide at equivalent doses); hyperuricaemia; hypomagnesaemia; volume depletion. Also a sulfonamide structure — sulfa allergy cross-reactivity risk.',
      clinical_use: 'Alternative to furosemide in oedematous states (heart failure, cirrhosis, nephrotic syndrome); may be preferred in patients with poor oral furosemide absorption due to gut oedema in severe heart failure.',
      memory_hook: 'Bumetanide is furosemide\'s more bioavailable sibling — same pump, different wrapping, and the packet opens more reliably in a waterlogged gut.',
      source: 'G&G 14e, ch. 25',
      high_yield: true,
    },
    {
      id: 'torsemide',
      district: 'renal',
      building: 'the long-cycle pump tower with the slow-draining reservoir',
      class: 'Loop diuretic; NKCC2 inhibitor',
      mechanism: 'Inhibits NKCC2 in the thick ascending limb of the loop of Henle, identical mechanism to furosemide and bumetanide. Longer half-life than furosemide (~3–4 hours versus ~2 hours) and near-complete, consistent oral bioavailability. The extended duration may produce a more predictable diuretic response.',
      adverse_effects: 'Hypokalaemia; metabolic alkalosis; hyperuricaemia; hypomagnesaemia; volume depletion; ototoxicity (rare); sulfonamide structure.',
      clinical_use: 'Heart failure (some evidence of reduced hospitalisation versus furosemide due to consistent bioavailability); oedematous states; hypertension. More predictable oral absorption may be advantageous in patients with bowel oedema.',
      memory_hook: 'Torsemide fills the reservoir slowly and steadily — its longer half-life smooths out the peaks and troughs of furosemide\'s more erratic flood cycle.',
      source: 'G&G 14e, ch. 25',
      high_yield: false,
    },
    {
      id: 'hydrochlorothiazide',
      district: 'renal',
      building: 'the distal tubule filtration station with the calcium sluice gate',
      class: 'Thiazide diuretic; NCC inhibitor',
      mechanism: 'Inhibits the Na-Cl co-transporter (NCC) in the distal convoluted tubule. Produces a moderate natriuresis. Increases calcium reabsorption in the distal tubule (opposite to loop diuretics) via stimulation of luminal calcium channels and basolateral Na-Ca exchanger — useful in hypercalciuria and stone prevention. Requires adequate GFR to be effective (typically needs GFR > 30 mL/min).',
      adverse_effects: 'Hypokalaemia (most important); metabolic alkalosis; hyperuricaemia; hyperglycaemia (impairs insulin secretion and peripheral glucose uptake); hypercalcaemia; hyponatraemia — particularly dangerous in the elderly, who can develop severe symptomatic hyponatraemia; hypomagnesaemia; hypercholesterolaemia. CI: thiazides significantly raise lithium levels (reduce renal lithium clearance) → lithium toxicity.',
      clinical_use: 'Hypertension (first-line, especially in uncomplicated cases, Black patients, elderly); oedema in mild heart failure and cirrhosis; calcium oxalate nephrolithiasis (reduces urinary calcium); nephrogenic diabetes insipidus (paradoxical antidiuretic effect); osteoporosis prevention.',
      memory_hook: 'Thiazides keep calcium in and potassium out — they seal the calcium gate tight while the potassium gate flaps open. And they lock lithium inside the city walls.',
      source: 'G&G 14e, ch. 25',
      high_yield: true,
    },
    {
      id: 'chlortalidone',
      district: 'renal',
      building: 'the long-duration distal pipe control tower on the west ring road',
      class: 'Thiazide-like diuretic; NCC inhibitor',
      mechanism: 'Inhibits the Na-Cl co-transporter in the distal convoluted tubule, same mechanism as thiazides. Unlike hydrochlorothiazide, chlortalidone has a very long half-life (~40–60 hours) and accumulates in erythrocytes, providing sustained NCC inhibition. Produces a more consistent 24-hour blood pressure reduction. Increases calcium reabsorption similarly to thiazides.',
      adverse_effects: 'Hypokalaemia; metabolic alkalosis; hyperuricaemia; hyperglycaemia; hypercalcaemia; hyponatraemia; hypomagnesaemia. Long half-life means adverse effects persist longer if they occur.',
      clinical_use: 'Hypertension — preferred over hydrochlorothiazide for blood pressure management in several guidelines due to longer duration and evidence of superior cardiovascular outcomes (ALLHAT trial); oedema; calcium nephrolithiasis; heart failure prevention.',
      memory_hook: 'Chlortalidone is the marathon runner of thiazides — it stays on the course all day while HCTZ sprints and fades by afternoon.',
      source: 'G&G 14e, ch. 25',
      high_yield: true,
    },
    {
      id: 'spironolactone',
      district: 'renal',
      building: 'the aldosterone receptor bureau in the principal-cell alley',
      class: 'Potassium-sparing diuretic; competitive aldosterone antagonist',
      mechanism: 'Competitively blocks the mineralocorticoid (aldosterone) receptor in the principal cells of the collecting duct and connecting tubule. Aldosterone normally increases ENaC expression on the luminal membrane and Na-K-ATPase on the basolateral membrane, promoting sodium retention and potassium secretion. Spironolactone prevents these genomic effects → natriuresis without potassium loss. Also binds androgen and progesterone receptors → anti-androgen and progestagenic side effects.',
      adverse_effects: 'Hyperkalaemia (most dangerous — life-threatening if combined with ACE inhibitors, ARBs, or potassium supplements); gynaecomastia (anti-androgen effect, can be painful); menstrual irregularities; decreased libido; metabolic acidosis (mild); drowsiness. CI: ACEi/ARB combination greatly increases hyperkalaemia risk — potentially fatal.',
      clinical_use: 'Heart failure with reduced ejection fraction (reduces mortality in combination with ACEi/ARB — RALES trial); cirrhotic ascites (first-line diuretic); primary hyperaldosteronism (diagnosis and treatment); hypertension; polycystic ovary syndrome (anti-androgen); acne.',
      memory_hook: 'Spironolactone locks the aldosterone bureau office — without that key, sodium leaves and potassium stays. But its anti-androgen master key also opens the gynaecomastia side-door.',
      source: 'G&G 14e, ch. 25',
      high_yield: true,
    },
    {
      id: 'eplerenone',
      district: 'renal',
      building: 'the selective aldosterone sub-bureau with the sealed androgen wing',
      class: 'Potassium-sparing diuretic; selective mineralocorticoid receptor antagonist',
      mechanism: 'Selective competitive antagonist of the mineralocorticoid receptor. Unlike spironolactone, eplerenone has negligible affinity for androgen, progesterone, or glucocorticoid receptors. This selectivity eliminates the sex-hormone-related side effects seen with spironolactone. Same mechanism of action at the principal cell — prevents aldosterone-mediated sodium retention and potassium wasting.',
      adverse_effects: 'Hyperkalaemia (same concern as spironolactone — avoid with ACEi/ARB combination or in renal impairment); metabolic acidosis (mild). Negligible gynaecomastia or hormonal side effects. More expensive than spironolactone.',
      clinical_use: 'Heart failure with reduced ejection fraction post-myocardial infarction (EPHESUS trial); hypertension with evidence of end-organ damage; used when spironolactone causes intolerable hormonal side effects (especially gynaecomastia in men).',
      memory_hook: 'Eplerenone keeps the androgen wing locked up tight — it blocks aldosterone\'s office just like spironolactone but never touches the hormone filing cabinet next door.',
      source: 'G&G 14e, ch. 25',
      high_yield: true,
    },
    {
      id: 'amiloride',
      district: 'renal',
      building: 'the epithelial sodium channel blockade gate in the collecting duct alley',
      class: 'Potassium-sparing diuretic; ENaC (epithelial Na channel) blocker',
      mechanism: 'Directly blocks the epithelial sodium channel (ENaC) on the luminal membrane of principal cells in the collecting duct and connecting tubule. Works independently of aldosterone. Reducing sodium entry via ENaC lowers the electrochemical gradient driving potassium secretion through ROMK channels → potassium retention. Weak diuretic used mainly to offset potassium wasting from loop or thiazide diuretics.',
      adverse_effects: 'Hyperkalaemia (especially in renal impairment, diabetes, or when combined with other K-sparing agents, ACEi, ARBs, or NSAIDs); mild metabolic acidosis; nausea; hyperchloraemic metabolic acidosis.',
      clinical_use: 'Combination with thiazide or loop diuretics to prevent hypokalaemia; Liddle syndrome (gain-of-function ENaC mutation — amiloride is the specific treatment); hypertension; oedema. Also used in cystic fibrosis (nebulised, to block ENaC in airways — though limited clinical evidence).',
      memory_hook: 'Amiloride plugs the ENaC gate directly — no need for aldosterone to leave its office, the channel is simply corked from the inside.',
      source: 'G&G 14e, ch. 25',
      high_yield: true,
    },
    {
      id: 'triamterene',
      district: 'renal',
      building: 'the stone-collecting ENaC gate on the collecting duct side alley',
      class: 'Potassium-sparing diuretic; ENaC blocker',
      mechanism: 'Directly blocks ENaC on the luminal membrane of collecting duct principal cells, same mechanism as amiloride. Aldosterone-independent. A weak diuretic; used mainly for potassium conservation. Metabolised in the liver to active metabolites; renally excreted metabolites can crystallise in the tubule.',
      adverse_effects: 'Hyperkalaemia; renal stones (triamterene crystals in the tubule — distinctive in urinalysis); mild metabolic acidosis; nausea; elevation of serum creatinine (competes with creatinine for tubular secretion); photosensitivity.',
      clinical_use: 'Hypokalaemia prevention when combined with thiazide diuretics (often co-formulated with hydrochlorothiazide); mild hypertension as add-on therapy. Use with caution in renal impairment due to stone and crystal risk.',
      memory_hook: 'Triamterene seals the same ENaC gate as amiloride, but its exhaust sometimes crystallises in the plumbing — kidney stones left behind like gravel in the pipes.',
      source: 'G&G 14e, ch. 25',
      high_yield: false,
    },
    {
      id: 'mannitol',
      district: 'renal',
      building: 'the osmotic pressure tank towering over the city water system',
      class: 'Osmotic diuretic',
      mechanism: 'Freely filtered at the glomerulus but not reabsorbed by the tubule. Raises tubular osmolarity, drawing water osmotically into the tubular lumen and inhibiting passive water reabsorption in the proximal tubule and loop of Henle. Also pulls water from the intracellular compartment into the plasma and then into the tubule. In the brain, the osmotic gradient reduces cerebral oedema by drawing water out of brain tissue into the blood.',
      adverse_effects: 'Initial volume expansion (mannitol pulls fluid from tissues into the vascular compartment before diuresis begins) → dangerous in heart failure and pulmonary oedema — can precipitate pulmonary oedema; hyponatraemia (dilutional); hypernatraemia (with subsequent water loss); rebound increased ICP if blood-brain barrier disrupted. CI: anuric patients (no diuresis, fluid accumulates → pulmonary oedema); severe heart failure; severe pulmonary congestion.',
      clinical_use: 'Raised intracranial pressure (cerebral oedema, head injury, hepatic encephalopathy); raised intraocular pressure (acute angle-closure glaucoma — emergency reduction); prevention of acute tubular necrosis in rhabdomyolysis or cisplatin therapy; bowel prep.',
      memory_hook: 'Mannitol is the city\'s osmotic pump — it pulls water from every building into the main water tower before flushing it all out. But if the city drains are blocked (anuria) or the pipes are old (heart failure), the flood has nowhere to go.',
      source: 'G&G 14e, ch. 25',
      high_yield: true,
    },
    {
      id: 'acetazolamide',
      district: 'renal',
      building: 'the carbonic anhydrase pump-house at the proximal tubule head works',
      class: 'Carbonic anhydrase inhibitor; weak diuretic',
      mechanism: 'Inhibits carbonic anhydrase (CA II in cytoplasm, CA IV on luminal membrane) in the proximal convoluted tubule. Normally CA catalyses the hydration of CO2 to H2CO3, which dissociates to H+ and HCO3−; H+ is secreted into the lumen to exchange for Na+ (NHE3), driving sodium and water reabsorption. Blocking CA → HCO3− and Na+ remain in the lumen → NaHCO3 diuresis → systemic metabolic acidosis. Also inhibits CA in the eye (reduces aqueous humour production) and erythrocytes/CSF choroid plexus.',
      adverse_effects: 'Metabolic acidosis (NaHCO3 loss — limits long-term use); hypokalaemia; kidney stones (alkaline urine and reduced citrate excretion promote calcium phosphate stones); paraesthesias (tingling in extremities and face — very common); drowsiness; teratogenicity (avoid in pregnancy); sulfonamide structure (allergy risk).',
      clinical_use: 'Glaucoma (reduces aqueous humour production — often first-line with topical formulation); altitude sickness/acute mountain sickness prophylaxis and treatment (alkalises urine → stimulates ventilation → counters altitude hypocapnia); periodic paralysis (hypokalaemic and hyperkalaemic); idiopathic intracranial hypertension; some epilepsy syndromes (adjunct).',
      memory_hook: 'Acetazolamide silences the carbonic anhydrase factory in the proximal pump-house — bicarbonate floods out in the urine and the city\'s blood acid level rises. The silver lining: the eye\'s aqueous factory shuts down too.',
      source: 'G&G 14e, ch. 25',
      high_yield: true,
    },
    {
      id: 'tolvaptan',
      district: 'renal',
      building: 'the V2 vasopressin receptor control room at the collecting duct headquarters',
      class: 'Vasopressin V2 receptor antagonist (vaptans); aquaretic',
      mechanism: 'Selectively blocks the V2 vasopressin receptor in the principal cells of the collecting duct. Normally vasopressin (ADH) binds V2 → adenylyl cyclase → cAMP → PKA → insertion of aquaporin-2 (AQP2) water channels into the luminal membrane → water reabsorption. Tolvaptan prevents this → free water is excreted without electrolyte loss (aquaresis, not diuresis). Raises serum sodium by removing excess free water.',
      adverse_effects: 'Thirst; polyuria; frequent urination; hypernatraemia if intake is not maintained; overly rapid correction of hyponatraemia → osmotic demyelination syndrome (central pontine myelinolysis) — correction must not exceed 10–12 mEq/L in first 24 hours; hepatotoxicity (boxed warning — not for chronic use >30 days; liver function monitoring required).',
      clinical_use: 'Euvolaemic and hypervolaemic hyponatraemia (SIADH, heart failure with dilutional hyponatraemia); autosomal dominant polycystic kidney disease (ADPKD) — slows cyst growth. Must be initiated in hospital to monitor the rate of sodium correction.',
      memory_hook: 'Tolvaptan unplugs the vasopressin receptor telephone line to the aquaporin factory — free water flows out without taking any salt with it, carefully raising the city\'s sodium concentration. But rush it and the city bridges crack (osmotic demyelination).',
      source: 'G&G 14e, ch. 25',
      high_yield: true,
    },
  ],
};

if (typeof window !== 'undefined') window.DISTRICT_RENAL = DISTRICT_RENAL;

if (typeof window !== 'undefined' && window.PHARMA?.animations) {
  window.PHARMA.animations.register('renal', ({ THREE, scene, groupRoot, primitives, loop }) => {
    // Water tower with periodic drops falling.
    const droplets = [];
    for (let i = 0; i < 8; i++) {
      const d = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 6),
        new THREE.MeshLambertMaterial({ color: 0x85B7EB })
      );
      d.userData = { life: Math.random(), speed: 0.3 + Math.random() * 0.2, x: -4 + Math.random() * 8 };
      groupRoot.add(d);
      droplets.push(d);
    }
    loop.add((dt) => {
      droplets.forEach((d) => {
        d.userData.life += d.userData.speed * dt;
        if (d.userData.life > 1) { d.userData.life = 0; d.userData.x = -4 + Math.random() * 8; }
        d.position.set(d.userData.x, 12 - d.userData.life * 11, 0);
      });
    });
  });
}
