import React from 'react';
import version from './version';

class StatusBar extends React.Component {
  render() {
    return (
      <div className="status-bar">
        <span className="left">{version}</span>
        <span className="right">{this.props.hoverHex}</span>
      </div>
    );
  }
}

export default StatusBar;
