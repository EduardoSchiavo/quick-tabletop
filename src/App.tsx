import { useState } from "react";
import "./App.css";
import BattleMap from "./BattleMap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import TokenGallery from "./TokenGallery";
import Header from "./Header";

interface TokenData {
  name: string;
  imgPath: string;
}

function App() {
  const [showGrid, setShowGrid] = useState(true);
  const [backgroundImgPath, setBackgroundImgPath] = useState(
    "/assets/default/maps/tavern.jpg"
  );
  const [displayedTokens, setDisplayedTokens] = useState<object>(
    { 0: { name: "default", imgPath: "/assets/default/tokens/dryf.jpg" } }
  );

  const tokenOptions: TokenData[] = [
    { name: "Goblin", imgPath: "/assets/default/tokens/dryf.jpg" },
    { name: "Bugbear", imgPath: "/assets/default/tokens/Guthma.jpg" },
    { name: "Wizard", imgPath: "/assets/default/tokens/Larhut.jpg" },
    { name: "Witch", imgPath: "/assets/default/tokens/Eldera.jpg" },
  ];


  const imageOptions = [
    { value: "/assets/default/maps/tavern.jpg", label: "Tavern" },
    { value: "/assets/default/maps/tavern-scribbled.jpg", label: "Scribbled" },
  ];

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const addToken = (token: TokenData) => {
    setDisplayedTokens((displayedTokens) => {
      const keys = Object.keys(displayedTokens).map(Number);
      const newKey = keys.length > 0 ? Math.max(...keys) + 1 : 0;
      return { ...displayedTokens, [newKey]: token };
    });
  };

  const clearAll = () => {
    setDisplayedTokens({});
  };

  const handleImageChange = (option: any) => {
    setBackgroundImgPath(option.value);
  };

  const deleteToken = (key: any)=>{
    setDisplayedTokens((prevState) => {
      const { [key]: _, ...rest } = prevState;
      return rest;
  })};

  return (
    <div className="app-container">
      <div className="map-container">
        <BattleMap
          showGrid={showGrid}
          backgroundImgPath={backgroundImgPath}
          tokens={displayedTokens}
          deleteToken={deleteToken}
        />
      </div>
      <div className="controls-container">
        <Header title="Quick Tabletop" imgPath="favicon.png"/>
        <div className="dropdown">
          <label htmlFor="dropdown1">Select your map:</label>
          <Dropdown
            options={imageOptions}
            onChange={handleImageChange}
            value={backgroundImgPath}
            placeholder="Select an image"
          />
        </div>
        <div className="token-gallery-container">
          <label>Choose your token:</label>
          <TokenGallery tokens={tokenOptions} onAddToken={addToken} />
        </div>
        <div className="vertical-line"></div>
        <div>
          <button onClick={clearAll}>Clear Tokens</button>
        </div>
        <div>
          <label>
            Show Grid
            <input type="checkbox" checked={showGrid} onChange={toggleGrid} />
          </label>
        </div>
      </div>
    </div>
  );

  // return <BattleMap/>;
}

export default App;
