import React from 'react';
import tileData from './tileData';

class Checklist extends React.Component {

  good(x){
    return x ? "good" : "bad";
  }

  // A utility method to stay DRY. Goes through the tallies and adds up counts
  // according to the given subkey (e.g. guards, cash, locks)
  //
  countKeys(tallies, subkey){
    const reducer = function(total, pair) {
      const [tileKey, count] = pair
      if(tileData[tileKey][subkey]){ // defined, not zero, etc.
        return total + tileData[tileKey][subkey] * count
      } else {
        return total
      }
    }
    return Object.entries(tallies).reduce(reducer, 0)
  }

  // is it a hex tile? i.e. not a gap or exits
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
    const n = tallies['GA']
            + tallies['GB']
            + tallies['GC']
            + tallies['GD']
    return (
      <div className={this.good(n <= 4)}>
        {n} lockdown gates
      </div>
    );
  }


  numberOfHexTiles(tallies) {
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

  totalSecurity(tallies){
    const n = this.countKeys(tallies, 'guards')
              + this.countKeys(tallies, 'cameras')
              + this.countKeys(tallies, 'locks')
              + tallies['SC']
    return (
      <div className={this.good(n <= 32)}>
        {n} total security
      </div>
    );
  }

  guards(tallies){
    const n = this.countKeys(tallies, 'guards')
                   + parseInt(this.props.bag['guards'])
    return (
      <div className={this.good(n <= 25)}>
        {n} guards
      </div>
    );
  }

  cameras(tallies){
    const n = this.countKeys(tallies, 'cameras')
                   + parseInt(this.props.bag['cameras'])
    return (
      <div className={this.good(n <= 15)}>
        {n} cameras
      </div>
    );
  }

  locks(tallies){
    const n = this.countKeys(tallies, 'locks')
                   + parseInt(this.props.bag['locks'])
    return (
      <div className={this.good(n <= 12)}>
        {n} locks
      </div>
    );
  }

  jewels(tallies){
    const n = tallies['JW']
               + tallies['RXJ']
               + tallies['RYJ']
    return (
      <div className={this.good(n <= 4)}>
        {n} jewels
      </div>
    );
  }

  cash(tallies){
    const t = this.countKeys(tallies, 'cash')
    return (
      <div className={this.good(t <= 12)}>
        ${t}k total cash
      </div>
    );
  }

  bagSize(tallies){
    const reducer = (total, count) => total + parseInt(count)
    const n = Object.values(this.props.bag).reduce(reducer, 0)
    return(
      <div className={this.good(n >= tallies['SC'])}>
        {n} chits in bag
      </div>
    )
  }

  // Count up the frequency of every hex tile
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
        { this.numberOfHexTiles(tallies) }
        { this.numberOfExits(tallies) }
        { this.lockdownGates(tallies) }
        { this.unknownSecurityTiles(tallies) }
        { this.guards(tallies) }
        { this.cameras(tallies) }
        { this.locks(tallies) }
        { this.totalSecurity(tallies) }
        { this.jewels(tallies) }
        { this.cash(tallies) }
        { this.bagSize(tallies)}
      </div>
    );
  }
}

export default Checklist;
