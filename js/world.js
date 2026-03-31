// Платформы уровня
const platforms = [
    { x: 0, y: 550, width: 800, height: 50, color: '#4a4a6a' },    // Пол
    { x: 100, y: 500, width: 150, height: 20, color: '#6a6a8a' },  // Платформа 1 (изменена)
    { x: 350, y: 400, width: 120, height: 20, color: '#6a6a8a' },  // Платформа 2
    { x: 550, y: 330, width: 120, height: 20, color: '#6a6a8a' },  // Платформа 3
    { x: 200, y: 260, width: 150, height: 20, color: '#6a6a8a' },  // Платформа 4
    { x: 50, y: 180, width: 100, height: 20, color: '#6a6a8a' },   // Платформа 5
];


// Звёзды для сбора
let stars = [
    { x: 200, y: 430, width: 20, height: 20, collected: false },
    { x: 400, y: 360, width: 20, height: 20, collected: false },
    { x: 600, y: 290, width: 20, height: 20, collected: false },
    { x: 250, y: 220, width: 20, height: 20, collected: false },
    { x: 90, y: 140, width: 20, height: 20, collected: false },
];

stars.push(
    { x: 700, y: 450, width: 20, height: 20, collected: false },
    { x: 500, y: 200, width: 20, height: 20, collected: false },
);
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
        
        // Декоративная обводка
        ctx.strokeStyle = '#8a8aaa';
        ctx.lineWidth = 2;
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    });
}

// Отрисовка звёзд
function drawStars(ctx) {
    stars.forEach(star => {
        if (!star.collected) {
            // Рисуем звезду как жёлтый круг
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(star.x + 10, star.y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
            
            // Блеск
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
    
    // Эффект свечения
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