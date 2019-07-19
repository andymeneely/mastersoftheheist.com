import React from 'react';
import ManageButtons from './manageButtons';
import ScenarioMap from './scenarioMap';
import ShiftTools from './shiftTools';
import StatusBox from './statusBox';
import TextMap from './textMap';
import Tilebox from './tilebox';
import {decompressFromEncodedURIComponent as decompress} from 'lz-string';
import tileData from './tileData';
import './designer.scss';

class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.loadOrInit(props.savekey);
    this.handleHexClick = this.handleHexClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleTypeClick = this.handleTypeClick.bind(this);
    this.handleShowGridClick = this.handleShowGridClick.bind(this);
    this.handleShiftClick = this.handleShiftClick.bind(this);
    this.handleUndoClick = this.handleUndoClick.bind(this);
    this.handleRedoClick = this.handleRedoClick.bind(this);
    this.onWheel = this.onWheel.bind(this);
  }

  initialState(){
    return {
      tiles: Array(100).fill('GP'),
      undoHistory: [],
      redoHistory: [],
      activeType: 'EM',
      showGrid: true
    };
  }

  loadOrInit(savekey) {
    if(savekey == null || savekey.length === 0 ) { // init
      return this.initialState();
    }
    let save_str = decompress(savekey); // load
    if(save_str == null || save_str.length === 0){ //decompressing went awry
      console.log(`Savekey ${savekey} failed to decompress properly.`)
      return this.initialState();
    }
    return {
      tiles: save_str.split(' '),
      undoHistory: [],
      redoHistory: [],
      activeType: 'EM',
      showGrid: true
    };
  }

  makeSaveString(i) {
    return this.state.tiles.join(' ');
  }

  handleHexClick(i){
    const tiles = this.state.tiles.slice();
    const hist = this.state.undoHistory;
    if(tiles[i] !== this.state.activeType) {
      hist.push(tiles.slice());
    }
    tiles[i] = this.state.activeType;
    this.setState({
      tiles: tiles,
      undoHistory: hist,
      redoHistory: []
    });
  }

  handleClearClick(i){
    const hist = this.state.undoHistory;
    hist.push(this.state.tiles.slice());
    this.setState({
      tiles: Array(100).fill('GP'),
      undoHistory: hist,
      redoHistory: []
    });
  }

  handleTypeClick(hexType){
    this.setState({
      activeType: hexType
    });
  }

  handleShowGridClick(){
    this.setState({
      showGrid: !this.state.showGrid
    });
  }

  handleUndoClick(){
    const undoHist = this.state.undoHistory;
    const redoHist = this.state.redoHistory;
    const oldTiles = undoHist.pop().slice();
    redoHist.push(this.state.tiles.slice());
    this.setState({
      tiles: oldTiles,
      undoHistory: undoHist
    });
  }

  handleRedoClick(){
    const redoHist = this.state.redoHistory;
    const undoHist = this.state.undoHistory;
    const oldTiles = redoHist.pop().slice();
    undoHist.push(this.state.tiles.slice());
    this.setState({
      tiles: oldTiles,
      redoHistory: redoHist,
      undoHistory: undoHist
    });
  }

  handleSaveClick(){
    var svg = document.querySelector(".scenariomap>svg");
    var serializer = new XMLSerializer();
    var svg_blob = new Blob([serializer.serializeToString(svg)],
                          {'type': "image/svg+xml"});
    var url = URL.createObjectURL(svg_blob);
    // var svg_win = window.open(url, "svg_win");
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("download", "scenario.svg");
    a.setAttribute("href", url);
    a.style["display"] = "none";
    a.click();
  }

  onWheel(e){ // cycle through tools
    let codes = Object.keys(tileData);
    let i = codes.indexOf(this.state.activeType);
    if(e.deltaY > 0){
      i++;
    } else {
      i--;
    }
    i = (i + codes.length ) % codes.length; // Wrap around
    this.setState({
      activeType: codes[i]
    });
  }

  // handle shifting the entire board up or down
  // We're assuming we have a square board with stride x stride rows/cols
  handleShiftClick(dir){
    let stride = Math.sqrt(this.state.tiles.length);
    let len = this.state.tiles.length;
    let tiles = this.state.tiles;
    let sTiles = Array(len).fill('GP'); //s(hifted)Tiles
    switch(dir){
      case 'up':
        for(let i = 0; i < len; i++){
          sTiles[i] = tiles[(i + 2 * stride) % len];
        }
        break;
      case 'down':
        for(let i = 0; i < len; i++){
          sTiles[i] = tiles[(i + 2 * stride * (stride - 1)) % len];
        }
        break;
      case 'left':
        for(let i = 0; i < len; i++){
          let row = Math.floor(i / stride);
          sTiles[i] = tiles[(i + stride + 1) % stride + row * stride ];
        }
        break;
      case 'right':
        for(let i = 0; i < len; i++){
          let row = Math.floor(i / stride);
          sTiles[i] = tiles[(i + stride - 1) % stride + row * stride ];
        }
        break;
      default:
        console.log(`ERROR! Shift click not recognized: ${dir}`)
    }
    this.setState({
      tiles: sTiles
    });
  }

  render() {
    return (
      <div className="designer">
        <div className="toprow">
          <Tilebox onTypeClick={this.handleTypeClick}
                   activeType={this.state.activeType} />
          <ScenarioMap tiles={this.state.tiles}
                       onWheel={this.onWheel}
                       showGrid={this.state.showGrid}
                       onHexClick={this.handleHexClick}/>
          <div className="columnBox">
            <ManageButtons onClearClick={this.handleClearClick}
                           onSaveClick={this.handleSaveClick}
                           onShowGridClick={this.handleShowGridClick}
                           showGrid={this.state.showGrid}
                           onUndoClick={this.handleUndoClick}
                           undoHistory={this.state.undoHistory}
                           onRedoClick={this.handleRedoClick}
                           redoHistory={this.state.redoHistory}
                           />
            <StatusBox tiles={this.state.tiles}/>
            <ShiftTools onShiftClick={this.handleShiftClick}/>
          </div>
        </div>
        <div className="bottomrow">
          <TextMap value={this.makeSaveString()}/>
        </div>
      </div>
    );
  }
}

export default Designer;
