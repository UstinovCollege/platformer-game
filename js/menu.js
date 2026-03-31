// ============================================
// 🎛 ГЛАВНОЕ МЕНЮ — Спринт 5
// ============================================

// Состояния игры
const GameState = {
    MENU: 'menu',
    PLAYING: 'playing',
    GAME_OVER: 'gameover',
    WIN: 'win'
};

let currentState = GameState.MENU;
let currentLevel = 1;
let totalLevels = 3;

// Элементы меню
let menuScreen = null;
let startButton = null;
let levelTitleElement = null;

// Инициализация меню
function initMenu() {
    menuScreen = document.getElementById('menu-screen');
    startButton = document.getElementById('start-button');
    levelTitleElement = document.getElementById('level-title');
    
    console.log('Меню инициализировано:', { menuScreen, startButton });
    
    if (startButton) {
        const newButton = startButton.cloneNode(true);
        startButton.parentNode.replaceChild(newButton, startButton);
        startButton = newButton;
        
        startButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Кнопка START нажата!');
            startGame();
        });
    } else {
        console.error('Кнопка start-button не найдена!');
    }
    
    showMenu();
}

// Показать меню
function showMenu() {
    currentState = GameState.MENU;
    
    if (menuScreen) {
        menuScreen.classList.remove('hidden');
    }
    
    const gameOverScreen = document.getElementById('game-over-screen');
    const winScreen = document.getElementById('win-screen');
    if (gameOverScreen) gameOverScreen.classList.add('hidden');
    if (winScreen) winScreen.classList.add('hidden');
}

// Начать игру
function startGame() {
    console.log('startGame() вызвана!');
    
    if (menuScreen) {
        menuScreen.classList.add('hidden');
    }
    
    currentLevel = 1;
    console.log('Начинаем с уровня:', currentLevel);
    startLevel(currentLevel);
}

// Начать уровень
function startLevel(level) {
    console.log(`startLevel(${level}) вызвана`);
    console.log(`Всего уровней: ${totalLevels}, текущий: ${level}`);
    
    currentLevel = level;
    currentState = GameState.PLAYING;
    
    // Загружаем уровень
    if (typeof loadLevel === 'function') {
        loadLevel(level);
    } else {
        console.error('loadLevel не определена!');
    }
    
    // Показываем название уровня
    if (levelTitleElement) {
        levelTitleElement.textContent = `Уровень ${level}`;
        levelTitleElement.classList.remove('hidden');
        
        setTimeout(() => {
            levelTitleElement.classList.add('hidden');
        }, 3000);
    }
    
    console.log(`🎮 Уровень ${level} начался!`);
}

// Переход к следующему уровню
function nextLevel() {
    console.log(`========== nextLevel() ==========`);
    console.log(`Текущий уровень: ${currentLevel}`);
    console.log(`Всего уровней: ${totalLevels}`);
    
    // Проверяем, есть ли следующий уровень
    if (currentLevel < totalLevels) {
        // Переходим на следующий уровень
        currentLevel++;
        console.log(`✅ Переход на уровень ${currentLevel}`);
        startLevel(currentLevel);
    } else {
        // Все уровни пройдены!
        console.log(`🏆 Все уровни пройдены! Показываем экран победы`);
        showVictoryScreen();
    }
}

// Показать экран победы в игре
function showVictoryScreen() {
    console.log('showVictoryScreen() вызвана');
    currentState = GameState.WIN;
    const winScreen = document.getElementById('win-screen');
    if (winScreen) {
        winScreen.classList.remove('hidden');
        const title = winScreen.querySelector('h1');
        if (title) {
            title.textContent = '🏆 ВСЕ УРОВНИ ПРОЙДЕНЫ! 🏆';
        }
    }
    if (typeof playSound === 'function') playSound('win');
}

// Получить текущее состояние
function getGameState() {
    return currentState;
}

// Установить состояние
function setGameState(state) {
    currentState = state;
}