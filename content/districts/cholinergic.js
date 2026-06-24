const DISTRICT_CHOLINERGIC = {
  id: 'cholinergic',
  name: 'Cholinergic',
  theme_line: 'Flooded swamp-town · SLUDGE',
  walkthrough: `Every fountain in the swamp overflows. Saliva drips from the gutters, eyes water at the market stalls, and the pavements glisten with sweat that never dries. Bladder-bells ring without warning, the bowels move on their own schedule, and the bronze pipes of the gas-works heave with bronchospasm. This is the cholinergic district — the body when acetylcholine is everywhere at once. The acronym on every street sign reads SLUDGE.

Across the black canal sits Anticholinergic Alley: a bone-dry desert quarter where the fountains have all been sealed. No saliva, no tears, no sweat, no bowel sounds — only a fast hollow pulse and pupils wide as dinner plates. Atropine's tower stands at the centre of the alley like an obelisk, its stone carved with the words "dry as a bone, blind as a bat, red as a beet, hot as a hare, mad as a hatter." The two halves of the district are mirror images of each other, and knowing one perfectly is knowing both.`,
  palette: { ground: 0x97C459, accent: 0x1D9E75, water: 0x378ADD },
  position: { x: -30, z: 0 },
  drugs: [
    // ─── DIRECT-ACTING CHOLINOMIMETICS ───────────────────────────────────────

    {
      id: 'acetylcholine',
      district: 'cholinergic',
      building: 'the Great Fountain at the centre of the swamp plaza',
      class: 'Endogenous neurotransmitter; direct-acting muscarinic and nicotinic agonist',
      mechanism: 'Binds muscarinic receptors (M1–M5) at parasympathetic effector organs and CNS, and nicotinic receptors (NM at NMJ, NN at autonomic ganglia). Hydrolysed rapidly by acetylcholinesterase (AChE) at the synapse and by butyrylcholinesterase (pseudocholinesterase) in plasma, making its systemic duration of action extremely short.',
      adverse_effects: 'SLUDGE when given systemically: salivation, lacrimation, urination, defecation, GI cramps, emesis; bradycardia; hypotension; bronchospasm; miosis.',
      clinical_use: 'No systemic therapeutic use owing to rapid hydrolysis. Applied topically in ophthalmic surgery (intraocular injection) to produce immediate miosis during cataract extraction.',
      memory_hook: 'The Great Fountain is the city\'s water source — the original signal — but it drains itself so fast it is useless as a reservoir, only good for the one instant it bursts.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },
    {
      id: 'pilocarpine',
      district: 'cholinergic',
      building: 'the dripping ivy-covered apothecary on the canal bank',
      class: 'Direct-acting muscarinic agonist, tertiary amine alkaloid',
      mechanism: 'Activates muscarinic receptors (predominantly M3) on the ciliary muscle and iris sphincter. In the eye: contracts the ciliary muscle → accommodates for near vision and opens the trabecular meshwork → reduces intraocular pressure. Tertiary amine: crosses the blood-brain barrier, can stimulate CNS muscarinic receptors at high doses.',
      adverse_effects: 'Stinging on instillation; miosis; induced myopia; brow ache; systemic absorption can cause SLUDGE; sweating (pilocarpine is the strongest diaphoretic of the muscarinic agonists).',
      clinical_use: 'Open-angle glaucoma (topical drops); acute angle-closure glaucoma (reduces IOP rapidly); xerostomia secondary to radiation therapy (oral pilocarpine); Sjögren\'s syndrome (dry mouth, dry eyes).',
      memory_hook: 'The ivy on the apothecary wraps the drain-pipes tighter and tighter — that is the ciliary muscle squeezing the lens and opening the drainage angle.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },
    {
      id: 'carbachol',
      district: 'cholinergic',
      building: 'the reinforced lock-gate at the upper end of the canal',
      class: 'Direct-acting muscarinic and nicotinic agonist; carbamic acid ester',
      mechanism: 'Activates both muscarinic (M1–M5) and nicotinic receptors. Resistant to hydrolysis by AChE and butyrylcholinesterase (carbamic acid ester bond is not cleaved by cholinesterases) → prolonged action. Produces intense miosis and reduction of intraocular pressure via M3 receptors on ciliary muscle and iris sphincter.',
      adverse_effects: 'Miosis; ciliary spasm; headache; systemic absorption causes full SLUDGE; hypotension; rarely bronchospasm.',
      clinical_use: 'Topical ophthalmic use: intraocular surgery (miosis); glaucoma when pilocarpine fails. Rarely used systemically owing to lack of selectivity.',
      memory_hook: 'The lock-gate is resistant to the usual enzymatic key (AChE) — it stays clamped shut (miosis) far longer than the ordinary canal doors.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },
    {
      id: 'bethanechol',
      district: 'cholinergic',
      building: 'the bladder-bell tower near the southern wetlands',
      class: 'Direct-acting muscarinic agonist, quaternary amine; selective for smooth muscle',
      mechanism: 'Activates muscarinic receptors (particularly M3) on detrusor muscle of the bladder and GI smooth muscle. Quaternary amine: does not cross the BBB. Resistant to AChE hydrolysis. Has no significant nicotinic activity (no effect at NMJ).',
      adverse_effects: 'Urinary urgency; abdominal cramping; diarrhoea; nausea; flushing; sweating; bronchospasm (use with caution in asthma/COPD); bradycardia.',
      clinical_use: 'Post-operative or post-partum urinary retention (non-obstructive); neurogenic bladder with incomplete emptying; post-operative GI atony (paralytic ileus). Contraindicated when mechanical obstruction is present.',
      memory_hook: 'The bladder-bell tower chimes insistently — bethanechol tells the detrusor to contract and empty, refusing to let the bell go silent until the bladder is clear.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },

    // ─── INDIRECT-ACTING (ANTICHOLINESTERASES) ───────────────────────────────

    {
      id: 'neostigmine',
      district: 'cholinergic',
      building: 'the bridge over the floodgate at the NMJ crossing',
      class: 'Reversible anticholinesterase, quaternary amine',
      mechanism: 'Inhibits acetylcholinesterase at the NMJ and parasympathetic synapses by carbamylating the enzyme\'s serine active site → ACh accumulates. Quaternary nitrogen: does not cross the BBB (no CNS effects). Also has a direct weak nicotinic agonist action at the NMJ.',
      adverse_effects: 'SLUDGE (salivation, lacrimation, urination, defecation, GI cramps, emesis); bradycardia; bronchospasm; muscle fasciculations; cholinergic crisis at overdose (paradoxical weakness).',
      clinical_use: 'Myasthenia gravis (mainstay oral therapy); reversal of non-depolarising neuromuscular blockade (given with glycopyrrolate to block muscarinic effects); post-operative ileus; urinary retention.',
      memory_hook: 'On Neostigmine bridge the floodgate jams open — acetylcholine piles up until the tired myasthenic soldiers can finally march across.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },
    {
      id: 'physostigmine',
      district: 'cholinergic',
      building: 'the old Calabar bean warehouse at the jungle edge of the district',
      class: 'Reversible anticholinesterase, tertiary amine',
      mechanism: 'Carbamylates AChE\'s serine active site reversibly → ACh accumulates at all cholinergic synapses. Tertiary amine: lipid-soluble, readily crosses the BBB → central cholinergic effects (increased cortical arousal, miosis, sedation at high dose).',
      adverse_effects: 'SLUDGE; bradycardia; bronchospasm; seizures (CNS overdose); excessive salivation; nausea.',
      clinical_use: 'Antidote for anticholinergic toxidrome caused by pure muscarinic agents (atropine poisoning, antihistamine toxicity, jimsonweed/Datura ingestion); post-anaesthesia central anticholinergic syndrome. CONTRAINDICATED in tricyclic antidepressant overdose — the combination of TCA-induced sodium-channel block with physostigmine\'s bradycardia and conduction slowing has precipitated fatal ventricular arrhythmias and seizures.',
      memory_hook: 'The jungle warehouse holds the Calabar bean — the original poison arrow — and its tertiary amine skeleton is the only key that opens the blood-brain-barrier gate into the anticholinergic antidote vault.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },
    {
      id: 'edrophonium',
      district: 'cholinergic',
      building: 'the rapid-response guard post at the NMJ checkpoint',
      class: 'Short-acting reversible anticholinesterase, quaternary amine',
      mechanism: 'Binds electrostatically (and weakly by hydrogen bonding) to AChE\'s anionic and esteratic sites without forming a covalent bond → very rapid, brief inhibition (duration ~10 minutes). Quaternary: does not cross BBB.',
      adverse_effects: 'Transient SLUDGE; bradycardia; fasciculations; risk of cholinergic crisis if given to an overtreated myasthenic patient.',
      clinical_use: 'Tensilon test (Edrophonium test): diagnosis of myasthenia gravis — brief reversal of ptosis/diplopia confirms MG. Also used to differentiate myasthenic crisis from cholinergic crisis. Reversal of neuromuscular blockade (rarely used for this now).',
      memory_hook: 'The guard post deploys in seconds and stands down in minutes — a 10-minute window is long enough to confirm the myasthenic soldier can lift his eyelid.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },
    {
      id: 'pyridostigmine',
      district: 'cholinergic',
      building: 'the long slow-burn gasworks chimney east of the NMJ bridge',
      class: 'Reversible anticholinesterase, quaternary amine',
      mechanism: 'Carbamylates AChE\'s serine residue reversibly → ACh accumulates at NMJ. Slower onset and longer duration of action than neostigmine (~3–6 hours). Quaternary amine: does not cross BBB. Less muscarinic side-effect burden than neostigmine at equivalent NMJ doses.',
      adverse_effects: 'SLUDGE (milder than neostigmine); abdominal cramps; diarrhoea; excessive salivation; muscle cramps; fasciculations.',
      clinical_use: 'Myasthenia gravis (preferred oral agent for long-term management due to longer duration and better tolerability than neostigmine); Gulf War syndrome prophylaxis (historical, investigational).',
      memory_hook: 'The gasworks chimney burns slowly and steadily all day — pyridostigmine keeps the NMJ open for hours without neostigmine\'s violent flood surges.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },

    // ─── ANTICHOLINERGIC ALLEY (Muscarinic Antagonists) ──────────────────────

    {
      id: 'atropine',
      district: 'cholinergic',
      building: 'Atropine tower at the dry-desert square of Anticholinergic Alley',
      class: 'Competitive muscarinic antagonist, tertiary amine alkaloid (belladonna)',
      mechanism: 'Competitively blocks all five muscarinic receptor subtypes (M1–M5) with similar affinity. Tertiary amine: crosses the BBB — causes CNS excitation at low dose, sedation/coma at high dose. Blocks the increase in secretions, smooth muscle tone, heart rate reduction, and miosis mediated by ACh.',
      adverse_effects: 'Dry mouth; blurred vision (cycloplegia, mydriasis); tachycardia; urinary retention; constipation; hyperthermia; CNS: restlessness, hallucinations, delirium (anticholinergic toxidrome). Mnemonic: "dry as a bone, blind as a bat, red as a beet (vasodilation), hot as a hare, mad as a hatter".',
      clinical_use: 'Organophosphate/carbamate poisoning (first-line antidote — high-dose IV atropine); bradycardia (ACLS); premedication (reduce secretions); ophthalmic cycloplegia/mydriasis; antidote for excessive muscarinic stimulation; peptic ulcer (historical).',
      memory_hook: 'The obelisk tower in the desert has shut off every fountain — no saliva, no tears, no sweat, just a racing heartbeat echoing off dry stone walls.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },
    {
      id: 'glycopyrrolate',
      district: 'cholinergic',
      building: 'the sealed-pipe utility station adjacent to the NMJ bridge',
      class: 'Competitive muscarinic antagonist, quaternary amine (synthetic)',
      mechanism: 'Blocks muscarinic receptors competitively. Quaternary ammonium structure: does not cross the BBB → no CNS effects (advantage over atropine). Reduces all parasympathetic secretions (salivary, bronchial, gastric) and counteracts muscarinic side-effects without causing central anticholinergic syndrome.',
      adverse_effects: 'Dry mouth; tachycardia; urinary retention; constipation; mydriasis and blurred vision; no CNS effects (quaternary).',
      clinical_use: 'Paired with neostigmine or pyridostigmine to block SLUDGE effects when reversing non-depolarising neuromuscular blockade. Preoperative antisialagogue. Reduction of excessive salivation or drooling in neurological conditions (e.g., cerebral palsy). Bronchospasm (via nebuliser).',
      memory_hook: 'The sealed utility station sits right beside the NMJ bridge — it plugs the muscarinic pipes without touching the brain, letting neostigmine do its NMJ work unmolested.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },
    {
      id: 'hyoscine',
      district: 'cholinergic',
      building: 'the motion-sickness lighthouse at the harbour entrance of the alley',
      class: 'Competitive muscarinic antagonist, tertiary amine alkaloid (scopolamine)',
      mechanism: 'Blocks central muscarinic receptors in the vestibular nuclei and nucleus of the solitary tract, reducing the emetic response to vestibular input. Also produces sedation and amnesia via central muscarinic blockade. Tertiary amine: readily crosses BBB. Transdermal patch delivers controlled release over 72 hours.',
      adverse_effects: 'Sedation (prominent); dry mouth; blurred vision; urinary retention; confusion and hallucinations (especially in elderly); transient mydriasis on finger contamination with patch.',
      clinical_use: 'Motion sickness prophylaxis (transdermal patch, most effective agent for this indication); preoperative sedation and amnesia; palliative care (reduction of death rattle, GI colic); post-operative nausea and vomiting.',
      memory_hook: 'The lighthouse in the harbour keeps the vestibular storm calm — hyoscine dims the motion signals before they can ring the nausea bell.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },
    {
      id: 'tropicamide',
      district: 'cholinergic',
      building: 'the short-stay optometry kiosk at the market edge of the alley',
      class: 'Competitive muscarinic antagonist, synthetic tertiary amine',
      mechanism: 'Blocks M3 muscarinic receptors on the iris sphincter and ciliary muscle of the eye → mydriasis (pupil dilation) and cycloplegia (paralysis of accommodation). Shorter duration than atropine (~4–6 hours vs. 1–2 weeks) owing to lower affinity for the receptors and faster dissociation.',
      adverse_effects: 'Transient stinging on instillation; blurred vision; photophobia; systemic absorption (especially in neonates) can cause tachycardia, fever, flushing.',
      clinical_use: 'Ophthalmic fundoscopic examination (mydriasis for viewing the retina); cycloplegic refraction in children (though atropine used for maximum effect in amblyopia). Short duration makes it preferred for routine diagnostic dilation.',
      memory_hook: 'The short-stay kiosk opens wide in minutes and closes again in a few hours — just long enough to peer through the pupil and examine the retina.',
      source: 'G&G 14e, ch. 11',
      high_yield: true,
    },

    // ─── LONG-TAIL ENTRIES ────────────────────────────────────────────────────

    {
      id: 'parathion',
      district: 'cholinergic',
      building: 'the collapsed pesticide shed at the swamp\'s toxic north shore',
      class: 'Organophosphate pesticide; irreversible anticholinesterase',
      mechanism: 'Phosphorylates the serine residue of AChE\'s esteratic site irreversibly, preventing ACh hydrolysis. Accumulation of ACh causes sustained muscarinic and nicotinic overstimulation; "aging" of the phosphorylated enzyme (loss of the phosphoryl group\'s alkoxy chain) renders it permanently inactive.',
      adverse_effects: 'SLUDGE (profuse secretions, bronchospasm, bradycardia) plus nicotinic effects (muscle fasciculations, weakness, paralysis); CNS: anxiety, seizures, coma; respiratory failure (central apnoea + bronchospasm) is the cause of death.',
      clinical_use: 'Not used therapeutically. Understanding its mechanism is essential for managing organophosphate poisoning. Treatment: atropine (large doses, reverses muscarinic effects) + pralidoxime (if given early, before aging).',
      memory_hook: 'The collapsed shed with its cracked barrels leaks the poison that jams all the AChE wheels permanently — a ruined machine that cannot be restarted once aged.',
      source: 'G&G 14e, ch. 12',
      high_yield: false,
    },
    {
      id: 'malathion',
      district: 'cholinergic',
      building: 'the dusting-cart depot on the outer road of the toxic shore',
      class: 'Organophosphate pesticide (low toxicity in mammals); irreversible anticholinesterase',
      mechanism: 'A prodrug: requires metabolic activation (oxidation by CYP450) to malaoxon, which irreversibly phosphorylates AChE. In mammals, malathion is also rapidly hydrolysed by carboxylesterases to non-toxic products — this dual pathway accounts for its relatively low mammalian toxicity compared with parathion.',
      adverse_effects: 'In high-dose exposure: SLUDGE, nicotinic effects (fasciculations, paralysis), CNS toxicity — same spectrum as parathion but less potent. Dermatitis with prolonged skin contact.',
      clinical_use: 'Topical treatment for head lice (pediculosis capitis) and scabies. Agricultural insecticide. Toxicological understanding required for poisoning management.',
      memory_hook: 'The dusting-cart is far less dangerous than parathion\'s barrels because the mammalian body\'s repair-squad (carboxylesterases) breaks the poison down before it can flood the swamp fully.',
      source: 'G&G 14e, ch. 12',
      high_yield: false,
    },
    {
      id: 'pralidoxime',
      district: 'cholinergic',
      building: 'the 2-PAM reactivation clinic at the antidote jetty',
      class: 'AChE reactivator (oxime); organophosphate antidote',
      mechanism: 'Binds the phosphorylated serine of AChE (after OP poisoning) and cleaves the phosphoryl-enzyme bond, releasing free active AChE. Must be given early, before "aging" of the phosphorylated enzyme occurs (aging time varies: rapid for soman, slower for parathion). Primarily reverses nicotinic (NMJ) and CNS effects; atropine handles the muscarinic effects.',
      adverse_effects: 'Dizziness; blurred vision; tachycardia; hypertension; muscle weakness if given too rapidly (can itself cause NMJ blockade at high doses).',
      clinical_use: 'Organophosphate poisoning (adjunct to atropine — given as early as possible); nerve agent exposure (in combination with atropine and diazepam). Must be given before enzyme "aging" renders it ineffective.',
      memory_hook: 'The reactivation clinic at the antidote jetty can unplug the phosphoryl bolt from the AChE machine — but only if the ambulance arrives before the aged lock rusts shut permanently.',
      source: 'G&G 14e, ch. 12',
      high_yield: false,
    },
    {
      id: 'botulinum_toxin',
      district: 'cholinergic',
      building: 'the sealed presynaptic vault under the NMJ bridge',
      class: 'Presynaptic neurotoxin; zinc endopeptidase (Clostridium botulinum)',
      mechanism: 'Cleaves SNARE proteins (SNAP-25 for serotypes A and E; synaptobrevin/VAMP for serotypes B, D, F, G) required for docking and fusion of ACh-containing vesicles with the presynaptic membrane. ACh release is abolished → flaccid paralysis. Effects are long-lasting (weeks to months) until new nerve terminal sprouts form.',
      adverse_effects: 'Flaccid paralysis (including respiratory muscles — risk of respiratory failure in botulism); dysphagia; diplopia; ptosis; systemic spread when used therapeutically (distant weakness, dysphagia).',
      clinical_use: 'Therapeutic uses: focal dystonia (cervical dystonia, blepharospasm); spasticity; cosmetic (glabellar lines); hyperhidrosis; achalasia; overactive bladder; chronic migraine prophylaxis.',
      memory_hook: 'The presynaptic vault is bricked shut from the inside by the toxin — vesicles queue at the door forever but the SNARE drawbridge has been cut and ACh never reaches the synapse.',
      source: 'G&G 14e, ch. 12',
      high_yield: false,
    },
  ],
};

if (typeof window !== 'undefined') window.DISTRICT_CHOLINERGIC = DISTRICT_CHOLINERGIC;

// Animation registration — rain particles + water plane
if (typeof window !== 'undefined' && window.PHARMA?.animations) {
  window.PHARMA.animations.register('cholinergic', ({ THREE, scene, groupRoot, primitives, loop }) => {
    // Water plane in the centre
    const water = primitives.water({ radius: 18, color: 0x378ADD });
    water.position.y = 0.15;
    groupRoot.add(water);
    // Rain particles
    const rainCount = 80;
    const positions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      positions[i*3] = (Math.random() - 0.5) * 40;
      positions[i*3+1] = Math.random() * 20 + 5;
      positions[i*3+2] = (Math.random() - 0.5) * 40;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const rain = new THREE.Points(geom, new THREE.PointsMaterial({ color: 0x85B7EB, size: 0.3, transparent: true, opacity: 0.7 }));
    groupRoot.add(rain);
    const onTick = (dt) => {
      const pos = rain.geometry.attributes.position.array;
      for (let i = 0; i < rainCount; i++) {
        pos[i*3+1] -= 18 * dt;
        if (pos[i*3+1] < 0.5) pos[i*3+1] = 22;
      }
      rain.geometry.attributes.position.needsUpdate = true;
      // Water ripple via scale pulse
      const s = 1 + Math.sin(performance.now()/1000 * 1.2) * 0.02;
      water.scale.set(s, 1, s);
    };
    loop.add(onTick);
  });
}
