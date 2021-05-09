import { useReducer, useMemo, useEffect, useRef } from "react";
import {
  AlgolStaticGameAPI,
  AlgolBattle,
  AlgolSession,
} from "../../../../types";
import {
  getLatestSessionIdForGame,
  setLatestSessionInfo,
  localSessionActions,
} from "../../../../local/expose";
import { BattleNavActions } from "../../contexts";

type BattleAction =
  | "mark"
  | "command"
  | "endTurn"
  | "undo"
  | "toFrame"
  | "new"
  | "load";
type BattleCmnd = [BattleAction, any];

type BattleHookState = {
  battle: AlgolBattle | null;
  frame: number;
  session: AlgolSession | null;
  hasPrevious: boolean;
};

const makeReducerForAPI = (api: AlgolStaticGameAPI) => {
  const reducer = (
    state: BattleHookState,
    instr: BattleCmnd
  ): BattleHookState => {
    const [cmnd, arg] = instr;
    if (cmnd === "toFrame") {
      // user chose a new frame in history view
      return {
        ...state,
        frame: arg,
        hasPrevious: true,
      };
    } else if (cmnd === "new") {
      // user started a new local battle! initiate it
      const { battle, session } = localSessionActions.newSession({
        api,
        code: arg,
      });
      return {
        ...state,
        battle,
        frame: 0,
        session,
        hasPrevious: true,
      };
    } else if (cmnd === "load") {
      // user chose a battle in the list of saved battles. we load it
      // and set it as current battle.
      const sessionId = arg;
      const { session, battle, error } = localSessionActions.loadSession({
        sessionId,
        api,
      });
      const frame = battle ? battle.history.length - 1 : -1;
      if (error) {
        alert(error);
        return {
          ...state,
          battle: null,
          session: null,
          frame,
        };
      } else {
        return {
          ...state,
          battle,
          session,
          frame,
        };
      }
    } else {
      // action was mark, command or endTurn. passing it on to game API
      const battle = api.performAction(state.battle!, cmnd, instr[1]);
      let newFrame = state.frame;
      let session = state.session;
      if (cmnd === "endTurn") {
        session = localSessionActions.updateSessionFromBattle({
          battle,
          session: session!,
          api,
        });
        newFrame = battle.history.length - 1;
      }
      return {
        ...state,
        frame: newFrame,
        battle,
        session,
        hasPrevious: true,
      };
    }
  };
  return reducer;
};

export function useBattle(
  api: AlgolStaticGameAPI,
  sessionId: string | null,
  toSession: BattleNavActions["toSession"]
) {
  const reducer = useMemo(() => makeReducerForAPI(api), [api]);
  const [state, dispatch] = useReducer(
    reducer,
    // initial state is in the game lobby with nothing in memory.
    // (at which point useUi renders a demo)
    {
      battle: null,
      frame: -1,
      session: null,
      hasPrevious: !!getLatestSessionIdForGame(api.gameId),
    }
  );
  const justStartedNew = useRef(false);
  useEffect(() => {
    // If sessionId changed, get correct session
    if (sessionId) {
      if (sessionId.match(/^new_/)) {
        const code = sessionId.slice(4);
        justStartedNew.current = true;
        dispatch(["new", code]);
      } else {
        dispatch(["load", sessionId]);
      }
    }
  }, [sessionId, api]);
  const currentSessionId = state.session && state.session.id;
  const hasMoves = ((state.battle && state.battle.history.length) || 0) >= 2;
  useEffect(() => {
    // If we're in a new session that now has proper history, navigate to it and remember it as last session
    if (
      !justStartedNew.current &&
      sessionId &&
      sessionId.match(/^new_/) &&
      currentSessionId &&
      hasMoves
    ) {
      setLatestSessionInfo(api.gameId, currentSessionId);
      toSession(currentSessionId, "playing", true);
    }
  }, [sessionId, currentSessionId, hasMoves]);
  justStartedNew.current = false;
  const actions = useMemo(
    () => ({
      mark: (pos: string) => dispatch(["mark", pos]),
      endTurn: () => dispatch(["endTurn", null]),
      command: (cmnd: string) => dispatch(["command", cmnd]),
      undoBattleCommand: () => dispatch(["undo", null]),
      toFrame: (frame: number) => dispatch(["toFrame", frame]),
    }),
    []
  );
  return [state, actions] as const;
}

export type BattleActions = ReturnType<typeof useBattle>[1];
