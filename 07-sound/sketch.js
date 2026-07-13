// Simple audio-reactive placeholder. Users may need to enable audio in browser.
let osc;
function setup(){
  createCanvas(640,360);
  background(20);
  // keep audio optional / commented for class; instructor can enable
  // osc = new p5.Oscillator('sine'); osc.start(); osc.amp(0);
}

function draw(){
  fill(255);
  textAlign(CENTER, CENTER);
  text('Enable audio in code if desired', width/2, height/2);
}
