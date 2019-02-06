import { FullDefAnon, AlgolDirsAnon, isAlgolDirsList } from "../../../types";

import makeParser from "./";

export default function parseDirs(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  expr: AlgolDirsAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, "dirs");

  if (Array.isArray(expr)) {
    switch (expr[0]) {
      case "diag":
        return "[2, 4, 6, 8]";
      case "ortho":
        return "[1, 3, 5, 7]";
      case "rose":
        return "[1, 2, 3, 4, 5, 6, 7, 8]";
      default:
        throw new Error("Unknown dirs singleton: " + expr);
    }
  }
  if (isAlgolDirsList(expr)) {
    const { list: list } = expr;
    return `[ ${list.join(", ")} ]`;
  }
}
