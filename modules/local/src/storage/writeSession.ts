import { AlgolLocalBattle } from "../../../types";
import { GameId } from "../../../games/dist/list";
import { stringifySession } from "../session";

export const writeSession = (gameId: GameId, session: AlgolLocalBattle) => {
  if (!session.save.endedBy) {
    const key = `Algol_${gameId}_active`;
    const list = JSON.parse(localStorage.getItem(key) || "{}");
    list[session.id] = stringifySession(session, 0);
    localStorage.setItem(key, JSON.stringify(list));
  }
};
