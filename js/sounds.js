// ============================================

const audio = {
    sounds: {},
    enabled: true,
    volume: 0.3
};

// Инициализация звуков
function initAudio() {
    audio.sounds = {
        jump: new Audio('assets/sounds/jump.mp3'),
        collect: new Audio('assets/sounds/collect.mp3'),
        hurt: new Audio('assets/sounds/hurt.mp3'),
        win: new Audio('assets/sounds/win.mp3')
    };
    
    // Настраиваем громкость
    Object.values(audio.sounds).forEach(sound => {
        sound.volume = audio.volume;
    });
    
    console.log('🔊 Аудио система инициализирована');
}

// Воспроизведение звука
function playSound(soundName) {
    if (!audio.enabled) return;
    
    const sound = audio.sounds[soundName];
    if (sound) {
        // Сбрасываем на начало (для быстрого повторения)
        sound.currentTime = 0;
        sound.play().catch(e => {
            // Игнорируем ошибки (например, если звук не загружен)
            console.log(`Звук ${soundName} не воспроизвёлся:`, e);
        });
    }
}

// Включение/выключение звука
function toggleAudio() {
    audio.enabled = !audio.enabled;
    console.log(`Звук: ${audio.enabled ? 'ВКЛ' : 'ВЫКЛ'}`);
}

// Изменение громкости
function setVolume(value) {
    audio.volume = Math.max(0, Math.min(1, value));
    Object.values(audio.sounds).forEach(sound => {
        sound.volume = audio.volume;
    });
}