import "./App.css";
import { MapProvider } from "./contexts/MapContext";
import GamePage from "./GamePage";



function App() {

  return (
    <MapProvider>
      <GamePage/>
    </MapProvider>
  );
}

export default App;
