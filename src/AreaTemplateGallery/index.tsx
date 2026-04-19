import React, { useState } from "react";
import { useMapState, useMapDispatch } from "../contexts/MapContext";
import type { AreaTemplateData } from "../types/websocket";

const PRESET_COLORS = [
  { name: "Red", value: "#ff0000" },
  { name: "Blue", value: "#0000ff" },
  { name: "Green", value: "#00cc00" },
  { name: "Yellow", value: "#ffcc00" },
  { name: "Purple", value: "#9900cc" },
  { name: "Orange", value: "#ff6600" },
];

const AreaTemplateGallery: React.FC = () => {
  const { gridUnit, areaTemplates } = useMapState();
  const { addAreaTemplate, clearAreaTemplates } = useMapDispatch();

  const [shape, setShape] = useState<"circle" | "square">("circle");
  const [size, setSize] = useState(3);
  const [color, setColor] = useState("#ff0000");
  const [opacity, setOpacity] = useState(0.3);

  const handlePlace = () => {
    const numberOfTemplates = Object.keys(areaTemplates).length;
    const template: AreaTemplateData = {
      shape,
      x: gridUnit + (numberOfTemplates % 3) * gridUnit,
      y: gridUnit + (numberOfTemplates % 2) * gridUnit,
      size,
      color,
      opacity,
    };
    addAreaTemplate(template);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 10) {
      setSize(val);
    }
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(parseFloat(e.target.value));
  };

  return (
    <div className="area-template-gallery">
      <label>Area Templates:</label>

      <div className="template-controls">
        <div className="template-row">
          <span>Shape:</span>
          <button
            className={shape === "circle" ? "template-btn active" : "template-btn"}
            onClick={() => setShape("circle")}
          >
            Circle
          </button>
          <button
            className={shape === "square" ? "template-btn active" : "template-btn"}
            onClick={() => setShape("square")}
          >
            Square
          </button>
        </div>

        <div className="template-row">
          <span>Size (squares):</span>
          <input
            type="number"
            min={1}
            max={10}
            value={size}
            onChange={handleSizeChange}
            className="template-input"
          />
        </div>

        <div className="template-row">
          <span>Color:</span>
          <div className="color-swatches">
            {PRESET_COLORS.map((c) => (
              <button
                key={c.value}
                className={color === c.value ? "color-swatch active" : "color-swatch"}
                style={{ backgroundColor: c.value }}
                onClick={() => setColor(c.value)}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="template-row">
          <span>Opacity:</span>
          <input
            type="range"
            min={0.1}
            max={1.0}
            step={0.1}
            value={opacity}
            onChange={handleOpacityChange}
            className="template-slider"
          />
          <span>{opacity.toFixed(1)}</span>
        </div>

        <div className="template-row template-actions">
          <button onClick={handlePlace}>Place Template</button>
          <button onClick={clearAreaTemplates}>Clear All</button>
        </div>
      </div>
    </div>
  );
};

export default AreaTemplateGallery;
