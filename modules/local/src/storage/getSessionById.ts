import { AlgolLocalBattle } from "../../../types";
import { GameId } from "../../../games/dist/list";
import { parseSession } from "../session";
import { getSessionStorageKey } from "./keys/getSessionStorageKey";

export const getSessionById = (
  gameId: GameId,
  sessionId: string
): AlgolLocalBattle | null => {
  for (const finished of [false, true]) {
    const key = getSessionStorageKey(gameId, finished);
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    if (data[sessionId]) {
      return parseSession(data[sessionId], sessionId);
    }
  }
  return null;
};
