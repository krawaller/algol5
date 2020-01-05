import { useReducer, useRef, useMemo } from "react";
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
} from "../../../../local/src";

type BattleAction =
  | "mark"
  | "command"
  | "endTurn"
  | "undo"
  | "toFrame"
  | "new"
  | "load"
  | "leave";
type BattleCmnd = [BattleAction, any];

type BattleHookState = {
  battle: AlgolBattle | null;
  frame: number;
  session: AlgolLocalBattle | null;
};

export function useBattle(api: AlgolStaticGameAPI) {
  const [state, dispatch] = useReducer(
    (state: BattleHookState, instr: BattleCmnd) => {
      const [cmnd, arg] = instr;
      if (cmnd === "toFrame") {
        // user chose a new frame (in history view)
        return {
          battle: state.battle,
          session: state.session,
          frame: arg,
        };
      } else if (cmnd === "new") {
        // user started a new local battle! initiate it
        const battle = api.newBattle();
        return {
          battle,
          frame: -1,
          session: newSessionFromBattle(battle),
        };
      } else if (cmnd === "load") {
        // user chose a battle in the list of saved battles. we load it
        // and set it as current battle.
        const session: AlgolLocalBattle = arg;
        const battle = session2battle(session, api);
        const frame = battle.gameEndedBy ? battle.history.length - 1 : -1;
        return {
          battle,
          frame,
          session,
        };
      } else if (cmnd === "leave") {
        // TODO - leave battle vs session
        // user leaves the battle. will cause app to return to game landing
        return {
          session: null,
          battle: null,
          frame: -1,
        };
      } else {
        // action was mark, command or endTurn. passing it on to game API
        const battle = api.performAction(state.battle!, cmnd, instr[1]);
        const frame = battle.gameEndedBy ? battle.history.length - 1 : -1;
        let session = state.session;
        if (cmnd === "endTurn") {
          session = updateSession(battle, state.session!);
          writeSession(api.gameId, session);
        }
        return {
          frame,
          battle,
          session,
        };
      }
    },
    {
      battle: null,
      frame: -1,
      session: null,
    }
  );
  const actions = useMemo(
    () => ({
      mark: (pos: string) => dispatch(["mark", pos]),
      endTurn: () => dispatch(["endTurn", null]),
      command: (cmnd: string) => dispatch(["command", cmnd]),
      undo: () => dispatch(["undo", null]),
      new: () => dispatch(["new", null]),
      load: (session: AlgolLocalBattle) => dispatch(["load", session]),
      leaveBattle: () => dispatch(["leave", null]),
      toFrame: (frame: number) => dispatch(["toFrame", frame]),
      seeHistory: () => dispatch(["toFrame", 0]),
      leaveHistory: () => dispatch(["toFrame", -1]),
    }),
    []
  );
  return [state, actions] as const;
}
