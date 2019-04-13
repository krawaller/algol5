import { FullDefAnon, AlgolDirsAnon } from "../../../../../types";

import { makeParser } from "../";

export default function parseDirs(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  expr: AlgolDirsAnon,
  from?: string
) {
  if (typeof expr === "string") {
    switch (expr) {
      case "diag":
        return "diagDirs";
      case "ortho":
        return "orthoDirs";
      case "rose":
        return "roseDirs";
      default:
        throw new Error("Unknown dirs singleton: " + JSON.stringify(expr));
    }
  }
  if (Array.isArray(expr)) {
    return `[ ${expr.join(", ")} ]`;
  }
  throw new Error("Unknown dirs expression: " + JSON.stringify(expr));
}
