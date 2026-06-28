const DISTRICT_CVS = {
  id: 'cvs',
  name: 'CVS',
  theme_line: 'Heart plaza · hospital with a heart on the roof',
  walkthrough: `The CVS district is a grand hospital plaza built around a monumental atrium whose glass roof is crowned by a pulsing red heart — visible from every quarter of the city. SA-node Alley runs north from the entrance, its buildings wired in series so that each one fires the next in the conduction cascade: the Vaughan-Williams antiarrhythmic clinics line the alley's sides, each occupying a channel of the electrical grid. At the junction of SA-node Alley and AV-node Junction, adenosine's rapid-response kiosk can throw a circuit-breaker that halts conduction cold for a few heartbeats — enough to cardiovert an SVT before the signal re-routes. Amiodarone's tall iodine-stained tower dominates the north end of the alley, its facade streaked grey from the decades of side-effects deposited there: pulmonary fibrosis on the upper floors, thyroid weather-vanes spinning unpredictably, corneal microdeposit frost on every window.

Ventricular Boulevard runs east from the atrium. On the south side stands the Lipid Clinic — its HMG-CoA reductase laboratories buried three floors underground — and beside it the fibrate gym and the PCSK9 immunotherapy suite. The northern footpath of Ventricular Boulevard is anticoagulant row: heparin's emergency infusion pump stationed at the near end, warfarin's vitamin-K antagonist dispensary in the middle, and the direct oral anticoagulant (DOAC) high-rise — dabigatran, rivaroxaban, and apixaban — at the far end. The central plaza holds the antiplatelet market: aspirin's ancient COX-1 stall, clopidogrel's prodrug conversion counter beside it, and ticagrelor's reversible lock-up across the square. Behind them all, the ACE-inhibitor arcade and the ARB towers filter the renin-angiotensin signal; the CCB promenade — amlodipine's gentle dihydropyridine café and verapamil's stern non-DHP control room — lines the west side. The organic-nitrate dispensary hovers between the coronary and the arteriolar mains, glyceryl trinitrate vapour drifting across the cobblestones every Monday morning.`,
  palette: { ground: 0xF5C2C2, accent: 0xE24B4A, water: 0xC47E7E },
  position: { x: 0, z: 30 },
  classification: {
    sources: [
      {
        label: 'G&G 14e',
        cite: 'ch. 28–37',
        groups: [
          { heading: 'A. Antiarrhythmic drugs (Vaughan-Williams)', groups: [
            { heading: 'Class I — Na+ channel blockers', groups: [
              { heading: 'IA (intermediate kinetics)', drugs: ['Quinidine', 'Procainamide', 'Disopyramide'] },
              { heading: 'IB (fast kinetics)', drugs: ['Lidocaine', 'Mexiletine', 'Phenytoin'] },
              { heading: 'IC (slow kinetics)', drugs: ['Flecainide', 'Propafenone'] },
            ]},
            { heading: 'Class II — β-adrenergic blockers', drugs: ['Propranolol', 'Esmolol', 'Metoprolol'] },
            { heading: 'Class III — K+ channel blockers', drugs: ['Amiodarone', 'Sotalol', 'Dronedarone', 'Dofetilide', 'Ibutilide'] },
            { heading: 'Class IV — Calcium channel blockers', drugs: ['Verapamil', 'Diltiazem'] },
            { heading: 'Miscellaneous', drugs: ['Adenosine', 'Digoxin', 'Magnesium sulfate'] },
          ]},
          { heading: 'B. Drugs for heart failure', groups: [
            { heading: 'ACE inhibitors', drugs: ['Enalapril', 'Ramipril', 'Lisinopril'] },
            { heading: 'Angiotensin receptor blockers (ARBs)', drugs: ['Losartan', 'Valsartan'] },
            { heading: 'Angiotensin receptor–neprilysin inhibitor (ARNI)', drugs: ['Sacubitril/valsartan'] },
            { heading: 'β-blockers', drugs: ['Carvedilol', 'Bisoprolol', 'Metoprolol', 'Nebivolol'] },
            { heading: 'Aldosterone antagonists', drugs: ['Spironolactone', 'Eplerenone'] },
            { heading: 'SGLT2 inhibitors', drugs: ['Dapagliflozin', 'Empagliflozin'] },
            { heading: 'Diuretics', drugs: ['Furosemide'] },
            { heading: 'Cardiac glycosides', drugs: ['Digoxin'] },
            { heading: 'If-channel inhibitor', drugs: ['Ivabradine'] },
            { heading: 'Inotropes / inodilators (acute decompensated HF)', drugs: ['Dobutamine', 'Dopamine', 'Milrinone'] },
            { heading: 'Vasodilators', drugs: ['Hydralazine + Isosorbide dinitrate'] },
          ]},
          { heading: 'C. Antihypertensive drugs', groups: [
            { heading: 'Diuretics', drugs: ['Hydrochlorothiazide', 'Chlorthalidone', 'Furosemide'] },
            { heading: 'ACE inhibitors', drugs: ['Enalapril', 'Ramipril', 'Lisinopril'] },
            { heading: 'Angiotensin receptor blockers (ARBs)', drugs: ['Losartan', 'Valsartan'] },
            { heading: 'Calcium channel blockers', groups: [
              { heading: 'Dihydropyridines', drugs: ['Amlodipine', 'Nifedipine'] },
              { heading: 'Non-dihydropyridines', drugs: ['Verapamil', 'Diltiazem'] },
            ]},
            { heading: 'β-blockers', drugs: ['Metoprolol', 'Atenolol', 'Propranolol'] },
            { heading: 'α-blockers', drugs: ['Prazosin', 'Doxazosin'] },
            { heading: 'Central sympatholytics', drugs: ['Clonidine', 'Methyldopa'] },
            { heading: 'Direct vasodilators', drugs: ['Hydralazine', 'Minoxidil', 'Sodium nitroprusside'] },
          ]},
          { heading: 'D. Antianginal drugs', groups: [
            { heading: 'Nitrates', drugs: ['Nitroglycerin', 'Isosorbide dinitrate', 'Isosorbide mononitrate'] },
            { heading: 'β-blockers', drugs: ['Metoprolol', 'Atenolol'] },
            { heading: 'Calcium channel blockers', drugs: ['Amlodipine', 'Verapamil', 'Diltiazem'] },
            { heading: 'Others', drugs: ['Ranolazine', 'Nicorandil', 'Ivabradine', 'Trimetazidine'] },
          ]},
          { heading: 'E. Antiplatelet drugs', groups: [
            { heading: 'COX inhibitor', drugs: ['Aspirin'] },
            { heading: 'P2Y12 (ADP) receptor inhibitors', drugs: ['Clopidogrel', 'Prasugrel', 'Ticagrelor'] },
            { heading: 'GP IIb/IIIa inhibitors', drugs: ['Abciximab', 'Tirofiban'] },
            { heading: 'Phosphodiesterase inhibitors', drugs: ['Dipyridamole', 'Cilostazol'] },
          ]},
          { heading: 'F. Anticoagulants', groups: [
            { heading: 'Parenteral', groups: [
              { heading: 'Unfractionated heparin (UFH)', drugs: ['Heparin'] },
              { heading: 'Low-molecular-weight heparin (LMWH)', drugs: ['Enoxaparin'] },
              { heading: 'Indirect Xa inhibitor', drugs: ['Fondaparinux'] },
              { heading: 'Direct thrombin inhibitors', drugs: ['Bivalirudin'] },
            ]},
            { heading: 'Oral', groups: [
              { heading: 'Vitamin K antagonist', drugs: ['Warfarin'] },
              { heading: 'Direct oral anticoagulants (DOACs)', drugs: ['Dabigatran', 'Apixaban', 'Rivaroxaban', 'Edoxaban'] },
            ]},
          ]},
          { heading: 'G. Thrombolytics (fibrinolytics)', drugs: ['Streptokinase', 'Alteplase', 'Tenecteplase', 'Reteplase'] },
          { heading: 'H. Hypolipidaemic drugs', groups: [
            { heading: 'Statins (HMG-CoA reductase inhibitors)', drugs: ['Atorvastatin', 'Rosuvastatin', 'Simvastatin'] },
            { heading: 'Cholesterol-absorption inhibitor', drugs: ['Ezetimibe'] },
            { heading: 'PCSK9 inhibitors', drugs: ['Evolocumab', 'Alirocumab', 'Inclisiran'] },
            { heading: 'Fibrates', drugs: ['Fenofibrate', 'Gemfibrozil'] },
            { heading: 'Bile-acid sequestrants', drugs: ['Cholestyramine'] },
            { heading: 'Others', drugs: ['Niacin', 'Omega-3 fatty acids'] },
          ]},
          { heading: 'I. Key concepts & principles', groups: [
            { heading: 'Cardiac electrophysiology', drugs: [
              'Cardiac action potential phases (0–4) & ion currents',
              'Vaughan-Williams classification basis',
              'Automaticity, refractory period & re-entry',
              'CHA2DS2-VASc score concept',
            ]},
            { heading: 'Cardiac mechanics & failure', drugs: [
              'Frank-Starling, preload, afterload & contractility',
              'Heart-failure neurohormonal model',
            ]},
            { heading: 'Pathways & regulation', drugs: [
              'RAAS pathway & sites of blockade',
              'Myocardial O2 supply vs demand (antianginal rationale)',
              'Coagulation cascade (intrinsic / extrinsic / common)',
              'Antiplatelet vs anticoagulant vs fibrinolytic',
              'Dyslipidaemia & lipoprotein types',
            ]},
            { heading: 'Therapeutic strategy', drugs: [
              'Hypertension treatment principles & stepped care',
            ]},
          ]},
        ],
      },
      {
        label: 'KDT 8e/9e',
        cite: 'ch. 37–48',
        groups: [
          { heading: 'A. Antiarrhythmic drugs', groups: [
            { heading: 'Class I — membrane stabilizers (Na+ channel blockers)', groups: [
              { heading: 'IA', drugs: ['Quinidine', 'Procainamide', 'Disopyramide'] },
              { heading: 'IB', drugs: ['Lignocaine', 'Mexiletine', 'Phenytoin'] },
              { heading: 'IC', drugs: ['Flecainide', 'Propafenone'] },
            ]},
            { heading: 'Class II — β-adrenergic blockers', drugs: ['Propranolol', 'Esmolol', 'Metoprolol'] },
            { heading: 'Class III — agents prolonging repolarization', drugs: ['Amiodarone', 'Sotalol', 'Dronedarone', 'Dofetilide', 'Ibutilide'] },
            { heading: 'Class IV — calcium channel blockers', drugs: ['Verapamil', 'Diltiazem'] },
            { heading: 'Miscellaneous', drugs: ['Adenosine', 'Digoxin', 'Magnesium sulfate'] },
          ]},
          { heading: 'B. Drugs used in congestive heart failure', groups: [
            { heading: 'Inhibitors of RAAS — ACE inhibitors', drugs: ['Enalapril', 'Ramipril', 'Lisinopril'] },
            { heading: 'Angiotensin receptor blockers', drugs: ['Losartan', 'Valsartan'] },
            { heading: 'Angiotensin receptor–neprilysin inhibitor', drugs: ['Sacubitril/valsartan'] },
            { heading: 'β-adrenergic blockers', drugs: ['Carvedilol', 'Bisoprolol', 'Metoprolol', 'Nebivolol'] },
            { heading: 'Aldosterone antagonists', drugs: ['Spironolactone', 'Eplerenone'] },
            { heading: 'SGLT2 inhibitors', drugs: ['Dapagliflozin', 'Empagliflozin'] },
            { heading: 'Diuretics', drugs: ['Furosemide'] },
            { heading: 'Cardiac glycosides', drugs: ['Digoxin'] },
            { heading: 'If-channel inhibitor', drugs: ['Ivabradine'] },
            { heading: 'Inotropes / inodilators (acute decompensated HF)', drugs: ['Dobutamine', 'Dopamine', 'Milrinone'] },
            { heading: 'Vasodilators', drugs: ['Hydralazine + Isosorbide dinitrate'] },
          ]},
          { heading: 'C. Antihypertensive drugs', groups: [
            { heading: 'Diuretics', drugs: ['Hydrochlorothiazide', 'Chlorthalidone', 'Furosemide'] },
            { heading: 'ACE inhibitors', drugs: ['Enalapril', 'Ramipril', 'Lisinopril'] },
            { heading: 'Angiotensin receptor blockers', drugs: ['Losartan', 'Valsartan'] },
            { heading: 'Calcium channel blockers', groups: [
              { heading: 'Dihydropyridines', drugs: ['Amlodipine', 'Nifedipine'] },
              { heading: 'Non-dihydropyridines', drugs: ['Verapamil', 'Diltiazem'] },
            ]},
            { heading: 'β-adrenergic blockers', drugs: ['Metoprolol', 'Atenolol', 'Propranolol'] },
            { heading: 'α-adrenergic blockers', drugs: ['Prazosin', 'Doxazosin'] },
            { heading: 'Central sympatholytics', drugs: ['Clonidine', 'Methyldopa'] },
            { heading: 'Direct vasodilators', drugs: ['Hydralazine', 'Minoxidil', 'Sodium nitroprusside'] },
          ]},
          { heading: 'D. Antianginal drugs', groups: [
            { heading: 'Nitrates', drugs: ['Glyceryl trinitrate (nitroglycerin)', 'Isosorbide dinitrate', 'Isosorbide mononitrate'] },
            { heading: 'β-blockers', drugs: ['Metoprolol', 'Atenolol'] },
            { heading: 'Calcium channel blockers', drugs: ['Amlodipine', 'Verapamil', 'Diltiazem'] },
            { heading: 'Others (potassium channel opener / metabolic / If-blocker)', drugs: ['Ranolazine', 'Nicorandil', 'Ivabradine', 'Trimetazidine'] },
          ]},
          { heading: 'E. Antiplatelet drugs', groups: [
            { heading: 'COX inhibitor', drugs: ['Aspirin'] },
            { heading: 'P2Y12 (ADP) antagonists', drugs: ['Clopidogrel', 'Prasugrel', 'Ticagrelor'] },
            { heading: 'GP IIb/IIIa antagonists', drugs: ['Abciximab', 'Tirofiban'] },
            { heading: 'Phosphodiesterase inhibitors', drugs: ['Dipyridamole', 'Cilostazol'] },
          ]},
          { heading: 'F. Anticoagulants', groups: [
            { heading: 'Parenteral', groups: [
              { heading: 'Unfractionated heparin', drugs: ['Heparin'] },
              { heading: 'Low-molecular-weight heparins', drugs: ['Enoxaparin'] },
              { heading: 'Indirect factor Xa inhibitor', drugs: ['Fondaparinux'] },
              { heading: 'Direct thrombin inhibitors', drugs: ['Bivalirudin'] },
            ]},
            { heading: 'Oral', groups: [
              { heading: 'Vitamin K antagonist (coumarin)', drugs: ['Warfarin'] },
              { heading: 'Newer oral anticoagulants (DOACs)', drugs: ['Dabigatran', 'Apixaban', 'Rivaroxaban', 'Edoxaban'] },
            ]},
          ]},
          { heading: 'G. Fibrinolytics (thrombolytics)', drugs: ['Streptokinase', 'Alteplase', 'Tenecteplase', 'Reteplase'] },
          { heading: 'H. Hypolipidaemic drugs', groups: [
            { heading: 'HMG-CoA reductase inhibitors (statins)', drugs: ['Atorvastatin', 'Rosuvastatin', 'Simvastatin'] },
            { heading: 'Cholesterol-absorption inhibitor', drugs: ['Ezetimibe'] },
            { heading: 'PCSK9 inhibitors', drugs: ['Evolocumab', 'Alirocumab', 'Inclisiran'] },
            { heading: 'Fibric acid derivatives', drugs: ['Fenofibrate', 'Gemfibrozil'] },
            { heading: 'Bile-acid sequestrants', drugs: ['Cholestyramine'] },
            { heading: 'Others', drugs: ['Nicotinic acid (niacin)', 'Omega-3 fatty acids'] },
          ]},
          { heading: 'I. Key concepts & principles', groups: [
            { heading: 'Cardiac electrophysiology', drugs: [
              'Cardiac action potential phases (0–4) & ion currents',
              'Vaughan-Williams classification basis',
              'Automaticity, refractory period & re-entry',
              'CHA2DS2-VASc score concept',
            ]},
            { heading: 'Cardiac mechanics & failure', drugs: [
              'Frank-Starling, preload, afterload & contractility',
              'Heart-failure neurohormonal model',
            ]},
            { heading: 'Pathways & regulation', drugs: [
              'RAAS pathway & sites of blockade',
              'Myocardial O2 supply vs demand (antianginal rationale)',
              'Coagulation cascade (intrinsic / extrinsic / common)',
              'Antiplatelet vs anticoagulant vs fibrinolytic',
              'Dyslipidaemia & lipoprotein types',
            ]},
            { heading: 'Therapeutic strategy', drugs: [
              'Hypertension treatment principles & stepped care',
            ]},
          ]},
        ],
      },
    ],
  },
  drugs: [
    // ─── ANTIARRHYTHMICS — CLASS IA ──────────────────────────────────────────

    {
      id: 'quinidine',
      district: 'cvs',
      building: 'the Class IA conduction-slowing station at the north end of SA-node Alley',
      class: 'Class IA antiarrhythmic; Na+ channel blocker (intermediate kinetics) + K+ channel blocker',
      mechanism: 'Blocks cardiac fast Na+ channels (reduces Vmax, slows phase-0 upstroke) and K+ channels (prolongs repolarisation, widens QRS and QT). Vagolytic effect increases AV nodal conduction rate. Effective in both atrial and ventricular arrhythmias. Intermediate recovery kinetics distinguish it from IB and IC subclasses.',
      adverse_effects: 'QT prolongation → torsades de pointes (most dangerous); cinchonism (tinnitus, headache, visual disturbance); GI upset (nausea, diarrhoea); thrombocytopenia; lupus-like syndrome; hypotension; paradoxical ventricular rate acceleration in atrial flutter (vagolytic + slowing flutter rate into 2:1 zone).',
      clinical_use: 'Maintenance of sinus rhythm in atrial fibrillation and flutter; ventricular tachycardia. Largely superseded by safer agents; still used in some refractory situations and for Brugada syndrome (quinidine reduces Ito current). AVOID in patients with QT prolongation or structural heart disease.',
      memory_hook: 'The Class IA station has a wide QRS door and a long QT hallway — everything slows and widens, and the Torsades alarm goes off if the QT gets too long.',
      source: 'G&G 14e, ch. 31',
      high_yield: true,
    },

    // ─── ANTIARRHYTHMICS — CLASS IB ──────────────────────────────────────────

    {
      id: 'lidocaine_iv',
      district: 'cvs',
      building: 'the Class IB fast-kinetics substation at the ventricular conduction yard',
      class: 'Class IB antiarrhythmic; Na+ channel blocker (fast kinetics; use-dependent)',
      mechanism: 'Blocks cardiac Na+ channels preferentially in depolarised (ischaemic) tissue — rapid on-off kinetics mean little effect on normal myocardium. Shortens the action potential duration and effective refractory period in ventricular muscle (unlike IA/IC which prolong them). Minimal effect on conduction velocity at rest; pronounced effect in rapidly firing ischaemic tissue.',
      adverse_effects: 'CNS toxicity (dose-dependent): perioral numbness, tinnitus, dysarthria → seizures → cardiovascular collapse. Cardiac: bradycardia, sinus arrest at toxic doses. Note: local anaesthetic use shares the same molecule but different route and context — the district entry is specifically the IV antiarrhythmic formulation.',
      clinical_use: 'Ventricular tachyarrhythmias post-MI (historical first-line); ventricular fibrillation refractory to defibrillation (IV bolus then infusion). Largely superseded by amiodarone for most indications but still used acutely in some protocols.',
      memory_hook: 'The fast-kinetics substation snaps onto the ischaemic ventricular circuit and off again in milliseconds — it targets the sick, fast-firing tissue without slowing the healthy conduction lines.',
      source: 'G&G 14e, ch. 31',
      high_yield: true,
    },

    // ─── ANTIARRHYTHMICS — CLASS IC ──────────────────────────────────────────

    {
      id: 'flecainide',
      district: 'cvs',
      building: 'the Class IC strong-block transmission house at the atrial conduction ring',
      class: 'Class IC antiarrhythmic; Na+ channel blocker (slow kinetics; potent)',
      mechanism: 'Most potent Na+ channel blocker of the Vaughan-Williams system. Dramatically slows conduction velocity throughout the heart (widens QRS markedly) without significantly prolonging refractoriness. Slow dissociation from Na+ channels means effect accumulates at faster heart rates (reverse use-dependence). Effective for supraventricular arrhythmias including paroxysmal AF.',
      adverse_effects: 'Pro-arrhythmic: CAST trial (1989) showed flecainide and encainide significantly increased mortality in patients with ventricular ectopy after MI despite suppressing the ectopy. Negative inotrope; visual disturbances; dizziness. AVOID in structural heart disease or post-MI patients.',
      clinical_use: 'Paroxysmal atrial fibrillation and flutter in patients without structural heart disease or coronary artery disease (pill-in-pocket approach). Supraventricular tachycardias. Contraindicated post-MI and in HFrEF.',
      memory_hook: 'The strong-block house can silence the atrial circuit beautifully in a healthy heart — but the CAST trial proved it is catastrophically pro-arrhythmic if there is structural damage behind the walls.',
      source: 'G&G 14e, ch. 31',
      high_yield: true,
    },

    // ─── ANTIARRHYTHMICS — CLASS III ─────────────────────────────────────────

    {
      id: 'amiodarone',
      district: 'cvs',
      building: 'the iodine-stained multi-class tower dominating the north end of the plaza',
      class: 'Class III antiarrhythmic (dominant); also K+, Na+, Ca2+ channel block + α/β adrenoceptor antagonism',
      mechanism: 'Predominantly blocks K+ channels (Ikr, IKs) → marked prolongation of action potential duration and QT interval. Also blocks inactivated Na+ channels, L-type Ca2+ channels, and α/β adrenoceptors. Extremely long half-life (40–55 days) owing to massive tissue accumulation. Effective against virtually all types of arrhythmia.',
      adverse_effects: 'Pulmonary fibrosis/pneumonitis (dose-dependent; can be fatal — baseline and periodic CXR/PFT required); thyroid dysfunction (hypo- or hyperthyroidism — amiodarone is 37% iodine by weight and inhibits T4 → T3 conversion); corneal microdeposits (almost universal; reversible; rarely impairs vision); photosensitivity and blue-grey skin discolouration; hepatotoxicity (LFTs); peripheral neuropathy; QT prolongation (paradoxically low risk of torsades despite QT prolongation); teratogen.',
      clinical_use: 'Ventricular fibrillation and pulseless VT (IV amiodarone during resuscitation); haemodynamically stable VT; AF rate or rhythm control (particularly in heart failure where other agents are contraindicated); pre-excitation syndromes. First-line IV antiarrhythmic in ACLS for shock-refractory VF/VT.',
      memory_hook: 'The iodine tower is the city\'s most powerful arrhythmia suppressor — it hits every channel — but its grey facade is crumbling from the accumulated side-effects: fibrotic lungs on the upper floors, thyroid weather-vanes spinning wild, a frost of corneal deposits on every window.',
      source: 'G&G 14e, ch. 31',
      high_yield: true,
    },

    {
      id: 'sotalol',
      district: 'cvs',
      building: 'the hybrid K+-blocker and β-breaker relay station at AV-node Junction',
      class: 'Class III antiarrhythmic + non-selective β-adrenoceptor antagonist',
      mechanism: 'Non-selective β-blockade (class II effect) combined with K+ channel blockade (class III effect) prolonging the action potential and QT interval. The racemic mixture is used clinically; the d-sotalol enantiomer is responsible for class III activity while both enantiomers provide β-blockade.',
      adverse_effects: 'QT prolongation → torsades de pointes (risk greatest at initiation and with hypokalaemia — requires monitored in-hospital initiation); bronchospasm (non-selective β-blockade, AVOID in asthma/COPD); bradycardia; fatigue. AVOID in renal impairment (renally cleared, accumulation prolongs QT).',
      clinical_use: 'Maintenance of sinus rhythm in AF/flutter; ventricular arrhythmias. Initiated in-hospital with ECG monitoring. Requires dose adjustment in renal impairment.',
      memory_hook: 'The hybrid relay station blocks both the β-adrenergic inlet and the K+ repolarisation outlet — the QT stretches and the heart slows, but the torsades alarm is wired to the potassium sensor on the wall.',
      source: 'G&G 14e, ch. 31',
      high_yield: true,
    },

    {
      id: 'adenosine',
      district: 'cvs',
      building: 'the rapid-response AV-node circuit-breaker kiosk at the junction entrance',
      class: 'Endogenous purine nucleoside; A1 adenosine receptor agonist',
      mechanism: 'Activates A1 receptors on AV nodal cells → increases K+ conductance and suppresses Ca2+ current → transient complete AV nodal block lasting 10–15 seconds. Terminates re-entrant arrhythmias that use the AV node as part of their circuit. Vasodilates coronary arteries (A2 receptor). Ultra-short half-life (~10 seconds, rapidly phosphorylated and deaminated in red blood cells).',
      adverse_effects: 'Transient chest tightness/pain, dyspnoea (bronchospasm risk — AVOID in asthma); flushing; sense of impending doom; transient asystole or bradycardia (expected, brief); may precipitate AF or atrial flutter transiently. Methylxanthines (theophylline, caffeine) competitively antagonise adenosine — higher doses needed. Dipyridamole potentiates by blocking uptake.',
      clinical_use: 'First-line for termination of haemodynamically stable paroxysmal SVT (including AVNRT, AVRT) — given as rapid IV bolus followed by flush to ensure it reaches central circulation before degraded. Also used diagnostically to reveal atrial flutter or other atrial arrhythmias by temporarily slowing ventricular rate. CONTRAINDICATED in second- or third-degree AV block, sick sinus syndrome (unless pacemaker in place), and severe asthma/bronchospasm.',
      memory_hook: 'The rapid-response kiosk fires a 10-second blackout at the AV junction — the circuit crashes and the SVT stops, then the lights come back on and sinus rhythm walks through.',
      source: 'G&G 14e, ch. 31',
      high_yield: true,
    },

    // ─── HEART FAILURE / DIGOXIN ─────────────────────────────────────────────

    {
      id: 'digoxin',
      district: 'cvs',
      building: 'the Na/K-ATPase pump house at the heart of the plaza machinery',
      class: 'Cardiac glycoside; Na+/K+-ATPase inhibitor; positive inotrope',
      mechanism: 'Inhibits Na+/K+-ATPase → intracellular Na+ accumulates → Na+/Ca2+ exchanger (NCX) reversal reduces Ca2+ extrusion → [Ca2+]i rises → increased contractility. AV nodal effects: enhanced vagal tone (M2 stimulation) + direct SA/AV nodal suppression → slows heart rate and AV conduction. Narrow therapeutic index. Toxicity worsened by hypokalaemia (K+ competes at Na/K-ATPase binding site), hypomagnesaemia, and hypercalcaemia.',
      adverse_effects: 'GI: nausea, vomiting, anorexia (early toxicity). Cardiac: SVT with block (PAT with block — classic toxicity arrhythmia); ventricular ectopy; bidirectional VT; AV block; bradycardia. CNS: xanthopsia (yellow-green visual halos — depicted in van Gogh\'s paintings), confusion, fatigue. Antidote: digoxin-specific antibody Fab fragments for severe toxicity.',
      clinical_use: 'Rate control in AF (particularly useful when β-blockers or CCBs are contraindicated, e.g. in severe LV dysfunction — ventricular rate control). Symptomatic HFrEF (reduces hospitalisation, no mortality benefit — DIG trial). Narrow therapeutic window; monitoring of levels, K+, Mg2+ essential.',
      memory_hook: 'The Na/K-ATPase pump house runs the calcium secret: block the sodium pump, jam the NCX exchanger, calcium floods the cell — the failing heart squeezes harder. But the pump must not be over-blocked: yellow halos, SVT with block, bidirectional VT are the signs the machine is being driven past its limit.',
      source: 'G&G 14e, ch. 30',
      high_yield: true,
    },

    {
      id: 'ivabradine',
      district: 'cvs',
      building: 'the HCN funny-current regulator station beside the SA-node alley entrance',
      class: 'If (HCN) channel inhibitor; pure heart-rate-lowering agent',
      mechanism: 'Selectively and dose-dependently blocks the HCN (funny current, If) channel in the sinoatrial node — the channel responsible for spontaneous diastolic depolarisation (phase 4) and thus heart rate. Slows heart rate without affecting myocardial contractility, conduction, or blood pressure. Requires an open channel state (use-dependent) so efficacy is greater at faster heart rates.',
      adverse_effects: 'Bradycardia (major risk; AVOID if resting HR <60 bpm); luminous visual phenomena (phosphenes — transient bright patches in visual field due to HCN channels in retina); AF (slightly increased risk); foetal harm (teratogenic — AVOID in pregnancy).',
      clinical_use: 'Stable angina in sinus rhythm when β-blockers are contraindicated or insufficient (reduces heart rate, decreasing myocardial O2 demand). Symptomatic chronic HFrEF in sinus rhythm with HR ≥75 bpm despite optimised β-blocker therapy (SHIFT trial — reduces hospitalisation). NOT for AF (requires sinus rhythm for the drug to work).',
      memory_hook: 'The funny-current station is the SA node\'s pacemaker dial — ivabradine turns the dial down without touching the contractility levers or the blood pressure valves. Visual phosphenes are the retinal HCN channels blinking.',
      source: 'G&G 14e, ch. 30',
      high_yield: true,
    },

    {
      id: 'sacubitril_valsartan',
      district: 'cvs',
      building: 'the ARNI dual-mechanism dispensary at the south wing of the heart plaza',
      class: 'ARNI (angiotensin receptor-neprilysin inhibitor); sacubitril (prodrug → LBQ657) + valsartan',
      mechanism: 'Sacubitril is a prodrug hydrolysed to LBQ657, a neprilysin inhibitor — neprilysin degrades natriuretic peptides (BNP, ANP) and bradykinin; its inhibition raises natriuretic peptide levels, promoting natriuresis, vasodilation, and anti-remodelling. Valsartan blocks AT1 receptors, reducing angiotensin II effects. The combination provides dual neurohormonal antagonism: reduced Ang II signalling + enhanced natriuretic peptide signalling.',
      adverse_effects: 'Hypotension (major — especially at initiation); hyperkalaemia; renal impairment; angioedema (increased risk vs. ACEi monotherapy because neprilysin inhibition further raises bradykinin when combined with ACEi — MUST NOT use within 36 hours of an ACEi). AVOID in pregnancy (teratogen — ARB component).',
      clinical_use: 'HFrEF (EF ≤40%) symptomatic on optimised ACEi/ARB therapy — switch to sacubitril/valsartan (PARADIGM-HF trial: 20% reduction in CV death/HF hospitalisation vs. enalapril). Replace, do not add to, existing ACEi (36-hour washout required). AVOID in HFpEF (PARAGON-HF trial did not show clear mortality benefit).',
      memory_hook: 'The ARNI dispensary runs two counters in parallel: the neprilysin window lets natriuretic peptides pile up like beneficial floods; the AT1 window blocks the angiotensin stress signals. Together they remodel the failing heart better than either alone — but opening both bradykinin valves with an ACEi at the same time causes angioedema.',
      source: 'G&G 14e, ch. 30',
      high_yield: true,
    },

    // ─── ANTIHYPERTENSIVES — ACEi ────────────────────────────────────────────

    {
      id: 'enalapril',
      district: 'cvs',
      building: 'the ACE-inhibitor arcade on the west side of the hospital plaza',
      class: 'ACE inhibitor (ACEi); prodrug (enalaprilat is the active diacid)',
      mechanism: 'Enalapril is a prodrug hydrolysed to enalaprilat, which competitively inhibits angiotensin-converting enzyme (ACE/kininase II) → reduces angiotensin II (Ang II) production → vasodilation, reduced aldosterone secretion, natriuresis, and reduction in cardiac afterload and preload. ACE also degrades bradykinin; ACEi-mediated bradykinin accumulation is responsible for the class-effect dry cough and angioedema.',
      adverse_effects: 'Dry cough (bradykinin-mediated; class effect — switch to ARB if intolerable); angioedema (rare but potentially life-threatening; absolute contraindication to re-challenge); first-dose hypotension; hyperkalaemia (reduced aldosterone); acute kidney injury (AKI) in bilateral renal artery stenosis or volume depletion (glomerular filtration depends on Ang II efferent arteriolar tone); teratogen (AVOID in pregnancy — 2nd/3rd trimester — causes fetal renal agenesis and skull hypoplasia).',
      clinical_use: 'Hypertension; HFrEF (mortality benefit — CONSENSUS, SOLVD); post-MI LV dysfunction; diabetic nephropathy; proteinuric CKD. First-line in most hypertension guidelines, especially with comorbid HF or CKD.',
      memory_hook: 'The ACE arcade lowers the angiotensin stress by blocking its production — the bradykinin runoff floods the cough centre and the skin, so anyone who develops a cough must cross the road to the ARB tower next door.',
      source: 'G&G 14e, ch. 28',
      high_yield: true,
    },

    // ─── ANTIHYPERTENSIVES — ARB ─────────────────────────────────────────────

    {
      id: 'losartan',
      district: 'cvs',
      building: 'the ARB tower directly across from the ACE-inhibitor arcade',
      class: 'Angiotensin II receptor blocker (ARB); AT1 receptor competitive antagonist',
      mechanism: 'Selectively blocks AT1 receptors → vasodilation, reduced aldosterone secretion, natriuresis — same downstream effects as ACEi but without ACE enzyme inhibition. Bradykinin is not elevated (no ACE inhibition) → no dry cough. Ang II levels rise reflexively (disinhibited) and act on AT2 receptors (vasodilation, anti-proliferation — possibly beneficial). Losartan (unlike most ARBs) has a uricosuric effect via URAT1 transporter inhibition.',
      adverse_effects: 'Hyperkalaemia; AKI in bilateral renal artery stenosis; hypotension; teratogen (AVOID in pregnancy). Notably, NO dry cough (unlike ACEi). Angioedema extremely rare (far less than ACEi). First-line alternative to ACEi for ACEi-intolerant patients.',
      clinical_use: 'Hypertension; HFrEF (when ACEi-intolerant — CHARM); diabetic nephropathy (RENAAL trial — reduces progression to ESRD); proteinuric CKD; Marfan syndrome (reduce aortic dilatation via TGF-β pathway).',
      memory_hook: 'The ARB tower blocks the same AT1 receptor signal as the ACEi arcade but at the receptor door rather than the enzyme factory — so the bradykinin plumbing is untouched, and the cough-counter stays quiet.',
      source: 'G&G 14e, ch. 28',
      high_yield: true,
    },

    // ─── ANTIHYPERTENSIVES — CCB ─────────────────────────────────────────────

    {
      id: 'amlodipine',
      district: 'cvs',
      building: 'the dihydropyridine café at the arteriolar-relaxation promenade',
      class: 'Dihydropyridine (DHP) calcium channel blocker (L-type); vascular-selective',
      mechanism: 'Blocks L-type (Cav1.2) Ca2+ channels in vascular smooth muscle with high selectivity over cardiac tissue. Reduces Ca2+ influx → arteriolar relaxation → reduced peripheral vascular resistance and afterload. Very long half-life (~35–50 hours) → smooth sustained blood pressure reduction without reflex tachycardia. Minimal effect on cardiac conduction or contractility at therapeutic doses.',
      adverse_effects: 'Peripheral oedema (dose-dependent; caused by arteriolar dilation without venoconstriction, shifting fluid to interstitium — not fluid retention); flushing; headache; reflex tachycardia (mild); gingival hyperplasia (with long-term use). No negative chronotropic/dromotropic/inotropic effects at therapeutic doses.',
      clinical_use: 'Hypertension (once daily — high adherence); stable angina (reduces myocardial O2 demand via afterload reduction + coronary vasodilation); Raynaud phenomenon; proven mortality-neutral in HFrEF (unlike verapamil/diltiazem). Preferred CCB when concomitant HF is present.',
      memory_hook: 'The dihydropyridine café serves only the arteriolar walls — its smooth flavour relaxes the muscle without touching the heart\'s conduction wires. The ankle swells at the table because the arterioles dilate faster than the veins drain.',
      source: 'G&G 14e, ch. 28',
      high_yield: true,
    },

    {
      id: 'verapamil',
      district: 'cvs',
      building: 'the non-DHP cardiac control room at the north end of the CCB promenade',
      class: 'Non-dihydropyridine (phenylalkylamine) calcium channel blocker; cardio-selective',
      mechanism: 'Blocks L-type Ca2+ channels in both vascular smooth muscle and cardiac tissue (SA node, AV node, atrial/ventricular myocardium). Negative chronotropy (slows SA node automaticity), negative dromotropy (slows AV conduction, prolongs PR interval), negative inotropy. More cardio-selective than diltiazem. Vasodilation reduces afterload.',
      adverse_effects: 'Bradycardia; AV block (AVOID with β-blockers — additive AV conduction depression, risk of complete heart block or asystole); constipation (smooth muscle effect in GI tract — most troublesome side effect for patients); hypotension; negative inotropy worsening HF. AVOID in HFrEF (mortality harm — not like amlodipine).',
      clinical_use: 'Supraventricular tachycardias (rate control in AF/flutter; termination of AVNRT); hypertension; stable angina. AVOID in combination with β-blockers parenterally. Contraindicated in WPW with AF (may accelerate accessory pathway conduction).',
      memory_hook: 'The non-DHP control room has its dials connected to the heart as well as the vessels — it slows the SA clock and the AV node gate, making it useful for SVT but dangerous whenever a β-blocker is also in the building.',
      source: 'G&G 14e, ch. 28',
      high_yield: true,
    },

    // ─── ANTIANGINALS — NITRATES ─────────────────────────────────────────────

    {
      id: 'nitroglycerin',
      district: 'cvs',
      building: 'the organic-nitrate dispensary at the coronary arteriolar mains junction',
      class: 'Organic nitrate; nitric oxide (NO) donor; venous and arteriolar vasodilator',
      mechanism: 'Bioconverted (via mitochondrial aldehyde dehydrogenase, ALDH2) to NO → activates soluble guanylyl cyclase → raises cGMP → smooth muscle relaxation. At low doses: predominantly venodilation → reduced preload (venous pooling → reduced LV filling pressure → reduced myocardial O2 demand). At higher doses: arteriolar dilation → reduced afterload + coronary vasodilation (relieves vasospasm, redistributes flow to subendocardium). Phosphodiesterase-5 (PDE5) degrades cGMP in vascular smooth muscle — PDE5 inhibitors (sildenafil, tadalafil) POTENTIATE nitrate vasodilation → severe hypotension (ABSOLUTE contraindication to co-administration).',
      adverse_effects: 'Headache (vasodilatation of meningeal arteries — severe, throbbing); hypotension; reflex tachycardia; tolerance with continuous exposure (down-regulation of ALDH2 + compensatory neurohormonal activation — prevented by a nitrate-free interval of ≥8 hours per day); "Monday disease" (industrial workers re-exposed after weekend off: headache and dizziness from lost tolerance).',
      clinical_use: 'Acute angina (sublingual GTN — onset within minutes); prophylaxis before exertion (sublingual); chronic stable angina (patches, sustained-release formulations with nitrate-free interval); acute MI (IV GTN — reduces preload/afterload); acute LV failure with pulmonary oedema; hypertensive emergencies.',
      memory_hook: 'The nitrate dispensary sends a NO puff along the coronary pipes — veins pool, preload falls, the heart unloads. But keep the PDE5 inhibitor shop locked while the dispensary is open: two NO-potentiators together collapse the pressure completely. Mondays are dangerous because the tolerance card has expired over the weekend.',
      source: 'G&G 14e, ch. 32',
      high_yield: true,
    },

    {
      id: 'ranolazine',
      district: 'cvs',
      building: 'the late Na+-current inhibitor laboratory tucked behind the antianginal arcade',
      class: 'Antianginal; late Na+ current (INa-late) inhibitor',
      mechanism: 'Blocks the late (persistent) Na+ current (INa-late) in cardiac myocytes. During ischaemia, INa-late is abnormally enhanced → intracellular Na+ accumulates → NCX extrusion impaired → Ca2+ overload → diastolic dysfunction and increased wall stress (increasing O2 demand). Ranolazine reduces this ischaemia-driven Ca2+ overload without affecting heart rate or blood pressure (unique among antianginals). Also has minor K+ channel-blocking effects.',
      adverse_effects: 'QT prolongation (generally mild; low torsades risk clinically); constipation; nausea; dizziness; headache. Significant drug interactions via CYP3A4 and P-gp — levels increased by ketoconazole, diltiazem, verapamil. AVOID in severe hepatic impairment.',
      clinical_use: 'Chronic stable angina — as add-on therapy when β-blockers, nitrates, and CCBs are insufficient or not tolerated. Does not reduce heart rate or BP, making it useful in patients with bradycardia or hypotension. No mortality benefit demonstrated.',
      memory_hook: 'The late Na+ laboratory targets the abnormal ion leak that floods ischaemic cells with sodium and calcium — it doesn\'t touch the heart rate dial or the blood pressure lever, just patches the leaky late channel.',
      source: 'G&G 14e, ch. 32',
      high_yield: true,
    },

    // ─── ANTIPLATELETS ───────────────────────────────────────────────────────

    {
      id: 'aspirin',
      district: 'cvs',
      building: 'the ancient COX-1 stall at the centre of the antiplatelet market',
      class: 'Antiplatelet; irreversible COX-1 inhibitor; analgesic/antipyretic/anti-inflammatory at higher doses',
      mechanism: 'Irreversibly acetylates and inactivates cyclooxygenase-1 (COX-1) in platelets → prevents thromboxane A2 (TXA2) synthesis → reduces platelet aggregation. Platelets are anucleate and cannot synthesise new COX-1 → effect lasts the platelet lifespan (~7–10 days). At low (antiplatelet) doses selectively inhibits platelet COX-1; at higher doses also inhibits vascular COX-2 (prostacyclin I2 — anti-aggregatory) and produces anti-inflammatory effects.',
      adverse_effects: 'GI mucosal damage (ulceration, bleeding — reduced but not eliminated by enteric coating); bleeding risk (especially GI, surgical); bronchospasm/aspirin-exacerbated respiratory disease (AERD — ~10% of asthmatics; COX-1 blockade shunts arachidonic acid to lipoxygenase pathway → leukotrienes); Reye syndrome (AVOID in children with viral illness); tinnitus at high doses.',
      clinical_use: 'Secondary prevention of MI and stroke (antiplatelet effect); acute MI (loading dose immediately); NSTEMI/ACS (dual antiplatelet therapy); stable CAD; ischaemic stroke prevention. Primary prevention: benefit vs. bleeding risk controversial — current guidelines limit use.',
      memory_hook: 'The ancient COX-1 stall permanently stamps a red cross on the platelet\'s TXA2 factory — aspirin\'s irreversible hand cannot be recalled, and the platelet carries the stamp for its entire 7–10 day life.',
      source: 'G&G 14e, ch. 33',
      high_yield: true,
    },

    {
      id: 'clopidogrel',
      district: 'cvs',
      building: 'the CYP2C19 prodrug conversion counter at the antiplatelet market',
      class: 'Antiplatelet; irreversible P2Y12 ADP receptor antagonist; thienopyridine prodrug',
      mechanism: 'Prodrug requiring hepatic CYP2C19 bioactivation to the active thiol metabolite. Active metabolite irreversibly alkylates the P2Y12 ADP receptor on platelets → blocks ADP-mediated activation of GP IIb/IIIa → reduces platelet aggregation. Effect lasts the platelet lifespan. CYP2C19 poor metabolisers (approximately 25–30% of patients, especially East Asians) show significantly reduced antiplatelet effect ("clopidogrel resistance").',
      adverse_effects: 'Bleeding (GI, intracranial — major risk); thrombotic thrombocytopenic purpura (TTP — rare but severe); GI upset. Omeprazole and esomeprazole inhibit CYP2C19 and reduce clopidogrel activation (other PPIs: pantoprazole preferred). Variable response — pharmacogenomics important.',
      clinical_use: 'ACS (dual antiplatelet therapy with aspirin); PCI with stent placement (prevents in-stent thrombosis); secondary stroke prevention; peripheral arterial disease. Patients who are CYP2C19 poor metabolisers should be considered for ticagrelor or prasugrel where feasible.',
      memory_hook: 'The prodrug counter needs CYP2C19 to stamp the ticket — without the enzyme, the P2Y12 door stays open and platelets keep clumping. The 25% of patients without the stamp are clopidogrel-resistant and need a different drug.',
      source: 'G&G 14e, ch. 33',
      high_yield: true,
    },

    {
      id: 'ticagrelor',
      district: 'cvs',
      building: 'the reversible P2Y12 lock-up across the antiplatelet market square',
      class: 'Antiplatelet; reversible P2Y12 ADP receptor antagonist; cyclopentyl-triazolo-pyrimidine; non-prodrug',
      mechanism: 'Directly and reversibly inhibits the P2Y12 ADP receptor — does not require metabolic activation (not a prodrug). Faster onset and greater platelet inhibition than clopidogrel. Reversibility means platelet function recovers more quickly after discontinuation (5 days vs. 7 days for clopidogrel). Also inhibits cellular uptake of adenosine (inhibits ENT1) → raised plasma adenosine → contributes to dyspnoea side effect.',
      adverse_effects: 'Bleeding; dyspnoea (adenosine-related — not bronchoconstriction, not dose-dependent; reported in ~15% of patients; often mild and transient but may require discontinuation); bradycardia (adenosine effect — ventricular pauses on Holter in PLATO trial); uric acid elevation.',
      clinical_use: 'ACS (PLATO trial: superior to clopidogrel in reducing CV death, MI, and stroke without significant increase in overall major bleeding; does increase non-CABG related bleeding). Preferred over clopidogrel in ACS per current guidelines. AVOID in patients with prior intracranial haemorrhage or active bleeding.',
      memory_hook: 'The reversible lock-up chains the P2Y12 door but releases it after 5 days when ticagrelor leaves — and the adenosine accumulation from blocked ENT1 makes patients catch their breath on the stairs, not from bronchoconstriction but from purinergic fog.',
      source: 'G&G 14e, ch. 33',
      high_yield: true,
    },

    // ─── ANTICOAGULANTS ──────────────────────────────────────────────────────

    {
      id: 'heparin',
      district: 'cvs',
      building: 'the emergency antithrombin infusion pump at the near end of anticoagulant row',
      class: 'Unfractionated heparin (UFH); indirect thrombin inhibitor; antithrombin (AT) activator',
      mechanism: 'Binds antithrombin III via a specific pentasaccharide sequence → conformational change markedly accelerates AT\'s inhibition of thrombin (factor IIa) and factor Xa (and to lesser extent IXa, XIa, XIIa). A single heparin chain must bridge both antithrombin and thrombin to inhibit thrombin; inhibition of Xa requires only the pentasaccharide binding to AT. Monitored by aPTT (reflects thrombin inhibition). Protamine sulfate reverses heparin (charge-charge neutralisation).',
      adverse_effects: 'Bleeding (major risk — reverse with protamine); heparin-induced thrombocytopenia (HIT): type I (non-immune, mild, early) vs. type II (immune-mediated, IgG antibodies to PF4-heparin complexes → thrombocytopenia + paradoxical thrombosis — STOP heparin immediately, use argatroban or fondaparinux); osteoporosis (long-term); does not cross the placenta (safe in pregnancy).',
      clinical_use: 'Bridging anticoagulation; DVT/PE treatment (IV infusion or SC); ACS (IV in STEMI/NSTEMI); cardiac surgery and bypass circuits; pregnant patients requiring anticoagulation. Widely displaced by LMWHs for most indications.',
      memory_hook: 'The emergency infusion pump feeds antithrombin power directly into the clotting cascade — aPTT is the pump gauge. If the platelet counter drops and clots form despite heparin, the PF4 antibody alarm means stop the pump immediately and switch lines.',
      source: 'G&G 14e, ch. 33',
      high_yield: true,
    },

    {
      id: 'warfarin',
      district: 'cvs',
      building: 'the vitamin-K antagonist dispensary in the middle of anticoagulant row',
      class: 'Vitamin K antagonist (VKA); oral anticoagulant; coumarin derivative',
      mechanism: 'Inhibits vitamin K epoxide reductase complex (VKORC1) → prevents recycling of vitamin K → depletes reduced (active) vitamin K → reduces γ-carboxylation of clotting factors II, VII, IX, X (and anticoagulant proteins C and S). Factor VII (shortest half-life) falls first — PT/INR rises early but full anticoagulation requires factor II (longest half-life) depletion (~5 days). Narrow therapeutic index. Metabolised by CYP2C9 (genetic variants affect sensitivity). Induces and inhibitors of CYP2C9 and CYP3A4 cause major DDIs.',
      adverse_effects: 'Bleeding (major; antidote: vitamin K [slow], 4-factor PCC [fast], FFP); teratogen (AVOID in first trimester and near term — embryopathy, intracranial haemorrhage during delivery); warfarin-induced skin necrosis (protein C/S depletion in first days — prevent by overlapping with heparin for ≥5 days and until INR therapeutic for 2 days); purple toe syndrome (cholesterol emboli).',
      clinical_use: 'AF (stroke prevention — target INR 2–3); mechanical heart valves (INR 2.5–3.5 — only approved anticoagulant for this indication; DOACs are CONTRAINDICATED in mechanical valves); DVT/PE treatment and prevention; antiphospholipid syndrome.',
      memory_hook: 'The vitamin-K antagonist dispensary reverses the clotting factory supply chain — no vitamin K means no carboxylation of II, VII, IX, X. The INR is the quality meter; dozens of CYP2C9 drugs flood the dispensary or starve it. Mechanical valves must use this dispensary exclusively — DOACs are not allowed through the door.',
      source: 'G&G 14e, ch. 33',
      high_yield: true,
    },

    {
      id: 'apixaban',
      district: 'cvs',
      building: 'the direct factor Xa wing of the DOAC high-rise at the far end of anticoagulant row',
      class: 'Direct oral anticoagulant (DOAC); direct factor Xa inhibitor; oral; non-prodrug',
      mechanism: 'Directly and reversibly inhibits factor Xa (both free and prothrombinase-bound) — does not require antithrombin as cofactor (unlike heparin). Predictable pharmacokinetics → no routine INR monitoring. Partially hepatic metabolism (CYP3A4, P-gp). Partially renally cleared (~27%). Andexanet alfa is the specific reversal agent (modified factor Xa decoy). 4-factor PCC as non-specific reversal.',
      adverse_effects: 'Bleeding (major; GI bleeding somewhat lower vs. rivaroxaban in direct comparisons); no specific antidote widely available outside andexanet alfa (expensive). Avoid in severe renal impairment. AVOID in mechanical heart valves (RE-ALIGN trial failure — DOACs inferior to warfarin in this indication).',
      clinical_use: 'AF stroke prevention (ARISTOTLE trial — non-inferior to warfarin, with lower stroke/systemic embolism and lower ICH); DVT/PE treatment and secondary prevention (AMPLIFY trial). Twice-daily dosing. Contraindicated in severe hepatic impairment and in mechanical valve patients.',
      memory_hook: 'The direct Xa wing eliminates the antithrombin middleman — apixaban grabs factor Xa directly. No INR meter on the wall, no vitamin K adjustment desk — predictable and mechanical-valve-forbidden (DOAC high-rise has a "No mechanical valves" sign at the door).',
      source: 'G&G 14e, ch. 33',
      high_yield: true,
    },

    // ─── LIPID-LOWERING ──────────────────────────────────────────────────────

    {
      id: 'atorvastatin',
      district: 'cvs',
      building: 'the HMG-CoA reductase laboratory three floors underground in the Lipid Clinic',
      class: 'Statin; HMG-CoA reductase inhibitor; lipid-lowering agent',
      mechanism: 'Competitively inhibits HMG-CoA reductase (rate-limiting enzyme in cholesterol synthesis) → reduced intrahepatic cholesterol → upregulation of LDL receptors on hepatocytes → increased LDL clearance from plasma. Also reduces VLDL synthesis. Pleiotropic effects: anti-inflammatory, anti-thrombotic, stabilisation of atherosclerotic plaques. Metabolised by CYP3A4 (significant DDI potential — avoid with strong CYP3A4 inhibitors).',
      adverse_effects: 'Myopathy: myalgia (most common, dose-dependent) → myositis (elevated CK) → rhabdomyolysis (rare but serious — renal failure from myoglobinuria; risk increased with fibrates, cyclosporin, strong CYP3A4 inhibitors); hepatotoxicity (elevated transaminases — routine monitoring no longer recommended by most guidelines unless symptomatic); new-onset diabetes (small increased risk); CNS effects (memory issues — controversial, rare).',
      clinical_use: 'Hypercholesterolaemia (primary and secondary prevention of cardiovascular events); atherosclerotic cardiovascular disease (ASCVD) risk reduction; acute MI (high-intensity statin therapy within 24 hours). Atorvastatin and rosuvastatin are high-intensity statins.',
      memory_hook: 'The underground laboratory blocks the rate-limiting step of the cholesterol production line — the hepatocytes then put out more LDL-receptor antennae to vacuum up LDL from the blood. Rhabdomyolysis is the catastrophic machine failure when muscle CK floods the laboratory drain.',
      source: 'G&G 14e, ch. 34',
      high_yield: true,
    },

    {
      id: 'ezetimibe',
      district: 'cvs',
      building: 'the NPC1L1 absorption barrier at the intestinal docking station of the Lipid Clinic',
      class: 'Cholesterol absorption inhibitor; NPC1L1 transporter blocker',
      mechanism: 'Inhibits the Niemann-Pick C1-like 1 (NPC1L1) protein at the brush border of the small intestinal epithelium → reduces absorption of dietary cholesterol and biliary cholesterol → hepatic cholesterol depleted → LDL receptors upregulated → LDL cleared from plasma. Reduces LDL by approximately 15–20% as monotherapy; additive with statins (~additional 15–25% LDL reduction).',
      adverse_effects: 'Generally well tolerated. GI upset (mild); elevated transaminases (rare, more common when combined with statin); myopathy (rare, usually in combination with statin).',
      clinical_use: 'Hypercholesterolaemia — as add-on to statin when LDL target not met; or as monotherapy in statin-intolerant patients. IMPROVE-IT trial: adding ezetimibe to simvastatin in ACS patients reduced major CV events vs. simvastatin alone (modest benefit). Familial hypercholesterolaemia.',
      memory_hook: 'The NPC1L1 barrier is the intestinal cholesterol gate — ezetimibe locks the gate, forcing the liver to raid its own LDL-receptor supplies to meet cholesterol needs. Works best as a supplement alongside the underground statin laboratory.',
      source: 'G&G 14e, ch. 34',
      high_yield: true,
    },

    {
      id: 'evolocumab',
      district: 'cvs',
      building: 'the PCSK9 immunotherapy suite at the top floor of the Lipid Clinic',
      class: 'PCSK9 inhibitor; monoclonal antibody (fully human IgG2) against PCSK9',
      mechanism: 'PCSK9 (proprotein convertase subtilisin/kexin type 9) binds LDL receptors on hepatocytes and targets them for lysosomal degradation, reducing LDL receptor recycling. Evolocumab monoclonal antibody binds and inactivates circulating PCSK9 → LDL receptors are not degraded → they recycle to the hepatocyte surface → dramatically increased LDL clearance. Reduces LDL by 50–70%.',
      adverse_effects: 'Injection site reactions; nasopharyngitis; flu-like symptoms; myalgia (rare). Generally well tolerated. Expensive — cost-effectiveness debated. Subcutaneous injection every 2 or 4 weeks.',
      clinical_use: 'Familial hypercholesterolaemia (homozygous and heterozygous) — reduces LDL even in patients on maximum statin + ezetimibe therapy; atherosclerotic cardiovascular disease (FOURIER trial: evolocumab on top of statin reduced major CV events vs. placebo, with large LDL reductions to ~30 mg/dL mean). Statin-intolerant patients.',
      memory_hook: 'The PCSK9 immunotherapy suite deploys antibodies that intercept the PCSK9 shredding signals before they reach the LDL-receptor dock — the receptors survive to make 10 or 20 recycling trips instead of one, vacuuming LDL at extraordinary rates.',
      source: 'G&G 14e, ch. 34',
      high_yield: true,
    },
  ],
};

if (typeof window !== 'undefined') window.DISTRICT_CVS = DISTRICT_CVS;

// Animation registration — heart icon beats at ~70 bpm above the plaza
if (typeof window !== 'undefined' && window.PHARMA?.animations) {
  window.PHARMA.animations.register('cvs', ({ THREE, scene, groupRoot, primitives, loop }) => {
    // A heart icon hovering above the plaza, scale-pulsing at ~70 bpm.
    const heartGroup = new THREE.Group();
    const heartMat = new THREE.MeshLambertMaterial({ color: 0xE24B4A });
    const lobeL = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 12), heartMat);
    lobeL.position.set(-1.4, 0, 0);
    heartGroup.add(lobeL);
    const lobeR = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 12), heartMat);
    lobeR.position.set(1.4, 0, 0);
    heartGroup.add(lobeR);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(2.6, 3.5, 16), heartMat);
    tip.rotation.x = Math.PI;
    tip.position.set(0, -2.4, 0);
    heartGroup.add(tip);
    heartGroup.position.set(0, 16, 0);
    groupRoot.add(heartGroup);
    // 70 bpm = 1.166 Hz; abs(sin) gives a heart-like double pump.
    loop.add((_dt, t) => {
      const phase = (t * Math.PI * 2 * 70 / 60);
      const beat = 1 + Math.abs(Math.sin(phase)) * 0.18;
      heartGroup.scale.set(beat, beat, beat);
    });
  });
}
