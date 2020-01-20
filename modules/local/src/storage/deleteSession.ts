import { GameId } from "../../../games/dist/list";
import { getSessionStorageKey } from "./getSessionStorageKey";

export const deleteSession = (gameId: GameId, sessionId: string) => {
  const activeKey = getSessionStorageKey(gameId);
  const finishedKey = getSessionStorageKey(gameId, true);
  const activeList = JSON.parse(localStorage.getItem(activeKey) || "{}");
  const finishedList = JSON.parse(localStorage.getItem(finishedKey) || "{}");
  delete activeList[sessionId];
  delete finishedList[sessionId];

  localStorage.setItem(activeKey, JSON.stringify(activeList));
  localStorage.setItem(finishedKey, JSON.stringify(finishedList));
};
