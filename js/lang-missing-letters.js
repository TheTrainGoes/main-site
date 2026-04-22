'use strict';

// ============================================================
// MISSING LETTERS — pick random words, blank out 1–2 letters
// ============================================================

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample(arr, n) {
  return shuffle([...arr]).slice(0, n);
}

const VOWELS = new Set('aeiou');

function blankLetters(word, grade) {
  const w = word.toLowerCase();
  const len = w.length;

  // Number of blanks increases with difficulty / word length
  let numBlanks = 1;
  if ((grade === 'medium' && len >= 6) || (grade === 'hard' && len >= 5)) {
    numBlanks = 2;
  }

  // Eligible positions: skip index 0 and last so the word is identifiable
  const eligible = [];
  for (let i = 1; i < len - 1; i++) eligible.push(i);

  if (eligible.length === 0) {
    // Very short word — blank position 0
    return { display: '_' + w.slice(1), missing: w[0] };
  }

  // Prefer vowel positions first so the blank is more solvable
  const vowelPos = shuffle(eligible.filter(i => VOWELS.has(w[i])));
  const consPos  = shuffle(eligible.filter(i => !VOWELS.has(w[i])));
  const candidates = [...vowelPos, ...consPos];

  const toBlank = new Set(candidates.slice(0, Math.min(numBlanks, candidates.length)));

  const arr = w.split('');
  const missing = [...toBlank].sort((a, b) => a - b).map(i => arr[i]);
  toBlank.forEach(i => { arr[i] = '_'; });

  // Add spaces between characters for readability on the sheet
  return { display: arr.join(' '), missing: missing.join(', ') };
}

// ── Render ─────────────────────────────────────────────────────────────────
function render() {
  const grade = document.getElementById('grade').value;
  const count = parseInt(document.getElementById('count').value, 10);
  const words = sample(LANG_WORDS[grade], count);

  const title = `${GRADE_LABELS[grade]} \u2014 Missing Letters`;
  document.getElementById('worksheet-title').textContent = title;
  document.getElementById('answer-key-title').textContent = title;
  document.getElementById('ws-total').textContent = count;

  const grid   = document.getElementById('problems-grid');
  const akGrid = document.getElementById('answer-grid');
  grid.innerHTML = '';
  akGrid.innerHTML = '';

  words.forEach((word, i) => {
    const { display, missing } = blankLetters(word, grade);
    const num = i + 1;

    const div = document.createElement('div');
    div.className = 'lang-item';
    div.innerHTML =
      `<span class="lang-num">${num}.</span>` +
      `<span class="lang-word">${display}</span>` +
      `<span class="lang-answer-line"></span>`;
    grid.appendChild(div);

    const akDiv = document.createElement('div');
    akDiv.className = 'lang-answer-item';
    akDiv.textContent = `${num}. ${word}  (${missing})`;
    akGrid.appendChild(akDiv);
  });

  // Set grid columns based on count
  grid.style.gridTemplateColumns = count === 20 ? '1fr 1fr' : '1fr';

  document.getElementById('output').classList.remove('hidden');
  document.getElementById('output').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Boot ───────────────────────────────────────────────────────────────────
LANG_GRADES.forEach(g => {
  const opt = document.createElement('option');
  opt.value = g;
  opt.textContent = GRADE_LABELS[g];
  if (g === 'easy') opt.selected = true;
  document.getElementById('grade').appendChild(opt);
});

document.getElementById('generate-btn').addEventListener('click', render);
document.getElementById('regen-btn').addEventListener('click', render);
document.getElementById('print-btn').addEventListener('click', () => window.print());
document.getElementById('answer-key-check').addEventListener('change', function () {
  document.getElementById('answer-key').classList.toggle('show-on-print', this.checked);
});
