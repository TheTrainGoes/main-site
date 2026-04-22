'use strict';

// ============================================================
// UNSCRAMBLE — shuffle each word's letters, ensure result
// differs from the original
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

function scramble(word) {
  const chars = word.toLowerCase().split('');
  let result;
  let tries = 0;
  do {
    result = shuffle([...chars]);
    tries++;
  } while (result.join('') === word.toLowerCase() && tries < 20);
  return result.join('');
}

// ── Render ─────────────────────────────────────────────────────────────────
function render() {
  const grade = document.getElementById('grade').value;
  const count = parseInt(document.getElementById('count').value, 10);
  const words = sample(LANG_WORDS[grade], count);

  const title = `${GRADE_LABELS[grade]} \u2014 Unscramble the Words`;
  document.getElementById('worksheet-title').textContent = title;
  document.getElementById('answer-key-title').textContent = title;
  document.getElementById('ws-total').textContent = count;

  const grid   = document.getElementById('problems-grid');
  const akGrid = document.getElementById('answer-grid');
  grid.innerHTML = '';
  akGrid.innerHTML = '';

  words.forEach((word, i) => {
    const mixed = scramble(word);
    const num = i + 1;

    const div = document.createElement('div');
    div.className = 'lang-item';
    div.innerHTML =
      `<span class="lang-num">${num}.</span>` +
      `<span class="lang-word">${mixed}</span>` +
      `<span class="lang-arrow">&rarr;</span>` +
      `<span class="lang-answer-line"></span>`;
    grid.appendChild(div);

    const akDiv = document.createElement('div');
    akDiv.className = 'lang-answer-item';
    akDiv.textContent = `${num}. ${word}`;
    akGrid.appendChild(akDiv);
  });

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
