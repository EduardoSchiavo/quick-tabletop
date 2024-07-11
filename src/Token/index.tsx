
import useImage from 'use-image';
import { Image } from 'react-konva';
import { useEffect, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';

interface Position{
  x: number;
  y: number;
}

interface Props {
    id: any;
    name: string;
    imgPath: string;
    x: number;
    y: number;
    gridUnit: number;
    handleDeletion: (key: number)=>void;
    handleMove: (key: string, x: number, y: number)=>void; 
}

const Token = ({id, name, imgPath, x, y, gridUnit, handleDeletion, handleMove}: Props) => {
    const [image] = useImage(imgPath);
    // const [position, setPosition] = useState({x:60 , y:60})

    const handleDragEnd = (e)=>{
      handleMove(id, e.target.x(), e.target.y());
      // const newX: number = Math.round(Math.round(x) / gridUnit )*gridUnit;
      // const newY: number = Math.round(Math.round(y) / gridUnit )*gridUnit;
      
      // handleMove(newX, newY);  
    }

    // useEffect(() => {
    //   // Recalculate position based on new gridUnit
    //   const newX = Math.round(position.x / gridUnit) * gridUnit;
    //   const newY = Math.round(position.y / gridUnit) * gridUnit;
    //   setPosition({ x: newX, y: newY });
    // }, [gridUnit, position]);

    return <Image  draggable 
    width={gridUnit} height={gridUnit} x={x} y={y} 
  //   onDragMove={(e) => setPosition({
  //     x: e.target.x(),
  //     y: e.target.y()
  // })}
    onDragEnd={handleDragEnd}
    onDblClick={()=>{handleDeletion(id)}}
    image={image} 
    cornerRadius={50}
    stroke="black"
    strokeWidth={5}/>;
  };

export default Token;