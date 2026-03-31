const audio = {
    enabled: true,
    sounds: {
        jump: null,
        collect: null,
        hurt: null,
        win: null,
        music: null
    }
};

function initAudio() {
    audio.sounds.jump = new Audio();
    audio.sounds.jump.src = 'assets/sounds/jump.wav';
    
    audio.sounds.collect = new Audio();
    audio.sounds.collect.src = 'assets/sounds/collect.wav';
    
    audio.sounds.hurt = new Audio();
    audio.sounds.hurt.src = 'assets/sounds/hurt.wav';
    
    audio.sounds.win = new Audio();
    audio.sounds.win.src = 'assets/sounds/win.wav';

    audio.sounds.music = new Audio();
    audio.sounds.music.src = 'assets/sounds/music.mp3';
    audio.sounds.music.loop = true;
    audio.sounds.music.volume = 0.1;
    
    if (audio.enabled) {
        audio.sounds.music.play().catch(e => console.log('Музыка не загружена:', e));
    }
}

function playSound(soundName) {
    if (!audio.enabled) return;
    
    const sound = audio.sounds[soundName];
    if (sound) {
        const soundClone = sound.cloneNode();
        soundClone.play().catch(e => console.log('Звук не загружен:', e));
    }
}

function toggleAudio() {
    audio.enabled = !audio.enabled;
    
    if (audio.enabled) {
        if (audio.sounds.music) {
            audio.sounds.music.play().catch(e => console.log('Музыка не загружена:', e));
        }
    } else {
        if (audio.sounds.music) {
            audio.sounds.music.pause();
        }
    }
}