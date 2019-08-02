import React from 'react';
import UpLogo from './img/up.svg';
import DownLogo from './img/down.svg';
import LeftLogo from './img/left.svg';
import RightLogo from './img/right.svg';

class Namer extends React.Component {
  render() {
    return (
      <div className="namer">
        <input type="text"
               value={this.props.name}
               onChange={this.props.onNameChange}
               placeholder="Type name here"
               />
        <button onClick={() => this.props.onNudgeName('left')}>
          <img src={LeftLogo} alt="Nudge name left"/>
        </button>
        <button onClick={() => this.props.onNudgeName('up')}>
          <img src={UpLogo} alt="Nudge name up"/>
        </button>
        <button onClick={() => this.props.onNudgeName('down')}>
          <img src={DownLogo} alt="Nudge name down"/>
        </button>
        <button onClick={() => this.props.onNudgeName('right')}>
          <img src={RightLogo} alt="Nudge name right"/>
        </button>
      </div>
    );
  }
}

export default Namer;
