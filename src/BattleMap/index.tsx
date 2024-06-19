//TODO: here goes the actual map with the imag and the overlayed tokens

import { Layer, Stage } from "react-konva";
import Token from "../Token";
import Scenario from "../Scenario";
import Grid from "../Grid";

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

  const gridSize = 96;
  const startingPos = {
    x: gridSize,
    y: gridSize,
  };

  const fixedWidth = 1500;
  const fixedHeight = 1500;
  console.log(tokens);

  const handleDeletion = (key: number) => {
    deleteToken(key);
  };

  return (
    <Stage width={fixedWidth} height={fixedHeight}>
      <Layer>
        <Scenario imgPath={backgroundImgPath} />
      </Layer>
      {showGrid && <Grid />}
      <Layer>
        {Object.entries(tokens).map(([key, token], i) => {
          return (
            <Token
              key={key}
              id={key}
              name={token.name}
              imgPath={token.imgPath}
              x={startingPos.x+(i%3*gridSize)}
              y={startingPos.y+(i%2*gridSize)}
              handleDeletion={handleDeletion}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default BattleMap;
