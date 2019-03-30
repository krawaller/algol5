import { FullDefAnon } from "../../../../../types";
import {
  referencesBattleVars,
  referencesTurnVars,
  orderUsage,
  usesSpawn
} from "../sectionUtils";

export function executeMarkEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const usage = orderUsage(gameDef, player, action);

  return `
    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "${action}",
      ${usage.ARTIFACTS ? "ARTIFACTS, " : "ARTIFACTS: step.ARTIFACTS, "}
      ${usage.UNITLAYERS ? "UNITLAYERS, " : "UNITLAYERS: step.UNITLAYERS, "}
      ${usage.UNITDATA ? "UNITDATA, " : "UNITDATA: step.UNITDATA, "}
      ${usage.TURN ? "TURN, " : "TURN: step.TURN, "}
      ${
        usage.MARKS
          ? "MARKS, "
          : `MARKS: { ...step.MARKS, ${action}: newMarkPos }, `
      }
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
      ${usesSpawn(gameDef) ? "NEXTSPAWNID: step.NEXTSPAWNID, " : ""}
    };`;
}
