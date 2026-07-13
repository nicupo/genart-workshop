// Placeholder: a very small reaction-diffusion would exceed lesson scope.
// This sketch provides a simple diffusion-like blur as a starting point.
let gfx;
function setup(){
  createCanvas(640,360);
  gfx = createGraphics(width, height);
  gfx.background(30);
}

function draw(){
  gfx.noStroke();
  gfx.fill(random(255), random(255), random(255), 20);
  gfx.ellipse(random(width), random(height), random(2,30));
  image(gfx, 0,0);
}
