// ============================================================
    // CHAPTER 00 — p5.js ESSENTIALS
    // Goal: understand setup(), draw(), the coordinate system,
    // basic shapes, variables, and how frameCount drives animation.
    // ============================================================

    // --- CANVAS SETTINGS ---
    // We keep these as named variables instead of typing raw numbers
    // everywhere. This makes the sketch easier to read and easier
    // to change later.
    let canvasWidth = 600;
    let canvasHeight = 600;

    // --- THE SHAPE WE ARE ANIMATING ---
    // This is our one "breathing" circle. We store its properties
    // as variables so draw() can update them every frame.
    let circleXPosition;
    let circleYPosition;
    let circleBaseSize = 100;
    let circleCurrentSize;

    // ============================================================
    // setup() runs ONCE, at the very start.
    // This is where we prepare things: create the canvas,
    // set initial values, set colors that do not change every frame.
    // ============================================================
    function setup() {
      createCanvas(canvasWidth, canvasHeight);

      // IMPORTANT — THE COORDINATE SYSTEM:
      // In p5.js, (0, 0) is the TOP-LEFT corner of the canvas.
      // x increases to the RIGHT.
      // y increases DOWNWARD (this is the opposite of school-math graphs).
      // So a point at (canvasWidth / 2, canvasHeight / 2) is the
      // exact center of the canvas.
      circleXPosition = canvasWidth / 2;
      circleYPosition = canvasHeight / 2;

      // We do NOT set the fill color here permanently, because we
      // want to demonstrate changing it inside draw(). But if a
      // color never changed, setup() is exactly where you'd put it.
    }

    // ============================================================
    // draw() runs OVER AND OVER, many times per second (60 by default).
    // This loop IS the animation. Anything that should move, pulse,
    // or change over time gets calculated in here.
    // ============================================================
    function draw() {
      // background() is called every frame to erase the previous
      // frame. If you remove this line, shapes will "trail" because
      // the canvas never clears.
      // background(17); // a dark grey, close to the page background

      // --- FRAMECOUNT: p5's built-in animation clock ---
      // frameCount counts upward automatically: 0, 1, 2, 3, ...
      // one tick per drawn frame. We can feed it into a sine wave
      // to get smooth back-and-forth motion instead of a straight
      // increasing line.
      //
      // sin() naturally oscillates between -1 and 1.
      // We multiply it by how much size variation we want (50 pixels),
      // then add it to the base size, so the circle grows and shrinks
      // smoothly forever.
      let oscillation = sin(frameCount * 0.05); // -1 to 1, smooth wave
      let sizeVariation = oscillation * 50;      // -50 to 50
      circleCurrentSize = circleBaseSize + sizeVariation;

      // --- COLOR ALSO DRIVEN BY A VARIABLE ---
      // We map the same oscillation (-1 to 1) to a hue range (0-255
      // in p5's default color mode) so the color shifts as it breathes.
      let hueValue = map(oscillation, -1, 1, 0, 255);
      colorMode(HSB, 255);
      fill(hueValue, 200, 255);
      noStroke();

      // --- DRAWING THE SHAPE ---
      // ellipse(x, y, width, height) draws a circle when width = height.
      // Everything here is driven by variables we calculated above —
      // no "magic numbers" buried inside the draw call.
      ellipse(circleXPosition, circleYPosition, circleCurrentSize, circleCurrentSize);
    }

    // ============================================================
    // TRY THIS (in-workshop exercises):
    // 1. Change circleBaseSize to 200. What happens?
    // 2. Change the 0.05 inside sin(frameCount * 0.05) to 0.2.
    //    Notice this controls SPEED, not size.
    // 3. Add a second circle with its own x/y variables, offset
    //    from the first, using its own oscillation.
    // 4. Try mouseX and mouseY instead of frameCount — move the
    //    circle's position with the mouse instead of animating it
    //    automatically. This is the bridge to Chapter 01.
    // ============================================================