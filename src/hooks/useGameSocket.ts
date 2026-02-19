import { useEffect, useRef, useState, useCallback } from "react";
import type { GameState, ServerMessage, ClientCommand } from "../types/websocket";

export function useGameSocket(sessionId: string) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3000/ws/${sessionId}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const msg: ServerMessage = JSON.parse(event.data);
      if (msg.type === "state_update") {
        setGameState(msg.payload);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [sessionId]);

  const sendCommand = useCallback((cmd: ClientCommand) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(cmd));
    }
  }, []);

  return { gameState, sendCommand };
}
