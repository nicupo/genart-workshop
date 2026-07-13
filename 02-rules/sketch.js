// Simple rule-based sketch: particles constrained by rules
let particles = [];

function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 200; i++) particles.push({ x: random(width), y: random(height) });
  noStroke();
}

function draw() {
  fill(10, 10);
  rect(0, 0, width, height);
  fill(200, 100, 150, 150);
  for (let p of particles) {
    // rule: move slightly toward center
    p.x += (width / 2 - p.x) * 0.005 + random(-1, 1);
    p.y += (height / 2 - p.y) * 0.005 + random(-1, 1);
    ellipse(p.x, p.y, 4);
  }
}
