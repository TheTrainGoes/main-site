'use strict';

// ============================================================
// SUDOKU GENERATOR + SOLVER
// ============================================================

const state = { puzzle: null, solution: null, difficulty: 'medium' };

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Check if placing num at (r,c) is valid in grid.
function isValid(grid, r, c, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[r][i] === num) return false;
    if (grid[i][c] === num) return false;
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let i = br; i < br + 3; i++) {
    for (let j = bc; j < bc + 3; j++) {
      if (grid[i][j] === num) return false;
    }
  }
  return true;
}

// Fill one 3x3 box starting at (row, col) with shuffled 1-9.
function fillBox(grid, row, col) {
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let i = 0;
  for (let r = row; r < row + 3; r++) {
    for (let c = col; c < col + 3; c++) {
      grid[r][c] = nums[i++];
    }
  }
}

// Solve grid in-place using backtracking (randomised for generation).
// Returns true if a solution was found.
function solveRandom(grid) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === 0) {
        for (const num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (isValid(grid, r, c, num)) {
            grid[r][c] = num;
            if (solveRandom(grid)) return true;
            grid[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true; // no empty cells — solved
}

// Count solutions up to `limit` (stops early once limit reached).
// Uses deterministic order (1-9) to be fast.
function countSolutions(grid, limit) {
  let count = 0;
  function bt() {
    if (count >= limit) return;
    let r = -1, c = -1;
    outer:
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) { r = i; c = j; break outer; }
      }
    }
    if (r === -1) { count++; return; }
    for (let n = 1; n <= 9; n++) {
      if (isValid(grid, r, c, n)) {
        grid[r][c] = n;
        bt();
        grid[r][c] = 0;
        if (count >= limit) return;
      }
    }
  }
  bt();
  return count;
}

// Generate a complete, valid Sudoku grid.
function generateFull() {
  const grid = Array.from({ length: 9 }, () => new Array(9).fill(0));
  // Fill the three diagonal boxes first — they're mutually independent
  fillBox(grid, 0, 0);
  fillBox(grid, 3, 3);
  fillBox(grid, 6, 6);
  // Fill the rest
  solveRandom(grid);
  return grid;
}

// Remove cells from a complete grid to create a puzzle.
// Clue targets: easy 44, medium 34, hard 27.
function createPuzzle(full, difficulty) {
  const targets = { easy: 44, medium: 34, hard: 27 };
  const target = targets[difficulty];
  const puzzle = full.map(row => [...row]);

  // Work through cells in random order; remove each if uniqueness is preserved
  const cells = shuffle(Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9]));

  let clues = 81;
  for (const [r, c] of cells) {
    if (clues <= target) break;
    const backup = puzzle[r][c];
    puzzle[r][c] = 0;
    const copy = puzzle.map(row => [...row]);
    if (countSolutions(copy, 2) === 1) {
      clues--;
    } else {
      puzzle[r][c] = backup;
    }
  }

  return puzzle;
}

// Build a sudoku grid element.
// showAnswer: false = blank empty cells, true = fill with solution in blue.
function buildGrid(puzzle, solution, showAnswer) {
  const grid = document.createElement('div');
  grid.className = 'sudoku-grid';

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement('div');
      cell.className = 'sudoku-cell';

      if (c === 2 || c === 5) cell.classList.add('box-right');
      if (r === 2 || r === 5) cell.classList.add('box-bottom');

      const val = puzzle[r][c];
      if (val !== 0) {
        cell.textContent = val;
        cell.classList.add('given');
      } else if (showAnswer) {
        cell.textContent = solution[r][c];
        cell.classList.add('answer');
      }

      grid.appendChild(cell);
    }
  }

  return grid;
}

function render() {
  const difficulty = document.getElementById('difficulty').value;
  state.difficulty = difficulty;

  const full = generateFull();
  state.solution = full;
  state.puzzle   = createPuzzle(full.map(r => [...r]), difficulty);

  const label = difficulty === 'easy' ? 'Easy' : difficulty === 'medium' ? 'Medium' : 'Hard';
  document.getElementById('sudoku-subtitle').textContent = label;

  const gridEl   = document.getElementById('sudoku-grid');
  const answerEl = document.getElementById('sudoku-answer-grid');
  gridEl.replaceChildren(buildGrid(state.puzzle, state.solution, false));
  answerEl.replaceChildren(buildGrid(state.puzzle, state.solution, true));

  document.getElementById('output').classList.remove('hidden');

  const check = document.getElementById('answer-key-check');
  check.checked = false;
  document.getElementById('sudoku-answer-key').classList.remove('show-on-print');
}

// ---- Event wiring ----
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('generate-btn').addEventListener('click', render);
  document.getElementById('regen-btn').addEventListener('click', render);
  document.getElementById('print-btn').addEventListener('click', () => window.print());
  document.getElementById('answer-key-check').addEventListener('change', function () {
    document.getElementById('sudoku-answer-key').classList.toggle('show-on-print', this.checked);
  });
});
