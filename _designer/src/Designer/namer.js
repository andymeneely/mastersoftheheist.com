import React from 'react';

class Namer extends React.Component {
  render() {
    return (
      <div className="namer">
        <input type="text"
               value={this.props.name}
               onChange={this.props.onNameChange}
               />
        <button onClick={() => this.props.onNudgeName('left')}>⯇</button>
        <button onClick={() => this.props.onNudgeName('up')}>⯅</button>
        <button onClick={() => this.props.onNudgeName('down')}>⯆</button>
        <button onClick={() => this.props.onNudgeName('right')}>⯈</button>
      </div>
    );
  }
}

export default Namer;
