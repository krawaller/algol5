import { GameId } from "../../../games/dist/list";
import { getLatestSessionIdKey } from "./keys/getLatestSessionIdKey";

export const getLatestSessionId = (gameId: GameId) => {
  const key = getLatestSessionIdKey(gameId);
  const id = localStorage.getItem(key);
  return id;
};
