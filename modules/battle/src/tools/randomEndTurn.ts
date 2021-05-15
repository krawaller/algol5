import { isPos, stepOptions } from "../../../common";
import { AlgolBattle, AlgolStaticGameAPI } from "../../../types";

export const randomEndTurn = (
  api: AlgolStaticGameAPI,
  _battle: AlgolBattle
) => {
  let safetyValve = 0;
  let battle = JSON.parse(JSON.stringify(_battle)) as AlgolBattle;
  while (safetyValve++ < 1000) {
    const stepId = battle.state.currentStepId;
    const step = battle.turn.steps[stepId];
    const opts = stepOptions(step);
    const action = opts[Math.floor(Math.random() * opts.length)];
    if (isPos(action)) battle = api.performAction(battle, "mark", action);
    else if (action === "endTurn") {
      battle = api.performAction(battle, "endTurn");
      break;
    } else battle = api.performAction(battle, "command", action);
  }
  return battle;
};
