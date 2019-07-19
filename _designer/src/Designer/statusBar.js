import React from 'react';

class StatusBar extends React.Component {
  render() {
    return (
      <div className="status-bar">
        <span className="left">{this.props.hoverHex}</span>
        <span className="right">{this.props.lastAction}</span>
      </div>
    );
  }
}

export default StatusBar;
