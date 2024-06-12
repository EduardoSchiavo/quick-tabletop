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
  tokens: TokenData[];
}

const BattleMap = ({ showGrid, backgroundImgPath, tokens }: Props) => {
  const startingPos = {
    x: 500,
    y: 5,
  };

  const fixedWidth = 1500;
  const fixedHeight = 1500;
  console.log("battlemap", tokens);

  return (
    <Stage width={fixedWidth} height={fixedHeight}>
      <Layer>
        <Scenario imgPath={backgroundImgPath} />
      </Layer>
      {showGrid && <Grid />}
      <Layer>
        {tokens.map((token, index) => {
          return <Token
            key={index}
            name={token.name}
            imgPath={token.imgPath}
            x={startingPos.x}
            y={startingPos.y}
          />;
        })}
      </Layer>
    </Stage>
  );
};

export default BattleMap;
