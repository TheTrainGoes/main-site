'use strict';

// ============================================================
// CROSSWORD PUZZLE GENERATOR
// ============================================================

const ACROSS = 0, DOWN = 1;

const WORD_CLUES = {
  animals: [
    { word: 'ELEPHANT', clue: 'Largest land animal, has a trunk' },
    { word: 'GIRAFFE',  clue: 'Tallest animal, very long neck' },
    { word: 'PENGUIN',  clue: 'Black and white bird that cannot fly' },
    { word: 'DOLPHIN',  clue: 'Intelligent ocean mammal' },
    { word: 'TIGER',    clue: 'Striped big cat from Asia' },
    { word: 'RABBIT',   clue: 'Fluffy animal with long ears' },
    { word: 'PARROT',   clue: 'Colorful bird that can mimic speech' },
    { word: 'SHARK',    clue: 'Large predatory ocean fish' },
    { word: 'MONKEY',   clue: 'Climbing primate that loves bananas' },
    { word: 'TURTLE',   clue: 'Slow reptile with a hard shell' },
    { word: 'LION',     clue: 'King of the jungle' },
    { word: 'FROG',     clue: 'Green amphibian that hops' },
    { word: 'EAGLE',    clue: 'Large bird of prey' },
    { word: 'BEAR',     clue: 'Furry mammal that hibernates' },
    { word: 'SNAKE',    clue: 'Legless reptile' },
    { word: 'OWL',      clue: 'Night bird known for its wisdom' },
    { word: 'WOLF',     clue: 'Wild ancestor of dogs' },
    { word: 'DEER',     clue: 'Graceful animal with antlers' },
    { word: 'CRAB',     clue: 'Sideways-walking ocean creature' },
    { word: 'HORSE',    clue: 'Animal you can ride' },
  ],
  space: [
    { word: 'PLANET',   clue: 'A large body that orbits a star' },
    { word: 'METEOR',   clue: 'A rock that falls through the sky' },
    { word: 'SATURN',   clue: 'Planet famous for its rings' },
    { word: 'GALAXY',   clue: 'A huge system of millions of stars' },
    { word: 'ROCKET',   clue: 'Vehicle used to travel to space' },
    { word: 'COMET',    clue: 'Icy space object with a long tail' },
    { word: 'ORBIT',    clue: 'The path around a planet or star' },
    { word: 'MOON',     clue: "Earth's natural satellite" },
    { word: 'STAR',     clue: 'A glowing ball of gas in the sky' },
    { word: 'MARS',     clue: 'The red planet' },
    { word: 'GRAVITY',  clue: 'Force that pulls things toward Earth' },
    { word: 'NEBULA',   clue: 'A giant cloud of gas and dust in space' },
    { word: 'VENUS',    clue: 'The hottest planet in our solar system' },
    { word: 'JUPITER',  clue: 'The largest planet' },
    { word: 'SOLAR',    clue: 'Relating to the sun' },
    { word: 'ASTEROID', clue: 'Rocky body orbiting the sun' },
    { word: 'ECLIPSE',  clue: "When the moon blocks the sun's light" },
    { word: 'COSMOS',   clue: 'Another word for the universe' },
    { word: 'PROBE',    clue: 'Unmanned spacecraft sent to explore' },
    { word: 'ALIEN',    clue: 'A being from another planet' },
  ],
  nature: [
    { word: 'FOREST',   clue: 'A large area covered with trees' },
    { word: 'RIVER',    clue: 'A large flowing body of fresh water' },
    { word: 'MOUNTAIN', clue: 'A very tall landform' },
    { word: 'FLOWER',   clue: 'A colorful blooming part of a plant' },
    { word: 'THUNDER',  clue: 'The loud sound during a storm' },
    { word: 'RAINBOW',  clue: 'Colorful arc seen after rain' },
    { word: 'GLACIER',  clue: 'A slow-moving mass of ice' },
    { word: 'DESERT',   clue: 'A dry region with very little rain' },
    { word: 'OCEAN',    clue: 'The largest body of salt water' },
    { word: 'CLOUD',    clue: 'Water vapor floating in the sky' },
    { word: 'PETAL',    clue: 'One colorful part of a flower' },
    { word: 'SWAMP',    clue: 'Wet, muddy low-lying land' },
    { word: 'BREEZE',   clue: 'A light, gentle wind' },
    { word: 'VOLCANO',  clue: 'A mountain that can erupt with lava' },
    { word: 'ISLAND',   clue: 'Land surrounded by water on all sides' },
    { word: 'SPRING',   clue: 'Season when flowers bloom' },
    { word: 'POLLEN',   clue: 'Fine powder produced by flowers' },
    { word: 'STORM',    clue: 'Severe weather with strong winds' },
    { word: 'LEAF',     clue: 'A flat green part of a plant' },
    { word: 'CAVE',     clue: 'A hollow space underground or in rock' },
  ],
  school: [
    { word: 'PENCIL',   clue: 'Writing tool you can erase' },
    { word: 'LIBRARY',  clue: 'A place full of books to borrow' },
    { word: 'SCIENCE',  clue: 'Subject that explores how things work' },
    { word: 'HISTORY',  clue: 'Subject about events from the past' },
    { word: 'RECESS',   clue: 'Break time for outdoor play' },
    { word: 'TEACHER',  clue: 'The person who leads your class' },
    { word: 'RULER',    clue: 'Tool used to measure straight lines' },
    { word: 'ERASER',   clue: 'Removes pencil marks from paper' },
    { word: 'GLOBE',    clue: 'A round model of Earth' },
    { word: 'CRAYON',   clue: 'Colorful wax drawing tool' },
    { word: 'DESK',     clue: 'Where you sit and work in class' },
    { word: 'MATH',     clue: 'Subject dealing with numbers' },
    { word: 'EXAM',     clue: 'A big test to check what you know' },
    { word: 'NOON',     clue: 'Midday, 12 o\'clock' },
    { word: 'GRADE',    clue: 'A mark showing how well you did' },
    { word: 'ATLAS',    clue: 'A book of maps' },
    { word: 'ESSAY',    clue: 'A written piece on a topic' },
    { word: 'CHALK',    clue: 'White stick for writing on a blackboard' },
    { word: 'STUDY',    clue: 'To learn by reading and practicing' },
    { word: 'MUSIC',    clue: 'Subject where you sing and play instruments' },
  ],
};

const DIFFICULTY = {
  easy:   { size: 11, count: 8  },
  medium: { size: 13, count: 12 },
  hard:   { size: 15, count: 15 },
};

const state = { grid: null, placed: null, numbering: null };

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeGrid(size) {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

// Returns true if `word` can be placed at (row, col) in direction `dir`.
// `firstWord` skips the intersection requirement for the seed word.
function canPlace(grid, word, row, col, dir, firstWord) {
  const size = grid.length;
  const dr = dir === DOWN ? 1 : 0;
  const dc = dir === ACROSS ? 1 : 0;
  const len = word.length;

  if (row < 0 || col < 0) return false;
  if (row + dr * (len - 1) >= size) return false;
  if (col + dc * (len - 1) >= size) return false;

  // Cell immediately before the word must be empty
  const preR = row - dr, preC = col - dc;
  if (preR >= 0 && preC >= 0 && grid[preR][preC] !== null) return false;

  // Cell immediately after the word must be empty
  const postR = row + dr * len, postC = col + dc * len;
  if (postR < size && postC < size && grid[postR][postC] !== null) return false;

  let intersections = 0;

  for (let i = 0; i < len; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    const cell = grid[r][c];

    if (cell !== null) {
      if (cell.letter !== word[i]) return false;  // letter mismatch
      if (cell.dirs.has(dir))      return false;  // same-direction overlap
      intersections++;
    } else {
      // Empty cell: adjacent cells perpendicular to the word direction must be empty
      // to avoid creating unintended words
      if (dir === ACROSS) {
        if (r > 0        && grid[r - 1][c] !== null) return false;
        if (r < size - 1 && grid[r + 1][c] !== null) return false;
      } else {
        if (c > 0        && grid[r][c - 1] !== null) return false;
        if (c < size - 1 && grid[r][c + 1] !== null) return false;
      }
    }
  }

  return firstWord || intersections > 0;
}

function placeWord(grid, word, row, col, dir) {
  const dr = dir === DOWN ? 1 : 0;
  const dc = dir === ACROSS ? 1 : 0;
  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    if (grid[r][c] === null) {
      grid[r][c] = { letter: word[i], dirs: new Set([dir]) };
    } else {
      grid[r][c].dirs.add(dir);
    }
  }
}

function buildCrossword(wordClueList, size) {
  const grid = makeGrid(size);
  const placed = [];

  // Longest words first for better coverage
  const sorted = [...wordClueList].sort((a, b) => b.word.length - a.word.length);

  // Seed: place first word horizontally near center
  const first = sorted[0];
  const r0 = Math.floor(size / 2);
  const c0 = Math.floor((size - first.word.length) / 2);
  placeWord(grid, first.word, r0, c0, ACROSS);
  placed.push({ word: first.word, clue: first.clue, row: r0, col: c0, dir: ACROSS });

  for (let wi = 1; wi < sorted.length; wi++) {
    const { word, clue } = sorted[wi];
    const tried = new Set();
    let best = null, bestScore = -1;

    for (const dir of [ACROSS, DOWN]) {
      const dr = dir === DOWN ? 1 : 0;
      const dc = dir === ACROSS ? 1 : 0;

      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (!cell) continue;

          // Try aligning each letter of the word with this occupied cell
          for (let i = 0; i < word.length; i++) {
            if (word[i] !== cell.letter) continue;
            const row = r - dr * i;
            const col = c - dc * i;
            const key = `${row},${col},${dir}`;
            if (tried.has(key)) continue;
            tried.add(key);

            if (!canPlace(grid, word, row, col, dir, false)) continue;

            // Score by number of intersections (prefer more connected placements)
            let score = 0;
            for (let j = 0; j < word.length; j++) {
              const gr = row + dr * j, gc = col + dc * j;
              if (grid[gr] && grid[gr][gc]) score++;
            }
            if (score > bestScore) {
              bestScore = score;
              best = { row, col, dir };
            }
          }
        }
      }
    }

    if (best) {
      placeWord(grid, word, best.row, best.col, best.dir);
      placed.push({ word, clue, row: best.row, col: best.col, dir: best.dir });
    }
  }

  return { grid, placed };
}

// Number cells left-to-right, top-to-bottom.
// A cell is numbered if it starts an across word or a down word.
function numberGrid(grid, placed) {
  const size = grid.length;
  const numbering = {};
  let n = 1;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) continue;

      const startsAcross = (c === 0 || !grid[r][c - 1]) && (c + 1 < size && grid[r][c + 1]);
      const startsDown   = (r === 0 || !grid[r - 1][c]) && (r + 1 < size && grid[r + 1][c]);

      if (startsAcross || startsDown) {
        numbering[`${r},${c}`] = n++;
      }
    }
  }

  for (const p of placed) {
    p.number = numbering[`${p.row},${p.col}`];
  }

  return numbering;
}

function renderGrid(grid, numbering, showAnswers) {
  const size = grid.length;
  const gridEl = document.createElement('div');
  gridEl.className = 'cw-grid';
  gridEl.style.gridTemplateColumns = `repeat(${size}, 36px)`;
  gridEl.dataset.size = size;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cellEl = document.createElement('div');
      cellEl.className = 'cw-cell';

      if (grid[r][c]) {
        cellEl.classList.add('cw-white');
        const key = `${r},${c}`;
        if (numbering[key]) {
          const numEl = document.createElement('span');
          numEl.className = 'cw-cell-num';
          numEl.textContent = numbering[key];
          cellEl.appendChild(numEl);
        }
        if (showAnswers) {
          const letterEl = document.createElement('span');
          letterEl.className = 'cw-cell-letter';
          letterEl.textContent = grid[r][c].letter;
          cellEl.appendChild(letterEl);
        }
      }

      gridEl.appendChild(cellEl);
    }
  }

  return gridEl;
}

function buildClueItems(placed, dir, showAnswers) {
  const frag = document.createDocumentFragment();
  const items = placed
    .filter(p => p.dir === dir && p.number != null)
    .sort((a, b) => a.number - b.number);

  for (const p of items) {
    const li = document.createElement('li');
    li.className = 'cw-clue-item';

    const numSpan = document.createElement('span');
    numSpan.className = 'cw-clue-num';
    numSpan.textContent = p.number + '.';

    const textSpan = document.createElement('span');
    textSpan.className = 'cw-clue-text';
    textSpan.textContent = p.clue;

    if (showAnswers) {
      const ansSpan = document.createElement('span');
      ansSpan.className = 'cw-clue-answer';
      ansSpan.textContent = ' (' + p.word + ')';
      textSpan.appendChild(ansSpan);
    }

    li.appendChild(numSpan);
    li.appendChild(textSpan);
    frag.appendChild(li);
  }

  return frag;
}

function generate() {
  const difficulty = document.getElementById('difficulty').value;
  const category   = document.getElementById('category').value;
  const { size, count } = DIFFICULTY[difficulty];

  const pool = shuffle([...WORD_CLUES[category]]).slice(0, count + 6);

  // Run several attempts and keep the result with the most words placed
  let best = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    const words = shuffle([...pool]);
    const result = buildCrossword(words, size);
    if (!best || result.placed.length > best.placed.length) {
      best = result;
    }
    if (best.placed.length >= count) break;
  }

  const { grid, placed } = best;
  const numbering = numberGrid(grid, placed);

  state.grid = grid;
  state.placed = placed;
  state.numbering = numbering;

  // Subtitle
  const catLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const diffLabel = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }[difficulty];
  document.getElementById('cw-subtitle').textContent = `${catLabel} \u2014 ${diffLabel}`;

  // Puzzle
  document.getElementById('cw-grid-wrapper').replaceChildren(renderGrid(grid, numbering, false));
  document.getElementById('cw-across-list').replaceChildren(buildClueItems(placed, ACROSS, false));
  document.getElementById('cw-down-list').replaceChildren(buildClueItems(placed, DOWN, false));

  // Answer key
  document.getElementById('cw-answer-grid-wrapper').replaceChildren(renderGrid(grid, numbering, true));
  document.getElementById('cw-answer-across-list').replaceChildren(buildClueItems(placed, ACROSS, true));
  document.getElementById('cw-answer-down-list').replaceChildren(buildClueItems(placed, DOWN, true));

  document.getElementById('output').classList.remove('hidden');

  const check = document.getElementById('answer-key-check');
  check.checked = false;
  document.getElementById('cw-answer-key').classList.remove('show-on-print');
}

// ---- Event wiring ----
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('generate-btn').addEventListener('click', generate);
  document.getElementById('regen-btn').addEventListener('click', generate);
  document.getElementById('print-btn').addEventListener('click', () => window.print());
  document.getElementById('answer-key-check').addEventListener('change', function () {
    document.getElementById('cw-answer-key').classList.toggle('show-on-print', this.checked);
  });
});
