import {
  FullDefAnon,
  AlgolBoolAnon,
  AlgolBoolMoreThanAnon,
  AlgolBoolPlayerCaseAnon,
  AlgolBoolIfActionElseAnon,
  AlgolBoolIfElseAnon
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
  if ((expr as AlgolBoolPlayerCaseAnon).playercase) {
    const {
      playercase: [firstPlr, secondPlr]
    } = expr as AlgolBoolPlayerCaseAnon;
    return parser.bool(player === 1 ? firstPlr : secondPlr);
  }
  if ((expr as AlgolBoolIfActionElseAnon).ifactionelse) {
    const {
      ifactionelse: [ifact, thenVal, elseVal]
    } = expr as AlgolBoolIfActionElseAnon;
    return parser.bool(ifact === action ? thenVal : elseVal);
  }
  if ((expr as AlgolBoolIfElseAnon).ifelse) {
    const {
      ifelse: [test, whenTruthy, whenFalsy]
    } = expr as AlgolBoolIfElseAnon;
    return `(${parser.bool(test)} ? ${parser.bool(whenTruthy)} : ${parser.bool(
      whenFalsy
    )})`;
  }
}
