import { terrainLayers } from "../";
import { Board } from "../../types";

export function terrainLayerNames(board: Board) {
  return Object.keys({
    ...terrainLayers(board, 1),
    ...terrainLayers(board, 2)
  });
}
