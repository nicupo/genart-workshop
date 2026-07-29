// ============================================================
// CHAPTER 01 — RANDOMNESS
//
// Follow the steps in the workshop.
// Each step reveals another way a system can use randomness.
//
// Concepts:
// - random()
// - loops
// - grids
// - seeds
// - noise()
// - thresholds
//
// Core pattern:
//
// location → value → drawing
//
// This pattern appears everywhere in generative systems.
// ============================================================


// ============================================================
// SETTINGS
// ============================================================

let seed = 42;

let columns = 20;
let rows = 20;

let noiseScale = 0.12;


// ============================================================
// setup()
// Runs once.
// ============================================================

function setup() {

  createCanvas(600, 600);

  noStroke();


  // STEP 3 — uncomment when we discuss seeds
  //
  // randomSeed(seed);
  // noiseSeed(seed);

}



// ============================================================
// draw()
// Runs continuously.
// ============================================================

function draw() {


  background(17);



  // ==========================================================
  // STEP 1 — ONE RANDOM VALUE
  //
  // Purpose:
  // See what uncontrolled randomness looks like.
  //
  // Uncomment these two lines first.
  // ==========================================================


  // let size = random(20, 150);
  // ellipse(width / 2, height / 2, size, size);



  // ==========================================================
  // STEP 2 — RANDOM VALUES ON A GRID
  //
  // Instead of one object:
  // visit many locations and give each one a value.
  //
  // Uncomment this block after Step 1.
  // ==========================================================


  /*
  let cellWidth = width / columns;
  let cellHeight = height / rows;


  for (let x = 0; x < columns; x++) {

    for (let y = 0; y < rows; y++) {


      let centerX =
        x * cellWidth + cellWidth / 2;

      let centerY =
        y * cellHeight + cellHeight / 2;



      let size = random(2, cellWidth * 0.9);


      ellipse(
        centerX,
        centerY,
        size,
        size
      );


    }

  }
  */



  // ==========================================================
  // STEP 4 — NOISE()
  //
  // Replace the random size above with noise.
  //
  // Uncomment the block below after Step 3.
  // Compare random() and noise().
  // ==========================================================


  /*
  let cellWidth = width / columns;
  let cellHeight = height / rows;


  for (let x = 0; x < columns; x++) {

    for (let y = 0; y < rows; y++) {


      let centerX =
        x * cellWidth + cellWidth / 2;

      let centerY =
        y * cellHeight + cellHeight / 2;



      let value = noise(
        x * noiseScale,
        y * noiseScale
      );


      let size = value * cellWidth;


      ellipse(
        centerX,
        centerY,
        size,
        size
      );


    }

  }
  */



  // ==========================================================
  // STEP 5 — VALUE BECOMES A DECISION
  //
  // Randomness creates information.
  // The system decides what to do.
  //
  // This is the bridge to cellular automata.
  // ==========================================================


  /*
  let cellWidth = width / columns;
  let cellHeight = height / rows;


  for (let x = 0; x < columns; x++) {

    for (let y = 0; y < rows; y++) {


      let centerX =
        x * cellWidth + cellWidth / 2;

      let centerY =
        y * cellHeight + cellHeight / 2;


      let value = noise(
        x * noiseScale,
        y * noiseScale
      );


      if (value > 0.6) {


        fill(255);

        rectMode(CENTER);

        rect(
          centerX,
          centerY,
          5,
          5
        );


      }


    }

  }
  */


}



// ============================================================
// SAVE ARTWORK
//
// Press S to export the current canvas.
// ============================================================

function keyPressed() {

  if (key === "s") {

    saveCanvas(
      "randomness-artwork",
      "png"
    );

  }

}



// ============================================================
// OTHER POSSIBLE EXPERIMENTS
//
// 1. Change seed.
// 2. Change noiseScale.
// 3. Change threshold.
// 4. Add frameCount to noise:
//
//    noise(
//      x * noiseScale,
//      y * noiseScale,
//      frameCount * 0.01
//    )
//
// This brings TIME back into randomness.
//
// ============================================================