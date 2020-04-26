import { FullDefAnon } from "../../../../../types";
import { emptyUnitLayers } from "../../../../../common";
import {
  referencesBattleVars,
  referencesTurnVars,
  usesSpawn,
  orderUsage,
} from "../sectionUtils";

export function executeStartEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string
): string {
  const startDef = gameDef.flow.startTurn;
  const unitLayerNames = Object.keys(emptyUnitLayers(gameDef));

  const usage = orderUsage(gameDef, player, action, ruleset);

  return `
  ${!usage.UNITLAYERS ? "const oldUnitLayers = step.UNITLAYERS; " : ""}
  return {
    UNITDATA: step.UNITDATA,
    LINKS,
    ${
      !usage.UNITLAYERS
        ? `UNITLAYERS: { 
        ${unitLayerNames
          .map(
            name =>
              name +
              ": oldUnitLayers." +
              (name.match(/^my/)
                ? "opp" + name.slice(2)
                : name.match(/^opp/)
                ? "my" + name.slice(3)
                : name)
          )
          .join(",\n")}
       },`
        : "UNITLAYERS,"
    }
    ${
      usage.ARTIFACTS
        ? "ARTIFACTS, "
        : `ARTIFACTS: emptyArtifactLayers_${ruleset}, `
    }
    ${usage.MARKS ? "MARKS," : "MARKS: {},"}
    ${
      usage.TURN
        ? "TURN, "
        : player === 1
        ? "TURN: step.TURN + 1,"
        : "TURN: step.TURN,"
    }
    ${usesSpawn(gameDef) ? "NEXTSPAWNID: step.NEXTSPAWNID, " : ""}
    ${
      referencesTurnVars(gameDef)
        ? usage.TURNVARS
          ? "TURNVARS, "
          : "TURNVARS: {}, "
        : ""
    }
    ${
      referencesBattleVars(gameDef)
        ? usage.BATTLEVARS
          ? "BATTLEVARS, "
          : "BATTLEVARS: step.BATTLEVARS, "
        : ""
    }
  };
  `;
}
