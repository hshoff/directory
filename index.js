import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import mockData from './utils/mockData';


function itemHasChildren(item) {
  return item.children && !!item.children.length;
}

function itemIsLeaf(item) {
  return !itemHasChildren(item);
}

function sort(data) {
  return data.sort(function(a,b){
    if (itemHasChildren(a)) return -1;
    return 1;
  });
}

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClick(e) {
    e.stopPropagation();
    this.setState({ open: !this.state.open });
    this.props.onClick(this.state.open);
  }

  render() {
    const { onClick, item } = this.props;
    const isLeaf = itemIsLeaf(item);
    const icon = this.state.open ? '-' : '+';
    const classes = cx({
      'directory-node': !isLeaf,
      'directory-node-leaf': isLeaf,
      'directory-node-selected': isLeaf && this.state.open,
    });
    return (
      <li className={classes} onClick={this.handleClick.bind(this)}>
        {itemIsLeaf(item) && <input type='checkbox' checked={this.state.open} />} {item.label} {itemHasChildren(item) && icon}
        {itemHasChildren(item) && this.state.open &&
          <Tree data={sort(item.children)} open={true} />}
      </li>
    );
  }
}

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClick(item, open) {
    if (itemIsLeaf(item)) {
      console.log(`You clicked ${item.label} => selected: ${open}`)
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
              onClick={this.handleClick.bind(null, item)} />
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
          this.renderNodes(data)}
      </div>
    );
  }
}

class TreeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, selected: [] };
  }

  toggleSelect() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className='directory-tree-container'>
        <div onClick={this.toggleSelect.bind(this)}>
          {this.props.children}
        </div>
        <Tree data={sort(mockData)} open={this.state.open} />
        {this.state.selected.map((item, i) => {
          return (
            <div key={i}>{item.label}</div>
          );
        })}
      </div>
    );
  }
}

const el = document.getElementById('tutorial');
React.render(
  <div>
    <strong>Issue:</strong>
    <TreeContainer>
      <div className='select-dropdown'>
        Select Issue
      </div>
    </TreeContainer>
  </div>, el);
