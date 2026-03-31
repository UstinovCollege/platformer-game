// Платформы уровня
// Платформы уровня
const platforms = [
    { x: 0, y: 550, width: 800, height: 50, color: '#4a4a6a' },    // Пол
    { x: 50, y: 500, width: 120, height: 20, color: '#6a6a8a' },   // Платформа 1 (слева внизу)
    { x: 350, y: 470, width: 120, height: 20, color: '#6a6a8a' },  // Платформа 2 (центр)
    { x: 650, y: 440, width: 120, height: 20, color: '#6a6a8a' },  // Платформа 3 (справа)
    { x: 200, y: 380, width: 120, height: 20, color: '#6a6a8a' },  // Платформа 4 (слева выше)
    { x: 500, y: 320, width: 120, height: 20, color: '#6a6a8a' },  // Платформа 5 (центр выше)
    { x: 50, y: 250, width: 150, height: 20, color: '#6a6a8a' },   // Платформа 6 (слева)
    { x: 400, y: 180, width: 150, height: 20, color: '#6a6a8a' },  // Платформа 7 (центр высоко)
    { x: 650, y: 120, width: 120, height: 20, color: '#2ecc71' }   // Безопасная зона (справа высоко)
];

// Звёзды для сбора
let stars = [
    { x: 200, y: 430, width: 20, height: 20, collected: false },
    { x: 400, y: 360, width: 20, height: 20, collected: false },
    { x: 600, y: 290, width: 20, height: 20, collected: false },
    { x: 250, y: 220, width: 20, height: 20, collected: false },
    { x: 90, y: 140, width: 20, height: 20, collected: false },
    { x: 700, y: 450, width: 20, height: 20, collected: false },  // Добавленная звезда
    { x: 500, y: 200, width: 20, height: 20, collected: false }   // Добавленная звезда
];

// Портал (финиш)
const portal = {
    x: 700,
    y: 490,
    width: 40,
    height: 60,
    color: 'rgb(7, 255, 69)'
};

// Отрисовка платформ
function drawPlatforms(ctx) {
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        ctx.strokeStyle = '#8a8aaa';
        ctx.lineWidth = 2;
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    });
}

// Отрисовка звёзд
function drawStars(ctx) {
    stars.forEach(star => {
        if (!star.collected) {
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(star.x + 10, star.y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(star.x + 7, star.y + 7, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

// Отрисовка портала
function drawPortal(ctx) {
    ctx.fillStyle = portal.color;
    ctx.fillRect(portal.x, portal.y, portal.width, portal.height);
    
    ctx.strokeStyle = '#bb8fce';
    ctx.lineWidth = 3;
    ctx.strokeRect(portal.x, portal.y, portal.width, portal.height);
}

// Проверка сбора звёзд
function checkStarCollection() {
    stars.forEach(star => {
        if (!star.collected &&
            player.x < star.x + star.width &&
            player.x + player.width > star.x &&
            player.y < star.y + star.height &&
            player.y + player.height > star.y) {
            star.collected = true;
            score += 100;
            updateScoreDisplay();
        }
    });
}

// Проверка победы
function checkWin() {
    const allStarsCollected = stars.every(s => s.collected);
    
    if (allStarsCollected &&
        player.x < portal.x + portal.width &&
        player.x + player.width > portal.x &&
        player.y < portal.y + portal.height &&
        player.y + player.height > portal.y) {
        return true;
    }
    return false;
}

// Сброс мира (для рестарта)
function resetWorld() {
    stars.forEach(star => star.collected = false);
}