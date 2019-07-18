import React from 'react';

class ManageButtons extends React.Component {
  render(){
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
      </div>
    );
  }
}

export default ManageButtons;
