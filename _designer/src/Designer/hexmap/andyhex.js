export default function AndyHex(props){
  const x = props.x
  const y = props.y
  const r = props.r
  const r2 = props.r / 2.0
  const q = props.r * 0.86602540378 // r * sqrt(3) / 2
  return <polygon
    points={[
      [x    , y - r],
      [x - q, y - r2],
      [x - q, y + r2],
      [x    , y + r],
      [x + q, y + r2],
      [x + q, y - r2]
    ]}
    fill={"#000000"}
    stroke="#ff0000"
  />


}