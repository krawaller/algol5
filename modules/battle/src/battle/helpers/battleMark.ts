import { AlgolBattle, AlgolGame } from "../../../../types";

export function battleMark(
  game: AlgolGame,
  battle: AlgolBattle,
  pos: string
): AlgolBattle {
  const {
    state: oldState,
    turn: { steps }
  } = battle;
  // mark exists, so we simply go back in time
  if (oldState.markStamps[pos]) {
    return {
      ...battle,
      state: oldState.markStamps[pos]
    };
  }
  // making new mark!
  const oldStepId = oldState.currentStepId;
  const newStepId = `${oldStepId}-${pos}`;
  if (!steps[newStepId]) {
    const oldStep = steps[oldStepId];
    steps[newStepId] = game.action[oldStep.LINKS.actions[pos]](oldStep, pos);
  }
  return {
    ...battle,
    state: {
      ...oldState,
      currentStepId: newStepId,
      board: {
        marks: oldState.board.marks.concat(pos),
        units: oldState.board.units,
        anim: { enterFrom: {}, exitTo: {}, ghosts: [] }
      },
      markStamps: {
        ...oldState.markStamps,
        [pos]: oldState
      }
    }
  };
}
