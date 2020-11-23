import { GameId } from "../../../games/dist/list";
import { getLatestSessionIdForGameKey } from "./keys/getLatestSessionIdForGameKey";

export const getLatestSessionIdForGame = (gameId: GameId) => {
  const key = getLatestSessionIdForGameKey(gameId);
  // need safeguard here since this method is also called serverside in Next during SSR
  if (typeof localStorage === "undefined") {
    return null;
  }
  const id = localStorage.getItem(key);
  return id;
};
