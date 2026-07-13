function setup(){
  createCanvas(640,360);
  background(20);
}

function draw(){
  // draw fading background
  fill(0, 20);
  rect(0,0,width,height);
}

function mouseMoved(){
  noStroke();
  fill(200,100,50,180);
  ellipse(mouseX, mouseY, 20);
}
