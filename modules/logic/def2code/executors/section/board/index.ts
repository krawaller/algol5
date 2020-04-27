import { FullDefAnon } from "../../../../../types";

export function executeSetBoard(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string
): string {
  const hasGrids = !!Object.values(gameDef.boards).find(b => b.grids);
  return `
    TERRAIN1 = terrainLayers(board.height, board.width, board.terrain, 1);
    TERRAIN2 = terrainLayers(board.height, board.width, board.terrain, 2);
    dimensions = { height: board.height, width: board.width };
    BOARD = boardLayers(dimensions);
    connections = boardConnections(board);
    relativeDirs = makeRelativeDirs(board);
    ${hasGrids ? `GRIDS = makeGrids(board.grids); ` : ""}
  `;
}
