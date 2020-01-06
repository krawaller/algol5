import { getBattleInstruction } from "./helpers/getBattleInstruction";

import { AlgolBattleUI, AlgolGame, AlgolBattle } from "../../../types";
import dataURIs from "../../../graphics/dist/svgDataURIs";

import { emptyAnim } from "../../../common";

export function getBattleUI(
  game: AlgolGame,
  battle: AlgolBattle
): AlgolBattleUI {
  const currentStep = battle.turn.steps[battle.state.currentStepId];
  const availableCmnds = Object.keys(currentStep.LINKS.commands);
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
              dataURIs[game.gameId as keyof typeof dataURIs].icons[
                battle.state.board.units[id].group
              ],
          },
        }),
        {}
      ),
      anim: currentStep.anim || emptyAnim,
    },
    endTurn: Boolean(currentStep.LINKS.endTurn || currentStep.LINKS.endGame),
    commands: Object.entries(game.commands)
      .map(
        ([cmnd, info]) =>
          [cmnd, { ...info, available: availableCmnds.includes(cmnd) }] as const
      )
      .reduce((mem, [cmnd, info]) => ({ ...mem, [cmnd]: info }), {}),
    undo: battle.state.undo && battle.state.undo.command,
    instruction: getBattleInstruction(game, battle),
  };
}
