import { focusAtom } from "klyva";
import { GameId } from "../../../games/dist/list";
import { AlgolBattle, AlgolSession, AlgolStaticGameAPI } from "../../../types";
import { parseSeed } from "../../../encoding/src/seed/seed.parse";
import {
  forkSessionFromBattle,
  importSessionFromBattle,
  session2battle,
} from "../session";
import { gameAtoms, sessionStateAtom } from "./atoms";
import { ensureGameSessions, updateContainer } from "./helpers";
import { LocalSessionGameState } from "./types";
import {
  deleteSession,
  getSessionById,
  setLatestSessionIdForGame,
} from "../storage";
import produce from "immer";

export const localSessionActions = {
  getSessionsForGame: (api: AlgolStaticGameAPI) => {
    ensureGameSessions(api);
    return sessionStateAtom.getValue().perGame[api.gameId];
  },
  getGameSessionsAtom: (api: AlgolStaticGameAPI) => {
    ensureGameSessions(api);
    return gameAtoms[api.gameId];
  },
  subscribe: (opts: {
    listener: (v: LocalSessionGameState) => void;
    api: AlgolStaticGameAPI;
  }) => {
    const { listener, api } = opts;
    ensureGameSessions(api);
    if (!gameAtoms[api.gameId]) {
      gameAtoms[api.gameId] = focusAtom(
        sessionStateAtom,
        o => o.prop[api.gameId]
      );
    }
    return gameAtoms[api.gameId].subscribe(listener);
  },
  importSession: (opts: { seed: string; api: AlgolStaticGameAPI }) => {
    const { seed, api } = opts;
    const save = parseSeed(seed, api.gameId);
    const battle = api.fromSave(save);
    const session = importSessionFromBattle(battle, api.iconMap, api.gameId);
    updateContainer(
      {
        error: null,
        id: session.id,
        session,
      },
      api
    );
    return { session, battle };
  },
  forkBattleFrame: (opts: {
    battle: AlgolBattle;
    frame: number;
    api: AlgolStaticGameAPI;
  }) => {
    const { battle, frame, api } = opts;
    const historyFrame = battle.history[frame];
    const newBattle = api.fromFrame(historyFrame, battle.variant.code);
    const session = forkSessionFromBattle(newBattle, api.iconMap, api.gameId);
    updateContainer({ session, id: session.id, error: null }, api);
    return { session, battle: newBattle };
  },
  deleteSession: (sessionId: string, gameId: GameId) => {
    deleteSession(gameId, sessionId);
    sessionStateAtom.update(old =>
      produce(old, draft => {
        delete draft.perGame[gameId].containers[sessionId];
      })
    );
  },
  saveSession: (opts: { session: AlgolSession; api: AlgolStaticGameAPI }) => {
    const { session, api } = opts;
    updateContainer({ session, id: session.id, error: null }, api);
  },
  loadSession: (opts: {
    sessionId: string;
    api: AlgolStaticGameAPI;
  }):
    | { battle: AlgolBattle; session: AlgolSession; error: null }
    | { battle: null; session: null; error: string } => {
    const { sessionId, api } = opts;
    ensureGameSessions(api);
    try {
      const session = getSessionById(api.gameId, sessionId)!;
      try {
        const battle = session2battle(session, api);
        setLatestSessionIdForGame(api.gameId, session.id);
        return {
          battle,
          session,
          error: null,
        };
      } catch (err) {
        sessionStateAtom.update(old =>
          produce(old, draft => {
            draft.perGame[api.gameId].containers[sessionId].error = new Error(
              "The moves in this session where not valid!"
            );
          })
        );
        return {
          battle: null,
          session: null,
          error: "The moves in this session where not valid!",
        };
      }
    } catch (err) {
      sessionStateAtom.update(old =>
        produce(old, draft => {
          draft.perGame[api.gameId].containers[sessionId].error = new Error(
            "Failed to read this session"
          );
        })
      );
      return {
        battle: null,
        session: null,
        error: "Failed to read this session",
      };
    }
  },
};
