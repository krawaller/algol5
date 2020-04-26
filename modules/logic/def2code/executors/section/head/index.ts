import { FullDefAnon } from "../../../../../types";
import { groupLayersForPlayer } from "../../../../../common";

// TODO - decide on boardLayers func

export function executeHead(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string
): string {
  let ret = "\n";

  ret += `const emptyObj = {}; `;

  ret += `const iconMapping = ${JSON.stringify(gameDef.graphics.icons)};\n`;

  ret += `let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions; `;

  // TODO - hydra version of these?
  ret += `const groupLayers1 = ${JSON.stringify(
    groupLayersForPlayer(gameDef, 1)
  )}; `;

  ret += `const groupLayers2 = ${JSON.stringify(
    groupLayersForPlayer(gameDef, 2)
  )}; `;

  return ret;
}
