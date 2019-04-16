import { AlgolBattle } from "../../../../types";

export function battleCommand(
  battle: AlgolBattle,
  command: string
): AlgolBattle {
  const oldState = battle.state;
  const newStepId = `${oldState.currentStepId}-${command}`;
  const newStep = battle.turn.steps[newStepId];
  return {
    ...battle,
    state: {
      ...oldState,
      currentStepId: newStepId,
      undos: oldState.undos.concat({
        state: oldState,
        command
      }),
      entries: oldState.entries.concat({
        description: oldState.board.marks.length
          ? `${command}(${oldState.board.marks.join(", ")})`
          : command,
        board: {
          marks: oldState.board.marks,
          units: newStep.UNITDATA
        }
      }),
      board: {
        marks: [],
        units: newStep.UNITDATA
      },
      markStamps: {}
    }
  };
}
