import produce from "immer";
import { atom } from "klyva";
import { AlgolStaticGameAPI } from "../../../types";
import { getSessionList, isSessionLoadFail, writeSession } from "../storage";
import { gameAtoms, sessionStateAtom } from "./atoms";
import { LocalSessionGameState, SessionContainer } from "./types";

export const getInitialLocalSessionGameState = (
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

export const ensureGameSessions = (api: AlgolStaticGameAPI) => {
  const { gameId } = api;
  const val = sessionStateAtom.getValue();
  if (!val[gameId]) {
    sessionStateAtom.update(old =>
      produce(old, draft => {
        if (!draft[gameId]) {
          draft[gameId] = getInitialLocalSessionGameState(api);
        }
      })
    );
    gameAtoms[gameId] = atom(get => get(sessionStateAtom)[gameId]);
  }
};

// Write to disk and update atom
export const updateContainer = (
  container: SessionContainer,
  api: AlgolStaticGameAPI
) => {
  ensureGameSessions(api);
  if (container.session) {
    writeSession(api.gameId, container.session);
  }
  sessionStateAtom.update(old =>
    produce(old, draft => {
      draft[api.gameId]!.containers[container.id] = container;
    })
  );
};
