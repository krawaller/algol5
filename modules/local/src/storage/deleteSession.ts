import { GameId } from "../../../games/dist/list";
import { getSessionStorageKey } from "./keys/getSessionStorageKey";
import { getLatestSessionId } from "./getLatestSessionId";
import { setLatestSessionId } from "./setLatestSessionId";

export const deleteSession = (gameId: GameId, sessionId: string) => {
  const activeKey = getSessionStorageKey(gameId);
  const finishedKey = getSessionStorageKey(gameId, true);
  const activeList = JSON.parse(localStorage.getItem(activeKey) || "{}");
  const finishedList = JSON.parse(localStorage.getItem(finishedKey) || "{}");
  delete activeList[sessionId];
  delete finishedList[sessionId];

  localStorage.setItem(activeKey, JSON.stringify(activeList));
  localStorage.setItem(finishedKey, JSON.stringify(finishedList));

  if (getLatestSessionId(gameId) === sessionId) {
    setLatestSessionId(gameId, null);
  }
};
