import { atom } from "klyva";
import produce from "immer";
import { parseSeed } from "../../../encoding/src/seed";
import { GameId } from "../../../games/dist/list";
import { AlgolBattle, AlgolSession, AlgolStaticGameAPI } from "../../../types";
import { forkSessionFromBattle, importSessionFromBattle } from "../session";
import { deleteSession, writeSession } from "../storage";

type SessionId = string;

type LocalSessionGameState = {
  sessions: Record<SessionId, AlgolSession>;
  error: Error | null;
  corruptSessions: Record<SessionId, string>;
};

const getDefaultLocalSessionGameState = (): LocalSessionGameState => ({
  sessions: {},
  error: null,
  corruptSessions: {},
});

type LocalSessionState = {
  perGame: Partial<Record<GameId, LocalSessionGameState>>;
};

const apiAtom = atom<AlgolStaticGameAPI | null>(
  (null as unknown) as AlgolStaticGameAPI
); // Weird bug: have to cast to not be typed as ReadableAtom

const sessionStateAtom = atom<LocalSessionState>({ perGame: {} });

// Write to disk and update atom
const updateSession = (session: AlgolSession) => {
  const api = apiAtom.getValue()!;
  writeSession(api.gameId, session);
  sessionStateAtom.update(old =>
    produce(old, draft => {
      if (!draft.perGame[api.gameId]) {
        draft.perGame[api.gameId] = getDefaultLocalSessionGameState();
      }
      draft.perGame[api.gameId].sessions[session.id] = session;
    })
  );
};

// Stateful mostly just to track corrupt session state
export const brain = {
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
};
