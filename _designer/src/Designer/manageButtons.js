import React from 'react';

class ManageButtons extends React.Component {
  render(){
    console.log(this.props.tileHistory);
    return (
      <div className="manage-buttons">
        <button onClick={() => this.props.onClearClick()}>Clear</button>
        <button onClick={() => this.props.onSaveClick()}>Save SVG</button>
        <label>
          <input type="checkbox"
                 checked={this.props.showGrid}
                 onChange={this.props.onShowGridClick} />
          Grid
        </label>
        <button onClick={() => this.props.onUndoClick()}
                disabled={this.props.tileHistory.length === 0}>
          ⟲ Undo
        </button>
      </div>
    );
  }
}

export default ManageButtons;
