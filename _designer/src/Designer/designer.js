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
import SecurityBag from './securityBag';
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
      nameY: 0,
      bag: {
        guards: 0,
        cameras: 0,
        locks: 0,
      },
      bagX: 250,
      bagY: 200,
    };
  }

  loadOrInit(savekey) {
    if(savekey == null || savekey.length === 0 ) { // init
      return this.initialState();
    }
    let save_parts = savekey.split('|')
    let tile_str = decompress(save_parts.pop()) // tilestr always at the last
    var [nameURI, nameX, nameY, guards, cameras, locks, bagX, bagY] = save_parts
    if(save_parts.length < 4) { //legacy - no bag data
      guards = 0; cameras = 0; locks = 0; bagX = 250; bagY = 200
    }
    if(save_parts.length == 0){ // legacy - no title data either
      nameURI = ''; nameX = 0; nameY = 0
    }
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
      nameY: parseInt(nameY),
      bag: {
        guards: guards,
        cameras: cameras,
        locks: locks,
      },
      bagX: parseInt(bagX),
      bagY: parseInt(bagY),
    };
  }

  makeSaveString(compressKey) {
    let savekey = this.state.name.slice().replace(/\s/g,'+');
    savekey += '|';
    savekey += this.state.nameX;
    savekey += '|';
    savekey += this.state.nameY;
    savekey += '|';
    savekey += this.state.bag.guards;
    savekey += '|';
    savekey += this.state.bag.cameras;
    savekey += '|';
    savekey += this.state.bag.locks;
    savekey += '|';
    savekey += this.state.bagX;
    savekey += '|';
    savekey += this.state.bagY;
    savekey += '|';
    if(compressKey) {
      savekey += compress(this.state.tiles.join(' '));
    } else {
      savekey += this.state.tiles.join(' ');
    }
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
      lastAction: ``
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

  /*
    Copy a savestring for the Tabletop Simulator mod.
  */
  onCopyTTSClick(e){
    const ttsSaveString = this.makeSaveString(false);
    console.log('Tabletop Simulator save string being copied: ');
    console.log(ttsSaveString);

    navigator.clipboard.writeText(ttsSaveString);
    this.setState({
      lastAction: 'Copied Tabletop Simulator save to clipboard'
    })
  }

  onSaveClick(){
    const svg = document.querySelector(".scenariomap>svg");
    const svg_blob = new Blob([new XMLSerializer().serializeToString(svg)],
                              {'type': "image/svg+xml"});
    const url = URL.createObjectURL(svg_blob);
    let a = document.createElement("a");
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
      left: -30,
      width: 360,
      height: 305,
      scale: 5, // so technically ~1500x1500
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

  onNudgeName(dir, e){
    const delta = e.ctrlKey ? 25 : 5
    let nameX = this.state.nameX
    let nameY = this.state.nameY
    switch(dir){
      case 'up': nameY-=delta; break;
      case 'down': nameY+=delta; break;
      case 'left': nameX-=delta; break;
      case 'right': nameX+=delta; break;
      default: break;
    }
    this.setState({
      nameX: nameX,
      nameY: nameY
    })
  }

  onNudgeBag(dir, e){
    const delta = e.ctrlKey ? 25 : 5
    let bagX = this.state.bagX;
    let bagY = this.state.bagY;
    switch(dir){
      case 'up': bagY-=delta; break;
      case 'down': bagY+=delta; break;
      case 'left': bagX-=delta; break;
      case 'right': bagX+=delta; break;
      default: break;
    }
    this.setState({
      bagX: bagX,
      bagY: bagY,
    });
  }

  onBagChange(e){
    const newBag = this.state.bag
    newBag[e.target.name] = e.target.value
    this.setState({
      bag: newBag
    })
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
                         bag={this.state.bag}
                         bagX={this.state.bagX}
                         bagY={this.state.bagY}
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
                           onCopyTTSClick={(e) => this.onCopyTTSClick(e)}
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
                           lastAction={this.state.lastAction}
                           />
            <Namer onNameChange={(e) => this.onNameChange(e)}
                   onNudgeName={(dir, e) => this.onNudgeName(dir, e)}
                   name={this.state.name}
                   />
            <ShiftTools onShiftClick={(e) => this.onShiftClick(e)}/>
            <SecurityBag counts={this.state.bag}
                         x={this.state.bagX}
                         y={this.state.bagY}
                         onBagChange={(e) => this.onBagChange(e)}
                         onNudgeBag={(dir, e) => this.onNudgeBag(dir, e)}
                         />
            <Checklist tiles={this.state.tiles}/>
            <Gallery onGalleryClick={(e) => this.onGalleryClick(e)}/>
          </div>
        </div>
        <div className="bottomrow">
          <TextMap savekey={this.makeSaveString(true)}/>
        </div>
      </div>
    );
  }
}

export default Designer;
