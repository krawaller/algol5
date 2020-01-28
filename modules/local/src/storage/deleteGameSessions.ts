import { GameId } from "../../../games/dist/list";
import { getSessionStorageKey } from "./keys/getSessionStorageKey";
import { setLatestSessionId } from "./setLatestSessionId";

export const deleteGameSessions = (gameId: GameId) => {
  const activeKey = getSessionStorageKey(gameId);
  const finishedKey = getSessionStorageKey(gameId, true);

  localStorage.removeItem(activeKey);
  localStorage.removeItem(finishedKey);

  setLatestSessionId(gameId, null);
};
