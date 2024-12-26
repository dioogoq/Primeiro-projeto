const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuração do jogo
const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = spawnFood();
let score = 0;

// Desenha o jogo
function drawGame() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobra
  snake.forEach(segment => {
    ctx.fillStyle = 'lime';
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });

  // Desenha a comida
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Desenha o placar
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Atualiza a lógica do jogo
function updateGame() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Verifica colisão com paredes
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || 
      snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    alert(`Game Over! Sua pontuação foi: ${score}`);
    document.location.reload();
    return;
  }

  snake.unshift(head);

  // Verifica se a cobra comeu a comida
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

// Gera uma nova comida em posição aleatória
function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
  };
}

// Controla a cobra com o teclado
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -boxSize };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: boxSize };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -boxSize, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: boxSize, y: 0 };
      break;
  }
});

// Atualiza e desenha o jogo em intervalos regulares
setInterval(() => {
  updateGame();
  drawGame();
}, 100);
