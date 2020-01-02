import { useReducer, useRef } from "react";
import {
  AlgolStaticGameAPI,
  AlgolBattle,
  AlgolLocalBattle,
} from "../../../types";

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
        session.current = {
          id: Math.random().toString(),
          created: Date.now(),
          updated: Date.now(),
          save: {
            player: 1,
            turn: 1,
            path: [],
          },
          screenshot: {
            marks: [],
            units: battle.state.board.units,
          },
        };
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
          session.current = {
            ...session.current!,
            updated: Date.now(),
            screenshot: {
              marks: battle.state.board.marks,
              units: battle.state.board.units,
            },
            save: {
              endedBy: battle.gameEndedBy,
              turn: battle.turnNumber,
              player: battle.gameEndedBy ? battle.winner! : battle.player,
              path: battle.path,
            },
          };
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
