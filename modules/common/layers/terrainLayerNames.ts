import { terrainLayers } from "../";
import { Board } from "../../types";

export function terrainLayerNames(
  board: Board<number, number, string, string, string> // TODO - Anon type
) {
  return Object.keys({
    ...terrainLayers(board, 1),
    ...terrainLayers(board, 2)
  });
}
