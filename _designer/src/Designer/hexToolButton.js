import React from 'react';

class HexToolButton extends React.Component {
  render() {
    var t = this.props.hexType
    var if_active = this.props.isActiveType ? 'active' : ''
    return (
      <button onMouseDown={() => this.props.onHexButtonClick(t)}
              onMouseOver={() => this.props.onHoverHex(t)}
              className={"hexbutton " + if_active}
              >
      <img src={this.props.svgurl}
           alt={`Hex button ${t}`}
           draggable={false}
      />
    </button>
   )
  }
}

export default HexToolButton;