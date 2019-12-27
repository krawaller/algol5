import { AlgolGame, AlgolBattle } from "../../../../types";
import { endTurn } from "../turn";
import { battleEndGame } from "./battleEndGame";

import { emptyAnim } from "../../../../common";
import { battleTurnPath } from "./battleTurnPath";

export function battleEndTurn(game: AlgolGame, btl: AlgolBattle): AlgolBattle {
  const battle = {
    ...btl,
    path: btl.path.concat(battleTurnPath(btl)),
  };
  const currentStep = battle.turn.steps[battle.state.currentStepId];

  if (currentStep.LINKS.endGame) return battleEndGame(battle);

  const nextTurn = endTurn(game, battle.turn, battle.state.currentStepId);
  return {
    path: battle.path,
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
        potentialMarks: Object.keys(nextTurn.steps.root.LINKS.marks),
      },
    },
  };
}
