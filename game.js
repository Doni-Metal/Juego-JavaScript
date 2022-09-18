const canvas = document.querySelector("#game");
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');
const btnLeft = document.querySelector('#left');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');

let canvasSize;
let elementSize;
let level = 0;
let lives = 5;
let timeStart;
let timePlayer;
let playerRecord;
let timeInterval;

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

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100)
  }

  playerRecord = localStorage.record;
  spanRecord.innerText = `${Number(playerRecord) / 1000} Secs`;

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  showLives();

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

function showTime() {
  spanTime.innerText = `${(Date.now() - timeStart) / 1000} secs`;
}

function showLives() {
  const heartsArr = Array(lives).fill(emojis["HEART"]);

  spanLives.innerText = "";
  heartsArr.forEach(heart => spanLives.append(heart))

}

function looseGame() {
  if (lives === 0) {
    level = 0
    lives = 5
    playerPos.x = undefined;
    playerPos.y = undefined;
    timeStart = undefined;
    bombs = [];
    explotion = [];
    startGame();
    console.log("Perdiste, Quieres volver a intentarlo?");
  }
}

function gameWin() {
  timePlayer = Date.now() - timeStart;
  clearInterval(timeInterval);
  if (!playerRecord) {
    localStorage.setItem("record", timePlayer)
  } else if (timePlayer < playerRecord) {
    localStorage.setItem("record", timePlayer)
    spanRecord.innerText = `${Number(timePlayer) / 1000} Secs`;
  }
  console.log("Ganastes");
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
      // lives--;
      explotion.push({
        x: bombs[i].x,
        y: bombs[i].y,
      })
      // playerPos.x = door.x;
      // playerPos.y = door.y;

      // startGame();
      break
    }
  }

  if (explotion.length > 0) {
    for (i = 0; i < explotion.length; i++) {
      game.clearRect((explotion[i].x - elementSize),(explotion[i].y - elementSize), elementSize, elementSize)
      game.fillText(emojis["BOMB_COLLISION"],explotion[i].x, explotion[i].y)
    }
  }
}

function movePlayer() { 
  bombCollition();

  looseGame();
  
  levelWin();
  
  game.fillText(emojis["PLAYER"], playerPos.x, playerPos.y);
}
function movUp() {
  if ((playerPos.y - (elementSize + 1)) <= 0) {
  } else {
    playerPos.y -= elementSize;
    startGame()
  }
}
function movLeft() {
  if ((playerPos.x - (elementSize + 1)) <= 0) {
  } else {
    playerPos.x -= elementSize;
    startGame()
  }
}
function movRight() {
  if ((playerPos.x + (elementSize - 1)) > canvasSize)  {
  } else {
    playerPos.x += elementSize;
    startGame()
  }
}
function movDown() {
  if ((playerPos.y + (elementSize - 1)) > canvasSize) {
  } else {
    playerPos.y += elementSize;
    startGame()
  }
}

function setCanvasSize(){
  if(window.innerHeight > window.innerWidth) {
    canvasSize = Math.floor(window.innerWidth * 0.7);
  } else {
    canvasSize = Math.floor(window.innerHeight * 0.7);
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = canvasSize / 10;

  playerPos.x = undefined;
  playerPos.y = undefined;
  startGame();
}