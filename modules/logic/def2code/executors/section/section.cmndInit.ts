import { FullDefAnon } from "../../../../types";
import {
  ifCodeContains,
  mutatesBattleVars,
  mutatesTurnVars,
  readsTurnVars,
  readsBattleVars,
  usesSpawn,
  usesTurnNumber
} from "./sectionUtils";
import { executeSection } from "./";

export function executeCmndInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const def = gameDef.flow.commands[action];

  let ret = "";

  if (mutatesTurnVars(def)) {
    ret += `
    let TURNVARS = { ...step.TURNVARS };
    `;
  } else if (readsTurnVars(def)) {
    ret += `let TURNVARS = step.TURNVARS; `;
  }

  if (mutatesBattleVars(def)) {
    ret += `
    let BATTLEVARS = { ...step.BATTLEVARS };
    `;
  } else if (readsBattleVars(def)) {
    ret += `let BATTLEVARS = step.BATTLEVARS; `;
  }

  if (usesSpawn(def)) {
    ret += `let NEXTSPAWNID = step.NEXTSPAWNID; `;
  }

  if (usesTurnNumber(def)) {
    ret += `let TURN = step.TURN; `;
  }

  return ret;
}
