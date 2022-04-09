import React from 'react';

class HexToolButton extends React.Component {
  render() {
    var t = this.props.hexType
    var if_active = this.props.isActiveType ? 'active' : ''
    return (
      <button onMouseDown={() => this.props.onHexButtonClick(t)}
              onMouseOver={() => this.props.onHoverHex(t)}
              className={"hexbutton " + if_active}>
        <svg viewBox='0 0 150 150'
             dangerouslySetInnerHTML={{__html: this.props.svgstr}}>
        </svg>
    </button>
   )
  }
}

export default HexToolButton;
