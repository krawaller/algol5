import { Atom, atom, focusAtom } from "klyva";
import produce from "immer";
import { parseSeed } from "../../../encoding/src/seed";
import { GameId } from "../../../games/dist/list";
import { AlgolBattle, AlgolSession, AlgolStaticGameAPI } from "../../../types";
import {
  forkSessionFromBattle,
  importSessionFromBattle,
  session2battle,
} from "../session";
import {
  deleteSession,
  getSessionById,
  getSessionList,
  isSessionLoadSuccess,
  setLatestSessionIdForGame,
  writeSession,
} from "../storage";

type SessionId = string;

type LocalSessionGameState = {
  sessions: AlgolSession[];
  corruptSessions: Record<SessionId, string>;
  retrieved: false | true | Error;
};

const getDefaultLocalSessionGameState = (
  api: AlgolStaticGameAPI
): LocalSessionGameState => {
  let sessions: AlgolSession[] = [];
  try {
    sessions = getSessionList(api.gameId, false)
      .concat(getSessionList(api.gameId, true))
      .filter(isSessionLoadSuccess) // TODO - show corrupted sessions too
      .filter(session =>
        Boolean(api.variants.find(v => v.code === session.variantCode))
      );
    return {
      sessions,
      corruptSessions: {},
      retrieved: true,
    };
  } catch (err) {
    return {
      sessions: [],
      corruptSessions: {},
      retrieved: err,
    };
  }
};

type LocalSessionState = {
  perGame: Partial<Record<GameId, LocalSessionGameState>>;
};

const apiAtom = atom<AlgolStaticGameAPI | null>(
  (null as unknown) as AlgolStaticGameAPI
); // Weird bug: have to cast to not be typed as ReadableAtom

const sessionStateAtom = atom<LocalSessionState>({ perGame: {} });

const gameAtoms: Partial<Record<GameId, Atom<LocalSessionGameState>>> = {};

const ensureGameSessions = () => {
  const api = apiAtom.getValue();
  const val = sessionStateAtom.getValue();
  if (!val[api.gameId]) {
    sessionStateAtom.update(old =>
      produce(old, draft => {
        if (!draft.perGame[api.gameId]) {
          draft.perGame[api.gameId] = getDefaultLocalSessionGameState(api);
        }
      })
    );
  }
};

// Write to disk and update atom
const updateSession = (session: AlgolSession) => {
  const api = apiAtom.getValue()!;
  ensureGameSessions();
  writeSession(api.gameId, session);
  sessionStateAtom.update(old =>
    produce(old, draft => {
      draft.perGame[api.gameId].sessions[session.id] = session;
    })
  );
};

// Stateful mostly just to track corrupt session state
export const brain = {
  subscribe: (listener: (v: LocalSessionGameState) => void) => {
    const gameId = apiAtom.getValue().gameId;
    if (!gameAtoms[gameId]) {
      gameAtoms[gameId] = focusAtom(sessionStateAtom, o => o.prop[gameId]);
    }
    return gameAtoms[gameId].subscribe(listener);
  },
  setGameAPI: (api: AlgolStaticGameAPI | null) => apiAtom.update(api),
  importSession: (seed: string) => {
    const api = apiAtom.getValue()!;
    const save = parseSeed(seed, api.gameId);
    const battle = api.fromSave(save);
    const session = importSessionFromBattle(battle, api.iconMap, api.gameId);
    updateSession(session);
    return { session, battle };
  },
  forkBattleFrame: (battle: AlgolBattle, frame: number) => {
    const api = apiAtom.getValue()!;
    const historyFrame = battle.history[frame];
    const newBattle = api.fromFrame(historyFrame, battle.variant.code);
    const session = forkSessionFromBattle(newBattle, api.iconMap, api.gameId);
    updateSession(session);
    return { session, battle: newBattle };
  },
  deleteSession: (sessionId: string) => {
    const api = apiAtom.getValue()!;
    deleteSession(api.gameId, sessionId);
    sessionStateAtom.update(old =>
      produce(old, draft => {
        delete draft.perGame[api.gameId].sessions[sessionId];
      })
    );
  },
  saveSession: (session: AlgolSession) => {
    updateSession(session);
  },
  loadSession: (
    sessionId: string
  ):
    | { battle: AlgolBattle; session: AlgolSession; error: null }
    | { battle: null; session: null; error: string } => {
    ensureGameSessions();
    const api = apiAtom.getValue();
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
            draft.perGame[api.gameId].corruptSessions[sessionId] =
              "The moves in this session where not valid!";
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
          draft.perGame[api.gameId].corruptSessions[sessionId] =
            "Failed to read this session";
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
