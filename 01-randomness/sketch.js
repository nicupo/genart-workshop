function setup() {
  createCanvas(640, 360);
  background(20);
  noStroke();
}

function draw() {
  fill(random(255), random(255), random(255), 100);
  ellipse(random(width), random(height), random(5, 80));
}
