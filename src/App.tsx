import { useState } from "react";
import "./App.css";
import BattleMap from "./BattleMap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";


interface TokenData {
  name: string;
  imgPath: string;
}

function App() {
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
      value: "/assets/default/tokens/Guthma.jpg",
      label: "Guthma",
    },
    {
      value: "/assets/default/tokens/Larhut.jpg",
      label: "Larhut",
    },
    {
      value: "/assets/default/tokens/Kili.jpg",
      label: "Kili",
    },
    {
      value: "/assets/default/tokens/Eldera.jpg",
      label: "Eldera",
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
    const newTokenList = tokenList.slice();
    newTokenList.push({ name: option.label, imgPath: option.value });
    setTokenList(newTokenList); 
  };

  const clearAll = () => {
    setTokenList([]);
  }

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
        <button onClick={clearAll}>Clear Tokens</button>

        </div>
        <div>
          <label>
          Show Grid
            <input 
              type="checkbox" 
              checked={showGrid} 
              onChange={toggleGrid} 
            />
          </label>
        </div>
      </div>
    </div>
  );

  // return <BattleMap/>;
}

export default App;
