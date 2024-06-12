//TODO: here goes the actual map with the imag and the overlayed tokens

import { Layer, Stage } from "react-konva";
import Token from "../Token";
import Scenario from "../Scenario";
import Grid from "../Grid";


interface Props {
    showGrid: boolean;
    backgroundImgPath: string;
}

const BattleMap = ({showGrid, backgroundImgPath}: Props) => {


  const startingPos = {
    x: 500,
    y: 5,
  };

  const fixedWidth = 1500;
  const fixedHeight = 1500;

//   const imgPath = map;
  console.log("EEEEEE", backgroundImgPath);
  
  
  return (
    <Stage width={fixedWidth} height={fixedHeight}>
      <Layer>
        <Scenario imgPath={backgroundImgPath}/>
      </Layer>
      {showGrid && <Grid />}
      <Layer>
        <Token {...startingPos} />
      </Layer>
    </Stage>
  );
};

export default BattleMap;
