import { FullDefAnon } from "../../../../../types";
import { isTerrainNeutral, terrainLayers } from "../../../../../common";

export function executePlayer(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";

  ret += `const ownerNames = ["neutral", ${
    player === 1 ? '"my", "opp"' : '"opp", "my"'
  }]; `;

  if (!isTerrainNeutral(gameDef)) {
    ret += `const TERRAIN = ${JSON.stringify(
      terrainLayers(gameDef.board, player)
    )}; `;
  }

  return ret;
}
