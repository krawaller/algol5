import { FullDefAnon } from "../../../../types";
import { usesBattleVars, usesTurnVars } from "./sectionUtils";

export function executeStartEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";

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
  };
  `;

  return ret;
}
