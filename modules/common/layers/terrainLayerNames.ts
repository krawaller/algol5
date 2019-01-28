import { terrainLayers } from "../";
import { BoardAnon } from "../../types";

export function terrainLayerNames(board: BoardAnon) {
  return Object.keys({
    ...terrainLayers(board, 1),
    ...terrainLayers(board, 2)
  });
}
