const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 100,
    y: 100,
    width: 32,
    height: 32,
    color: '#00ff88',
    velocityY: 0,
    gravity: 0.5,
    jumpStrength: -10,
    speed: 5,
    onGround: false
};

// Платформы
const platforms = [
    { x: 0, y: 550, width: 800, height: 50, color: '#4a4a6a' },    // Пол
    { x: 200, y: 450, width: 150, height: 20, color: '#6a6a8a' },  // Платформа 1
    { x: 450, y: 350, width: 150, height: 20, color: '#6a6a8a' },  // Платформа 2
    { x: 100, y: 250, width: 100, height: 20, color: '#6a6a8a' },  // Платформа 3
];

const keys = {
    left: false,
    right: false,
    up: false
};

let isShiftPressed = false;

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keys.left = true;
    }
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keys.right = true;
    }
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
        keys.up = true;
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        isShiftPressed = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keys.left = false;
    }
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keys.right = false;
    }
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
        keys.up = false;
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        isShiftPressed = false;
    }
});

function update() {
    if (keys.left) {
        player.x -= player.speed;
    }
    if (keys.right) {
        player.x += player.speed;
    }
    
    // Супер-прыжок при зажатом Shift
    if (keys.up && player.onGround) {
        player.velocityY = isShiftPressed ? -20 : player.jumpStrength;
        player.onGround = false;
    }
    
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
    
    // Проверка коллизии с платформами
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
    
    // Пол (чтобы не падал бесконечно)
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.onGround = true;
    }
}

function draw() {
    // След из квадратов (рисуем перед очисткой)
    ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Радужный игрок (меняем цвет каждый кадр)
    player.color = `hsl(${Date.now() % 360}, 100%, 50%)`;
    
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x + 8, player.y + 8, 4, 4);
    ctx.fillRect(player.x + 20, player.y + 8, 4, 4);
    
    // Рисуем платформы
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();