import SoundscapeModel from '../models/SoundscapeModel.js';
import SoundscapeView from '../views/SoundscapeView.js';

export default class SoundscapeController {
  constructor() {
    this.model = new SoundscapeModel();
    this.view = new SoundscapeView();
    this.view.renderSounds(this.model.sounds);
    this.view.bindPlaySound(this.handlePlaySound.bind(this));
  }

  handlePlaySound(id) {
    this.model.toggleSound(id);
  }
}
