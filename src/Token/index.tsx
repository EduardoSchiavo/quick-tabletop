
import useImage from 'use-image';
import { Image } from 'react-konva';
import { useState } from 'react';

interface Position{
  x: number;
  y: number;
}

interface Props {
    // key: string;
    id: any;
    name: string;
    imgPath: string;
    x: number;
    y: number;
    handleDeletion: (key: number, pos: Position)=>void;
}

const Token = ({id, name, imgPath, x, y, handleDeletion}: Props) => {
    const [image] = useImage(imgPath);
    const [position, setPosition] = useState({x, y})
    const gridSize = 96; //TODO: pass as prop

    const handleDragEnd = ()=>{

      const newX: number = Math.round(Math.round(position.x) / gridSize )*gridSize;
      const newY: number = Math.round(Math.round(position.y) / gridSize )*gridSize;
      
      setPosition({x:newX, y:newY});
      handleDeletion(id, position);
    
    }

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