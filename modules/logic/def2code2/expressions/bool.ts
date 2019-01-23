import {
  FullDefAnon,
  AlgolBoolAnon,
  AlgolBoolMoreThanAnon
} from "../../../types";

import makeParser from "./";

export default function parseVal(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  expr: AlgolBoolAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, "value");

  if (Array.isArray(expr)) {
    switch (expr[0]) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return undefined;
    }
  }
  if ((expr as AlgolBoolMoreThanAnon).morethan) {
    const {
      morethan: [first, second]
    } = expr as AlgolBoolMoreThanAnon;
    return `(${parser.val(first)} > ${parser.val(second)})`;
  }
}
