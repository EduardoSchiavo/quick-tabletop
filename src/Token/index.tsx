// import sampleToken from 'assets/sampletoken.png' //TODO: add image
import sampleToken from '../assets/dryf.jpg' //TODO: add image

import useImage from 'use-image';
import { Image } from 'react-konva';
import { useState } from 'react';


interface Props {
    x: number;
    y: number;
}

const Token = ({x, y}: Props) => {
    const [image] = useImage(sampleToken);
    const [position, setPosition] = useState({x, y})

    const fixedX=200;
    const fixedY=200;

    return <Image  draggable 
    width={96} height={96} x={position.x} y={position.y} 
    onDragMove={(e) => setPosition({
      x: e.target.x(),
      y: e.target.y()
  })}
    onDragEnd={()=>{setPosition({x:fixedX, y:fixedY})}}
    image={image} />;
  };

export default Token;