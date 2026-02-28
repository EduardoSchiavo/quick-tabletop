export interface TokenData {
  name: string;
  imgPath: string;
  x: number;
  y: number;
  tokenSize: number;
}

export interface AreaTemplateData {
  shape: "circle" | "square";
  x: number;
  y: number;
  size: number;       // in grid units (e.g., 3 = 3 squares = 15ft)
  color: string;      // hex
  opacity: number;    // 0.0-1.0
}

export interface GameState {
  displayedTokens: Record<string, TokenData>;
  backgroundImgPath: string;
  showGrid: boolean;
  gridUnit: number;
  areaTemplates: Record<string, AreaTemplateData>;
}

export interface ServerMessage {
  type: "state_update";
  payload: GameState;
}

export type ClientCommand =
  | { type: "add_token"; payload: { id: string; token: TokenData } }
  | { type: "move_token"; payload: { id: string; x: number; y: number } }
  | { type: "delete_token"; payload: { id: string } }
  | { type: "clear_tokens" }
  | { type: "change_background"; payload: { imgPath: string } }
  | { type: "toggle_grid" }
  | { type: "add_area_template"; payload: { id: string; template: AreaTemplateData } }
  | { type: "move_area_template"; payload: { id: string; x: number; y: number } }
  | { type: "delete_area_template"; payload: { id: string } }
  | { type: "clear_area_templates" };
