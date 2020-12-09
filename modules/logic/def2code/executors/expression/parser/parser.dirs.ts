import { FullDefAnon, AlgolDirsAnon } from "../../../../../types";

export default function parseDirs(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  expr: AlgolDirsAnon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      case "knight":
        return "knightDirs";
      case "jump2":
        return "jumpTwoDirs";
      case "ring2":
        return "ringTwoDirs";
      default:
        throw new Error("Unknown dirs singleton: " + JSON.stringify(expr));
    }
  }
  if (Array.isArray(expr)) {
    return `[ ${expr
      .map(d => (typeof d === "string" ? `'${d}'` : d))
      .join(", ")} ]`;
  }
  throw new Error("Unknown dirs expression: " + JSON.stringify(expr));
}
