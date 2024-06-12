import { useState } from "react";
import "./App.css";
import BattleMap from "./BattleMap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Token from "./Token";
// import map from "./assets/tavern.jpg"

interface TokenData {
  name: string;
  imgPath: string;
}

function App() {
  // const [count, setCount] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [backgroundImgPath, setBackgroundImgPath] = useState(
    "/assets/default/maps/tavern.jpg"
  );
  const [tokenList, setTokenList] = useState<TokenData[]>([
    { name: "default", imgPath: "/assets/default/tokens/dryf.jpg" },
  ]);

  const tokenOptions = [
    {
      value: "/assets/default/tokens/dryf.jpg",
      label: "Dryf",
    },
    {
      value: "/assets/default/tokens/goblin.jpeg",
      label: "Goblin",
    },
  ];

  const imageOptions = [
    { value: "/assets/default/maps/tavern.jpg", label: "Tavern" },
    { value: "/assets/default/maps/tavern-scribbled.jpg", label: "Scribbled" },
  ];

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const addToken = (option: any) => {
    // tokenList.push({ name: option.label, imgPath: option.value });
    const newTokenList = tokenList.slice();
    newTokenList.push({ name: option.label, imgPath: option.value });
    setTokenList(newTokenList); 
    console.log("TOKENS: ", tokenList);
  };

  const handleImageChange = (option: any) => {
    setBackgroundImgPath(option.value);
  };

  return (
    <div className="app-container">
      <div className="map-container">
        <BattleMap
          {...{
            showGrid: showGrid,
            backgroundImgPath: backgroundImgPath,
            tokens: tokenList,
          }}
        />
      </div>
      <div className="controls-container">
        <div className="dropdown">
          <label htmlFor="dropdown1">Chose your map:</label>
          <Dropdown
            options={imageOptions}
            onChange={handleImageChange}
            value={backgroundImgPath}
            placeholder="Select an image"
          />
        </div>
        <div className="dropdown">
          <label htmlFor="dropdown2">Chose your token:</label>
          <Dropdown
            options={tokenOptions}
            onChange={addToken}
            value={"/assets/default/tokens/dryf.jpg"}
            placeholder="Select a token"
          />
        </div>
        <div>
          <button onClick={toggleGrid}>Show Grid</button>
        </div>
      </div>
    </div>
  );

  // return <BattleMap/>;
}

export default App;
