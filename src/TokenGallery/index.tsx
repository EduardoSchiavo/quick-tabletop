import React from "react";
import { useMapDispatch, useMapState } from "../contexts/MapContext";

interface TokenData {
  name: string;
  imgPath: string;
}

interface TokenGalleryProps {
  tokens: TokenData[];
}

const TokenGallery: React.FC<TokenGalleryProps> = ({ tokens }) => {
  const { displayedTokens, gridUnit } = useMapState();
  const { addToken } = useMapDispatch();

  const handleButtonClick = (
    token: Omit<TokenData, "x" | "y" | "gridUnit">
  ) => {
    const startingPos = { x: gridUnit, y: gridUnit };
    const numberOfDisplayedTokens = Object.entries(displayedTokens).length;
    const newToken = {
      ...token,
      x: startingPos.x + (numberOfDisplayedTokens % 3) * gridUnit,
      y: startingPos.y + (numberOfDisplayedTokens % 2) * gridUnit,
      tokenSize: gridUnit,
    };
    addToken(newToken);
  };

  return (
    <div className="token-gallery">
      {tokens.map((token, index) => (
        <div key={index} className="token-item">
          <img src={token.imgPath} alt={token.name} className="token-image" />
          <div className="token-info">
            <span>{token.name} </span>
            <button onClick={() => handleButtonClick(token)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenGallery;
