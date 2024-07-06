import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  const defaultToken = {
    [uuidv4()]: { name: "default", imgPath: "/assets/default/tokens/dryf.jpg" },
  };
  const [displayedTokens, setDisplayedTokens] = useState<object>({}); //TODO: define object type

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

  const gridUnit = 96;

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const addToken = (token: TokenData) => {
    const startingPos = {
      x: gridUnit,
      y: gridUnit,
    };
    const numberOfDisplayedTokens = Object.entries(displayedTokens).length;
    const newToken = {
      ...token,
      x: startingPos.x + (numberOfDisplayedTokens % 3) * gridUnit,
      y: startingPos.y + (numberOfDisplayedTokens % 2) * gridUnit,
      gridUnit: gridUnit,
    };
    setDisplayedTokens((displayedTokens) => {
      const newKey = uuidv4();
      return { ...displayedTokens, [newKey]: newToken };
    });
  };

  const clearAll = () => {
    setDisplayedTokens({});
  };

  const handleImageChange = (option: any) => {
    setBackgroundImgPath(option.value);
  };

  const deleteToken = (key: string) => {
    console.log("DELETING");
    setDisplayedTokens((prevState) => {
      console.log({ prevState });
      const { [key]: _, ...rest } = prevState;
      console.log({ rest });
      return rest;
    });
  };

  const handleTokenMove = (key: string, x: number, y: number) => {
    const newTokens: { [key: string]: { x: number; y: number } } = {
      ...displayedTokens,
    };
    newTokens[key].x = x;
    newTokens[key].y = y;
    setDisplayedTokens(newTokens);
  };

  return (
    <div className="app-container">
      <div className="map-container">
        <BattleMap
          showGrid={showGrid}
          backgroundImgPath={backgroundImgPath}
          tokens={displayedTokens}
          deleteToken={deleteToken}
          handleTokenMove={handleTokenMove}
        />
      </div>
      <div className="controls-container">
        <Header title="Quick Tabletop" imgPath="favicon.png" />
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
}

export default App;
