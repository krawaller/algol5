import { AlgolSession } from "../../types";
import { newBattle, battleAction } from "./battle";
import games from "../../logic/dist";
import { getSessionUI } from "./helpers";

const sessions: { [idx: string]: AlgolSession } = {};
let nextSession = 1;

export const API = {
  newSession(gameId) {
    const battle = newBattle(games[gameId]);
    const sessionId = nextSession++;
    const session: AlgolSession = {
      gameId,
      sessionId,
      battle
    };
    sessions[sessionId] = session;
    return getSessionUI(session);
  },

  makeSessionAction(sessionId, action) {
    const session = sessions[sessionId];
    const { gameId, battle } = session;
    const game = games[gameId];
    session.battle = battleAction(game, battle, action);
    return getSessionUI(session);
  }
};
