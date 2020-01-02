import { AlgolBattle, AlgolLocalBattle } from "../../../types";

export function newSessionFromBattle(battle: AlgolBattle): AlgolLocalBattle {
  return {
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
}
