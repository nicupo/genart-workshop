// Minimal emergent behavior: boids-lite
let agents = [];

function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 80; i++) agents.push(createVector(random(width), random(height)));
}

function draw() {
  background(20);
  fill(200);
  noStroke();
  for (let a of agents) {
    // simple local interaction: small random move + stay within bounds
    a.add(p5.Vector.random2D().mult(0.8));
    a.x = (a.x + width) % width;
    a.y = (a.y + height) % height;
    ellipse(a.x, a.y, 4);
  }
}
