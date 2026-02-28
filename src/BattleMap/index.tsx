//TODO: here goes the actual map with the imag and the overlayed tokens

import { Layer, Stage } from "react-konva";
import Token from "../Token";
import Scenario from "../Scenario";
import Grid from "../Grid";
import MeasurementTool from "../MeasurementTool";
import AreaTemplate from "../AreaTemplate";
import { useEffect, useRef, useState } from "react";
import { useMapState, useMapDispatch } from "../contexts/MapContext";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";

interface Point {
  x: number;
  y: number;
}

interface BattleMapProps {
  measuring: boolean;
  stageScale: number;
  stagePosition: Point;
  onStageScaleChange: (scale: number) => void;
  onStagePositionChange: (pos: Point) => void;
}

const BattleMap = ({
  measuring,
  stageScale,
  stagePosition,
  onStageScaleChange,
  onStagePositionChange,
}: BattleMapProps) => {
  const { showGrid, backgroundImgPath, displayedTokens, gridUnit, areaTemplates } =
    useMapState();
  const { moveToken, deleteToken, moveAreaTemplate, deleteAreaTemplate } = useMapDispatch();

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [measureStart, setMeasureStart] = useState<Point | null>(null);
  const [measureEnd, setMeasureEnd] = useState<Point | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const stageRef = useRef<Konva.Stage>(null);

  const gridWidth = 14 * gridUnit;
  const gridHeight = 9 * gridUnit;

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setWindowHeight(newHeight);
      setWindowWidth(newWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clear measurement points when measuring mode is turned off
  useEffect(() => {
    if (!measuring) {
      setMeasureStart(null);
      setMeasureEnd(null);
      setIsMouseDown(false);
    }
  }, [measuring]);

  const getStagePointerPosition = (): Point | null => {
    const stage = stageRef.current;
    if (!stage) return null;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return null;
    const transform = stage.getAbsoluteTransform().copy().invert();
    return transform.point(pointerPos);
  };

  const handleTokenMove = (key: string, e: KonvaEventObject<DragEvent>) => {
    const x = Math.round(Math.round(e.target.x()) / gridUnit) * gridUnit;
    const y = Math.round(Math.round(e.target.y()) / gridUnit) * gridUnit;
    // UNCOMMENT TO FIX SNAPPING
    const target = e.target;
    target.setPosition({ x, y });
    moveToken(key, x, y);
  };

  const handleAreaTemplateDragEnd = (id: string, e: KonvaEventObject<DragEvent>) => {
    const x = Math.round(Math.round(e.target.x()) / gridUnit) * gridUnit;
    const y = Math.round(Math.round(e.target.y()) / gridUnit) * gridUnit;
    const target = e.target;
    target.setPosition({ x, y });
    moveAreaTemplate(id, x, y);
  };

  const handleMouseDown = (_e: KonvaEventObject<MouseEvent>) => {
    if (!measuring) return;
    const pos = getStagePointerPosition();
    if (!pos) return;
    setMeasureStart(pos);
    setMeasureEnd(null);
    setIsMouseDown(true);
  };

  const handleMouseMove = (_e: KonvaEventObject<MouseEvent>) => {
    if (!measuring || !isMouseDown || !measureStart) return;
    const pos = getStagePointerPosition();
    if (!pos) return;
    setMeasureEnd(pos);
  };

  const handleMouseUp = (_e: KonvaEventObject<MouseEvent>) => {
    if (!measuring) return;
    if (isMouseDown) {
      const pos = getStagePointerPosition();
      if (pos) {
        setMeasureEnd(pos);
      }
    }
    setIsMouseDown(false);
  };

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;

    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    const oldScale = stageScale;
    const scaleBy = 1.1;
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    const clampedScale = Math.min(3.0, Math.max(0.25, newScale));

    const mousePointTo = {
      x: (pointerPos.x - stagePosition.x) / oldScale,
      y: (pointerPos.y - stagePosition.y) / oldScale,
    };

    const newPos = {
      x: pointerPos.x - mousePointTo.x * clampedScale,
      y: pointerPos.y - mousePointTo.y * clampedScale,
    };

    onStageScaleChange(clampedScale);
    onStagePositionChange(newPos);
  };

  const handleDragEnd = () => {
    const stage = stageRef.current;
    if (!stage) return;
    onStagePositionChange({ x: stage.x(), y: stage.y() });
  };

  return (
    <Stage
      ref={stageRef}
      draggable={!measuring}
      width={windowWidth}
      height={windowHeight}
      scaleX={stageScale}
      scaleY={stageScale}
      x={stagePosition.x}
      y={stagePosition.y}
      onWheel={handleWheel}
      onDragEnd={handleDragEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer name="background">
        <Scenario
          height={gridHeight}
          width={gridWidth}
          imgPath={backgroundImgPath}
        />
      </Layer>
      {showGrid && (
        <Grid
          gridHeight={gridHeight}
          gridWidth={gridWidth}
          gridUnit={gridUnit}
        />
      )}
      <Layer name="area-templates">
        {Object.entries(areaTemplates).map(([id, data]) => (
          <AreaTemplate
            key={id}
            id={id}
            data={data}
            gridUnit={gridUnit}
            onDragEnd={(e) => handleAreaTemplateDragEnd(id, e)}
            onDelete={() => deleteAreaTemplate(id)}
          />
        ))}
      </Layer>
      <Layer name="tokens">
        {Object.entries(displayedTokens).map(([key, token]) => {
          return (
            <Token
              key={key}
              id={key}
              name={token.name}
              imgPath={token.imgPath}
              x={token.x}
              y={token.y}
              tokenSize={gridUnit}
              handleDoubleClick={() => {
                deleteToken(key);
              }}
              handleDragEnd={(e) => handleTokenMove(key, e)}
              // onDrag={(e) => handleTokenMove(key, e)}
            />
          );
        })}
      </Layer>
      <MeasurementTool
        startPoint={measureStart}
        endPoint={measureEnd}
        gridUnit={gridUnit}
      />
    </Stage>
  );
};

export default BattleMap;
