import React from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import tileData from './tileData';

class ScenarioMap extends React.Component {

  renderHexagon(hex, i) {
    const hex_code = this.props.tiles[i];
    const numTiles = this.props.tiles.length;
    const hex_slug = tileData[hex_code]['slug'];
    var stroke_state = this.props.showGrid ? ' grid_show' : ' grid_hide';
    return (
      <Hexagon
        key={`hex-${i}-${numTiles}`}
        className={'hex-' + hex_slug + stroke_state}
        fill={hex_code}
        q={hex.q}
        r={hex.r}
        s={hex.s}
        value={i}
        onClick={() => this.props.onHexClick(i)}
        onMouseOver={() => this.props.onHoverHex(hex_code)}
        draggable={false}
      />
    );
  }

  renderScenarioName(){
    return (
      <text x={this.props.nameX}
            y={this.props.nameY}
            className="scenario-name"
            font-family="Archivo Black"
            font-style="italic"
            >{this.props.name}</text>
    );
  }

  createPatterns(){
    var defs = [];
    for(var t in tileData) {
      defs.push(
        <pattern
          id={t}
          patternUnits="objectBoundingBox"
          x="-10%" y="-10%"
          width="120%"
          height="120%"
          viewBox="0 0 150 150"
          dangerouslySetInnerHTML={{__html: tileData[t]['svgstr'].default}}
          key={`pattern-${t}`}
        >
        </pattern>
      )
    }
    return (<defs>{defs}</defs>)
  }

  render() {
    const stride = Math.sqrt(this.props.tiles.length);
    const hexagons = GridGenerator.rectangle(stride, stride);
    const hexSize = 360.0 / (2 * stride);  // don't ask me why
    const viewBox = `${-hexSize} ${-hexSize} 360 305`
    return (
      <div className="scenariomap"
           onWheel={this.props.onWheel}
           onMouseLeave={() => this.props.onHoverHex('')} >
        <HexGrid viewBox={viewBox}>
          <Layout size={{ x: hexSize,
                          y: hexSize }}
                  spacing={1.03}
                  flat={false}
                  origin={{x: 0, y: 0}}>
            { hexagons.map((hex, i) => this.renderHexagon(hex, i))}
            { this.renderScenarioName() }
            { this.createPatterns() }
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default ScenarioMap;
