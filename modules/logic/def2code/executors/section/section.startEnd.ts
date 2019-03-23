import { FullDefAnon } from "../../../../types";
import { usesBattleVars, usesTurnVars, usesSpawn } from "./sectionUtils";

export function executeStartEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";

  // TODO - handle TURN

  // Now we return what will be the new step
  ret += `
  return {
    ARTIFACTS,
    UNITLAYERS,
    UNITDATA,
    MARKS,
    LINKS,
    name: "start",
    path: [],
    ${usesTurnVars(gameDef) ? "TURNVARS, " : ""}
    ${usesBattleVars(gameDef) ? "BATTLEVARS, " : ""}
    ${usesSpawn(gameDef) ? "NEXTSPAWNID, " : ""}
  };
  `;

  return ret;
}
