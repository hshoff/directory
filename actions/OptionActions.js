import alt from '../alt';

class OptionActions {
  updateOptions(options) {
    this.dispatch(options);
  }
}

export default alt.createActions(OptionActions);
