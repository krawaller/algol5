import { AlgolGame, AlgolBattle } from "../../../../types";
import { endTurn } from "../turn";

export function battleEndTurn(
  game: AlgolGame,
  battle: AlgolBattle
): AlgolBattle {
  const currentStep = battle.turn.steps[battle.state.currentStepId];
  if (currentStep.LINKS.endGame) {
    return {
      ...battle,
      state: {
        ...battle.state, // TODO: win entry!
        gameEndedBy: currentStep.LINKS.endedBy,
        winner: {
          win: battle.player,
          lose: battle.player === 1 ? 2 : 1,
          draw: 0
        }[currentStep.LINKS.endGame] as 0 | 1 | 2
      }
    };
  }
  const nextTurn = endTurn(game, battle.turn, battle.state.currentStepId);
  return {
    turnNumber: battle.turnNumber + 1,
    player: battle.player === 1 ? 2 : 1,
    turn: nextTurn,
    history: battle.history.concat({
      player: battle.player,
      moves: battle.state.entries
    }),
    state: {
      currentStepId: "root",
      entries: [],
      markStamps: {},
      marks: [],
      undos: []
    }
  };
}
