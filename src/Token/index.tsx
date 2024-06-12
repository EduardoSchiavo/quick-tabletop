// import sampleToken from 'assets/sampletoken.png' //TODO: add image
// import sampleToken from '../assets/dryf.jpg' //TODO: add image

import useImage from 'use-image';
import { Image } from 'react-konva';
import { useState } from 'react';


interface Props {
    name: string;
    imgPath: string;
    x: number;
    y: number;
}

const Token = ({name, imgPath, x, y}: Props) => {
    const [image] = useImage(imgPath);
    const [position, setPosition] = useState({x, y})
    console.log(name)

    const gridSize = 96; 

    const handleDragEnd = ()=>{
      
      const newX: number = Math.round(Math.round(position.x) / gridSize )*gridSize;
      const newY: number = Math.round(Math.round(position.y) / gridSize )*gridSize;

      setPosition({x:newX, y:newY})}

    return <Image  draggable 
    width={96} height={96} x={position.x} y={position.y} 
    onDragMove={(e) => setPosition({
      x: e.target.x(),
      y: e.target.y()
  })}
    onDragEnd={handleDragEnd}
    image={image} />;
  };

export default Token;