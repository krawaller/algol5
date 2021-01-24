import { AlgolSession } from "../../../types";
import { GameId } from "../../../games/dist/list";
import { parseSession } from "../../../encoding/src/session";
import { getSessionStorageKey } from "./keys/getSessionStorageKey";

export const getSessionById = (
  gameId: GameId,
  sessionId: string
): AlgolSession | null => {
  for (const finished of [false, true]) {
    const key = getSessionStorageKey(gameId, finished);
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    if (data[sessionId]) {
      return parseSession(data[sessionId], sessionId);
    }
  }
  return null;
};
