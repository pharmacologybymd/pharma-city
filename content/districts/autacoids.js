const DISTRICT_AUTACOIDS = {
  id: 'autacoids',
  name: 'Autacoids',
  theme_line: 'Messenger lane · post office, histamine bells, 5-HT couriers',
  walkthrough: `The Autacoids district is a winding lane of post offices, telegraph poles, and lantern-lit couriers. Every corner rings with the histamine bells of the wheal-and-flare market: mast cells fling their parcels of H1 and H2 messages at skin stalls and stomach counters, while the antihistamine shops hang muffling curtains over the bell-towers. First-generation antihistamines dangle heavy sedating drapes — effective but dusty with anticholinergic side-effects, and dangerously so in the elderly. Second-generation shops hang lighter, non-drowsy curtains that block the bell without clouding the mind.

  Deeper into the lane the 5-HT couriers dart between the vascular plaza and the brainstem telegraph office, parcels tucked under their arms. Sumatriptan flags down the 5-HT1B/1D express coaches to squeeze the throbbing migraine vessels shut — but those same coaches run a coronary line, and the booking office posts a red notice: no service for passengers with ischaemic heart disease, Prinzmetal angina, or uncontrolled hypertension. At the inflammatory plaza the prostaglandin fire-brigade (NSAIDs) stamps out the Cox-enzyme furnaces, but sparks can fly: aspirin-sensitive asthma patients suffer bronchospasm in the smoke, third-trimester foetuses find their arterial duct slammed shut, and neonates paradoxically rely on indomethacin to close a ductus that must not remain open — yet that same pharmacist is barred from towns where the ductus is the only route keeping the infant alive. Around the corner, leukotriene modifiers at the asthma docks carry an FDA black-box notice nailed to every crate: neuropsychiatric cargo may include depression, suicidal ideation, and behavioural changes.`,
  palette: { ground: 0xE8C97A, accent: 0xFF8C42, water: 0x8FCCCC },
  position: { x: 0, z: 15 },
  classification: {
    sources: [
      {
        label: 'G&G 14e',
        cite: 'ch. 39–42',
        groups: [
          { heading: 'A. Histamine & antihistamines', groups: [
            { heading: 'H1 antagonists', groups: [
              { heading: 'First-generation (sedating)', drugs: ['Chlorpheniramine', 'Diphenhydramine', 'Promethazine', 'Hydroxyzine', 'Cyclizine'] },
              { heading: 'Second-generation (non-sedating)', drugs: ['Cetirizine', 'Loratadine', 'Fexofenadine', 'Desloratadine', 'Levocetirizine'] },
            ]},
            { heading: 'H2 antagonists', drugs: ['Famotidine', 'Ranitidine', 'Cimetidine'] },
          ]},
          { heading: 'B. 5-HT (serotonin) drugs', groups: [
            { heading: '5-HT1B/1D agonists (triptans)', drugs: ['Sumatriptan', 'Rizatriptan', 'Zolmitriptan'] },
            { heading: '5-HT3 antagonists', drugs: ['Ondansetron', 'Granisetron'] },
            { heading: '5-HT antagonists', drugs: ['Cyproheptadine', 'Ketanserin', 'Methysergide'] },
          ]},
          { heading: 'C. Prostaglandins & analogues', drugs: ['Misoprostol (PGE1)', 'Latanoprost (PGF2α — ophthalmic)', 'Alprostadil', 'Dinoprostone', 'Epoprostenol/Iloprost'] },
          { heading: 'D. NSAIDs (prostaglandin-synthesis inhibitors)', groups: [
            { heading: 'Non-selective COX inhibitors', drugs: ['Aspirin', 'Ibuprofen', 'Naproxen', 'Diclofenac', 'Indomethacin', 'Ketorolac', 'Piroxicam'] },
            { heading: 'Preferential COX-2', drugs: ['Meloxicam', 'Nimesulide', 'Etodolac'] },
            { heading: 'Selective COX-2 inhibitors (coxibs)', drugs: ['Celecoxib', 'Etoricoxib', 'Parecoxib'] },
            { heading: 'Analgesic-antipyretic (poor anti-inflammatory)', drugs: ['Paracetamol (acetaminophen)', 'Metamizol'] },
          ]},
          { heading: 'E. Leukotriene modifiers', drugs: ['Montelukast (LTRA)', 'Zafirlukast (LTRA)', 'Zileuton (5-LOX inhibitor)'] },
        ],
      },
      {
        label: 'KDT 8e/9e',
        cite: 'ch. 11–15, 25',
        groups: [
          { heading: 'A. Histamine & antihistaminics', groups: [
            { heading: 'H1 antagonists', groups: [
              { heading: 'First-generation (sedating)', drugs: ['Chlorpheniramine', 'Diphenhydramine', 'Promethazine', 'Hydroxyzine', 'Cyclizine'] },
              { heading: 'Second-generation (non-sedating)', drugs: ['Cetirizine', 'Loratadine', 'Fexofenadine', 'Desloratadine', 'Levocetirizine'] },
            ]},
            { heading: 'H2 antagonists', drugs: ['Famotidine', 'Ranitidine', 'Cimetidine'] },
          ]},
          { heading: 'B. 5-HT (serotonin) drugs', groups: [
            { heading: '5-HT1B/1D agonists (triptans)', drugs: ['Sumatriptan', 'Rizatriptan', 'Zolmitriptan'] },
            { heading: '5-HT3 antagonists', drugs: ['Ondansetron', 'Granisetron'] },
            { heading: '5-HT antagonists', drugs: ['Cyproheptadine', 'Ketanserin', 'Methysergide'] },
          ]},
          { heading: 'C. Prostaglandins & analogues', drugs: ['Misoprostol (PGE1)', 'Latanoprost (PGF2α — ophthalmic)', 'Alprostadil', 'Dinoprostone', 'Epoprostenol/Iloprost'] },
          { heading: 'D. NSAIDs (prostaglandin-synthesis inhibitors)', groups: [
            { heading: 'Non-selective COX inhibitors', drugs: ['Aspirin', 'Ibuprofen', 'Naproxen', 'Diclofenac', 'Indomethacin', 'Ketorolac', 'Piroxicam'] },
            { heading: 'Preferential COX-2', drugs: ['Meloxicam', 'Nimesulide', 'Etodolac'] },
            { heading: 'Selective COX-2 inhibitors (coxibs)', drugs: ['Celecoxib', 'Etoricoxib', 'Parecoxib'] },
            { heading: 'Analgesic-antipyretic (poor anti-inflammatory)', drugs: ['Paracetamol (acetaminophen)', 'Metamizol'] },
          ]},
          { heading: 'E. Leukotriene modifiers', drugs: ['Montelukast (LTRA)', 'Zafirlukast (LTRA)', 'Zileuton (5-LOX inhibitor)'] },
        ],
      },
    ],
  },
  drugs: [

    // ─── FIRST-GENERATION H1 ANTIHISTAMINES ──────────────────────────────────

    {
      id: 'chlorpheniramine',
      district: 'autacoids',
      building: 'the dusty bell-muffling drapery shop at the north end of Histamine Lane',
      class: 'First-generation H1 antihistamine (alkylamine); competitive inverse agonist at H1 receptor',
      mechanism: 'Competitively blocks histamine H1 receptors on smooth muscle, endothelial cells, and CNS neurons. Being a lipophilic tertiary amine it penetrates the blood-brain barrier readily, causing sedation via central H1 and muscarinic receptor blockade. Possesses significant anticholinergic (antimuscarinic) activity — blocks M1, M2, and M3 receptors.',
      adverse_effects: 'Sedation (pronounced); anticholinergic effects: dry mouth, urinary retention, constipation, blurred vision; paradoxical excitability in children; impaired psychomotor performance; CONTRAINDICATED in elderly: high risk of anticholinergic toxicity — delirium, urinary retention, falls, and confusion (Beers Criteria).',
      clinical_use: 'Allergic rhinitis; urticaria; insect bites and sting reactions; mild anaphylaxis adjunct; common cold symptom relief. Use avoided in elderly patients due to anticholinergic toxicity risk.',
      memory_hook: 'The drapery shop hangs heavy dusty curtains that muffle the histamine bells — but the old shopkeeper (the elderly patient) gets confused by the dust and knocks over the furniture (anticholinergic delirium, urinary retention).',
      source: 'G&G 14e, ch. 38',
      high_yield: true,
    },
    {
      id: 'diphenhydramine',
      district: 'autacoids',
      building: 'the sedation inn at the crossroads of Histamine Lane and Emesis Row',
      class: 'First-generation H1 antihistamine (ethanolamine); competitive inverse agonist at H1 receptor',
      mechanism: 'Blocks H1 receptors peripherally and centrally. Potent anticholinergic (antimuscarinic) properties. Also antagonises muscarinic receptors in the vestibular nuclei (anti-emetic, motion sickness). Crosses BBB readily — sedation is marked. Anticholinergic (M1 muscarinic blockade) activity in the striatum reduces acetylcholine excess, accounting for anti-Parkinsonian (anti-tremor) utility in drug-induced extrapyramidal symptoms.',
      adverse_effects: 'Pronounced sedation; anticholinergic toxidrome: dry mouth, urinary retention, tachycardia, blurred vision, constipation, delirium; paradoxical excitation in children; QT prolongation at high doses. CONTRAINDICATED in elderly: anticholinergic toxicity — delirium, urinary retention, falls (Beers Criteria high-risk drug).',
      clinical_use: 'Allergic reactions and urticaria; motion sickness and nausea; insomnia (over-the-counter sleep aid); mild drug-induced extrapyramidal symptoms and Parkinsonism; local anaesthetic (topically when lidocaine allergy). Elderly patients: avoid due to anticholinergic toxicity.',
      memory_hook: 'The sedation inn lets you sleep, stop vomiting, and calm the Parkinsonian tremor — but the innkeeper refuses elderly guests because their minds cannot handle the anticholinergic dust (delirium, urinary retention).',
      source: 'G&G 14e, ch. 38',
      high_yield: true,
    },

    // ─── SECOND-GENERATION H1 ANTIHISTAMINES ─────────────────────────────────

    {
      id: 'cetirizine',
      district: 'autacoids',
      building: 'the modern low-sedation drapery boutique on the south side of Histamine Lane',
      class: 'Second-generation H1 antihistamine (piperazine derivative); competitive inverse agonist at H1 receptor',
      mechanism: 'Selective peripheral H1 receptor blockade with minimal CNS penetration (charged/zwitterionic structure at physiological pH limits BBB crossing). No significant anticholinergic activity. Has mild anti-inflammatory properties: reduces mast-cell mediator release and eosinophil recruitment.',
      adverse_effects: 'Mild sedation in a subset of patients (more than loratadine); headache; dry mouth (mild); fatigue. No clinically significant anticholinergic effects.',
      clinical_use: 'Allergic rhinitis (seasonal and perennial); chronic urticaria; allergic conjunctivitis; atopic dermatitis. Preferred over first-generation antihistamines when non-sedating effect is needed.',
      memory_hook: 'The modern boutique hangs light, clean curtains that block the histamine bell without drugging the shoppers — just a faint drowsiness in some, but no anticholinergic dust.',
      source: 'G&G 14e, ch. 38',
      high_yield: true,
    },
    {
      id: 'loratadine',
      district: 'autacoids',
      building: 'the crystal-clear bell-muffling kiosk in the middle of Histamine Lane',
      class: 'Second-generation H1 antihistamine (piperidine derivative); competitive inverse agonist at H1 receptor',
      mechanism: 'Selective, long-acting peripheral H1 receptor inverse agonist. Minimal CNS penetration due to P-glycoprotein efflux at the BBB and hydrophilicity of its active metabolite desloratadine. No anticholinergic activity. Half-life approximately 8-15 hours; active metabolite desloratadine has longer half-life.',
      adverse_effects: 'Minimal sedation (non-sedating at standard doses); headache; dry mouth (rare). No anticholinergic effects. Safe in elderly.',
      clinical_use: 'Allergic rhinitis; chronic urticaria; allergic skin conditions. Preferred in patients requiring non-sedating antihistamine (e.g., pilots, operators of heavy machinery).',
      memory_hook: 'The crystal-clear kiosk is spotlessly non-sedating — its bell-muffling curtains are so transparent you barely know they are there, with no anticholinergic dust at all.',
      source: 'G&G 14e, ch. 38',
      high_yield: true,
    },
    {
      id: 'fexofenadine',
      district: 'autacoids',
      building: 'the P-glycoprotein-guarded express courier bay at the edge of Histamine Lane',
      class: 'Second-generation H1 antihistamine (piperidine derivative); competitive inverse agonist at H1 receptor',
      mechanism: 'Active metabolite of terfenadine; highly selective peripheral H1 receptor blockade. Does not penetrate the BBB — actively extruded by P-glycoprotein (P-gp) efflux transporter. No sedation; no anticholinergic effects. Substrate of P-gp and organic anion transporting polypeptides (OATP); its absorption is reduced by fruit juices (grapefruit, orange, apple juice inhibit OATP).',
      adverse_effects: 'No sedation; no anticholinergic effects; headache (mild); reduced absorption if taken with fruit juices (drug-food interaction). No QT prolongation (unlike its parent terfenadine).',
      clinical_use: 'Seasonal allergic rhinitis; chronic idiopathic urticaria. Safest non-sedating antihistamine for patients requiring no impairment. Avoid co-ingestion with fruit juices.',
      memory_hook: 'The P-gp-guarded courier bay actively kicks fexofenadine out of the brain — perfectly clear-headed, but the gatekeeper (P-gp) also warns to avoid fruit juice deliveries that block the loading dock.',
      source: 'G&G 14e, ch. 38',
      high_yield: true,
    },

    // ─── H2 ANTAGONISTS ───────────────────────────────────────────────────────

    {
      id: 'famotidine',
      district: 'autacoids',
      building: 'the acid-reducing pump station at the gastric end of the lane',
      class: 'H2 receptor antagonist (competitive, reversible)',
      mechanism: 'Competitively blocks histamine H2 receptors on the parietal cells of the gastric mucosa, reducing histamine-stimulated cAMP production and thereby decreasing basal and meal-stimulated gastric acid secretion. More potent and longer-acting than cimetidine; does not inhibit CYP450 enzymes (unlike cimetidine).',
      adverse_effects: 'Generally well tolerated; headache; dizziness; constipation or diarrhoea; rarely thrombocytopenia; no anti-androgenic effect (unlike cimetidine); no CYP450 inhibition.',
      clinical_use: 'Peptic ulcer disease; gastro-oesophageal reflux disease (GERD); Zollinger-Ellison syndrome (adjunct); prevention of stress ulcers. Less potent acid suppression than proton-pump inhibitors but faster onset of action.',
      memory_hook: 'The acid pump station turns down the gastric furnace by blocking the H2 bell at the parietal cell door — cleaner and safer than the original cimetidine furnace, with no CYP450 meddling.',
      source: 'G&G 14e, ch. 38',
      high_yield: true,
    },

    // ─── 5-HT AGENTS ─────────────────────────────────────────────────────────

    {
      id: 'sumatriptan',
      district: 'autacoids',
      building: 'the vascular squeeze-valve station at the migraine express platform',
      class: '5-HT1B/1D receptor agonist (triptan); serotonin agonist',
      mechanism: 'Selectively activates 5-HT1B receptors on cranial blood vessels (causing vasoconstriction of dilated meningeal and dural vessels) and 5-HT1D receptors on trigeminal afferent nerve terminals (inhibiting release of vasoactive neuropeptides such as CGRP and substance P). Reduces neurogenic inflammation and central sensitisation in migraine. Does not cross the BBB significantly at standard doses.',
      adverse_effects: 'Chest tightness, pressure, or pain (coronary vasoconstriction — even without ischaemia in many patients); flushing; tingling; dizziness; nausea. Serotonin syndrome if combined with other serotonergic drugs. CONTRAINDICATED in: ischaemic heart disease (IHD), Prinzmetal angina (coronary vasospasm), uncontrolled hypertension — all due to coronary vasoconstriction risk. Also contraindicated in haemiplegic or basilar migraine.',
      clinical_use: 'Acute treatment of migraine attacks (with or without aura); cluster headaches. First-line specific migraine therapy. NOT a prophylactic agent.',
      memory_hook: 'Sumatriptan squeezes the dilated migraine blood vessels shut like a vice — but the same vice clamps the coronary artery, so no service for passengers with IHD, Prinzmetal angina, or uncontrolled blood pressure (the coronary vasoconstriction red notice).',
      source: 'G&G 14e, ch. 39',
      high_yield: true,
    },
    {
      id: 'ondansetron',
      district: 'autacoids',
      building: 'the nausea-blocking checkpoint office on Emesis Row',
      class: '5-HT3 receptor antagonist (selective)',
      mechanism: 'Blocks 5-HT3 receptors on vagal afferents in the gastrointestinal tract (peripheral) and in the chemoreceptor trigger zone and nucleus tractus solitarius in the brainstem (central). Prevents serotonin released from enterochromaffin cells (during chemotherapy, radiation) from activating the emetic reflex. Does not block dopamine, muscarinic, or H1 receptors.',
      adverse_effects: 'QT prolongation (dose-dependent; risk of torsades de pointes, especially IV administration); constipation (common); headache; dizziness; elevated liver enzymes (transient). Avoid in patients with congenital long-QT syndrome or concurrent QT-prolonging drugs.',
      clinical_use: 'Prevention and treatment of chemotherapy-induced nausea and vomiting (CINV); post-operative nausea and vomiting (PONV); radiation-induced nausea. Does not treat nausea from vestibular causes (motion sickness).',
      memory_hook: 'The nausea checkpoint blocks the 5-HT3 courier (serotonin) from ringing the vomiting bell — effective but it slows the bowel (constipation) and can spark an electrical storm (QT prolongation).',
      source: 'G&G 14e, ch. 39',
      high_yield: true,
    },
    {
      id: 'cyproheptadine',
      district: 'autacoids',
      building: 'the serotonin-syndrome rescue station at the intersection of 5-HT Alley and Appetite Row',
      class: '5-HT2 receptor antagonist; also H1 antagonist; first-generation antihistamine',
      mechanism: 'Potent antagonist at 5-HT2A and 5-HT2C receptors (serotonin antagonism) and H1 histamine receptors. Blocks 5-HT2A receptors in the hypothalamus, increasing appetite. Anti-serotonergic activity useful in serotonin syndrome and carcinoid syndrome (where serotonin excess causes flushing, diarrhoea). First-generation: crosses BBB, sedating, anticholinergic.',
      adverse_effects: 'Sedation (prominent); anticholinergic effects (dry mouth, urinary retention); weight gain; increased appetite (intentional in some uses); dizziness.',
      clinical_use: 'Serotonin syndrome (adjunct antidote — blocks 5-HT2A receptors to reduce symptoms); carcinoid syndrome (diarrhoea and flushing); appetite stimulant in cachexia or anorexia; prophylaxis for vasospastic conditions (migraine prevention — off-label). Allergic conditions (H1 antagonism).',
      memory_hook: 'The rescue station blocks the 5-HT2A siren that triggers serotonin syndrome — while simultaneously opening the appetite door (H1 + 5-HT2C blockade); the sedating cloud warns that it is still a first-generation antihistamine.',
      source: 'G&G 14e, ch. 39',
      high_yield: true,
    },

    // ─── NSAIDs / PROSTAGLANDIN SYNTHESIS INHIBITORS ─────────────────────────

    {
      id: 'ibuprofen',
      district: 'autacoids',
      building: 'the anti-inflammatory fire station at the heart of the inflammatory plaza',
      class: 'Non-selective COX inhibitor (NSAID); propionic acid derivative',
      mechanism: 'Competitively and reversibly inhibits both cyclooxygenase-1 (COX-1) and cyclooxygenase-2 (COX-2). COX-1 inhibition reduces thromboxane A2 synthesis (anti-platelet, but not as potent or irreversible as aspirin) and prostaglandin production in gastric mucosa (GI protection lost). COX-2 inhibition reduces prostaglandin synthesis at inflammatory sites → analgesia, antipyresis, and anti-inflammatory effects.',
      adverse_effects: 'GI ulceration and haemorrhage (COX-1 inhibition reduces protective gastric prostaglandins); acute kidney injury (renal prostaglandins maintain GFR in low-flow states); fluid retention and hypertension; cardiovascular risk with chronic high-dose use; hypersensitivity: aspirin-exacerbated respiratory disease (AERD — Samter\'s triad: asthma + nasal polyps + NSAID sensitivity, causing bronchoconstriction). CONTRAINDICATED in third trimester of pregnancy — premature closure of the ductus arteriosus (PDA) via prostaglandin inhibition.',
      clinical_use: 'Mild-to-moderate pain (headache, dysmenorrhoea, musculoskeletal); antipyretic; anti-inflammatory (arthritis, gout flare); post-operative analgesia. Use with caution in renal impairment, heart failure, peptic ulcer, and elderly. Contraindicated in third trimester pregnancy and in patients with AERD.',
      memory_hook: 'The fire station douses the COX prostaglandin flames — but watch: asthma patients with nasal polyps (AERD) get an anaphylactic backdraft, and third-trimester babies have their arterial duct slammed shut before birth.',
      source: 'G&G 14e, ch. 41',
      high_yield: true,
    },
    {
      id: 'naproxen',
      district: 'autacoids',
      building: 'the long-burning steady fire-watch tower on the east side of the inflammatory plaza',
      class: 'Non-selective COX inhibitor (NSAID); propionic acid derivative',
      mechanism: 'Reversible competitive inhibition of COX-1 and COX-2, reducing prostaglandin and thromboxane synthesis. Long plasma half-life (12-17 hours) compared with ibuprofen (2 hours) allows twice-daily dosing. Observational studies suggest relatively lower cardiovascular risk compared with other traditional NSAIDs (naproxen does not appear to increase risk as much as other NSAIDs in meta-analyses), possibly due to more sustained platelet inhibition without full antiplatelet effect of aspirin.',
      adverse_effects: 'GI ulceration and haemorrhage; renal impairment; fluid retention; hypertension; AERD (aspirin-exacerbated respiratory disease) in susceptible asthmatic patients. CONTRAINDICATED in third trimester of pregnancy — premature closure of PDA. Lower CV risk than some other NSAIDs.',
      clinical_use: 'Musculoskeletal pain and inflammatory arthritis; dysmenorrhoea; gout; chronic pain requiring longer dosing intervals. Preferred NSAID when cardiovascular risk is a concern.',
      memory_hook: 'The steady long-burning tower stays lit all day with just two top-ups — naproxen\'s long half-life means twice-daily convenience and relatively gentler cardiovascular behaviour among the NSAIDs.',
      source: 'G&G 14e, ch. 41',
      high_yield: true,
    },
    {
      id: 'indomethacin',
      district: 'autacoids',
      building: 'the potent heavy-duty furnace-killer at the industrial end of the plaza',
      class: 'Non-selective COX inhibitor (NSAID); indole acetic acid derivative — one of the most potent',
      mechanism: 'Potent non-selective inhibition of COX-1 and COX-2. Reduces prostaglandin synthesis systemically, including PGE2 and PGI2 (prostacyclin) in the ductus arteriosus. In neonates, the ductus arteriosus is maintained open by locally produced PGE2; indomethacin inhibits this pathway, causing ductal smooth muscle constriction and closure of the patent ductus arteriosus (PDA).',
      adverse_effects: 'High incidence of GI toxicity (ulcers, haemorrhage); CNS effects (headache, dizziness, confusion); renal impairment; platelet dysfunction; AERD risk; neonatal AKI and oliguria when used to close PDA. CONTRAINDICATED in transposition of great vessels (TGV) and other ductal-dependent congenital heart defects where PDA must remain patent to maintain pulmonary or systemic blood flow.',
      clinical_use: 'Closure of patent ductus arteriosus (PDA) in preterm neonates — primary pharmacological indication. Acute gout (very effective). Ankylosing spondylitis. Pericarditis. Bartter syndrome. NOT recommended for general pain management due to CNS and GI toxicity.',
      memory_hook: 'The heavy-duty furnace-killer closes the ductus arteriosus by extinguishing PGE2 — a lifesaver in premature PDA, but banned in towns where the ductus is the only route alive (transposition of great vessels).',
      source: 'G&G 14e, ch. 41',
      high_yield: true,
    },
    {
      id: 'celecoxib',
      district: 'autacoids',
      building: 'the selective COX-2 targeted sprinkler system in the GI-safe wing of the plaza',
      class: 'Selective COX-2 inhibitor (coxib); diarylheterocycle',
      mechanism: 'Selectively inhibits cyclooxygenase-2 (COX-2), the inducible isoform upregulated at sites of inflammation, while largely sparing COX-1 (constitutive; responsible for gastric mucosal protection and renal prostaglandins). Reduced GI prostaglandin depletion → lower incidence of GI ulcers than non-selective NSAIDs. However, COX-2 inhibition reduces prostacyclin (PGI2) synthesis in vascular endothelium without reducing thromboxane A2 (COX-1 dependent) → net prothrombotic, pro-vasoconstrictive state → increased cardiovascular risk.',
      adverse_effects: 'Increased cardiovascular risk (myocardial infarction, stroke — class effect of coxibs); fluid retention; hypertension; renal impairment (prostaglandin-dependent); GI side effects less than non-selective NSAIDs. SULFONAMIDE ALLERGY PRECAUTION: celecoxib contains a sulfonamide moiety — use with caution in sulfonamide-allergic patients. AERD risk (as with other NSAIDs in sensitive asthmatics). Contraindicated third trimester pregnancy.',
      clinical_use: 'Osteoarthritis; rheumatoid arthritis; ankylosing spondylitis. Preferred over non-selective NSAIDs in patients with high GI risk (history of ulcers) provided cardiovascular risk is low. Familial adenomatous polyposis (FAP) — reduces polyp burden.',
      memory_hook: 'The selective sprinkler targets only the inflammatory fire (COX-2) and spares the stomach — but it disables the anti-clot sprinklers (prostacyclin) without touching the clot-promoting ones (thromboxane A2), tilting the heart toward infarction and requiring a sulfonamide allergy check at the door.',
      source: 'G&G 14e, ch. 41',
      high_yield: true,
    },
    {
      id: 'paracetamol',
      district: 'autacoids',
      building: 'the analgesic-antipyretic depot at the corner of Fever Street with NO inflammatory banner',
      class: 'Analgesic and antipyretic; weak COX inhibitor (exact mechanism incompletely defined)',
      mechanism: 'Inhibits prostaglandin synthesis centrally (in the CNS) more than peripherally — proposed to act on a COX-3 variant (splice variant of COX-1) in the CNS, or by reducing the oxidised form of COX at low peroxide concentrations (central sites with low peroxide). Does NOT have clinically meaningful peripheral anti-inflammatory activity — it is NOT an anti-inflammatory drug. Hepatotoxicity in overdose: normally metabolised by glucuronidation and sulphation (safe); minor fraction via CYP2E1 to N-acetyl-p-benzoquinone imine (NAPQI). In overdose, glucuronidation and sulphation saturated → excess NAPQI accumulates → depletes hepatic glutathione → covalent binding to hepatocyte proteins → centrilobular necrosis.',
      adverse_effects: 'Safe at therapeutic doses; HEPATOTOXICITY in overdose (most common cause of acute liver failure in UK and USA). Risk increased by alcohol use (CYP2E1 induction), fasting (depleted glutathione), enzyme inducers (rifampicin, phenytoin). ANTIDOTE for overdose: N-acetylcysteine (NAC) — replenishes glutathione and provides cysteine for alternative NAPQI conjugation. No anti-inflammatory effect even at maximum dose.',
      clinical_use: 'Mild-to-moderate pain (headache, dysmenorrhoea, dental pain, musculoskeletal); antipyresis; first-line analgesic in osteoarthritis; safe in pregnancy (preferred analgesic); safe in patients with peptic ulcer or GI sensitivity (no COX-1 peripheral inhibition). NOTE: has NO anti-inflammatory effect — cannot substitute for NSAIDs in inflammatory conditions.',
      memory_hook: 'The depot banner reads "ANALGESIC and ANTIPYRETIC — NO INFLAMMATION SERVICE" — paracetamol soothes the fever and pain centrally but cannot fight peripheral fire; in overdose, the metabolite NAPQI burns down the liver, and the only fire extinguisher is N-acetylcysteine (NAC).',
      source: 'G&G 14e, ch. 41',
      high_yield: true,
    },
    {
      id: 'misoprostol',
      district: 'autacoids',
      building: 'the PGE1 analogue courier post at the gastric protection and obstetrics junction',
      class: 'PGE1 analogue (synthetic); EP receptor agonist (EP1, EP2, EP3)',
      mechanism: 'Synthetic analogue of prostaglandin E1. Activates EP1 and EP3 prostaglandin receptors on gastric parietal and mucous cells: stimulates mucus and bicarbonate secretion, increases mucosal blood flow, reduces cAMP → reduces gastric acid secretion. In the uterus: binds EP2 and EP3 receptors on myometrium → increased intracellular calcium → uterine contractions; binds prostaglandin receptors on cervical collagen → collagenolysis and cervical softening (ripening).',
      adverse_effects: 'Diarrhoea (most common, dose-dependent); abdominal cramping; uterine contractions (teratogenic and abortifacient in pregnancy — must NOT be used in pregnancy except for specific obstetric indications); fever.',
      clinical_use: 'Prevention of NSAID-induced gastric ulcers (co-prescribed with NSAIDs in high-risk patients); peptic ulcer treatment. Obstetric uses: cervical ripening before labour induction; medical abortion (combined with mifepristone — mifepristone blocks progesterone → misoprostol causes uterine contractions); postpartum haemorrhage management.',
      memory_hook: 'The PGE1 courier both protects the gastric post-box (replacing the prostaglandins the NSAIDs removed) and delivers uterine contraction telegrams — a postal worker with two entirely different job descriptions.',
      source: 'G&G 14e, ch. 41',
      high_yield: true,
    },

    // ─── LEUKOTRIENE MODIFIERS ────────────────────────────────────────────────

    {
      id: 'montelukast',
      district: 'autacoids',
      building: 'the CysLT1 receptor blocking dock at the asthma wharf — FDA black-box warning posted at entrance',
      class: 'Cysteinyl leukotriene receptor 1 (CysLT1) antagonist; leukotriene receptor antagonist (LTRA)',
      mechanism: 'Selectively and competitively blocks CysLT1 receptors on bronchial smooth muscle and eosinophils. Prevents cysteinyl leukotrienes (LTC4, LTD4, LTE4 — formerly called slow-reacting substances of anaphylaxis, SRS-A) from inducing bronchoconstriction, mucus secretion, mucosal oedema, and eosinophil recruitment. Also useful in aspirin/NSAID-exacerbated respiratory disease (AERD) because AERD involves excess leukotriene production.',
      adverse_effects: 'Generally well tolerated; headache; GI disturbance. FDA BOXED WARNING (neuropsychiatric effects): depression, suicidal ideation and behaviour, nightmares, hallucinations, agitation, aggressive behaviour, and other neuropsychiatric events reported — prescribers must counsel patients and consider risk-benefit, especially for mild conditions like allergic rhinitis.',
      clinical_use: 'Prophylaxis and chronic treatment of asthma (not for acute attacks); allergic rhinitis; prevention of exercise-induced bronchoconstriction; aspirin/NSAID-exacerbated respiratory disease (AERD). Alternative or add-on to inhaled corticosteroids.',
      memory_hook: 'The black-box warning nailed to the asthma wharf entrance reads "neuropsychiatric cargo: depression, suicidal ideation, behavioural changes" — montelukast opens the CysLT1 gate for air but requires a mental health risk declaration before boarding.',
      source: 'G&G 14e, ch. 41',
      high_yield: true,
    },

    // ─── PROSTAGLANDIN ANALOGUE (OPHTHALMIC) ─────────────────────────────────

    {
      id: 'latanoprost',
      district: 'autacoids',
      building: 'the uveoscleral outflow drainage office at the eye-canal end of the lane',
      class: 'PGF2α analogue (synthetic); prostaglandin FP receptor agonist',
      mechanism: 'Prodrug (isopropyl ester hydrolysed to active acid in cornea). Activates FP prostaglandin receptors on ciliary muscle and scleral cells → remodelling of extracellular matrix → increased uveoscleral (unconventional) outflow of aqueous humour → decreased intraocular pressure. Does not significantly affect aqueous production or trabecular outflow at standard doses.',
      adverse_effects: 'Iris pigmentation change (increased melanin in iris — irreversible); eyelash growth (hypertrichosis, increased length, thickness, number — side-effect used therapeutically as bimatoprost for cosmesis); periorbital fat atrophy (prostaglandin lipase effect); conjunctival hyperaemia; eye irritation. Systemic absorption: may worsen uveitis, caution in herpetic eye disease.',
      clinical_use: 'First-line topical treatment for open-angle glaucoma and ocular hypertension. Once-daily evening dosing (trough IOP effect is morning). Used when beta-blocker eye drops are contraindicated.',
      memory_hook: 'The uveoscleral drainage office opens a side door (unconventional outflow) to drain the eye pressure — the price of using it every evening is that your iris may change colour and your eyelashes may grow like vines.',
      source: 'G&G 14e, ch. 41',
      high_yield: false,
    },

    // ─── LONG-TAIL ENTRIES ────────────────────────────────────────────────────

    {
      id: 'zafirlukast',
      district: 'autacoids',
      building: 'the older leukotriene dock warehouse at the back of the asthma wharf',
      class: 'CysLT1 receptor antagonist (LTRA); older-generation leukotriene antagonist',
      mechanism: 'Competitively blocks CysLT1 receptors, preventing LTC4/LTD4/LTE4-mediated bronchoconstriction, mucus secretion, and eosinophil recruitment. Inhibits CYP2C9, CYP3A4 — significant drug interactions (warfarin, theophylline). Requires twice-daily dosing (shorter half-life than montelukast).',
      adverse_effects: 'Hepatotoxicity (hepatic failure reported — liver function monitoring recommended); drug interactions via CYP inhibition (warfarin — INR rise; theophylline); headache; GI disturbance; Churg-Strauss syndrome (eosinophilic granulomatosis with polyangiitis) has been associated with leukotriene antagonists (possibly due to steroid tapering unmasking the condition).',
      clinical_use: 'Asthma prophylaxis; allergic rhinitis. Less used than montelukast due to hepatotoxicity risk, twice-daily dosing, and drug interactions.',
      memory_hook: 'The older warehouse blocks the same leukotriene dock as montelukast but runs a hepatotoxicity hazard and meddles with the CYP450 customs office — twice-daily logistics make it the less favoured option.',
      source: 'G&G 14e, ch. 41',
      high_yield: false,
    },
    {
      id: 'zileuton',
      district: 'autacoids',
      building: 'the 5-lipoxygenase inhibitor workshop at the upstream end of the leukotriene factory',
      class: '5-lipoxygenase (5-LOX) inhibitor; leukotriene synthesis inhibitor',
      mechanism: 'Inhibits 5-lipoxygenase enzyme, preventing conversion of arachidonic acid to 5-hydroperoxyeicosatetraenoic acid (5-HPETE) and subsequently to leukotriene A4 (LTA4). This blocks synthesis of ALL leukotrienes (LTB4, LTC4, LTD4, LTE4), not just CysLT1 receptor blockade. Inhibits CYP1A2 → drug interactions with theophylline (theophylline levels rise), warfarin.',
      adverse_effects: 'Hepatotoxicity (hepatotoxic — requires liver function test monitoring at baseline, at 1 month, and periodically); drug interactions (theophylline levels increase significantly via CYP1A2 inhibition); dyspepsia; headache.',
      clinical_use: 'Asthma prophylaxis (especially NSAID/aspirin-exacerbated asthma — addresses upstream leukotriene synthesis). Requires regular liver function monitoring. Not first-line due to LFT monitoring burden and drug interactions.',
      memory_hook: 'The upstream workshop shuts down the whole leukotriene factory (5-LOX inhibitor) rather than just blocking the receptor dock — but the workshop runs a liver fire-risk and demands regular LFT safety inspections.',
      source: 'G&G 14e, ch. 41',
      high_yield: false,
    },
  ],
};

if (typeof window !== 'undefined') window.DISTRICT_AUTACOIDS = DISTRICT_AUTACOIDS;

// Animation registration — six lanterns flicker along the lane
if (typeof window !== 'undefined' && window.PHARMA?.animations) {
  window.PHARMA.animations.register('autacoids', ({ THREE, scene, groupRoot, primitives, loop }) => {
    // Six small lanterns flicker along the lane.
    const lanterns = [];
    for (let i = 0; i < 6; i++) {
      const x = -12 + i * 5;
      const lantern = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 12, 8),
        new THREE.MeshBasicMaterial({ color: 0xFAC775 })
      );
      lantern.position.set(x, 10, 0);
      lantern.userData = { phase: Math.random() * Math.PI * 2, speed: 1.6 + Math.random() * 1.2 };
      groupRoot.add(lantern);
      lanterns.push(lantern);
    }
    loop.add((_dt, t) => {
      lanterns.forEach((l) => {
        const flicker = 0.7 + 0.3 * Math.abs(Math.sin(t * l.userData.speed + l.userData.phase));
        const c = Math.floor(255 * flicker);
        l.material.color.setRGB(c / 255, (c * 0.78) / 255, (c * 0.45) / 255);
      });
    });
  });
}
