// ============================================================
// ELEMENTARY CELLULAR AUTOMATA — the simplest kind of CA there is
// ============================================================
// This sketch demonstrates one of the simplest generative systems ever invented.
// A cellular automaton is a system made of many simple cells.
//
// Picture a single row of cells, each one either off or on:
//
//   □ □ ■ □ ■ ■ □      or, the same thing:      0 1 1 0 0 1 0
//
// Every generation (step), each cell looks at itself and its two
// neighbors — left, center, right — and a RULE decides what that
// cell becomes next. The new row replaces the old one, and we
// draw each row one below the last, so the whole canvas becomes
// a visual history of every generation so far.
//
// The important idea: no cell knows the whole picture. No cell
// has a goal. No cell is trying to create a pattern. Whatever
// pattern appears is just what falls out of one tiny rule,
// applied identically, everywhere, over and over. That's
// emergence — complex, global behavior from simple, local rules.
//
// ------------------------------------------------------------
// THE RULE — "Rule 30"
// ------------------------------------------------------------
// A rule is just a list of answers — one for every possible
// 3-cell neighborhood. There are exactly 8 possible neighborhoods
// (each of the 3 cells is either 0 or 1, so 2×2×2 = 8):
//
//   neighborhood → next state
//   1 1 1        → 0
//   1 1 0        → 0
//   1 0 1        → 0
//   1 0 0        → 1
//   0 1 1        → 1
//   0 1 0        → 1
//   0 0 1        → 1
//   0 0 0        → 0
//
// That specific table is known as "Rule 30" — it produces a
// chaotic, organic-looking pattern despite being fully
// deterministic (the same starting row always produces the exact
// same result). Different tables = completely different worlds,
// using this exact same mechanism.
//
// ------------------------------------------------------------
// CONTROLS
// ------------------------------------------------------------
// SPACE — generates a new random starting row (same rule, new
// beginning). Uncomment randomizeRule() inside keyPressed() for a
// completely new rule too, not just a new starting row.
// ============================================================

let cellSize = 8;      // size of each cell on screen
let cells = [];         // the current generation
let nextCells = [];     // the generation we're calculating
let generation = 0;     // how many rows we've drawn so far

// The rule, written out as 8 explicit answers — one per possible
// neighborhood, in the order shown in the table above. This is
// "Rule 30": index 0 = "111", index 1 = "110", ... index 7 = "000".
let rule = [0, 0, 0, 1, 1, 1, 1, 0];

function setup() {
  createCanvas(400, 400);

  let numberOfCells = width / cellSize;

  // The first row starts RANDOM — every cell has a 50/50 chance
  // of being on or off. This is the "initial condition." Nothing
  // else about the pattern is decided yet — the rule takes it
  // from here.
  for (let i = 0; i < numberOfCells; i++) {
    cells[i] = floor(random(2)); // 0 or 1
    // Other ways to write the same thing:
    // cells[i] = random([0, 1]);
    // cells[i] = random() < 0.5 ? 1 : 0;
  }
}

function draw() {
  // We only ever draw ONE row per frame — the current generation.
  // Drawing one row at a time (instead of computing everything
  // instantly) is what makes the emergence visible as it happens.
  for (let i = 0; i < cells.length; i++) {
    fill(cells[i] === 1 ? 255 : 20);
    square(i * cellSize, generation * cellSize, cellSize);
    // rect(i * cellSize, generation * cellSize, cellSize, cellSize);
    // ellipse(i * cellSize, generation * cellSize, cellSize, cellSize);
  }

  createNextGeneration();
  generation++;

  // Stop once we've filled the canvas — otherwise we'd keep
  // calculating and drawing rows below where anyone can see them.
  if (generation * cellSize > height) {
    noLoop(); // stop the draw loop ()
    // generation = 0; // start over from the top of the canvas instead of stopping
  }
}

function createNextGeneration() {
  nextCells = [];

  for (let i = 0; i < cells.length; i++) {
    // Look at the three cells that decide this cell's future:
    // the one to its left, itself, and the one to its right.
    let left = cells[i - 1];
    let center = cells[i];
    let right = cells[i + 1];

    // The first and last cells are missing one neighbor (there's
    // nothing to their left, or nothing to their right). Simplest
    // option: just keep the edges off.
    if (i === 0 || i === cells.length - 1) {
      nextCells[i] = 0;
    } else {
      nextCells[i] = applyRule(left, center, right);
    }
  }

  cells = nextCells; // the new generation becomes the current one
}

function applyRule(left, center, right) {
  // Ask the rule table: "given exactly these three neighbors,
  // what should this cell become?" One line per possible
  // neighborhood, matching the table in the comment block above —
  // no hidden math, just a direct lookup, spelled out.*
  if (left === 1 && center === 1 && right === 1) return rule[0];
  if (left === 1 && center === 1 && right === 0) return rule[1];
  if (left === 1 && center === 0 && right === 1) return rule[2];
  if (left === 1 && center === 0 && right === 0) return rule[3];
  if (left === 0 && center === 1 && right === 1) return rule[4];
  if (left === 0 && center === 1 && right === 0) return rule[5];
  if (left === 0 && center === 0 && right === 1) return rule[6];
  if (left === 0 && center === 0 && right === 0) return rule[7];
}

function randomizeFirstGeneration() {
  // Same rule, brand new starting row — often a very different
  // result, even though nothing about the rule itself changed.
  for (let i = 0; i < cells.length; i++) {
    cells[i] = floor(random(2));
  }
  generation = 0;
  background(20);
  loop();
}

function randomizeRule() {
  // There are only 8 slots to fill — so a whole new "universe" is
  // just 8 random 0-or-1 decisions.
  for (let i = 0; i < 8; i++) {
    rule[i] = floor(random(2));
  }
}

function keyPressed() {
  if (key === ' ') {
    randomizeFirstGeneration();

    // Uncomment the line below for: new starting row AND new rule,
    // instead of just a new starting row with Rule 30 unchanged.
    // randomizeRule();
  }
}

// ============================================================
// NOTE — a more compact version of this rule exists.
//
// Because there are only 8 possible neighborhoods, the whole rule
// can be packed into a single number instead of an 8-item list.
// "Rule 30" is literally the number 30, written in binary:
//
//   pattern:   111  110  101  100  011  010  001  000
//   position:    7    6    5    4    3    2    1    0
//   answer:      0    0    0    1    1    1    1    0
//
// The pattern tells you which position to read. Worked example —
// left = 1, center = 0, right = 1, so the pattern is "101":
//
//   pattern = left * 4 + center * 2 + right;   // = 5
//   return (rule >> pattern) & 1;
//
// For rule = 30, pattern = 5:
//   00011110 >> 5  =  00000000
//   00000000 & 1   =  0
//
// Same answer as the if-statements above (rule[2], "101" → 0) —
// just reached by shifting bits instead of checking each case by
// hand. Shorter, but the explicit if-statements are easier to
// actually understand the first time you meet this idea. Get the
// concept first. Compress the code later.
// ============================================================
//"Quick note for the programmers in the room — the binary version 
// isn't just shorter, it's genuinely faster too: one bit-shift 
// instead of checking up to eight conditions in a row. 
// Doesn't matter at this grid size, but it's real, not just a style preference."