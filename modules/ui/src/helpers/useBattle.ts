import { useReducer, useRef } from "react";
import {
  AlgolStaticGameAPI,
  AlgolBattle,
  AlgolLocalBattle,
} from "../../../types";
import { newSessionFromBattle, updateSession } from "../../../local/src";

type BattleAction = "mark" | "command" | "endTurn" | "undo" | "toFrame" | "new";
type BattleCmnd = [BattleAction, any];

type BattleHookState = {
  battle: AlgolBattle | null;
  frame: number;
};

export function useBattle(api: AlgolStaticGameAPI) {
  const session = useRef<null | AlgolLocalBattle>(null);
  return useReducer(
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
      } else {
        const battle = api.performAction(state.battle!, cmnd, instr[1]);
        const frame = battle.gameEndedBy
          ? battle.history.length - 1
          : cmnd === "endTurn"
          ? battle.history.length
          : state.frame;
        if (cmnd === "endTurn") {
          session.current = updateSession(battle, session.current!);
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
}
