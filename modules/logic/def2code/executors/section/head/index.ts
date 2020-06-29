import { FullDefAnon } from "../../../../../types";
import { groupLayersForPlayer } from "../../../../../common";

// TODO - decide on boardLayers func

export function executeHead(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string
): string {
  const hasGrids = !!Object.values(gameDef.boards).find(b => b.grids);

  let ret = "\n";

  ret += `const emptyObj = {}; `;

  ret += `const iconMapping = ${JSON.stringify(gameDef.graphics.icons)};\n`;

  ret += `let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions${
    hasGrids ? ", GRIDS" : ""
  }; `;

  // TODO - hydra version of these?
  ret += `const groupLayers1 = ${JSON.stringify(
    groupLayersForPlayer(gameDef, 1)
  )}; `;

  ret += `const groupLayers2 = ${JSON.stringify(
    groupLayersForPlayer(gameDef, 2)
  )}; `;

  ret += `const prefixes1 = ['neutral', 'my', 'opp']; `;
  ret += `const prefixes2 = ['neutral', 'opp', 'my']; `;

  return ret;
}
