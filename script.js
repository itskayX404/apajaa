// script.js
const game = document.getElementById('game');
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');

// Game variables
let ballX = game.offsetWidth / 2;
let ballY = 50;
let ballSpeedX = 2;
let ballSpeedY = 2;
let paddleX = game.offsetWidth / 2 - paddle.offsetWidth / 2;
let score = 0;
let level = 1;

// Update paddle position
function updatePaddle(direction) {
  if (direction === 'left') {
    paddleX -= 20;
  } else if (direction === 'right') {
    paddleX += 20;
  }
  paddleX = Math.max(0, Math.min(game.offsetWidth - paddle.offsetWidth, paddleX));
  paddle.style.left = `${paddleX}px`;
}

// Add touch controls
leftBtn.addEventListener('click', () => updatePaddle('left'));
rightBtn.addEventListener('click', () => updatePaddle('right'));

// Update ball position
function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off walls (left and right)
  if (ballX <= 0 || ballX >= game.offsetWidth - ball.offsetWidth) {
    ballSpeedX *= -1;
  }

  // Bounce off the top
  if (ballY <= 0) {
    ballSpeedY *= -1;
  }

  // Bounce off paddle
  if (
    ballY + ball.offsetHeight >= paddle.offsetTop &&
    ballX + ball.offsetWidth >= paddleX &&
    ballX <= paddleX + paddle.offsetWidth
  ) {
    ballSpeedY *= -1;
    increaseScore(); // Increase score and possibly level up
  }

  // Game over if ball touches the bottom
  if (ballY >= game.offsetHeight) {
    alert(`Game Over!\nYour Score: ${score}`);
    resetGame();
  }

  // Update ball position
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  // Move ball
  requestAnimationFrame(updateBall);
}

// Increase score and check for level up
function increaseScore() {
  score += 10;
  scoreDisplay.textContent = score;

  // Level up every 50 points
  if (score % 50 === 0) {
    levelUp();
  }
}

// Level up by increasing speed
function levelUp() {
  level += 1;
  levelDisplay.textContent = level;

  // Increase ball speed
  ballSpeedX *= 1.2;
  ballSpeedY *= 1.2;
}

// Reset game to initial state
function resetGame() {
  score = 0;
  level = 1;
  ballX = game.offsetWidth / 2;
  ballY = 50;
  ballSpeedX = 2;
  ballSpeedY = 2;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
}

// Start the game
updateBall();
