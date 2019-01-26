import {
  FullDefAnon,
  AlgolValAnon,
  AlgolValMinusAnon,
  AlgolValValueAnon,
  AlgolValProdAnon,
  AlgolValTurnVarAnon,
  AlgolValBattleVarAnon,
  AlgolValIndexListAnon,
  AlgolValSizeOfAnon
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
  if ((expr as AlgolValMinusAnon).minus) {
    const { minus: operands } = expr as AlgolValMinusAnon;
    return `(${operands.map(parser.val).join(" - ")})`;
  }
  if ((expr as AlgolValValueAnon).value) {
    const { value: innerExpr } = expr as AlgolValValueAnon;
    return parser.val(innerExpr);
  }
  if ((expr as AlgolValProdAnon).prod) {
    const { prod: factors } = expr as AlgolValProdAnon;
    return `(${factors.map(parser.val).join(" * ")})`;
  }
  if ((expr as AlgolValTurnVarAnon).turnvar) {
    const { turnvar: name } = expr as AlgolValTurnVarAnon;
    return `TURNVARS[${parser.val(name)}]`;
  }
  if ((expr as AlgolValBattleVarAnon).battlevar) {
    const { battlevar: name } = expr as AlgolValBattleVarAnon;
    return `BATTLEVARS[${parser.val(name)}]`;
  }
  if ((expr as AlgolValSizeOfAnon).sizeof) {
    const { sizeof: set } = expr as AlgolValSizeOfAnon;
    return `Object.keys(${parser.set(set)}).length`;
  }
}
