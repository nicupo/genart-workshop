let cols, rows, cellSize = 6;
let grid;

function setup(){
  createCanvas(640,360);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  grid = new Array(cols * rows).fill(0).map(()=>random()>.7?1:0);
}

function draw(){
  background(20);
  for(let x=0;x<cols;x++){
    for(let y=0;y<rows;y++){
      let i = x + y*cols;
      if(grid[i]) fill(240); else fill(30);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}
