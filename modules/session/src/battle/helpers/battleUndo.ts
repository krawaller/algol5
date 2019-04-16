import { AlgolBattle } from "../../../../types";

export function battleUndo(battle: AlgolBattle): AlgolBattle {
  return {
    ...battle,
    state: battle.state.undos.slice(-1).pop().state
  };
}
