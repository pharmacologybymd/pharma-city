const DISTRICT_IDS = [
  'general_pharmacology', 'ans_hub', 'cholinergic', 'adrenergic',
  'cvs', 'respiratory', 'git', 'renal', 'autacoids',
  'cns', 'endocrine', 'chemotherapy', 'toxicology', 'recent_advances'
];

const DRUG_REQUIRED = ['id', 'district', 'building', 'class', 'mechanism', 'adverse_effects', 'clinical_use', 'memory_hook', 'source'];

function validateDrug(d) {
  const errors = [];
  if (!d || typeof d !== 'object') return { ok: false, errors: ['drug must be an object'] };
  for (const k of DRUG_REQUIRED) {
    if (typeof d[k] !== 'string' || d[k].trim() === '') errors.push(`missing or empty field: ${k}`);
  }
  if (d.district && !DISTRICT_IDS.includes(d.district)) errors.push(`unknown district: ${d.district}`);
  const value = { ...d, high_yield: d.high_yield === true };
  return { ok: errors.length === 0, errors, value };
}

// A classification group is recursive: a non-empty heading plus drugs and/or
// nested sub-groups (at least one of the two must be present).
function validateGroup(g, path, errors) {
  if (!g || typeof g !== 'object') { errors.push(`${path} must be an object`); return; }
  if (typeof g.heading !== 'string' || g.heading.trim() === '') errors.push(`${path}: missing heading`);
  const hasDrugs = Array.isArray(g.drugs) && g.drugs.length > 0;
  const hasGroups = Array.isArray(g.groups) && g.groups.length > 0;
  if (!hasDrugs && !hasGroups) errors.push(`${path}: needs drugs[] or groups[]`);
  if (g.drugs !== undefined) {
    if (!Array.isArray(g.drugs)) errors.push(`${path}.drugs must be an array`);
    else g.drugs.forEach((name, i) => {
      if (typeof name !== 'string' || name.trim() === '') errors.push(`${path}.drugs[${i}]: empty drug name`);
    });
  }
  if (g.groups !== undefined) {
    if (!Array.isArray(g.groups)) errors.push(`${path}.groups must be an array`);
    else g.groups.forEach((sub, i) => validateGroup(sub, `${path}.groups[${i}]`, errors));
  }
}

function validateClassification(c) {
  const errors = [];
  if (!c || typeof c !== 'object') return { ok: false, errors: ['classification must be an object'] };
  if (!Array.isArray(c.sources) || c.sources.length === 0) {
    errors.push('classification.sources must be a non-empty array');
    return { ok: false, errors };
  }
  c.sources.forEach((s, i) => {
    const sp = `sources[${i}]`;
    if (!s || typeof s !== 'object') { errors.push(`${sp} must be an object`); return; }
    if (typeof s.label !== 'string' || s.label.trim() === '') errors.push(`${sp}: missing label`);
    if (typeof s.cite !== 'string' || s.cite.trim() === '') errors.push(`${sp}: missing cite`);
    if (!Array.isArray(s.groups) || s.groups.length === 0) errors.push(`${sp}: missing groups[]`);
    else s.groups.forEach((g, gi) => validateGroup(g, `${sp}.groups[${gi}]`, errors));
  });
  return { ok: errors.length === 0, errors };
}

function validateDistrict(d) {
  const errors = [];
  if (!d || typeof d !== 'object') return { ok: false, errors: ['district must be an object'] };
  if (!DISTRICT_IDS.includes(d.id)) errors.push(`unknown district id: ${d.id}`);
  for (const k of ['name', 'theme_line', 'walkthrough']) {
    if (typeof d[k] !== 'string' || d[k].trim() === '') errors.push(`missing field: ${k}`);
  }
  if (!d.palette || typeof d.palette !== 'object') errors.push('missing palette');
  if (!d.position || typeof d.position.x !== 'number' || typeof d.position.z !== 'number') errors.push('missing position {x, z}');
  if (!Array.isArray(d.drugs)) errors.push('drugs must be an array');
  else d.drugs.forEach((drug, i) => {
    const { ok, errors: drugErrors } = validateDrug(drug);
    if (!ok) errors.push(`drug[${i}] (${drug?.id}): ${drugErrors.join(', ')}`);
  });
  // classification is OPTIONAL — only validate when present.
  if (d.classification != null) {
    const { ok, errors: cErrors } = validateClassification(d.classification);
    if (!ok) cErrors.forEach(e => errors.push(`classification: ${e}`));
  }
  return { ok: errors.length === 0, errors };
}

function validateCity(c) {
  const errors = [];
  if (!c || !Array.isArray(c.districts)) return { ok: false, errors: ['city.districts must be an array'] };
  if (c.districts.length !== 14) errors.push(`expected 14 districts, got ${c.districts.length}`);
  for (const id of c.districts) {
    if (!DISTRICT_IDS.includes(id)) errors.push(`unknown district in city: ${id}`);
  }
  return { ok: errors.length === 0, errors };
}

if (typeof window !== 'undefined') {
  window.PHARMA = window.PHARMA || {};
  window.PHARMA.schema = { validateDrug, validateDistrict, validateCity, validateClassification, DISTRICT_IDS };
}
export { validateDrug, validateDistrict, validateCity, validateClassification, DISTRICT_IDS };
