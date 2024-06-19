//TODO: here goes the actual map with the imag and the overlayed tokens

import { Layer, Stage } from "react-konva";
import Token from "../Token";
import Scenario from "../Scenario";
import Grid from "../Grid";
import { useEffect, useState } from "react";

interface TokenData {
  name: string;
  imgPath: string;
}

interface Props {
  showGrid: boolean;
  backgroundImgPath: string;
  tokens: object;
  deleteToken: (key: any) => void;
}

const BattleMap = ({
  showGrid,
  backgroundImgPath,
  tokens,
  deleteToken,
}: Props) => {
  const initialGridUnit = 96;
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [gridUnit, setGridUnit] = useState(initialGridUnit);


  const startingPos = {
    x: gridUnit,
    y: gridUnit,
  };

  const gridWidth = 14 * gridUnit;
  const gridHeight = 9 * gridUnit;

  const handleDeletion = (key: number) => {
    deleteToken(key);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setWindowHeight(newHeight);
      setWindowWidth(newWidth);
      const newGridUnit = Math.min(
        initialGridUnit,
        newWidth / 14, 
        newHeight / 9
      );

      setGridUnit(newGridUnit)
    })
  }, []);

  return (
    <Stage width={windowWidth} height={windowHeight}>
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
        {Object.entries(tokens).map(([key, token], i) => {
          return (
            <Token
              key={key}
              id={key}
              name={token.name}
              imgPath={token.imgPath}
              x={startingPos.x + (i % 3) * gridUnit}
              y={startingPos.y + (i % 2) * gridUnit}
              gridUnit={gridUnit}
              handleDeletion={handleDeletion}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default BattleMap;
