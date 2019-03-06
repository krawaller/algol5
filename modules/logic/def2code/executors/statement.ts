import {
  FullDefAnon,
  AlgolStatementAnon,
  isAlgolLogicalIfElse,
  isAlgolLogicalIfActionElse,
  isAlgolLogicalIndexList,
  isAlgolLogicalPlayerCase,
  isAlgolLogicalIf,
  isAlgolLogicalIfPlayer,
  isAlgolLogicalIfAction,
  isAlgolLogicalMulti
} from "../../../types";
import { makeParser } from "./expression";

export function executeStatement<_T>(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  parser,
  expr: AlgolStatementAnon<_T>,
  from
) {
  const parse = makeParser(gameDef, player, action, from);
  const me = expr =>
    executeStatement(gameDef, player, action, parser, expr, from);

  if (isAlgolLogicalIfElse(expr)) {
    const {
      ifelse: [test, whenTruthy, whenFalsy]
    } = expr;

    return `if (${parse.bool(test)}) { ${me(whenTruthy)} } else { ${me(
      whenFalsy
    )} }`;
  }

  if (isAlgolLogicalIfActionElse(expr)) {
    const {
      ifactionelse: [testAction, whenYes, whenNo]
    } = expr;
    return me(testAction === action ? whenYes : whenNo);
  }

  if (isAlgolLogicalPlayerCase(expr)) {
    const {
      playercase: [plr1, plr2]
    } = expr;
    return me(player === 1 ? plr1 : plr2);
  }

  if (isAlgolLogicalIndexList(expr)) {
    const {
      indexlist: [idx, ...opts]
    } = expr;
    const parsedIdx = parse.val(idx);
    if (typeof parsedIdx === "number") {
      return me(opts[parsedIdx]);
    }
    return `[${opts.map(me).join(", ")}][${parsedIdx}]`;
  }

  if (isAlgolLogicalIf(expr)) {
    const {
      if: [test, val]
    } = expr;
    return `if (${parse.bool(test)}) { ${me(val)} }`;
  }

  if (isAlgolLogicalIfPlayer(expr)) {
    const {
      ifplayer: [forPlayer, val]
    } = expr;
    return forPlayer === player ? me(val) : "";
  }

  if (isAlgolLogicalIfAction(expr)) {
    const {
      ifaction: [forAction, val]
    } = expr;
    return forAction === action ? me(val) : "";
  }

  if (isAlgolLogicalMulti(expr)) {
    const { multi: children } = expr;
    return children.map(me).join(" ");
  }
  return parser(gameDef, player, action, expr, from);
}
