// script.js
const game = document.getElementById('game');
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');

// Game variables
let ballX = game.offsetWidth / 2;
let ballY = 50;
let ballSpeedX = 2;
let ballSpeedY = 2;
let paddleX = game.offsetWidth / 2 - paddle.offsetWidth / 2;

// Move the paddle with keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    paddleX -= 20;
  } else if (e.key === 'ArrowRight') {
    paddleX += 20;
  }

  // Prevent paddle from going out of bounds
  paddleX = Math.max(0, Math.min(game.offsetWidth - paddle.offsetWidth, paddleX));
  paddle.style.left = `${paddleX}px`;
});

// Update ball position
function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off walls
  if (ballX <= 0 || ballX >= game.offsetWidth - ball.offsetWidth) {
    ballSpeedX *= -1;
  }

  // Bounce off the paddle
  if (
    ballY + ball.offsetHeight >= paddle.offsetTop &&
    ballX + ball.offsetWidth >= paddleX &&
    ballX <= paddleX + paddle.offsetWidth
  ) {
    ballSpeedY *= -1;
  }

  // Game over if ball touches the bottom
  if (ballY >= game.offsetHeight) {
    alert('Game Over!');
    ballX = game.offsetWidth / 2;
    ballY = 50;
    ballSpeedY = 2; // Reset ball speed
  }

  // Update ball position
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  // Move ball
  requestAnimationFrame(updateBall);
}

// Start the game
updateBall();