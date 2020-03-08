import { FullDefAnon } from "../../../../../types";
import {
  referencesBattleVars,
  referencesTurnVars,
  usesSpawn,
  orderUsage,
} from "../sectionUtils";

export function executeCmndEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string
): string {
  const usage = orderUsage(gameDef, player, action, ruleset);

  const hasAnim = !!gameDef.anim[action];

  return `return {
    LINKS,
    MARKS: {},
    ${usage.ARTIFACTS ? "ARTIFACTS, " : "ARTIFACTS: step.ARTIFACTS, "}
    ${usage.TURN ? "TURN, " : "TURN: step.TURN, "}
    ${usage.UNITDATA ? "UNITDATA, " : "UNITDATA: step.UNITDATA, "}
    ${usage.UNITLAYERS ? "UNITLAYERS, " : "UNITLAYERS: step.UNITLAYERS, "}
    ${
      referencesTurnVars(gameDef)
        ? usage.TURNVARS
          ? "TURNVARS, "
          : "TURNVARS: step.TURNVARS, "
        : ""
    }
    ${
      referencesBattleVars(gameDef)
        ? usage.BATTLEVARS
          ? "BATTLEVARS, "
          : "BATTLEVARS: step.BATTLEVARS, "
        : ""
    }
    ${
      usesSpawn(gameDef)
        ? usage.NEXTSPAWNID
          ? "NEXTSPAWNID, "
          : "NEXTSPAWNID: step.NEXTSPAWNID, "
        : ""
    }
    ${gameDef.performance.canAlwaysEnd[action] ? "canAlwaysEnd: true, " : ""}${
    gameDef.performance.massiveTree![action] ? "massiveTree: true, " : ""
  } ${hasAnim ? `anim` : ""}   };`;
}
