import { AlgolBattleSession } from "../../types";
import { newBattle, battleAction } from "./battle";
import games from "../../logic/dist";
import { getBattleUI } from "./helpers";

const sessions: { [idx: string]: AlgolBattleSession } = {};
let nextSession = 1;

export const API = {
  newBattle(gameId: keyof typeof games) {
    const battle = newBattle(games[gameId]);
    const battleId = nextSession++;
    const session: AlgolBattleSession = {
      gameId,
      battleId,
      battle
    };
    sessions[battleId] = session;
    return getBattleUI(session);
  },

  makeBattleAction(sessionId, action) {
    const session = sessions[sessionId];
    const { gameId, battle } = session;
    const game = games[gameId];
    session.battle = battleAction(game, battle, action);
    return getBattleUI(session);
  }
};
