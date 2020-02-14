import { FullDefAnon } from "../../../../../types";
import { isTerrainNeutral, emptyArtifactLayers } from "../../../../../common";

// TODO - decide on boardLayers func

export function executeHead(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "\n";

  ret += `const emptyObj = {}; `;
  ret += `const dimensions = { height: ${gameDef.board.height}, width: ${gameDef.board.width} }; `;

  ret += `
    const BOARD = boardLayers(dimensions);
  `;

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

  ret += `
    const connections = boardConnections({ height: ${
      gameDef.board.height
    }, width: ${gameDef.board.width}${
    gameDef.board.offset
      ? `, offset: ${JSON.stringify(gameDef.board.offset)}`
      : ""
  }${
    gameDef.board.offsets
      ? `, offsets: ${JSON.stringify(gameDef.board.offsets)}`
      : ""
  } });
  `;

  let offsets = gameDef.board.offsets || [];
  if (gameDef.board.offset) offsets.push(gameDef.board.offset);
  ret += `const relativeDirs = makeRelativeDirs(${JSON.stringify(offsets)}); `;

  if (isTerrainNeutral(gameDef)) {
    ret += `const TERRAIN = terrainLayers(${gameDef.board.height}, ${
      gameDef.board.width
    }, ${JSON.stringify({
      ...gameDef.board.terrain,
      ...gameDef.AI.terrain,
    })}); `;
  }

  // TODO - only add if referred?
  ret += `
    const roseDirs = [1,2,3,4,5,6,7,8];
    const orthoDirs = [1,3,5,7];
    const diagDirs = [2,4,6,8];
    const knightDirs = [
      "d1f2r1",
      "d1f2r-1",
      "d3f2r1",
      "d3f2r-1",
      "d5f2r1",
      "d5f2r-1",
      "d7f2r1",
      "d7f2r-1",
    ];
  `;

  return ret;
}
