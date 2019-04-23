import { getBattleInstruction } from "./helpers/getBattleInstruction";

import { AlgolBattleUI, AlgolGame, AlgolBattle } from "../../../types";

const identifyMark = /^[a-z][0-9]+$/;

export function getBattleUI(
  game: AlgolGame,
  battle: AlgolBattle
): AlgolBattleUI {
  const currentStep = battle.turn.steps[battle.state.currentStepId];
  const { potentialMarks, commands } = Object.keys(
    currentStep.LINKS.actions
  ).reduce(
    (mem, action) => {
      const isMark = action.match(identifyMark);
      return {
        potentialMarks: isMark
          ? mem.potentialMarks.concat(action)
          : mem.potentialMarks,
        commands: isMark ? mem.commands : mem.commands.concat(action)
      };
    },
    { potentialMarks: [], commands: [] }
  );

  return {
    player: battle.player,
    winner: battle.winner,
    turnNumber: battle.turnNumber,
    gameId: game.gameId,
    board: battle.state.board,
    endTurn: !!currentStep.LINKS.endTurn,
    potentialMarks,
    commands,
    undo: battle.state.undo && battle.state.undo.command,
    instruction: getBattleInstruction(game, battle)
  };
}
