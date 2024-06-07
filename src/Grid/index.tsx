import { Layer, Line } from "react-konva";

const Grid = () => {

    const gridSize = 96

    const gridWidth = 1344; //TODO: scale w.r.t. the map
    // const gridHeight = 10;

    const hLines = [];
    const vLines = [];

    for (let i=0; i<gridWidth; i++){
        vLines.push(
            <Line
        strokeWidth={2}
        stroke={'black'}
        points={[i * gridSize, 0, i * gridSize, gridWidth]}
      />
        )
        hLines.push(
            <Line
              strokeWidth={2}
              stroke={'black'}
              points={[0, i * gridSize, gridWidth, i * gridSize]}
            />)
    }

    return (
        <Layer>
            {hLines}
            {vLines}
        </Layer>
    )
}

export default Grid;