import { AlgolSession, AlgolError } from "../../../types";
import { GameId } from "../../../games/dist/list";
import { parseSession } from "../../../encoding/src/session";
import { getSessionStorageKey } from "./keys/getSessionStorageKey";

export type SessionLoadFail = {
  error: AlgolError;
  id: string;
  str: string;
};
export type SessionOrFail = AlgolSession | SessionLoadFail;

export const isSessionLoadFail = (
  session: SessionOrFail
): session is SessionLoadFail =>
  Boolean(((session as unknown) as SessionLoadFail).error);

export const isSessionLoadSuccess = (
  session: SessionOrFail
): session is AlgolSession =>
  Boolean(((session as unknown) as AlgolSession).gameId);

export const getSessionList = (
  gameId: GameId,
  finished?: boolean
): SessionOrFail[] => {
  const key = getSessionStorageKey(gameId, finished);
  const data: Record<string, string> = JSON.parse(
    localStorage.getItem(key) || "{}"
  );
  return Object.entries(data).map(([id, str]) => {
    try {
      return parseSession(str as string, id);
    } catch (error) {
      return {
        error,
        id,
        str,
      };
    }
  });
};
