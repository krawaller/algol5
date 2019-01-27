import {
  FullDefAnon,
  AlgolLogicalAnon,
  isAlgolLogicalIfElse,
  isAlgolLogicalIfActionElse,
  isAlgolLogicalIndexList,
  isAlgolLogicalPlayerCase,
  isAlgolLogicalIf
} from "../../../types";
import makeParser from "./";

export default function parseLogical<_T>(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  parser,
  expr: AlgolLogicalAnon<_T>,
  from
) {
  const parse = makeParser(gameDef, player, action, from);
  const me = expr => parseLogical(gameDef, player, action, parser, expr, from);

  if (isAlgolLogicalIfElse(expr)) {
    const [test, whenTruthy, whenFalsy] = expr.ifelse;
    return `(${parse.bool(test)} ? ${me(whenTruthy)} : ${me(whenFalsy)})`;
  }

  if (isAlgolLogicalIfActionElse(expr)) {
    const [testAction, whenYes, whenNo] = expr.ifactionelse;
    return me(testAction === action ? whenYes : whenNo);
  }

  if (isAlgolLogicalPlayerCase(expr)) {
    const [plr1, plr2] = expr.playercase;
    return me(player === 1 ? plr1 : plr2);
  }

  if (isAlgolLogicalIndexList(expr)) {
    const [idx, ...opts] = expr.indexlist;
    const parsedIdx = parse.val(idx);
    if (typeof parsedIdx === "number") {
      return me(opts[parsedIdx]);
    }
    return `[${opts.map(me).join(", ")}][${parsedIdx}]`;
  }

  if (isAlgolLogicalIf(expr)) {
    const [test, val] = expr.if;
    return `(${parse.bool(test)} ? ${me(val)} : undefined)`;
  }

  return parser(gameDef, player, action, expr, from);
}
