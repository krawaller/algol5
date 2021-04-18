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
  isSessionLoadFail,
  setLatestSessionIdForGame,
  writeSession,
} from "../storage";

type SessionContainer =
  | { session: AlgolSession; error: null; id: string }
  | { session: AlgolSession | null; error: Error; id: string };

type LocalSessionGameState = {
  containers: Record<string, SessionContainer>;
  retrieved: false | true | Error;
};

const getInitialLocalSessionGameState = (
  api: AlgolStaticGameAPI
): LocalSessionGameState => {
  let containers: Record<string, SessionContainer> = {};
  try {
    containers = getSessionList(api.gameId, false)
      .concat(getSessionList(api.gameId, true))
      .map(s => {
        if (isSessionLoadFail(s))
          return { session: null, error: s.error, id: s.id };
        if (!api.variants.find(v => v.code === s.variantCode)) {
          return {
            session: s,
            error: new Error("Unknown variant code"),
            id: s.id,
          };
        }
        return { session: s, error: null, id: s.id };
      })
      .reduce((memo, c) => {
        memo[c.id] = c;
        return memo;
      }, {} as Record<string, SessionContainer>);
    return {
      containers,
      retrieved: true,
    };
  } catch (err) {
    return {
      containers: {},
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
  const { gameId } = api;
  const val = sessionStateAtom.getValue();
  if (!val[gameId]) {
    sessionStateAtom.update(old =>
      produce(old, draft => {
        if (!draft.perGame[gameId]) {
          draft.perGame[gameId] = getInitialLocalSessionGameState(api);
        }
      })
    );
  }
  if (!gameAtoms[gameId]) {
    gameAtoms[gameId] = focusAtom(sessionStateAtom, o => o.prop[gameId]);
  }
};

// Write to disk and update atom
const updateContainer = (container: SessionContainer) => {
  const api = apiAtom.getValue()!;
  ensureGameSessions();
  if (container.session) {
    writeSession(api.gameId, container.session);
  }
  sessionStateAtom.update(old =>
    produce(old, draft => {
      draft.perGame[api.gameId].containers[container.id] = container;
    })
  );
};

// Stateful mostly just to track corrupt session state
export const brain = {
  getSessions: () => {
    const api = apiAtom.getValue()!;
    ensureGameSessions();
    return sessionStateAtom.getValue[api.gameId];
  },
  getSessionsAtom: () => {
    const api = apiAtom.getValue()!;
    return gameAtoms[api.gameId];
  },
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
    updateContainer({
      error: null,
      id: session.id,
      session,
    });
    return { session, battle };
  },
  forkBattleFrame: (battle: AlgolBattle, frame: number) => {
    const api = apiAtom.getValue()!;
    const historyFrame = battle.history[frame];
    const newBattle = api.fromFrame(historyFrame, battle.variant.code);
    const session = forkSessionFromBattle(newBattle, api.iconMap, api.gameId);
    updateContainer({ session, id: session.id, error: null });
    return { session, battle: newBattle };
  },
  deleteSession: (sessionId: string) => {
    const api = apiAtom.getValue()!;
    deleteSession(api.gameId, sessionId);
    sessionStateAtom.update(old =>
      produce(old, draft => {
        delete draft.perGame[api.gameId].containers[sessionId];
      })
    );
  },
  saveSession: (session: AlgolSession) => {
    updateContainer({ session, id: session.id, error: null });
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
