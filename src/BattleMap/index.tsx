//TODO: here goes the actual map with the imag and the overlayed tokens

import { Layer, Stage } from "react-konva";
import Token from "../Token";
import Scene from "../Scenario";


const BattleMap = () => {



    const startingPos = {
        x:500, y:5
    }

    return <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer> 
        <Scene/> 
        </Layer>
        <Layer>
        <Token {...startingPos}/>
        </Layer>
    </Stage>
}

export default BattleMap;