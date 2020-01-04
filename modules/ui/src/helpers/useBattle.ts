import { useReducer, useRef, useMemo } from "react";
import {
  AlgolStaticGameAPI,
  AlgolBattle,
  AlgolLocalBattle,
  AlgolBattleSave,
} from "../../../types";
import {
  newSessionFromBattle,
  updateSession,
  writeSession,
} from "../../../local/src";

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
        return {
          battle: state.battle,
          frame: arg,
        };
      } else if (cmnd === "new") {
        const battle = api.newBattle();
        session.current = newSessionFromBattle(battle);
        return {
          battle,
          frame: 1,
        };
      } else if (cmnd === "load") {
        const battle = api.fromSave(arg);
        const frame = battle.gameEndedBy
          ? battle.history.length - 1
          : battle.history.length;
        return {
          battle,
          frame,
        };
      } else if (cmnd === "leave") {
        return {
          battle: null,
          frame: 0,
        };
      } else {
        const battle = api.performAction(state.battle!, cmnd, instr[1]);
        const frame = battle.gameEndedBy
          ? battle.history.length - 1
          : cmnd === "endTurn"
          ? battle.history.length
          : state.frame;
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
      frame: 0,
    }
  );
  const actions = useMemo(
    () => ({
      mark: (pos: string) => dispatch(["mark", pos]),
      endTurn: () => dispatch(["endTurn", null]),
      command: (cmnd: string) => dispatch(["command", cmnd]),
      undo: () => dispatch(["undo", null]),
      new: () => dispatch(["new", null]),
      load: (save: AlgolBattleSave) => dispatch(["load", save]),
      leave: () => dispatch(["leave", null]),
      toFrame: (frame: number) => dispatch(["toFrame", frame]),
    }),
    []
  );
  return [state, actions] as const;
}
