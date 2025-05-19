export default class HistoryView {
  constructor() {
    this.historyContainer = document.querySelector('#history-section');
  }

  renderHistory(history) {
    this.historyContainer.innerHTML = '';
    history.forEach(day => {
      const div = document.createElement('div');
      div.classList.add('history-day');
      div.textContent = `${day.date}: ${day.tasksCompleted} tasks, ${Math.floor(day.totalDuration / 60)} min`;
      this.historyContainer.appendChild(div);
    });
  }
}

