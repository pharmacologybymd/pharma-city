const DISTRICT_ANS_HUB = {
  id: 'ans_hub',
  name: 'ANS hub',
  theme_line: 'Switchboard plaza · receptors are the city dispatcher',
  walkthrough: `Stand at the centre of the city and look in every direction: every cable, every pipe, every signal wire converges here before it fans out to the districts. This is Switchboard Plaza — the autonomic ganglion made physical. Preganglionic fibres arrive as narrow copper lines from the brain and spinal cord, carrying acetylcholine. That ACh lands on the nicotinic N-N receptors studding the face of the central relay tower — the ganglionic nicotinic receptor, built from α and β subunits arranged as a pentameric ion channel. Sodium and calcium flood in, the tower fires, and postganglionic signals thunder outward: noradrenaline to the adrenergic quarter, acetylcholine to the cholinergic swamps, and a hundred finer messages to the viscera beyond. The ganglion is not a passive junction — it is a processing node, a place of convergence and divergence where the body can amplify, filter, or silence the brain's instructions before they ever reach the end organ.

Walking the plaza you notice six landmark buildings. The Nicotine Exchange occupies the busiest corner: it is a pulsating two-phase trading floor that first floods the switchboard with signals (low dose, stimulation) and then, when the market is overwhelmed, blocks every receptor simultaneously (high dose, ganglionic block and depolarising NMJ block). Beside it stands the Varenicline Partial-Relay Station, a half-speed version of the Exchange that keeps enough activity to prevent withdrawal cravings without ever triggering the full receptor storm that addiction requires. Across the plaza, three classical buildings are preserved as monuments to pharmacological history: the Mecamylamine Governor-House, the Hexamethonium Archive, and the Trimethaphan Emergency Valve — each one a ganglionic blocker that extinguished every postganglionic signal at once, lowering blood pressure so precipitously that the patient had to be propped upright to avoid fainting. Finally, in the quiet northern corner of the plaza, the Cytisine Apprentice-Relay Office stands as a partial agonist cousin of varenicline, a plant alkaloid from Laburnum seeds that has been used in Eastern Europe for smoking cessation since before the modern era. Every drug in this plaza acts on the same relay tower; what differs is whether they turn the gain up, hold it steady at half-power, or slam the circuit breaker shut entirely.`,
  palette: { ground: 0xC8B89A, accent: 0x5DCAA5, water: 0x85B7EB },
  position: { x: 0, z: 0 },
  drugs: [
    // ─── HIGH-YIELD ───────────────────────────────────────────────────────────

    {
      id: 'nicotine',
      district: 'ans_hub',
      building: 'the Nicotine Exchange — the two-phase pulsating trading floor at the busiest plaza corner',
      class: 'Ganglionic, NMJ, and CNS nicotinic receptor agonist (plant alkaloid)',
      mechanism: 'Binds and activates N-N (neuronal, ganglionic) and N-M (neuromuscular junction) nicotinic acetylcholine receptors — pentameric ligand-gated ion channels permeable to Na+ and Ca2+. At low doses: sustained depolarisation mimics endogenous ACh → ganglionic stimulation of both sympathetic and parasympathetic ganglia (net cardiovascular effect is sympathomimetic — tachycardia, hypertension — because sympathetic tone predominates). At high doses or with sustained exposure: receptor desensitisation and persistent depolarisation cause ganglionic block and NMJ block (phase II / desensitisation block). CNS: stimulates dopamine release in the mesolimbic system (nucleus accumbens) — the basis of addiction and dependence.',
      adverse_effects: 'Nausea; vomiting; salivation; diarrhoea; dizziness; tachycardia; hypertension; tremor. High dose: ganglionic block → hypotension, bradycardia; NMJ depolarisation block → muscle weakness. Chronic use: dependence (dopaminergic reinforcement). Nicotine replacement products: local effects (skin irritation, vivid dreams with patch; mouth/throat irritation with gum/lozenge).',
      clinical_use: 'Smoking cessation: nicotine replacement therapy (patch, gum, lozenge, inhaler, nasal spray) — reduces withdrawal symptoms by providing controlled nicotine without tobacco combustion byproducts. Not used for any other therapeutic indication. Important pharmacological prototype for understanding ganglionic and NMJ pharmacology.',
      memory_hook: 'The trading floor erupts on opening bell (stimulation) and then crashes into silence when every broker shouts at once and no signal gets through (high-dose block) — two phases, one molecule.',
      source: 'G&G 14e, ch. 12',
      high_yield: true,
    },
    {
      id: 'varenicline',
      district: 'ans_hub',
      building: 'the Varenicline Partial-Relay Station — a half-speed exchange that runs without ever hitting the ceiling',
      class: 'Selective partial agonist at α4β2 neuronal nicotinic receptors; smoking cessation agent',
      mechanism: 'Partial agonist at α4β2 subtype of neuronal (ganglionic/CNS) nicotinic receptors — the predominant subtype mediating nicotine\'s rewarding effects in the mesolimbic dopamine pathway. As a partial agonist: produces low-level dopaminergic stimulation (reduces craving and withdrawal symptoms) while competitively blocking full nicotine binding (reduces reinforcement from cigarettes). Has lower intrinsic efficacy than nicotine at the same receptor, so the "ceiling" on receptor activation is never reached.',
      adverse_effects: 'Nausea (most common, dose-dependent, often transient); insomnia; abnormal dreams; headache. Neuropsychiatric effects: depression, agitation, hostility, suicidal ideation (FDA black-box warning issued 2009, later modified — association remains a concern in patients with pre-existing psychiatric illness, though causality debated in meta-analyses). Cardiovascular: modest increase in cardiovascular events in high-risk patients reported in some studies (flag — G&G 14e chapter should be consulted for current risk assessment).',
      clinical_use: 'First-line pharmacotherapy for smoking cessation. More effective than nicotine replacement or bupropion monotherapy in head-to-head trials. Used as a 12-week course with possible extension to 24 weeks in responders.',
      memory_hook: 'The partial relay runs at half-speed continuously — enough throughput to prevent withdrawal silence, but the channels are occupied so the full nicotine signal never gets a seat at the desk.',
      source: 'G&G 14e, ch. 12',
      high_yield: true,
    },
    {
      id: 'mecamylamine',
      district: 'ans_hub',
      building: 'the Mecamylamine Governor-House — the stone building that can cut all outgoing lines simultaneously',
      class: 'Non-depolarising ganglionic blocker; secondary amine; orally active',
      mechanism: 'Non-competitive (channel-blocking) antagonist at neuronal nicotinic receptors in all autonomic ganglia (sympathetic and parasympathetic). Enters and blocks the open ion channel of the nicotinic receptor, preventing Na+/Ca2+ influx regardless of ACh binding. Blocks ganglionic transmission bilaterally → interrupts both sympathetic and parasympathetic outflow. Net effects dominated by which division had higher resting tone: vasodilation and orthostatic hypotension (loss of sympathetic vascular tone); tachycardia (loss of parasympathetic cardiac tone — vagal block). Secondary amine: crosses the BBB (unlike quaternary ganglionic blockers).',
      adverse_effects: 'Orthostatic hypotension (severe, limiting); tachycardia; blurred vision; dry mouth; urinary retention; constipation; ileus; sexual dysfunction. CNS effects (owing to BBB penetration): sedation, tremor, choreiform movements, mental changes.',
      clinical_use: 'Historically used for malignant or severe hypertension refractory to other agents. Now largely obsolete for hypertension (displaced by safer antihypertensives). Investigational use in Tourette syndrome and CNS nicotinic blockade research. Represents the prototype orally active non-depolarising ganglionic blocker.',
      memory_hook: 'The Governor-House can throw a single lever and silence every outgoing line — sympathetic and parasympathetic alike — leaving the body\'s peripheral effectors with no instructions and blood pressure plummeting to the floor.',
      source: 'G&G 14e, ch. 12',
      high_yield: true,
    },
    {
      id: 'hexamethonium',
      district: 'ans_hub',
      building: 'the Hexamethonium Archive — the preserved historical vault in the plaza\'s west wing',
      class: 'Ganglionic blocker; bisquaternary ammonium compound; prototype ganglionic blocker',
      mechanism: 'Blocks neuronal nicotinic receptors at autonomic ganglia (both sympathetic and parasympathetic) by occupying the ion channel. Bisquaternary ammonium structure: poorly absorbed orally and does not cross the BBB. Historically administered parenterally. Blocks all ganglionic transmission → combined sympatholysis and parasympatholysis with cardiovascular, GI, urinary, and ocular effects.',
      adverse_effects: 'Orthostatic hypotension; tachycardia; dry mouth; blurred vision; urinary retention; severe constipation; impotence. Rapid tolerance develops with chronic use. Poor GI absorption made dosing unreliable.',
      clinical_use: 'No current therapeutic use. Historical significance: first ganglionic blocker used clinically for severe hypertension (early 1950s) — its limitations (see ADRs) drove development of better antihypertensives. Essential pharmacological prototype for understanding ganglionic transmission.',
      memory_hook: 'The Archive preserves the blueprints that all modern antihypertensives were designed to replace — hexamethonium opened the ganglionic blocker era and then was filed away when safer buildings were constructed.',
      source: 'G&G 14e, ch. 12',
      high_yield: false,
    },

    // ─── LONG-TAIL ────────────────────────────────────────────────────────────

    {
      id: 'trimethaphan',
      district: 'ans_hub',
      building: 'the Trimethaphan Emergency Valve — the red-handled pressure-release tap on the plaza\'s south wall',
      class: 'Ganglionic blocker; short-acting; historically used parenterally',
      mechanism: 'Ganglionic blocker acting at nicotinic N-N receptors in both sympathetic and parasympathetic ganglia. Also has some direct vasodilatory action. Very short duration of action (minutes) when given by IV infusion — offset by redistribution and rapid hydrolysis by plasma cholinesterases. Allows minute-to-minute blood pressure titration.',
      adverse_effects: 'Profound orthostatic hypotension; tachycardia; paralytic ileus; urinary retention; dry mouth; mydriasis; cycloplegia. Tachyphylaxis (rapid tolerance) with prolonged infusion.',
      clinical_use: 'Historically used in hypertensive emergencies (hypertensive crisis) and for controlled hypotension during surgery (to reduce surgical bleeding). Also used in acute aortic dissection when immediate BP reduction was required. Now largely replaced by sodium nitroprusside, labetalol, and other agents with more favourable profiles.',
      memory_hook: 'The emergency valve is designed to be opened for minutes only — turn it and the pressure drops immediately, but leave it open too long and every outgoing pipe in the plaza runs dry.',
      source: 'G&G 14e, ch. 12',
      high_yield: false,
    },
    {
      id: 'cytisine',
      district: 'ans_hub',
      building: 'the Cytisine Apprentice-Relay Office — a modest northern corner building older than the Exchange itself',
      class: 'Partial agonist at α4β2 neuronal nicotinic receptors; plant alkaloid (Laburnum anagyroides seeds)',
      mechanism: 'Partial agonist at α4β2 neuronal nicotinic receptors — same molecular target as varenicline. Lower intrinsic efficacy than full nicotine agonism; occupies and partially activates the receptor while competitively blocking full nicotine stimulation. Proposed mechanism of smoking cessation identical to varenicline: reduces dopaminergic reward from smoking while providing low-level stimulation that attenuates withdrawal. Note: clinical evidence base is smaller than for varenicline; most trials conducted in Eastern Europe (flag — G&G 14e ch. 12 coverage of cytisine may be limited; peer-reviewed meta-analyses should be consulted for current efficacy data).',
      adverse_effects: 'Nausea; dry mouth; sleep disturbance; headache. Neuropsychiatric profile less well characterised than varenicline given smaller trial databases. Laburnum seeds (natural source) are highly toxic — the purified alkaloid at therapeutic doses is distinct from plant ingestion.',
      clinical_use: 'Smoking cessation: used for decades in Bulgaria, Poland, and other Eastern European countries before Western approval. Licensed in some European countries and New Zealand. Considered a lower-cost alternative to varenicline. Not currently FDA-approved in the United States.',
      memory_hook: 'The Apprentice-Relay Office was built from Laburnum wood long before the modern Exchange arrived — cheaper, older, and still functional, running the same half-speed protocol that varenicline later patented.',
      source: 'G&G 14e, ch. 12',
      high_yield: false,
    },
    {
      id: 'succinylcholine',
      district: 'ans_hub',
      building: 'the Depolarising Lock on the NMJ side-gate of the plaza',
      class: 'Depolarising neuromuscular blocking agent; NMJ nicotinic agonist; dicholine ester of succinic acid',
      mechanism: 'Binds nicotinic N-M receptors at the NMJ (same receptor targeted by the endogenous transmitter ACh at the motor endplate, distinct from ganglionic N-N receptors). Acts as a sustained agonist: produces initial depolarisation of the motor endplate → fasciculations (phase I block), then persistent depolarisation renders the endplate refractory to further stimulation → flaccid paralysis (phase I / depolarising block). Unlike non-depolarising blockers, phase I block is NOT reversed by anticholinesterases (neostigmine worsens it by increasing ACh at the already-depolarised plate). Hydrolysed by plasma pseudocholinesterase (butyrylcholinesterase) → very short duration (~5–10 min) in normal individuals. Patients with pseudocholinesterase deficiency (genetic) experience prolonged paralysis ("scoline apnoea").',
      adverse_effects: 'Fasciculations (brief, can cause post-operative myalgia); hyperkalaemia (potentially fatal in burns, crush injuries, prolonged immobilisation, upper motor neurone lesions — owing to upregulation of extrajunctional nicotinic receptors); malignant hyperthermia (rare, triggered in susceptible individuals by volatile anaesthetics + succinylcholine via RYR1 mutation); bradycardia (direct muscarinic effect, especially in children and on repeated dosing); increased intraocular and intragastric pressure.',
      clinical_use: 'Rapid sequence induction (RSI) of anaesthesia: produces fast onset of complete NMJ block (60–90 seconds) allowing rapid intubation. Preferred when fastest possible intubation is required (full stomach, airway emergency) because of rapid onset and short duration. Electroconvulsive therapy (ECT) — to attenuate the motor manifestation of seizure. Contraindicated in: hyperkalaemia risk situations, malignant hyperthermia susceptibility, pseudocholinesterase deficiency (relative).',
      memory_hook: 'The Depolarising Lock slams the gate wide open with a jolt of fasciculations, then freezes it half-open so no further signal can turn the key — and the faster pseudocholinesterase works, the sooner the lock springs free again.',
      source: 'G&G 14e, ch. 12',
      high_yield: true,
    },
  ],
};

if (typeof window !== 'undefined') window.DISTRICT_ANS_HUB = DISTRICT_ANS_HUB;

// Animation registration — rotating switchboard beacon
if (typeof window !== 'undefined' && window.PHARMA?.animations) {
  window.PHARMA.animations.register('ans_hub', ({ THREE, scene, groupRoot, primitives, loop }) => {
    const ring = new THREE.Group();
    const COLORS = [0x5DCAA5, 0xEF9F27, 0xE24B4A, 0x85B7EB, 0xF4C0D1, 0xAFA9EC];
    COLORS.forEach((col, i) => {
      const a = (i / COLORS.length) * Math.PI * 2;
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 12, 8),
        new THREE.MeshBasicMaterial({ color: col })
      );
      dot.position.set(Math.cos(a) * 5, 12, Math.sin(a) * 5);
      ring.add(dot);
    });
    groupRoot.add(ring);
    loop.add((dt) => { ring.rotation.y += 0.4 * dt; });
  });
}
