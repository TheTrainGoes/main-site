'use strict';

// window.MATH_OPERATION must be set by the page before this script loads.
const OPERATION = window.MATH_OPERATION;

const OP_META = {
  addition:       { label: 'Addition',       symbol: '+' },
  subtraction:    { label: 'Subtraction',    symbol: '\u2212' },
  multiplication: { label: 'Multiplication', symbol: '\u00d7' },
  division:       { label: 'Division',       symbol: '\u00f7' },
  money:          { label: 'Money Counting', symbol: '$' }
};

// Which difficulty levels are available per operation
const VALID_GRADES = {
  addition:       ['easy','medium','hard'],
  subtraction:    ['easy','medium','hard'],
  multiplication: ['easy','medium','hard'],
  division:       ['easy','medium','hard'],
  money:          ['easy','medium','hard']
};

// Default selected difficulty per operation
const DEFAULT_GRADE = {
  addition: 'easy', subtraction: 'easy', multiplication: 'easy', division: 'easy',
  money: 'easy'
};

const GRADE_LABELS = {
  easy: 'Easy', medium: 'Medium', hard: 'Hard'
};

const ALL_GRADES = ['easy','medium','hard'];

// ============================================================
// PROBLEM GENERATION
// ============================================================

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeProblem(grade) {
  let a, b;

  switch (OPERATION) {

    case 'addition':
      switch (grade) {
        case 'easy':   a = rand(1,9);      b = rand(1,9);      break;
        case 'medium': a = rand(11,999);   b = rand(1,99);     break;
        case 'hard':   a = rand(1001,99999); b = rand(100,9999); break;
        default:       a = rand(1,9);      b = rand(1,9);
      }
      break;

    case 'subtraction':
      switch (grade) {
        case 'easy':   a = rand(3,18);    b = rand(1, Math.min(a - 1, 9));  break;
        case 'medium': a = rand(20,999);  b = rand(1,99); while (b >= a) b = rand(1,99); break;
        case 'hard':   a = rand(1001,99999); b = rand(100,9999);            break;
        default:       a = rand(3,18);    b = rand(1, a - 1);
      }
      break;

    case 'multiplication':
      switch (grade) {
        case 'easy':   a = rand(1,5);    b = rand(1,5);    break;
        case 'medium': a = rand(2,10);   b = rand(2,10);   break;
        case 'hard':   a = rand(11,999); b = rand(11,99);  break;
        default:       a = rand(2,10);   b = rand(2,10);
      }
      break;

    case 'division':
      // Always generates whole-number quotients (no remainders)
      switch (grade) {
        case 'easy':   b = rand(2,5);  a = b * rand(1,10); break;
        case 'medium': b = rand(2,9);  a = b * rand(2,12); break;
        case 'hard':   b = rand(2,20); a = b * rand(2,20); break;
        default:       b = rand(2,9);  a = b * rand(2,12);
      }
      break;

    case 'money': {
      // Easy:   1¢, 5¢, 10¢ only (3–5 pieces)
      // Medium: all coins + $5, $10 (5–7 pieces)
      // Hard:   all coins and bills (6–10 pieces)
      const EASY_POOL = [
        { label: '1\u00a2',  value: 1  },
        { label: '5\u00a2',  value: 5  },
        { label: '10\u00a2', value: 10 }
      ];
      const MEDIUM_POOL = [
        { label: '1\u00a2',  value: 1   },
        { label: '5\u00a2',  value: 5   },
        { label: '10\u00a2', value: 10  },
        { label: '25\u00a2', value: 25  },
        { label: '$1',        value: 100 },
        { label: '$5',        value: 500 },
        { label: '$10',       value: 1000}
      ];
      const HARD_POOL = [
        ...MEDIUM_POOL,
        { label: '$20',  value: 2000  },
        { label: '$50',  value: 5000  },
        { label: '$100', value: 10000 }
      ];
      const pool  = grade === 'easy'   ? EASY_POOL
                  : grade === 'medium' ? MEDIUM_POOL
                  :                      HARD_POOL;
      const count = grade === 'easy'   ? rand(3, 5)
                  : grade === 'medium' ? rand(5, 7)
                  :                      rand(6, 10);
      const items = [];
      for (let i = 0; i < count; i++) {
        items.push(pool[rand(0, pool.length - 1)]);
      }
      // Sort largest to smallest so bills come before coins
      items.sort((x, y) => y.value - x.value);
      a = items;
      b = items.reduce((sum, item) => sum + item.value, 0);
      break;
    }
  }

  return { a, b };
}

// ============================================================
// RENDERING
// ============================================================

function fmt(n) {
  return n.toLocaleString('en-US');
}

function fmtMoney(cents) {
  if (cents < 100) return cents + '\u00a2';
  const dollars = Math.floor(cents / 100);
  const c = cents % 100;
  return '$' + dollars + '.' + String(c).padStart(2, '0');
}

function buildProblemEl(idx, problem) {
  if (OPERATION === 'money') {
    const chips = problem.a.map(item => {
      // Loonie ($1, value 100) is a coin in Canada; only $5+ are bills
      const shape = item.value >= 500 ? 'chip--bill' : 'chip--coin';
      const denomClass = {
        '1\u00a2': 'chip--penny', '5\u00a2': 'chip--nickel',
        '10\u00a2': 'chip--dime', '25\u00a2': 'chip--quarter',
        '$1': 'chip--loonie', '$5': 'chip--five', '$10': 'chip--ten',
        '$20': 'chip--twenty', '$50': 'chip--fifty', '$100': 'chip--hundred'
      }[item.label] || '';
      return `<span class="chip ${shape} ${denomClass}">${item.label}</span>`;
    }).join('');
    const div = document.createElement('div');
    div.className = 'math-problem money-problem';
    div.innerHTML =
      `<div class="money-problem-top">` +
        `<span class="mp-num">${idx}.</span>` +
        `<div class="money-chips">${chips}</div>` +
      `</div>` +
      `<div class="money-answer-row">` +
        `<span class="money-label">Total =</span>` +
        `<div class="mp-answer-box money-answer-box"></div>` +
      `</div>`;
    return div;
  }

  const { a, b } = problem;
  const sym = OP_META[OPERATION].symbol;

  // The whole problem is a table so it naturally sizes to content width.
  // The underline and answer box inherit that exact width.
  const tbl = document.createElement('table');
  tbl.className = 'math-problem';
  tbl.innerHTML =
    `<tr>` +
      `<td class="mp-num" rowspan="3">${idx}.</td>` +
      `<td class="mp-op"></td>` +
      `<td class="mp-val">${fmt(a)}</td>` +
    `</tr>` +
    `<tr class="mp-underline">` +
      `<td class="mp-op">${sym}</td>` +
      `<td class="mp-val">${fmt(b)}</td>` +
    `</tr>` +
    `<tr>` +
      `<td colspan="2" class="mp-answer-cell">` +
        `<div class="mp-answer-box"></div>` +
      `</td>` +
    `</tr>`;
  return tbl;
}

// ============================================================
// UI
// ============================================================

const gradeEl        = document.getElementById('grade');
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

function getAnswer(a, b) {
  switch (OPERATION) {
    case 'addition':       return a + b;
    case 'subtraction':    return a - b;
    case 'multiplication': return a * b;
    case 'division':       return a / b;
    case 'money':          return b; // b is precomputed total in cents
  }
}

function populateGrades() {
  const valid = VALID_GRADES[OPERATION];
  const def   = DEFAULT_GRADE[OPERATION];
  gradeEl.innerHTML = '';
  valid.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = GRADE_LABELS[g];
    if (g === def) opt.selected = true;
    gradeEl.appendChild(opt);
  });
}

function generate() {
  const grade = gradeEl.value;
  const count = parseInt(countEl.value, 10);
  const { label } = OP_META[OPERATION];

  // Money problems are wider, so use fewer columns
  const cols = OPERATION === 'money'
    ? (count === 6 ? 2 : 3)   // 6→2 cols (3 rows), 12→3 cols (4 rows), 18→3 cols (6 rows)
    : (count === 10 ? 2 : count === 20 ? 4 : 5);
  const titleText = `${GRADE_LABELS[grade]} ${label} Practice`;

  titleEl.textContent = titleText;
  answerTitleEl.textContent = titleText;

  gridEl.innerHTML = '';
  gridEl.className = `math-problems-grid cols-${cols}`;
  gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  answerGridEl.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const problem = makeProblem(grade);
    gridEl.appendChild(buildProblemEl(i, problem));

    const item = document.createElement('div');
    item.className = 'answer-item';
    const ans = getAnswer(problem.a, problem.b);
    item.textContent = `${i}. ${OPERATION === 'money' ? fmtMoney(ans) : fmt(ans)}`;
    answerGridEl.appendChild(item);
  }

  document.getElementById('ws-total').textContent = count;

  outputEl.classList.remove('hidden');
  outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

populateGrades();
genBtn.addEventListener('click', generate);
regenBtn.addEventListener('click', generate);
printBtn.addEventListener('click', () => window.print());
answerKeyCheck.addEventListener('change', () => {
  answerKeyEl.classList.toggle('show-on-print', answerKeyCheck.checked);
});
