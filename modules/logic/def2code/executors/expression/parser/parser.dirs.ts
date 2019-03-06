import {
  FullDefAnon,
  AlgolDirsAnon,
  isAlgolDirsList
} from "../../../../../types";

import { makeParser } from "./";

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
        return "diagDirs";
      case "ortho":
        return "orthoDirs";
      case "rose":
        return "roseDirs";
      default:
        throw new Error("Unknown dirs singleton: " + expr);
    }
  }
  if (isAlgolDirsList(expr)) {
    const { list: list } = expr;
    return `[ ${list.join(", ")} ]`;
  }
}
