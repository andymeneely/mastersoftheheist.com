import React from 'react';
import ManageButtons from './manageButtons';
import ScenarioMap from './scenarioMap';
import ShiftTools from './shiftTools';
import Checklist from './checklist';
import TextMap from './textMap';
import StatusBar from './statusBar';
import Tilebox from './tilebox';
import Gallery from './gallery';
import {decompressFromEncodedURIComponent as decompress} from 'lz-string';
import {saveSvgAsPng} from 'save-svg-as-png';
import {svgAsPngUri} from 'save-svg-as-png';
import tileData from './tileData';
import './designer.scss';

class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.loadOrInit(props.savekey);
  }

  initialState(){
    return {
      tiles: Array(100).fill('GP'),
      undoHistory: [],
      redoHistory: [],
      activeType: 'EM',
      showGrid: true,
      lastAction: '',
      hoverHex: ''
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
      showGrid: true,
      lastAction: '',
      hoverHex: ''
    };
  }

  makeSaveString(i) {
    return this.state.tiles.join(' ');
  }

  onHexClick(i){
    const tiles = this.state.tiles.slice();
    if(tiles[i] === this.state.activeType) { return; } // tile already there!
    let hist = this.state.undoHistory;
    hist.push(tiles.slice());
    tiles[i] = this.state.activeType;
    const hex_name = tileData[tiles[i]]['name']
    this.setState({
      tiles: tiles,
      undoHistory: hist,
      redoHistory: [],
      lastAction: `Place ${hex_name}`,
      hoverHex: hex_name
    });
  }

  onClearClick(i){
    const hist = this.state.undoHistory;
    hist.push(this.state.tiles.slice());
    this.setState({
      tiles: Array(100).fill('GP'),
      undoHistory: hist,
      redoHistory: [],
      lastAction: `Clear`
    });
  }

  onTypeClick(hexType){
    this.setState({
      activeType: hexType,
      lastAction: `Use ${tileData[hexType]['name']}`
    });
  }

  onShowGridClick(){
    this.setState({
      showGrid: !this.state.showGrid,
      lastAction: `Toggle grid`
    });
  }

  onUndoClick(){
    const undoHist = this.state.undoHistory;
    const redoHist = this.state.redoHistory;
    const oldTiles = undoHist.pop().slice();
    redoHist.push(this.state.tiles.slice());
    this.setState({
      tiles: oldTiles,
      undoHistory: undoHist,
      lastAction: `Undo`
    });
  }

  onRedoClick(){
    const redoHist = this.state.redoHistory;
    const undoHist = this.state.undoHistory;
    const oldTiles = redoHist.pop().slice();
    undoHist.push(this.state.tiles.slice());
    this.setState({
      tiles: oldTiles,
      redoHistory: redoHist,
      undoHistory: undoHist,
      lastAction: `Redo`
    });
  }

  onSaveClick(){
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
    // a.click();
    // saveSvgAsPng(svg);
    const options = {
      width: 500,
      height: 500
    };
    svgAsPngUri(svg, options).then(uri => {
      console.log(uri);
    });
    this.setState({
      lastAction: `Saved SVG file`
    });
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
      activeType: codes[i],
      lastAction: `Use ${tileData[codes[i]]['name']}`
    });
  }

  // on shifting the entire board up or down
  // We're assuming we have a square board with stride x stride rows/cols
  onShiftClick(dir){
    const hist = this.state.undoHistory;
    hist.push(this.state.tiles.slice());
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
      tiles: sTiles,
      undoHistory: hist,
      lastAction: `shift ${dir}`
    });
  }

  onHoverHex(t) {
    if(t in tileData) {
      this.setState({
        hoverHex: tileData[t]['name']
      });
    } else {
      this.setState({
        hoverHex: ''
      });
    }
  }

  onExpand(){
    const hist = this.state.undoHistory;
    hist.push(this.state.tiles.slice());
    let oldStride = Math.sqrt(this.state.tiles.length);
    let oldTiles = this.state.tiles.slice();
    let newStride = oldStride + 1;
    let newTiles = Array(newStride*newStride).fill('GP');
    let oldI = 0;
    for(let i = 0; i < newTiles.length; i++){
      let rightEdge = i % newStride === oldStride;
      let bottomRow = i >= newStride * oldStride;
      if(!rightEdge && !bottomRow) {
        newTiles[i] = oldTiles[oldI];
        oldI++;
      }
    }
    this.setState({
      tiles: newTiles,
      undoHistory: hist
    });
  }

  onShrink(){
    const hist = this.state.undoHistory;
    hist.push(this.state.tiles.slice());
    let oldTiles = this.state.tiles.slice();
    let oldStride = Math.sqrt(oldTiles.length);
    let newStride = oldStride - 1;
    let newTiles = Array(newStride*newStride).fill('GP');
    let newI = 0;
    for(let i = 0; i < oldTiles.length; i++){
      let rightEdge = i % oldStride === newStride;
      let bottomRow = i >= newStride * oldStride;
      if(!rightEdge && !bottomRow) {
        newTiles[newI] = oldTiles[i];
        newI++;
      }
    }
    this.setState({
      tiles: newTiles,
      undoHistory: hist
    });
  }

  onGalleryClick(savekey){
    let newState = this.loadOrInit(savekey);
    const hist = this.state.undoHistory;
    hist.push(this.state.tiles.slice());
    newState['undoHistory'] = hist;
    this.setState(newState);
  }

  render() {
    return (
      <div className="designer">
        <div className="toprow">
          <Tilebox onTypeClick={(e) => this.onTypeClick(e)}
                   activeType={this.state.activeType}
                   onHoverHex={(e) => this.onHoverHex(e)}/>
          <div className="centerArea">
            <ScenarioMap tiles={this.state.tiles}
                         onWheel={(e) => this.onWheel(e)}
                         showGrid={this.state.showGrid}
                         onHexClick={(e) => this.onHexClick(e)}
                         onHoverHex={(e) => this.onHoverHex(e)} />
            <StatusBar lastAction={this.state.lastAction}
                       hoverHex={this.state.hoverHex} />
          </div>
          <div className="columnBox">
            <ManageButtons onClearClick={(e) => this.onClearClick(e)}
                           onSaveClick={(e) => this.onSaveClick(e)}
                           onShowGridClick={(e) => this.onShowGridClick(e)}
                           showGrid={this.state.showGrid}
                           onUndoClick={(e) => this.onUndoClick(e)}
                           undoHistory={this.state.undoHistory}
                           onRedoClick={(e) => this.onRedoClick(e)}
                           redoHistory={this.state.redoHistory}
                           onExpand={(e) => this.onExpand(e)}
                           onShrink={(e) => this.onShrink(e)}
                           />
            <Checklist tiles={this.state.tiles}/>
            <ShiftTools onShiftClick={(e) => this.onShiftClick(e)}/>
            <Gallery onGalleryClick={(e) => this.onGalleryClick(e)}/>
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
