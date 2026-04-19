import { Layer, Line, Circle, Text } from "react-konva";

interface Point {
  x: number;
  y: number;
}

interface Props {
  startPoint: Point | null;
  endPoint: Point | null;
  gridUnit: number;
}

const MeasurementTool = ({ startPoint, endPoint, gridUnit }: Props) => {
  if (!startPoint || !endPoint) {
    return null;
  }

  const midX = (startPoint.x + endPoint.x) / 2;
  const midY = (startPoint.y + endPoint.y) / 2;

  // Chebyshev distance: max of X/Y grid squares, each square = 5ft
  const gridDx = Math.abs(Math.round(endPoint.x / gridUnit) - Math.round(startPoint.x / gridUnit));
  const gridDy = Math.abs(Math.round(endPoint.y / gridUnit) - Math.round(startPoint.y / gridUnit));
  const chebyshevSquares = Math.max(gridDx, gridDy);
  const distanceFt = chebyshevSquares * 5;

  return (
    <Layer name="measurement">
      <Line
        points={[startPoint.x, startPoint.y, endPoint.x, endPoint.y]}
        stroke="yellow"
        strokeWidth={3}
        dash={[10, 5]}
      />
      <Circle
        x={startPoint.x}
        y={startPoint.y}
        radius={6}
        fill="yellow"
        stroke="black"
        strokeWidth={1}
      />
      <Circle
        x={endPoint.x}
        y={endPoint.y}
        radius={6}
        fill="yellow"
        stroke="black"
        strokeWidth={1}
      />
      <Text
        x={midX - 30}
        y={midY - 20}
        text={`${distanceFt} ft`}
        fontSize={18}
        fontStyle="bold"
        fill="yellow"
        stroke="black"
        strokeWidth={0.5}
      />
    </Layer>
  );
};

export default MeasurementTool;
