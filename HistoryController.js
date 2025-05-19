import HistoryModel from '../models/HistoryModel.js';
import HistoryView from '../views/HistoryView.js';

export default class HistoryController {
  constructor() {
    this.model = new HistoryModel();
    this.view = new HistoryView();

    this.view.renderHistory(this.model.getHistory());
  }

  addSession(duration, tasksCompleted) {
    this.model.addSession(duration, tasksCompleted);
    this.view.renderHistory(this.model.getHistory());
  }
}


