import { FullDefAnon } from "../../../../../types";
import { analyseGame } from "../../../../../common";
import {
  referencesBattleVars,
  referencesTurnVars,
  orderUsage,
  usesSpawn,
} from "../sectionUtils";

export function executeMarkEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string
): string {
  const usage = orderUsage(gameDef, player, action);
  const analysis = analyseGame(gameDef);

  return `
    return {
      LINKS,
      ${usage.ARTIFACTS ? "ARTIFACTS, " : "ARTIFACTS: step.ARTIFACTS, "}
      ${usage.UNITLAYERS ? "UNITLAYERS, " : "UNITLAYERS: step.UNITLAYERS, "}
      ${usage.UNITDATA ? "UNITDATA, " : "UNITDATA: step.UNITDATA, "}
      ${usage.TURN ? "TURN, " : "TURN: step.TURN, "}
      ${
        usage.MARKS
          ? "MARKS, "
          : `MARKS: { ${analysis[player][action].priorMarks
              .map(m => `${m}: step.MARKS.${m}, `)
              .join("")} ${action}: newMarkPos }, `
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
      ${
        gameDef.performance.canAlwaysEnd[action] ? "canAlwaysEnd: true, " : ""
      }${
    gameDef.performance.massiveTree![action] ? "massiveTree: true, " : ""
  }     };`;
}
