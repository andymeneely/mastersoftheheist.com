import React from 'react';

class ManageButtons extends React.Component {
  render(){
    return (
      <div className="manage-buttons">
        <button onClick={() => this.props.onClearClick()}>Clear</button>
        <button onClick={() => this.props.onSaveClick()}>Save SVG</button>
        <button onClick={() => this.props.onSavePNGClick()}>Save PNG</button>
        <button onClick={() => this.props.onUndoClick()}
                disabled={this.props.undoHistory.length === 0}>
          ⟲ Undo
        </button>
        <button onClick={() => this.props.onRedoClick()}
                disabled={this.props.redoHistory.length === 0}>
          ⟳ Redo
        </button>
        <button onClick={() => this.props.onExpand()}>
           ⇲ Expand
        </button>
        <button onClick={() => this.props.onShrink()}>
          ⇱ Shrink
        </button>
        <label>
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
