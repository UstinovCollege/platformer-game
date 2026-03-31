// Массив врагов
let enemies = [
    {
        x: 300, y: 520, width: 32, height: 32,
        color: '#e74c3c', speed: 2, direction: 1,
        patrolStart: 250, patrolEnd: 450
    },
    {
        x: 500, y: 300, width: 32, height: 32,
        color: '#e74c3c', speed: 2, direction: 1,
        patrolStart: 450, patrolEnd: 650
    },
    {
        x: 150, y: 230, width: 32, height: 32,
        color: '#e74c3c', speed: 1.5, direction: 1,
        patrolStart: 100, patrolEnd: 300
    }
];

// Загрузка спрайта врага
const enemySprite = new Image();
enemySprite.src = 'assets/sprites/enemy.png';

// Отрисовка врагов
function drawEnemies(ctx) {
    enemies.forEach(enemy => {
        if (enemySprite.complete && enemySprite.naturalHeight !== 0) {
            ctx.save();
            if (enemy.direction === -1) {
                ctx.translate(enemy.x + enemy.width, enemy.y);
                ctx.scale(-1, 1);
                ctx.drawImage(enemySprite, 0, 0, enemy.width, enemy.height);
            } else {
                ctx.drawImage(enemySprite, enemy.x, enemy.y, enemy.width, enemy.height);
            }
            ctx.restore();
        } else {
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            
            ctx.fillStyle = '#fff';
            ctx.fillRect(enemy.x + 6, enemy.y + 8, 8, 8);
            ctx.fillRect(enemy.x + 18, enemy.y + 8, 8, 8);
            ctx.fillStyle = '#000';
            const pupilOffset = enemy.direction === 1 ? 4 : 0;
            ctx.fillRect(enemy.x + 6 + pupilOffset, enemy.y + 10, 4, 4);
            ctx.fillRect(enemy.x + 18 + pupilOffset, enemy.y + 10, 4, 4);
        }
    });
}

// Обновление врагов
function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.x += enemy.speed * enemy.direction;
        
        if (enemy.x >= enemy.patrolEnd) {
            enemy.direction = -1;
        } else if (enemy.x <= enemy.patrolStart) {
            enemy.direction = 1;
        }
    });
}

// Проверка столкновения
function checkEnemyCollision() {
    for (let enemy of enemies) {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            return true;
        }
    }
    return false;
}

// Сброс врагов
function resetEnemies() {
    enemies = [
        { x: 300, y: 520, width: 32, height: 32, color: '#e74c3c', speed: 2, direction: 1, patrolStart: 250, patrolEnd: 450 },
        { x: 500, y: 300, width: 32, height: 32, color: '#e74c3c', speed: 2, direction: 1, patrolStart: 450, patrolEnd: 650 },
        { x: 150, y: 230, width: 32, height: 32, color: '#e74c3c', speed: 1.5, direction: 1, patrolStart: 100, patrolEnd: 300 }
    ];
}

function addEnemy(x, y, patrolStart, patrolEnd, speed) {
    enemies.push({
        x, y, width: 32, height: 32,
        color: '#e74c3c', speed, direction: 1,
        patrolStart, patrolEnd
    });
}