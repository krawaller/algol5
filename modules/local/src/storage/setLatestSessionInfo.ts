import { GameId } from "../../../games/dist/list";
import { getLatestSessionInfoKey } from "./keys/getLatestSessionInfoKey";

export const setLatestSessionInfo = (gameId: GameId, sessionId: string) => {
  const key = getLatestSessionInfoKey();
  localStorage.setItem(key, `${gameId}\n${sessionId}`);
};
