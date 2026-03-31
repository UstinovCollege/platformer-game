// ============================================
// 🗺 МИР — Платформы, звёзды, портал, шипы
// ============================================

// Платформы (будут загружаться из уровней)
let platforms = [];

// Звёзды
let stars = [];

// Шипы
let spikes = [];

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

const spikeSprite = new Image();
spikeSprite.src = 'assets/sprites/spike.png';

// ============================================
// 🖼 ОТРИСОВКА
// ============================================

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

function drawStars(ctx) {
    stars.forEach(star => {
        if (!star.collected) {
            if (starSprite.complete && starSprite.naturalHeight !== 0) {
                ctx.drawImage(starSprite, star.x, star.y, star.width, star.height);
            } else {
                ctx.fillStyle = '#f1c40f';
                ctx.beginPath();
                ctx.arc(star.x + star.width/2, star.y + star.height/2, star.width/2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    });
}

function drawPortal(ctx) {
    ctx.fillStyle = portal.color;
    ctx.fillRect(portal.x, portal.y, portal.width, portal.height);
    ctx.strokeStyle = '#bb8fce';
    ctx.lineWidth = 3;
    ctx.strokeRect(portal.x, portal.y, portal.width, portal.height);
}

function drawSpikes(ctx) {
    spikes.forEach(spike => {
        if (spikeSprite.complete && spikeSprite.naturalHeight !== 0) {
            ctx.drawImage(spikeSprite, spike.x, spike.y, spike.width, spike.height);
        } else {
            // Рисуем треугольные шипы
            ctx.fillStyle = '#ff4444';
            const spikeCount = Math.floor(spike.width / 20);
            for (let i = 0; i < spikeCount; i++) {
                const spikeX = spike.x + i * 20;
                ctx.beginPath();
                ctx.moveTo(spikeX, spike.y + spike.height);
                ctx.lineTo(spikeX + 10, spike.y);
                ctx.lineTo(spikeX + 20, spike.y + spike.height);
                ctx.fill();
            }
            ctx.strokeStyle = '#aa2222';
            ctx.lineWidth = 1;
            ctx.strokeRect(spike.x, spike.y, spike.width, spike.height);
        }
    });
}

// ============================================
// 🎯 ЛОГИКА ИГРЫ
// ============================================

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
            if (typeof playSound === 'function') playSound('collect');
        }
    });
}

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

function checkSpikeCollision() {
    for (let spike of spikes) {
        if (
            player.x < spike.x + spike.width &&
            player.x + player.width > spike.x &&
            player.y < spike.y + spike.height &&
            player.y + player.height > spike.y
        ) {
            return true;
        }
    }
    return false;
}

function resetWorld() {
    stars.forEach(star => star.collected = false);
}