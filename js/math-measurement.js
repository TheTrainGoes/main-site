'use strict';

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[rand(0, arr.length - 1)];
}

function fmtNum(n) {
  if (Number.isInteger(n)) return n.toString();
  return (Math.round(n * 10000) / 10000).toString();
}

// Each template: { cat, make() → { val, from, to, ans } }
const TEMPLATES = {
  easy: [
    // Length: m ↔ cm
    { cat: 'length', make() { const v = rand(1, 9); return { val: v, from: 'm', to: 'cm', ans: v * 100 }; } },
    { cat: 'length', make() { const v = pick([100,200,300,400,500,600,700,800,900]); return { val: v, from: 'cm', to: 'm', ans: v / 100 }; } },
    // Mass: kg ↔ g
    { cat: 'mass', make() { const v = rand(1, 9); return { val: v, from: 'kg', to: 'g', ans: v * 1000 }; } },
    { cat: 'mass', make() { const v = pick([1000,2000,3000,4000,5000,6000,7000,8000]); return { val: v, from: 'g', to: 'kg', ans: v / 1000 }; } },
    // Volume: L ↔ mL
    { cat: 'volume', make() { const v = rand(1, 9); return { val: v, from: 'L', to: 'mL', ans: v * 1000 }; } },
    { cat: 'volume', make() { const v = pick([1000,2000,3000,4000,5000]); return { val: v, from: 'mL', to: 'L', ans: v / 1000 }; } },
  ],
  medium: [
    // Length: cm ↔ mm
    { cat: 'length', make() { const v = rand(1, 20); return { val: v, from: 'cm', to: 'mm', ans: v * 10 }; } },
    { cat: 'length', make() { const v = pick([10,20,30,40,50,60,70,80,90,100,120,150,180,200]); return { val: v, from: 'mm', to: 'cm', ans: v / 10 }; } },
    // Length: km ↔ m
    { cat: 'length', make() { const v = rand(1, 9); return { val: v, from: 'km', to: 'm', ans: v * 1000 }; } },
    { cat: 'length', make() { const v = pick([1000,1500,2000,2500,3000,4000,5000]); return { val: v, from: 'm', to: 'km', ans: v / 1000 }; } },
    // Mass: g with half-kg increments
    { cat: 'mass', make() { const v = pick([500,1500,2500,3500,4500]); return { val: v, from: 'g', to: 'kg', ans: v / 1000 }; } },
    { cat: 'mass', make() { const v = pick([0.5,1.5,2.5,3.5,4.5]); return { val: v, from: 'kg', to: 'g', ans: v * 1000 }; } },
    // Volume: mL with half-litre increments
    { cat: 'volume', make() { const v = pick([500,1500,2500,3500]); return { val: v, from: 'mL', to: 'L', ans: v / 1000 }; } },
    { cat: 'volume', make() { const v = pick([0.5,1.5,2.5,3.5]); return { val: v, from: 'L', to: 'mL', ans: v * 1000 }; } },
  ],
  hard: [
    // Length: mm ↔ m
    { cat: 'length', make() { const v = pick([1000,1500,2000,2500,3000,3500,4000]); return { val: v, from: 'mm', to: 'm', ans: v / 1000 }; } },
    { cat: 'length', make() { const v = pick([1.5,2.5,3.25,4.5,2.75]); return { val: v, from: 'm', to: 'mm', ans: v * 1000 }; } },
    // Length: cm ↔ m with decimals
    { cat: 'length', make() { const v = pick([125,250,375,450,575,625,750,875]); return { val: v, from: 'cm', to: 'm', ans: v / 100 }; } },
    { cat: 'length', make() { const v = pick([1.25,2.50,3.75,4.25,5.50]); return { val: v, from: 'm', to: 'cm', ans: v * 100 }; } },
    // Length: km ↔ m with decimals
    { cat: 'length', make() { const v = pick([1.25,2.75,3.5,4.25,5.75]); return { val: v, from: 'km', to: 'm', ans: v * 1000 }; } },
    { cat: 'length', make() { const v = pick([1250,2750,3500,4250,5750]); return { val: v, from: 'm', to: 'km', ans: v / 1000 }; } },
    // Mass: mg ↔ g
    { cat: 'mass', make() { const v = pick([250,500,750,1250,1500,2500]); return { val: v, from: 'mg', to: 'g', ans: v / 1000 }; } },
    { cat: 'mass', make() { const v = pick([0.25,0.5,0.75,1.25,1.5,2.5]); return { val: v, from: 'g', to: 'mg', ans: v * 1000 }; } },
    // Mass: g ↔ kg with decimals
    { cat: 'mass', make() { const v = pick([1250,2750,3500,4250,5500]); return { val: v, from: 'g', to: 'kg', ans: v / 1000 }; } },
    // Volume: mL ↔ L with decimals
    { cat: 'volume', make() { const v = pick([250,750,1250,2500,3750]); return { val: v, from: 'mL', to: 'L', ans: v / 1000 }; } },
    { cat: 'volume', make() { const v = pick([1.25,2.5,3.75,0.75,4.25]); return { val: v, from: 'L', to: 'mL', ans: v * 1000 }; } },
  ],
};

function makeProblem(difficulty, category) {
  const pool = category === 'all'
    ? TEMPLATES[difficulty]
    : TEMPLATES[difficulty].filter(t => t.cat === category);
  return pick(pool).make();
}

function buildProblemEl(idx, p) {
  const div = document.createElement('div');
  div.className = 'meas-problem';

  const num = document.createElement('span');
  num.className = 'meas-num';
  num.textContent = `${idx}.`;

  const val = document.createElement('span');
  val.className = 'meas-val';
  val.textContent = fmtNum(p.val);

  const fromUnit = document.createElement('span');
  fromUnit.className = 'meas-unit';
  fromUnit.textContent = p.from;

  const eq = document.createElement('span');
  eq.className = 'meas-eq';
  eq.textContent = '=';

  const blank = document.createElement('span');
  blank.className = 'meas-blank';

  const toUnit = document.createElement('span');
  toUnit.className = 'meas-unit';
  toUnit.textContent = p.to;

  div.append(num, val, fromUnit, eq, blank, toUnit);
  return div;
}

// ============================================================
// UI
// ============================================================

const diffEl         = document.getElementById('difficulty');
const catEl          = document.getElementById('category');
const countEl        = document.getElementById('count');
const genBtn         = document.getElementById('generate-btn');
const outputEl       = document.getElementById('output');
const gridEl         = document.getElementById('meas-grid');
const titleEl        = document.getElementById('worksheet-title');
const printBtn       = document.getElementById('print-btn');
const regenBtn       = document.getElementById('regen-btn');
const answerKeyEl    = document.getElementById('answer-key');
const answerGridEl   = document.getElementById('answer-grid');
const answerTitleEl  = document.getElementById('answer-key-title');
const answerKeyCheck = document.getElementById('answer-key-check');
const wsTotalEl      = document.getElementById('ws-total');

const CAT_LABELS  = { all: 'All Types', length: 'Length', mass: 'Mass', volume: 'Volume' };
const DIFF_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

function generate() {
  const difficulty = diffEl.value;
  const category   = catEl.value;
  const count      = parseInt(countEl.value, 10);

  const titleText = category === 'all'
    ? `${DIFF_LABELS[difficulty]} Metric Measurement`
    : `${DIFF_LABELS[difficulty]} Metric ${CAT_LABELS[category]} Measurement`;

  titleEl.textContent = titleText;
  answerTitleEl.textContent = titleText;

  const cols = count <= 20 ? 2 : 3;
  gridEl.innerHTML = '';
  gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  answerGridEl.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const p = makeProblem(difficulty, category);
    gridEl.appendChild(buildProblemEl(i, p));

    const item = document.createElement('div');
    item.className = 'answer-item';
    item.textContent = `${i}. ${fmtNum(p.val)} ${p.from} = ${fmtNum(p.ans)} ${p.to}`;
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
