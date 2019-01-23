import {
  FullDefAnon,
  AlgolValAnon,
  AlgolValMinusAnon,
  AlgolValValueAnon
} from "../../../types";

export default function makeParser(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  from?: string
) {
  const parsers = {
    val: (expr: AlgolValAnon): string | number => {
      if (typeof expr === "string") {
        return `"${expr}"`;
      }
      if (typeof expr === "number") {
        return expr;
      }
      if (Array.isArray(expr)) {
        const cmnd = expr[0];
        if (cmnd === "dir") {
          return "DIR";
        }
        return undefined;
      }
      if ((expr as AlgolValMinusAnon).minus) {
        const { minus: operands } = expr as AlgolValMinusAnon;
        return `(${operands.map(parsers.val).join(" - ")})`;
      }
      if ((expr as AlgolValValueAnon).value) {
        const { value: innerExpr } = expr as AlgolValValueAnon;
        return parsers.val(innerExpr);
      }
    }
  };
  return parsers;
}
