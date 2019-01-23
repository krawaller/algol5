import {
  FullDefAnon,
  AlgolValAnon,
  AlgolValMinusAnon,
  AlgolValValueAnon
} from "../../../types";

import makeParser from "./";

export default function parseVal(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  expr: AlgolValAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, "value");

  if (typeof expr === "string") {
    return `"${expr}"`;
  }
  if (typeof expr === "number") {
    return expr;
  }
  if (Array.isArray(expr)) {
    switch (expr[0]) {
      case "dir":
        return "DIR";
      default:
        return undefined;
    }
  }
  if ((expr as AlgolValMinusAnon).minus) {
    const { minus: operands } = expr as AlgolValMinusAnon;
    return `(${operands.map(parser.val).join(" - ")})`;
  }
  if ((expr as AlgolValValueAnon).value) {
    const { value: innerExpr } = expr as AlgolValValueAnon;
    return parser.val(innerExpr);
  }
}
