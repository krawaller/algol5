import { AlgolGame, AlgolBattle, AlgolContent } from "../../../../types";

export function getBattleInstruction(
  game: AlgolGame,
  battle: AlgolBattle
): AlgolContent<string, string> {
  const { currentStepId } = battle.state;
  const currentStep = battle.turn.steps[currentStepId];
  if (currentStepId === "root") {
    const funcName = `startTurn_${battle.variant.ruleset}_${battle.player}`;
    if (!game.instruction[funcName]) {
      throw new Error(`Couldnt find function ${funcName}`);
    }
    return game.instruction[funcName](currentStep);
  }
  if (battle.gameEndedBy) {
    if (battle.winner === 0) {
      return {
        line: [
          { text: "Game ended in a draw through " },
          { bold: battle.gameEndedBy },
          { text: "!" },
        ],
      };
    } else {
      return {
        line: [
          { player: battle.winner! },
          { text: " won through " },
          { bold: battle.gameEndedBy },
          { text: "!" },
        ],
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
