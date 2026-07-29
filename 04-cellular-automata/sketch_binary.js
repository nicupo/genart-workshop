/*
==============================================================================
ELEMENTARY CELLULAR AUTOMATON
==============================================================================

This is one of the simplest generative systems possible.

A world made of cells:
□ □ ■ □ ■ ■ □ ...
OR
0 1 1 0 0 1 0 1 ...

Each cell can only be:
0 = OFF
1 = ON

Unlike Game of Life, this automaton is ONE-DIMENSIONAL:
Each new row is created from the row above.

Every cell looks only at:

LEFT   CENTER   RIGHT
  1       0        1

That 3-cell pattern becomes a number from 0 to 7:

111 -> 7
110 -> 6
101 -> 5
100 -> 4
011 -> 3
010 -> 2
001 -> 1
000 -> 0

The RULE number tells us what happens next.

Example:
Rule 30 = 00011110

This means:

111 -> 0
110 -> 0
101 -> 0
100 -> 1
011 -> 1
010 -> 1
001 -> 1
000 -> 0

Simple rules.
Complex patterns.

Controls:
SPACE = randomize first row

Optional:
Uncomment randomizeRule() in keyPressed()
to explore all 256 possible universes.
==============================================================================
*/


// -----------------------------------------------------------------------------
// SETTINGS
// -----------------------------------------------------------------------------

let cellSize = 8;
let cols;
let rows;

let grid = [];

// Rule number (0-255)
// Try: 30, 90, 110, 184
let rule = 30;


// -----------------------------------------------------------------------------
// SETUP
// -----------------------------------------------------------------------------

function setup() {

  createCanvas(400, 400);

  cols = floor(width / cellSize);
  rows = floor(height / cellSize);

  generate();
}


// -----------------------------------------------------------------------------
// GENERATE ENTIRE AUTOMATON
// -----------------------------------------------------------------------------

function generate() {

  // Clear previous grid
  grid = [];

  // Create first row
  let firstRow = createRandomRow();

  // Add first row
  grid.push(firstRow);

  // Generate all rows
  for (let y = 1; y < rows; y++) {

    let previousRow = grid[y - 1];
    let newRow = [];

    for (let x = 0; x < cols; x++) {

      // Wrap around edges
      let left   = previousRow[(x - 1 + cols) % cols];
      let center = previousRow[x];
      let right  = previousRow[(x + 1) % cols];

      // Determine next state
      let next = applyRule(left, center, right);

      newRow.push(next);
    }

    grid.push(newRow);
  }
}


// -----------------------------------------------------------------------------
// DRAW
// -----------------------------------------------------------------------------

function draw() {

  background(20);

  for (let y = 0; y < rows; y++) {

    for (let x = 0; x < cols; x++) {

      if (grid[y][x] == 1) {
        fill(255);
      } else {
        fill(40);
      }

      square(
        x * cellSize,
        y * cellSize,
        cellSize
      );
    }
  }

  fill(255);
  textSize(14);
  text("Rule: " + rule, 10, 20);
}


// -----------------------------------------------------------------------------
// APPLY RULE
// -----------------------------------------------------------------------------

function applyRule(left, center, right) {

  /*
  Convert:

  left center right

  Example:
  1 0 1

  Into binary:
  101

  Which equals:
  5
  */

  let pattern =
      (left << 2) |
      (center << 1) |
      right;

  /*
  The rule number is also binary.

  Example:
  Rule 30:

  00011110

  We extract the correct bit.
  */

  return (rule >> pattern) & 1;
}


// -----------------------------------------------------------------------------
// RANDOM FIRST ROW
// -----------------------------------------------------------------------------

function createRandomRow() {

  let row = [];

  for (let i = 0; i < cols; i++) {

    // 50% chance
    row.push(random() < 0.5 ? 1 : 0);
  }

  return row;
}


// -----------------------------------------------------------------------------
// OPTIONAL: RANDOM RULE
// -----------------------------------------------------------------------------

function randomizeRule() {

  rule = floor(random(256));

  console.log("Rule:", rule);
}


// -----------------------------------------------------------------------------
// CONTROLS
// -----------------------------------------------------------------------------

function keyPressed() {

  if (key === ' ') {

    // Randomize initial row
    generate();

    // OPTIONAL:
    // Uncomment to explore all 256 universes

    // randomizeRule();
    // generate();
  }
}