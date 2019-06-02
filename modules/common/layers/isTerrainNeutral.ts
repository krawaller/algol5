import { FullDefAnon } from "../../types";

// TODO - AI terrain too
export function isTerrainNeutral(gameDef: FullDefAnon) {
  return !Object.keys(gameDef.board.terrain || {}).some(terrainName => {
    const def = gameDef.board.terrain![terrainName];
    return (
      !Array.isArray(def) && (def.hasOwnProperty(1) || def.hasOwnProperty(2))
    );
  });
}
