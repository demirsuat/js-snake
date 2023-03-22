// Initialize the canvas and the game context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// Set up the game variables
let score = 0;
let highScore = 0;
let isGameOver = false;
let isGameStarted = false;
const tileSize = 20;
const tileCount = canvas.width / tileSize;
let snake = {
  x: tileCount / 2,
  y: tileCount / 2,
  dx: 0,
  dy: 0,
  cells: [],
  maxCells: 4
};

let apple = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount)
};

let appleImg = document.getElementById("apple");
let sheadImg = document.getElementById("shead");
let sbodyImg = document.getElementById("sbody");
//appleImg.style.display = "block";
//appleImg.style.left = apple.x + "px";
//appleImg.style.top = apple.y + "px";


// Set up the start button
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
  if (!isGameStarted) {
    isGameStarted = true;
    isGameOver = false;
    startButton.disabled = true;
    stopButton.disabled = false;
    gameLoop();
  }
});

// Set up the stop button
const stopButton = document.getElementById('stop-button');
stopButton.addEventListener('click', () => {
  isGameStarted = false;
  startButton.disabled = false;
  stopButton.disabled = true;
});

// Handle user input
document.addEventListener('keydown', event => {
  if (event.code === 'ArrowLeft' && snake.dx === 0) {
    snake.dx = -1;
    snake.dy = 0;
  } else if (event.code === 'ArrowUp' && snake.dy === 0) {
    snake.dy = -1;
    snake.dx = 0;
  } else if (event.code === 'ArrowRight' && snake.dx === 0) {
    snake.dx = 1;
    snake.dy = 0;
  } else if (event.code === 'ArrowDown' && snake.dy === 0) {
    snake.dy = 1;
    snake.dx = 0;
  }
});

// Create the game loop
function gameLoop() {
  // Update the snake position
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Wrap the snake to the screen
  if (snake.x < 0) {
    snake.x = tileCount - 1;
  } else if (snake.x > tileCount - 1) {
    snake.x = 0;
  }
  if (snake.y < 0) {
    snake.y = tileCount - 1;
  } else if (snake.y > tileCount - 1) {
    snake.y = 0;
  }

  // Add a new cell to the snake's body
  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // Check for collision with the apple
  if (snake.x === apple.x && snake.y === apple.y) {
    score++;
    if (score > highScore) {
      highScore = score;
      document.getElementById('high-score').textContent = highScore;
    }
    apple.x = Math.floor(Math.random() * tileCount);
    apple.y = Math.floor(Math.random() * tileCount);
    snake.maxCells++;
  }

  // Update the snake's cells
  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // Check for collision with the snake's own body
  for (let i = 2; i < snake.cells.length; i++) {
    if (score > 1 && snake.x === snake.cells[i].x && snake.y === snake.cells[i].y) {
      isGameOver = true;
      break;
    }
  }

  // Draw the game
  context.fillStyle = '#232323';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#ffffff';
  context.font = '20px Arial';
  context.fillText(`Score: ${score}`, 10, 30);

  context.fillStyle = '#ffffff';
  context.font = '20px Arial';
  context.fillText(`High Score: ${highScore}`, 10, 60);

  context.drawImage(appleImg, apple.x  * tileSize, apple.y  * tileSize)
  
  //context.fillStyle = appleImg;
  //context.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);

  context.fillStyle = '#1abc9c';
  
  context.drawImage(sheadImg,snake.cells[0].x * tileSize, snake.cells[0].y * tileSize)
    context.drawImage(sheadImg,snake.cells[1].x * tileSize, snake.cells[1].y * tileSize)
  for (let i = 2; i < snake.cells.length; i++) {
    context.drawImage(sbodyImg,snake.cells[i].x * tileSize, snake.cells[i].y * tileSize)
    //context.fillRect(snake.cells[i].x * tileSize, snake.cells[i].y * tileSize, tileSize, tileSize);
  }

  // End the game if the snake collides with its own body
  if (isGameOver) {
    context.fillStyle = '#ffffff';
    context.font = '50px Arial';
    context.fillText('Game Over', canvas.width / 2 - 130, canvas.height / 2);
    startButton.disabled = false;
    stopButton.disabled = true;
    isGameStarted = false;
    isGameOver = false;
    score = 0;
    snake = {
      x: tileCount / 2,
      y: tileCount / 2,
      dx: 0,
      dy: 0,
      cells: [],
      maxCells: 4
    };
    apple = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  }

  // Call the game loop again
  if (isGameStarted) {
    setTimeout(gameLoop, 100);
  }
}
