import GoalModel from '../models/GoalModel.js';
import GoalView from '../views/GoalView.js';

export default class GoalController {
  constructor() {
    this.model = new GoalModel();
    this.view = new GoalView();

    this.view.renderGoalInputs(this.model.goals);
    this.view.renderProgress(this.model.goals, this.model.completed);

    this.view.bindSetGoal(this.handleSetGoal.bind(this));
  }

  handleSetGoal({ tasks, sessions }) {
    this.model.setGoals(tasks, sessions);
    this.view.renderProgress(this.model.goals, this.model.completed);
  }

  incrementCompleted(type) {
    this.model.incrementCompleted(type);
    this.view.renderProgress(this.model.goals, this.model.completed);
  }
}
