// Массив врагов
let enemies = [
    {
        x: 300,
        y: 520,
        width: 32,
        height: 32,
        color: '#e74c3c',
        speed: 3,  // Изменено: было 2, стало 3 (быстрее)
        direction: 1,
        patrolStart: 250,
        patrolEnd: 450
    },
    {
        x: 500,
        y: 300,
        width: 32,
        height: 32,
        color: '#e74c3c',
        speed: 1,  // Изменено: было 2, стало 1 (медленнее)
        direction: 1,
        patrolStart: 450,
        patrolEnd: 650
    },
    {
        x: 150,
        y: 230,
        width: 32,
        height: 32,
        color: '#e74c3c',
        speed: 1.5,
        direction: 1,
        patrolStart: 100,
        patrolEnd: 300
    }
];

// Добавляем новых врагов
addEnemy(400, 450, 350, 550, 2.5);
addEnemy(100, 350, 50, 250, 1.8);

// Добавляем врага другого цвета и размера
enemies.push({
    x: 600,
    y: 400,
    width: 40,
    height: 40,
    color: '#9b59b6',
    speed: 2.5,
    direction: 1,
    patrolStart: 550,
    patrolEnd: 750
});

// Отрисовка врагов
function drawEnemies(ctx) {
    enemies.forEach(enemy => {
        // Тело врага
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        
        // Злые глаза
        ctx.fillStyle = '#fff';
        ctx.fillRect(enemy.x + 6, enemy.y + 8, 8, 8);
        ctx.fillRect(enemy.x + 18, enemy.y + 8, 8, 8);
        
        // Зрачки (смотрят в сторону движения)
        ctx.fillStyle = '#000';
        const pupilOffset = enemy.direction === 1 ? 4 : 0;
        ctx.fillRect(enemy.x + 6 + pupilOffset, enemy.y + 10, 4, 4);
        ctx.fillRect(enemy.x + 18 + pupilOffset, enemy.y + 10, 4, 4);
        
        // Злая бровь
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (enemy.direction === 1) {
            ctx.moveTo(enemy.x + 4, enemy.y + 6);
            ctx.lineTo(enemy.x + 16, enemy.y + 10);
            ctx.moveTo(enemy.x + 16, enemy.y + 10);
            ctx.lineTo(enemy.x + 28, enemy.y + 6);
        } else {
            ctx.moveTo(enemy.x + 4, enemy.y + 10);
            ctx.lineTo(enemy.x + 16, enemy.y + 6);
            ctx.moveTo(enemy.x + 16, enemy.y + 6);
            ctx.lineTo(enemy.x + 28, enemy.y + 10);
        }
        ctx.stroke();
    });
}

// Обновление позиции врагов
function updateEnemies() {
    enemies.forEach(enemy => {
        // Движение
        enemy.x += enemy.speed * enemy.direction;
        
        // Патрулирование (движение туда-сюда)
        if (enemy.x >= enemy.patrolEnd) {
            enemy.direction = -1;
        } else if (enemy.x <= enemy.patrolStart) {
            enemy.direction = 1;
        }
    });
}

// Проверка столкновения с врагом
function checkEnemyCollision() {
    for (let enemy of enemies) {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            return true; // Столкновение есть
        }
    }
    return false; // Столкновений нет
}

// Сброс врагов (для рестарта)
function resetEnemies() {
    enemies = [
        {
            x: 300, y: 520, width: 32, height: 32,
            color: '#e74c3c', speed: 3, direction: 1,
            patrolStart: 250, patrolEnd: 450
        },
        {
            x: 500, y: 300, width: 32, height: 32,
            color: '#e74c3c', speed: 1, direction: 1,
            patrolStart: 450, patrolEnd: 650
        },
        {
            x: 150, y: 230, width: 32, height: 32,
            color: '#e74c3c', speed: 1.5, direction: 1,
            patrolStart: 100, patrolEnd: 300
        },
        {
            x: 400, y: 450, width: 32, height: 32,
            color: '#e74c3c', speed: 2.5, direction: 1,
            patrolStart: 350, patrolEnd: 550
        },
        {
            x: 100, y: 350, width: 32, height: 32,
            color: '#e74c3c', speed: 1.8, direction: 1,
            patrolStart: 50, patrolEnd: 250
        },
        {
            x: 600, y: 400, width: 40, height: 40,
            color: '#9b59b6', speed: 2.5, direction: 1,
            patrolStart: 550, patrolEnd: 750
        }
    ];
}

// Добавить нового врага (для персонализации)
function addEnemy(x, y, patrolStart, patrolEnd, speed) {
    enemies.push({
        x, y, width: 32, height: 32,
        color: '#e74c3c', speed, direction: 1,
        patrolStart, patrolEnd
    });
}