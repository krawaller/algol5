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
        description: oldState.marks.length
          ? `${command}(${oldState.marks.join(", ")})`
          : command,
        board: {
          marks: oldState.marks,
          units: newStep.UNITDATA
        }
      }),
      marks: [],
      markStamps: {}
    }
  };
}
