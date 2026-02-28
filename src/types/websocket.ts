export interface TokenData {
  name: string;
  imgPath: string;
  x: number;
  y: number;
  tokenSize: number;
}

export interface GameState {
  displayedTokens: Record<string, TokenData>;
  backgroundImgPath: string;
  showGrid: boolean;
  gridUnit: number;
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
  | { type: "toggle_grid" };
