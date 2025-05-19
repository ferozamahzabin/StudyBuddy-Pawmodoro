export default class SoundscapeModel {
  constructor() {
    this.sounds = [
      { id: 'rain', name: 'Rain', src: '/Sound/rain.mp3' },
      { id: 'forest', name: 'Forest', src: '/Sound/forest.mp3' },
      { id: 'sea', name: 'Sea', src: '/Sound/sea.mp3' },
    ];
    this.currentSound = null;
    this.audio = new Audio();
  }

  playSound(id) {
    const sound = this.sounds.find(s => s.id === id);
    if (sound) {
      if (this.audio.src !== sound.src) {
        this.audio.src = sound.src;
      }
      this.audio.loop = true;
      this.audio.play();
      this.currentSound = id;
    }
  }

  pauseSound() {
    this.audio.pause();
    this.currentSound = null;
  }

  toggleSound(id) {
    if (this.currentSound === id) {
      this.pauseSound();
    } else {
      this.playSound(id);
    }
  }
}
