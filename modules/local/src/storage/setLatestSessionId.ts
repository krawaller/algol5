import { GameId } from "../../../games/dist/list";
import { getLatestSessionIdKey } from "./keys/getLatestSessionIdKey";

export const setLatestSessionId = (
  gameId: GameId,
  sessionId: string | null
) => {
  const key = getLatestSessionIdKey(gameId);
  if (sessionId === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, sessionId);
  }
};
