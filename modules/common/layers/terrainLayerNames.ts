import { terrainLayers } from "../";
import { AlgolBoardAnon } from "../../types";

export function terrainLayerNames(board: AlgolBoardAnon) {
  return Object.keys({
    ...terrainLayers(board, 1),
    ...terrainLayers(board, 2)
  });
}
