const canvas = document.querySelector("#game");
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
btnUp.addEventListener('click', movUp);
btnLeft.addEventListener('click', movLeft);
btnRight.addEventListener('click', movRight);
btnDown.addEventListener('click', movDown);
window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowUp':
      movUp();
      break;  
    case 'ArrowLeft':
      movLeft();
      break;  
    case 'ArrowRight':
      movRight();
      break;  
    case 'ArrowDown':
      movDown();
      break;  
  } 
});

function movUp() {
  console.log(`Quiero ir pa'rriba`)
}
function movLeft() {
  console.log(`Quiero ir pa' la otra derecha`)
}
function movRight() {
  console.log(`Quiero ir pa' la derecha`)
}
function movDown() {
  console.log(`Quiero ir pa'bajo`)
}

function startGame() {
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  // mapRowCols.forEach((row, rowI) => {
  //   row.forEach((col, colI) => {
  //     const emoji = emojis[col];
  //     const posX = elementSize * (colI + 1);
  //     const posY = elementSize * (rowI + 1);
  //     game.fillText(emoji, posX, posY)
  //   });
  // });

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(emojis[mapRowCols[row - 1][col - 1]],elementSize * col, elementSize * row)
    }
  }
}

function setCanvasSize(){
  if(window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }

  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)

  elementSize = canvasSize / 10

  startGame();
}