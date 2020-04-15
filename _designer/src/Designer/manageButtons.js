import React from 'react';

class ManageButtons extends React.Component {

  titleTextUndo(){
    if(this.props.undoHistory.length == 0) {
      return 'Nothing to undo'
    } else {
      return `Undo ${this.props.lastAction}`
    }
  }

  titleTextRedo(){
    return (this.props.redoHistory.length == 0) ? 'Nothing to redo' : 'Redo';
  }

  render(){
    return (
      <div className="manage-buttons">
        <button onClick={() => this.props.onUndoClick()}
                disabled={this.props.undoHistory.length === 0}
                title={this.titleTextUndo()}>
          ⟲ Undo
        </button>
        <button onClick={() => this.props.onRedoClick()}
                disabled={this.props.redoHistory.length === 0}
                title={this.titleTextRedo()}>
          ⟳ Redo
        </button>
        <button onClick={() => this.props.onClearClick()}>Clear</button>
        <button onClick={() => this.props.onCopyTTSClick()}
                title='Copy Tabletop Simulator save to clipboard'>
          Copy TTS
        </button>
        <button onClick={() => this.props.onSaveClick()}>Save SVG</button>
        <button onClick={() => this.props.onSavePNGClick()}>Save PNG</button>
        <button onClick={() => this.props.onExpand()}
                title='Expand grid by 1'>
           ⇲ Expand
        </button>
        <button onClick={() => this.props.onShrink()}
                title='Shrink grid by 1'>
          ⇱ Shrink
        </button>
        <label title='Show/Hide hex grid lines'>
          <input type="checkbox"
                 checked={this.props.showGrid}
                 onChange={this.props.onShowGridClick} />
          Show Grid
        </label>
      </div>
    );
  }
}

export default ManageButtons;
