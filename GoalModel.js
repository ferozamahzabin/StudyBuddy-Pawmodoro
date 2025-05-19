export default class GoalModel {
  constructor() {
    this.goals = {
      tasks: 0,
      sessions: 0,
    };
    this.completed = {
      tasks: 0,
      sessions: 0,
    };
    this.loadFromStorage();
  }

  setGoals(tasks, sessions) {
    this.goals.tasks = tasks;
    this.goals.sessions = sessions;
    this.saveToStorage();
  }

  incrementCompleted(type) {
    if (this.completed[type] !== undefined) {
      this.completed[type]++;
      this.saveToStorage();
    }
  }

  resetCompleted() {
    this.completed.tasks = 0;
    this.completed.sessions = 0;
    this.saveToStorage();
  }

  loadFromStorage() {
    const saved = JSON.parse(localStorage.getItem('goalData'));
    if (saved) {
      this.goals = saved.goals;
      this.completed = saved.completed;
    }
  }

  saveToStorage() {
    localStorage.setItem('goalData', JSON.stringify({
      goals: this.goals,
      completed: this.completed,
    }));
  }
}
