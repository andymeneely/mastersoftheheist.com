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

  renderEventString(){
    var items = []
    if(this.props.eventStr.length > 0){
      items.push(
        <rect
          key="eventLogoRect"
          x={this.props.eventX - 33}
          y={this.props.eventY - 13}
          width={30} height={30}
          fill={`url(#eventsLogo)`}/>
      )
      items.push(
        <text
          key="eventLogoText"
          x={this.props.eventX}
          y={this.props.eventY}
          className="events"
          fontFamily="Archivo Narrow"
          fontSize="10"
          >{this.props.eventStr}</text>
      )
    }
    return (<g>{items}</g>)
  }

  renderDifficulty(){
    const logo = {
      'A':"url(#amateurLogo)",
      'S':"url(#semiproLogo)",
      'P':"url(#proLogo)",
    }
    return (
      <rect
        key="difficulty"
        x='300'
        y='-15'
        width={30} height={30}
        fill={logo[this.props.difficulty]}/>
    )
  }

  renderSecurityBag(){
    const x_0 = this.props.bagX
    const y_0 = this.props.bagY
    const h = 9
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
          <g id="bagRow" key={`bagRow${i}`}>
            <rect x={x_0}         y={y - 1} width={logoH} height={logoH} fill={`url(#bag${bagRow})`}/>
            <rect x={x_0 + logoH} y={y}     width={w}     height={h} rx={radius} ry={radius} />
            <text x={x_0 + w + gap + logoH} y={y + h}
              className="bagNum"
              fontFamily="Archivo Narrow" fontSize={h + gap}
              fill="black">{n}</text>
          </g>
        )
        i = i + 1
      }
    }
    if(rows.length > 0){
      const logo_size = rows.length * logoH
      rows.push(
        <rect x={x_0 - logo_size/1.3}  y={y_0}
              width={logo_size} height={logo_size}
              key="bagLogoRect"
              fill={`url(#baglogo)`}/>
      )
    }
    return (
      <g id="bag">
        {rows}
      </g>
    )
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
    defs.push(
      <pattern id="baglogo" key="baglogo" patternUnits="objectBoundingBox"
               x="0" y="0" width="120%" height="120%" viewBox="0 0 300 300"
               dangerouslySetInnerHTML={{
                 __html: require(`!!raw-loader!./img/security_bag.svg`).default
               }} />
    )
    defs.push(
      <pattern id="eventsLogo" key="eventsLogo" patternUnits="objectBoundingBox"
               x="0" y="0" width="101%" height="101%" viewBox="0 0 300 300"
               dangerouslySetInnerHTML={{
                 __html: require(`!!raw-loader!./img/events_logo.svg`).default
               }} />
    )
    defs.push(
      <pattern id="amateurLogo" key="amateurLogo" patternUnits="objectBoundingBox"
               x="0" y="0" width="101%" height="101%" viewBox="0 0 250 400"
               dangerouslySetInnerHTML={{
                 __html: require(`!!raw-loader!./img/amateur.svg`).default
               }} />
    )
    defs.push(
      <pattern id="semiproLogo" key="semiproLogo" patternUnits="objectBoundingBox"
               x="0" y="0" width="101%" height="101%" viewBox="0 0 250 400"
               dangerouslySetInnerHTML={{
                 __html: require(`!!raw-loader!./img/semi-pro.svg`).default
               }} />
    )
    defs.push(
      <pattern id="proLogo" key="proLogo" patternUnits="objectBoundingBox"
               x="0" y="0" width="101%" height="101%" viewBox="0 0 250 400"
               dangerouslySetInnerHTML={{
                 __html: require(`!!raw-loader!./img/pro.svg`).default
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
            { this.renderEventString() }
            { this.renderDifficulty() }
            { this.createPatterns() }
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default ScenarioMap;
