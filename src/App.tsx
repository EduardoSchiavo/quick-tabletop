import { useState } from "react";
import "./App.css";
import { MapProvider } from "./contexts/MapContext";
import GamePage from "./GamePage";
import LandingPage from "./LandingPage";

function getInitialSession(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("session");
}

function App() {
  const [sessionId, setSessionId] = useState<string | null>(getInitialSession);

  const handleSessionStart = (id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("session", id);
    window.history.replaceState({}, "", url.toString());
    setSessionId(id);
  };

  if (!sessionId) {
    return <LandingPage onSessionStart={handleSessionStart} />;
  }

  return (
    <MapProvider>
      <GamePage />
    </MapProvider>
  );
}

export default App;
