const DISTRICT_RECENT_ADVANCES = {
  id: 'recent_advances',
  name: 'Recent Advances',
  theme_line: 'New town · clinical pharma, pharmacogenomics, biologics, trials',
  walkthrough: `New Town is the newest district in Pharmacology City — its towers still gleaming, its roads still being surfaced, and its pharmacological landscape changing faster than any cartographer can record. The buildings here represent either breakthrough therapeutics approved in the last decade or the conceptual infrastructure that underpins modern personalised medicine.

At the northern end of New Town, the CAR-T construction yards operate at the edge of what was previously thought possible. Tisagenlecleucel's facility takes a patient's own T lymphocytes from their blood, genetically reprograms them with a chimeric antigen receptor (CAR) recognising the B-cell marker CD19, expands them into an army, and then re-infuses them. The cytokine storm warning siren — cytokine release syndrome (CRS) — sounds shortly after infusion in most patients; tocilizumab (the anti-IL-6 receptor antibody from the neighbouring biologics tower) is kept ready to douse the fire.

Across the central plaza, the siRNA innovation centre houses inclisiran — the first RNA interference therapeutic approved for hyperlipidaemia. Instead of inhibiting the PCSK9 protein (like the PCSK9 antibodies evolocumab and alirocumab), inclisiran silences the PCSK9 gene at the mRNA level. Two injections per year replace the fortnightly subcutaneous injections of the antibodies.

The COVID therapeutics pavilion opened in 2021 and has since been continuously updated. Nirmatrelvir-ritonavir occupies the protease inhibitor section; the ritonavir component is purely a pharmacokinetic booster via CYP3A4 inhibition, dramatically raising nirmatrelvir levels, but bringing a comprehensive drug interaction profile from the CYP3A4 pathway.

The pharmacogenomics tower stands at the centre of New Town and is the tallest structure in the district. Its database maps human genetic variants to drug responses — the TPMT-thiopurine axis, CYP2C19-clopidogrel, HLA allele-hypersensitivity reactions — representing the future of prescribing.`,
  palette: { ground: 0xC8E6C9, accent: 0x2E7D32, water: 0x81D4FA },
  position: { x: 0, z: 70 },
  classification: {
    sources: [
      {
        label: 'G&G 14e',
        cite: 'cross-chapter',
        groups: [
          { heading: 'A. Cell & gene therapies', groups: [
            { heading: 'CAR-T cell therapy', drugs: ['Tisagenlecleucel', 'Axicabtagene ciloleucel'] },
          ]},
          { heading: 'B. Monoclonal antibodies', groups: [
            { heading: 'Anti-IL-6R', drugs: ['Tocilizumab'] },
            { heading: 'Anti-amyloid for Alzheimer\'s', drugs: ['Lecanemab', 'Aducanumab', 'Donanemab'] },
          ]},
          { heading: 'C. Antibody–drug conjugates (ADCs)', drugs: ['Sacituzumab govitecan', 'Trastuzumab emtansine'] },
          { heading: 'D. RNA-based therapeutics', groups: [
            { heading: 'siRNA', drugs: ['Inclisiran', 'Patisiran'] },
            { heading: 'Antisense oligonucleotides', drugs: ['Nusinersen'] },
            { heading: 'mRNA vaccines', drugs: ['mRNA vaccines'] },
          ]},
          { heading: 'E. Incretin-based & metabolic', groups: [
            { heading: 'Dual GIP/GLP-1 agonist', drugs: ['Tirzepatide'] },
          ]},
          { heading: 'F. Antiviral combinations', groups: [
            { heading: 'Oral SARS-CoV-2 protease inhibitor', drugs: ['Nirmatrelvir/ritonavir'] },
          ]},
          { heading: 'G. Precision medicine & drug safety', groups: [
            { heading: 'Pharmacogenomics', drugs: ['CYP2C19', 'HLA-B*5701', 'TPMT'] },
            { heading: 'Pharmacovigilance', drugs: ['Black-box warnings', 'REMS', 'Post-marketing surveillance'] },
          ]},
        ],
      },
      {
        label: 'KDT 8e/9e',
        cite: 'cross-chapter / appendix',
        groups: [
          { heading: 'A. Cell & gene therapies', groups: [
            { heading: 'CAR-T cell therapy', drugs: ['Tisagenlecleucel', 'Axicabtagene ciloleucel'] },
          ]},
          { heading: 'B. Monoclonal antibodies', groups: [
            { heading: 'Anti-IL-6R', drugs: ['Tocilizumab'] },
            { heading: 'Anti-amyloid for Alzheimer\'s', drugs: ['Lecanemab', 'Aducanumab', 'Donanemab'] },
          ]},
          { heading: 'C. Antibody–drug conjugates (ADCs)', drugs: ['Sacituzumab govitecan', 'Trastuzumab emtansine'] },
          { heading: 'D. RNA-based therapeutics', groups: [
            { heading: 'siRNA', drugs: ['Inclisiran', 'Patisiran'] },
            { heading: 'Antisense oligonucleotides', drugs: ['Nusinersen'] },
            { heading: 'mRNA vaccines', drugs: ['mRNA vaccines'] },
          ]},
          { heading: 'E. Incretin-based & metabolic', groups: [
            { heading: 'Dual GIP/GLP-1 agonist', drugs: ['Tirzepatide'] },
          ]},
          { heading: 'F. Antiviral combinations', groups: [
            { heading: 'Oral SARS-CoV-2 protease inhibitor', drugs: ['Nirmatrelvir/ritonavir'] },
          ]},
          { heading: 'G. Precision medicine & drug safety', groups: [
            { heading: 'Pharmacogenomics', drugs: ['CYP2C19', 'HLA-B*5701', 'TPMT'] },
            { heading: 'Pharmacovigilance', drugs: ['Black-box warnings', 'REMS', 'Post-marketing surveillance'] },
          ]},
        ],
      },
    ],
  },
  drugs: [
    {
      id: 'tisagenlecleucel',
      district: 'recent_advances',
      building: 'the CAR-T construction yard at the northern gene therapy precinct',
      class: 'Chimeric Antigen Receptor T cell (CAR-T) therapy; CD19-directed',
      mechanism: 'Autologous T cells are harvested from the patient by leukapheresis, genetically modified ex vivo using a lentiviral vector to express a chimeric antigen receptor (CAR) targeting CD19 (a surface antigen expressed on B cells and most B-cell malignancies). After ex vivo expansion, the CAR-T cells are re-infused following lymphodepleting chemotherapy (to reduce regulatory T cells and increase homeostatic cytokines). CAR-T cells proliferate in vivo and kill CD19-expressing leukaemia cells via CAR-directed cytotoxicity (perforin/granzyme pathway). The massively amplified immune response triggers cytokine release syndrome (CRS), caused by IL-6, IL-1, and IFN-gamma release from activated macrophages and T cells. Tocilizumab (anti-IL-6R) is the primary rescue therapy for CRS.',
      adverse_effects: 'Cytokine release syndrome (CRS): fever, hypotension, hypoxia, end-organ damage — graded I-IV; tocilizumab and corticosteroids for grade II+. Immune effector cell-associated neurotoxicity syndrome (ICANS): cerebral oedema, confusion, seizures, aphasia. Prolonged cytopenias; B-cell aplasia (on-target/off-tumour, requires Ig replacement); infections (severe immunosuppression); tumour lysis syndrome.',
      clinical_use: 'Relapsed/refractory B-cell acute lymphoblastic leukaemia (B-ALL) in patients up to age 25; relapsed/refractory large B-cell lymphoma. One of the first FDA-approved gene therapy products for cancer.',
      memory_hook: 'Tisagenlecleucel takes the patient\'s own T cells, programs them to hunt CD19, and releases an army — but the army\'s activation sets off a citywide cytokine storm alarm that tocilizumab must extinguish.',
      source: 'G&G 14e, ch. 69',
      high_yield: true,
    },
    {
      id: 'tocilizumab',
      district: 'recent_advances',
      building: 'the anti-IL-6 receptor emergency response station',
      class: 'Anti-IL-6 receptor monoclonal antibody; humanised IgG1',
      mechanism: 'Binds both membrane-bound and soluble forms of the IL-6 receptor alpha (IL-6Rα), blocking IL-6 signalling. IL-6 is a pleiotropic cytokine central to acute-phase responses, fever, hepatocyte acute-phase protein synthesis, B-cell differentiation, and T-cell proliferation. Blocking IL-6 signalling reduces the cytokine storm in CRS (where macrophage-derived IL-6 drives the cascade). In rheumatoid arthritis, IL-6 drives synovial inflammation and joint destruction. In COVID-19, IL-6 contributes to hyperinflammation and ARDS.',
      adverse_effects: 'Increased risk of infections (especially bacterial — IL-6 is required for acute-phase response); increased AST/ALT (hepatotoxicity); hyperlipidaemia; neutropenia; thrombocytopenia; GI perforation (rare, especially in patients on NSAIDs or corticosteroids); infusion reactions; reactivation of latent TB (screen before use).',
      clinical_use: 'Rheumatoid arthritis (biologic-naive and after conventional DMARDs); giant cell arteritis; polyarticular and systemic juvenile idiopathic arthritis; cytokine release syndrome (CRS) from CAR-T therapy — first-line treatment; COVID-19 with severe/critical disease and hyperinflammation (hospitalised patients on supplemental oxygen).',
      memory_hook: 'Tocilizumab blocks the IL-6 distress signal receptor — whether the alarm is from an autoimmune joint, a CAR-T cell storm, or a COVID inflammatory spiral, silencing IL-6Rα brings the fire down.',
      source: 'G&G 14e, ch. 38',
      high_yield: true,
    },
    {
      id: 'inclisiran',
      district: 'recent_advances',
      building: 'the siRNA PCSK9 gene silencing centre at the RNA innovation plaza',
      class: 'Small interfering RNA (siRNA); PCSK9 inhibitor; twice-yearly injection',
      mechanism: 'A synthetic small interfering RNA (siRNA) conjugated to N-acetylgalactosamine (GalNAc) for hepatic targeting via asialoglycoprotein receptors. Once taken up by hepatocytes, the siRNA is loaded into the RNA-induced silencing complex (RISC) → targets PCSK9 mRNA for cleavage → mRNA degradation → prevents translation of PCSK9 protein. PCSK9 normally binds LDL receptors and targets them for lysosomal degradation; without PCSK9, LDL receptors recycle back to the hepatocyte surface → increased LDL clearance from plasma → LDL-C reduction (approximately 50% from baseline). Unlike PCSK9 antibodies, inclisiran acts intracellularly at the mRNA level and requires only two injections per year (subcutaneous; initial injection, repeat at 3 months, then every 6 months).',
      adverse_effects: 'Injection-site reactions (redness, pain, rash — most common); nasopharyngitis; arthralgia; back pain; diarrhoea; urinary tract infection; no major systemic off-target effects identified in clinical trials (ORION programme).',
      clinical_use: 'Hypercholesterolaemia (LDL-C reduction) in adults with or at high risk of cardiovascular disease who are on maximally tolerated statins and require additional LDL lowering; familial hypercholesterolaemia (heterozygous); post-myocardial infarction secondary prevention.',
      memory_hook: 'Inclisiran is the gene-silencing sniper — instead of catching the PCSK9 protein after it\'s made, it destroys the blueprint (mRNA) before a single PCSK9 molecule is printed, twice a year.',
      source: 'G&G 14e, ch. 35',
      high_yield: true,
    },
    {
      id: 'nirmatrelvir_ritonavir',
      district: 'recent_advances',
      building: 'the SARS-CoV-2 protease inhibitor pavilion with the DDI caution board',
      class: 'SARS-CoV-2 main protease (3CL pro) inhibitor + pharmacokinetic booster; direct-acting antiviral',
      mechanism: 'NIRMATRELVIR: inhibits the SARS-CoV-2 main protease (3CL proteinase, Mpro) — a cysteine protease required to cleave viral polyproteins into functional non-structural proteins essential for viral replication. Without functional Mpro, the virus cannot replicate. RITONAVIR: a potent CYP3A4 inhibitor used at a sub-therapeutic antiviral dose solely as a pharmacokinetic booster (does not have antiviral activity against SARS-CoV-2 at this dose). CYP3A4 inhibition by ritonavir prevents rapid metabolism of nirmatrelvir, maintaining adequate plasma levels. The ritonavir component causes extensive drug-drug interactions via CYP3A4 inhibition (e.g., may increase immunosuppressant, statin, antiarrhythmic, sedative levels; may reduce hormonal contraceptive efficacy via CYP induction in some contexts).',
      adverse_effects: 'Dysgeusia (metallic/altered taste — common, from ritonavir); nausea; diarrhoea; hypertension; myalgia; rash; drug-drug interactions via CYP3A4 (e.g., simvastatin, amiodarone, midazolam, certain immunosuppressants contraindicated or require dose adjustment); rebound COVID-19 symptoms after course completion (reported in a subset of patients).',
      clinical_use: 'Treatment of mild-to-moderate COVID-19 in adults at high risk of progression to severe disease (elderly, immunocompromised, certain comorbidities) — initiated within 5 days of symptom onset. Reduces hospitalisation and death. Requires careful medication reconciliation for DDIs before prescribing.',
      memory_hook: 'Nirmatrelvir stops the COVID virus from cutting its own polyprotein instructions, while ritonavir holds the front door of CYP3A4 shut to keep nirmatrelvir in the bloodstream — but that same shut door bottles up half the other drugs on the list.',
      source: 'G&G 14e, ch. 67',
      high_yield: true,
    },
    {
      id: 'tirzepatide',
      district: 'recent_advances',
      building: 'the dual GIP/GLP-1 agonist tower at the metabolic innovation precinct',
      class: 'Dual GIP (glucose-dependent insulinotropic polypeptide) and GLP-1 receptor agonist',
      mechanism: 'Activates both GIP receptors and GLP-1 receptors simultaneously. GLP-1 receptor agonism: stimulates glucose-dependent insulin secretion from beta cells, suppresses glucagon from alpha cells, delays gastric emptying, reduces appetite via central hypothalamic effects, and promotes beta-cell survival. GIP receptor agonism: also stimulates glucose-dependent insulin secretion (incretin effect) and may promote adipose tissue insulin sensitivity and fat oxidation; GIP may also potentiate GLP-1 receptor signalling. The dual agonism produces greater glycaemic control and weight reduction than GLP-1 receptor agonists alone (SURPASS trials). Given by weekly subcutaneous injection.',
      adverse_effects: 'Nausea; vomiting; diarrhoea; constipation; decreased appetite; injection-site reactions; pancreatitis (rare); gallstones/biliary disease (as with all GLP-1 class); rare: hypoglycaemia (more common if combined with insulin or sulfonylureas); thyroid C-cell tumours in rodents (class effect — CI with personal/family history of medullary thyroid carcinoma or MEN2).',
      clinical_use: 'Type 2 diabetes mellitus — glucose lowering and weight reduction; obesity management (at higher doses, for weight loss as primary indication — SURMOUNT trials). One of the most effective agents for both glycaemic control and weight reduction available.',
      memory_hook: 'Tirzepatide fires two incretin flares at once — the GLP-1 and GIP receptor both light up, producing weight loss and glucose control that neither agonist achieves alone.',
      source: 'G&G 14e, ch. 43',
      high_yield: true,
    },
    {
      id: 'lecanemab',
      district: 'recent_advances',
      building: 'the anti-amyloid Alzheimer\'s disease treatment tower with the ARIA monitoring suite',
      class: 'Anti-amyloid beta monoclonal antibody; humanised IgG1; Alzheimer\'s disease-modifying therapy',
      mechanism: 'Binds with high affinity to soluble and insoluble amyloid-beta (Aβ) aggregates — particularly protofibrils (early aggregated forms of Aβ) — promoting their clearance from the brain. Amyloid hypothesis: Aβ accumulation triggers tau hyperphosphorylation, neuroinflammation, and neurodegeneration in Alzheimer\'s disease. By reducing brain amyloid burden, lecanemab slows clinical progression. Amyloid-related imaging abnormalities (ARIA) are the major safety concern: ARIA-E (oedema/effusions) and ARIA-H (haemosiderin/microhaemorrhages) visible on MRI, likely from amyloid removal from blood vessel walls causing inflammation or microbleeds. CLARITY AD trial demonstrated slowed clinical decline on CDR-SB scale.',
      adverse_effects: 'Amyloid-related imaging abnormalities (ARIA) — ARIA-E (cerebral oedema/sulcal effusions, ~21% of patients, mostly asymptomatic) and ARIA-H (microhaemorrhages/haemosiderin deposition, ~14%); headache; infusion reactions; fatal ARIA reported in patients on anticoagulants (especially apixaban — increased haemorrhagic risk); falls; diarrhoea; weight loss.',
      clinical_use: 'Early symptomatic Alzheimer\'s disease (mild cognitive impairment or mild dementia stage) with confirmed amyloid pathology (PET or CSF biomarkers). Patients must have MRI monitoring for ARIA before and during treatment. Not indicated for moderate or severe AD. Requires anticoagulant reconciliation before initiating.',
      memory_hook: 'Lecanemab is the amyloid scalpel — it targets the early aggregate protofibrils and clears them from the brain, slowing the Alzheimer\'s disease timeline, but its ARIA side-effect is the MRI shadow left behind by the cleanup operation.',
      source: 'G&G 14e, ch. 18',
      high_yield: true,
    },
    {
      id: 'pharmacogenomics_overview',
      district: 'recent_advances',
      building: 'the pharmacogenomics tower at the centre of new town',
      class: 'Pharmacogenomics concept',
      mechanism: 'Pharmacogenomics studies how genetic variation influences drug response, enabling personalised prescribing. Key examples: TPMT (thiopurine methyltransferase) — genetic variants reduce TPMT activity, causing accumulation of active thioguanine nucleotides from azathioprine or mercaptopurine → severe myelosuppression; TPMT genotyping/phenotyping is standard before initiating thiopurines. CYP2C19 — loss-of-function variants are common (especially in East Asian populations); poor metabolisers cannot bioactivate clopidogrel to its active thiol metabolite → reduced antiplatelet effect; alternative agents (ticagrelor, prasugrel) recommended. CYP2D6 ultra-rapid metabolisers — codeine is converted too quickly to morphine → respiratory depression risk, especially in children (codeine now contraindicated in paediatrics). HLA-B*1502 — strongly predicts Stevens-Johnson syndrome/toxic epidermal necrolysis (SJS/TEN) from carbamazepine in Han Chinese and other Southeast Asian populations; mandatory testing in these populations before prescribing. HLA-B*5701 — predicts abacavir hypersensitivity syndrome; mandatory testing before prescribing abacavir globally.',
      adverse_effects: 'Consequences of not accounting for pharmacogenomics: thiopurine myelosuppression in TPMT-poor metabolisers; inadequate antiplatelet effect from clopidogrel in CYP2C19 poor metabolisers; morphine toxicity from codeine in CYP2D6 ultra-rapid metabolisers; carbamazepine SJS/TEN in HLA-B*1502 carriers; abacavir hypersensitivity in HLA-B*5701 carriers.',
      clinical_use: 'Pharmacogenomic testing is incorporated into clinical guidelines for: thiopurines (TPMT/NUDT15 testing), clopidogrel in ACS/PCI (CYP2C19 testing), abacavir (HLA-B*5701 screening), carbamazepine in specific populations (HLA-B*1502 screening), codeine in paediatrics (CYP2D6 — now generally avoided), warfarin dose prediction (CYP2C9 + VKORC1).',
      memory_hook: 'The pharmacogenomics tower maps the city\'s genetic streets — before prescribing, check whether the patient\'s DNA routes the drug through the right metabolic pathway or into a toxic dead end.',
      source: 'G&G 14e, ch. 7',
      high_yield: true,
    },
    {
      id: 'mrna_vaccines',
      district: 'recent_advances',
      building: 'the mRNA vaccine research and cold-chain facility',
      class: 'Vaccine technology concept; mRNA lipid nanoparticle platform',
      mechanism: 'mRNA vaccines encode the antigen (e.g., SARS-CoV-2 spike protein) within a synthetic, modified mRNA (using pseudouridine modifications to reduce innate immune activation and increase mRNA stability). Packaged in lipid nanoparticles (LNPs) to facilitate cellular uptake. Once inside cells (predominantly near the injection site and lymph nodes), the mRNA is translated into antigen → antigen is expressed on cell surfaces and secreted → adaptive immune response (antibody + T-cell) is generated. The mRNA does not enter the nucleus, does not integrate into DNA, and is degraded within days. Cold-chain requirements (ultra-cold storage for some formulations) were a major logistical challenge during early rollout.',
      adverse_effects: 'Injection-site pain, redness, swelling (common); systemic reactogenicity (fever, fatigue, myalgia, headache — more common after second dose); rare: myocarditis and pericarditis, predominantly in young males after the second dose (typically mild and self-limiting); rare anaphylaxis (related to polyethylene glycol in LNP formulation); VITT (vaccine-induced immune thrombocytopenia with thrombosis) — reported with adenoviral vector vaccines, not mRNA vaccines.',
      clinical_use: 'COVID-19 prevention (primary series and boosters); mRNA platform under investigation for influenza, RSV, cancer vaccines (personalised neoantigen vaccines), and other infectious diseases. A paradigm shift in vaccine technology that enables rapid vaccine design and manufacture.',
      memory_hook: 'mRNA vaccines are the city\'s new blueprint-delivery system — no whole organism or live pathogen required, just a molecular instruction manual for the immune system to read, make the protein, mount the defence, then shred the instructions.',
      source: 'G&G 14e, ch. 65',
      high_yield: false,
    },
    {
      id: 'sacituzumab_govitecan',
      district: 'recent_advances',
      building: 'the antibody-drug conjugate precision oncology dock',
      class: 'Antibody-drug conjugate (ADC); anti-Trop-2 antibody linked to SN-38 (irinotecan active metabolite)',
      mechanism: 'Sacituzumab govitecan is an antibody-drug conjugate (ADC) consisting of a humanised anti-Trop-2 (trophoblast cell-surface antigen 2) IgG1 antibody conjugated to SN-38 (the active metabolite of irinotecan) via a hydrolysable linker. Trop-2 is highly expressed on triple-negative breast cancer (TNBC) and other carcinomas. The ADC binds Trop-2 on tumour cells → internalised by receptor-mediated endocytosis → linker hydrolysed in the acidic lysosome → SN-38 released intracellularly → inhibits topoisomerase I → DNA strand breaks → apoptosis. High drug-to-antibody ratio (approximately 7.6:1) allows delivery of more SN-38 per antibody than conventional ADCs. Bystander effect: free SN-38 released can kill adjacent Trop-2-negative cells.',
      adverse_effects: 'Severe neutropenia (most common dose-limiting toxicity — high frequency, including febrile neutropenia; requires G-CSF prophylaxis); diarrhoea; nausea; vomiting; alopecia; anaemia; UGT1A1*28 homozygotes have reduced SN-38 glucuronidation → higher SN-38 exposure → more toxicity; fatigue; rash.',
      clinical_use: 'Unresectable locally advanced or metastatic triple-negative breast cancer (TNBC) after prior therapy (ASCENT trial); metastatic urothelial carcinoma after prior platinum and checkpoint inhibitor; hormone receptor-positive/HER2-negative breast cancer (TROPiCS-02 trial).',
      memory_hook: 'Sacituzumab govitecan is the cancer-precision delivery drone — it locks onto Trop-2 on the tumour surface and drops its SN-38 payload precisely inside before the surrounding tissue knows what happened.',
      source: 'G&G 14e, ch. 69',
      high_yield: false,
    },
    {
      id: 'pharmacovigilance_overview',
      district: 'recent_advances',
      building: 'the pharmacovigilance safety monitoring observatory',
      class: 'Pharmacovigilance concept',
      mechanism: 'Pharmacovigilance is the science and activities relating to the detection, assessment, understanding, and prevention of adverse effects or any other drug-related problems. Key elements: Black-box warnings (boxed warnings in the US): the strongest FDA safety alert in prescribing information, reserved for serious or life-threatening risks (e.g., LABA monotherapy in asthma, REMS programmes, tardive dyskinesia with metoclopramide, hepatotoxicity with tolvaptan). Risk Evaluation and Mitigation Strategies (REMS): FDA-mandated safety programmes for drugs with serious risks that require specific actions beyond standard labelling (e.g., isotretinoin iPledge for teratogenicity; clozapine for agranulocytosis; thalidomide for teratogenicity). MedDRA (Medical Dictionary for Regulatory Activities): international standardised terminology for classifying adverse drug events in pharmacovigilance databases. Post-marketing surveillance: Phase IV studies detect rare adverse effects not identified in pre-marketing trials (e.g., rhabdomyolysis with statins, cardiac events with rofecoxib leading to withdrawal).',
      adverse_effects: 'Systematic failures in pharmacovigilance lead to: failure to detect rare but serious ADRs post-marketing; delayed withdrawal of harmful drugs (rofecoxib, rosiglitazone); insufficient warning to prescribers of serious interaction risks.',
      clinical_use: 'Understanding pharmacovigilance is essential for: interpreting black-box warnings and knowing when they are absolute versus relative contraindications; understanding why drugs are withdrawn post-marketing; responding appropriately to REMS requirements; reporting suspected ADRs.',
      memory_hook: 'Pharmacovigilance is the city\'s ongoing safety audit — black-box warnings are the red alert signs, REMS are the security protocols for the most dangerous compounds, and post-marketing surveillance is the 24-hour camera network that catches what the pre-approval trials missed.',
      source: 'G&G 14e, ch. 5',
      high_yield: false,
    },
  ],
};

if (typeof window !== 'undefined') window.DISTRICT_RECENT_ADVANCES = DISTRICT_RECENT_ADVANCES;
