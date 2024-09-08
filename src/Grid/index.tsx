import { Layer, Line } from "react-konva";

interface Props {
  gridWidth: number;
  gridHeight: number;
  gridUnit: number;
}

const Grid = ({ gridWidth, gridHeight, gridUnit }: Props) => {
  const hLines = [];
  const vLines = [];

  for (let i = 0; i <= gridWidth / gridUnit; i++) {
    vLines.push(
      <Line
        key={i}
        strokeWidth={2}
        stroke={"black"}
        points={[i * gridUnit, 0, i * gridUnit, gridHeight]}
      />
    );
  }

  for (let i = 0; i <= gridHeight / gridUnit; i++) {
    hLines.push(
      <Line
        key={i}
        strokeWidth={2}
        stroke={"black"}
        points={[0, i * gridUnit, gridWidth, i * gridUnit]}
      />
    );
  }

  return (
    <Layer>
      {hLines}
      {vLines}
    </Layer>
  );
};

export default Grid;
