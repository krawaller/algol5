import { GameId } from "../../../games/dist/list";
import { getLatestSessionIdKey } from "./keys/getLatestSessionIdKey";

export const getLatestSessionId = (gameId: GameId) => {
  const key = getLatestSessionIdKey(gameId);
  if (typeof localStorage === "undefined") {
    return null;
  }
  const id = localStorage.getItem(key);
  return id;
};
