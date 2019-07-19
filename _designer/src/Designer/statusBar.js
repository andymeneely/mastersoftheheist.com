import React from 'react';

class StatusBar extends React.Component {
  render() {
    return (
      <div className="status-bar">
        <p>&nbsp;{this.props.lastAction}</p>
      </div>
    );
  }
}

export default StatusBar;
