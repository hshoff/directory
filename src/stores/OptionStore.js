import alt from '../alt';
import OptionActions from '../actions/OptionActions';

class OptionStore {
  constructor() {
    this.options = {};

    this.bindListeners({
      handleUpdateOptions: OptionActions.UPDATE_OPTIONS,
    });
  }

  handleUpdateOptions(options) {
    this.options = options;
  }

  handleSelectOption(option) {
    this.selected[option.label] = option;
  }
}

export default alt.createStore(OptionStore, 'OptionStore');
