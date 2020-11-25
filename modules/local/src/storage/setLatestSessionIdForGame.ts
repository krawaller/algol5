import { GameId } from "../../../games/dist/list";
import { getLatestSessionIdForGameKey } from "./keys/getLatestSessionIdForGameKey";

export const setLatestSessionIdForGame = (
  gameId: GameId,
  sessionId: string | null
) => {
  const key = getLatestSessionIdForGameKey(gameId);
  if (sessionId === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, sessionId);
  }
};
