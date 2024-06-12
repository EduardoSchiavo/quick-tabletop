import { useState } from "react";
import "./App.css";
import BattleMap from "./BattleMap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
// import map from "./assets/tavern.jpg"


function App() {
  const [count, setCount] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [backgroundImgPath, setBackgroundImgPath] = useState('/assets/tavern.jpg')

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const options = ["regular", "scribbled"];

  const imageOptions = [
    { value: '/assets/tavern.jpg', label: 'Tavern' },
    { value: '/assets/tavern-scribbled.jpg', label: 'Scribbled' }
  ];

  const handleImageChange = (option: any) => {
    setBackgroundImgPath(option.value);
  };

  return (
    <div className="app-container">
      <div className="map-container">
        <BattleMap {...{ showGrid: showGrid, backgroundImgPath: backgroundImgPath }} />
      </div>
      <div className="controls-container">
        <div className="dropdown">
          <label htmlFor="dropdown1">Chose your map:</label>
          <Dropdown options={imageOptions} onChange={handleImageChange} value={backgroundImgPath} placeholder="Select an image" />
        </div>
        <div className="dropdown">
          <label htmlFor="dropdown2">Chose your token:</label>
          <Dropdown options={options} />
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
