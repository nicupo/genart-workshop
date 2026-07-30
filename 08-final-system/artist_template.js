// ============================================================
// ARTIST ARTWORK — TEMPLATE
//
// Welcome.
//
// This file is your personal artwork.
//
// Everything inside this file is yours.
//
// You can:
// - change it
// - delete it
// - replace it completely
//
// The examples below are only starting points.
// You are NOT expected to use all of them.
//
// Start simple.
// Build one rule.
// See where it leads.
//
// Think in systems, not individual shapes.
// Shapes are only the material.
// The interesting part is the rule that controls them.
//
// The goal is not to draw more.
// The goal is to create a rule that can produce change.
//
// Theme:
//
// GROWTH
// (or ALIVE, if that speaks more to you)
//
// ============================================================



// ============================================================
// YOUR CANVAS
// ============================================================
//
// g is your personal canvas.
//
// It behaves exactly like the normal p5 canvas.
//
// The only difference:
//
// background()  → g.background()
// fill()        → g.fill()
// stroke()      → g.stroke()
// ellipse()     → g.ellipse()
// circle()      → g.circle()
// rect()        → g.rect()
// line()        → g.line()
// random()      → g.random()
// noise()       → g.noise()
// sin()         → g.sin()
// cos()         → g.cos()
//
// Your own variables DO NOT use g:
//
// let count = 20;
// let angle = 0;
//
// Everything your system generates on g becomes your contribution
// to the collective artwork.
//
// ============================================================



// ============================================================
// ARTIST REGISTRATION
//
// Change:
//
// - your name
// - your artwork title
// - the function name drawArtwork_yourname — this exact name
//   shows up in THREE places in this file, and all three need
//   to match whatever you rename it to:
//     1. in the registration just below (the draw: drawArtwork_yourname line)
//     2. where it's defined (the "YOUR ARTWORK" section below)
//     3. in the preview call near the very bottom of this file
//
// Once you're done and ready to send this back: rename THIS
// FILE from artist_template.js to artist_<yourname>.js. Do this
// LAST, right before sending — if you rename it earlier, your
// own index.html here won't find it anymore (it looks for
// artist_template.js by name). Since you're only sending this
// one file back, not your whole folder, that's fine once you're
// finished.
//
// ============================================================

if (typeof ARTISTS !== "undefined") {
  // Below is your real registration — fill in your actual name,
  // a title, and the renamed function below. It won't do anything
  // while you're working here (no ARTISTS registry exists in this
  // standalone folder, so it just skips itself) — but leave it
  // filled in. When this file is copied into the real collective
  // piece, THIS is what registers your work. Nothing to add later.
  ARTISTS.push({
    name: "yourname",
    title: "Untitled",
    draw: drawArtwork_yourname
  });
}

// example:
//
// If your name is alice:
//
// ARTISTS.push({
//   name: "alice",
//   title: "In wonderland",
//   draw: drawArtwork_alice
// });

// function drawArtwork_alice(g, t, w, h) {
//    ...
// }
//

// ============================================================
// YOUR ARTWORK
// ============================================================
function drawArtwork_yourname(g, t, w, h) {
  // Inputs:
  // g = your personal drawing space
  // t = shared animation time
  // w = width of your drawing space
  // h = height of your drawing space

  
// ------------------------------------------------------------
// BACKGROUND
//
// background() is called every frame.
//
// A normal background clears previous frames:
//
g.background(255);  // white
// g.background(0);    // black
//
// Transparent backgrounds create trails:
//
// g.background(255, 20); // white with alpha
//
// Try changing this value.
// Small values preserve memory of previous frames.
//
// ------------------------------------------------------------



  // ------------------------------------------------------------
  // VARIABLES
  //
  // Systems often become interesting when only a few
  // numbers change.
  //
  // Try changing these.
  //
  // ------------------------------------------------------------

  let count = 20;
  let spacing = 30;


// ------------------------------------------------------------
// COLOR
//
// Color can also be controlled by a system.
//
// Smooth change:
//
// let c = g.noise(t) * 255;
//
// Random variation:
//
// let c = g.random(255);
//
// Try linking color to:
// - time
// - position
// - repetition
// - movement
//
// ------------------------------------------------------------

  let c = g.noise(t * 0.2) * 255;


  // ------------------------------------------------------------
  // BASIC SHAPES
  //
  // Replace these.
  // Combine them.
  // Make rules.
  //
  // ------------------------------------------------------------

  for (let i = 0; i < 10; i++) {

  let x = g.noise(i, t * 0.1) * (w/3);
  let y = g.noise(i + 100, t * 0.1) * h;
  let size = 30 + g.noise(i + 200, t * 0.2) * 80;

  g.stroke(0)
  // g.stroke(c/2);
  g.strokeWeight(4);
  g.noFill();
  g.rect(x, y, size, size);

}


    // Other primitives:
  //
  // Points and lines:
  //
  // g.point(x, y)              // single pixel
  // g.line(x1, y1, x2, y2)     // line between two points
  //
  // Basic shapes:
  //
  // g.circle(x, y, size)               // circle
  // g.ellipse(x, y, width, height)     // stretched circle
  // g.square(x, y, size)               // square
  // g.rect(x, y, width, height)        // rectangle
  //
  // Curves and custom shapes:
  //
  // g.arc()                    // part of a circle
  //
  // g.beginShape();
  // g.vertex(x, y);
  // g.vertex(x, y);
  // g.endShape();              // create your own shape
  
    
  // Shapes are just building blocks.
  // Combine simple things and create your own rules.


  // ------------------------------------------------------------
  // TIME
  //
  // t is the shared clock of the artwork.
  //
  // Everything can change over time:
  // position, size, color, structure.
  //
  // Try:
  //
  // g.sin(t)
  // g.cos(t)
  // g.noise(t)
  // g.noise(t * 0.2)
  // g.noise(t * 5)
  //
  // Slow.
  // Fast.
  // Smooth.
  //
  // ------------------------------------------------------------

  let size = 80 + g.noise(t * 0.5) * 180;

  g.noStroke();
  g.fill(0);
  g.circle(w / 3, h / 2, size);


  // ------------------------------------------------------------
  // RANDOMNESS
  //
  // Randomness creates variation.
  //
  // Try replacing:
  //
  // g.random(...)
  //
  // with:
  //
  // g.noise(...)
  //
  // Notice how different the movement feels.
  //
  // ------------------------------------------------------------


  // ------------------------------------------------------------
  // REPETITION
  //
  // Growth often comes from repetition.
  // Repetition alone may not be interesting.
  // Variation inside repetition creates life.
  // ------------------------------------------------------------

  for (let i = 0; i < count; i++) {

    let x = i * spacing;

    // g.circle(w-x, h * 0.75, 20);
    g.circle(w-x, h * 0.75, 10 + g.noise(i) * 50);


  }



// ------------------------------------------------------------
// GRID SYSTEMS
//
// A grid creates a space where simple rules
// can create complex behaviour.
//
// Later, grids can become:
// - cells
// - neighbourhoods
// - growth patterns
//
// ------------------------------------------------------------

  /*
  for (let y = 0; y < h; y += 40) {
    for (let x = 0; x < w; x += 40) {

      g.circle(x, y, 10);

    }
  }
  */



  // ------------------------------------------------------------
  // INTERACTION
  //
  // Your artwork can also react to the mouse.
  //
  // Try:
  //
  // g.mouseX
  // g.mouseY
  //
  // ------------------------------------------------------------



  // ------------------------------------------------------------
  // IF NOTHING APPEARS
  //
  // Check:
  //
  // - Did you use g. before drawing commands?
  // - Did you call g.background()?
  // - Is your shape outside the canvas?
  // - Is your fill transparent?
  //
  // ------------------------------------------------------------



  // ------------------------------------------------------------
  // YOUR SYSTEM
  //
  // Delete everything above if you want. This template is only a starting point.
  //
  // If you already have an idea:
  // ignore this example and build your own system.
  //
  // Keep one idea.
  // Invent one rule.
  // Let the system surprise you.
  //
  // Questions:
  //
  // What grows?
  // What disappears?
  // What transforms?
  // What interacts?
  //
  // There is no correct solution.
  //
  // ------------------------------------------------------------

}


// ============================================================
// STANDALONE PREVIEW — nothing to touch below this line, EXCEPT:
// if you rename drawArtwork_yourname above, update the matching
// call in draw() below to the same new name, or your preview
// will break. It runs your function at full size, styled the
// same way the final collective piece will look, so what you
// see here while you build is what it'll look like on the day.
// Nothing here gets copied over — only your function above does.
// ============================================================

let previewT = 0;
let previewBuffer;

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("canvas-holder");
  previewBuffer = createGraphics(800, 800);
}

function draw() {
  previewT += 0.003;
  drawArtwork_yourname(previewBuffer, previewT, width, height);
  image(previewBuffer, 0, 0);
}