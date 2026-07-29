// ============================================================
// SIMPLE Conway's Game of Life, minimal version
// Goal: the simplest possible cellular automaton — a grid of
// cells, one rule, applied to every cell, every frame. Press
// SPACE to re-randomize the starting grid and watch a fresh
// pattern emerge from the exact same rule.
// ============================================================

let columns = 60;
let rows = 60;
let cellSize = 10;

// The grid is a 2D array: grid[x][y] is either 1 (alive) or 0 (dead).
let grid;

function setup() {
  createCanvas(columns * cellSize, rows * cellSize);
  grid = makeRandomGrid();
}

// --------------------------------------------------------------
// Builds a brand new grid where each cell has roughly a 1-in-5
// chance of starting alive. random() < 0.2 is true about 20% of
// the time — the "?" / ":" here is shorthand for an if/else that
// fits on one line: "if true, use 1, otherwise use 0."
// --------------------------------------------------------------
function makeRandomGrid() {
  let newGrid = [];
  for (let x = 0; x < columns; x++) {
    newGrid[x] = [];
    for (let y = 0; y < rows; y++) {
      newGrid[x][y] = random() < 0.2 ? 1 : 0;
    }
  }
  return newGrid;
}

// --------------------------------------------------------------
// Counts how many of a cell's 8 surrounding neighbors are alive.
// We loop dx and dy from -1 to 1 (a 3x3 area centered on x,y),
// skip the cell itself, and wrap around the edges with % so the
// grid behaves like it loops (no dead zone at the borders).
// --------------------------------------------------------------
function countLivingNeighbors(x, y) {
  let total = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue; // skip counting the cell itself
      let neighborX = (x + dx + columns) % columns; // wrap left/right
      let neighborY = (y + dy + rows) % rows;         // wrap top/bottom
      total += grid[neighborX][neighborY];
    }
  }
  return total;
}

function draw() {
  background(17);

  // We calculate the ENTIRE next grid before changing anything,
  // then swap it in all at once. If we updated `grid` in place
  // while still reading from it, cells would see a mix of old and
  // new neighbors within the same frame — the rule needs everyone
  // looking at the SAME snapshot in time.
  let nextGrid = [];

  for (let x = 0; x < columns; x++) {
    nextGrid[x] = [];
    for (let y = 0; y < rows; y++) {
      let livingNeighbors = countLivingNeighbors(x, y);
      let isAlive = grid[x][y] === 1;

      // ------------------------------------------------------
      // THE RULE — the entire "personality" of Game of Life:
      //   - a living cell with 2 or 3 living neighbors survives
      //   - a dead cell with exactly 3 living neighbors is born
      //   - every other cell dies or stays empty
      // Same "if this, then that" idea as Hours 1-2, just applied
      // to a neighbor count instead of a single value.
      // ------------------------------------------------------
      if (isAlive && (livingNeighbors === 2 || livingNeighbors === 3)) {
        nextGrid[x][y] = 1; // survives
      } else if (!isAlive && livingNeighbors === 3) {
        nextGrid[x][y] = 1; // born
      } else {
        nextGrid[x][y] = 0; // dies or stays empty
      }

      // Draw the CURRENT state (not next) so what you see always
      // matches what was just used to calculate this frame's rules.
      if (grid[x][y] === 1) {
        fill(255);
        noStroke();
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }

  grid = nextGrid; // move to the next generation
}

// Press SPACE to throw away the current grid and start fresh with
// a brand new random one — same rule, different starting condition,
// often a very different outcome (dies out fast vs. settles into
// stable, repeating shapes).
function keyPressed() {
  if (key === ' ') {
    grid = makeRandomGrid();
  }
}

// ============================================================
// TRY THIS:
// 1. Press space 5-6 times in a row. Notice how differently each
//    run plays out even though the rule never changes.
// 2. Change the 0.2 in makeRandomGrid() to 0.5 — denser starting
//    grid. Does it survive longer or die out faster?
// 3. Change cellSize to 5 for a much finer, higher-resolution grid
//    (will run a bit slower).
// ============================================================