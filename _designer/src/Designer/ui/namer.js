import React from 'react';
import UpLogo from '../img/up.svg';
import DownLogo from '../img/down.svg';
import LeftLogo from '../img/left.svg';
import RightLogo from '../img/right.svg';

class Namer extends React.Component {
  render() {
    return (
      <div className="namer">
        <input type="text"
               value={this.props.name}
               onChange={this.props.onNameChange}
               placeholder="Type name here"/>
        <button onClick={(e) => this.props.onNudgeName('left', e)}>
          <img src={LeftLogo} alt="Nudge name left"/>
        </button>
        <button onClick={(e) => this.props.onNudgeName('up', e)}>
          <img src={UpLogo} alt="Nudge name up"/>
        </button>
        <button onClick={(e) => this.props.onNudgeName('down', e)}>
          <img src={DownLogo} alt="Nudge name down"/>
        </button>
        <button onClick={(e) => this.props.onNudgeName('right', e)}>
          <img src={RightLogo} alt="Nudge name right"/>
        </button>
      </div>
    );
  }
}

export default Namer;
