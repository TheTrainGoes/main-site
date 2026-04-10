'use strict';

// ============================================================
// FILL IN THE BLANK — cloze sentences with word bank
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

// ── Render ─────────────────────────────────────────────────────────────────
function render() {
  const grade = document.getElementById('grade').value;
  const count = parseInt(document.getElementById('count').value, 10);
  const sentences = sample(LANG_SENTENCES[grade], count);

  const title = `${GRADE_LABELS[grade]} \u2014 Fill in the Blank`;
  document.getElementById('worksheet-title').textContent = title;
  document.getElementById('answer-key-title').textContent = title;
  document.getElementById('ws-total').textContent = count;

  // Word bank — shuffled answers
  const answers = sentences.map(s => s.answer);
  const bankWords = shuffle([...answers]);
  const bankEl = document.getElementById('bank-items');
  bankEl.innerHTML = '';
  bankWords.forEach(w => {
    const span = document.createElement('span');
    span.className = 'lang-bank-word';
    span.textContent = w;
    bankEl.appendChild(span);
  });

  // Sentence list
  const list = document.getElementById('sentence-list');
  list.innerHTML = '';
  sentences.forEach(({ text }) => {
    const li = document.createElement('li');
    li.className = 'lang-sentence-item';
    // Replace ___ with a blank line span
    const html = text.replace('___', '<span class="lang-blank-line"></span>');
    li.innerHTML = html;
    list.appendChild(li);
  });

  // Answer key — numbered list
  const akGrid = document.getElementById('answer-grid');
  akGrid.innerHTML = '';
  sentences.forEach(({ answer }, i) => {
    const div = document.createElement('div');
    div.className = 'lang-answer-item';
    div.textContent = `${i + 1}. ${answer}`;
    akGrid.appendChild(div);
  });

  document.getElementById('output').classList.remove('hidden');
  document.getElementById('output').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Boot ───────────────────────────────────────────────────────────────────
LANG_GRADES.forEach(g => {
  const opt = document.createElement('option');
  opt.value = g;
  opt.textContent = GRADE_LABELS[g];
  if (g === 'grade2') opt.selected = true;
  document.getElementById('grade').appendChild(opt);
});

document.getElementById('generate-btn').addEventListener('click', render);
document.getElementById('regen-btn').addEventListener('click', render);
document.getElementById('print-btn').addEventListener('click', () => window.print());
document.getElementById('answer-key-check').addEventListener('change', function () {
  document.getElementById('answer-key').classList.toggle('show-on-print', this.checked);
});
