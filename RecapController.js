import RecapModel from '../models/RecapModel.js';
import RecapView from '../views/RecapView.js';

export default class RecapController {
  constructor() {
    this.model = new RecapModel();
    this.view = new RecapView();

    this.view.bindShowRecap(this.handleShowRecap.bind(this));
  }

  handleShowRecap() {
    const todayRecap = this.model.getTodayRecap();
    this.view.showDailyRecap(todayRecap);
  }
}

