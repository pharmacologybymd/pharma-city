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
  window.PHARMA.schema = { validateDrug, validateDistrict, validateCity, DISTRICT_IDS };
}
export { validateDrug, validateDistrict, validateCity, DISTRICT_IDS };
