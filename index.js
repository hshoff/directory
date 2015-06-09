import React, { Component } from 'react';
import TreeContainer from './components/TreeContainer';


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
