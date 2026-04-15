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

// Which grade levels are available per operation
const VALID_GRADES = {
  addition:       ['kindergarten','grade1','grade2','grade3','grade4','grade5','grade6'],
  subtraction:    ['kindergarten','grade1','grade2','grade3','grade4','grade5','grade6'],
  multiplication: ['grade2','grade3','grade4','grade5','grade6'],
  division:       ['grade3','grade4','grade5','grade6'],
  money:          ['kindergarten','grade1','grade2','grade3','grade4','grade5','grade6']
};

// Default selected grade per operation
const DEFAULT_GRADE = {
  addition: 'grade2', subtraction: 'grade2', multiplication: 'grade3', division: 'grade3',
  money: 'grade2'
};

const GRADE_LABELS = {
  kindergarten: 'Kindergarten',
  grade1: 'Grade 1', grade2: 'Grade 2', grade3: 'Grade 3',
  grade4: 'Grade 4', grade5: 'Grade 5', grade6: 'Grade 6'
};

const ALL_GRADES = ['kindergarten','grade1','grade2','grade3','grade4','grade5','grade6'];

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
        case 'kindergarten': do { a = rand(1,5); b = rand(1,5); } while (a + b > 10); break;
        case 'grade1':       a = rand(1,9);     b = rand(1,9);     break;
        case 'grade2':       a = rand(11,99);   b = rand(1,20);    break;
        case 'grade3':       a = rand(101,999); b = rand(10,99);   break;
        case 'grade4':       a = rand(1001,9999);  b = rand(100,999);  break;
        case 'grade5':       a = rand(1001,9999);  b = rand(1001,9999); break;
        case 'grade6':       a = rand(10001,99999); b = rand(1000,9999); break;
        default:             a = rand(1,9);     b = rand(1,9);
      }
      break;

    case 'subtraction':
      switch (grade) {
        case 'kindergarten': a = rand(2,10);   b = rand(1,a);                          break;
        case 'grade1':       a = rand(3,18);   b = rand(1, Math.min(a - 1, 9));        break;
        case 'grade2':       a = rand(20,99);  b = rand(1,20);  while (b >= a) b = rand(1,20); break;
        case 'grade3':       a = rand(101,999); b = rand(10,99);                       break;
        case 'grade4':       a = rand(1001,9999);  b = rand(100,999);                 break;
        case 'grade5':       a = rand(2001,9999);  b = rand(1001, a - 1);             break;
        case 'grade6':       a = rand(10001,99999); b = rand(1000,9999);              break;
        default:             a = rand(3,18);   b = rand(1, a - 1);
      }
      break;

    case 'multiplication':
      switch (grade) {
        case 'grade2': a = rand(1,5);    b = rand(1,5);   break;
        case 'grade3': a = rand(2,10);   b = rand(2,10);  break;
        case 'grade4': a = rand(11,99);  b = rand(2,9);   break;
        case 'grade5': a = rand(11,99);  b = rand(11,99); break;
        case 'grade6': a = rand(101,999); b = rand(11,99); break;
        default:       a = rand(2,10);   b = rand(2,10);
      }
      break;

    case 'division':
      // Always generates whole-number quotients (no remainders)
      switch (grade) {
        case 'grade3': b = rand(2,5);  a = b * rand(1,10); break;
        case 'grade4': b = rand(2,9);  a = b * rand(2,12); break;
        case 'grade5': b = rand(2,12); a = b * rand(2,20); break;
        case 'grade6': b = rand(2,20); a = b * rand(2,20); break;
        default:       b = rand(2,9);  a = b * rand(2,12);
      }
      break;

    case 'money': {
      // a = array of coin/bill objects, b = total in cents
      const items = [];
      function addItems(label, value, count) {
        for (let i = 0; i < count; i++) items.push({ label, value });
      }
      switch (grade) {
        case 'kindergarten':
          addItems('1¢', 1, rand(2, 10));
          break;
        case 'grade1':
          addItems('5¢', 5, rand(1, 4));
          addItems('1¢', 1, rand(0, 5));
          break;
        case 'grade2':
          addItems('10¢', 10, rand(1, 4));
          addItems('5¢', 5, rand(0, 2));
          addItems('1¢', 1, rand(0, 4));
          break;
        case 'grade3':
          addItems('25¢', 25, rand(1, 3));
          addItems('10¢', 10, rand(0, 2));
          addItems('5¢', 5, rand(0, 2));
          addItems('1¢', 1, rand(0, 3));
          break;
        case 'grade4':
          addItems('$1', 100, rand(1, 4));
          addItems('25¢', 25, rand(0, 3));
          addItems('10¢', 10, rand(0, 2));
          addItems('1¢', 1, rand(0, 3));
          break;
        case 'grade5':
          addItems('$5', 500, rand(1, 2));
          addItems('$1', 100, rand(0, 3));
          addItems('25¢', 25, rand(0, 2));
          addItems('10¢', 10, rand(0, 2));
          addItems('1¢', 1, rand(0, 3));
          break;
        case 'grade6':
          addItems('$10', 1000, rand(0, 1));
          addItems('$5', 500, rand(0, 2));
          addItems('$1', 100, rand(1, 4));
          addItems('25¢', 25, rand(0, 3));
          addItems('10¢', 10, rand(0, 2));
          addItems('1¢', 1, rand(0, 4));
          break;
        default:
          addItems('25¢', 25, rand(1, 3));
          addItems('10¢', 10, rand(0, 2));
          addItems('1¢', 1, rand(0, 3));
      }
      // Shuffle
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
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
      const cls = item.value >= 100 ? 'chip chip--bill' : 'chip chip--coin';
      return `<span class="${cls}">${item.label}</span>`;
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
  ALL_GRADES.forEach(g => {
    if (!valid.includes(g)) return;
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
    ? (count === 10 ? 2 : count === 20 ? 3 : 4)
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
