import alt from '../alt';

class SelectedOptionActions {
  addOption(option) {
    this.dispatch(option);
  }

  removeOption(option) {
    this.dispatch(option);
  }

  clearAllSelected() {
    this.dispatch();
  }
}

export default alt.createActions(SelectedOptionActions);
