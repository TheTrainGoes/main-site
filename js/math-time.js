'use strict';

const GRADE_CONFIG = {
  easy:   { label: 'Easy',   minuteOptions: [0, 30] },
  medium: { label: 'Medium', minuteOptions: [0, 10, 20, 30, 40, 50] },
  hard:   { label: 'Hard',   minuteOptions: Array.from({ length: 60 }, (_, i) => i) },
};

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Build a de-duplicated, shuffled list of times for the given grade and count.
function generateTimes(difficulty, count) {
  const { minuteOptions } = GRADE_CONFIG[difficulty];
  const pool = [];
  for (let h = 1; h <= 12; h++) {
    for (const m of minuteOptions) {
      pool.push({ hour: h, minute: m });
    }
  }
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = rand(0, i);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  if (count <= pool.length) return pool.slice(0, count);
  // More problems requested than unique times — allow repeats
  const result = [];
  for (let i = 0; i < count; i++) result.push(pool[i % pool.length]);
  return result;
}

function formatTime(hour, minute) {
  return `${hour}:${String(minute).padStart(2, '0')}`;
}

// ============================================================
// CLOCK SVG
// ============================================================

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs) {
  const e = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  return e;
}

function buildClockSVG(hour, minute) {
  const svg = svgEl('svg', { viewBox: '0 0 100 100', class: 'clock-svg' });

  // Outer face
  svg.appendChild(svgEl('circle', {
    cx: 50, cy: 50, r: 46,
    fill: 'white', stroke: '#1c1c2e', 'stroke-width': 2.5,
  }));

  // Tick marks (60 minute ticks, every 5th is an hour tick)
  for (let i = 0; i < 60; i++) {
    const rad = (i * 6) * Math.PI / 180;
    const isHour = i % 5 === 0;
    svg.appendChild(svgEl('line', {
      x1: 50 + (isHour ? 37 : 41) * Math.sin(rad),
      y1: 50 - (isHour ? 37 : 41) * Math.cos(rad),
      x2: 50 + 44 * Math.sin(rad),
      y2: 50 - 44 * Math.cos(rad),
      stroke: '#1c1c2e',
      'stroke-width': isHour ? 2 : 0.75,
      'stroke-linecap': 'round',
    }));
  }

  // Numbers 1–12
  for (let n = 1; n <= 12; n++) {
    const rad = (n * 30) * Math.PI / 180;
    const r = 30;
    const t = svgEl('text', {
      x: 50 + r * Math.sin(rad),
      y: 50 - r * Math.cos(rad) + 3.5,
      'text-anchor': 'middle',
      'font-size': 9,
      'font-weight': 700,
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fill: '#1c1c2e',
    });
    t.textContent = n;
    svg.appendChild(t);
  }

  // Hour hand (shorter, fatter)
  const hourRad = ((hour % 12) * 30 + minute * 0.5) * Math.PI / 180;
  svg.appendChild(svgEl('line', {
    x1: 50, y1: 50,
    x2: 50 + 22 * Math.sin(hourRad),
    y2: 50 - 22 * Math.cos(hourRad),
    stroke: '#1c1c2e', 'stroke-width': 4, 'stroke-linecap': 'round',
  }));

  // Minute hand (longer, thinner)
  const minRad = (minute * 6) * Math.PI / 180;
  svg.appendChild(svgEl('line', {
    x1: 50, y1: 50,
    x2: 50 + 34 * Math.sin(minRad),
    y2: 50 - 34 * Math.cos(minRad),
    stroke: '#1c1c2e', 'stroke-width': 2.5, 'stroke-linecap': 'round',
  }));

  // Center dot
  svg.appendChild(svgEl('circle', { cx: 50, cy: 50, r: 3.5, fill: '#1c1c2e' }));

  return svg;
}

// ============================================================
// PROBLEM ELEMENT
// ============================================================

function buildProblemEl(idx, time) {
  const { hour, minute } = time;

  const div = document.createElement('div');
  div.className = 'clock-problem';

  const num = document.createElement('div');
  num.className = 'clock-num';
  num.textContent = `${idx}.`;
  div.appendChild(num);

  div.appendChild(buildClockSVG(hour, minute));

  const answerRow = document.createElement('div');
  answerRow.className = 'clock-answer-row';

  const label = document.createElement('span');
  label.className = 'clock-label';
  label.textContent = 'Time:';
  answerRow.appendChild(label);

  const line = document.createElement('div');
  line.className = 'clock-answer-line';
  answerRow.appendChild(line);

  div.appendChild(answerRow);
  return div;
}

// ============================================================
// UI
// ============================================================

const gradeEl        = document.getElementById('difficulty');
const countEl        = document.getElementById('count');
const genBtn         = document.getElementById('generate-btn');
const outputEl       = document.getElementById('output');
const gridEl         = document.getElementById('clock-grid');
const titleEl        = document.getElementById('worksheet-title');
const printBtn       = document.getElementById('print-btn');
const regenBtn       = document.getElementById('regen-btn');
const answerKeyEl    = document.getElementById('answer-key');
const answerGridEl   = document.getElementById('answer-grid');
const answerTitleEl  = document.getElementById('answer-key-title');
const answerKeyCheck = document.getElementById('answer-key-check');

function generate() {
  const difficulty = gradeEl.value;
  const count = parseInt(countEl.value, 10);
  const { label } = GRADE_CONFIG[difficulty];

  // 6 → 3 cols (2 rows), 9 → 3 cols (3 rows), 12 → 4 cols (3 rows)
  const cols = count === 12 ? 4 : 3;
  const titleText = `${label} Telling Time Practice`;

  titleEl.textContent = titleText;
  answerTitleEl.textContent = titleText;

  gridEl.innerHTML = '';
  gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  gridEl.dataset.cols = cols;
  answerGridEl.innerHTML = '';

  const times = generateTimes(difficulty, count);

  times.forEach((time, i) => {
    gridEl.appendChild(buildProblemEl(i + 1, time));

    const item = document.createElement('div');
    item.className = 'answer-item';
    item.textContent = `${i + 1}. ${formatTime(time.hour, time.minute)}`;
    answerGridEl.appendChild(item);
  });

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
