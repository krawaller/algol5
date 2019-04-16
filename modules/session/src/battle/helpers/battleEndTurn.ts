import { AlgolGame, AlgolBattle } from "../../../../types";
import { endTurn } from "../turn";
import { battleEndGame } from "./battleEndGame";

export function battleEndTurn(
  game: AlgolGame,
  battle: AlgolBattle
): AlgolBattle {
  const currentStep = battle.turn.steps[battle.state.currentStepId];

  if (currentStep.LINKS.endGame) return battleEndGame(battle);

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
