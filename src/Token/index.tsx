// import sampleToken from 'assets/sampletoken.png' //TODO: add image
import sampleToken from '../assets/goblin.jpeg' //TODO: add image

import useImage from 'use-image';
import { Image } from 'react-konva';


interface Props {
    x: number;
    y: number;
}

const Token = ({x, y}: Props) => {
    const [image] = useImage(sampleToken);
    return <Image  draggable x={x} y={y} image={image} />;
  };

export default Token;