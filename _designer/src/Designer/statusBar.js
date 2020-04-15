import React from 'react';
import version from './version';

class StatusBar extends React.Component {
  render() {
    return (
      <div className="status-bar">
        <span>{version}</span>
        <span>{this.props.hoverHex}</span>
        <span>{this.props.lastAction}</span>
      </div>
    );
  }
}

export default StatusBar;
