import { AlgolLocalBattle } from "../../../types";
import { GameId } from "../../../games/dist/list";
import { stringifySession } from "../../../encoding/session";
import { getSessionStorageKey } from "./keys/getSessionStorageKey";

export const writeSession = (gameId: GameId, session: AlgolLocalBattle) => {
  const activeKey = getSessionStorageKey(gameId);
  const activeList = JSON.parse(localStorage.getItem(activeKey) || "{}");
  const finishedKey = getSessionStorageKey(gameId, true);
  if (!session.endedBy) {
    activeList[session.id] = stringifySession(session, 0);
    localStorage.setItem(activeKey, JSON.stringify(activeList));
  } else {
    delete activeList[session.id];
    localStorage.setItem(activeKey, JSON.stringify(activeList));
    const finishedList = JSON.parse(localStorage.getItem(finishedKey) || "{}");
    finishedList[session.id] = stringifySession(session, 0);
    localStorage.setItem(finishedKey, JSON.stringify(finishedList));
  }
};
