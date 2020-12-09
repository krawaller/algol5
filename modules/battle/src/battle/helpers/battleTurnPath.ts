import { AlgolBattle } from "../../../../types";
import { stepOptions } from "../../../../common";

// Called from battleEndTurn. Expected to return the indexes of all chosen
// options in the turn, except for those where there was only one option.
// Will be used to concatenate onto battle.path

export const battleTurnPath = (battle: AlgolBattle) => {
  const res: number[] = [];
  let stepId = "root";
  const actions = battle.state.currentStepId
    .split("-")
    .slice(1)
    .concat("endTurn");
  while (actions.length) {
    const action = actions.shift()!;
    const allOpts = stepOptions(battle.turn.steps[stepId]);
    const actionIdx = allOpts.findIndex(i => i === action);
    if (actionIdx === -1) {
      console.log(stepId, action, allOpts);
      throw new Error("Failed to find action index while building turnpath");
    }
    if (allOpts.length > 1) {
      res.push(actionIdx);
    }

    stepId = stepId + "-" + action;
  }

  return res;
};
