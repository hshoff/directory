import alt from '../alt';
import SelectedOptionActions from '../actions/SelectedOptionActions';

class SelectedOptionsStore {
  constructor() {
    this.selected = {};

    this.bindListeners({
      handleAddOption: SelectedOptionActions.ADD_OPTION,
      handleRemoveOption: SelectedOptionActions.REMOVE_OPTION,
      handleClearAllSelected: SelectedOptionActions.CLEAR_ALL_SELECTED,
    });
  }

  handleAddOption(option) {
    this.selected[option.label] = option;
  }

  handleRemoveOption(option) {
    delete this.selected[option.label];
  }

  handleClearAllSelected() {
    this.selected = {};
  }
}

export default alt.createStore(SelectedOptionsStore, 'SelectedOptionsStore');
