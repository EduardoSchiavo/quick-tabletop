import useImage from "use-image";
import { Image } from "react-konva";
import { useMapDispatch, useMapState } from "../contexts/MapContext";
import { KonvaPointerEvent } from "konva/lib/PointerEvents";
import { KonvaEventObject } from "konva/lib/Node";

interface Props {
  id: any;
  name: string;
  imgPath: string;
  tokenSize: number;
  x: number;
  y: number;
  handleDragEnd?: (e: KonvaEventObject<DragEvent>) => void;
  handleDoubleClick?: () => void;
  onDrag?: (e: KonvaEventObject<DragEvent>) => void;
}

const Token = ({
  id,
  name,
  imgPath,
  tokenSize,
  x,
  y,
  handleDoubleClick,
  handleDragEnd,
  onDrag,
}: Props) => {
  const [image] = useImage(imgPath);

  return (
    <Image
      draggable
      width={tokenSize}
      height={tokenSize}
      x={x}
      y={y}
      onDragEnd={handleDragEnd}
      onDblClick={handleDoubleClick}
      onDragMove={onDrag}
      image={image}
      cornerRadius={50}
      stroke="black"
      strokeWidth={5}
    />
  );
};

export default Token;
