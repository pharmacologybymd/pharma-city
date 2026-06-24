# Task 16 Report: CVS District

## Status
Complete. 36/36 tests pass. Build: 807 KB.

## Drug IDs (22 total; all high_yield: true)

### Antiarrhythmics (ch. 31) — 5 drugs
| id | Vaughan-Williams class | Key caveat |
|----|------------------------|------------|
| `quinidine` | IA — Na+ + K+ blocker | QT prolongation / torsades; paradoxical flutter acceleration |
| `lidocaine_iv` | IB — fast-kinetics Na+ blocker | Use-dependent; ischaemic tissue selectivity |
| `flecainide` | IC — potent Na+ blocker | CAST trial mortality harm post-MI; AVOID in structural disease |
| `amiodarone` | III (all classes) | Pulmonary fibrosis, thyroid, corneal deposits, hepatotoxicity |
| `sotalol` | III + non-selective β-blocker | In-hospital initiation; renally cleared; QT risk |

### Supraventricular — 1 drug
| id | Class |
|----|-------|
| `adenosine` | A1 agonist; IV SVT termination; avoid in asthma; methylxanthines antagonise |

### Heart Failure / Inotropes (ch. 30) — 3 drugs
| id | Notes |
|----|-------|
| `digoxin` | Na/K-ATPase inhibitor; SVT with block / xanthopsia toxicity; Fab antidote |
| `ivabradine` | HCN (If) inhibitor; requires sinus rhythm; SHIFT trial |
| `sacubitril_valsartan` | ARNI; PARADIGM-HF; 36-h ACEi washout; AVOID in mechanical valves |

### Antihypertensives (ch. 28) — 4 drugs
| id | Class | Key caveat |
|----|-------|------------|
| `enalapril` | ACEi prodrug | Dry cough / angioedema (bradykinin); bilateral RAS AKI; teratogen |
| `losartan` | ARB | No cough; uricosuric; RENAAL; teratogen |
| `amlodipine` | DHP CCB vascular-selective | Peripheral oedema; safe in HFrEF |
| `verapamil` | Non-DHP CCB cardiac | AVOID with β-blockers; AVOID in HFrEF; constipation |

### Antianginals (ch. 32) — 2 drugs
| id | Mechanism | Key caveat |
|----|-----------|------------|
| `nitroglycerin` | NO donor; venodilation >> arteriolar | PDE5 inhibitor absolute CI; Monday disease; tolerance |
| `ranolazine` | Late INa inhibitor | No HR/BP change; QT prolongation; add-on only |

### Antiplatelets (ch. 33) — 3 drugs
| id | P2Y12 | Notes |
|----|-------|-------|
| `aspirin` | COX-1 irreversible | AERD; Reye in children; 7–10 day effect duration |
| `clopidogrel` | P2Y12 irreversible; prodrug | CYP2C19 polymorphism; PPIs reduce activation |
| `ticagrelor` | P2Y12 reversible; non-prodrug | PLATO trial; dyspnoea (adenosine); no CYP2C19 dependence |

### Anticoagulants (ch. 33) — 3 drugs
| id | Target | Key caveat |
|----|--------|------------|
| `heparin` | AT → IIa + Xa | HIT type II (stop, switch); protamine reversal; safe in pregnancy |
| `warfarin` | VKORC1 (vitamin K recycling) | INR monitoring; CYP2C9 DDIs; teratogen; only option for mechanical valves |
| `apixaban` | Direct factor Xa | ARISTOTLE trial; andexanet alfa reversal; AVOID in mechanical valves |

### Lipid-lowering (ch. 34) — 3 drugs
| id | Class | Notes |
|----|-------|-------|
| `atorvastatin` | Statin (HMG-CoA reductase inhibitor) | Rhabdomyolysis; CYP3A4 DDIs |
| `ezetimibe` | NPC1L1 inhibitor | Add-on to statin; IMPROVE-IT trial |
| `evolocumab` | PCSK9 mAb | FOURIER trial; 50–70% LDL reduction; SC injection |

## Classes represented
- [x] Antiarrhythmic (all four Vaughan-Williams Na+ classes + K+/mixed + adenosine)
- [x] Antihypertensive (ACEi, ARB, DHP-CCB, non-DHP-CCB)
- [x] Antianginal (nitrate, late Na+ inhibitor)
- [x] Heart failure (cardiac glycoside, HCN inhibitor, ARNI)
- [x] Antiplatelet (COX-1, P2Y12 irreversible prodrug, P2Y12 reversible non-prodrug)
- [x] Anticoagulant (UFH, VKA, direct Xa inhibitor)
- [x] Lipid-lowering (statin, NPC1L1 inhibitor, PCSK9 mAb)

## Exclusions (per brief)
β-blockers (propranolol, metoprolol, atenolol, labetalol, carvedilol, esmolol), dobutamine, adrenaline, dopamine, noradrenaline, isoprenaline, phenylephrine — all live in the Adrenergic district and are NOT duplicated here.

## Walkthrough
Two paragraphs: hospital plaza with pulsing glass heart roof; SA-node Alley wired for antiarrhythmic conduction sequence; adenosine circuit-breaker; amiodarone iodine tower; Ventricular Boulevard with Lipid Clinic underground, anticoagulant row, antiplatelet market; ACE-inhibitor arcade, ARB tower, CCB promenade, nitrate dispensary.

## Animation
Heart-beat 70 bpm registered as `'cvs'` — two SphereGeometry lobes + ConeGeometry tip; scale-pulses via `abs(sin(phase))` pattern from the brief.

## Chapter citations
- ch. 28 — enalapril, losartan, amlodipine, verapamil (Renin-Angiotensin System / antihypertensives)
- ch. 30 — digoxin, ivabradine, sacubitril_valsartan (Heart failure)
- ch. 31 — quinidine, lidocaine_iv, flecainide, amiodarone, sotalol, adenosine (Antiarrhythmics)
- ch. 32 — nitroglycerin, ranolazine (Antianginals / nitrates)
- ch. 33 — aspirin, clopidogrel, ticagrelor, heparin, warfarin, apixaban (Antiplatelet + anticoagulant)
- ch. 34 — atorvastatin, ezetimibe, evolocumab (Hyperlipidemia)

## Uncertain / flagged items

1. **Dabigatran / rivaroxaban omitted** — apixaban chosen as the representative DOAC (ARISTOTLE trial, twice-daily, andexanet reversal well-established). Could add dabigatran (direct thrombin inhibitor; idarucizumab reversal; RE-LY trial) as a long-tail entry in a future revision. Rivaroxaban (once-daily Xa inhibitor) also high-yield but three DOACs felt like diminishing returns at this word count.

2. **Prasugrel omitted** — ticagrelor selected as the superior P2Y12 agent (PLATO). Prasugrel is high-yield for USMLE but would be the 23rd drug; kept out to stay within quality threshold.

3. **Hydralazine omitted** — brief listed it as a candidate; given the strong ACEi/ARB/CCB coverage decided to favour ARNI and ivabradine (more modern, more exam-relevant in HFrEF context). Hydralazine-nitrate combination for HFrEF in ACEi-intolerant patients (V-HeFT trials) could be added later.

4. **Rosuvastatin, fenofibrate, niacin omitted** — atorvastatin + ezetimibe + evolocumab cover three distinct lipid-lowering mechanisms. Rosuvastatin is nearly identical to atorvastatin from a schema perspective; fenofibrate and niacin are lower-yield post-AIM-HIGH/ACCORD trial era.

5. **Enoxaparin omitted** — heparin (UFH) and apixaban chosen as anticoagulant anchors; enoxaparin (LMWH) could be added as long-tail (anti-Xa, no aPTT monitoring, not reversible with protamine fully) in a future pass.

6. **Isosorbide mononitrate omitted** — covered under nitroglycerin entry's mechanism/clinical_use; a separate entry would be largely redundant.

7. **Sotalol dual-class categorisation** — documented as Class III + non-selective β-blocker; d-sotalol distinction noted in mechanism. The clinical agent is the racemic mixture.

8. **Amiodarone paradox statement** — noted that despite QT prolongation, amiodarone has paradoxically low torsades risk vs. other QT-prolongers (due to additional IKr + IKs + ICa blockade preventing early afterdepolarisations). This is a well-established teaching point in G&G ch. 31 and clinical guidelines.
