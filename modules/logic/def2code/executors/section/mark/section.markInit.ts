import { FullDefAnon } from "../../../../../types";
import { orderUsage } from "../sectionUtils";
import {
  actionArtifactLayers,
  gameArtifactLayers
} from "../../../../../common";

export function executeMarkInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";
  const usage = orderUsage(gameDef, player, action);

  if (usage.ARTIFACTS) {
    const gameLayers = gameArtifactLayers(gameDef, player, action);
    const actionLayers = actionArtifactLayers(gameDef, player, action);

    ret += `let ARTIFACTS = {
      ${gameLayers
        .map(name =>
          actionLayers.includes(name)
            ? `${name}: { ...step.ARTIFACTS.${name} }`
            : `${name}: step.ARTIFACTS.${name}`
        )
        .join(", ")}
    }; `;
  }

  // Always init a new LINKS object for each step
  ret += `let LINKS = { actions: {} }; `;

  if (usage.MARKS) {
    ret += `let MARKS = { ...step.MARKS, ${action}: newMarkPos };`;
  }

  if (usage.TURNVARS) {
    ret += "let TURNVARS = step.TURNVARS; ";
  }

  if (usage.BATTLEVARS) {
    ret += "let BATTLEVARS = step.BATTLEVARS; ";
  }

  if (usage.UNITLAYERS) {
    ret += "let UNITLAYERS = step.UNITLAYERS; ";
  }

  if (usage.TURN) {
    ret += `let TURN = step.TURN; `;
  }

  if (usage.UNITDATA) {
    ret += `let UNITDATA = step.UNITDATA; `;
  }

  return ret;
}
