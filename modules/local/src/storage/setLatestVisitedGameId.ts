import { GameId } from "../../../games/dist/list";
import { getLatestVisitedGameIdKey } from "./keys/getLatestVisitedGameIdKey";

export const setLatestVisitedGameId = (gameId?: GameId) => {
  const key = getLatestVisitedGameIdKey();
  if (!gameId) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, gameId);
  }
};
