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
    { x: 400, y: 210, width: 150, height: 20, color: '#6a6a8a' },  // Платформа 7 (центр высоко)
    { x: 650, y: 120, width: 120, height: 20, color: '#2ecc71' }   // Безопасная зона (справа высоко)
];
// Звёзды для сбора
// Звёзды для сбора (подняты выше, чтобы не были внутри платформ)
let stars = [
    { x: 200, y: 410, width: 35, height: 35, collected: false },  // Над платформой 1 (y=430)
    { x: 400, y: 340, width: 35, height: 35, collected: false },  // Над платформой 2 (y=360)
    { x: 600, y: 290, width: 35, height: 35, collected: false },  // Над платформой 3 (y=290)
    { x: 250, y: 200, width: 35, height: 35, collected: false },  // Над платформой 4 (y=220)
    { x: 90, y: 120, width: 35, height: 35, collected: false },   // Над платформой 5 (y=140)
    { x: 700, y: 390, width: 35, height: 35, collected: false },  // Над полом (y=450)
    { x: 500, y: 90, width: 35, height: 35, collected: false }    // Над платформой 6 (y=200)
];

// Портал
const portal = {
    x: 700,
    y: 490,
    width: 40,
    height: 60,
    color: 'rgb(7, 255, 69)'
};

// Загрузка спрайтов
const platformSprite = new Image();
platformSprite.src = 'assets/sprites/platform.png';

const starSprite = new Image();
starSprite.src = 'assets/sprites/star.png';

// Отрисовка платформ
function drawPlatforms(ctx) {
    platforms.forEach(platform => {
        if (platformSprite.complete && platformSprite.naturalHeight !== 0) {
            const spriteSize = 32;
            for (let x = platform.x; x < platform.x + platform.width; x += spriteSize) {
                for (let y = platform.y; y < platform.y + platform.height; y += spriteSize) {
                    ctx.drawImage(platformSprite, x, y, spriteSize, spriteSize);
                }
            }
        } else {
            ctx.fillStyle = platform.color;
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            ctx.strokeStyle = '#8a8aaa';
            ctx.lineWidth = 2;
            ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
        }
    });
}

// Отрисовка звёзд
function drawStars(ctx) {
    stars.forEach(star => {
        if (!star.collected) {
            if (starSprite.complete && starSprite.naturalHeight !== 0) {
                ctx.drawImage(starSprite, star.x, star.y, star.width, star.height);
            } else {
                ctx.fillStyle = '#f1c40f';
                ctx.beginPath();
                ctx.arc(star.x + 10, star.y + 10, 10, 0, Math.PI * 2);
                ctx.fill();
            }
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
            playSound('collect');  // Звук сбора звезды
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

// Сброс мира
function resetWorld() {
    stars.forEach(star => star.collected = false);
}