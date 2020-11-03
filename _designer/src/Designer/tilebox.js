import React from 'react';
import HexToolButton from './hexToolButton';
import tileData from './data/tileData';

class Tilebox extends React.Component {
  render() {
    var hexbuttons = [];
    for(var t in tileData) {

      hexbuttons.push(
        <HexToolButton
           hexType={t}
           svgstr={tileData[t]['svgstr'].default}
           onHexButtonClick={this.props.onTypeClick}
           onHoverHex={this.props.onHoverHex}
           isActiveType={this.props.activeType === t}
           key={`hextool-${t}`}
        />)
    }
    return (
      <div className="tilebox"
           onMouseLeave={() => this.props.onHoverHex('')}>
          {hexbuttons}
      </div>
    );
  }
}

export default Tilebox;
