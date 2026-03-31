const player = {
    x: 100,
    y: 100,
    width: 32,
    height: 32,
    color: 'rgb(59, 5, 255)',
    velocityY: 0,
    gravity: 0.5,
    jumpStrength: -10,
    speed: 5,
    onGround: false,
    lives: 2,
    invincible: false,
    invincibleTime: 0
};

const keys = {
    left: false,
    right: false,
    up: false
};

// Загрузка спрайта игрока (один спрайт, без анимации)
const playerSprite = new Image();
playerSprite.src = 'assets/sprites/player.png';

// Инициализация управления
function initPlayerInput() {
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
        if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.up = true;
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
        if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.up = false;
    });
}

// Обновление состояния игрока
function updatePlayer(platforms) {
    if (keys.left) player.x -= player.speed;
    if (keys.right) player.x += player.speed;
    
    if (keys.up && player.onGround) {
        player.velocityY = player.jumpStrength;
        player.onGround = false;
        if (typeof playSound === 'function') playSound('jump');
    }
    
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > 800) player.x = 800 - player.width;
    
    player.onGround = false;
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height + 10 &&
            player.velocityY >= 0
        ) {
            player.onGround = true;
            player.velocityY = 0;
            player.y = platform.y - player.height;
        }
    });
    
    if (player.y + player.height > 600) {
        player.y = 600 - player.height;
        player.velocityY = 0;
        player.onGround = true;
    }
}

// Отрисовка игрока (упрощённая, без анимации)
function drawPlayer(ctx) {
    // Если спрайт загрузился — рисуем его
    if (playerSprite.complete && playerSprite.naturalHeight !== 0) {
        // Отражение спрайта при движении влево
        ctx.save();
        if (keys.left) {
            ctx.translate(player.x + player.width, player.y);
            ctx.scale(-1, 1);
            ctx.drawImage(playerSprite, 0, 0, player.width, player.height);
        } else {
            ctx.drawImage(playerSprite, player.x, player.y, player.width, player.height);
        }
        ctx.restore();
    } else {
        // Fallback — квадрат (если спрайт не загрузился)
        ctx.fillStyle = player.invincible ? 'rgba(0, 255, 136, 0.5)' : player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Глаза
        ctx.fillStyle = '#000';
        ctx.fillRect(player.x + 8, player.y + 8, 4, 4);
        ctx.fillRect(player.x + 20, player.y + 8, 4, 4);
    }
}

// Получение урона
function playerTakeDamage() {
    if (player.invincible) return;
    
    player.lives--;
    updateLivesDisplay();
    if (typeof playSound === 'function') playSound('hurt');
    
    if (player.lives <= 0) {
        if (typeof endGame === 'function') endGame();
    } else {
        player.invincible = true;
        player.invincibleTime = Date.now() + 2000;
        player.velocityY = -5;
    }
}

// Обновление отображения жизней
function updateLivesDisplay() {
    const livesElement = document.getElementById('lives-display');
    if (livesElement) {
        livesElement.textContent = `❤️ ${player.lives}`;
    }
}

// Проверка неуязвимости
function updateInvincibility() {
    if (player.invincible && Date.now() > player.invincibleTime) {
        player.invincible = false;
    }
}

// Сброс игрока
function resetPlayer() {
    player.x = 100;
    player.y = 100;
    player.velocityY = 0;
    player.onGround = false;
    player.lives = 2;
    player.invincible = false;
    updateLivesDisplay();
}