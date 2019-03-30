import { FullDefAnon } from "../../../../../types";
import { orderUsage } from "../sectionUtils";

export function executeMarkInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  // TODO - UNITDATA

  let ret = "";
  // TODO - save previous marks instead of iterating whole marks object
  ret += `let MARKS = { ...step.MARKS, ${action}: newMarkPos };`;

  // Always init a new LINKS object for each step
  ret += `let LINKS = { commands: {}, marks: {} }; `;

  const usage = orderUsage(gameDef, player, action);

  if (usage.TURNVARS) {
    ret += "let TURNVARS = step.TURNVARS; ";
  }

  if (usage.BATTLEVARS) {
    ret += "let BATTLEVARS = step.BATTLEVARS; ";
  }

  if (usage.UNITLAYERS) {
    ret += "let UNITLAYERS = step.UNITLAYERS; ";
  }

  if (usage.ARTIFACTS) {
    ret += "let ARTIFACTS = step.ARTIFACTS; "; // <--- TODO smarter ARTIFACTS copying to allow mutation in draw
  }

  if (usage.TURN) {
    ret += `let TURN = step.TURN; `;
  }

  return ret;
}
