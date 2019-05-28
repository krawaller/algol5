import { terrainLayers } from "../";
import { AlgolBoardAnon } from "algol-types";

// TODO - pass full gameDef so that we can mix in AI too!
export function terrainLayerNames(board: AlgolBoardAnon) {
  return Object.keys({
    ...terrainLayers(board.height, board.width, board.terrain, 1),
    ...terrainLayers(board.height, board.width, board.terrain, 2)
  });
}
