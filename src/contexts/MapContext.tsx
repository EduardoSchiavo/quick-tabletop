import React, { createContext, useState, useContext, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface TokenData {
  name: string;
  imgPath: string;
  x: number;
  y: number;
  tokenSize: number;
}

interface MapState {
  showGrid: boolean;
  backgroundImgPath: string;
  displayedTokens: Record<string, TokenData>;
  gridUnit: number;
}

interface MapDispatch {
  //   setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setBackgroundImgPath: React.Dispatch<React.SetStateAction<string>>;
  setDisplayedTokens: React.Dispatch<
    React.SetStateAction<Record<string, TokenData>>
  >;
  setGridUnit: React.Dispatch<React.SetStateAction<number>>;
  addToken: (token: Omit<TokenData, "x" | "y" | "gridUnit">) => void;
  clearAllTokens: () => void;
  toggleGrid: () => void;
  moveToken: (key: string, x: number, y: number) => void;
  deleteToken: (key: string) => void;
}

const MapStateContext = createContext<MapState | undefined>(undefined);
const MapDispatchContext = createContext<MapDispatch | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [showGrid, setShowGrid] = useState(true);
  const [backgroundImgPath, setBackgroundImgPath] = useState(
    "/assets/default/maps/tavern.jpg"
  );
  const [displayedTokens, setDisplayedTokens] = useState<
    Record<string, TokenData>
  >({});
  const [gridUnit, setGridUnit] = useState(96);


const addToken = (newToken: TokenData) => {
    setDisplayedTokens((prevTokens) => {
      const newKey = uuidv4();
      return { ...prevTokens, [newKey]: newToken };
    });
  };

  const clearAllTokens = () => setDisplayedTokens({});

  const moveToken = (key: string, x: number, y: number) => {
    setDisplayedTokens((prevTokens) => ({
      ...prevTokens,
      [key]: { ...prevTokens[key], x, y },
    }));
  };

  const deleteToken = (key: string) => {
      setDisplayedTokens((prevTokens) => {
        const { [key]: _, ...rest } = prevTokens;
        return rest;
      });
    };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  return (
    <MapStateContext.Provider
      value={{ showGrid, backgroundImgPath, displayedTokens, gridUnit }}
    >
      <MapDispatchContext.Provider
        value={{
          toggleGrid,
          setBackgroundImgPath,
          setDisplayedTokens,
          setGridUnit,
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
