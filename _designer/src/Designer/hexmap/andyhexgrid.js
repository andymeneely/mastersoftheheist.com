import AndyHex from "./andyhex";

export default function AndyHexGrid(props){
  let hexes = []
  const sqrt3 = 1.73205080757; // sqrt(3)
  const sqrt3p2 = 0.86602540378 // sqrt(3) / 2
  const r = 800.0 / ( props.stride * 2 )
  const gap = 2;
  let i = 0

  for(let row = 0; row < props.stride; row++) {
    for(let col = 0; col < props.stride; col++){
      let shift = row % 2 == 0 ? r : sqrt3p2 * r + r;
      hexes.push(<AndyHex
        i={i}
        x={col * (sqrt3 * r + gap) + shift}
        y={row * (1.5 * r + gap) }
        r={r}
        key={i}
        />)
        i++;
      }
  }

  return <svg width={800} height={600}
              viewBox="0 0 800 600"
              version="1.1" xmlns="http://www.w3.org/2000/svg">
    {hexes}
  </svg>
}
