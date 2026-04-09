'use strict';

// ============================================================
// MAZE GENERATOR — Iterative DFS (recursive backtracking)
// + BFS solver + SVG renderer
// ============================================================

const state = { walls: null, rows: 0, cols: 0, solution: null };

// Fisher-Yates shuffle (in-place, returns arr)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate a perfect maze using iterative DFS.
// walls[r][c] = { top, right, bottom, left } — true means wall is present.
function generateMaze(rows, cols) {
  const walls = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ top: true, right: true, bottom: true, left: true }))
  );
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));

  const stack = [[0, 0]];
  visited[0][0] = true;

  while (stack.length) {
    const [r, c] = stack[stack.length - 1];
    const dirs = shuffle([[-1, 0], [1, 0], [0, -1], [0, 1]]);
    let moved = false;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        visited[nr][nc] = true;
        // Remove wall between current cell and chosen neighbor
        if (dr === -1) { walls[r][c].top    = false; walls[nr][nc].bottom = false; }
        if (dr ===  1) { walls[r][c].bottom = false; walls[nr][nc].top    = false; }
        if (dc === -1) { walls[r][c].left   = false; walls[nr][nc].right  = false; }
        if (dc ===  1) { walls[r][c].right  = false; walls[nr][nc].left   = false; }
        stack.push([nr, nc]);
        moved = true;
        break;
      }
    }

    if (!moved) stack.pop();
  }

  // Open entrance (top of top-left) and exit (bottom of bottom-right)
  walls[0][0].top = false;
  walls[rows - 1][cols - 1].bottom = false;

  return walls;
}

// BFS from (0,0) to (rows-1, cols-1). Returns ordered path as [[r,c], ...].
function solveMaze(walls, rows, cols) {
  const prev = Array.from({ length: rows }, () => new Array(cols).fill(null));
  prev[0][0] = [-1, -1]; // sentinel: start has no parent
  const queue = [[0, 0]];

  outer:
  while (queue.length) {
    const [r, c] = queue.shift();
    const moves = [[-1, 0, 'top'], [1, 0, 'bottom'], [0, -1, 'left'], [0, 1, 'right']];
    for (const [dr, dc, wall] of moves) {
      const nr = r + dr, nc = c + dc;
      if (
        nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
        !walls[r][c][wall] &&
        prev[nr][nc] === null
      ) {
        prev[nr][nc] = [r, c];
        if (nr === rows - 1 && nc === cols - 1) break outer;
        queue.push([nr, nc]);
      }
    }
  }

  // Trace back from exit to entrance
  const path = [];
  let cur = [rows - 1, cols - 1];
  while (cur[0] !== -1) {
    path.unshift(cur);
    cur = prev[cur[0]][cur[1]];
  }
  return path;
}

// Build an SVG string for the maze.
// solution: ordered [[r,c], ...] array, or null for no solution overlay.
function buildSVG(walls, rows, cols, solution) {
  const cs = rows <= 10 ? 42 : rows <= 15 ? 32 : 26; // cell size px
  const sw = 2;   // wall stroke width
  const o  = sw / 2; // offset so strokes don't clip at edges
  const W  = cols * cs + sw;
  const H  = rows * cs + sw;

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="maze-svg" data-size="${rows}" width="${W}" height="${H}">`);

  // ---- Solution path (drawn first, underneath walls) ----
  if (solution && solution.length) {
    // Extend line from above the entrance to below the exit
    const pts = [
      `${o + cs / 2},${o}`,
      ...solution.map(([r, c]) => `${o + c * cs + cs / 2},${o + r * cs + cs / 2}`),
      `${o + (cols - 1) * cs + cs / 2},${H - o}`
    ].join(' ');
    const pathW = Math.max(2, cs * 0.28);
    parts.push(`<polyline points="${pts}" stroke="#e03131" stroke-width="${pathW}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.55"/>`);
  }

  // ---- Walls ----
  // Draw each unique wall segment exactly once:
  //   top border  — top walls of row 0
  //   left border — left walls of col 0
  //   per cell    — right wall and bottom wall (covers all interior + right/bottom border)
  let d = '';

  for (let c = 0; c < cols; c++) {
    if (walls[0][c].top) {
      const x = o + c * cs;
      d += `M${x},${o}H${x + cs}`;
    }
  }

  for (let r = 0; r < rows; r++) {
    if (walls[r][0].left) {
      const y = o + r * cs;
      d += `M${o},${y}V${y + cs}`;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = o + c * cs;
      const y = o + r * cs;
      if (walls[r][c].right)  d += `M${x + cs},${y}V${y + cs}`;
      if (walls[r][c].bottom) d += `M${x},${y + cs}H${x + cs}`;
    }
  }

  parts.push(`<path d="${d}" stroke="#222" stroke-width="${sw}" stroke-linecap="square" fill="none"/>`);
  parts.push('</svg>');

  return parts.join('');
}

// Generate and render a new maze.
function render() {
  const n = parseInt(document.getElementById('size').value, 10);

  state.rows     = n;
  state.cols     = n;
  state.walls    = generateMaze(n, n);
  state.solution = solveMaze(state.walls, n, n);

  const label = n === 10 ? 'Small \u2014 10\xd710' : n === 15 ? 'Medium \u2014 15\xd715' : 'Large \u2014 20\xd720';
  document.getElementById('maze-subtitle').textContent = label;

  document.getElementById('maze-wrapper').innerHTML        = buildSVG(state.walls, n, n, null);
  document.getElementById('maze-answer-wrapper').innerHTML = buildSVG(state.walls, n, n, state.solution);

  document.getElementById('output').classList.remove('hidden');

  // Reset answer key toggle
  const check = document.getElementById('answer-key-check');
  check.checked = false;
  document.getElementById('maze-answer-key').classList.remove('show-on-print');
}

// ---- Event wiring ----
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('generate-btn').addEventListener('click', render);
  document.getElementById('regen-btn').addEventListener('click', render);
  document.getElementById('print-btn').addEventListener('click', () => window.print());
  document.getElementById('answer-key-check').addEventListener('change', function () {
    document.getElementById('maze-answer-key').classList.toggle('show-on-print', this.checked);
  });
});
