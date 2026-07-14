// Simple audio-reactive placeholder. Users may need to enable audio in browser.
let osc;
let audioEnabled = false;
function setup(){
  createCanvas(640,360);
  background(20);
  // keep audio optional / commented for class; instructor can enable
  osc = new p5.Oscillator('sine'); osc.amp(0);x
}

function draw(){
  fill(255);
  textAlign(CENTER, CENTER);
  if (!audioEnabled) {
    text('Click or press any key to enable audio', width/2, height/2);
  } else {
    text('Audio enabled — interact to change sound', width/2, height/2);
  }
}

function enableAudio() {
  // userStartAudio() ensures the AudioContext is resumed after a user gesture
  if (typeof userStartAudio === 'function') {
    userStartAudio().then(() => {
      if (!osc.started) osc.start();
      osc.freq(220);
      osc.amp(0.15, 0.05);
      audioEnabled = true;
      background(20);
    }).catch(() => {
      // fallback: try resuming AudioContext
      try { getAudioContext().resume(); } catch (e) {}
    });
  } else {
    if (!osc.started) osc.start();
    osc.freq(220);
    osc.amp(0.15, 0.05);
    audioEnabled = true;
    background(20);
  }
}

function mousePressed() { enableAudio(); }
function keyPressed() { enableAudio(); }
