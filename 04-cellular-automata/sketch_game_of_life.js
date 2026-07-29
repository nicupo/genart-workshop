let cols, rows, cellSize = 6;
let grid, next;
let frameDelay = 6; // lower = faster evolution, higher = slower
let frameCounter = 0;

function setup(){
  createCanvas(640,360);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  grid = new Array(cols * rows).fill(0);
  next = new Array(cols * rows).fill(0);
  seedGliderGun(10, 10);
}

function draw(){
  background(20);
  for(let x=0;x<cols;x++){
    for(let y=0;y<rows;y++){
      let i = index(x, y);
      if(grid[i]) fill(240); else fill(30);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }

  frameCounter++;
  if(frameCounter >= frameDelay){
    frameCounter = 0;
    step();
  }
}

function index(x, y){
  // wrap around edges so patterns keep evolving instead of dying at the border
  x = (x + cols) % cols;
  y = (y + rows) % rows;
  return x + y * cols;
}

function countNeighbors(x, y){
  let sum = 0;
  for(let dx=-1; dx<=1; dx++){
    for(let dy=-1; dy<=1; dy++){
      if(dx === 0 && dy === 0) continue;
      sum += grid[index(x+dx, y+dy)];
    }
  }
  return sum;
}

function step(){
  for(let x=0;x<cols;x++){
    for(let y=0;y<rows;y++){
      let i = index(x, y);
      let n = countNeighbors(x, y);
      let alive = grid[i];
      // the four rules, total:
      // survive with 2 or 3 neighbors, die of loneliness (<2) or overcrowding (>3),
      // dead cell with exactly 3 neighbors is born
      next[i] = alive ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
    }
  }
  [grid, next] = [next, grid];
}

// Gosper glider gun — a known "good show" pattern: keeps producing
// new gliders indefinitely, never dies out or freezes flat, unlike random soup.
function seedGliderGun(offsetX, offsetY){
  const pattern = [
    [24,0],[22,1],[24,1],[12,2],[13,2],[20,2],[21,2],[34,2],[35,2],
    [11,3],[15,3],[20,3],[21,3],[34,3],[35,3],
    [0,4],[1,4],[10,4],[16,4],[20,4],[21,4],
    [0,5],[1,5],[10,5],[14,5],[16,5],[17,5],[22,5],[24,5],
    [10,6],[16,6],[24,6],
    [11,7],[15,7],
    [12,8],[13,8]
  ];
  for(const [x, y] of pattern){
    grid[index(x + offsetX, y + offsetY)] = 1;
  }
}