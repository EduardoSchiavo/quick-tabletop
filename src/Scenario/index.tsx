import useImage from 'use-image';
import { Image } from 'react-konva';

interface Props {
  imgPath: string;
}

const Scenario = ({imgPath}: Props) => {
    
    const [image, status] = useImage(imgPath);

    return <Image  height={864} width={1344} image={image} />;
  };


export default Scenario;