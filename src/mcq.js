// MCQ mode — 4-option multiple-choice quiz generated from existing drug data.
// One correct answer + 3 distractors from the same district (so they're
// plausible and don't trivially give the answer away).
//
// Public API:
//   PHARMA.mcq.open()       — open the overlay with a new question
//   PHARMA.mcq.next()       — advance to the next question
//   PHARMA.mcq.close()      — dismiss the overlay
//   PHARMA.mcq.getSessionScore() — { correct, total }
(function(){
  const P = (typeof window !== 'undefined') ? (window.PHARMA = window.PHARMA || {}) : {};
  const FACETS = ['class', 'mechanism', 'adverse_effects', 'clinical_use'];
  const FACET_LABEL = {
    class: 'class',
    mechanism: 'mechanism of action',
    adverse_effects: 'adverse-effect profile',
    clinical_use: 'main clinical use',
  };
  let session = { correct: 0, total: 0 };
  let container = null;
  let currentQ = null;

  function allDrugsByDistrict() {
    const map = {};
    if (typeof window === 'undefined') return map;
    for (const k in window) {
      if (!k.startsWith('DISTRICT_')) continue;
      const d = window[k];
      map[d.id] = (d.drugs || []);
    }
    return map;
  }

  function shuffle(a) {
    const arr = a.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function generateQuestion() {
    const map = allDrugsByDistrict();
    const districtIds = Object.keys(map);
    if (districtIds.length === 0) return null;
    // Pick a district that has at least 4 drugs.
    const eligible = districtIds.filter(id => map[id].length >= 4);
    if (eligible.length === 0) return null;
    const districtId = eligible[Math.floor(Math.random() * eligible.length)];
    const drugs = map[districtId];
    const drug = drugs[Math.floor(Math.random() * drugs.length)];
    const facet = FACETS[Math.floor(Math.random() * FACETS.length)];
    // Need 3 distractors from same district whose facet value differs.
    const distractors = shuffle(drugs.filter(x => x.id !== drug.id && x[facet] !== drug[facet]));
    if (distractors.length < 3) return generateQuestion(); // retry
    const correct = drug[facet];
    const wrong = distractors.slice(0, 3).map(d => d[facet]);
    const options = shuffle([correct, ...wrong]);
    return {
      drug,
      facet,
      facetLabel: FACET_LABEL[facet],
      prompt: `Which is the ${FACET_LABEL[facet]} of ${drug.id}?`,
      correct,
      options,
    };
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]); }

  function ensureContainer(rootEl) {
    if (container) return;
    container = document.createElement('div');
    container.className = 'mcq-overlay';
    container.style.display = 'none';
    rootEl.appendChild(container);
  }

  function render(answered) {
    if (!currentQ || !container) return;
    const q = currentQ;
    const parts = [];
    parts.push(`<div class="mcq-head">`);
    parts.push(`<div class="mcq-score">MCQ · ${session.correct} / ${session.total}</div>`);
    parts.push(`<button class="btn mcq-close" id="mcqClose" aria-label="close">×</button>`);
    parts.push(`</div>`);
    parts.push(`<div class="mcq-prompt">${esc(q.prompt)}</div>`);
    parts.push(`<div class="mcq-options">`);
    q.options.forEach((opt, i) => {
      let cls = 'mcq-option';
      if (answered) {
        if (opt === q.correct) cls += ' mcq-option--correct';
        else if (opt === answered) cls += ' mcq-option--wrong';
      }
      parts.push(`<button class="${cls}" data-idx="${i}">${String.fromCharCode(65 + i)}. ${esc(opt)}</button>`);
    });
    parts.push(`</div>`);
    if (answered) {
      const wasRight = answered === q.correct;
      parts.push(`<div class="mcq-result ${wasRight ? 'mcq-result--good' : 'mcq-result--bad'}">${wasRight ? '✓ Correct' : '✗ Not quite'}</div>`);
      parts.push(`<div class="memory-hook"><span style="font-weight:600">Memory hook</span> — ${esc(q.drug.memory_hook)}</div>`);
      parts.push(`<div class="source-line">Verify · ${esc(q.drug.source)}</div>`);
      parts.push(`<div class="mcq-controls"><button class="btn btn-brand" id="mcqNext">Next question →</button> <button class="btn" id="mcqOpenDrug">Open ${esc(q.drug.id)} flashcard</button></div>`);
    }
    container.innerHTML = parts.join('');
    if (!answered) {
      container.querySelectorAll('.mcq-option').forEach((el, i) => {
        el.addEventListener('click', () => answer(q.options[i]));
      });
    } else {
      container.querySelector('#mcqNext')?.addEventListener('click', next);
      container.querySelector('#mcqOpenDrug')?.addEventListener('click', () => {
        close();
        P.app?.goTo?.('flashcard', { districtId: q.drug.district, drugId: q.drug.id });
      });
    }
    container.querySelector('#mcqClose')?.addEventListener('click', close);
  }

  function answer(picked) {
    if (!currentQ) return;
    session.total += 1;
    if (picked === currentQ.correct) session.correct += 1;
    // Also feed into the quiz mastery system as knew/missed.
    if (P.quiz?.recordResult) {
      P.quiz.recordResult(currentQ.drug.id, picked === currentQ.correct ? 'knew' : 'missed');
    }
    render(picked);
  }

  function next() {
    currentQ = generateQuestion();
    render(null);
  }

  function open() {
    if (!container) return;
    currentQ = generateQuestion();
    render(null);
    container.style.display = 'flex';
  }

  function close() {
    if (container) container.style.display = 'none';
  }

  function getSessionScore() { return { ...session }; }
  function resetSession() { session = { correct: 0, total: 0 }; }

  function mount(rootEl) {
    ensureContainer(rootEl);
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && container && container.style.display !== 'none') close();
      });
    }
  }

  P.mcq = { mount, open, next, close, getSessionScore, resetSession, _generate: generateQuestion };
})();
