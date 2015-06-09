import React, { Component } from 'react';
import assign from 'object-assign';
import mockData from '../utils/mockData';
import * as treeUtils from '../utils/tree';
import OptionStore from '../stores/OptionStore';
import SelectedOptionsStore from '../stores/SelectedOptionsStore';
import Tree from './Tree';
import SelectedNodes from './SelectedNodes';

export default class TreeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = assign(
      OptionStore.getState(),
      SelectedOptionsStore.getState(), {
      open: false,
    });
  }

  componentDidMount() {
    OptionStore.listen(this.onChange.bind(this));
    SelectedOptionsStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    OptionStore.unlisten(this.onChange.bind(this));
    SelectedOptionsStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }
  render() {
    return (
      <div className='directory-tree-container'>
        <div onClick={this.toggleOpen.bind(this)}>
          {this.props.children}
        </div>
        <Tree selected={this.state.selected} data={treeUtils.sort(mockData)} open={this.state.open} />
        <SelectedNodes selected={this.state.selected} />
      </div>
    );
  }
}
