import { FullDefAnon } from "../../../../../types";
import { isTerrainNeutral, terrainLayers } from "../../../../../common";

// TODO - relativeDirs. decide on boardLayers func

export function executeHead(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";

  ret += `
    const BOARD = boardLayers({ height: ${gameDef.board.height}, width: ${
    gameDef.board.width
  } });
    const connections = boardConnections({ height: ${
      gameDef.board.height
    }, width: ${gameDef.board.width} });
  `;

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
