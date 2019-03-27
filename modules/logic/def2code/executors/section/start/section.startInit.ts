import { FullDefAnon } from "../../../../../types";
import { emptyUnitLayers } from "../../../../../common";
import {
  readsBattleVars,
  readsTurnVars,
  usesSpawn,
  usesTurnNumber
} from "../sectionUtils";

export function executeStartInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";
  const startDef = gameDef.flow.startTurn;

  const unitLayerNames = Object.keys(emptyUnitLayers(gameDef));

  // Instead of recalculating the unitlayers now that we switched players,
  // we simply swap places between "myXXX" and "oppXXX"!
  ret += `
  const oldUnitLayers = step.UNITLAYERS;
  let UNITLAYERS = {
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
  };
  `;

  // Marks are reset for each new turn
  ret += `let MARKS = {}; `;

  // Links are reset per step
  ret += `let LINKS = {
    commands: {},
    marks: {}
  };`;

  // We carry over the UnitData. No need to copy it here
  // since startTurn doesn't do effects.
  ret += `let UNITDATA = step.UNITDATA; `;

  // We reset the artifact layers for the new turn.
  // TODO: smarter ARTIFACTS copying to allow mutation in draw
  ret += `let ARTIFACTS = emptyArtifactLayers; `;

  // We localise battleVars here if referenced, otherwise handle in startEnd
  if (readsBattleVars(startDef)) {
    ret += `let BATTLEVARS = step.BATTLEVARS; `;
  }

  // We reset TurnVars here if referenced locally, otherwise handle in startEnd
  if (readsTurnVars(startDef)) {
    ret += `let TURNVARS = {}; `;
  }

  if (usesSpawn(gameDef)) {
    ret += `let NEXTSPAWNID = step.NEXTSPAWNID; `;
  }

  // We create local bumped turnvar here only if used inside startTurn,
  // otherwise we'll bump it in startEnd
  if (usesTurnNumber(gameDef)) {
    ret += `let TURN = step.TURN + 1; `;
  }

  return ret;
}
