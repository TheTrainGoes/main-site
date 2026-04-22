'use strict';

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[rand(0, arr.length - 1)];
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build an arithmetic sequence and hide numBlanks interior terms.
function makeArith(start, step, length, numBlanks) {
  const terms = [];
  for (let i = 0; i < length; i++) terms.push(start + i * step);
  const interior = shuffle(terms.slice(1, length - 1).map((_, i) => i + 1));
  const blankIdx = interior.slice(0, numBlanks).sort((a, b) => a - b);
  const rule = step > 0 ? `+${step}` : `\u2212${Math.abs(step)}`;
  return { terms, blanks: blankIdx, rule, ans: blankIdx.map(i => terms[i]) };
}

// Build a geometric sequence and hide numBlanks interior terms.
function makeGeom(start, factor, length, numBlanks) {
  const terms = [];
  let v = start;
  for (let i = 0; i < length; i++) { terms.push(v); v *= factor; }
  const interior = shuffle(terms.slice(1, length - 1).map((_, i) => i + 1));
  const blankIdx = interior.slice(0, numBlanks).sort((a, b) => a - b);
  return { terms, blanks: blankIdx, rule: `\u00d7${factor}`, ans: blankIdx.map(i => terms[i]) };
}

const TEMPLATES = {
  easy: [
    { make() { return makeArith(rand(2, 10) * 2,  2,  6, 1); } },
    { make() { return makeArith(rand(1, 10) * 5,  5,  6, 1); } },
    { make() { return makeArith(rand(1,  5) * 10, 10, 6, 1); } },
    { make() { return makeArith(rand(1, 20),       1,  6, 1); } },
    { make() { return makeArith(rand(1,  5) * 3,  3,  6, 1); } },
  ],
  medium: [
    { make() { return makeArith(rand(1, 6) * 4,  4,  6, 1); } },
    { make() { return makeArith(rand(1, 5) * 6,  6,  6, 1); } },
    { make() { return makeArith(rand(1, 4) * 7,  7,  6, 1); } },
    { make() { return makeArith(rand(1, 4) * 8,  8,  6, 1); } },
    { make() { return makeArith(rand(1, 4) * 9,  9,  6, 1); } },
    { make() { return makeArith(rand(5, 10) * 5,  -5, 6, 1); } },
    { make() { return makeArith(rand(5, 10) * 10, -10, 6, 1); } },
    { make() { return makeArith(rand(1, 4) * 25, 25, 6, 1); } },
    { make() { return makeArith(rand(2, 10) * 2,  2,  7, 2); } },
    { make() { return makeArith(rand(1,  8) * 5,  5,  7, 2); } },
  ],
  hard: [
    { make() { return makeGeom(rand(1, 5), 2, 6, 1); } },
    { make() { return makeGeom(rand(1, 3), 3, 5, 1); } },
    { make() { return makeGeom(rand(1, 3), 2, 6, 2); } },
    { make() { return makeArith(rand(1, 5) * pick([11, 12, 15, 20]), pick([11, 12, 15, 20]), 6, 2); } },
    { make() { const s = pick([3, 4, 6, 7, 8, 9]); return makeArith(rand(6, 12) * s, -s, 6, 2); } },
    { make() { const s = pick([25, 50, 100]); return makeArith(rand(4, 8) * s, -s, 6, 2); } },
  ],
};

function makeProblem(difficulty) {
  return pick(TEMPLATES[difficulty]).make();
}

function buildProblemEl(idx, p, difficulty) {
  const div = document.createElement('div');
  div.className = 'np-problem';

  const num = document.createElement('span');
  num.className = 'np-num';
  num.textContent = `${idx}.`;

  const seq = document.createElement('div');
  seq.className = 'np-seq';

  p.terms.forEach((term, i) => {
    if (i > 0) {
      const sep = document.createElement('span');
      sep.className = 'np-sep';
      sep.textContent = ',';
      seq.appendChild(sep);
    }
    if (p.blanks.includes(i)) {
      const blank = document.createElement('span');
      blank.className = 'np-blank';
      seq.appendChild(blank);
    } else {
      const el = document.createElement('span');
      el.className = 'np-term';
      el.textContent = term;
      seq.appendChild(el);
    }
  });

  div.append(num, seq);

  if (difficulty === 'easy') {
    const rule = document.createElement('span');
    rule.className = 'np-rule';
    rule.textContent = `(${p.rule})`;
    div.appendChild(rule);
  }

  return div;
}

// ============================================================
// UI
// ============================================================

const diffEl         = document.getElementById('difficulty');
const countEl        = document.getElementById('count');
const genBtn         = document.getElementById('generate-btn');
const outputEl       = document.getElementById('output');
const gridEl         = document.getElementById('np-grid');
const titleEl        = document.getElementById('worksheet-title');
const printBtn       = document.getElementById('print-btn');
const regenBtn       = document.getElementById('regen-btn');
const answerKeyEl    = document.getElementById('answer-key');
const answerGridEl   = document.getElementById('answer-grid');
const answerTitleEl  = document.getElementById('answer-key-title');
const answerKeyCheck = document.getElementById('answer-key-check');
const wsTotalEl      = document.getElementById('ws-total');

const DIFF_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

function generate() {
  const difficulty = diffEl.value;
  const count      = parseInt(countEl.value, 10);
  const titleText  = `${DIFF_LABELS[difficulty]} Number Patterns`;

  titleEl.textContent     = titleText;
  answerTitleEl.textContent = titleText;

  const cols = count <= 20 ? 2 : 3;
  gridEl.innerHTML = '';
  gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  answerGridEl.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const p = makeProblem(difficulty);
    gridEl.appendChild(buildProblemEl(i, p, difficulty));

    const item = document.createElement('div');
    item.className = 'answer-item';
    item.textContent = `${i}. ${p.ans.join(', ')}`;
    answerGridEl.appendChild(item);
  }

  wsTotalEl.textContent = count;
  outputEl.classList.remove('hidden');
  outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

genBtn.addEventListener('click', generate);
regenBtn.addEventListener('click', generate);
printBtn.addEventListener('click', () => window.print());
answerKeyCheck.addEventListener('change', () => {
  answerKeyEl.classList.toggle('show-on-print', answerKeyCheck.checked);
});
