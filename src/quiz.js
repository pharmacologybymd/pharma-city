// Quiz mode — random-drug recall with self-graded mastery tracking + Leitner
// spaced repetition.
//
// Storage shape (localStorage 'pharma_quiz_v2'):
//   { counters: { [drugId]: { seen, knew, missed, box, dueAt } },
//     streak, bestStreak, totalAnswered }
//
// box       — Leitner box index (0..4). 0 = new/missed; 4 = mastered.
// dueAt     — unix-ms when this drug next becomes due. Box -> interval:
//             0 = now, 1 = 1d, 2 = 3d, 3 = 7d, 4 = 14d.
// Mastery level for visual display: 0 unseen, 1 seen-once, 2 box>=2, 3 box>=4.
// "Missed" status (red roof): the last result was 'missed'.
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const STORAGE_KEY = 'pharma_quiz_v2';
  const LEGACY_KEY = 'pharma_quiz_v1';
  const DAY_MS = 86400000;
  const BOX_INTERVALS = [0, DAY_MS, 3 * DAY_MS, 7 * DAY_MS, 14 * DAY_MS];
  const emptyState = () => ({ counters: {}, streak: 0, bestStreak: 0, totalAnswered: 0 });

  function load() {
    try {
      if (typeof localStorage === 'undefined') return emptyState();
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...emptyState(), ...parsed, counters: parsed.counters || {} };
      }
      // Migrate from v1: add box=0 and dueAt=now to every counter.
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        const old = JSON.parse(legacy);
        const counters = {};
        for (const id in (old.counters || {})) {
          const c = old.counters[id];
          counters[id] = { ...c, box: c.missed > c.knew ? 0 : Math.min(4, c.knew), dueAt: 0, lastResult: c.missed > c.knew ? 'missed' : 'knew' };
        }
        const migrated = { ...emptyState(), ...old, counters };
        save(migrated);
        return migrated;
      }
      return emptyState();
    } catch (_) { return emptyState(); }
  }
  function save(s) {
    try { if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (_) {}
  }
  function now() { return (typeof Date !== 'undefined') ? Date.now() : 0; }
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

  function ensureCounter(drugId) {
    if (!state.counters[drugId]) {
      state.counters[drugId] = { seen: 0, knew: 0, missed: 0, box: 0, dueAt: 0, lastResult: null };
    }
    return state.counters[drugId];
  }

  function pickRandom(opts) {
    const all = allDrugs();
    if (all.length === 0) return null;
    const weakestFirst = !!(opts && opts.weakestFirst);
    const dueOnly = !!(opts && opts.dueOnly);
    const t = now();
    if (dueOnly) {
      const due = all.filter(drug => {
        const c = state.counters[drug.id];
        if (!c) return true; // unseen counts as due
        return c.dueAt <= t;
      });
      if (due.length === 0) return null;
      return due[Math.floor(Math.random() * due.length)];
    }
    if (weakestFirst) {
      const scored = all.map(drug => {
        const c = state.counters[drug.id] || { seen: 0, knew: 0, missed: 0 };
        return { drug, missed: c.missed, seen: c.seen };
      });
      scored.sort((a, b) => (b.missed - a.missed) || (a.seen - b.seen));
      const pool = scored.slice(0, Math.min(12, scored.length)).map(s => s.drug);
      return pool[Math.floor(Math.random() * pool.length)];
    }
    return all[Math.floor(Math.random() * all.length)];
  }

  function startRandom() { const d = pickRandom(); if (d && P.app) P.app.goTo('flashcard', { districtId: d.districtId, drugId: d.id }); }
  function startWeakest() { const d = pickRandom({ weakestFirst: true }); if (d && P.app) P.app.goTo('flashcard', { districtId: d.districtId, drugId: d.id }); }
  function startDue() { const d = pickRandom({ dueOnly: true }); if (d && P.app) P.app.goTo('flashcard', { districtId: d.districtId, drugId: d.id }); }

  function recordResult(drugId, result) {
    const c = ensureCounter(drugId);
    c.seen += 1;
    c.lastResult = result;
    if (result === 'knew') {
      c.knew += 1;
      c.box = Math.min(4, c.box + 1);
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else {
      c.missed += 1;
      c.box = 0;
      state.streak = 0;
    }
    c.dueAt = now() + BOX_INTERVALS[c.box];
    state.totalAnswered += 1;
    save(state);
  }

  function getStats() {
    const all = allDrugs();
    const t = now();
    const ids = Object.keys(state.counters);
    let mastered = 0, due = 0;
    for (const id of ids) {
      const c = state.counters[id];
      if (c.box >= 4 && c.missed === 0) mastered += 1;
      if (c.dueAt <= t) due += 1;
    }
    // Unseen drugs are also "due" (never been studied).
    const unseen = all.length - ids.length;
    due += unseen;
    return {
      totalDrugs: all.length,
      seen: ids.length,
      mastered,
      due,
      streak: state.streak,
      bestStreak: state.bestStreak,
      totalAnswered: state.totalAnswered,
    };
  }

  function getDrugStat(drugId) {
    return state.counters[drugId] || { seen: 0, knew: 0, missed: 0, box: 0, dueAt: 0, lastResult: null };
  }

  // Mastery level for visual display in the city/district scenes.
  // 0 = unseen, 1 = seen-once (box 0-1), 2 = learning (box 2-3), 3 = mastered (box 4 no misses).
  // Returns -1 if the LAST result was 'missed' so the scene can flag it red.
  function getMasteryLevel(drugId) {
    const c = state.counters[drugId];
    if (!c) return 0;
    if (c.lastResult === 'missed') return -1;
    if (c.box >= 4 && c.missed === 0) return 3;
    if (c.box >= 2) return 2;
    return 1;
  }

  function reset() { state = emptyState(); save(state); }

  P.quiz = { startRandom, startWeakest, startDue, recordResult, getStats, getDrugStat, getMasteryLevel, reset, pickRandom };
})();
