'use strict';

// ====================== MATH UTILITIES ======================

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) { return (a * b) / gcd(a, b); }

function reduceFrac(num, den) {
  if (den === 0) return { num: 0, den: 1 };
  if (den < 0) { num = -num; den = -den; }
  const g = gcd(Math.abs(num), den);
  return { num: num / g, den: den / g };
}

function fmtFrac(f) {
  return f.den === 1 ? String(f.num) : `${f.num}/${f.den}`;
}

function fmtMixedNum(whole, num, den) {
  if (num === 0) return String(whole);
  return `${whole} ${num}/${den}`;
}

// ====================== PROBLEM GENERATION ======================

const DENS = {
  easy:   [2, 3, 4, 5, 6],
  medium: [3, 4, 5, 6, 8, 10],
  hard:   [5, 6, 8, 9, 10, 12, 15]
};

function pickDen(diff) {
  const pool = DENS[diff];
  return pool[rand(0, pool.length - 1)];
}

function makeFrac(diff) {
  const den = pickDen(diff);
  const num = rand(1, den - 1);
  return { num, den };
}

function makeProblem(type, diff) {
  switch (type) {

    case 'add': {
      const a = makeFrac(diff);
      const b = makeFrac(diff);
      const l = lcm(a.den, b.den);
      const sumNum = a.num * (l / a.den) + b.num * (l / b.den);
      const ans = reduceFrac(sumNum, l);
      let ansStr;
      if (ans.num > ans.den) {
        const w = Math.floor(ans.num / ans.den);
        const r = ans.num % ans.den;
        ansStr = fmtMixedNum(w, r, ans.den);
      } else {
        ansStr = fmtFrac(ans);
      }
      return { type, a, b, answer: ansStr };
    }

    case 'subtract': {
      let a = makeFrac(diff);
      let b = makeFrac(diff);
      // Ensure a >= b so the result is non-negative
      if (a.num * b.den < b.num * a.den) { [a, b] = [b, a]; }
      const l = lcm(a.den, b.den);
      const diffNum = a.num * (l / a.den) - b.num * (l / b.den);
      const ans = reduceFrac(diffNum, l);
      return { type, a, b, answer: fmtFrac(ans) };
    }

    case 'combine': {
      const aFrac = makeFrac(diff);
      const bFrac = makeFrac(diff);
      const maxW = diff === 'easy' ? 4 : diff === 'medium' ? 7 : 12;
      const aW = rand(1, maxW);
      const bW = rand(1, maxW);
      const useSubtract = rand(0, 1) === 1;

      let a = { whole: aW, num: aFrac.num, den: aFrac.den };
      let b = { whole: bW, num: bFrac.num, den: bFrac.den };

      if (useSubtract) {
        // Ensure a >= b
        const av = a.whole + a.num / a.den;
        const bv = b.whole + b.num / b.den;
        if (av < bv) { [a, b] = [b, a]; }
      }

      const aImproper = a.whole * a.den + a.num;
      const bImproper = b.whole * b.den + b.num;
      const l = lcm(a.den, b.den);
      const resultNum = useSubtract
        ? aImproper * (l / a.den) - bImproper * (l / b.den)
        : aImproper * (l / a.den) + bImproper * (l / b.den);
      const ans = reduceFrac(resultNum, l);
      const whole = Math.floor(ans.num / ans.den);
      const rem = ans.num % ans.den;
      return { type, op: useSubtract ? 'subtract' : 'add', a, b, answer: fmtMixedNum(whole, rem, ans.den) };
    }

    case 'reduce': {
      // Generate a fraction by taking a reduced fraction and scaling it by k so it needs reducing
      const base = makeFrac(diff === 'hard' ? 'medium' : 'easy');
      const reduced = reduceFrac(base.num, base.den);
      const maxK = diff === 'easy' ? 4 : diff === 'medium' ? 6 : 10;
      const k = rand(2, maxK);
      return { type, a: { num: reduced.num * k, den: reduced.den * k }, answer: fmtFrac(reduced) };
    }
  }
}

// ====================== RENDERING ======================

function fracHTML(num, den) {
  return `<span class="frac-display"><span class="frac-n">${num}</span><span class="frac-d">${den}</span></span>`;
}

function mixedHTML(whole, num, den) {
  return `<span class="frac-mixed"><span class="frac-whole">${whole}</span>${fracHTML(num, den)}</span>`;
}

function buildProblemEl(idx, problem) {
  const div = document.createElement('div');
  div.className = 'frac-problem';

  let inner = `<span class="mp-num frac-mp-num">${idx}.</span><div class="frac-expr">`;

  if (problem.type === 'reduce') {
    inner += fracHTML(problem.a.num, problem.a.den);
    inner += `<span class="frac-eq">=</span>`;
    inner += `<div class="frac-answer-box"></div>`;
  } else if (problem.type === 'combine') {
    const sym = problem.op === 'add' ? '+' : '\u2212';
    inner += mixedHTML(problem.a.whole, problem.a.num, problem.a.den);
    inner += `<span class="frac-op">${sym}</span>`;
    inner += mixedHTML(problem.b.whole, problem.b.num, problem.b.den);
    inner += `<span class="frac-eq">=</span>`;
    inner += `<div class="frac-answer-box"></div>`;
  } else {
    const sym = problem.type === 'add' ? '+' : '\u2212';
    inner += fracHTML(problem.a.num, problem.a.den);
    inner += `<span class="frac-op">${sym}</span>`;
    inner += fracHTML(problem.b.num, problem.b.den);
    inner += `<span class="frac-eq">=</span>`;
    inner += `<div class="frac-answer-box"></div>`;
  }

  inner += '</div>';
  div.innerHTML = inner;
  return div;
}

function buildAnswerText(problem, idx) {
  const minus = '\u2212';
  if (problem.type === 'reduce') {
    return `${idx}. ${problem.a.num}/${problem.a.den} = ${problem.answer}`;
  }
  if (problem.type === 'combine') {
    const sym = problem.op === 'add' ? '+' : minus;
    const aStr = `${problem.a.whole} ${problem.a.num}/${problem.a.den}`;
    const bStr = `${problem.b.whole} ${problem.b.num}/${problem.b.den}`;
    return `${idx}. ${aStr} ${sym} ${bStr} = ${problem.answer}`;
  }
  const sym = problem.type === 'add' ? '+' : minus;
  return `${idx}. ${problem.a.num}/${problem.a.den} ${sym} ${problem.b.num}/${problem.b.den} = ${problem.answer}`;
}

// ====================== UI ======================

const typeEl         = document.getElementById('type');
const diffEl         = document.getElementById('difficulty');
const countEl        = document.getElementById('count');
const genBtn         = document.getElementById('generate-btn');
const outputEl       = document.getElementById('output');
const gridEl         = document.getElementById('problems-grid');
const titleEl        = document.getElementById('worksheet-title');
const printBtn       = document.getElementById('print-btn');
const regenBtn       = document.getElementById('regen-btn');
const answerKeyEl    = document.getElementById('answer-key');
const answerGridEl   = document.getElementById('answer-grid');
const answerTitleEl  = document.getElementById('answer-key-title');
const answerKeyCheck = document.getElementById('answer-key-check');

const TYPE_LABELS = {
  add:      'Adding Fractions',
  subtract: 'Subtracting Fractions',
  combine:  'Combining Mixed Numbers',
  reduce:   'Reducing Fractions'
};

const DIFF_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

function generate() {
  const type  = typeEl.value;
  const diff  = diffEl.value;
  const count = parseInt(countEl.value, 10);

  const titleText = `${DIFF_LABELS[diff]} ${TYPE_LABELS[type]}`;
  titleEl.textContent = titleText;
  answerTitleEl.textContent = titleText;

  const cols = type === 'combine'
    ? (count === 30 ? 3 : 2)
    : (count === 10 ? 2 : count === 20 ? 3 : 4);

  gridEl.innerHTML = '';
  gridEl.className = `fraction-problems-grid frac-cols-${cols}`;
  gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  answerGridEl.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const problem = makeProblem(type, diff);
    gridEl.appendChild(buildProblemEl(i, problem));

    const item = document.createElement('div');
    item.className = 'answer-item';
    item.textContent = buildAnswerText(problem, i);
    answerGridEl.appendChild(item);
  }

  document.getElementById('ws-total').textContent = count;
  outputEl.classList.remove('hidden');
  outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

genBtn.addEventListener('click', generate);
regenBtn.addEventListener('click', generate);
printBtn.addEventListener('click', () => window.print());
answerKeyCheck.addEventListener('change', () => {
  answerKeyEl.classList.toggle('show-on-print', answerKeyCheck.checked);
});
