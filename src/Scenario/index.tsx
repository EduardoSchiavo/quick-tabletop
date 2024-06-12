import useImage from 'use-image';
import { Image } from 'react-konva';

interface Props {
  imgPath: string;
}

const Scenario = ({imgPath}: Props) => {
    console.log("EEEEEE scen", imgPath);
    
    const [image, status] = useImage(imgPath);

    console.log("EEEEEE scen", image, status);

    return <Image  height={864} width={1344} image={image} />;
  };


export default Scenario;