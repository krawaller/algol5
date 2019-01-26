import {
  FullDefAnon,
  AlgolLogicalAnon,
  AlgolLogicalIfElseAnon,
  AlgolLogicalIfActionElseAnon,
  AlgolLogicalPlayerCaseAnon,
  AlgolLogicalIndexListAnon
} from "../../../types";
import makeParser from "./";

export default function parseLogical(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  parser,
  expr: AlgolLogicalAnon,
  from
) {
  const parse = makeParser(gameDef, player, action, from);
  const me = expr => parseLogical(gameDef, player, action, parser, expr, from);

  if ((expr as AlgolLogicalIfElseAnon).ifelse) {
    const [
      test,
      whenTruthy,
      whenFalsy
    ] = (expr as AlgolLogicalIfElseAnon).ifelse;
    return `(${parse.bool(test)} ? ${me(whenTruthy)} : ${me(whenFalsy)})`;
  }

  if ((expr as AlgolLogicalIfActionElseAnon).ifactionelse) {
    const [
      testAction,
      whenYes,
      whenNo
    ] = (expr as AlgolLogicalIfActionElseAnon).ifactionelse;
    return me(testAction === action ? whenYes : whenNo);
  }

  if ((expr as AlgolLogicalPlayerCaseAnon).playercase) {
    const [plr1, plr2] = (expr as AlgolLogicalPlayerCaseAnon).playercase;
    return me(player === 1 ? plr1 : plr2);
  }

  if ((expr as AlgolLogicalIndexListAnon).indexlist) {
    const [idx, ...opts] = (expr as AlgolLogicalIndexListAnon).indexlist;
    const parsedIdx = parse.val(idx);
    if (typeof parsedIdx === "number") {
      return me(opts[parsedIdx]);
    }
    return `[${opts.map(me).join(", ")}][${parsedIdx}]`;
  }

  return parser(gameDef, player, action, expr, from);
}
