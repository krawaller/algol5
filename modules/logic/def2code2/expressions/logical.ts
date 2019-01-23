import { FullDefAnon } from "../../../types";
import makeParser from "./";

export default function parseLogical(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  parser,
  expression,
  from
) {
  const parse = makeParser(gameDef, player, action, from);
  const me = expr => parseLogical(gameDef, player, action, parser, expr, from);

  if (expression.ifelse) {
    const [test, whenTruthy, whenFalsy] = expression.ifelse;
    return `(${parse.bool(test)} ? ${me(whenTruthy)} : ${me(whenFalsy)})`;
  }

  if (expression.ifactionelse) {
    const [testAction, whenYes, whenNo] = expression.ifactionelse;
    return me(testAction === action ? whenYes : whenNo);
  }

  if (expression.playercase) {
    const [plr1, plr2] = expression.playercase;
    return me(player === 1 ? plr1 : plr2);
  }

  return parser(gameDef, player, action, expression, from);
}
