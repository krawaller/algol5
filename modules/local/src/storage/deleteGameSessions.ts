import { GameId } from "../../../games/dist/list";
import { getSessionStorageKey } from "./keys/getSessionStorageKey";
import { setLatestSessionIdForGame } from "./setLatestSessionIdForGame";

export const deleteGameSessions = (gameId: GameId) => {
  const activeKey = getSessionStorageKey(gameId);
  const finishedKey = getSessionStorageKey(gameId, true);

  localStorage.removeItem(activeKey);
  localStorage.removeItem(finishedKey);

  setLatestSessionIdForGame(gameId, null);
};
