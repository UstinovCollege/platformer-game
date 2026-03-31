// Получаем доступ к холсту
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Счёт и состояние игры
let score = 0;
let gameWon = false;

// Инициализация
function init() {
    initPlayerInput();
    updateScoreDisplay();
    console.log('🎮 Игра запущена! Собирай все звёзды и иди к порталу!');
}

// Обновление счёта на экране
function updateScoreDisplay() {
    const scoreElement = document.getElementById('score-display');
    if (scoreElement) {
        scoreElement.textContent = `⭐ ${score}`;
    }
}

// Обновление состояния игры
function update() {
    if (gameWon) return;
    
    updatePlayer(platforms);
    checkStarCollection();
    
    if (checkWin()) {
        gameWon = true;
        console.log('🎉 ПОБЕДА! 🎉');
    }
}

// Отрисовка всего
function draw() {
    // Очищаем экран
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем мир
    drawPlatforms(ctx);
    drawStars(ctx);
    drawPortal(ctx);
    
    // Рисуем игрока
    drawPlayer(ctx);
    
    // Экран победы
    if (gameWon) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#f1c40f';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🎉 ПОБЕДА! 🎉', canvas.width / 2, canvas.height / 2 - 30);
        
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.fillText(`Счёт: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText('Нажми R для рестарта', canvas.width / 2, canvas.height / 2 + 60);
    }
}

// Игровой цикл
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Обработка рестарта
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR' && gameWon) {
        gameWon = false;
        score = 0;
        resetPlayer();
        resetWorld();
        updateScoreDisplay();
    }
});

// Запуск
init();
gameLoop();