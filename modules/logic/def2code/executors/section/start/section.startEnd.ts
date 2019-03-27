import { FullDefAnon } from "../../../../../types";
import { emptyUnitLayers } from "../../../../../common";
import {
  referencesBattleVars,
  referencesTurnVars,
  usesSpawn,
  usesTurnNumber,
  referencesUnitLayers,
  referencesMarks
} from "../sectionUtils";

export function executeStartEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const startDef = gameDef.flow.startTurn;
  const usesUnitLayers = referencesUnitLayers(gameDef, startDef);
  const unitLayerNames = Object.keys(emptyUnitLayers(gameDef));

  // Here we just need to return the new step
  return `
  ${!usesUnitLayers ? "const oldUnitLayers = step.UNITLAYERS; " : ""}
  return {
    ${
      !usesUnitLayers
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
    ARTIFACTS,
    UNITDATA,
    ${referencesMarks(gameDef, startDef) ? "MARKS," : "MARKS: {},"}
    LINKS,
    name: "start",
    path: [],
    ${usesTurnNumber(startDef) ? "TURN, " : "TURN: step.TURN + 1,"}
    ${usesSpawn(gameDef) ? "NEXTSPAWNID: step.NEXTSPAWNID, " : ""}
    ${
      referencesTurnVars(gameDef)
        ? referencesTurnVars(startDef)
          ? "TURNVARS, "
          : "TURNVARS: {}, "
        : ""
    }
    ${
      referencesBattleVars(gameDef)
        ? referencesBattleVars(startDef)
          ? "BATTLEVARS, "
          : "BATTLEVARS: step.BATTLEVARS, "
        : ""
    }
  };
  `;
}
