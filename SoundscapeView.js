export default class SoundscapeView {
  constructor() {
    this.container = document.querySelector('#soundscape-section');
  }

  renderSounds(sounds) {
    this.container.innerHTML = '';
    sounds.forEach(sound => {
      const btn = document.createElement('button');
      btn.textContent = sound.name;
      btn.dataset.id = sound.id;
      btn.classList.add('sound-btn');
      this.container.appendChild(btn);
    });
  }

  bindPlaySound(handler) {
    this.container.addEventListener('click', e => {
      if (e.target.classList.contains('sound-btn')) {
        const id = e.target.dataset.id;
        handler(id);
      }
    });
  }
}
