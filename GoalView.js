export default class GoalView {
  constructor() {
    this.taskGoalInput = document.querySelector('#task-goal-input');
    this.sessionGoalInput = document.querySelector('#session-goal-input');
    this.goalForm = document.querySelector('#goal-form');
    this.taskProgress = document.querySelector('#task-progress');
    this.sessionProgress = document.querySelector('#session-progress');
  }

  getGoalInputs() {
    return {
      tasks: Number(this.taskGoalInput.value),
      sessions: Number(this.sessionGoalInput.value),
    };
  }

  bindSetGoal(handler) {
    this.goalForm.addEventListener('submit', e => {
      e.preventDefault();
      handler(this.getGoalInputs());
    });
  }

  renderProgress(goals, completed) {
    this.taskProgress.textContent = `${completed.tasks} / ${goals.tasks}`;
    this.sessionProgress.textContent = `${completed.sessions} / ${goals.sessions}`;
  }

  renderGoalInputs(goals) {
    this.taskGoalInput.value = goals.tasks;
    this.sessionGoalInput.value = goals.sessions;
  }
}
