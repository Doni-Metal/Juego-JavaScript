// Lo comentado son formas alternas o primeros intentos
const canvas = document.querySelector("#game");
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');

let canvasSize;
let elementSize;

let playerPos = {
  x: undefined,
  y: undefined,
};
// let pOldPos = {
//   x: undefined,
//   y: undefined,
// };
// let startDoor = {
//   x: undefined,
//   y: undefined,
// };


window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
btnUp.addEventListener('click', movUp);
btnLeft.addEventListener('click', movLeft);
btnRight.addEventListener('click', movRight);
btnDown.addEventListener('click', movDown);
window.addEventListener('keydown', (event) => {
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

function startGame() {
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  game.clearRect(0,0,canvasSize,canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);

      if (col == "O"){
        if (!playerPos.x && !playerPos.y) {
          playerPos.x = posX;
          playerPos.y = posY;
        }
      }      

      game.fillText(emoji, posX, posY)
    });
  });

  movePlayer();
}

function movePlayer() {
  // game.clearRect(pOldPos.x , pOldPos.y , elementSize, elementSize);
  // game.clearRect(startDoor.x - elementSize, startDoor.y - elementSize, elementSize, elementSize);
  // game.fillText(emojis["O"], startDoor.x, startDoor.y);
  game.fillText(emojis["PLAYER"], playerPos.x, playerPos.y);
}
function movUp() {
  // pOldPos.x = playerPos.x - elementSize;
  // pOldPos.y = playerPos.y - elementSize;
  if ((playerPos.y - elementSize) <= 0) {
  } else {
    playerPos.y -= elementSize;
    startGame()
  }
}
function movLeft() {
  // pOldPos.x = playerPos.x - elementSize;
  // pOldPos.y = playerPos.y - elementSize;
  if ((playerPos.x - elementSize) < elementSize) {
  } else {
    playerPos.x -= elementSize;
    startGame()
  }
}
function movRight() {
  // pOldPos.x = playerPos.x - elementSize;
  // pOldPos.y = playerPos.y - elementSize;
  if ((playerPos.x + elementSize) > (canvasSize + elementSize)) {
  } else {
    playerPos.x += elementSize;
    startGame()
  }
}
function movDown() {
  // pOldPos.x = playerPos.x - elementSize;
  // pOldPos.y = playerPos.y - elementSize;
  if ((playerPos.y + elementSize) > canvasSize) {
  } else {
    playerPos.y += elementSize;
    startGame()
  }
}

function setCanvasSize(){
  if(window.innerHeight > window.innerWidth) {
    canvasSize = Math.floor(window.innerWidth * 0.80);
  } else {
    canvasSize = Math.floor(window.innerHeight * 0.80);
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = canvasSize / 10;

  startGame();
}