import { AlgolLocalBattle, AlgolError } from "../../../types";
import { GameId } from "../../../games/dist/list";
import { parseSession } from "../../../encoding/src/session";
import { getSessionStorageKey } from "./keys/getSessionStorageKey";

type SessionOrError = AlgolLocalBattle | AlgolError;

export const getSessionList = (
  gameId: GameId,
  finished?: boolean
): SessionOrError[] => {
  const key = getSessionStorageKey(gameId, finished);
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  return Object.entries(data).map(([id, str]) => {
    try {
      return parseSession(str as string, id);
    } catch (err) {
      return err;
    }
  });
};
