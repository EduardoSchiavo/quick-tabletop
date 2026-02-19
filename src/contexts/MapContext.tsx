import { createContext, useContext, ReactNode, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGameSocket } from "../hooks/useGameSocket";
import type { TokenData } from "../types/websocket";

interface MapState {
  showGrid: boolean;
  backgroundImgPath: string;
  displayedTokens: Record<string, TokenData>;
  gridUnit: number;
}

interface MapDispatch {
  changeBackgroundImage: (imgPath: string) => void;
  addToken: (token: TokenData) => void;
  clearAllTokens: () => void;
  toggleGrid: () => void;
  moveToken: (key: string, x: number, y: number) => void;
  deleteToken: (key: string) => void;
}

const MapStateContext = createContext<MapState | undefined>(undefined);
const MapDispatchContext = createContext<MapDispatch | undefined>(undefined);

const defaultState: MapState = {
  displayedTokens: {},
  backgroundImgPath: "/assets/default/maps/tavern.jpg",
  showGrid: true,
  gridUnit: 96,
};

export const MapProvider = ({
  children,
  sessionId,
}: {
  children: ReactNode;
  sessionId: string;
}) => {
  const { gameState, sendCommand } = useGameSocket(sessionId);

  const state: MapState = gameState
    ? {
        showGrid: gameState.showGrid,
        backgroundImgPath: gameState.backgroundImgPath,
        displayedTokens: gameState.displayedTokens,
        gridUnit: gameState.gridUnit,
      }
    : defaultState;

  const addToken = useCallback(
    (token: TokenData) => {
      sendCommand({
        type: "add_token",
        payload: { id: uuidv4(), token },
      });
    },
    [sendCommand]
  );

  const clearAllTokens = useCallback(() => {
    sendCommand({ type: "clear_tokens" });
  }, [sendCommand]);

  const moveToken = useCallback(
    (key: string, x: number, y: number) => {
      sendCommand({
        type: "move_token",
        payload: { id: key, x, y },
      });
    },
    [sendCommand]
  );

  const deleteToken = useCallback(
    (key: string) => {
      sendCommand({
        type: "delete_token",
        payload: { id: key },
      });
    },
    [sendCommand]
  );

  const toggleGrid = useCallback(() => {
    sendCommand({ type: "toggle_grid" });
  }, [sendCommand]);

  const changeBackgroundImage = useCallback(
    (imgPath: string) => {
      sendCommand({
        type: "change_background",
        payload: { imgPath },
      });
    },
    [sendCommand]
  );

  return (
    <MapStateContext.Provider value={state}>
      <MapDispatchContext.Provider
        value={{
          toggleGrid,
          changeBackgroundImage,
          addToken,
          clearAllTokens,
          moveToken,
          deleteToken,
        }}
      >
        {children}
      </MapDispatchContext.Provider>
    </MapStateContext.Provider>
  );
};

export const useMapState = (): MapState => {
  const context = useContext(MapStateContext);
  if (context === undefined) {
    throw new Error("useMapState must be used within a MapProvider");
  }
  return context;
};

export const useMapDispatch = (): MapDispatch => {
  const context = useContext(MapDispatchContext);
  if (context === undefined) {
    throw new Error("useMapDispatch must be used within a MapProvider");
  }
  return context;
};
