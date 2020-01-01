import { useReducer } from "react";
import { AlgolStaticGameAPI, AlgolBattle } from "../../../types";

type BattleAction = "mark" | "command" | "endTurn" | "undo" | "toFrame" | "new";
type BattleCmnd = [BattleAction, any];

type BattleHookState = {
  battle: AlgolBattle | null;
  frame: number;
};

export function useBattle(api: AlgolStaticGameAPI) {
  return useReducer(
    (state: BattleHookState, instr: BattleCmnd) => {
      const [cmnd, arg] = instr;
      if (cmnd === "toFrame") {
        return {
          battle: state.battle,
          frame: arg,
        };
      } else if (cmnd === "new") {
        return {
          battle: api.newBattle(),
          frame: 1,
        };
      } else {
        const newBattle = api.performAction(state.battle!, cmnd, instr[1]);
        return {
          frame: newBattle.gameEndedBy
            ? newBattle.history.length - 1
            : cmnd === "endTurn"
            ? newBattle.history.length
            : state.frame,
          battle: newBattle,
        };
      }
    },
    {
      battle: null,
      frame: 0,
    }
  );
}
