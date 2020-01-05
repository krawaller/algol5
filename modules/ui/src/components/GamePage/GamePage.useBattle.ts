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
};

export function useBattle(api: AlgolStaticGameAPI) {
  const session = useRef<null | AlgolLocalBattle>(null);
  const [state, dispatch] = useReducer(
    (state: BattleHookState, instr: BattleCmnd) => {
      const [cmnd, arg] = instr;
      if (cmnd === "toFrame") {
        // user chose a new frame (in history view)
        return {
          battle: state.battle,
          frame: arg,
        };
      } else if (cmnd === "new") {
        // user started a new local battle! initiate it
        const battle = api.newBattle();
        session.current = newSessionFromBattle(battle);
        return {
          battle,
          frame: -1,
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
        };
      } else if (cmnd === "leave") {
        // user leaves the battle. will cause app to return to game landing
        return {
          battle: null,
          frame: -1,
        };
      } else {
        // action was mark, command or endTurn. passing it on to game API
        const battle = api.performAction(state.battle!, cmnd, instr[1]);
        const frame = battle.gameEndedBy ? battle.history.length - 1 : -1;
        if (cmnd === "endTurn") {
          session.current = updateSession(battle, session.current!);
          writeSession(api.gameId, session.current);
        }
        return {
          frame,
          battle,
        };
      }
    },
    {
      battle: null,
      frame: -1,
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
