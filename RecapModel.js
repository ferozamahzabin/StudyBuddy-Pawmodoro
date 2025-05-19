export default class RecapModel {
  constructor() {
    this.history = JSON.parse(localStorage.getItem('studyHistory')) || [];
  }

  getTodayRecap() {
    const today = new Date().toISOString().slice(0, 10);
    return this.history.find(h => h.date === today);
  }
}
