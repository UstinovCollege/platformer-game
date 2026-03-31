// Получаем доступ к холсту
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Элементы UI
const gameOverScreen = document.getElementById('game-over-screen');
const winScreen = document.getElementById('win-screen');
const restartButton = document.getElementById('restart-button');
const audioToggle = document.getElementById('audio-toggle');

// Состояние игры
let score = 0;
let isGameWon = false;
let isGameOver = false;

// ============================================
// 🔊 ЗВУКОВАЯ СИСТЕМА
// ============================================

const audio = {
    enabled: true,
    sounds: {
        jump: null,
        collect: null,
        hurt: null,
        win: null
    }
};

function initAudio() {
    // Создаём звуки
    audio.sounds.jump = new Audio();
    audio.sounds.jump.src = 'assets/sounds/jump.wav';
    
    audio.sounds.collect = new Audio();
    audio.sounds.collect.src = 'assets/sounds/collect.wav';
    
    audio.sounds.hurt = new Audio();
    audio.sounds.hurt.src = 'assets/sounds/hurt.wav';
    
    audio.sounds.win = new Audio();
    audio.sounds.win.src = 'assets/sounds/win.wav';

    audio.sounds.music = new Audio();
    audio.sounds.music.src = 'assets/sounds/music.mp3';
    audio.sounds.music.loop = true;      // Зацикливаем
    audio.sounds.music.volume = 0.1;     // Громкость 10%
    
    // Запускаем музыку
    if (audio.enabled) {
        audio.sounds.music.play().catch(e => console.log('Музыка не загружена:', e)); 
    }
}

function playSound(soundName) {
    if (!audio.enabled) return;
    
    const sound = audio.sounds[soundName];
    if (sound) {
        const soundClone = sound.cloneNode();
        soundClone.play().catch(e => console.log('Звук не загружен:', e));
    }
}

function toggleAudio() {
    audio.enabled = !audio.enabled;
    
    if (audio.enabled) {
        // Включаем музыку
        if (audio.sounds.music) {
            audio.sounds.music.play().catch(e => console.log('Музыка не загружена:', e));
        }
    } else {
        // Выключаем музыку
        if (audio.sounds.music) {
            audio.sounds.music.pause();
        }
    }
    
    if (audioToggle) {
        audioToggle.textContent = audio.enabled ? '🔊' : '🔇';
    }
}

// ============================================
// 🎮 ОСНОВНЫЕ ФУНКЦИИ ИГРЫ
// ============================================

// Инициализация
function init() {
    initPlayerInput();
    initAudio();  // 🆕 Инициализируем звуки
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
    playSound('win');  // 🆕 Звук победы
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

// ============================================
// 🎮 ОБРАБОТЧИКИ СОБЫТИЙ
// ============================================

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

// Обработка кнопки звука
if (audioToggle) {
    audioToggle.addEventListener('click', () => {
        toggleAudio();
    });
}

// ============================================
// 🚀 ЗАПУСК ИГРЫ
// ============================================

init();
gameLoop();