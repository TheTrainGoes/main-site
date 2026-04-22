'use strict';

// ============================================================
// CRYPTOGRAM GENERATOR
// ============================================================

const PHRASES = {
  animals: [
    'A DOG IS THE ONLY THING ON EARTH THAT LOVES YOU MORE THAN YOU LOVE YOURSELF',
    'THE EARLY BIRD CATCHES THE WORM',
    'DOGS HAVE OWNERS BUT CATS HAVE STAFF',
    'AN ELEPHANT NEVER FORGETS',
    'BE LIKE A DUCK CALM ON TOP BUT PADDLE HARD BELOW',
    'A LION DOES NOT LOSE SLEEP OVER THE OPINIONS OF SHEEP',
    'IF YOU WANT A FRIEND GET A DOG',
    'A HOUSE WITHOUT A CAT IS JUST A HOUSE',
    'BIRDS OF A FEATHER FLOCK TOGETHER',
    'NEVER LOOK A GIFT HORSE IN THE MOUTH',
  ],
  nature: [
    'THE EARTH LAUGHS IN FLOWERS',
    'EVERY FLOWER MUST GROW THROUGH DIRT',
    'A RAINBOW IS A PROMISE OF SUNSHINE AFTER RAIN',
    'THE SUN ALWAYS SHINES ABOVE THE CLOUDS',
    'ADOPT THE PACE OF NATURE HER SECRET IS PATIENCE',
    'IN EVERY WALK WITH NATURE ONE RECEIVES FAR MORE THAN ONE SEEKS',
    'THE CLEAREST WAY INTO THE UNIVERSE IS THROUGH A FOREST WILDERNESS',
    'LOOK DEEP INTO NATURE AND YOU WILL UNDERSTAND EVERYTHING BETTER',
    'KEEP CLOSE TO NATURE AND NEVER LOSE THAT SENSE OF WONDER',
  ],
  friendship: [
    'GOOD FRIENDS ARE LIKE STARS YOU CANNOT ALWAYS SEE THEM BUT THEY ARE ALWAYS THERE',
    'A FRIEND IS SOMEONE WHO KNOWS ALL ABOUT YOU AND STILL LOVES YOU',
    'A REAL FRIEND WALKS IN WHEN THE REST OF THE WORLD WALKS OUT',
    'FRIENDS ARE THE FAMILY YOU CHOOSE',
    'A GOOD FRIEND MAKES YOU LAUGH MORE THAN YOU CRY',
    'THERE IS NOTHING BETTER THAN A FRIEND UNLESS IT IS A FRIEND WITH CHOCOLATE',
    'FRIENDSHIP IS THE ONLY CEMENT THAT WILL HOLD THE WORLD TOGETHER',
    'A SWEET FRIENDSHIP REFRESHES THE SOUL',
    'WALKING WITH A FRIEND IN THE DARK IS BETTER THAN WALKING ALONE IN THE LIGHT',
  ],
  funny: [
    'I TOLD MY DOG HE WAS ADOPTED HE DID NOT BELIEVE ME',
    'I AM ON A SEAFOOD DIET I SEE FOOD AND I EAT IT',
    'WHY DO COWS WEAR BELLS BECAUSE THEIR HORNS DO NOT WORK',
    'WHAT DO YOU CALL A SLEEPING DINOSAUR A DINO SNORE',
    'I ASKED MY CAT FOR A HIGH FIVE HE GAVE ME A LOW FOUR',
    'MONEY CANNOT BUY HAPPINESS BUT IT CAN BUY ICE CREAM WHICH IS CLOSE ENOUGH',
    'I TOLD A JOKE ABOUT PAPER IT WAS TEARABLE',
    'WHY DID THE BICYCLE FALL OVER BECAUSE IT WAS TWO TIRED',
    'I USED TO HATE FACIAL HAIR BUT THEN IT GREW ON ME',
    'WHAT DO YOU CALL CHEESE THAT IS NOT YOURS NACHO CHEESE',
  ],
};

const HINT_COUNTS = { easy: 8, medium: 4, hard: 0 };

const state = { encode: null, decode: null, phrase: null, hints: null };

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate a substitution cipher where no letter maps to itself.
function generateCipher() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let shuffled;
  do {
    shuffled = shuffle([...letters]);
  } while (shuffled.some((l, i) => l === letters[i]));
  const encode = {}, decode = {};
  letters.forEach((l, i) => {
    encode[l] = shuffled[i];  // plaintext → cipher
    decode[shuffled[i]] = l;  // cipher → plaintext
  });
  return { encode, decode };
}

function pickPhrase(category) {
  const list = PHRASES[category];
  return list[Math.floor(Math.random() * list.length)];
}

// Return a hints map { cipherLetter: plainLetter } for the most frequent cipher letters.
function getHints(encoded, decode, count) {
  if (count === 0) return {};
  const freq = {};
  for (const ch of encoded) {
    if (/[A-Z]/.test(ch)) freq[ch] = (freq[ch] || 0) + 1;
  }
  const sorted = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);
  const hints = {};
  for (const cl of sorted.slice(0, count)) {
    hints[cl] = decode[cl];
  }
  return hints;
}

function buildPuzzleBody(encoded, hints, showAnswer, decode) {
  const container = document.createElement('div');
  container.className = 'cryptogram-body';

  for (const word of encoded.split(' ')) {
    const wordEl = document.createElement('div');
    wordEl.className = 'crypto-word';

    for (const ch of word) {
      const cell = document.createElement('div');
      cell.className = 'crypto-cell';

      const top = document.createElement('div');
      top.className = 'crypto-encoded';
      top.textContent = ch;

      const bot = document.createElement('div');
      bot.className = 'crypto-decoded';

      if (showAnswer) {
        bot.textContent = decode[ch];
        bot.classList.add('answer');
      } else if (hints[ch]) {
        bot.textContent = hints[ch];
        bot.classList.add('hint');
      }

      cell.appendChild(top);
      cell.appendChild(bot);
      wordEl.appendChild(cell);
    }

    container.appendChild(wordEl);
  }

  return container;
}

function buildKeyGrid(hints, showAll, decode) {
  const grid = document.createElement('div');
  grid.className = 'cryptogram-key';

  for (const cl of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')) {
    const cell = document.createElement('div');
    cell.className = 'crypto-key-cell';

    const top = document.createElement('div');
    top.className = 'crypto-key-cipher';
    top.textContent = cl;

    const bot = document.createElement('div');
    bot.className = 'crypto-key-plain';

    if (showAll) {
      bot.textContent = decode[cl];
      bot.classList.add('answer');
    } else if (hints[cl]) {
      bot.textContent = hints[cl];
      bot.classList.add('hint');
    }

    cell.appendChild(top);
    cell.appendChild(bot);
    grid.appendChild(cell);
  }

  return grid;
}

function render() {
  const difficulty = document.getElementById('difficulty').value;
  const category   = document.getElementById('category').value;

  const phrase = pickPhrase(category);
  const { encode, decode } = generateCipher();
  const encoded = phrase.split('').map(ch => encode[ch] ?? ch).join('');
  const hints   = getHints(encoded, decode, HINT_COUNTS[difficulty]);

  state.encode = encode;
  state.decode = decode;
  state.phrase = phrase;
  state.hints  = hints;

  const label = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }[difficulty];
  document.getElementById('crypto-subtitle').textContent = label;

  document.getElementById('cryptogram-body')
    .replaceChildren(buildPuzzleBody(encoded, hints, false, decode));

  document.getElementById('cryptogram-key')
    .replaceChildren(buildKeyGrid(hints, false, decode));

  document.getElementById('cryptogram-answer-body')
    .replaceChildren(buildPuzzleBody(encoded, hints, true, decode));

  document.getElementById('cryptogram-answer-key-grid')
    .replaceChildren(buildKeyGrid(hints, true, decode));

  document.getElementById('output').classList.remove('hidden');

  const check = document.getElementById('answer-key-check');
  check.checked = false;
  document.getElementById('cryptogram-answer-key').classList.remove('show-on-print');
}

// ---- Event wiring ----
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('generate-btn').addEventListener('click', render);
  document.getElementById('regen-btn').addEventListener('click', render);
  document.getElementById('print-btn').addEventListener('click', () => window.print());
  document.getElementById('answer-key-check').addEventListener('change', function () {
    document.getElementById('cryptogram-answer-key').classList.toggle('show-on-print', this.checked);
  });
});
