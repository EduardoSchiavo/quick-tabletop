//TODO: here goes the actual map with the imag and the overlayed tokens

import { Layer, Stage } from "react-konva";
import Token from "../Token";
import Scenario from "../Scenario";
import Grid from "../Grid";
import { useEffect, useState } from "react";
import { useMapState, useMapDispatch } from "../contexts/MapContext";
import { KonvaPointerEvent } from "konva/lib/PointerEvents";
import { KonvaEventObject } from "konva/lib/Node";

const BattleMap = () => {
  const { showGrid, backgroundImgPath, displayedTokens, gridUnit } =
    useMapState();
  const { setGridUnit, moveToken, deleteToken } = useMapDispatch();

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const handleTokenMove = (key: string, e: KonvaEventObject<DragEvent>) => {
    const x = Math.round(Math.round(e.target.x()) / gridUnit) * gridUnit;
    const y = Math.round(Math.round(e.target.y()) / gridUnit) * gridUnit;
    // UNCOMMENT TO FIX SNAPPING
    const target = e.target;
    target.setPosition({ x, y });
    moveToken(key, x, y);
  };

  return (
    <Stage draggable width={windowWidth} height={windowHeight}>
      <Layer>
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
      <Layer>
        {Object.entries(displayedTokens).map(([key, token], i) => {
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
    </Stage>
  );
};

export default BattleMap;
