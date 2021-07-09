import { focusAtom } from "klyva";
import { GameId } from "../../../games/dist/list";
import { AlgolBattle, AlgolSession, AlgolStaticGameAPI } from "../../../types";
import { parseSeed } from "../../../encoding/src/seed/seed.parse";
import {
  forkSessionFromBattle,
  importSessionFromBattle,
  newSessionFromBattle,
} from "../session";
import { gameAtoms, sessionStateAtom } from "./atoms";
import { ensureGameSessions, updateContainer } from "./helpers";
import { GameSessions } from "./types";
import {
  deleteGameSessions,
  deleteSession,
  getSessionById,
  setLatestSessionIdForGame,
} from "../storage";
import produce from "immer";
import { session2battle, updateSession } from "../../../common";

export const localSessionActions = {
  getSessionsForGame: (api: AlgolStaticGameAPI) => {
    ensureGameSessions(api);
    return sessionStateAtom.getValue()[api.gameId];
  },
  getGameSessionsAtom: (api: AlgolStaticGameAPI) => {
    ensureGameSessions(api);
    return gameAtoms[api.gameId];
  },
  subscribe: (opts: {
    listener: (v: GameSessions) => void;
    api: AlgolStaticGameAPI;
  }) => {
    const { listener, api } = opts;
    ensureGameSessions(api);
    if (!gameAtoms[api.gameId]) {
      gameAtoms[api.gameId] = focusAtom(
        sessionStateAtom,
        // eslint-disable-next-line
        // @ts-ignore
        o => o.prop[api.gameId]
      );
    }
    return gameAtoms[api.gameId]!.subscribe(listener);
  },
  newSession: (opts: { api: AlgolStaticGameAPI; code: string }) => {
    const { api, code } = opts;
    const battle = api.newBattle(code);
    const session = newSessionFromBattle(battle, api.iconMap, api.gameId);
    setLatestSessionIdForGame(api.gameId, session.id);
    return { battle, session };
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
        delete draft[gameId].containers[sessionId];
      })
    );
  },
  deleteErrorSessions: (gameId: GameId) => {
    sessionStateAtom.update(old =>
      produce(old, draft => {
        for (const sessionId of Object.keys(draft[gameId].containers)) {
          if (draft[gameId].containers[sessionId].error) {
            delete draft[gameId].containers[sessionId];
            deleteSession(gameId, sessionId);
          }
        }
      })
    );
  },
  deleteGameSessions: (gameId: GameId) => {
    deleteGameSessions(gameId);
    sessionStateAtom.update(old =>
      produce(old, draft => {
        delete draft[gameId];
      })
    );
  },
  updateSessionFromBattle: (opts: {
    battle: AlgolBattle;
    session: AlgolSession;
    api: AlgolStaticGameAPI;
  }) => {
    const { battle, api, session } = opts;
    const updatedSession = updateSession(battle, session, api.iconMap);
    updateContainer(
      { session: updatedSession, error: null, id: session.id },
      api
    );
    return updatedSession;
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
            draft[api.gameId].containers[sessionId].error = new Error(
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
      if (!sessionStateAtom.getValue()[api.gameId]?.containers[sessionId]) {
        return {
          battle: null,
          session: null,
          error: `Failed to find session with id "${sessionId}"`,
        };
      }
      sessionStateAtom.update(old =>
        produce(old, draft => {
          if (draft[api.gameId].containers[sessionId]) {
            draft[api.gameId].containers[sessionId].error = new Error(
              "Failed to read this session"
            );
          }
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
