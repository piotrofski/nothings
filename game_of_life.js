//Game of Life
//Birth Rule: If a dead cell has exactly three live neighbors, it becomes alive in the next generation.
//Survival Rules: If a living cell has two or three live neighbors, it survives to the next generation. Otherwise, it dies due to overpopulation (more than three neighbors) or underpopulation (fewer than two neighbors).
//Death Rule: If a dead cell has fewer than three live neighbors or more than three live neighbors, it remains dead in the next generation.

function make2DArray(cols, rows)
{
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
      arr[i] = new Array(rows);
    }
  return arr;
}

let grid;
let w = 10;
let cols, rows;
let probability = 0.5;


function setup() {
  createCanvas(500, 500);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols,rows);
  
  for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++)
        {
          grid[i][j] = random() < probability ? 1 : 0;
        }
  }
}

function draw() {
  background(0);
  frameRate(20);
  
  for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++)
        {
          stroke(255);
          fill(grid[i][j]*255);
          let x = i * w;
          let y = j * w;
          square (x,y,w);
        }
  }
  
  
  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++)
        {
          let state = grid[i][j];
          let rn = (i + 1) % cols;
          let ln = (i - 1 + cols) % cols;
          let un = (j - 1 + rows) % rows;
          let bn = (j + 1) % rows;
          
          let sum = grid[ln][un] + 
              grid[i][un] + 
              grid[rn][un] +
              grid[ln][j] +
              grid[rn][j] +
              grid[ln][bn] +
              grid[i][bn] +
              grid[rn][bn];
          
          if (state === 1)
            {
              if (sum < 2 || sum > 3)
                {
                  nextGrid[i][j] = 0;
                }
              else{
                nextGrid[i][j] = 1;
              }
            }
          if (state === 0)
            {
              if (sum === 3)
                {
                  nextGrid[i][j] = 1;
                }
              else {
                nextGrid[i][j] = 0;
              }
            }
        }
  }
  grid = nextGrid;
}
