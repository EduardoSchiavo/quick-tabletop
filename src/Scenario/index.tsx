import useImage from 'use-image';
import { Image } from 'react-konva';

interface Props {
  width: number;
  height: number;
  imgPath: string;
}

//just a wrapper around image. Do I need this?
const Scenario = ({width, height, imgPath}: Props) => {
    
    const [image, status] = useImage(imgPath);

    return <Image  height={height} width={width} image={image} />;
  };


export default Scenario;