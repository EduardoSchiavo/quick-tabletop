//TODO: here goes the actual map with the imag and the overlayed tokens

import { Layer, Stage } from "react-konva";
import Token from "../Token";
import Scenario from "../Scenario";
import Grid from "../Grid";

const BattleMap = () => {
  const startingPos = {
    x: 500,
    y: 5,
  };

  const fixedWidth = 1500;
  const fixedHeight = 1500;

  return (
    <Stage width={fixedWidth} height={fixedHeight}>
      <Layer>
        <Scenario />
      </Layer>
      <Grid />
      <Layer>
        <Token {...startingPos} />
      </Layer>
    </Stage>
  );
};

export default BattleMap;
