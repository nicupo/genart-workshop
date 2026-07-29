// ============================================================
// REACTION-DIFFUSION SKETCH — Gray-Scott model, minimal version
// Goal: simplest possible reaction-diffusion system. Two virtual
// chemicals (A and B) spread across a grid and react with each
// other. Feed rate, kill rate, and how fast each chemical spreads
// are all live-adjustable with the keyboard — small changes here
// produce completely different patterns.
// ============================================================

let gridSize = 100;

// Each chemical needs TWO grids: the current amounts, and a place
// to calculate next frame's amounts into. We can't update a cell
// in place while still reading its neighbors' CURRENT values —
// same reasoning as the CA sketch's nextGrid.
let chemicalA = [];
let chemicalB = [];
let nextA = [];
let nextB = [];

// --- KEYBOARD-CONTROLLED PARAMETERS ---
// These four numbers are the entire "personality" of the pattern.
// Nothing else in the code changes what it looks like — everything
// interesting comes from where these four numbers sit.
let feedRate = 0.055;    // how fast chemical A is replenished
let killRate = 0.062;    // how fast chemical B is removed
let diffusionA = 1.0;    // how fast chemical A spreads to neighbors
let diffusionB = 0.5;    // how fast chemical B spreads to neighbors

function setup() {
  // Each grid cell is drawn as a 4x4 pixel block, so the canvas is
  // 4x the grid's resolution — keeps the simulation grid small
  // (fast to compute) while still looking reasonably detailed.
  createCanvas(gridSize * 4, gridSize * 4);
  pixelDensity(1);

  for (let x = 0; x < gridSize; x++) {
    chemicalA[x] = [];
    chemicalB[x] = [];
    nextA[x] = [];
    nextB[x] = [];
    for (let y = 0; y < gridSize; y++) {
      chemicalA[x][y] = 1; // the grid starts "full" of chemical A
      // chemicalA[x][y] = random(); // the grid starts "full" of chemical A
      chemicalB[x][y] = 0; // and empty of chemical B
    }
  }

  // Seed a small square of chemical B in the center — without this,
  // there's nothing for the reaction to react to, and the grid
  // would just sit there, unchanging, forever.
  for (let x = gridSize / 2 - 5; x < gridSize / 2 + 5; x++) {
    for (let y = gridSize / 2 - 5; y < gridSize / 2 + 5; y++) {
      // chemicalB[x][y] = 1;
      chemicalB[x][y] = random();
    }
  }
}

// --------------------------------------------------------------
// The Laplacian is just a way of measuring "how different is this
// cell from the average of what's around it." A weighted average:
// the cell itself counts negatively, its 4 direct neighbors count
// more, its 4 diagonal neighbors count less. The result is what
// "diffusion" actually means mathematically: smoothing differences
// out, a little bit, every frame.
// --------------------------------------------------------------
function laplacianOf(chemicalGrid, x, y) {
  let sum = chemicalGrid[x][y] * -1;
  sum += chemicalGrid[(x + 1) % gridSize][y] * 0.2;
  sum += chemicalGrid[(x - 1 + gridSize) % gridSize][y] * 0.2;
  sum += chemicalGrid[x][(y + 1) % gridSize] * 0.2;
  sum += chemicalGrid[x][(y - 1 + gridSize) % gridSize] * 0.2;
  sum += chemicalGrid[(x + 1) % gridSize][(y + 1) % gridSize] * 0.05;
  sum += chemicalGrid[(x - 1 + gridSize) % gridSize][(y + 1) % gridSize] * 0.05;
  sum += chemicalGrid[(x + 1) % gridSize][(y - 1 + gridSize) % gridSize] * 0.05;
  sum += chemicalGrid[(x - 1 + gridSize) % gridSize][(y - 1 + gridSize) % gridSize] * 0.05;
  return sum;
}

function draw() {
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      let a = chemicalA[x][y];
      let b = chemicalB[x][y];

      // How much A gets consumed and turned into more B this frame.
      // Depends on BOTH chemicals being present — no B, no reaction.
      let reaction = a * b * b;

      // ------------------------------------------------------
      // THE RULE — same "if this, then that" spirit as everything
      // else this hour, just written as an ongoing formula instead
      // of a branch. Each chemical's next amount = its current
      // amount, plus diffusion smoothing it toward its neighbors,
      // plus/minus the reaction, plus/minus feed and kill rates.
      // ------------------------------------------------------
      nextA[x][y] = a + (diffusionA * laplacianOf(chemicalA, x, y) - reaction + feedRate * (1 - a));
      nextB[x][y] = b + (diffusionB * laplacianOf(chemicalB, x, y) + reaction - (killRate + feedRate) * b);
    }
  }

  // Swap: what we just calculated becomes "current" for next frame.
  [chemicalA, nextA] = [nextA, chemicalA];
  [chemicalB, nextB] = [nextB, chemicalB];

  // --- DRAWING ---
  // We draw brightness as (A minus B) — where B is high and A is
  // low, the cell goes dark; where A dominates, it stays bright.
  // That contrast is what makes the organic patterns visible.
  loadPixels();
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      let brightness = floor((chemicalA[x][y] - chemicalB[x][y]) * 255);
      brightness = constrain(brightness, 0, 255);

      // Each simulation cell is drawn as a 4x4 block of actual pixels.
      for (let px = 0; px < 4; px++) {
        for (let py = 0; py < 4; py++) {
          let index = 4 * (((y * 4 + py) * width) + (x * 4 + px));
          pixels[index] = brightness;     // red
          pixels[index + 1] = brightness; // green
          pixels[index + 2] = brightness; // blue
          pixels[index + 3] = 255;        // fully opaque
        }
      }
    }
  }
  updatePixels();
}

// ============================================================
// KEYBOARD CONTROLS — nudge the four parameters live and watch
// the pattern's entire personality change:
//   f / F  →  feed rate down / up
//   k / K  →  kill rate down / up
//   a / A  →  diffusion of A down / up
//   b / B  →  diffusion of B down / up
// Current values print to the console (View > Developer Tools)
// every time you press a key, so you can note down a combination
// you like.
// ============================================================
function keyPressed() {
  if (key === 'f') feedRate -= 0.001;
  if (key === 'F') feedRate += 0.001;
  if (key === 'k') killRate -= 0.001;
  if (key === 'K') killRate += 0.001;
  if (key === 'a') diffusionA -= 0.05;
  if (key === 'A') diffusionA += 0.05;
  if (key === 'b') diffusionB -= 0.05;
  if (key === 'B') diffusionB += 0.05;

  print('feed:', feedRate, 'kill:', killRate, 'dA:', diffusionA, 'dB:', diffusionB);
}

// ============================================================
// TRY THIS:
// 1. Let it run 10-15 seconds before touching anything — watch the
//    pattern grow out from the seeded square in the center.
// 2. Press F a few times, then K a few times. Find a feed/kill
//    combination that looks nothing like the default — note the
//    numbers down if you find one you like.
// 3. Try setting diffusionB much lower than diffusionA (or vice
//    versa) — this ratio is what decides whether you get spots,
//    stripes, or maze-like patterns.
// ============================================================