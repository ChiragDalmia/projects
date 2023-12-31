const character = document.getElementById("character"); 
const block = document.getElementById('block');
const startBtn = document.querySelector('.start-btn');
const scoreOutput = document.getElementById("score");

let score = 0;
let gameRunning = false;

startBtn.addEventListener("click", () => {
  block.style.animation = "move 1.5s linear infinite";
  startBtn.style.display = "none";
  score = 0;
  gameRunning = true;
});

const jump = () => {
  if (character.classList.contains("jump")) {
    return;
  }

  character.classList.add("jump");
  setTimeout(() => {
    character.classList.remove("jump");
  }, 500);
};

let checkHit = setInterval(() => {
  if (!gameRunning) return;

  let blockRect = block.getBoundingClientRect(),
      characterRect = character.getBoundingClientRect();

  if (isColliding(blockRect, characterRect)) {
    gameOver();
  } else {
    increaseScore();
  }
}, 10);

function gameOver() {
  block.style.animation = "none";
  startBtn.style.display = "block";
  gameRunning = false;
  scoreOutput.textContent = `Game Over! Score: ${score.toFixed(0)}`;
}

function increaseScore() {
  score+= 0.07;

  scoreOutput.textContent = `Score: ${score.toFixed(0)}`;
}

function isColliding(rect1, rect2) {
  return !(rect1.right < rect2.left ||
           rect1.left > rect2.right ||
           rect1.bottom < rect2.top ||
           rect1.top > rect2.bottom);
}
