import { useState } from "react";
import { useMapState, useMapDispatch } from "../contexts/MapContext";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import BattleMap from "../BattleMap";
import Header from "../Header";
import TokenGallery from "../TokenGallery";
import AreaTemplateGallery from "../AreaTemplateGallery";

interface TokenPrototype {
  name: string;
  imgPath: string;
}

interface ImageOption {
  label: string;
  value: string;
}

const GamePage = () => {
  const { showGrid, backgroundImgPath } = useMapState();
  const { toggleGrid, clearAllTokens, changeBackgroundImage } =
    useMapDispatch();

  const [measuring, setMeasuring] = useState(false);
  const [stageScale, setStageScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });

  const tokenOptions: TokenPrototype[] = [
    { name: "Goblin", imgPath: "/assets/default/tokens/dryf.jpg" },
    { name: "Bugbear", imgPath: "/assets/default/tokens/Guthma.jpg" },
    { name: "Wizard", imgPath: "/assets/default/tokens/Larhut.jpg" },
    { name: "Witch", imgPath: "/assets/default/tokens/Eldera.jpg" },
  ];

  const imageOptions: ImageOption[] = [
    { value: "/assets/default/maps/tavern.jpg", label: "Tavern" },
    { value: "/assets/default/maps/forest.jpg", label: "Forest" },
  ];

  const handleImageChange = (option: any) => {
    //FIXME: why doesn't it work with proper type?
    changeBackgroundImage(option.value);
  };

  const handleZoomReset = () => {
    setStageScale(1);
    setStagePosition({ x: 0, y: 0 });
  };

  const zoomPercent = Math.round(stageScale * 100);

  return (
    <div className="app-container">
      <div className="map-container">
        <BattleMap
          measuring={measuring}
          stageScale={stageScale}
          stagePosition={stagePosition}
          onStageScaleChange={setStageScale}
          onStagePositionChange={setStagePosition}
        />
        <div className="zoom-indicator">
          <span>{zoomPercent}%</span>
          <button onClick={handleZoomReset}>Reset</button>
        </div>
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
          <TokenGallery tokens={tokenOptions} />
          <div> Double click on a Token to delete it</div>
        </div>

        <div className="vertical-line"></div>

        <div>
          <button
            className={measuring ? "measure-btn active" : "measure-btn"}
            onClick={() => setMeasuring((prev) => !prev)}
          >
            Measure Distance
          </button>
        </div>

        <div>
          <button onClick={clearAllTokens}>Clear Tokens</button>
        </div>
        <div>
          <label>
            Show Grid
            <input type="checkbox" checked={showGrid} onChange={toggleGrid} />
          </label>
        </div>

        <div className="vertical-line"></div>

        <AreaTemplateGallery />
      </div>
    </div>
  );
};

export default GamePage;
