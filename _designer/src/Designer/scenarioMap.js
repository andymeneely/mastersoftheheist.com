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
            fontFamily="Archivo Black"
            fontStyle="italic"
            >{this.props.name}</text>
    );
  }

  renderSecurityBag(){
    const x_0 = this.props.bagX
    const y_0 = this.props.bagY
    const h = 7
    const gap = 2
    const radius = 1
    const w_each = h
    const logoH = h + gap
    var i = 0
    var rows = []
    for(var bagRow in this.props.bag) {
      const n = this.props.bag[bagRow]
      const y = y_0 + i * (h + gap)
      const w = w_each * n
      if(n > 0){
        rows.push(
          <g id="bagRow">
            <rect x={x_0} y={y - 1} width={logoH} height={logoH} fill={`url(#bag${bagRow})`}/>
            <rect x={x_0 + logoH} y={y} width={w} height={h} rx={radius} ry={radius} />
            <text x={x_0 + w + gap + logoH} y={y + h}
              className="bagNum"
              fontFamily="Archivo Narrow" fontSize={h + gap}
              fill="black">{n}</text>
          </g>
        )
        i = i + 1
      }
    }
    return (<g id="bag">{rows}</g>)
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
          key={`pattern-${t}`} />
      )
    }
    defs.push(
      <pattern id="bagguards" key="bagguards" patternUnits="objectBoundingBox"
               x="-10%" y="-10%" width="120%" height="120%" viewBox="0 0 72 72"
               dangerouslySetInnerHTML={{
                 __html: require(`!!raw-loader!./img/guard.svg`).default
               }} />
    )
    defs.push(
      <pattern id="baglocks" key="baglocks" patternUnits="objectBoundingBox"
               x="-10%" y="-10%" width="120%" height="120%" viewBox="0 0 72 72"
               dangerouslySetInnerHTML={{
                 __html: require(`!!raw-loader!./img/locked.svg`).default
               }} />
    )
    defs.push(
      <pattern id="bagcameras" key="bagcameras" patternUnits="objectBoundingBox"
               x="-10%" y="-10%" width="120%" height="120%" viewBox="0 0 72 72"
               dangerouslySetInnerHTML={{
                 __html: require(`!!raw-loader!./img/camera.svg`).default
               }} />
    )
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
            { this.renderSecurityBag() }
            { this.createPatterns() }
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default ScenarioMap;
