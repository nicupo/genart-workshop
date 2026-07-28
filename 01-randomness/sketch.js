// ============================================================
// CHAPTER 01 — RANDOMNESS
// Goal: understand random() vs noise(), build up from one value
// to a whole field, and learn how seeding makes randomness
// REPLICABLE — same seed, same result, every run.
// ============================================================

// --- SEEDING ---
// Normally, random() and noise() give you a different result every
// time you run the sketch. That's usually what you want — but
// sometimes you find a result you LOVE and want to get back to it,
// or you're debugging and need the exact same "random" behavior
// twice in a row. That's what a seed is for: a starting number that
// makes the randomness deterministic and repeatable.
let currentSeed = 42;

// --- CANVAS SETTINGS ---
let canvasWidth = 600;
let canvasHeight = 600;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // Both random() and noise() have their OWN separate seed functions.
  // Calling these means: every time you press play with currentSeed
  // set to 42, you get the exact same pattern. Change it to 7, you
  // get a different pattern — but ALWAYS the same one for 7.
  randomSeed(currentSeed);
  noiseSeed(currentSeed);

  noStroke();
}

function draw() {
  background(17);

  // ============================================================
  // STEP 1 (reference only — this is the simplest possible use of
  // random(), before we put it in a loop). One value, one shape:
  //
  //   let singleRandomSize = random(20, 100);
  //   ellipse(width / 2, height / 2, singleRandomSize, singleRandomSize);
  //
  // Notice: every SINGLE FRAME would get a brand new random size,
  // which is why this alone just looks like flickering noise if you
  // run it — draw() runs 60 times a second, calling random() every
  // time. We'll fix that shortly by tying values to POSITION instead
  // of just calling random() blindly every frame.
  // ============================================================

  // --- GRID SETTINGS ---
  // Instead of one shape, we draw many — one per cell in a grid.
  let numberOfColumns = 20;
  let numberOfRows = 20;
  let cellWidth = canvasWidth / numberOfColumns;
  let cellHeight = canvasHeight / numberOfRows;

  // ============================================================
  // STEP 2 — THE LOOP
  // A "for loop" means: repeat this block of code a set number of
  // times, changing one counter each time.
  //   for (let i = 0; i < 20; i++) { ... }
  // reads as: "start i at 0, keep going while i is less than 20,
  // add 1 to i after each round." We nest TWO of these — one for
  // columns, one for rows — so we visit every cell in the grid,
  // left to right, top to bottom.
  // ============================================================
  for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {

      // Center of this particular cell.
      let xPosition = columnIndex * cellWidth + cellWidth / 2;
      let yPosition = rowIndex * cellHeight + cellHeight / 2;

      // --------------------------------------------------------
      // random() — UNPREDICTABLE. Every call is independent of
      // every other call. No relationship between neighbors, even
      // though we're calling it once per cell instead of once per
      // frame now — this fixes the "flicker" from Step 1, but the
      // VALUES themselves still have zero relationship to each other.
      // --------------------------------------------------------
      let randomSize = random(2, cellWidth * 0.9);

      // --------------------------------------------------------
      // noise() — SMOOTH. Nearby inputs produce nearby outputs.
      // We feed it the cell's position (scaled down) so cells near
      // each other in space get similar values. This is why noise
      // looks organic and random() looks like static.
      // --------------------------------------------------------
      let noiseScale = 0.1; // smaller = smoother/larger patterns
      let noiseValue = noise(columnIndex * noiseScale, rowIndex * noiseScale);
      let noiseSize = noiseValue * cellWidth * 0.9;

      // Draw the noise version filled, the random version as an
      // outline only, so you can compare both in the same frame.
      fill(255, 220);
      ellipse(xPosition, yPosition, noiseSize, noiseSize);

      noFill();
      stroke(255, 80);
      ellipse(xPosition, yPosition, randomSize, randomSize);
      noStroke();

      // ========================================================
      // STEP 3 — A SIMPLE CONDITIONAL
      // "if / else" means: check something, then do ONE of two
      // things depending on whether it's true or false. Here: if
      // this cell's noise value is high enough, mark it with a
      // small square on top — otherwise, leave it alone.
      // This isn't the "rule" ingredient from Hour 1 (no formula
      // translating one changing value into another over time) —
      // it's a simpler, one-time yes/no branch. Same family of
      // idea, much smaller scale.
      // ========================================================
      if (noiseValue > 0.6) {
        fill(255, 60, 60);
        rectMode(CENTER);
        rect(xPosition, yPosition, 4, 4);
      }
    }
  }
}

// ============================================================
// TRY THIS:
// 1. Change currentSeed from 42 to any other number. Run it —
//    different pattern. Change it BACK to 42 — same pattern as
//    before. That's replicability.
// 2. Comment out the noise() circles, leave only random(). Notice
//    the static-like look — no relationship between neighbors.
// 3. Comment out the random() circles, leave only noise(). Notice
//    the smooth, organic clustering.
// 4. Change noiseScale from 0.1 to 0.02 — what changes about the
//    pattern's grain?
// 5. Change the 0.6 threshold in the if-statement to 0.3 or 0.8 —
//    watch how many red squares appear change.
// 6. BONUS (brings back an ingredient from Hour 1 — time): add
//    frameCount into the noise() call as a third argument —
//      noise(columnIndex * noiseScale, rowIndex * noiseScale, frameCount * 0.01)
//    Now the field drifts smoothly over time instead of sitting still.
// ============================================================