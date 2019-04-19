import { AlgolBattle, AlgolGame } from "../../../../types";

export function battleCommand(
  game: AlgolGame,
  battle: AlgolBattle,
  command: string
): AlgolBattle {
  const {
    turn: { steps },
    state: oldState
  } = battle;
  const oldStepId = oldState.currentStepId;
  const oldStep = steps[oldStepId];
  const newStepId = `${oldStepId}-${command}`;
  const newStep =
    steps[newStepId] ||
    (steps[newStepId] = game.action[oldStep.LINKS.actions[command]](oldStep));
  return {
    ...battle,
    state: {
      ...oldState,
      currentStepId: newStepId,
      undo: {
        state: oldState,
        command
      },
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
