import React from 'react';
import UpLogo from '../img/up.svg';
import DownLogo from '../img/down.svg';
import LeftLogo from '../img/left.svg';
import RightLogo from '../img/right.svg';


class Events extends React.Component {

  render(){
      return (
        <div className="events">
          <input type="text"
                 value={this.props.eventStr}
                 onChange={this.props.onEventsChange}
                 placeholder="Event Deck String"/>
          <button onClick={(e) => this.props.onNudgeEvents('left', e)}>
            <img src={LeftLogo} alt="Nudge name left"/>
          </button>
          <button onClick={(e) => this.props.onNudgeEvents('up', e)}>
            <img src={UpLogo} alt="Nudge name up"/>
          </button>
          <button onClick={(e) => this.props.onNudgeEvents('down', e)}>
            <img src={DownLogo} alt="Nudge name down"/>
          </button>
          <button onClick={(e) => this.props.onNudgeEvents('right', e)}>
            <img src={RightLogo} alt="Nudge name right"/>
          </button>
          <button onClick={() => this.props.onDefaultEvents()}>
            Default
          </button>

        </div>
      )
  }

}

export default Events;
