import React from "react";

interface TokenData {
  name: string;
  imgPath: string;
}

interface TokenGalleryProps {
  tokens: TokenData[];
  onAddToken: (token: TokenData) => void;
}

const TokenGallery: React.FC<TokenGalleryProps> = ({ tokens, onAddToken }) => {
  return (
    <div className="token-gallery">
      {tokens.map((token, index) => (
        <div key={index} className="token-item">
          <img src={token.imgPath} alt={token.name} className="token-image" />
          <div className="token-info">
            <span>{token.name} </span>
            <button onClick={() => onAddToken(token)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenGallery;
