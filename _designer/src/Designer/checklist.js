import React from 'react';
import tileData from './data/tileData';

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
              + this.countKeys(tallies, 'guardDogs')
              + parseInt(this.props.bag['guards'])
              + parseInt(this.props.bag['cameras'])
              + parseInt(this.props.bag['locks'])
              + parseInt(this.props.bag['dog'])
              + tallies['SC']
    return (
      <div className={this.good(n <= 40)}>
        {n} total security
      </div>
    );
  }

  guards(tallies){
    const n = this.countKeys(tallies, 'guards')
                   + parseInt(this.props.bag['guards'])
                   + parseInt(this.props.bag['keycard'])
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
    const n = this.countKeys(tallies, 'jewel')
                   + parseInt(this.props.bag['jewel'])
    return (
      <div className={this.good(n <= 4)}>
        {n} jewels
      </div>
    );
  }

  keycard(tallies){
    const n = this.countKeys(tallies, 'keycard')
                   + parseInt(this.props.bag['keycard'])
    return (
      <div className={this.good(n <= 1)}>
        {n} keycards
      </div>
    );
  }

  dogs(tallies){
    const n = this.countKeys(tallies, 'guardDogs')
                   + parseInt(this.props.bag['dog'])
    return (
      <div className={this.good(n <= 6)}>
        {n} dogs
      </div>
    );
  }

  docs(tallies){
    const n = this.countKeys(tallies, 'docs')
                   + parseInt(this.props.bag['docs'])
    return (
      <div className={this.good(n <= 4)}>
        {n} documents
      </div>
    );
  }

  usb(tallies){
    const n = this.countKeys(tallies, 'usb')
                   + parseInt(this.props.bag['usb'])
    return (
      <div className={this.good(n <= 1)}>
        {n} USB keys
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

  isNumber(str){
    return !isNaN(parseInt(str))
  }

  isEvent(str){
    return this.isNumber(str.charAt(0))
            || str.charAt(0) === 'A'
            || str.charAt(0) === 'B'
            || str.charAt(0) === 'G'
            || str.charAt(0) === 'M'
  }

  isCrisis(str){ return str.charAt(0) === 'C' || str.charAt(0) === 'Z' }

  events(){
    let n = 0;
    for(let eventRange of this.props.events.split(',')) {
      if(eventRange.length > 0){ // ignore ""
        if(eventRange.includes('-')){
          let [lower, upper] = eventRange.split('-')
          lower = parseInt(lower);
          upper = parseInt(upper);
          if(!isNaN(lower) && !isNaN(upper)){
            n += upper - lower + 1
          } else {
            console.log(`Event range parse error on: ${eventRange}`)
          }
        } else { // just a single card
          if(this.isEvent(eventRange)){
            n++;
          }
        }
      }
    }
    return(
      <div className={this.good(n >= 0)}>
        {n} events
      </div>
    )
  }

  crises(){
    let n = 0;
    for(let eventRange of this.props.events.split(',')) {
      if(eventRange.length > 0 && this.isCrisis(eventRange)){
            n++;
      }
    }
    return(
      <div className={this.good(n >= 0)}>
        {n} crises
      </div>
    )
  }

  render() {
    let tallies = this.tallyUp();
    return (
      <div className="statusbox">
        { this.numberOfHexTiles(tallies) }
        { this.numberOfExits(tallies) }
        { this.guards(tallies) }
        { this.cameras(tallies) }
        { this.locks(tallies) }
        { this.dogs(tallies) }
        { this.totalSecurity(tallies) }
        { this.jewels(tallies) }
        { this.cash(tallies) }
        { this.keycard(tallies) }
        { this.docs(tallies) }
        { this.usb(tallies) }
        { this.events(tallies) }
        { this.crises(tallies) }
        { this.unknownSecurityTiles(tallies) }
        { this.bagSize(tallies)}
        { this.lockdownGates(tallies) }
      </div>
    );
  }
}

export default Checklist;
