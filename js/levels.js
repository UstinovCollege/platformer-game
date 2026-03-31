// ============================================
// 🗺 СИСТЕМА УРОВНЕЙ — Спринт 5 (с шипами)
// ============================================

const levels = [
    // Уровень 1: Обучение
    {
        id: 1,
        name: 'Первые шаги',
        platforms: [
            { x: 0, y: 550, width: 800, height: 50, color: '#4a4a6a' },
            { x: 150, y: 470, width: 120, height: 20, color: '#6a6a8a' },
            { x: 350, y: 400, width: 120, height: 20, color: '#6a6a8a' },
            { x: 550, y: 330, width: 120, height: 20, color: '#6a6a8a' },
        ],
        stars: [
            { x: 200, y: 430, width: 25, height: 25 },
            { x: 400, y: 360, width: 25, height: 25 },
            { x: 600, y: 290, width: 25, height: 25 },
        ],
        enemies: [
            { x: 300, y: 520, patrolStart: 250, patrolEnd: 450, speed: 1.5 },
        ],
        spikes: [
            { x: 0, y: 600, width: 150, height: 20 },
            { x: 650, y: 600, width: 150, height: 20 },
        ],
        playerStart: { x: 50, y: 500 },
        portal: { x: 700, y: 490, width: 40, height: 60 }
    },
    
    // Уровень 2: Средний
    {
        id: 2,
        name: 'Прыжки и враги',
        platforms: [
            { x: 0, y: 550, width: 300, height: 50, color: '#4a4a6a' },
            { x: 400, y: 550, width: 400, height: 50, color: '#4a4a6a' },
            { x: 100, y: 450, width: 100, height: 20, color: '#6a6a8a' },
            { x: 250, y: 350, width: 100, height: 20, color: '#6a6a8a' },
            { x: 450, y: 400, width: 150, height: 20, color: '#6a6a8a' },
            { x: 650, y: 300, width: 100, height: 20, color: '#6a6a8a' },
        ],
        stars: [
            { x: 140, y: 410, width: 25, height: 25 },
            { x: 290, y: 310, width: 25, height: 25 },
            { x: 500, y: 360, width: 25, height: 25 },
            { x: 700, y: 260, width: 25, height: 25 },
            { x: 750, y: 510, width: 25, height: 25 },
        ],
        enemies: [
            { x: 450, y: 520, patrolStart: 400, patrolEnd: 750, speed: 2 },
            { x: 250, y: 320, patrolStart: 200, patrolEnd: 350, speed: 1.5 },
        ],
        spikes: [
            { x: 300, y: 580, width: 100, height: 20 },
            { x: 0, y: 580, width: 50, height: 20 },
            { x: 750, y: 540, width: 50, height: 20 },
            { x: 205, y: 480, width: 80, height: 20 },
        ],
        playerStart: { x: 50, y: 500 },
        portal: { x: 750, y: 240, width: 40, height: 60 }
    },
    
    // Уровень 3: Сложный
    {
        id: 3,
        name: 'Испытание мастера',
        platforms: [
            { x: 0, y: 550, width: 200, height: 50, color: '#4a4a6a' },
            { x: 300, y: 500, width: 80, height: 20, color: '#6a6a8a' },
            { x: 450, y: 450, width: 80, height: 20, color: '#6a6a8a' },
            { x: 600, y: 400, width: 80, height: 20, color: '#6a6a8a' },
            { x: 450, y: 300, width: 80, height: 20, color: '#6a6a8a' },
            { x: 250, y: 250, width: 80, height: 20, color: '#6a6a8a' },
            { x: 50, y: 200, width: 150, height: 20, color: '#6a6a8a' },
            { x: 700, y: 550, width: 100, height: 50, color: '#4a4a6a' },
        ],
        stars: [
            { x: 330, y: 460, width: 25, height: 25 },
            { x: 480, y: 410, width: 25, height: 25 },
            { x: 630, y: 360, width: 25, height: 25 },
            { x: 480, y: 260, width: 25, height: 25 },
            { x: 280, y: 210, width: 25, height: 25 },
            { x: 100, y: 160, width: 25, height: 25 },
            { x: 740, y: 510, width: 25, height: 25 },
        ],
        enemies: [
            { x: 300, y: 470, patrolStart: 280, patrolEnd: 380, speed: 1.2 },
            { x: 450, y: 420, patrolStart: 430, patrolEnd: 530, speed: 1.2 },
            { x: 600, y: 370, patrolStart: 580, patrolEnd: 680, speed: 1.2 },
            { x: 700, y: 520, patrolStart: 680, patrolEnd: 780, speed: 1.5 },
        ],
        spikes: [
            { x: 200, y: 580, width: 100, height: 20 },
            { x: 380, y: 580, width: 100, height: 20 },
            { x: 520, y: 580, width: 100, height: 20 },
            { x: 0, y: 580, width: 50, height: 20 },
            { x: 750, y: 540, width: 50, height: 20 },
            { x: 150, y: 530, width: 80, height: 20 },
            { x: 550, y: 430, width: 80, height: 20 },
        ],
        playerStart: { x: 50, y: 500 },
        portal: { x: 720, y: 490, width: 40, height: 60 }
    }
];

function loadLevel(levelId) {
    console.log(`🔄 loadLevel(${levelId})`);
    
    const level = levels.find(l => l.id === levelId);
    
    if (!level) {
        console.error(`❌ Уровень ${levelId} не найден!`);
        return;
    }
    
    console.log(`✅ Загрузка уровня ${levelId}: ${level.name}`);
    
    platforms.length = 0;
    level.platforms.forEach(p => platforms.push({ ...p }));
    
    stars.length = 0;
    level.stars.forEach(s => stars.push({ ...s, collected: false }));
    
    enemies.length = 0;
    level.enemies.forEach(e => {
        enemies.push({
            x: e.x, y: e.y, width: 32, height: 32, color: '#e74c3c',
            speed: e.speed, direction: 1,
            patrolStart: e.patrolStart, patrolEnd: e.patrolEnd
        });
    });
    
    spikes.length = 0;
    if (level.spikes) {
        level.spikes.forEach(s => spikes.push({ ...s }));
        console.log(`📌 Шипов: ${spikes.length}`);
    }
    
    portal.x = level.portal.x;
    portal.y = level.portal.y;
    portal.width = level.portal.width;
    portal.height = level.portal.height;
    
    resetPlayer();
    player.x = level.playerStart.x;
    player.y = level.playerStart.y;
    
    score = 0;
    updateScoreDisplay();
}

function getTotalLevels() {
    return levels.length;
}