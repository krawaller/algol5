import { FullDefAnon } from "../../../../types";
import { usesBattleVars, usesTurnVars, usesSpawn } from "./sectionUtils";

export function executeStartEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";

  // The turn var was created in startInit. now we add a new step to it.
  ret += `
  turn.steps.root = {
    ARTIFACTS,
    UNITLAYERS,
    UNITDATA,
    MARKS,
    name: "start",
    path: [],
    ${usesTurnVars(gameDef) ? "TURNVARS, " : ""}
    ${usesBattleVars(gameDef) ? "BATTLEVARS, " : ""}
    ${usesSpawn(gameDef) ? "NEXTSPAWNID, " : ""}
  };
  `;

  return ret;
}
