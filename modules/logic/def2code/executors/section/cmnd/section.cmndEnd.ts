import { FullDefAnon } from "../../../../../types";
import {
  referencesBattleVars,
  referencesTurnVars,
  usesSpawn,
  usesTurnNumber
} from "../sectionUtils";

export function executeCmndEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const cmndDef = gameDef.flow.commands[action];

  return `return {
    LINKS,
    MARKS,
    path: step.path.concat("${action}"),
    ${usesTurnNumber(cmndDef) ? "TURN" : "TURN: step.TURN"},
    ${
      referencesTurnVars(gameDef)
        ? referencesTurnVars(cmndDef)
          ? "TURNVARS, "
          : "TURNVARS: step.TURNVARS, "
        : ""
    }
    ${
      referencesBattleVars(gameDef)
        ? referencesBattleVars(cmndDef)
          ? "BATTLEVARS, "
          : "BATTLEVARS: step.BATTLEVARS, "
        : ""
    }
    ${
      usesSpawn(gameDef)
        ? usesSpawn(cmndDef)
          ? "NEXTSPAWNID, "
          : "NEXTSPAWNID: step.NEXTSPAWNID, "
        : ""
    }
  };`;
}
