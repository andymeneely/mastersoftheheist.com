import React from 'react';
import tileData from './tileData';

class Checklist extends React.Component {

  good(x){
    return x ? "good" : "bad";
  }

  isTile(t) {
    return t !== 'GP'
        && t !== 'E1'
        && t !== 'E2'
        && t !== 'E3'
        && t !== 'E4'
        && t !== 'E5'
        && t !== 'E6'
    ;
  }

  isExit(t) {
    return t === 'E1'
        || t === 'E2'
        || t === 'E3'
        || t === 'E4'
        || t === 'E5'
        || t === 'E6'
    ;
  }

  isUnknownSecurity(t) {
    return t === 'SC';
  }

  lockdownGates(tallies){
    let lockdownCorrect = tallies['GA'] === 1
                       && tallies['GB'] === 1
                       && tallies['GC'] === 1
                       && tallies['GD'] === 1;
    return (
      <div className={this.good(lockdownCorrect)}>
        lockdown gates
      </div>
    );
  }

  numberOfTiles(tallies) {
    let numTiles = 0;
    for(let t in tallies){
      if(this.isTile(t)) {
        numTiles += tallies[t];
      }
    }
    return (
      <div className={this.good(numTiles <= 32)}>
        {numTiles} / 32 hex tiles
      </div>
    );
  }

  numberOfExits(tallies) {
    let numExits = tallies['E1'] +
                   tallies['E2'] +
                   tallies['E3'] +
                   tallies['E4'] +
                   tallies['E5'] +
                   tallies['E6'];
    return (
      <div className={this.good(numExits > 0 && numExits <= 4)}>
        {numExits} exits
      </div>
    );
  }

  unknownSecurityTiles(tallies){
    let numTiles = tallies['SC'];
    return (
      <div className={this.good(numTiles <= 32)}>
        {numTiles} unknown security
      </div>
    );
  }

  totalSecurityTiles(tallies){
    let numTiles = tallies['SC']
                 + tallies['GU']
                 + tallies['LO']
                 + tallies['CM'];
    return (
      <div className={this.good(numTiles <= 32)}>
        {numTiles} total security
      </div>
    );
  }

  guards(tallies){
    let numTiles = tallies['GU']
                 + 2 * tallies['G2'];
    return (
      <div className={this.good(numTiles <= 32)}>
        {numTiles} guards
      </div>
    );
  }

  cameras(tallies){
    let numTiles = tallies['CM']
                 + 2* tallies['C2'];
    return (
      <div className={this.good(numTiles <= 15)}>
        {numTiles} cameras
      </div>
    );
  }

  locks(tallies){
    let numTiles = tallies['LO']
                 + 2 * tallies['L2'];
    return (
      <div className={this.good(numTiles <= 10)}>
        {numTiles} locks
      </div>
    );
  }

  jewels(tallies){
    let numTiles = tallies['JW'];
    return (
      <div className={this.good(numTiles <= 4)}>
        {numTiles} jewels
      </div>
    );
  }

  cash(tallies){
    let totalCash = tallies['$1']
                  + 2 * tallies['$2']
                  + 3 * tallies['$3'];
    return (
      <div className={this.good(totalCash <= 15)}>
        ${totalCash}k total cash
      </div>
    );
  }

  tallyUp(){
    let tallies = {};
    for(let t in tileData) {
      tallies[t] = 0;
    }
    for(let i in this.props.tiles) {
      let t = this.props.tiles[i];
      tallies[t]++;
    }
    return tallies;
  }

  render() {
    let tallies = this.tallyUp();
    return (
      <div className="statusbox">
        { this.numberOfTiles(tallies) }
        { this.numberOfExits(tallies) }
        { this.lockdownGates(tallies) }
        { this.unknownSecurityTiles(tallies) }
        { this.guards(tallies) }
        { this.cameras(tallies) }
        { this.locks(tallies) }
        { this.unknownSecurityTiles(tallies) }
        { this.totalSecurityTiles(tallies) }
        { this.jewels(tallies) }
        { this.cash(tallies) }
      </div>
    );
  }
}

export default Checklist;
