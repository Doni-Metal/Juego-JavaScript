const canvas = document.querySelector("#game");
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');

let canvasSize;
let elementSize;
let level = 0;

const playerPos = {
  x: undefined,
  y: undefined,
}; 
const goal = {
  x: undefined,
  y: undefined,
};
const door = {
  x: undefined,
  y: undefined,
};
let bombs = [];
let explotion = [];

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

  const map = maps[level];

  if (!map) {
    gameWin();
    return
  }

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  bombs = [];
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
      } else if (col == "I") {
        goal.x = posX;
        goal.y = posY;
      } else if (col == "X") {
        bombs.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY)
    });
  });

  movePlayer();
}

function gameWin() {
  console.log("Ganastes")
}

function levelWin() {
  const goalCollx = Math.floor(playerPos.x) === Math.floor(goal.x);
  const goalColly = Math.floor(playerPos.y) === Math.floor(goal.y);
  if (goalCollx && goalColly) {
    level++;
    explotion = [];
    startGame();
  }

}

function bombCollition() {
  for (i = 0; i < bombs.length; i++) {
    if (Math.floor(bombs[i].x) === Math.floor(playerPos.x) && Math.floor(bombs[i].y) === Math.floor(playerPos.y)) {
      explotion.push({
        x: bombs[i].x,
        y: bombs[i].y,
      })
      playerPos.x = door.x;
      playerPos.y = door.y;

      console.log("Bailaste Bertha");

      startGame();
      break
    }
  }

  if (explotion.length > 0) {
    for (i = 0; i < explotion.length; i++) {
      game.fillText(emojis["BOMB_COLLISION"],explotion[i].x, explotion[i].y)
    }
  }
}

function movePlayer() { 
  bombCollition();

  levelWin();
  
  game.fillText(emojis["PLAYER"], playerPos.x, playerPos.y);
}
function movUp() {
  if ((playerPos.y - elementSize) <= 0) {
  } else {
    playerPos.y -= elementSize;
    startGame()
  }
}
function movLeft() {
  if ((playerPos.x - elementSize) < elementSize) {
  } else {
    playerPos.x -= elementSize;
    startGame()
  }
}
function movRight() {
  if ((playerPos.x + elementSize) > (canvasSize + elementSize)) {
  } else {
    playerPos.x += elementSize;
    startGame()
  }
}
function movDown() {
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