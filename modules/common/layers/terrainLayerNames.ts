import { terrainLayers } from "../";
import { AlgolBoardAnon } from "../../types";

// TODO - pass full gameDef so that we can mix in AI too!
export function terrainLayerNames(board: AlgolBoardAnon) {
  return Object.keys({
    ...terrainLayers(board, 1),
    ...terrainLayers(board, 2),
  });
}
