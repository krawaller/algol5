import { AlgolBattle } from "../../../../types";

export function battleMark(battle: AlgolBattle, pos: string): AlgolBattle {
  const oldState = battle.state;
  if (oldState.markStamps[pos]) {
    return {
      ...battle,
      state: oldState.markStamps[pos]
    };
  }
  return {
    ...battle,
    state: {
      ...oldState,
      currentStepId: `${oldState.currentStepId}-${pos}`,
      board: {
        marks: oldState.board.marks.concat(pos),
        units: oldState.board.units
      },
      markStamps: {
        ...oldState.markStamps,
        [pos]: oldState
      }
    }
  };
}
