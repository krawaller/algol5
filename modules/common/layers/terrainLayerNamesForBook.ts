import { AlgolBoardBookAnon } from "../../types";
import { terrainLayerNames } from "./terrainLayerNames";

export const terrainLayerNamesForBook = (
  book: AlgolBoardBookAnon
): string[] => {
  const names = new Set<string>();
  for (const board of Object.values(book)) {
    for (const name of terrainLayerNames(board)) {
      names.add(name);
    }
  }
  return Array.from(names);
};
