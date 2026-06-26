const DISTRICT_ADRENERGIC = {
  id: 'adrenergic',
  name: 'Adrenergic',
  theme_line: 'Power plant with stacks, lightning · fight-or-flight',
  walkthrough: `The adrenergic district is the city's emergency electrical grid — the power plant whose turbines spin up the moment a threat is detected. Smokestacks belch pale plumes against the sky, a giant copper generator hums at the centre, and every building is wired with thick cables that carry the sympathetic signal outward: faster heart, higher pressure, wider airways, dilated pupils, blood shunted from gut to muscle. Catecholamines are the plant's primary fuels — adrenaline blazes from the main generator in all directions, noradrenaline drives the high-pressure transmission lines to the periphery, dopamine runs the sub-station that serves the renal and cardiac districts, and dobutamine spins a dedicated turbine for the failing heart. On the eastern wall, the selective sympathomimetics occupy smaller booster stations: phenylephrine wired only to the α1 vasoconstrictor circuit; salbutamol patched exclusively into the β2 airway-dilation relay; clonidine operating as a paradoxical central breaker that quiets the whole plant by activating the brain's α2 auto-inhibitory governor.

Across the service road stand the antagonists — the circuit breakers and dampeners. Alpha-blocker Row runs a series of parallel switches: phenoxybenzamine clamps the α lines permanently before surgery, phentolamine clips them reversibly in the operating theatre, and prazosin selectively silences only the α1 downstream load without touching presynaptic feedback. Beta-blocker Boulevard is longer still: propranolol throws the master β1/β2 breaker and is CONTRAINDICATED in asthma because it locks the β2 airway-relaxation relay open in reverse; metoprolol, atenolol, and esmolol throw only the cardiac β1 breaker with progressively shorter levers; labetalol and carvedilol throw both the α and β breakers simultaneously, making them the go-to tools when the whole grid is dangerously overloaded in hypertensive emergencies and heart failure.`,
  palette: { ground: 0xD4A857, accent: 0xE8550A, water: 0x8B6914 },
  position: { x: 30, z: 0 },
  classification: {
    sources: [
      {
        label: 'G&G 14e',
        cite: 'ch. 14–15',
        groups: [
          { heading: 'A. Adrenergic agonists (sympathomimetics)', groups: [
            { heading: 'By mechanism', groups: [
              { heading: 'Direct-acting', drugs: ['Adrenaline', 'Noradrenaline', 'Isoprenaline', 'Dopamine', 'Dobutamine', 'Phenylephrine', 'Clonidine', 'Salbutamol'] },
              { heading: 'Indirect-acting', drugs: ['Tyramine', 'Amphetamine', 'Cocaine'] },
              { heading: 'Mixed-acting', drugs: ['Ephedrine', 'Pseudoephedrine'] },
            ]},
            { heading: 'By receptor selectivity', groups: [
              { heading: 'α1 agonists', drugs: ['Phenylephrine', 'Methoxamine'] },
              { heading: 'α2 agonists (central)', drugs: ['Clonidine', 'Methyldopa', 'Dexmedetomidine'] },
              { heading: 'β1 agonists', drugs: ['Dobutamine'] },
              { heading: 'β2 agonists', drugs: ['Salbutamol', 'Terbutaline', 'Salmeterol'] },
            ]},
          ]},
          { heading: 'B. Adrenergic antagonists (sympatholytics)', groups: [
            { heading: 'α-blockers', groups: [
              { heading: 'Non-selective', drugs: ['Phenoxybenzamine (irreversible)', 'Phentolamine (reversible)'] },
              { heading: 'Selective α1', drugs: ['Prazosin', 'Tamsulosin', 'Doxazosin'] },
            ]},
            { heading: 'β-blockers', groups: [
              { heading: 'Non-selective (β1+β2)', drugs: ['Propranolol', 'Timolol', 'Pindolol (ISA)'] },
              { heading: 'Selective β1 (cardioselective)', drugs: ['Metoprolol', 'Atenolol', 'Esmolol'] },
              { heading: 'Combined α+β', drugs: ['Labetalol', 'Carvedilol'] },
            ]},
          ]},
        ],
      },
      {
        label: 'KDT 8e/9e',
        cite: 'ch. 9–10',
        groups: [
          { heading: 'A. Adrenergic (sympathomimetic) drugs', groups: [
            { heading: 'Directly acting', groups: [
              { heading: 'α + β (catecholamines)', drugs: ['Adrenaline', 'Noradrenaline', 'Dopamine', 'Dobutamine'] },
              { heading: 'Predominant α', drugs: ['Phenylephrine', 'Methoxamine', 'Xylometazoline'] },
              { heading: 'Predominant β', drugs: ['Isoprenaline', 'Salbutamol', 'Terbutaline', 'Salmeterol'] },
              { heading: 'Central α2', drugs: ['Clonidine', 'Methyldopa'] },
            ]},
            { heading: 'Indirectly acting', drugs: ['Tyramine'] },
            { heading: 'Mixed acting', drugs: ['Ephedrine', 'Amphetamine', 'Pseudoephedrine'] },
          ]},
          { heading: 'B. Antiadrenergic (sympatholytic) drugs', groups: [
            { heading: 'α-adrenergic blockers', groups: [
              { heading: 'Non-equilibrium (irreversible)', drugs: ['Phenoxybenzamine'] },
              { heading: 'Equilibrium (reversible) — non-selective', drugs: ['Phentolamine', 'Tolazoline'] },
              { heading: 'Selective α1', drugs: ['Prazosin', 'Terazosin', 'Doxazosin', 'Tamsulosin'] },
              { heading: 'Selective α2', drugs: ['Yohimbine'] },
              { heading: 'Ergot alkaloids', drugs: ['Ergotamine', 'Ergometrine'] },
            ]},
            { heading: 'β-adrenergic blockers', groups: [
              { heading: 'Non-selective', drugs: ['Propranolol', 'Timolol', 'Pindolol', 'Sotalol'] },
              { heading: 'Cardioselective (β1)', drugs: ['Metoprolol', 'Atenolol', 'Esmolol', 'Bisoprolol', 'Nebivolol'] },
              { heading: 'With additional α-blockade', drugs: ['Labetalol', 'Carvedilol'] },
            ]},
            { heading: 'Adrenergic neurone blockers', drugs: ['Reserpine', 'Guanethidine'] },
          ]},
        ],
      },
    ],
  },
  drugs: [
    // ─── CLASS A: CATECHOLAMINES / DIRECT ALPHA+BETA AGONISTS ────────────────

    {
      id: 'adrenaline',
      district: 'adrenergic',
      building: 'the main copper generator at the centre of the power plant',
      class: 'Endogenous catecholamine; direct agonist at α1, α2, β1, β2, and β3 adrenoceptors',
      mechanism: 'Acts at all adrenoceptor subtypes. α1 activation: vasoconstriction, mydriasis, glycogenolysis. α2 activation: presynaptic inhibition, platelet aggregation. β1 activation: increased heart rate (positive chronotropy), contractility (positive inotropy), AV conduction. β2 activation: bronchodilation, vasodilation in skeletal muscle, uterine relaxation, glycogenolysis. β3: lipolysis. At low doses β2 effects predominate (fall in diastolic BP); at high doses α1 effects dominate (rise in systolic and diastolic BP). Rapidly inactivated by MAO and COMT.',
      adverse_effects: 'Hypertensive crisis; tachycardia and palpitations; ventricular arrhythmias; headache; anxiety; pulmonary oedema; local tissue necrosis if extravasated. Potentially fatal in patients on non-selective β-blockers — unopposed α-vasoconstriction causes severe hypertension.',
      clinical_use: 'Anaphylaxis (first-line IM injection into the anterolateral thigh; patients on non-selective β-blockers may be refractory and require IV glucagon as rescue, since glucagon raises cardiac cAMP through a non-adrenergic receptor); cardiac arrest (IV/IO in ACLS); bronchospasm unresponsive to β2 agonists; croup (nebulised racemic adrenaline); adjunct to local anaesthetics (prolongs block by vasoconstriction); open-angle glaucoma (topical, reduces aqueous production via α2 and increases outflow).',
      memory_hook: 'The main generator at the city centre throws every switch at once — α, β1, β2 all blazing simultaneously — because anaphylaxis is the city\'s maximum emergency and the full grid must come online.',
      source: 'G&G 14e, ch. 13',
      high_yield: true,
    },
    {
      id: 'noradrenaline',
      district: 'adrenergic',
      building: 'the high-pressure transmission tower at the north wall of the plant',
      class: 'Endogenous catecholamine; direct agonist at α1, α2, and β1 adrenoceptors',
      mechanism: 'Potent α1 and α2 agonist causing marked peripheral vasoconstriction; β1 agonist increasing cardiac contractility and heart rate. Minimal β2 activity — no bronchodilation. Vasopressor effect raises both systolic and diastolic BP; reflex bradycardia via baroreceptors often overrides the direct β1 chronotropic effect. Metabolised by MAO and COMT.',
      adverse_effects: 'Severe peripheral vasoconstriction; ischaemia of extremities; tissue necrosis if extravasated (treat with local phentolamine infiltration); reflex bradycardia; hypertension; reduced renal and mesenteric blood flow.',
      clinical_use: 'Septic shock (first-line vasopressor when systemic vascular resistance is low); distributive shock states to restore mean arterial pressure. Given via central venous catheter to avoid extravasation necrosis.',
      memory_hook: 'The high-pressure transmission tower has no β2 outlet — it sends current only along the thick α1 constrictor cables and the β1 cardiac line, pushing pressure through the whole grid without relaxing the airways.',
      source: 'G&G 14e, ch. 13',
      high_yield: true,
    },
    {
      id: 'dopamine',
      district: 'adrenergic',
      building: 'the dose-dependent sub-station with three parallel circuit panels',
      class: 'Endogenous catecholamine; dose-dependent agonist at D1, D2, β1, and α1 receptors',
      mechanism: 'Dose-dependent receptor activation: at low doses, predominantly D1 renal and mesenteric vasodilation; at moderate doses, β1 cardiac stimulation increasing contractility and heart rate; at high doses, α1 vasoconstriction predominates. Precursor to noradrenaline. Does not cross the BBB. CAVEAT: The concept of "renal-dose dopamine" as a renoprotective strategy is not supported by robust clinical evidence — meta-analyses and major trials have not shown benefit in preventing acute kidney injury or reducing mortality.',
      adverse_effects: 'Tachycardia; ventricular arrhythmias; nausea and vomiting; hypertension at high doses; peripheral ischaemia; tissue necrosis on extravasation.',
      clinical_use: 'Haemodynamic support in cardiogenic shock and severe heart failure with hypotension (particularly when both cardiac output augmentation and vasopressor effects are needed). Use has declined with evidence favouring noradrenaline as first-line vasopressor in septic shock.',
      memory_hook: 'The sub-station\'s three circuit panels light up one at a time as the dose dial turns: the renal panel (D1) first, then the cardiac panel (β1), then the constrictor panel (α1) — three different machines in one building.',
      source: 'G&G 14e, ch. 13',
      high_yield: true,
    },
    {
      id: 'dobutamine',
      district: 'adrenergic',
      building: 'the dedicated cardiac turbine house adjacent to the main generator',
      class: 'Synthetic catecholamine; predominantly β1-selective agonist (also weak α1 and β2)',
      mechanism: 'Racemate: (+) isomer is a potent β1 and β2 agonist and weak α1 antagonist; (−) isomer is a potent α1 agonist. Net effect: positive inotropy (β1) with modest chronotropy and some peripheral vasodilation (β2), reducing afterload. Cardiac output increases without a major rise in heart rate. Limited vasoconstrictor or vasodilatory net effect peripherally.',
      adverse_effects: 'Tachycardia; ventricular arrhythmias; headache; angina (increased myocardial oxygen demand); hypertension (with high doses); tolerance with prolonged infusion (desensitisation).',
      clinical_use: 'Acute decompensated heart failure with low cardiac output (cardiogenic shock) when inotropic support is needed; stress echocardiography (pharmacological stress testing to unmask myocardial ischaemia).',
      memory_hook: 'The cardiac turbine house runs on β1 fuel — it spins the heart harder without tightening the distribution cables much — exactly what the failing ventricle needs: more output, not more resistance.',
      source: 'G&G 14e, ch. 13',
      high_yield: true,
    },
    {
      id: 'isoprenaline',
      district: 'adrenergic',
      building: 'the non-selective β relay station near the old conduction yard',
      class: 'Synthetic catecholamine; non-selective β1 and β2 agonist',
      mechanism: 'Pure non-selective β agonist with no α activity. β1 effects: increases heart rate, contractility, AV conduction velocity (accelerates pacemaker firing and conduction). β2 effects: bronchodilation, peripheral vasodilation (reduces diastolic BP). Increases cardiac output but reduces peripheral resistance; overall BP effect varies. Rapidly inactivated by COMT (not MAO-sensitive at therapeutic doses).',
      adverse_effects: 'Tachycardia; palpitations; ventricular arrhythmias; widening pulse pressure; headache; tremor; potentially worsens ischaemia by increasing demand while reducing diastolic filling pressure.',
      clinical_use: 'Complete heart block and AV nodal re-entry when pacing is unavailable or pending (accelerates ventricular escape rate). Torsades de pointes (increases heart rate, shortening QTc and reducing the pause-dependent trigger). Historical use in asthma — superseded by selective β2 agonists. Largely replaced by electrical pacing in clinical practice.',
      memory_hook: 'The non-selective β relay station feeds current into both the cardiac conduction yard (β1) and the airway-relaxation grid (β2) — it is the old-fashioned all-β switch when the heart\'s own pacemaker has failed.',
      source: 'G&G 14e, ch. 13',
      high_yield: true,
    },

    // ─── CLASS B: SELECTIVE SYMPATHOMIMETICS ────────────────────────────────

    {
      id: 'phenylephrine',
      district: 'adrenergic',
      building: 'the α1-only vasoconstrictor booster station at the east gate',
      class: 'Selective α1 adrenoceptor agonist (direct-acting); not a catecholamine',
      mechanism: 'Direct α1 agonist with negligible β activity. Causes arterial and venous constriction → raises both systolic and diastolic BP. Reflex bradycardia occurs via baroreceptors (no direct tachycardia). Vasoconstricts nasal mucosa (decongestant effect). Not a catecholamine — not metabolised by COMT — longer duration than catecholamines when given topically.',
      adverse_effects: 'Reflex bradycardia; hypertension; reduced cardiac output (increased afterload); headache; urinary retention in BPH; rebound nasal congestion with prolonged topical use.',
      clinical_use: 'Hypotension during spinal/general anaesthesia (IV bolus to restore BP without tachycardia); nasal decongestant (topical, OTC); mydriasis for ophthalmic examination (topical); paroxysmal supraventricular tachycardia (increases BP → vagal reflex terminates SVT — historical).',
      memory_hook: 'The α1-only booster station has one cable and one dial — no β output at all — pure vasoconstriction, which makes it the clean choice when you need pressure without heart-rate acceleration.',
      source: 'G&G 14e, ch. 13',
      high_yield: true,
    },
    {
      id: 'salbutamol',
      district: 'adrenergic',
      building: 'the β2 airway-dilation relay at the top of the respiratory stack',
      class: 'Selective β2 adrenoceptor agonist (short-acting); not a catecholamine',
      mechanism: 'Selective β2 agonist: relaxes bronchial smooth muscle (bronchodilation), stabilises mast cells (reduces mediator release), and relaxes uterine smooth muscle (tocolytic effect). At therapeutic inhaled doses has minimal β1 cardiac stimulation. Onset 5–15 min when inhaled; duration ~4–6 hours. Also activates β2 in skeletal muscle → tremor, and β2-mediated K+ uptake → hypokalaemia with high doses.',
      adverse_effects: 'Fine tremor (β2 skeletal muscle); tachycardia and palpitations (β1 spillover at high doses); hypokalaemia (β2 uptake in muscle — important in acute asthma); headache; paradoxical bronchospasm (rare, with propellant hypersensitivity).',
      clinical_use: 'Acute asthma and COPD exacerbations (first-line bronchodilator); exercise-induced bronchospasm prophylaxis; hyperkalaemia (nebulised, drives K+ intracellularly); tocolysis in premature labour (though terbutaline more commonly cited for this in some regions).',
      memory_hook: 'The β2 relay at the top of the respiratory stack has only one output cable running to the airways — when the stack pressure builds (bronchospasm), turning this dial open blows the airway wide again.',
      source: 'G&G 14e, ch. 13',
      high_yield: true,
    },
    {
      id: 'clonidine',
      district: 'adrenergic',
      building: 'the central α2 auto-inhibitory governor on the control room roof',
      class: 'Selective α2 adrenoceptor agonist (centrally-acting sympatholytic)',
      mechanism: 'Agonist at presynaptic α2 adrenoceptors in the locus coeruleus and nucleus tractus solitarius → reduces CNS sympathetic outflow → fall in heart rate and peripheral vascular resistance → antihypertensive effect. Also activates peripheral α2 receptors. Imidazoline receptor agonism may contribute to antihypertensive effect. Analgesic adjunct via spinal α2 receptors. For ADHD: reduces noradrenergic prefrontal hyperactivity.',
      adverse_effects: 'Sedation; dry mouth; dizziness; constipation; sexual dysfunction; rebound hypertension on abrupt withdrawal (due to rebound sympathetic surge) — must be tapered. Bradycardia.',
      clinical_use: 'Hypertension (especially in patients with renal disease or sympathetic overactivity); ADHD (second-line, particularly when stimulants are contraindicated or for tic control); opioid and alcohol withdrawal (reduces sympathetic symptoms); peri-operative analgesia (epidural/intrathecal); menopausal hot flushes.',
      memory_hook: 'The governor on the control room roof activates the α2 auto-inhibitory circuit — it tells the plant to slow down its own output — less current leaves the adrenergic district when this governor is turned on.',
      source: 'G&G 14e, ch. 13',
      high_yield: true,
    },
    {
      id: 'methyldopa',
      district: 'adrenergic',
      building: 'the α-methylnoradrenaline synthesis tower near the control room',
      class: 'Centrally-acting antihypertensive; prodrug — false neurotransmitter (α2 agonist after conversion)',
      mechanism: 'Prodrug: crosses the BBB and is converted by DOPA decarboxylase and dopamine β-hydroxylase to α-methylnoradrenaline, a potent central α2 agonist. Acts in the nucleus tractus solitarius to reduce sympathetic outflow and peripheral vascular resistance. Does not block peripheral adrenoceptors directly. Also mildly reduces plasma renin activity.',
      adverse_effects: 'Sedation; dry mouth; positive Coombs test (in up to 20% of patients — direct antiglobulin test becomes positive; haemolytic anaemia occurs in ~1%); drug-induced lupus; hepatitis (rare but serious); sexual dysfunction; rebound hypertension on abrupt withdrawal (less severe than clonidine). Avoid in phaeochromocytoma.',
      clinical_use: 'Hypertension in pregnancy (first-line choice alongside labetalol — extensive safety data in pregnancy, does not harm the fetus); also used in breastfeeding. Historical use in general hypertension largely superseded by newer agents.',
      memory_hook: 'The synthesis tower converts the raw dopamine feedstock into the false neurotransmitter that silences the control room — a Trojan horse that looks like noradrenaline but acts as an α2 brake.',
      source: 'G&G 14e, ch. 13',
      high_yield: false,
    },
    {
      id: 'terbutaline',
      district: 'adrenergic',
      building: 'the β2 tocolysis relay at the southern uterine sub-circuit',
      class: 'Selective β2 adrenoceptor agonist (direct-acting); not a catecholamine',
      mechanism: 'Selective β2 agonist; same receptor profile as salbutamol. Relaxes uterine smooth muscle (myometrial β2 receptors) by increasing cAMP → reduces uterine contractions. Also bronchodilates. Oral, subcutaneous, and inhaled formulations available. Slower onset than salbutamol when inhaled.',
      adverse_effects: 'Tremor; tachycardia; palpitations; hypokalaemia; hyperglycaemia; pulmonary oedema (risk with IV use in tocolysis); headache. The FDA has warned against use of terbutaline for tocolysis beyond 48–72 hours or in the outpatient setting due to cardiac adverse events.',
      clinical_use: 'Tocolysis (short-term suppression of preterm labour to allow antenatal corticosteroids and transfer); acute asthma (subcutaneous injection when inhaled route is unavailable); bronchospasm in COPD.',
      memory_hook: 'The tocolysis relay runs a β2 cable down to the uterus — it quiets the myometrial contractions the way salbutamol quiets the bronchi — both are β2 relays, just different destinations.',
      source: 'G&G 14e, ch. 13',
      high_yield: false,
    },

    // ─── CLASS C: ALPHA-BLOCKERS ─────────────────────────────────────────────

    {
      id: 'phenoxybenzamine',
      district: 'adrenergic',
      building: 'the irreversible α-clamp forge at the pre-operative staging yard',
      class: 'Non-selective, non-competitive (irreversible) α-adrenoceptor antagonist; haloalkylamine',
      mechanism: 'Forms a covalent bond with α1 and α2 adrenoceptors via alkylation of the receptor → irreversible blockade. Because the block is insurmountable, exogenous catecholamines cannot overcome it even at high doses. Duration of action determined by synthesis of new receptors (~24–48 hours). Blocks presynaptic α2 receptors → increases NE release (reflex tachycardia).',
      adverse_effects: 'Orthostatic hypotension; reflex tachycardia; nasal congestion; miosis; retrograde ejaculation; fatigue. Prolonged effect means adverse effects are long-lasting.',
      clinical_use: 'Preoperative management of phaeochromocytoma (given for 1–2 weeks before surgery to prevent intraoperative hypertensive crises from catecholamine surges); must be combined with a β-blocker ONLY after α-blockade is established — giving β-blocker first or alone leaves α-receptors unopposed → severe hypertension. Also used in chronic management when surgery is not feasible.',
      memory_hook: 'The irreversible clamp forge welds the α1 and α2 breakers shut permanently — no catecholamine surge during the phaeochromocytoma resection can force them open again, because the weld cannot be broken by force alone.',
      source: 'G&G 14e, ch. 14',
      high_yield: true,
    },
    {
      id: 'phentolamine',
      district: 'adrenergic',
      building: 'the reversible α-clip station in the intra-operative control bay',
      class: 'Non-selective, competitive (reversible) α-adrenoceptor antagonist',
      mechanism: 'Competitive antagonist at α1 and α2 adrenoceptors. Block is surmountable by high catecholamine concentrations. Short duration of action (~15–20 minutes IV). Blocks presynaptic α2 receptors → reflex increase in NE release and tachycardia. Can be reversed by large doses of agonists (unlike phenoxybenzamine).',
      adverse_effects: 'Hypotension (potentially severe); reflex tachycardia; angina (tachycardia increases demand); nasal stuffiness; nausea; GI upset.',
      clinical_use: 'Intraoperative hypertensive crises during phaeochromocytoma surgery (IV boluses to control catecholamine-surge hypertension); treatment of extravasation injury from vasopressors (noradrenaline, dopamine) — local infiltration with phentolamine reverses α1-mediated vasoconstriction and prevents tissue necrosis; diagnosis of phaeochromocytoma (historical phentolamine suppression test — superseded by biochemical testing).',
      memory_hook: 'The reversible clip station snaps on and off in minutes — perfect for the operating theatre where the surgeon needs precise, titratable α-blockade during the tumour manipulation, not a permanent forge weld.',
      source: 'G&G 14e, ch. 14',
      high_yield: true,
    },
    {
      id: 'prazosin',
      district: 'adrenergic',
      building: 'the selective α1 downstream load-switch on the arterial distribution board',
      class: 'Selective α1 adrenoceptor antagonist (competitive)',
      mechanism: 'Competitive antagonist at α1 adrenoceptors on vascular smooth muscle → vasodilation (both arterial and venous); reduces peripheral vascular resistance. Selective for α1: does not block presynaptic α2 receptors, so negative feedback on NE release is preserved → less reflex tachycardia than non-selective α blockers. Also relaxes smooth muscle of bladder neck and prostate.',
      adverse_effects: 'First-dose phenomenon: severe orthostatic hypotension and syncope, especially with the first dose (must be taken at bedtime); dizziness; headache; palpitations; fluid retention (chronic use).',
      clinical_use: 'Benign prostatic hyperplasia (relaxes bladder neck and prostatic smooth muscle, improves urinary flow); hypertension (less commonly used now — inferior cardiovascular outcomes vs. other agents in ALLHAT trial); PTSD-related nightmares (α1 blockade in amygdala reduces nightmare frequency); Raynaud\'s phenomenon.',
      memory_hook: 'The α1 load-switch is wired only downstream — it relaxes the arterial and prostatic load without touching the presynaptic α2 feedback wire — less tachycardia, a cleaner cut.',
      source: 'G&G 14e, ch. 14',
      high_yield: true,
    },

    // ─── CLASS D: BETA-BLOCKERS ──────────────────────────────────────────────

    {
      id: 'propranolol',
      district: 'adrenergic',
      building: 'the non-selective β1/β2 master circuit breaker in the control room',
      class: 'Non-selective β1 and β2 adrenoceptor antagonist; no intrinsic sympathomimetic activity; membrane-stabilising',
      mechanism: 'Competitive antagonist at both β1 and β2 receptors. β1 blockade: reduces heart rate, contractility, AV conduction velocity, and renin release. β2 blockade: bronchoconstriction (clinically significant in asthma/COPD), blocks β2-mediated vasodilation in muscle and glycogenolysis/gluconeogenesis (can mask hypoglycaemia symptoms, blunts catecholamine response to hypoglycaemia). Membrane-stabilising (quinidine-like) effect at high doses — anti-arrhythmic class II. High lipid solubility → crosses BBB well (CNS effects, nightmares).',
      adverse_effects: 'Bradycardia; heart block; fatigue; cold extremities; sexual dysfunction; nightmares; depression; CONTRAINDICATED in asthma and reactive airways disease (β2 blockade causes potentially fatal bronchoconstriction); worsens peripheral arterial disease; masks tachycardia of hypoglycaemia; avoid abrupt withdrawal (rebound tachycardia, angina, MI). AVOID combination with cocaine (β-blockade leaves α-vasoconstriction unopposed → severe hypertension and coronary spasm).',
      clinical_use: 'Hypertension; angina; post-MI cardioprotection; supraventricular tachycardias (AF rate control); essential tremor; performance anxiety (situational); thyroid storm (blocks peripheral T4→T3 conversion and sympathetic effects of thyroid hormones); portal hypertension (prevention of variceal bleeding); migraine prophylaxis; phaeochromocytoma (only after α-blockade is established).',
      memory_hook: 'The master breaker trips the entire β grid — β1 and β2 simultaneously — which is why it is CONTRAINDICATED in asthma: throwing the β2 breaker locks the airway-relaxation relay permanently off, and the breathing circuit shorts.',
      source: 'G&G 14e, ch. 14',
      high_yield: true,
    },
    {
      id: 'metoprolol',
      district: 'adrenergic',
      building: 'the β1-selective cardiac breaker on the heart-circuit panel',
      class: 'Cardioselective (β1-selective) β-adrenoceptor antagonist; no intrinsic sympathomimetic activity',
      mechanism: 'Selective competitive antagonist at β1 receptors. At therapeutic doses has minimal β2 blockade. β1 blockade reduces heart rate, contractility, renin release. Selectivity is dose-dependent — lost at high doses. Moderate lipid solubility (crosses BBB, some CNS side effects). Metabolised by CYP2D6 — poor metabolisers have higher plasma levels.',
      adverse_effects: 'Bradycardia; fatigue; dizziness; cold extremities (less than propranolol); bronchospasm (less than propranolol but still possible at high doses in severe asthma — use with caution, not a blanket contraindication at low doses); impotence; depression.',
      clinical_use: 'Heart failure with reduced ejection fraction (HFrEF — metoprolol succinate extended-release reduces mortality in stable HF); post-MI (reduces reinfarction and sudden death); hypertension; angina; AF rate control; hyperthyroidism.',
      memory_hook: 'The β1-selective cardiac breaker snaps only the heart-circuit lines — the airway-relaxation β2 cables remain intact at therapeutic doses, making it safer than propranolol in mild reactive airways disease.',
      source: 'G&G 14e, ch. 14',
      high_yield: true,
    },
    {
      id: 'atenolol',
      district: 'adrenergic',
      building: 'the hydrophilic β1 peripheral relay with minimal brain wiring',
      class: 'Cardioselective (β1-selective) β-adrenoceptor antagonist; no intrinsic sympathomimetic activity; hydrophilic',
      mechanism: 'Competitive β1 selective antagonist. Highly hydrophilic — does not cross the BBB well → fewer CNS adverse effects (less depression, fewer nightmares than propranolol). Renally excreted (dose reduction in renal impairment). Similar β1 blockade to metoprolol but lower CNS penetration.',
      adverse_effects: 'Bradycardia; fatigue; cold extremities; bronchospasm at high doses; less CNS side effects than propranolol; avoid in severe renal failure (renally cleared).',
      clinical_use: 'Hypertension; angina; post-MI; rate control in atrial fibrillation; useful when CNS side effects of lipid-soluble β-blockers are problematic.',
      memory_hook: 'The hydrophilic peripheral relay runs its β1 cables to the heart and blood vessels but barely any wire reaches the brain — fewer nightmares, less depression, because the signal stays peripheral.',
      source: 'G&G 14e, ch. 14',
      high_yield: true,
    },
    {
      id: 'esmolol',
      district: 'adrenergic',
      building: 'the ultra-short-acting β1 emergency breaker on the intra-operative panel',
      class: 'Cardioselective (β1-selective) β-adrenoceptor antagonist; ultra-short-acting (t½ ~9 minutes)',
      mechanism: 'Competitive β1 selective antagonist. Rapidly hydrolysed by red blood cell esterases to an inactive acid metabolite → extremely short half-life (~9 minutes). Onset within 60 seconds of IV bolus. Allows precise, titratable heart rate and blood pressure control. Eliminated independently of renal or hepatic function.',
      adverse_effects: 'Bradycardia; hypotension; brief duration means adverse effects are rapidly reversible on stopping infusion; pain at injection site (local irritant); bronchospasm (at high doses); avoid in severe asthma.',
      clinical_use: 'Intraoperative and perioperative tachycardia and hypertension; acute aortic dissection (rate control to reduce aortic wall stress); AF with rapid ventricular response (acute rate control); supraventricular tachycardia; thyroid storm (adjunct).',
      memory_hook: 'The ultra-short emergency breaker is designed to be thrown and re-set within minutes — red cell esterases rapidly destroy it, so a 9-minute half-life gives total control: stop the infusion and the heart rate comes right back.',
      source: 'G&G 14e, ch. 14',
      high_yield: true,
    },
    {
      id: 'labetalol',
      district: 'adrenergic',
      building: 'the combined α/β dual-mode breaker at the hypertensive emergency switchboard',
      class: 'Mixed α1, β1, and β2 adrenoceptor antagonist (α:β ratio approximately 1:3 IV, 1:7 oral)',
      mechanism: 'Competitive antagonist at α1, β1, and β2 receptors. α1 blockade reduces peripheral vascular resistance; β1 blockade reduces heart rate and cardiac output; β2 blockade is also present. The combination reduces BP without the reflex tachycardia seen with pure α blockers. Does not increase AV nodal conduction time markedly. Some partial β2 agonist activity may preserve some β2-mediated bronchodilation but still USE WITH CAUTION in asthma.',
      adverse_effects: 'Orthostatic hypotension; bradycardia; bronchoconstriction (β2 block — avoid in severe asthma/COPD); dizziness; scalp tingling; hepatotoxicity (rare, with IV use); neonatal bradycardia (crosses placenta).',
      clinical_use: 'Hypertensive emergencies (IV infusion — allows rapid, titratable BP reduction); hypertension in pregnancy (oral — well-established safety, along with methyldopa; IV for eclampsia/pre-eclampsia); phaeochromocytoma (combined α+β effect useful — though phenoxybenzamine preferred preoperatively).',
      memory_hook: 'The dual-mode breaker trips both the α constrictor switch and the β cardiac switch simultaneously — the pressure drops and the heart slows together, making it the go-to tool when the whole grid is dangerously overloaded in pregnancy or hypertensive crisis.',
      source: 'G&G 14e, ch. 14',
      high_yield: true,
    },
    {
      id: 'carvedilol',
      district: 'adrenergic',
      building: 'the antioxidant-coated combined α/β heart-failure breaker at the western battery room',
      class: 'Non-selective β1/β2 antagonist + α1 antagonist + antioxidant; third-generation β-blocker',
      mechanism: 'Competitive antagonist at β1, β2, and α1 adrenoceptors. α1 blockade provides vasodilation (reduces afterload). β1 and β2 blockade reduces heart rate and contractility. Additionally has antioxidant properties (scavenges reactive oxygen species — may contribute to cardioprotective benefit in HF). Does not have intrinsic sympathomimetic activity. Metabolised by CYP2D6 and CYP2C9.',
      adverse_effects: 'Bradycardia; hypotension (especially initial doses — start low); dizziness; fatigue; bronchoconstriction (β2 block — avoid in asthma); weight gain; fluid retention on initiation; worsening HF if not yet stabilised.',
      clinical_use: 'Heart failure with reduced ejection fraction (HFrEF — one of three β-blockers with proven mortality benefit in HF alongside metoprolol succinate and bisoprolol); post-MI with LV dysfunction; hypertension.',
      memory_hook: 'The antioxidant-coated battery room runs a triple-function breaker — α1 vasodilation plus β1/β2 cardiac braking plus radical-scavenging — a slower, more expensive unit reserved for the chronically failing heart that cannot afford wasted energy.',
      source: 'G&G 14e, ch. 14',
      high_yield: true,
    },

    // ─── LONG-TAIL ENTRIES ────────────────────────────────────────────────────

    {
      id: 'ephedrine',
      district: 'adrenergic',
      building: 'the mixed-signal heritage booster at the old apothecary corner',
      class: 'Mixed indirect and direct-acting sympathomimetic; non-catecholamine phenylethylamine',
      mechanism: 'Acts both directly (weak α and β agonist) and indirectly (displaces NE from presynaptic vesicles into the synapse). Tachyphylaxis occurs with repeated dosing as NE stores are depleted. Not metabolised by MAO (lacks catechol ring) → longer duration than catecholamines. Crosses the BBB → CNS stimulation.',
      adverse_effects: 'Tachycardia; hypertension; insomnia; anxiety; urinary retention; potential for abuse; tachyphylaxis with repeated dosing.',
      clinical_use: 'Hypotension associated with spinal anaesthesia (bolus IV); nasal congestion (historically); bronchospasm (largely superseded by selective β2 agonists); historically used as a stimulant and in weight-loss formulations.',
      memory_hook: 'The heritage booster fires by emptying the NE store-rooms rather than by direct wiring — effective once, but the stores run out on repeated use and the boost fades.',
      source: 'G&G 14e, ch. 13',
      high_yield: false,
    },
    {
      id: 'cocaine',
      district: 'adrenergic',
      building: 'the noradrenaline reuptake blockade lock-room at the illicit end of the plant',
      class: 'Indirect sympathomimetic; NE reuptake transporter (NET) inhibitor; also local anaesthetic (Na+ channel blocker)',
      mechanism: 'Blocks the noradrenaline transporter (NET) on presynaptic adrenergic nerve terminals, preventing NE reuptake → accumulation of NE in the synapse → prolonged and intense α and β stimulation. Also blocks dopamine and serotonin reuptake (CNS stimulation, euphoria). Unique as the only local anaesthetic that causes vasoconstriction (α1 stimulation via NE accumulation) — hence useful topically in ENT surgery to both anaesthetise and reduce bleeding.',
      adverse_effects: 'Hypertension; tachycardia; coronary vasospasm; myocardial infarction; ventricular arrhythmias; stroke; hyperthermia; CNS excitation → seizures; addiction. AVOID β-blockers in cocaine toxicity — β-blockade leaves α-mediated vasoconstriction and coronary spasm unopposed, potentially worsening cardiac ischaemia.',
      clinical_use: 'Topical anaesthesia for ENT procedures (nasal mucosa, laryngoscopy) where both anaesthesia and vasoconstriction (to reduce bleeding) are needed — the only therapeutic indication.',
      memory_hook: 'The lock-room jams the NE reuptake door shut so noradrenaline floods back into the synapse repeatedly — clinically useful only when you need a local anaesthetic that also constricts blood vessels.',
      source: 'G&G 14e, ch. 13',
      high_yield: false,
    },
    {
      id: 'tyramine',
      district: 'adrenergic',
      building: 'the MAOI interaction warehouse at the dangerous dock of the plant',
      class: 'Indirect sympathomimetic; dietary amine — NE-releasing agent at adrenergic terminals',
      mechanism: 'Normally metabolised in the gut wall and liver by monoamine oxidase A (MAO-A) before reaching systemic circulation. When MAO is inhibited (by MAO inhibitors), tyramine is absorbed intact → enters adrenergic nerve terminals via NET → displaces NE from vesicles → massive NE release → severe hypertension ("cheese reaction"). Tyramine itself is not a therapeutic agent; its importance is pharmacokinetic (illustrates MAO\'s gut-first-pass protective role).',
      adverse_effects: 'In the presence of MAO inhibitors: hypertensive crisis ("cheese reaction") — sudden severe headache, neck stiffness, hypertension → risk of intracerebral haemorrhage. Foods rich in tyramine: aged cheeses, fermented meats, red wine, certain beers, fermented soy products.',
      clinical_use: 'Not used therapeutically. Essential concept for understanding MAO inhibitor drug interactions and dietary restrictions. All patients on non-selective MAO inhibitors must follow a tyramine-restricted diet.',
      memory_hook: 'The MAOI interaction warehouse normally gets decontaminated at the dock gates (MAO in the gut wall) — but when the decontamination crew is blocked by an MAO inhibitor, the tyramine shipment floods the NE store-rooms and the whole plant overloads.',
      source: 'G&G 14e, ch. 13',
      high_yield: false,
    },
    {
      id: 'tamsulosin',
      district: 'adrenergic',
      building: 'the uroselective α1a sub-circuit breaker at the prostatic relay room',
      class: 'Selective α1a adrenoceptor antagonist (uroselective)',
      mechanism: 'Competitive antagonist with higher selectivity for α1a receptors (predominant in prostate, bladder neck, and urethra) than for α1b receptors (predominant in blood vessels). This urosubtype selectivity reduces prostate/urethral smooth muscle tone more than it reduces vascular tone → less orthostatic hypotension than non-selective α1 blockers such as prazosin. Relaxes prostatic smooth muscle → improves urine flow.',
      adverse_effects: 'Retrograde ejaculation (most common — due to α1a blockade of bladder neck and ejaculatory ducts); orthostatic hypotension (less than with prazosin); dizziness; intraoperative floppy iris syndrome (IFIS) — α1a blockade in the iris dilator muscle causes iris prolapse during cataract surgery; surgeon must be warned preoperatively.',
      clinical_use: 'Benign prostatic hyperplasia (first-line pharmacotherapy for lower urinary tract symptoms — improves urine flow and reduces symptom score); ureteric calculi expulsion (off-label — relaxes ureteric smooth muscle).',
      memory_hook: 'The uroselective sub-circuit breaker is wired only to the prostatic relay room, not to the main vascular distribution board — the blood pressure cables stay mostly live, so the patient can stand up without fainting.',
      source: 'G&G 14e, ch. 14',
      high_yield: false,
    },
    {
      id: 'pindolol',
      district: 'adrenergic',
      building: 'the partial-signal β relay with the dimmer switch on the east wall',
      class: 'Non-selective β-adrenoceptor antagonist with intrinsic sympathomimetic activity (ISA)',
      mechanism: 'Competitive antagonist at β1 and β2 receptors but with partial agonist activity (ISA) — it partially stimulates β receptors at baseline while blocking full agonist (catecholamine) effects. At rest (low sympathetic tone): the partial agonism maintains basal heart rate and cardiac output, reducing bradycardia compared to pure antagonists. Under stress (high sympathetic tone): the partial agonist occupies receptors, blocking the full catecholamine response and limiting tachycardia. Net effect is a narrower heart rate range.',
      adverse_effects: 'Less resting bradycardia than pure β-blockers; less cold extremities; bronchoconstriction (β2 partial agonism provides some protection but still can occur); orthostatic hypotension; caution in HF — ISA may be disadvantageous (reduces mortality benefit seen with pure antagonists).',
      clinical_use: 'Hypertension (particularly when resting bradycardia is a concern); augmentation of antidepressants (serotonergic mechanism — pindolol at 5-HT1A receptors desensitises autoreceptors, potentially hastening antidepressant response — limited clinical evidence); angina (less favoured due to ISA).',
      memory_hook: 'The dimmer switch is not fully off — it keeps a small partial current flowing through the β circuit at rest (ISA), preventing the resting bradycardia that pure breakers cause, while still blocking the big surges.',
      source: 'G&G 14e, ch. 14',
      high_yield: false,
    },
  ],
};

if (typeof window !== 'undefined') window.DISTRICT_ADRENERGIC = DISTRICT_ADRENERGIC;

// Animation registration — smokestacks + lightning flash
if (typeof window !== 'undefined' && window.PHARMA?.animations) {
  window.PHARMA.animations.register('adrenergic', ({ THREE, scene, groupRoot, primitives, loop }) => {
    // Three smokestacks at the back of the district puffing pale smoke.
    const stackPositions = [[-8, 0, -10], [0, 0, -12], [8, 0, -10]];
    const allParticles = [];
    stackPositions.forEach(([sx, _, sz]) => {
      for (let i = 0; i < 6; i++) {
        const p = new THREE.Mesh(
          new THREE.SphereGeometry(0.6, 8, 6),
          new THREE.MeshBasicMaterial({ color: 0xD3D1C7, transparent: true, opacity: 0.6 })
        );
        p.userData = { sx, sz, life: Math.random(), speed: 0.05 + Math.random() * 0.04 };
        groupRoot.add(p);
        allParticles.push(p);
      }
    });
    // Lightning flash plane — a wide quad that briefly tints yellow
    const flash = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshBasicMaterial({ color: 0xEF9F27, transparent: true, opacity: 0 })
    );
    flash.rotation.x = -Math.PI / 2;
    flash.position.y = 0.2;
    groupRoot.add(flash);
    let nextFlash = 3 + Math.random() * 4;
    let t = 0;
    loop.add((dt) => {
      t += dt;
      // Smoke rises
      allParticles.forEach((p) => {
        p.userData.life += p.userData.speed * dt * 4;
        if (p.userData.life > 1) p.userData.life = 0;
        const life = p.userData.life;
        p.position.set(
          p.userData.sx + Math.sin(life * 6) * 1.2,
          5 + life * 12,
          p.userData.sz + Math.cos(life * 6) * 1.2
        );
        p.material.opacity = 0.6 * (1 - life);
        const s = 1 + life * 1.4;
        p.scale.set(s, s, s);
      });
      // Lightning flash every ~3-7s, decays over 0.4s
      if (t > nextFlash) {
        flash.material.opacity = 0.45;
        nextFlash = t + 3 + Math.random() * 4;
      } else {
        flash.material.opacity *= Math.exp(-dt * 6);
      }
    });
  });
}
