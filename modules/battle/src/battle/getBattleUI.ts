import { getBattleInstruction } from "./helpers/getBattleInstruction";

import { AlgolBattleUI, AlgolGame, AlgolBattle } from "../../../types";
import dataURIs from "../../../graphics/dist/svgDataURIs";

import { emptyAnim } from "../../../common";

const identifyMark = /^[a-z][0-9]+$/;

export function getBattleUI(
  game: AlgolGame,
  battle: AlgolBattle
): AlgolBattleUI {
  const currentStep = battle.turn.steps[battle.state.currentStepId];
  const commands = Object.keys(currentStep.LINKS.actions).filter(
    action => !action.match(identifyMark)
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
      ),
      anim: currentStep.anim || emptyAnim
    },
    endTurn: !!currentStep.LINKS.endTurn,
    commands,
    undo: battle.state.undo && battle.state.undo.command,
    instruction: getBattleInstruction(game, battle)
  };
}
