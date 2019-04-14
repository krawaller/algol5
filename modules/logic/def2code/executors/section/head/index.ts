import { FullDefAnon } from "../../../../../types";
import {
  isTerrainNeutral,
  terrainLayers,
  emptyArtifactLayers
} from "../../../../../common";

// TODO - decide on boardLayers func

export function executeHead(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "\n";

  ret += `const emptyObj = {}; `;

  ret += `
    const BOARD = boardLayers({ height: ${gameDef.board.height}, width: ${
    gameDef.board.width
  } });
  `;

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

  ret += `
    const connections = boardConnections({ height: ${
      gameDef.board.height
    }, width: ${gameDef.board.width} });
  `;

  let offsets = gameDef.board.offsets || [];
  if (gameDef.board.offset) offsets.push(gameDef.board.offset);
  ret += `const relativeDirs = makeRelativeDirs(${JSON.stringify(offsets)}); `;

  if (isTerrainNeutral(gameDef)) {
    ret += `const TERRAIN = ${JSON.stringify(terrainLayers(gameDef.board))}; `;
  }

  ret += `
    const roseDirs = [1,2,3,4,5,6,7,8];
    const orthoDirs = [1,3,5,7];
    const diagDirs = [2,4,6,8];
  `;

  return ret;
}
