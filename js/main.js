// ============================================
// 🎮 ГЛАВНЫЙ ФАЙЛ — Спринт 5 (с шипами)
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gameOverScreen = document.getElementById('game-over-screen');
const winScreen = document.getElementById('win-screen');
const audioToggle = document.getElementById('audio-toggle');
const restartBtn = document.getElementById('restart-button');

let score = 0;
let levelCompleted = false;

function init() {
    console.log('init() вызвана');
    initPlayerInput();
    initAudio();
    initMenu();
    updateScoreDisplay();
    updateLivesDisplay();
    
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            toggleAudio();
            audioToggle.textContent = audio.enabled ? '🔊' : '🔇';
        });
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            console.log('Кнопка рестарта нажата!');
            restartGame();
        });
    }
    
    console.log('🎮 Игра запущена! Версия 2.0');
}

function updateScoreDisplay() {
    const scoreElement = document.getElementById('score-display');
    if (scoreElement) {
        scoreElement.textContent = `⭐ ${score}`;
    }
}

function gameOver() {
    setGameState(GameState.GAME_OVER);
    gameOverScreen.classList.remove('hidden');
    if (audio.sounds && audio.sounds.music) {
        audio.sounds.music.pause();
    }
    console.log('💀 GAME OVER 💀');
}

function levelComplete() {
    if (levelCompleted || getGameState() !== GameState.PLAYING) {
        return;
    }
    
    console.log('🏆 levelComplete() вызвана! Мгновенный переход');
    levelCompleted = true;
    
    if (typeof playSound === 'function') playSound('win');
    
    if (typeof nextLevel === 'function') {
        nextLevel();
    }
    
    setTimeout(() => {
        levelCompleted = false;
    }, 100);
}

function restartGame() {
    console.log('restartGame() вызвана — сбрасываем на 1 уровень');
    
    levelCompleted = false;
    score = 0;
    player.lives = 1;
    
    gameOverScreen.classList.add('hidden');
    winScreen.classList.add('hidden');
    
    resetPlayer();
    resetWorld();
    resetEnemies();
    
    if (typeof resetToLevel1 === 'function') {
        resetToLevel1();
    }
    
    updateScoreDisplay();
    updateLivesDisplay();
    
    setGameState(GameState.PLAYING);
    currentLevel = 1;
    startLevel(1);
    
    if (audio.enabled && audio.sounds && audio.sounds.music) {
        audio.sounds.music.currentTime = 0;
        audio.sounds.music.play().catch(e => console.log('Музыка не загружена:', e));
    }
}

function update() {
    if (getGameState() !== GameState.PLAYING) {
        return;
    }
    
    updatePlayer(platforms);
    updateInvincibility();
    updateEnemies();
    checkStarCollection();
    
    if (checkEnemyCollision()) {
        playerTakeDamage();
    }
    
    // Проверка столкновения с шипами
    if (typeof checkSpikeCollision === 'function' && checkSpikeCollision() && !player.invincible) {
        console.log('💀 Игрок коснулся шипов!');
        playerTakeDamage();
        player.velocityY = -8;
        player.y = player.y - 10;
    }
    
    if (player.y > 600) {
        playerTakeDamage();
        if (player.lives > 0) {
            resetPlayer();
        }
    }
    
    if (checkWin() && !levelCompleted) {
        console.log('✅ Условие победы выполнено! Мгновенный переход');
        levelComplete();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (getGameState() !== GameState.PLAYING) {
        return;
    }
    
    drawPlatforms(ctx);
    drawSpikes(ctx);
    drawStars(ctx);
    drawPortal(ctx);
    drawEnemies(ctx);
    
    if (!player.invincible || Math.floor(Date.now() / 100) % 2 === 0) {
        drawPlayer(ctx);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR') {
        console.log('Клавиша R нажата! Рестарт на 1 уровень');
        restartGame();
    }
});

init();
gameLoop();