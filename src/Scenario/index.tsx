import map from '../assets/tavern3.jpg'
import useImage from 'use-image';
import { Image } from 'react-konva';


const Scenario = () => {
    const [image] = useImage(map);
    return <Image  height={864} width={1344} image={image} />;
  };


export default Scenario;