// ============================================================
// CHAPTER 01 — RANDOMNESS — WORKSHOP VERSION
// Follow along live. Each STEP below starts commented out —
// uncomment it when we get there, don't jump ahead.
// (See sketch.js in this folder for the finished reference version.)
// ============================================================

// --- SEEDING --- (explained in STEP 3, declared here so it's ready)
let currentSeed = 42;

// --- CANVAS SETTINGS ---
let canvasWidth = 600;
let canvasHeight = 600;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // STEP 3 — uncomment both lines below when we get to seeding:
  // randomSeed(currentSeed);
  // noiseSeed(currentSeed);

  noStroke();
}

function draw() {
  background(17);

  // ============================================================
  // STEP 1 — ONE random value, no loop yet.
  // Uncomment these two lines first.
  // ============================================================
  // let singleRandomSize = random(20, 100);
  // ellipse(width / 2, height / 2, singleRandomSize, singleRandomSize);


  // ============================================================
  // STEP 2 — THE LOOP + random() per cell.
  // Uncomment this whole block once we've discussed Step 1's flicker
  // and are ready to fix it with a grid.
  // ============================================================
  // let numberOfColumns = 20;
  // let numberOfRows = 20;
  // let cellWidth = canvasWidth / numberOfColumns;
  // let cellHeight = canvasHeight / numberOfRows;
  //
  // for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
  //   for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
  //     let xPosition = columnIndex * cellWidth + cellWidth / 2;
  //     let yPosition = rowIndex * cellHeight + cellHeight / 2;
  //
  //     let randomSize = random(2, cellWidth * 0.9);
  //     ellipse(xPosition, yPosition, randomSize, randomSize);


  //     // ========================================================
  //     // STEP 4 — noise(), compared side by side with random().
  //     // Uncomment once Step 2 + Step 3 (seeding) are both running.
  //     // ========================================================
  //     // let noiseScale = 0.1;
  //     // let noiseValue = noise(columnIndex * noiseScale, rowIndex * noiseScale);
  //     // let noiseSize = noiseValue * cellWidth * 0.9;
  //     //
  //     // fill(255, 220);
  //     // ellipse(xPosition, yPosition, noiseSize, noiseSize);
  //     //
  //     // noFill();
  //     // stroke(255, 80);
  //     // ellipse(xPosition, yPosition, randomSize, randomSize);
  //     // noStroke();


  //     // ========================================================
  //     // STEP 5 — the conditional (if/else).
  //     // Uncomment last, after noise() is running.
  //     // ========================================================
  //     // if (noiseValue > 0.6) {
  //     //   fill(255, 60, 60);
  //     //   rectMode(CENTER);
  //     //   rect(xPosition, yPosition, 4, 4);
  //     // }
  //   }
  // }
}

// ============================================================
// TRY THIS (after Step 5 is running):
// 1. Change currentSeed — confirm the pattern returns when you
//    set it back to 42.
// 2. Comment out the noise circles, keep only random — notice
//    the static-like look.
// 3. Change noiseScale from 0.1 to 0.02.
// 4. Change the 0.6 threshold and watch the red squares respond.
// 5. BONUS — add frameCount as a third argument to noise() to
//    bring back yesterday's "time" ingredient.
// ============================================================
