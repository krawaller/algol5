import { AlgolGame, AlgolBattle, AlgolContent } from "../../../../types";

export function getBattleInstruction(
  game: AlgolGame,
  battle: AlgolBattle
): AlgolContent<string, string> {
  const { currentStepId } = battle.state;
  const currentStep = battle.turn.steps[currentStepId];
  if (currentStepId === "root") {
    return game.instruction["startTurn" + battle.player](currentStep);
  }
  if (battle.gameEndedBy) {
    if (battle.winner === 0) {
      return {
        line: [
          { text: "Game ended in a draw through " },
          { bold: battle.gameEndedBy },
          { text: "!" }
        ]
      };
    } else {
      return {
        line: [
          { player: 1 },
          { text: " won through " },
          { bold: battle.gameEndedBy },
          { text: "!" }
        ]
      };
    }
  }
  const actions = currentStepId.split("-");
  const lastAction = actions.slice(-1).pop() as string;
  const prevStepId = actions.slice(0, -1).join("-");
  const prevStep = battle.turn.steps[prevStepId];
  const actionFunc =
    prevStep.LINKS.marks[lastAction] || prevStep.LINKS.commands[lastAction];
  return game.instruction[actionFunc](currentStep);
}
