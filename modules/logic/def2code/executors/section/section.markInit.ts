import { FullDefAnon } from "../../../../types";
import { ifCodeContains } from "./sectionUtils";
import { executeSection } from "./";

export function executeMarkInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";
  // TODO - save previous marks instead of iterating whole marks object
  ret += `let MARKS = { ...step.MARKS, ${action}: newMarkPos };`;

  ret += ifCodeContains(executeSection(gameDef, player, action, "orders"), {
    TURNVARS: "let TURNVARS = step.TURNVARS; ",
    BATTLEVARS: "let BATTLEVARS = step.BATTLEVARS; ",
    ARTIFACTS: "let ARTIFACTS = step.ARTIFACTS; ",
    UNITLAYERS: "let UNITLAYERS = step.UNITLAYERS; "
  });

  ret += `let newStepId = step.stepId + '-' + newMarkPos; `;
  ret += `turn.links[newStepId] = {};`;

  return ret;
}
