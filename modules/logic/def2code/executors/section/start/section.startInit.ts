import { FullDefAnon } from "../../../../../types";
import { emptyUnitLayers, analyseGame } from "../../../../../common";
import { orderUsage } from "../sectionUtils";

export function executeStartInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";
  const usage = orderUsage(gameDef, player, action);

  const analysis = analyseGame(gameDef)[player].startTurn;

  if (usage.ARTIFACTS) {
    if (analysis.addedArtifacts.length) {
      ret += `let ARTIFACTS = {
        ${analysis.priorArtifacts
          .filter(n => analysis.addedArtifacts.includes(n))
          .map(name => `${name}: { ...step.ARTIFACTS.${name} }`)
          .concat(
            analysis.priorArtifacts
              .filter(n => !analysis.addedArtifacts.includes(n))
              .map(name => `${name}: step.ARTIFACTS.${name}`)
          )
          .concat(
            analysis.addedArtifacts
              .filter(n => !analysis.priorArtifacts.includes(n))
              .map(name => `${name}: {}`)
          )
          .join(", ")}
      }; `;
    } else {
      ret += `let ARTIFACTS = emptyArtifactLayers`;
    }
  }

  // if we don't reference unit layers locally we defer to startEnd
  if (usage.UNITLAYERS) {
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
  }

  // Marks are reset for each new turn, here or at startEnd
  if (usage.MARKS) {
    ret += `let MARKS = {}; `;
  }

  // Links are reset per step
  ret += `let LINKS = {
    actions: {}
  };`;

  // We carry over the UnitData. No need to copy it here
  // since startTurn doesn't do effects.
  if (usage.UNITDATA) {
    ret += `let UNITDATA = step.UNITDATA; `;
  }

  // We localise battleVars here if referenced, otherwise handle in startEnd
  if (usage.BATTLEVARS) {
    ret += `let BATTLEVARS = step.BATTLEVARS; `;
  }

  // We reset TurnVars here if referenced locally, otherwise handle in startEnd
  if (usage.TURNVARS) {
    ret += `let TURNVARS = {}; `;
  }

  // We create local turnvar here only if used inside startTurn (and bump if plr 1),
  // otherwise we'll bump it in startEnd
  if (usage.TURN) {
    if (player === 2) {
      ret += `let TURN = step.TURN; `;
    } else {
      ret += `let TURN = step.TURN + 1; `;
    }
  }

  return ret;
}
