import cx from 'classnames';
import React, { Component } from 'react';
import * as treeUtils from '../utils/tree';
import SelectedOptionActions from '../actions/SelectedOptionActions';

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


export default class Tree extends Component {
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
