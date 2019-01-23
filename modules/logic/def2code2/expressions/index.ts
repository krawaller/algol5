import {
  FullDefAnon,
  AlgolValAnon,
  AlgolBoolAnon,
  AlgolPosAnon,
  AlgolSetAnon
} from "../../../types";

import parseValue from "./value";
import parseBool from "./bool";
import parseLogical from "./logical";
import parsePos from "./pos";
import parseSet from "./set";

export default function makeParser(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  from?: string
) {
  const parsers = {
    val: (expr: AlgolValAnon): string | number =>
      parseLogical(gameDef, player, action, parseValue, expr, from),
    bool: (expr: AlgolBoolAnon): string | number =>
      parseLogical(gameDef, player, action, parseBool, expr, from),
    pos: (expr: AlgolPosAnon): string | number =>
      parseLogical(gameDef, player, action, parsePos, expr, from),
    set: (expr: AlgolSetAnon): string | number =>
      parseLogical(gameDef, player, action, parseSet, expr, from)
  };
  return parsers;
}
