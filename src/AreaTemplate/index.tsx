import { Circle, Rect, Group } from "react-konva";
import type { AreaTemplateData } from "../types/websocket";
import { KonvaEventObject } from "konva/lib/Node";

interface Props {
  id: string;
  data: AreaTemplateData;
  gridUnit: number;
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
  onDelete: () => void;
}

const AreaTemplate = ({ data, gridUnit, onDragEnd, onDelete }: Props) => {
  const sizeInPixels = data.size * gridUnit;

  if (data.shape === "circle") {
    const radius = sizeInPixels / 2;
    // Use a Group positioned at data.x, data.y (top-left),
    // then draw the circle at center offset within the group.
    return (
      <Group
        x={data.x}
        y={data.y}
        draggable
        onDragEnd={onDragEnd}
        onDblClick={onDelete}
      >
        <Circle
          x={radius}
          y={radius}
          radius={radius}
          fill={data.color}
          opacity={data.opacity}
          stroke={data.color}
          strokeWidth={2}
        />
      </Group>
    );
  }

  return (
    <Rect
      x={data.x}
      y={data.y}
      width={sizeInPixels}
      height={sizeInPixels}
      fill={data.color}
      opacity={data.opacity}
      stroke={data.color}
      strokeWidth={2}
      draggable
      onDragEnd={onDragEnd}
      onDblClick={onDelete}
    />
  );
};

export default AreaTemplate;
