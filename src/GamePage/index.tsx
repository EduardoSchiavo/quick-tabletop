import { useEffect, useState } from "react";
import { useMapState, useMapDispatch } from "../contexts/MapContext";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import BattleMap from "../BattleMap";
import Header from "../Header";
import TokenGallery from "../TokenGallery";

interface TokenData {
    name: string;
    imgPath: string;
  }

const GamePage = () => {

    const { showGrid } = useMapState();
    const { toggleGrid, clearAllTokens } = useMapDispatch();

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
    
      // const toggleGrid = () => {
      //   setShowGrid(!showGrid);
      // };
    
      // const addToken = (token: TokenData) => {
      //   const startingPos = {
      //     x: gridUnit,
      //     y: gridUnit,
      //   };
      //   const numberOfDisplayedTokens = Object.entries(displayedTokens).length;
      //   const newToken = {
      //     ...token,
      //     x: startingPos.x + (numberOfDisplayedTokens % 3) * gridUnit,
      //     y: startingPos.y + (numberOfDisplayedTokens % 2) * gridUnit,
      //     gridUnit: gridUnit,
      //   };
      //   setDisplayedTokens((displayedTokens) => {
      //     const newKey = uuidv4();
      //     return { ...displayedTokens, [newKey]: newToken };
      //   });
      // };
    
      // const clearAll = () => {
      //   setDisplayedTokens({});
      // };
    
    //   const handleImageChange = (option: any) => {
    //     setBackgroundImgPath(option.value);
    //   };
    



  return (
    <div className="app-container">
    <div className="map-container">
      <BattleMap/>
    </div>
    <div className="controls-container">
      <Header title="Quick Tabletop" imgPath="favicon.png" />
      <div className="dropdown">
        <label htmlFor="dropdown1">Select your map:</label>
        {/* <Dropdown
          options={imageOptions}
          onChange={handleImageChange}
          value={backgroundImgPath}
          placeholder="Select an image"
        /> */}
      </div>
      <div className="token-gallery-container">
        <label>Choose your token:</label>
        <TokenGallery tokens={tokenOptions} />
      </div>
      <div className="vertical-line"></div>
      <div>
        <button onClick={clearAllTokens}>Clear Tokens</button>
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
};

export default GamePage;
