import map from '../assets/map.jpeg'
import useImage from 'use-image';
import { Image } from 'react-konva';


const Scenario = () => {
    const [image] = useImage(map);
    return <Image  image={image} />;
  };


export default Scenario;