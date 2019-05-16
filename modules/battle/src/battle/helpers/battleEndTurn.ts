import { AlgolGame, AlgolBattle, AlgolAnimCompiled } from "../../../../types";
import { endTurn } from "../turn";
import { battleEndGame } from "./battleEndGame";

const emptyAnim: AlgolAnimCompiled = { enterFrom: {}, exitTo: {}, ghosts: [] };

const identifyMark = /^[a-z][0-9]+$/;

export function battleEndTurn(
  game: AlgolGame,
  battle: AlgolBattle
): AlgolBattle {
  const currentStep = battle.turn.steps[battle.state.currentStepId];

  if (currentStep.LINKS.endGame) return battleEndGame(battle);

  const nextTurn = endTurn(game, battle.turn, battle.state.currentStepId);
  return {
    turnNumber: nextTurn.steps.root.TURN,
    player: battle.player === 1 ? 2 : 1,
    turn: nextTurn,
    history: battle.history.concat(battle.state.entries),
    state: {
      currentStepId: "root",
      entries: [],
      markStamps: {},
      undo: null,
      board: {
        marks: [],
        units: nextTurn.steps.root.UNITDATA,
        anim: nextTurn.steps.root.anim || emptyAnim,
        potentialMarks: Object.keys(nextTurn.steps.root.LINKS.actions).filter(
          action => action.match(identifyMark)
        )
      }
    }
  };
}
