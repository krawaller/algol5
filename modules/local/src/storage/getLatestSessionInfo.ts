import { GameId } from "../../../games/dist/list";
import { getLatestSessionInfoKey } from "./keys/getLatestSessionInfoKey";

type LatestSessionInfo = {
  gameId: GameId | null;
  sessionId: string | null;
};

export const getLatestSessionInfo = (): LatestSessionInfo => {
  const key = getLatestSessionInfoKey();
  // need safeguard here since this method is also called serverside in Next during SSR
  if (typeof localStorage === "undefined") {
    return { gameId: null, sessionId: null };
  }
  const latestSessionInfo = localStorage.getItem(key) || "";
  const [gameId, sessionId] = latestSessionInfo.split("\n");
  if (gameId && sessionId) {
    return {
      gameId: gameId as GameId,
      sessionId,
    };
  }
  return {
    gameId: null,
    sessionId: null,
  };
};
