'use strict';

// ============================================================
// SYNONYMS & ANTONYMS — two-column letter matching
// Column A: numbered words + write-in blank
// Column B: lettered words (shuffled)
// ============================================================

const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Render ─────────────────────────────────────────────────────────────────
function render() {
  const grade = document.getElementById('grade').value;
  const type  = document.getElementById('type').value;   // 'synonyms' | 'antonyms'
  const pairs = LANG_PAIRS[grade][type];                 // array of [word, partner]

  const typeLabel = type === 'synonyms' ? 'Synonyms' : 'Antonyms';
  const title = `${GRADE_LABELS[grade]} \u2014 ${typeLabel}`;
  const subtitle = type === 'synonyms'
    ? 'Write the letter of the word in Column B that means the same as the word in Column A.'
    : 'Write the letter of the word in Column B that means the opposite of the word in Column A.';

  document.getElementById('worksheet-title').textContent = title;
  document.getElementById('worksheet-subtitle').textContent = subtitle;
  document.getElementById('answer-key-title').textContent = title;

  // Shuffle the right-column order
  const indices = shuffle([...Array(pairs.length).keys()]); // shuffled 0-based indices into pairs
  // indices[i] = which pair's partner goes in right-column slot i
  // We need: left col = pairs in order, right col = shuffled partners
  // correctLetter[leftIdx] = LETTERS[rightSlot] where rightSlot is the slot holding left's partner

  // Build right column: each slot holds partners[indices[slot]]
  // correctLetter for left item i = LETTERS[ slot where indices[slot] === i ]
  const rightSlotForLeft = new Array(pairs.length);
  indices.forEach((pairIdx, slot) => { rightSlotForLeft[pairIdx] = slot; });

  const grid   = document.getElementById('match-grid');
  const akGrid = document.getElementById('answer-grid');
  grid.innerHTML = '';
  akGrid.innerHTML = '';

  // Build left column items
  const leftItems = pairs.map(([word], i) => {
    const div = document.createElement('div');
    div.className = 'lang-match-item';
    div.innerHTML =
      `<span class="lang-match-key">${i + 1}.</span>` +
      `<span class="lang-match-word">${word}</span>` +
      `<span class="lang-match-blank"></span>`;
    return div;
  });

  // Build right column items (shuffled order via indices)
  const rightItems = indices.map((pairIdx, slot) => {
    const partner = pairs[pairIdx][1];
    const div = document.createElement('div');
    div.className = 'lang-match-item';
    div.innerHTML =
      `<span class="lang-match-key">${LETTERS[slot]}.</span>` +
      `<span class="lang-match-word">${partner}</span>`;
    return div;
  });

  // Interleave into grid (left, right, left, right…)
  leftItems.forEach((leftEl, i) => {
    grid.appendChild(leftEl);
    grid.appendChild(rightItems[i]);
  });

  // Answer key
  pairs.forEach(([word, partner], i) => {
    const letter = LETTERS[rightSlotForLeft[i]];
    const div = document.createElement('div');
    div.className = 'lang-answer-item';
    div.textContent = `${i + 1}. ${word} \u2194 ${partner}  (${letter})`;
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
  if (g === 'easy') opt.selected = true;
  document.getElementById('grade').appendChild(opt);
});

document.getElementById('generate-btn').addEventListener('click', render);
document.getElementById('regen-btn').addEventListener('click', render);
document.getElementById('print-btn').addEventListener('click', () => window.print());
document.getElementById('answer-key-check').addEventListener('change', function () {
  document.getElementById('answer-key').classList.toggle('show-on-print', this.checked);
});
