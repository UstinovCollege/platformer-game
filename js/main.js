// Получаем доступ к холсту
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Элементы UI
const gameOverScreen = document.getElementById('game-over-screen');
const winScreen = document.getElementById('win-screen');
const restartButton = document.getElementById('restart-button');

// Состояние игры
let score = 0;
let isGameWon = false;
let isGameOver = false;

// Инициализация
function init() {
    initPlayerInput();
    updateScoreDisplay();
    updateLivesDisplay();
    console.log('🎮 Игра запущена!');
}

// Обновление счёта на экране
function updateScoreDisplay() {
    const scoreElement = document.getElementById('score-display');
    if (scoreElement) {
        scoreElement.textContent = `⭐ ${score}`;
    }
}

// Game Over
function endGame() {
    isGameOver = true;
    gameOverScreen.classList.remove('hidden');
    console.log('💀 GAME OVER 💀');
}

// Победа
function winGame() {
    isGameWon = true;
    winScreen.classList.remove('hidden');
    console.log('🎉 ПОБЕДА! 🎉');
}

// Рестарт игры
function restartGame() {
    isGameWon = false;
    isGameOver = false;
    score = 0;
    
    gameOverScreen.classList.add('hidden');
    winScreen.classList.add('hidden');
    
    resetPlayer();
    resetWorld();
    resetEnemies();
    
    updateScoreDisplay();
    updateLivesDisplay();
    
    console.log('🔄 Игра перезапущена!');
}

// Обновление состояния игры
function update() {
    if (isGameWon || isGameOver) return;
    
    updatePlayer(platforms);
    updateInvincibility();
    updateEnemies();
    checkStarCollection();
    
    // Проверка столкновения с врагом
    if (checkEnemyCollision()) {
        playerTakeDamage();
    }
    
    // Проверка падения в яму (ниже экрана)
    if (player.y > 600) {
        playerTakeDamage();
        if (player.lives > 0) {
            resetPlayer();
        }
    }
    
    // Проверка победы
    if (checkWin()) {
        winGame();
    }
}

// Отрисовка всего
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPlatforms(ctx);
    drawStars(ctx);
    drawPortal(ctx);
    drawEnemies(ctx);
    
    if (!player.invincible || Math.floor(Date.now() / 100) % 2 === 0) {
        drawPlayer(ctx);
    }
}

// Игровой цикл
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Обработка рестарта по кнопке R
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR') {
        restartGame();
    }
});

// Обработка нажатия на кнопку рестарта
if (restartButton) {
    restartButton.addEventListener('click', () => {
        restartGame();
    });
}

// Запуск
init();
gameLoop();