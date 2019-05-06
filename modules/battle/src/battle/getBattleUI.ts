import { getBattleInstruction } from "./helpers/getBattleInstruction";

import { AlgolBattleUI, AlgolGame, AlgolBattle } from "../../../types";
import dataURIs from "../../../graphics/dist/svgDataURIs";

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
    { potentialMarks: [] as string[], commands: [] as string[] }
  );

  return {
    player: battle.player,
    winner: battle.winner,
    turnNumber: battle.turnNumber,
    gameId: game.gameId,
    board: {
      ...battle.state.board,
      units: Object.keys(battle.state.board.units).reduce(
        (mem, id) => ({
          ...mem,
          [id]: {
            ...battle.state.board.units[id],
            icon:
              dataURIs[game.gameId].icons[battle.state.board.units[id].group]
          }
        }),
        {}
      )
    },
    endTurn: !!currentStep.LINKS.endTurn,
    potentialMarks,
    commands,
    undo: battle.state.undo && battle.state.undo.command,
    instruction: getBattleInstruction(game, battle),
    anim: currentStep.anim || { enterFrom: {}, exitTo: {}, ghosts: [] }
  };
}
