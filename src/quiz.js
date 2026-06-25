// Quiz mode — random-drug recall with self-graded mastery tracking.
// Storage shape (localStorage 'pharma_quiz_v1'):
//   { counters: { [drugId]: { seen, knew, missed } },
//     streak, bestStreak, totalAnswered }
// A drug is "mastered" after >=2 knew with no recorded misses.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const STORAGE_KEY = 'pharma_quiz_v1';
  const emptyState = () => ({ counters: {}, streak: 0, bestStreak: 0, totalAnswered: 0 });

  function load() {
    try {
      const raw = (typeof localStorage !== 'undefined') ? localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) return emptyState();
      const parsed = JSON.parse(raw);
      return { ...emptyState(), ...parsed, counters: parsed.counters || {} };
    } catch (_) { return emptyState(); }
  }
  function save(s) {
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (_) {}
  }
  let state = load();

  function allDrugs() {
    const out = [];
    if (typeof window === 'undefined') return out;
    for (const k in window) {
      if (!k.startsWith('DISTRICT_')) continue;
      const d = window[k];
      (d.drugs || []).forEach(drug => out.push({ id: drug.id, districtId: d.id }));
    }
    return out;
  }

  function pickRandom(opts) {
    const all = allDrugs();
    if (all.length === 0) return null;
    const weakestFirst = !!(opts && opts.weakestFirst);
    if (weakestFirst) {
      // Score: missed first (descending), then least-seen, then unseen prioritised.
      const scored = all.map(drug => {
        const c = state.counters[drug.id] || { seen: 0, knew: 0, missed: 0 };
        return { drug, missed: c.missed, seen: c.seen };
      });
      scored.sort((a, b) => (b.missed - a.missed) || (a.seen - b.seen));
      // Sample from the top 12 to keep it varied, not deterministic.
      const pool = scored.slice(0, Math.min(12, scored.length)).map(s => s.drug);
      return pool[Math.floor(Math.random() * pool.length)];
    }
    return all[Math.floor(Math.random() * all.length)];
  }

  function startRandom() {
    const d = pickRandom();
    if (d && P.app) P.app.goTo('flashcard', { districtId: d.districtId, drugId: d.id });
  }
  function startWeakest() {
    const d = pickRandom({ weakestFirst: true });
    if (d && P.app) P.app.goTo('flashcard', { districtId: d.districtId, drugId: d.id });
  }

  function recordResult(drugId, result) {
    if (!state.counters[drugId]) state.counters[drugId] = { seen: 0, knew: 0, missed: 0 };
    state.counters[drugId].seen += 1;
    if (result === 'knew') {
      state.counters[drugId].knew += 1;
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else {
      state.counters[drugId].missed += 1;
      state.streak = 0;
    }
    state.totalAnswered += 1;
    save(state);
  }

  function getStats() {
    const all = allDrugs();
    const ids = Object.keys(state.counters);
    const mastered = ids.filter(id => {
      const c = state.counters[id];
      return c && c.knew >= 2 && c.missed === 0;
    }).length;
    return {
      totalDrugs: all.length,
      seen: ids.length,
      mastered,
      streak: state.streak,
      bestStreak: state.bestStreak,
      totalAnswered: state.totalAnswered,
    };
  }

  function getDrugStat(drugId) {
    return state.counters[drugId] || { seen: 0, knew: 0, missed: 0 };
  }

  function reset() { state = emptyState(); save(state); }

  P.quiz = { startRandom, startWeakest, recordResult, getStats, getDrugStat, reset, pickRandom };
})();
