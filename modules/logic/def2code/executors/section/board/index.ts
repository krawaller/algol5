import { FullDefAnon } from "../../../../../types";

export function executeSetBoard(
  gameDef: FullDefAnon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  player: 1 | 2,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ruleset: string
): string {
  const hasGrids = !!Object.values(gameDef.boards).find(b => b.grids);
  return `
    TERRAIN1 = terrainLayers(board, 1);
    TERRAIN2 = terrainLayers(board, 2);
    dimensions = { height: board.height, width: board.width };
    BOARD = boardLayers(dimensions);
    connections = boardConnections(board);
    relativeDirs = makeRelativeDirs(board);
    ${hasGrids ? `GRIDS = makeGrids(board.grids); ` : ""}
  `;
}
