import React from 'react';
import GuardImg from './img/guard.svg'
import CameraImg from './img/camera.svg'
import LockImg from './img/locked.svg'
import UpLogo from './img/up.svg';
import DownLogo from './img/down.svg';
import LeftLogo from './img/left.svg';
import RightLogo from './img/right.svg';
import SecurityBagLogo from './img/security_bag.svg';

class SecurityBag extends React.Component {

  bagRow(stateVal) {
    var imgDict = {
      "guards": GuardImg,
      "locks": LockImg,
      "cameras": CameraImg,
    }
    return (
      <div className="bag-row">
        <img src={imgDict[stateVal]} alt={stateVal}/>
        <input type="range" id={stateVal} name={stateVal}
               min="0" max="10" step="1"
               value={this.props.counts[stateVal]}
               onChange={this.props.onBagChange}
               />
             <span>{this.props.counts[stateVal]}</span>
      </div>
    )
  }

  nudgeBag(dir, logo) {
    return (
      <button onClick={(e) => this.props.onNudgeBag(dir, e)}>
        <img src={logo} alt={"Nudge " + dir}/>
      </button>
    )
  }

  render() {
    return (
      <div className="security-bag">
        <img src={SecurityBagLogo} alt={"Security Bag"} className="logo"/>
        { this.bagRow("guards") }
        { this.bagRow("cameras") }
        { this.bagRow("locks") }
        { this.nudgeBag("left", LeftLogo) }
        { this.nudgeBag("up", UpLogo) }
        { this.nudgeBag("down", DownLogo) }
        { this.nudgeBag("right", RightLogo) }

      </div>
    );
  }
}

export default SecurityBag;
