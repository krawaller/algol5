import { useReducer, useMemo } from "react";
import {
  AlgolStaticGameAPI,
  AlgolBattle,
  AlgolLocalBattle,
} from "../../../../types";
import {
  newSessionFromBattle,
  updateSession,
  writeSession,
  session2battle,
  deleteSession,
  forkSessionFromBattle,
  getLatestSessionId,
  getSessionById,
  setLatestSessionId,
} from "../../../../local/src";

type BattleAction =
  | "mark"
  | "command"
  | "endTurn"
  | "undo"
  | "toFrame"
  | "new"
  | "load"
  | "deleteCurrentSession"
  | "fork"
  | "continuePreviousSession";
type BattleCmnd = [BattleAction, any];

type BattleHookState = {
  battle: AlgolBattle | null;
  frame: number;
  session: AlgolLocalBattle | null;
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
        battle: state.battle,
        session: state.session,
        frame: arg,
        hasPrevious: true,
      };
    } else if (cmnd === "new") {
      // user started a new local battle! initiate it
      const battle = api.newBattle(arg);
      const session = newSessionFromBattle(battle, api.iconMap);
      setLatestSessionId(api.gameId, session.id);
      return {
        battle,
        frame: 0,
        session,
        hasPrevious: true,
      };
    } else if (cmnd === "load") {
      // user chose a battle in the list of saved battles. we load it
      // and set it as current battle.
      const sessionId = arg;
      const session = getSessionById(api.gameId, sessionId)!; // TODO - handle error
      setLatestSessionId(api.gameId, session.id);
      const battle = session2battle(session, api);
      return {
        battle,
        session,
        frame: battle.history.length - 1,
        hasPrevious: true,
      };
    } else if (cmnd === "deleteCurrentSession") {
      deleteSession(api.gameId, state.session!.id);
      return {
        battle: null,
        session: null,
        frame: 0,
        hasPrevious: false,
      };
    } else if (cmnd === "fork") {
      const historyFrame = state.battle!.history[state.frame];
      const battle = api.fromFrame(historyFrame, state.battle!.variant.code);
      const session = forkSessionFromBattle(battle, api.iconMap);
      setLatestSessionId(api.gameId, session.id);
      writeSession(api.gameId, session);
      return {
        battle,
        session,
        frame: battle.history.length - 1,
        hasPrevious: true,
      };
    } else if (cmnd === "continuePreviousSession") {
      if (state.battle) {
        // still have a battle in memory, so just go back to that
        return {
          ...state,
        };
      } else {
        // load the last session from disk
        // (we know we have one since otherwise this cmnd wouldn't be available)
        const lastSessionId = getLatestSessionId(api.gameId)!;
        const session = getSessionById(api.gameId, lastSessionId);
        return reducer(state, ["load", session]);
      }
    } else {
      // action was mark, command or endTurn. passing it on to game API
      const battle = api.performAction(state.battle!, cmnd, instr[1]);
      let newFrame = state.frame;
      let session = state.session;
      if (cmnd === "endTurn") {
        session = updateSession(battle, state.session!, api.iconMap);
        writeSession(api.gameId, session);
        newFrame = battle.history.length - 1;
      }
      return {
        frame: newFrame,
        battle,
        session,
        hasPrevious: true,
      };
    }
  };
  return reducer;
};

export function useBattle(api: AlgolStaticGameAPI) {
  const reducer = useMemo(() => makeReducerForAPI(api), [api]);
  const [state, dispatch] = useReducer(
    reducer,
    // initial state is in the game lobby with nothing in memory.
    // (at which point useUi renders a demo)
    {
      battle: null,
      frame: -1,
      session: null,
      hasPrevious: !!getLatestSessionId(api.gameId),
    }
  );
  const actions = useMemo(
    () => ({
      mark: (pos: string) => dispatch(["mark", pos]),
      endTurn: () => dispatch(["endTurn", null]),
      command: (cmnd: string) => dispatch(["command", cmnd]),
      undoBattleCommand: () => dispatch(["undo", null]),
      newLocalBattle: (code: string) => dispatch(["new", code]),
      loadLocalSession: (sessionId: string) => dispatch(["load", sessionId]),
      toFrame: (frame: number) => dispatch(["toFrame", frame]),
      deleteCurrentSession: () => dispatch(["deleteCurrentSession", null]),
      forkSession: () => dispatch(["fork", null]),
      continuePreviousSession: () =>
        dispatch(["continuePreviousSession", null]),
    }),
    []
  );
  return [state, actions] as const;
}

export type BattleActions = ReturnType<typeof useBattle>[1];
