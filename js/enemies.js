let enemies = [];

const enemySprite = new Image();
enemySprite.src = 'assets/sprites/enemy.png';

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

function resetEnemies() {
    enemies = [];
}