import React from 'react';
import ManageButtons from './manageButtons';
import ScenarioMap from './scenarioMap';
import ShiftTools from './shiftTools';
import Checklist from './checklist';
import TextMap from './textMap';
import StatusBar from './statusBar';
import Namer from './namer';
import Tilebox from './tilebox';
import Gallery from './gallery';
import {decompressFromEncodedURIComponent as decompress} from 'lz-string';
import {compressToEncodedURIComponent as compress} from 'lz-string';
import {saveSvgAsPng} from 'save-svg-as-png';
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
      hoverHex: '',
      name: '',
      nameX: 0,
      nameY: 0
    };
  }

  loadOrInit(savekey) {
    if(savekey == null || savekey.length === 0 ) { // init
      return this.initialState();
    }
    let [nameURI, nameX, nameY, comp_tile_str] = savekey.split('|');
    if(savekey.indexOf('|') < 0) { // has no title - legacy savekeys
      comp_tile_str = nameURI;
      nameURI = '';
      nameX = 0;
      nameY = 0
    }
    let tile_str = decompress(comp_tile_str); // load
    if(tile_str == null || tile_str.length === 0){ //decompressing went awry
      console.log(`Savekey ${savekey} failed to decompress properly.`)
      return this.initialState();
    }
    return {
      tiles: tile_str.split(' '),
      undoHistory: [],
      redoHistory: [],
      activeType: 'EM',
      showGrid: true,
      lastAction: '',
      hoverHex: '',
      name: this.scrub(nameURI.replace(/\+/g,' ')),
      nameX: parseInt(nameX),
      nameY: parseInt(nameY)
    };
  }

  makeSaveString() {
    let savekey = this.state.name.slice().replace(/\s/g,'+');
    savekey += '|';
    savekey += this.state.nameX;
    savekey += '|';
    savekey += this.state.nameY;
    savekey += '|';
    savekey += compress(this.state.tiles.join(' '));
    return savekey;
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

  makeFilename() {
    if(this.state.name) {
      const n = this.state.name.trim().toLowerCase();
      return n.replace(/\s/g, "-");
    } else {
      return 'scenario';
    }
  }

  onSaveClick(){
    var svg = document.querySelector(".scenariomap>svg");
    var serializer = new XMLSerializer();
    var svg_blob = new Blob([serializer.serializeToString(svg)],
                          {'type': "image/svg+xml"});
    var url = URL.createObjectURL(svg_blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("download", `${this.makeFilename()}.svg`);
    a.setAttribute("href", url);
    a.style["display"] = "none";
    a.click();
    this.setState({
      lastAction: `Saved SVG file`
    });
  }

  onSavePNGClick(){
    var svg = document.querySelector(".scenariomap>svg");
    const opts = {
      top: -30,
      scale: 5,
      backgroundColor: '#fff'
    };
    saveSvgAsPng(svg, `${this.makeFilename()}.png`, opts);
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
      case 'upleft':
        for(let i = 0; i < len; i++){
          sTiles[i] = tiles[(i + stride + (Math.floor(i / stride) % 2)) % len];
        }
        break;
      case 'upright':
        for(let i = 0; i < len; i++){
          sTiles[i] = tiles[(i + stride - 1 + (Math.floor(i / stride) % 2)) % len];
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
      case 'downleft':
        for(let i = 0; i < len; i++){
          sTiles[i] = tiles[(i + stride * (stride - 1) + (Math.floor(i / stride) % 2)) % len];
        }
        break;
      case 'downright':
        for(let i = 0; i < len; i++){
          sTiles[i] = tiles[(i + stride * (stride - 1) - 1 + (Math.floor(i / stride) % 2)) % len];
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

  scrub(str){
    return str.replace(/[^a-zA-Z0-9\s:']/g,'').substring(0, 40);
  }

  onNameChange(e){
    this.setState({
      name: this.scrub(e.target.value),
    });
  }

  onNudgeName(dir){
    this.setState((state, props) => {
      let nameX = state.nameX;
      let nameY = state.nameY;
      const delta = 5;
      switch(dir){
        case 'up': nameY-=delta; break;
        case 'down': nameY+=delta; break;
        case 'left': nameX-=delta; break;
        case 'right': nameX+=delta; break;
        default: break;
      }
      return {
        nameX: nameX,
        nameY: nameY
      }
    });
  }

  render() {
    return (
      <div className="designer">
        <div className="toprow">
          <Tilebox onTypeClick={(e) => this.onTypeClick(e)}
                   activeType={this.state.activeType}
                   onHoverHex={(e) => this.onHoverHex(e)}
                   />
          <div className="centerArea">
            <ScenarioMap tiles={this.state.tiles}
                         onWheel={(e) => this.onWheel(e)}
                         showGrid={this.state.showGrid}
                         onHexClick={(e) => this.onHexClick(e)}
                         onHoverHex={(e) => this.onHoverHex(e)}
                         name={this.state.name}
                         nameX={this.state.nameX}
                         nameY={this.state.nameY}
                         />
            <StatusBar lastAction={this.state.lastAction}
                       hoverHex={this.state.hoverHex}
                       />
          </div>
          <div className="columnBox">
            <ManageButtons onClearClick={(e) => this.onClearClick(e)}
                           onSaveClick={(e) => this.onSaveClick(e)}
                           onSavePNGClick={(e) => this.onSavePNGClick(e)}
                           onShowGridClick={(e) => this.onShowGridClick(e)}
                           showGrid={this.state.showGrid}
                           onUndoClick={(e) => this.onUndoClick(e)}
                           undoHistory={this.state.undoHistory}
                           onRedoClick={(e) => this.onRedoClick(e)}
                           redoHistory={this.state.redoHistory}
                           onExpand={(e) => this.onExpand(e)}
                           onShrink={(e) => this.onShrink(e)}
                           />
            <Namer onNameChange={(e) => this.onNameChange(e)}
                   onNudgeName={(e) => this.onNudgeName(e)}
                   name={this.state.name}
                   />
            <ShiftTools onShiftClick={(e) => this.onShiftClick(e)}/>
            <Checklist tiles={this.state.tiles}/>
            <Gallery onGalleryClick={(e) => this.onGalleryClick(e)}/>
          </div>
        </div>
        <div className="bottomrow">
          <TextMap savekey={this.makeSaveString()}/>
        </div>
      </div>
    );
  }
}

export default Designer;
