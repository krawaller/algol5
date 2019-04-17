import {
  AlgolSession,
  AlgolSessionUI,
  AlgolGame,
  AlgolBattle
} from "../../../types";
import games from "../../../logic/dist";

const identifyMark = /^[a-z][0-9]+$/;

export function getSessionUI(session: AlgolSession): AlgolSessionUI {
  const { gameId, sessionId, battle } = session;
  const game = games[gameId];
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
    gameId,
    sessionId,
    board: battle.state.board,
    endTurn: !!currentStep.LINKS.endTurn,
    potentialMarks,
    commands,
    undo: battle.state.undo && battle.state.undo.command,
    instruction: getInstructionForBattle(game, battle)
  };
}

// TODO - special if battle is over?
function getInstructionForBattle(game: AlgolGame, battle: AlgolBattle) {
  const { currentStepId } = battle.state;
  const currentStep = battle.turn.steps[currentStepId];
  if (currentStepId === "root") {
    return game.instruction["startTurn" + battle.player](currentStep);
  }
  const actions = currentStepId.split("-");
  const lastAction = actions.slice(-1).pop();
  const prevStepId = actions.slice(0, -1).join("-");
  const prevStep = battle.turn.steps[prevStepId];
  const actionFunc = prevStep.LINKS.actions[lastAction];
  return game.instruction[actionFunc](currentStep);
}
