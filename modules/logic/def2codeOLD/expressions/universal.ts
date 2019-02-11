import * as isArray from "lodash/isArray";

import { FullDefAnon } from "../types";
import makeParser from "./";

export default function parseUniversal(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  parser,
  expression,
  from
) {
  const parse = makeParser(gameDef, player, action, from);
  const me = expr =>
    parseUniversal(gameDef, player, action, parser, expr, from);
  if (!isArray(expression)) {
    return parser(gameDef, player, action, expression, from);
  }
  const [type, ...details] = expression;
  switch (type) {
    case "ifelse": {
      const [bool, alt1, alt2] = details;
      return `(${parse.bool(bool)} ? ${me(alt1)} : ${me(alt2)})`;
    }
    case "playercase": {
      const [alt1, alt2] = details;
      return me(player === 1 ? alt1 : alt2);
    }
    case "ifactionelse": {
      const [name, then, otherwise] = details;
      return me(action === name ? then : otherwise);
    }
    default:
      return parser(gameDef, player, action, expression, from);
  }
}
