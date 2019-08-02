import React from 'react';
import UpLogo from './img/up.svg';

class ShiftTools extends React.Component {

  renderButton(name, alt){
    return (
      <button onClick={() => this.props.onShiftClick(name)}
              className={name}
              id={`shift_${name}`}>
        <img src={UpLogo} alt={alt} id={`shift_img_${name}`} />
      </button>
    );
  }

  render(){
    const shiftData = [
      {
        name: 'upleft',
        alt: "shift map up and to the left"
      },
      {
        name: 'upright',
        alt: "shift map up and to the right"
      },
      {
        name: 'left',
        alt: "shift map to the left"
      },
      {
        name: 'right',
        alt: "shift to the right"
      },
      {
        name: 'downleft',
        alt: "shift map down and to the left"
      },
      {
        name: 'downright',
        alt: "shift map down and to the right"
      },
    ];
    return (
      <div className="shift-tools">
        <div className="shift-buttons">
          {shiftData.map((s) => this.renderButton(s['name'], s['alt']))}
        </div>
      </div>
    );
  }
}

export default ShiftTools;
