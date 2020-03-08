import { FullDefAnon } from "../../../../../types";
import {
  emptyArtifactLayers,
  groupLayersForPlayer,
} from "../../../../../common";

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

  const startDef = gameDef.flow.startTurn || {};
  const startGens = (startDef.runGenerators || []).concat(
    startDef.runGenerator || []
  );
  if (!startGens.length) {
    ret += `
    const emptyArtifactLayers = ${JSON.stringify(
      emptyArtifactLayers(gameDef.generators)
    )};
  `;
  }

  ret += `let TERRAIN1, TERRAIN2, connections, relativeDirs, BOARD, dimensions; `;

  ret += `const groupLayers1 = ${JSON.stringify(
    groupLayersForPlayer(gameDef, 1)
  )}; `;

  ret += `const groupLayers2 = ${JSON.stringify(
    groupLayersForPlayer(gameDef, 2)
  )}; `;

  return ret;
}
