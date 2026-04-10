'use strict';

// ============================================================
// ABC ORDER — two groups of 10 words, student writes 1–10
// next to each word in alphabetical order
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

// Build one group column.
// words: array of 10 shuffled words
// sorted: same words in alphabetical order (for answer key)
// showAnswers: whether to fill in the number boxes
function buildGroup(label, words, sorted, showAnswers) {
  const group = document.createElement('div');
  group.className = 'lang-abc-group';

  const title = document.createElement('div');
  title.className = 'lang-abc-group-title';
  title.textContent = label;
  group.appendChild(title);

  const list = document.createElement('ul');
  list.className = 'lang-abc-list';

  words.forEach(word => {
    const rank = showAnswers ? sorted.indexOf(word) + 1 : '';
    const li = document.createElement('li');
    li.className = 'lang-abc-item';
    li.innerHTML =
      `<span class="lang-abc-box">${rank}</span>` +
      `<span class="lang-abc-word">${word}</span>`;
    list.appendChild(li);
  });

  group.appendChild(list);
  return group;
}

// ── Render ─────────────────────────────────────────────────────────────────
function render() {
  const grade = document.getElementById('grade').value;
  const twenty = sample(LANG_WORDS[grade], 20);
  const groupA = twenty.slice(0, 10);
  const groupB = twenty.slice(10, 20);

  const sortedA = [...groupA].sort((a, b) => a.localeCompare(b));
  const sortedB = [...groupB].sort((a, b) => a.localeCompare(b));

  const title = `${GRADE_LABELS[grade]} \u2014 ABC Order`;
  document.getElementById('worksheet-title').textContent = title;
  document.getElementById('answer-key-title').textContent = title;

  const container   = document.getElementById('abc-container');
  const akContainer = document.getElementById('answer-container');
  container.innerHTML = '';
  akContainer.innerHTML = '';

  container.appendChild(buildGroup('Group 1', groupA, sortedA, false));
  container.appendChild(buildGroup('Group 2', groupB, sortedB, false));

  akContainer.appendChild(buildGroup('Group 1 \u2014 Sorted', sortedA, sortedA, true));
  akContainer.appendChild(buildGroup('Group 2 \u2014 Sorted', sortedB, sortedB, true));

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
