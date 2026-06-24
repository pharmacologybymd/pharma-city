const DISTRICT_RESPIRATORY = {
  id: 'respiratory',
  name: 'Respiratory',
  theme_line: 'Airway avenue · lung-shaped balloon docks',
  walkthrough: `Airway Avenue is built around the city's great balloon docks — two enormous lung-shaped aerostat hangars that swell and shrink with every breath of the prevailing wind. Every drug that treats asthma, COPD, or airway inflammation has its own berth here, and the pharmacological logic of the district maps directly onto the pathophysiology of obstructive lung disease.

The beta-agonist wind-towers stand tallest: salbutamol (the short-acting relief inhaler) on one side, and the long-acting sentinels salmeterol and formoterol on the other. All three dilate the airways by activating beta-2 adrenoceptors on bronchial smooth muscle — raising cAMP, activating PKA, and phosphorylating myosin light-chain kinase to relax the muscle. The black-box warning nailed above the LABA docks reads clearly: never fly a LABA alone in asthma — the long-acting bronchodilators must always berth beside their ICS companions. Formoterol's dock is unique: its rapid onset means it can also serve as reliever and maintenance in one, under the MART strategy.

Across the avenue stand the anticholinergic hangars — ipratropium and tiotropium, blocking the M3 muscarinic receptors that would otherwise constrict the bronchi. Tiotropium's berth is the grandest; its kinetics favour M1 and M3 over M2, avoiding the paradox of blocking M2 auto-receptors that would otherwise limit acetylcholine release.

The ICS warehouses — budesonide, fluticasone, and beclometasone — are giant anti-inflammatory factories. They suppress the eosinophilic airway inflammation that underlies persistent asthma, but their dust can coat the throat with candida unless patients rinse after each puff. At the end of the avenue, the biological agents occupy the newest, most expensive docks: omalizumab strips IgE from mast cell surfaces; mepolizumab and benralizumab target the eosinophil survival chain via IL-5 and its receptor. And in the old gasometer district, theophylline still burns — narrow therapeutic index, CYP1A2 metabolism, and a caution sign reading "Do not light a cigarette near the ciprofloxacin pipeline."`,
  palette: { ground: 0xB5D9F0, accent: 0x2268A5, water: 0x70B8E8 },
  position: { x: 25, z: 25 },
  drugs: [
    {
      id: 'salmeterol',
      district: 'respiratory',
      building: 'the tall LABA wind-tower on the eastern dock approach',
      class: 'Long-acting beta-2 adrenoceptor agonist (LABA)',
      mechanism: 'Activates beta-2 adrenoceptors on bronchial smooth muscle → adenylyl cyclase → cAMP → PKA activation → phosphorylation of myosin light-chain kinase → smooth muscle relaxation → bronchodilation. Has a long lipophilic side-chain that anchors it near the receptor, providing a ~12-hour duration of action. Onset is slow (~15–30 minutes) — not suitable for acute bronchospasm relief. Also reduces mast cell mediator release and mucociliary clearance improvement.',
      adverse_effects: 'Tachycardia; palpitations; tremor; hypokalaemia (at high doses); throat irritation; paradoxical bronchospasm (rare). Black-box warning: LABA monotherapy in asthma is associated with increased asthma-related deaths — MUST always be combined with inhaled corticosteroid in asthma.',
      clinical_use: 'Asthma (as add-on to ICS — never alone); COPD maintenance therapy; exercise-induced bronchospasm prevention. Combined with ICS in fixed-dose inhalers for asthma and COPD management.',
      memory_hook: 'Salmeterol is the slow, steady wind that keeps the balloons aloft all day — but it cannot launch a deflated balloon alone; it always needs the ICS ground crew.',
      source: 'G&G 14e, ch. 40',
      high_yield: true,
    },
    {
      id: 'formoterol',
      district: 'respiratory',
      building: 'the rapid-onset LABA dock with the combined MART mooring post',
      class: 'Long-acting beta-2 adrenoceptor agonist (LABA); rapid onset',
      mechanism: 'Same mechanism as salmeterol — beta-2 receptor activation → bronchial smooth muscle relaxation. Uniquely, formoterol has rapid onset (~1–3 minutes) comparable to short-acting beta-agonists, despite its long duration (~12 hours). This is because formoterol does not require anchorage in the lipid bilayer to the same extent as salmeterol. The rapid onset enables the MART (Maintenance And Reliever Therapy) strategy when combined with budesonide ICS.',
      adverse_effects: 'Tachycardia; tremor; palpitations; hypokalaemia; paradoxical bronchospasm (rare). Same black-box as salmeterol: LABA monotherapy in asthma increases asthma-related deaths — must combine with ICS.',
      clinical_use: 'Asthma (as add-on to ICS; MART strategy when combined with budesonide); COPD maintenance. The rapid onset makes it suitable as both regular maintenance and as-needed reliever in the MART regimen.',
      memory_hook: 'Formoterol launches fast and stays long — it can be the rescue inhaler AND the maintenance in one dock, but it must never sail without its ICS harbour-master on board.',
      source: 'G&G 14e, ch. 40',
      high_yield: true,
    },
    {
      id: 'ipratropium',
      district: 'respiratory',
      building: 'the short-acting M3 receptor blockade hangar on the anticholinergic avenue',
      class: 'Short-acting muscarinic antagonist (SAMA)',
      mechanism: 'Competitive antagonist of muscarinic acetylcholine receptors in bronchial smooth muscle and submucosal glands. Blocks M1 (ganglionic) and M3 (smooth muscle and glands) receptors. Prevents ACh-mediated bronchoconstriction and mucus hypersecretion. Quaternary ammonium compound — poorly absorbed systemically, minimal CNS effects. Does not cross the blood-brain barrier. Onset of action ~15–30 minutes; duration ~4–6 hours.',
      adverse_effects: 'Dry mouth (most common); urinary retention (especially in men with BPH); constipation; blurred vision (if spray contacts eyes); tachycardia (mild, M2 block); paradoxical bronchospasm (rare). Relative CI: narrow-angle glaucoma (if aerosol contacts eye); BPH (relative).',
      clinical_use: 'COPD — first-line for symptomatic relief; acute severe asthma (in combination with short-acting beta-agonist in emergency department); nebulised for acute COPD exacerbations. Less effective than beta-agonists as monotherapy in asthma.',
      memory_hook: 'Ipratropium blocks the muscarinic constriction reflex — the anticholinergic bouncer who stops acetylcholine from tightening the airway rope, useful especially in the COPD dock.',
      source: 'G&G 14e, ch. 40',
      high_yield: true,
    },
    {
      id: 'tiotropium',
      district: 'respiratory',
      building: 'the grand long-acting anticholinergic dock tower at COPD central',
      class: 'Long-acting muscarinic antagonist (LAMA)',
      mechanism: 'Competitively antagonises muscarinic receptors in the airways. Unique kinetics: dissociates slowly from M1 and M3 receptors (residence time ~34 hours for M3) but relatively faster from M2 receptors. This kinetic selectivity is important because M2 auto-receptors on vagal nerve terminals normally limit ACh release; preserving M2 function prevents paradoxical acetylcholine surge. Duration of bronchodilation ~24 hours, permitting once-daily dosing.',
      adverse_effects: 'Dry mouth (most common, occurs in ~16% of patients); urinary retention; constipation; blurred vision; paradoxical bronchospasm (rare); dry throat.',
      clinical_use: 'COPD — maintenance bronchodilation; reduces exacerbations, improves exercise tolerance and quality of life (UPLIFT trial). Can be added to LABA in severe COPD. Less established role as adjunct in asthma in selected patients.',
      memory_hook: 'Tiotropium parks its molecule in the M3 dock for a full day — once a day locks the bronchoconstriction gate for COPD patients, while letting the M2 auto-gate swing freely to prevent rebound.',
      source: 'G&G 14e, ch. 40',
      high_yield: true,
    },
    {
      id: 'budesonide',
      district: 'respiratory',
      building: 'the inhaled corticosteroid factory with the candida warning sign',
      class: 'Inhaled corticosteroid (ICS)',
      mechanism: 'Binds intracellular glucocorticoid receptors in airway epithelial cells, eosinophils, mast cells, and macrophages. The drug-receptor complex translocates to the nucleus → transrepression of inflammatory genes (NF-κB, AP-1 → reduces IL-4, IL-5, IL-13, eotaxin) and transactivation of anti-inflammatory genes (annexin-1, MKP-1). Result: reduced mucosal oedema, reduced eosinophilic infiltration, reduced mucus hypersecretion, and reduced airway hyperresponsiveness over days to weeks.',
      adverse_effects: 'Oral candidiasis (Candida albicans overgrowth in oropharynx due to local immunosuppression — prevented by rinsing mouth after inhalation); dysphonia (hoarseness from laryngeal muscle myopathy); adrenal suppression (at high doses or prolonged use); growth retardation in children (at high doses); osteoporosis with chronic systemic absorption; cataracts.',
      clinical_use: 'Persistent asthma — cornerstone of long-term anti-inflammatory management; COPD (in combination with LABA in frequent exacerbators, eosinophilic phenotype); croup (nebulised); nasal polyposis (intranasal budesonide). Must instruct patients to rinse mouth after use.',
      memory_hook: 'Budesonide is the anti-inflammatory factory that keeps the airway quiet — but its steam corrodes the mouth unless you rinse away the chemical residue after every shift.',
      source: 'G&G 14e, ch. 40',
      high_yield: true,
    },
    {
      id: 'fluticasone',
      district: 'respiratory',
      building: 'the high-potency ICS warehouse adjacent to the budesonide factory',
      class: 'Inhaled corticosteroid (ICS)',
      mechanism: 'Activates glucocorticoid receptors in airway tissue. Mechanism identical to budesonide — transrepression of inflammatory gene transcription via NF-κB and AP-1 inhibition. Fluticasone propionate has high receptor-binding affinity and high lipophilicity, promoting long tissue residence in lung. First-pass hepatic metabolism is nearly complete, minimising systemic bioavailability from swallowed drug.',
      adverse_effects: 'Oral candidiasis; dysphonia; adrenal suppression at high doses; growth retardation in children; osteoporosis with prolonged high-dose systemic absorption; risk of pneumonia in COPD patients (class effect of ICS in COPD, especially fluticasone propionate).',
      clinical_use: 'Persistent asthma — available as monotherapy or combined with salmeterol or vilanterol; COPD with frequent exacerbations (in combination with LABA/LAMA). Widely used in combination inhalers.',
      memory_hook: 'Fluticasone is the high-potency ICS dock right beside budesonide — same anti-inflammatory job, higher binding grip, and a particularly noted role in COPD pneumonia risk.',
      source: 'G&G 14e, ch. 40',
      high_yield: true,
    },
    {
      id: 'beclometasone',
      district: 'respiratory',
      building: 'the first-generation ICS silo at the historic end of the airway avenue',
      class: 'Inhaled corticosteroid (ICS)',
      mechanism: 'A prodrug; beclometasone dipropionate is hydrolysed in the lung to the active beclometasone-17-monopropionate. Binds glucocorticoid receptors in airway tissue, transrepressing inflammatory cytokine gene expression. One of the earliest ICS agents developed; somewhat higher systemic bioavailability than budesonide or fluticasone at equivalent clinical doses.',
      adverse_effects: 'Oral candidiasis; dysphonia; adrenal suppression; growth retardation in children; systemic effects are somewhat greater than with newer ICS formulations at clinically equivalent doses. Same instruction to rinse mouth after use.',
      clinical_use: 'Persistent asthma; COPD (less commonly used than budesonide or fluticasone). Historically important as the first widely used ICS; still available and effective.',
      memory_hook: 'Beclometasone is the veteran in the oldest dock — the original inhaled steroid that pioneered the whole anti-inflammatory berth, now somewhat overshadowed by newer compounds.',
      source: 'G&G 14e, ch. 40',
      high_yield: false,
    },
    {
      id: 'omalizumab',
      district: 'respiratory',
      building: 'the anti-IgE docking station at the outer biological pier',
      class: 'Anti-IgE monoclonal antibody; humanised IgG1',
      mechanism: 'Binds free serum IgE at the same site (Cε3 domain) that would otherwise bind the high-affinity IgE receptor (FcεRI) on mast cells and basophils. Reduces free IgE levels, downregulates FcεRI expression on mast cells over weeks to months, and prevents IgE-triggered mast cell degranulation. Prevents both early-phase (immediate) and late-phase (eosinophilic) allergic responses. Requires monthly or fortnightly subcutaneous injection.',
      adverse_effects: 'Injection-site reactions; anaphylaxis — occurs in ~0.2% of patients, often delayed (up to 24 hours); observe in clinic for 2 hours after first 3 injections; arthralgia; headache; rare: Churg-Strauss syndrome (eosinophilic granulomatosis) reported when oral steroids tapered.',
      clinical_use: 'Moderate-to-severe allergic asthma inadequately controlled on high-dose ICS plus LABA; total IgE must be elevated and sensitisation to a perennial allergen demonstrated; chronic idiopathic urticaria.',
      memory_hook: 'Omalizumab captures the IgE sentinels before they can dock at the mast cell harbour — without the IgE key, the allergen can\'t trigger the release of the mast cell arsenal.',
      source: 'G&G 14e, ch. 40',
      high_yield: true,
    },
    {
      id: 'mepolizumab',
      district: 'respiratory',
      building: 'the anti-IL-5 eosinophil clearance pier',
      class: 'Anti-IL-5 monoclonal antibody; humanised IgG1',
      mechanism: 'Binds interleukin-5 (IL-5), the principal cytokine responsible for eosinophil production in the bone marrow, mobilisation into the circulation, and survival in tissues. Blocking IL-5 dramatically reduces blood and tissue eosinophil counts. In eosinophilic asthma, eosinophilic inflammation is the primary driver of exacerbations and airway damage. Monthly subcutaneous injection.',
      adverse_effects: 'Headache; injection-site reactions; back pain; fatigue; rarely anaphylaxis. Generally well tolerated. Parasitic (helminth) infections — eosinophils are part of the defence against helminths; screen for parasites before initiating. Herpes zoster reactivation (rare).',
      clinical_use: 'Severe eosinophilic asthma — reduces exacerbation rate, allows oral corticosteroid sparing; eosinophilic granulomatosis with polyangiitis (Churg-Strauss); hypereosinophilic syndrome; nasal polyposis.',
      memory_hook: 'Mepolizumab is the eosinophil navy\'s supply line interceptor — cut the IL-5 signal and the eosinophil fleet shrinks, unable to flood the airways with their destructive granules.',
      source: 'G&G 14e, ch. 40',
      high_yield: true,
    },
    {
      id: 'benralizumab',
      district: 'respiratory',
      building: 'the anti-IL-5 receptor dock with the direct eosinophil elimination crane',
      class: 'Anti-IL-5 receptor alpha (IL-5Rα) monoclonal antibody; afucosylated IgG1',
      mechanism: 'Binds the alpha subunit of the IL-5 receptor (IL-5Rα) on eosinophils and basophils. This both blocks IL-5 signalling and recruits NK cells and macrophages via enhanced ADCC (afucosylated Fc region → enhanced FcγRIII binding) to directly kill eosinophils. Results in near-complete depletion of blood and tissue eosinophils. Given every 4 weeks for first 3 doses, then every 8 weeks.',
      adverse_effects: 'Headache; injection-site reactions; pharyngitis; rarely hypersensitivity. Parasite screening recommended. Less frequent dosing schedule than mepolizumab.',
      clinical_use: 'Severe eosinophilic asthma; reduces exacerbations and allows oral corticosteroid tapering. The 8-weekly maintenance dosing is an advantage for adherence. Also under investigation for COPD and other eosinophilic conditions.',
      memory_hook: 'Benralizumab not only blocks the eosinophil\'s IL-5 antenna but also flags each eosinophil for demolition by immune effectors — it eliminates the army, not just the supply line.',
      source: 'G&G 14e, ch. 40',
      high_yield: false,
    },
    {
      id: 'theophylline',
      district: 'respiratory',
      building: 'the old narrow-therapeutic-index gasometer in the legacy corner of the avenue',
      class: 'Methylxanthine; non-selective phosphodiesterase inhibitor; adenosine receptor antagonist',
      mechanism: 'Inhibits phosphodiesterases (PDE3 and PDE4) → prevents breakdown of cAMP and cGMP → bronchial smooth muscle relaxation. Also non-selectively antagonises adenosine receptors (including A1 in the heart → tachycardia; A2 in vessels → vasodilation). Additional mechanisms: inhibits histone deacetylase (HDAC) at low concentrations → anti-inflammatory; stimulates respiratory drive; improves diaphragmatic contractility. Narrow therapeutic index. Metabolised primarily by CYP1A2.',
      adverse_effects: 'Nausea; vomiting; insomnia; headache; at toxic levels: cardiac arrhythmias (tachyarrhythmias, including ventricular tachycardia and fibrillation); seizures (potentially refractory). CYP1A2 inhibitors such as ciprofloxacin, enoxacin, fluvoxamine raise theophylline levels → toxicity. CYP1A2 inducers (rifampicin, carbamazepine, smoking cessation paradoxically may raise levels) alter exposure. Narrow therapeutic index — regular serum level monitoring required.',
      clinical_use: 'COPD (adjunct bronchodilator when inhaled therapies are inadequate or unavailable); asthma (rarely, third-line only due to toxicity profile); respiratory muscle stimulant in apnoea of prematurity (aminophylline or caffeine preferred); HDAC-mediated corticosteroid sensitivity augmentation at low doses (research context).',
      memory_hook: 'Theophylline is the old gasometer that still produces heat — but its pressure gauge (plasma level) must be watched constantly, and connecting a ciprofloxacin pipe will blow the whole installation.',
      source: 'G&G 14e, ch. 40',
      high_yield: true,
    },
    {
      id: 'roflumilast',
      district: 'respiratory',
      building: 'the selective PDE4 inhibitor refinery at the COPD processing plant',
      class: 'Selective phosphodiesterase-4 (PDE4) inhibitor; oral anti-inflammatory',
      mechanism: 'Inhibits phosphodiesterase-4, the predominant PDE isoform in inflammatory cells (neutrophils, macrophages, T cells) and structural airway cells. Prevents cAMP breakdown → reduces neutrophilic inflammation in the COPD airway. Has no direct bronchodilator effect — anti-inflammatory mechanism. Taken orally once daily.',
      adverse_effects: 'Nausea; diarrhoea; weight loss (average ~2 kg, may continue for months); abdominal pain; headache; insomnia; neuropsychiatric effects: depression, suicidal ideation (boxed warning in some markets — screen for psychiatric history); back pain.',
      clinical_use: 'Severe COPD (FEV1 <50% predicted) with chronic bronchitis phenotype and history of frequent exacerbations, in addition to LABA/LAMA therapy. Not for acute bronchospasm. Reduces exacerbation rate in the target population.',
      memory_hook: 'Roflumilast is the COPD anti-inflammatory pill that calms the neutrophil factories — it works inside, not in the airway, and its main side-effect is that it makes patients lose weight while feeling queasy.',
      source: 'G&G 14e, ch. 40',
      high_yield: true,
    },
    {
      id: 'cromoglicate',
      district: 'respiratory',
      building: 'the prophylaxis-only mast cell stabiliser silo in the historic dock',
      class: 'Mast cell stabiliser; cromolyn sodium',
      mechanism: 'Mechanism not fully elucidated. Inhibits release of inflammatory mediators from mast cells by blocking chloride channels that are required for mast cell activation. Does not reverse established bronchoconstriction — must be used prophylactically. Also inhibits sensory nerve activation and reduces non-specific bronchial hyperresponsiveness with chronic use.',
      adverse_effects: 'Generally very safe; throat irritation and cough from inhaled powder; rare bronchospasm from the propellant; headache.',
      clinical_use: 'Asthma prophylaxis (particularly in allergic/exercise-induced asthma) — very safe profile makes it useful in children, though less effective than ICS; allergic rhinitis (intranasal); allergic conjunctivitis (eye drops); food allergy (oral).',
      memory_hook: 'Cromoglicate is the museum-piece prophylaxis agent — it prevents mast cells from opening their doors, but once the doors are open, it cannot push them closed again.',
      source: 'G&G 14e, ch. 40',
      high_yield: false,
    },
    {
      id: 'n_acetylcysteine',
      district: 'respiratory',
      building: 'the mucolytic cistern between the airway and toxicology precincts',
      class: 'Mucolytic agent; also glutathione precursor (see Toxicology district)',
      mechanism: 'Breaks disulfide bonds within mucus glycoproteins (mucins), reducing mucus viscosity and aiding expectoration. The free thiol group of the cysteine residue cleaves the S-S bonds in the mucus gel. When absorbed systemically or given intravenously, acts as a glutathione precursor — relevant in paracetamol overdose management (see Toxicology district).',
      adverse_effects: 'Inhaled form: bronchospasm (especially in reactive airways — pre-treat with bronchodilator); unpleasant sulphurous smell; nausea; IV form: flushing, urticaria, hypotension (anaphylactoid infusion reaction — slow the infusion).',
      clinical_use: 'Mucolytic in chronic respiratory disease (COPD, cystic fibrosis, bronchiectasis); nebulised to facilitate expectoration; IV for paracetamol overdose (see Toxicology district).',
      memory_hook: 'N-acetylcysteine is the mucus scissors in the respiratory district and the glutathione resupply truck in the toxicology district — two identities, one compound.',
      source: 'G&G 14e, ch. 40',
      high_yield: false,
    },
    {
      id: 'dornase_alfa',
      district: 'respiratory',
      building: 'the recombinant DNase dock at the cystic fibrosis berth',
      class: 'Recombinant human deoxyribonuclease I (rhDNase); mucolytic enzyme',
      mechanism: 'Cleaves extracellular DNA strands that accumulate in the thick, viscous sputum of cystic fibrosis (CF) patients. DNA released from necrotic neutrophils greatly increases sputum viscosity. By depolymerising DNA, dornase alfa reduces sputum viscosity, improves mucus clearance, and reduces bacterial burden in CF airways. Administered by inhalation daily.',
      adverse_effects: 'Voice alteration (hoarseness); pharyngitis; laryngitis; conjunctivitis; chest pain; rhinitis; dyspnoea — generally well tolerated.',
      clinical_use: 'Cystic fibrosis — improves lung function and reduces exacerbation frequency; most effective in patients with FVC >40% predicted. Used as part of CF multidrug management alongside physiotherapy, antibiotics, and CFTR modulators.',
      memory_hook: 'Dornase alfa is the specialised CF dock enzyme — it cuts the neutrophil DNA threads that glue CF mucus into near-solid concrete, making the sputum fluid enough to cough out.',
      source: 'G&G 14e, ch. 40',
      high_yield: false,
    },
  ],
};

if (typeof window !== 'undefined') window.DISTRICT_RESPIRATORY = DISTRICT_RESPIRATORY;

if (typeof window !== 'undefined' && window.PHARMA?.animations) {
  window.PHARMA.animations.register('respiratory', ({ THREE, scene, groupRoot, primitives, loop }) => {
    // Lung-shaped balloon: two spheres + basket, drifting overhead.
    const balloon = new THREE.Group();
    const matB = new THREE.MeshLambertMaterial({ color: 0x85B7EB });
    const b1 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 12), matB); b1.position.x = -1.2; balloon.add(b1);
    const b2 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 12), matB); b2.position.x = 1.2; balloon.add(b2);
    const basket = new THREE.Mesh(new THREE.BoxGeometry(2, 0.7, 1.2), new THREE.MeshLambertMaterial({ color: 0x185FA5 }));
    basket.position.y = -2.5; balloon.add(basket);
    balloon.position.set(0, 18, 0);
    groupRoot.add(balloon);
    loop.add((_dt, t) => {
      balloon.position.x = Math.sin(t * 0.25) * 10;
      balloon.position.y = 18 + Math.sin(t * 0.7) * 1.2;
    });
  });
}
