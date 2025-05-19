export default class RecapView {
  constructor() {
    this.recapButton = document.querySelector('#show-daily-recap-btn');
  }

  bindShowRecap(handler) {
    this.recapButton.addEventListener('click', handler);
  }

  showDailyRecap(day) {
    if (day) {
      alert(`Daily Recap for ${day.date}:\nTasks completed: ${day.tasksCompleted}\nTime studied: ${Math.floor(day.totalDuration / 60)} minutes`);
    } else {
      alert('No study sessions recorded for today.');
    }
  }
}

