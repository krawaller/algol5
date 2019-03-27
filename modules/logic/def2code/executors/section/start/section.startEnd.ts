import { FullDefAnon } from "../../../../../types";
import {
  readsBattleVars,
  readsTurnVars,
  usesSpawn,
  usesTurnNumber
} from "../sectionUtils";

export function executeStartEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const startDef = gameDef.flow.startTurn;

  // Here we just need to return the new step
  return `
  return {
    ARTIFACTS,
    UNITLAYERS,
    UNITDATA,
    MARKS,
    LINKS,
    name: "start",
    path: [],
    ${usesTurnNumber(startDef) ? "TURN, " : "TURN: step.TURN + 1,"}
    ${usesSpawn(gameDef) ? "NEXTSPAWNID: step.NEXTSPAWNID, " : ""}
    ${readsTurnVars(gameDef) ? "TURNVARS, " : ""}
    ${readsBattleVars(gameDef) ? "BATTLEVARS, " : ""}
  };
  `;
}
