import { GameId } from "../../../games/dist/list";
import { getLatestVisitedGameIdKey } from "./keys/getLatestVisitedGameIdKey";

export const getLatestVisitedGameId = () => {
  const key = getLatestVisitedGameIdKey();
  // need safeguard here since this method is also called serverside in Next during SSR
  if (typeof localStorage === "undefined") {
    return null;
  }
  const latestVisitedGameId = localStorage.getItem(key);
  return latestVisitedGameId as GameId | null;
};
