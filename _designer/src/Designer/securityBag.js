import React from 'react';
import GuardImg from './img/guard.svg'
import CameraImg from './img/camera.svg'
import LockImg from './img/locked.svg'
import JewelImg from './img/jewel.svg'
import KeycardImg from './img/keycard.svg'
import GuardDogImg from './img/guard-dog.svg'
import DocsImg from './img/folder.svg'
import USBKeyImg from './img/usb-key.svg'

import UpLogo from './img/up.svg';
import DownLogo from './img/down.svg';
import LeftLogo from './img/left.svg';
import RightLogo from './img/right.svg';

class SecurityBag extends React.Component {

  bagRow(stateVal) {
    var imgDict = {
      "guards": GuardImg,
      "locks": LockImg,
      "cameras": CameraImg,
      "jewel": JewelImg,
      "keycard": KeycardImg,
      "dog": GuardDogImg,
      "docs": DocsImg,
      "usb": USBKeyImg,
    }
    var maxRange = {
      "guards": 14,
      "locks": 12,
      "cameras": 12,
      "jewel": 4,
      "keycard": 1,
      "dog": 6,
      "docs": 4,
      "usb": 1,
    }
    return (
      <div className="bag-row">
        <img src={imgDict[stateVal]} alt={stateVal}/>
        <input type="range" id={stateVal} name={stateVal}
               min="0" max={maxRange[stateVal]} step="1"
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
        { this.bagRow("guards") }
        { this.bagRow("cameras") }
        { this.bagRow("locks") }
        { this.bagRow("jewel") }
        { this.bagRow("keycard") }
        { this.bagRow("dog") }
        { this.bagRow("docs") }
        { this.bagRow("usb") }
        { this.nudgeBag("left", LeftLogo) }
        { this.nudgeBag("up", UpLogo) }
        { this.nudgeBag("down", DownLogo) }
        { this.nudgeBag("right", RightLogo) }

      </div>
    );
  }
}

export default SecurityBag;
