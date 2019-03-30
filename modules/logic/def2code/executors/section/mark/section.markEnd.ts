import { FullDefAnon } from "../../../../../types";
import {
  referencesBattleVars,
  referencesTurnVars,
  orderUsage
} from "../sectionUtils";

export function executeMarkEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const markDef = gameDef.flow.marks[action];
  const gens = []
    .concat(markDef.runGenerator || [])
    .concat(markDef.runGenerators || []);

  const usage = orderUsage(gameDef, player, action);

  // TODO - NEXTSPAWNID, ARTIFACTS smarter, UNITLAYERS, UNITDATA

  return `
    return {
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
      MARKS,
      LINKS,
      path: step.path.concat(newMarkPos),
    ${gens.length ? "ARTIFACTS, " : "" /* TODO -- smarter! */}
      name: "${action}"
    };`;
}
