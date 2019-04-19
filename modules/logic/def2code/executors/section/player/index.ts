import { FullDefAnon } from "../../../../../types";
import {
  isTerrainNeutral,
  terrainLayers,
  groupLayersForPlayer
} from "../../../../../common";

export function executePlayer(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";

  ret += `const groupLayers = ${JSON.stringify(
    groupLayersForPlayer(gameDef, player)
  )}; `;

  if (!isTerrainNeutral(gameDef)) {
    ret += `const TERRAIN = terrainLayers(${gameDef.board.height}, ${
      gameDef.board.width
    }, ${JSON.stringify({
      ...gameDef.board.terrain,
      ...gameDef.AI.terrain
    })}, ${player}); `;
  }

  return ret;
}
