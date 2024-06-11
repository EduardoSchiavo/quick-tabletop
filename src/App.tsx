import { useState } from 'react'
import './App.css'
import BattleMap from './BattleMap'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function App(this: any) {
  const [count, setCount] = useState(0)

  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];

  return (
    <div className="app-container">
      <div className="map-container">
        <BattleMap />
      </div>
      <div className="controls-container">
      <Dropdown options={options}  value={defaultOption} placeholder="Select an option" />

        {/* <div className="dropdown">
          <label htmlFor="dropdown1">Select Map:</label>
          <select id="dropdown1">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div> */}
        <div className="dropdown">
          <label htmlFor="dropdown2">Select Token:</label>
          <select id="dropdown2">
            <option value="optionA">Option A</option>
            <option value="optionB">Option B</option>
            <option value="optionC">Option C</option>
          </select>
        </div>
      </div>
    </div>
  );


  // return <BattleMap/>;
}

export default App
