import { FullDefAnon } from "../../../../types";
import { emptyUnitLayers } from "../../../../common";
import { usesBattleVars, usesTurnVars, usesSpawn } from "./sectionUtils";

export function executeStartInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";
  const unitLayerNames = Object.keys(emptyUnitLayers(gameDef));

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

  ret += `let MARKS = {}; `;

  ret += `let UNITDATA = step.UNITDATA; `;

  ret += `let ARTIFACTS = emptyArtifactLayers; `; // <--- TODO smarter ARTIFACTS copying to allow mutation in draw

  if (usesBattleVars(gameDef)) {
    ret += `let BATTLEVARS = step.BATTLEVARS; `;
  }

  if (usesTurnVars(gameDef)) {
    ret += `let TURNVARS = step.TURNVARS; `;
  }

  if (usesSpawn(gameDef)) {
    ret += `let NEXTSPAWNID = step.NEXTSPAWNID; `;
  }

  ret += `
  const turn = {
    turn: lastTurn.turn + 1,
    links: { root: {} },
    steps: {},
    player: ${player},
    endMarks: {}
  };`;

  return ret;
}
