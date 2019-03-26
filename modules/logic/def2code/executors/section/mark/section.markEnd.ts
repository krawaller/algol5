import { FullDefAnon } from "../../../../../types";
import { referencesBattleVars, referencesTurnVars } from "../sectionUtils";

export function executeMarkEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const markDef = gameDef.flow.marks[action];
  const gens = []
    .concat(markDef.runGenerator || [])
    .concat(markDef.runGenerators || []);
  return `
    return {
      ${
        referencesTurnVars(gameDef)
          ? referencesTurnVars(markDef)
            ? "TURNVARS, "
            : "TURNVARS: step.TURNVARS, "
          : ""
      }
      ${
        referencesBattleVars(gameDef)
          ? referencesBattleVars(markDef)
            ? "BATTLEVARS, "
            : "BATTLEVARS: step.BATTLEVARS, "
          : ""
      }
      MARKS,
      LINKS,
      path: step.path.concat(newMarkPos),
      ${gens.length ? "ARTIFACTS, " : ""}
      name: "${action}"
    };`;
}
