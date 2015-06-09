import cx from 'classnames';
import assign from 'object-assign';
import React, { Component, PropTypes } from 'react';
import alt from './alt';
import mockData from './utils/mockData';
import * as treeUtils from './utils/tree';
import OptionStore from './stores/OptionStore';
import SelectedOptionsStore from './stores/SelectedOptionsStore';
import OptionActions from './actions/OptionActions';
import SelectedOptionActions from './actions/SelectedOptionActions';


class Node extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClick(item, e) {
    e.stopPropagation();
    this.setState({ open: !this.state.open }, () => {
      this.props.onClick(this.state.open, this.props.selected[item.label]);
    });
  }

  render() {
    const { onClick, item, selected } = this.props;
    const isLeaf = treeUtils.itemIsLeaf(item);
    const icon = this.state.open ? '--' : '+';
    const isSelected = !!selected[item.label]
    const classes = cx({
      'directory-node': !isLeaf,
      'directory-node-leaf': isLeaf,
      'directory-node-selected': isLeaf && isSelected,
    });
    return (
      <li className={classes} onClick={this.handleClick.bind(this, item)}>
        {treeUtils.itemHasChildren(item) && icon} {treeUtils.itemIsLeaf(item) && <input type='checkbox' checked={isSelected} />} {item.label}
        {treeUtils.itemHasChildren(item) && this.state.open &&
          <Tree data={item.children} open={true} selected={this.props.selected} />}
      </li>
    );
  }
}

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClick(item, open, isSelected) {
    if (treeUtils.itemIsLeaf(item)) {
      if (!isSelected) {
        SelectedOptionActions.addOption(item);
      } else {
        SelectedOptionActions.removeOption(item);
      }
    }
  }

  renderNodes(data) {
    return (
      <ul className='directory-root'>
        {data.map((item, i) => {
          return (
            <Node
              key={i}
              item={item}
              selected={this.props.selected}
              onClick={this.handleClick.bind(this, item)} />
          );
        })}
      </ul>
    );
  }

  render() {
    const { data, open } = this.props;
    return (
      <div className='directory-container'>
        {open &&
          this.renderNodes.call(this, data)}
      </div>
    );
  }
}

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

class TreeContainer extends Component {
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

class Tutorial extends Component {
  render() {
    return (
      <div>
        <strong>Favorites:</strong>
        <TreeContainer>
          <div className='select-dropdown'>
            Select Movie Characters
          </div>
        </TreeContainer>
      </div>
    );
  }
}

const el = document.getElementById('tutorial');
React.render(<Tutorial />, el);
