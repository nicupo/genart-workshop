// ============================================================
// CHAPTER 00 — p5.js ESSENTIALS
//
// The first encounter with p5.js.
//
// We build one small system:
// a circle whose behavior changes over time.
//
// Concepts introduced:
// - canvas
// - setup()
// - draw()
// - coordinates
// - variables
// - shapes
// - time
// - rules
// - interaction
//
// Later chapters will replace this simple circle with more
// complex systems.
// ============================================================


// ============================================================
// CANVAS SETTINGS
// ============================================================
//
// createCanvas() creates our digital drawing surface.
//
// Everything we create exists inside this rectangle.
//
// Coordinates:
//
// (0,0) ------------------> x
//   |
//   |
//   |
//   v
//   y
//
// x increases to the right.
// y increases downward.
//
// ============================================================

let canvasWidth = 600;
let canvasHeight = 600;


// ============================================================
// SYSTEM VARIABLES
// ============================================================
//
// These variables describe our object.
//
// A variable is a named value that can change.
//
// Instead of:
//
// ellipse(300,300,100,100)
//
// we write:
//
// ellipse(circleX, circleY, circleSize, circleSize)
//
// because named things are easier to control.
// ============================================================

let circleX;
let circleY;

let circleSize = 100;


// ============================================================
// setup()
// ============================================================
//
// Runs ONCE when the sketch starts.
//
// Use it to prepare the system.
//
// ============================================================

function setup() {

  createCanvas(canvasWidth, canvasHeight);


  // p5 gives us width and height automatically
  // after createCanvas().
  //
  // Place the circle in the center.

  circleX = width / 2;
  circleY = height / 2;

}



// ============================================================
// draw()
// ============================================================
//
// Runs repeatedly.
//
// This loop is the engine of the sketch.
//
// Every frame:
// 1. clear the canvas
// 2. calculate new values
// 3. draw the result
//
// ============================================================

function draw() {


  background(17);



  // ==========================================================
  // FIRST SYSTEM:
  // STATIC OBJECT
  // ==========================================================
  //
  // Uncomment this first.
  //
  // ellipse(circleX, circleY, circleSize, circleSize);



  // ==========================================================
  // TIME
  // ==========================================================
  //
  // frameCount is p5's internal clock.
  //
  // It increases automatically:
  //
  // 0, 1, 2, 3, 4...
  //
  // Uncomment:
  //
  // circleX = frameCount;
  //
  // The circle now moves because time changes a value.
  //
  // INGREDIENT:
  // TIME
  //
  // ==========================================================



  // ==========================================================
  // RULE
  // ==========================================================
  //
  // A rule is a relationship:
  //
  // "When this value changes,
  //  this other value changes."
  //
  // Same input -> same output.
  //
  // Uncomment:
  //
  // circleSize = 100 + frameCount * 0.1;
  //
  // Now time controls size instead of position.
  //
  // INGREDIENT:
  // RULE
  //
  // ==========================================================



  // ==========================================================
  // DRAW THE OBJECT
  // ==========================================================

  noStroke();
  fill(200, 100, 255);

  ellipse(
    circleX,
    circleY,
    circleSize,
    circleSize
  );


}



// ============================================================
// INTERACTION
// ============================================================
//
// Replace:
//
// circleX = frameCount;
//
// with:
//
// circleX = mouseX;
//
//
// Now the system responds to you.
//
// The source of change moved from:
// internal clock -> external input
//
// INGREDIENT:
// INTERACTION
//
// ============================================================



// ============================================================
// OPTIONAL TOOLBOX
// ============================================================
//
// These are not part of the first 30 minutes.
// They are here because you will use them later.
//
// ============================================================



// ----------------------------
// OTHER SHAPES
// ----------------------------
//
// ellipse(x, y, width, height)
//
// rect(x, y, width, height)
//
// line(x1, y1, x2, y2)
//
// triangle(x1,y1, x2,y2, x3,y3)
//
// point(x,y)
//
//
//
// ----------------------------
// COLORS
// ----------------------------
//
// fill(r,g,b)
//
// stroke(r,g,b)
//
// noFill()
//
// noStroke()
//
// strokeWeight(size)
//
//
//
// ----------------------------
// RANDOMNESS
// ----------------------------
//
// random(min,max)
//
// Example:
//
// let x = random(width);
//
//
//
// ----------------------------
// MATH
// ----------------------------
//
// sin() creates smooth repeating movement.
//
// Example:
//
// let pulse = sin(frameCount * 0.05);
//
//
// map() converts one range into another.
//
// Example:
//
// let size = map(mouseX,0,width,10,200);
//
//
//
// ----------------------------
// ARRAYS
// ----------------------------
//
// Arrays allow many objects.
//
// Example:
//
// let particles = [];
//
//
//
// ----------------------------
// FUNCTIONS
// ----------------------------
//
// Functions allow us to create behaviors.
//
// Example:
//
// function createParticle() {
//
// }
//
// ============================================================



// ============================================================
// EXPORT
// ============================================================
//
// Press S to save your current artwork.
//
// ============================================================

function keyPressed() {

  if (key === "s") {

    saveCanvas(
      "my-artwork",
      "png"
    );

  }

}