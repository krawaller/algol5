import { FullDefAnon } from "../../../../../types";
import { orderUsage } from "../sectionUtils";

export function executeCmndInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const def = gameDef.flow.commands[action];

  // TODO - ARTIFACTS, UNITLAYERS, UNITDATA

  let ret = "";

  const usage = orderUsage(gameDef, player, action);

  if (usage.TURNVARS === "mutates") {
    ret += `
    let TURNVARS = { ...step.TURNVARS };
    `;
  } else if (usage.TURNVARS === "reads") {
    ret += `let TURNVARS = step.TURNVARS; `;
  }

  if (usage.BATTLEVARS === "mutates") {
    ret += `
    let BATTLEVARS = { ...step.BATTLEVARS };
    `;
  } else if (usage.BATTLEVARS === "reads") {
    ret += `let BATTLEVARS = step.BATTLEVARS; `;
  }

  if (usage.NEXTSPAWNID) {
    ret += `let NEXTSPAWNID = step.NEXTSPAWNID; `;
  }

  if (usage.TURN) {
    ret += `let TURN = step.TURN; `;
  }

  return ret;
}
