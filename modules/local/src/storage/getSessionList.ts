import { AlgolLocalBattle } from "../../../types";
import { GameId } from "../../../games/dist/list";
import { parseSession } from "../session";
import { getSessionStorageKey } from "./getSessionStorageKey";

export const getSessionList = (
  gameId: GameId,
  finished?: boolean
): AlgolLocalBattle[] => {
  const key = getSessionStorageKey(gameId, finished);
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  return Object.entries(data).map(([id, str]) =>
    parseSession(str as string, id)
  );
};
