import { terrainLayers } from "../";
import { Board } from "../../types";

export function terrainLayerNames(
  board: Board<number, number, string, string>
) {
  return Object.keys({
    ...terrainLayers(board, 1),
    ...terrainLayers(board, 2)
  });
}
