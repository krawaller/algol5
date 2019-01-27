import {
  FullDefAnon,
  AlgolValAnon,
  isAlgolValMinus,
  isAlgolValValue,
  isAlgolValProd,
  isAlgolValTurnVar,
  isAlgolValBattleVar,
  isAlgolValSizeOf
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
      case "player":
        return player;
      case "otherplayer":
        return player === 1 ? 2 : 1;
      default:
        return undefined;
    }
  }
  if (isAlgolValMinus(expr)) {
    const { minus: operands } = expr;
    return `(${operands.map(parser.val).join(" - ")})`;
  }
  if (isAlgolValValue(expr)) {
    const { value: innerExpr } = expr;
    return parser.val(innerExpr);
  }
  if (isAlgolValProd(expr)) {
    const { prod: factors } = expr;
    return `(${factors.map(parser.val).join(" * ")})`;
  }
  if (isAlgolValTurnVar(expr)) {
    const { turnvar: name } = expr;
    return `TURNVARS[${parser.val(name)}]`;
  }
  if (isAlgolValBattleVar(expr)) {
    const { battlevar: name } = expr;
    return `BATTLEVARS[${parser.val(name)}]`;
  }
  if (isAlgolValSizeOf(expr)) {
    const { sizeof: set } = expr;
    return `Object.keys(${parser.set(set)}).length`;
  }
}
