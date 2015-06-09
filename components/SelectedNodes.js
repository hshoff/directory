import React, { Component } from 'react';
import SelectedOptionActions from '../actions/SelectedOptionActions';

class SelectedNodes extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(item) {
    SelectedOptionActions.removeOption(item);
  }

  handleClear() {
    SelectedOptionActions.clearAllSelected();
  }

  render() {
    const { selected } = this.props;
    const selectedKeys = Object.keys(selected);
    return (
      <div className='directory-selected'>
        {selectedKeys.map((k, i) => {
          return (
            <div key={i} onClick={this.handleClick.bind(this, selected[k])} className='directory-selected-option'>
              {selected[k].label}
            </div>
          );
        })}
        <small>{selectedKeys.length ? selectedKeys.length : 0} selected</small>
        {!!selectedKeys.length && <small onClick={this.handleClear} style={{float:'right'}}>Clear All</small>}
      </div>
    );
  }
}

export default SelectedNodes;
