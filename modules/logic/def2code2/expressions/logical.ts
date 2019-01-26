import {
  FullDefAnon,
  AlgolLogicalAnon,
  AlgolLogicalIfElseAnon,
  AlgolLogicalIfActionElseAnon,
  AlgolLogicalPlayerCaseAnon,
  AlgolLogicalIndexListAnon
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

  if ((expr as AlgolLogicalIfElseAnon<_T>).ifelse) {
    const [test, whenTruthy, whenFalsy] = (expr as AlgolLogicalIfElseAnon<
      _T
    >).ifelse;
    return `(${parse.bool(test)} ? ${me(whenTruthy)} : ${me(whenFalsy)})`;
  }

  if ((expr as AlgolLogicalIfActionElseAnon<_T>).ifactionelse) {
    const [testAction, whenYes, whenNo] = (expr as AlgolLogicalIfActionElseAnon<
      _T
    >).ifactionelse;
    return me(testAction === action ? whenYes : whenNo);
  }

  if ((expr as AlgolLogicalPlayerCaseAnon<_T>).playercase) {
    const [plr1, plr2] = (expr as AlgolLogicalPlayerCaseAnon<_T>).playercase;
    return me(player === 1 ? plr1 : plr2);
  }

  if ((expr as AlgolLogicalIndexListAnon<_T>).indexlist) {
    const [idx, ...opts] = (expr as AlgolLogicalIndexListAnon<_T>).indexlist;
    const parsedIdx = parse.val(idx);
    if (typeof parsedIdx === "number") {
      return me(opts[parsedIdx]);
    }
    return `[${opts.map(me).join(", ")}][${parsedIdx}]`;
  }

  return parser(gameDef, player, action, expr, from);
}
