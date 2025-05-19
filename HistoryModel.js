export default class HistoryModel {
  constructor() {
    this.history = JSON.parse(localStorage.getItem('studyHistory')) || [];
  }

  addSession(duration, tasksCompleted) {
    const date = new Date().toISOString().slice(0, 10);
    let dayRecord = this.history.find(h => h.date === date);

    if (!dayRecord) {
      dayRecord = { date, totalDuration: 0, tasksCompleted: 0 };
      this.history.push(dayRecord);
    }

    dayRecord.totalDuration += duration;
    dayRecord.tasksCompleted += tasksCompleted;
    this.save();
  }

  getHistory() {
    return this.history;
  }

  save() {
    localStorage.setItem('studyHistory', JSON.stringify(this.history));
  }
}

