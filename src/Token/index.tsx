
import useImage from 'use-image';
import { Image } from 'react-konva';
import { useEffect, useState } from 'react';

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
}

const Token = ({id, name, imgPath, x, y, gridUnit, handleDeletion}: Props) => {
    const [image] = useImage(imgPath);
    const [position, setPosition] = useState({x, y})

    const handleDragEnd = ()=>{

      const newX: number = Math.round(Math.round(position.x) / gridUnit )*gridUnit;
      const newY: number = Math.round(Math.round(position.y) / gridUnit )*gridUnit;
      
      setPosition({x:newX, y:newY});
    }

    useEffect(() => {
      // Recalculate position based on new gridUnit
      const newX = Math.round(x / gridUnit) * gridUnit;
      const newY = Math.round(y / gridUnit) * gridUnit;
      setPosition({ x: newX, y: newY });
    }, [gridUnit, x, y]);

    return <Image  draggable 
    width={gridUnit} height={gridUnit} x={position.x} y={position.y} 
    onDragMove={(e) => setPosition({
      x: e.target.x(),
      y: e.target.y()
  })}
    onDragEnd={handleDragEnd}
    onDblClick={()=>{handleDeletion(id)}}
    image={image} 
    cornerRadius={50}
    stroke="black"
    strokeWidth={5}/>;
  };

export default Token;