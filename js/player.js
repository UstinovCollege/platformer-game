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
    onGround: false
};

const keys = {
    left: false,
    right: false,
    up: false
};

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
    // Движение влево/вправо
    if (keys.left) player.x -= player.speed;
    if (keys.right) player.x += player.speed;
    
    // Прыжок
    if (keys.up && player.onGround) {
        player.velocityY = player.jumpStrength;
        player.onGround = false;
    }
    
    // Гравитация
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    
    // Границы экрана
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > 800) player.x = 800 - player.width;
    
    // Коллизия с платформами
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
    
    // Пол (если упал ниже всех платформ)
    if (player.y + player.height > 600) {
        player.y = 600 - player.height;
        player.velocityY = 0;
        player.onGround = true;
    }
}

// Отрисовка игрока
function drawPlayer(ctx) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Глаза
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x + 8, player.y + 8, 4, 4);
    ctx.fillRect(player.x + 20, player.y + 8, 4, 4);
}

// Сброс игрока (для рестарта)
function resetPlayer() {
    player.x = 100;
    player.y = 100;
    player.velocityY = 0;
    player.onGround = false;
}