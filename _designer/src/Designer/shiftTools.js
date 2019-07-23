import React from 'react';

class ShiftTools extends React.Component {
  render(){
    return (
      <div className="shift-tools">
        <button onClick={() => this.props.onShiftClick('up')}>⯅</button>
        <button onClick={() => this.props.onShiftClick('left')}>⯇</button>
        shift
        <button onClick={() => this.props.onShiftClick('right')}>⯈</button>
        <button onClick={() => this.props.onShiftClick('down')}>⯆</button>
      </div>
    );
  }
}

export default ShiftTools;
