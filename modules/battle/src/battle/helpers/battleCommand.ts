import { AlgolBattle, AlgolGame } from "algol-types";
import { emptyAnim } from "algol-common";

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
    (steps[newStepId] = game.action[oldStep.LINKS.commands[command]](oldStep));
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
        player: battle.player,
        turn: newStep.TURN,
        description: {
          line: [
            { player: battle.player },
            { text: " played " },
            {
              bold: oldState.board.marks.length
                ? `${command}(${oldState.board.marks.join(", ")})`
                : command
            }
          ]
        },
        board: {
          marks: oldState.board.marks,
          units: newStep.UNITDATA,
          anim: oldStep.anim || emptyAnim,
          potentialMarks: []
        }
      }),
      board: {
        marks: [],
        units: newStep.UNITDATA,
        anim: newStep.anim || emptyAnim,
        potentialMarks: Object.keys(newStep.LINKS.marks)
      },
      markStamps: {}
    }
  };
}
