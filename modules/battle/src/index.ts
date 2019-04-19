import { AlgolBattleSession } from "../../types";
import { newBattle, battleAction } from "./battle";
import games from "../../logic/dist";
import { getBattleUI } from "./helpers";

const sessions: { [idx: string]: AlgolBattleSession } = {};
let nextSession = 1;

export const API = {
  newSession(gameId: keyof typeof games) {
    const battle = newBattle(games[gameId]);
    const sessionId = nextSession++;
    const session: AlgolBattleSession = {
      gameId,
      sessionId,
      battle
    };
    sessions[sessionId] = session;
    return getBattleUI(session);
  },

  makeSessionAction(sessionId, action) {
    const session = sessions[sessionId];
    const { gameId, battle } = session;
    const game = games[gameId];
    session.battle = battleAction(game, battle, action);
    return getBattleUI(session);
  }
};
