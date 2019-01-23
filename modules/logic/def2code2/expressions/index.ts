import { FullDefAnon, AlgolValAnon, AlgolBoolAnon } from "../../../types";

import parseValue from "./value";
import parseBool from "./bool";
import parseLogical from "./logical";

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
      parseLogical(gameDef, player, action, parseBool, expr, from)
  };
  return parsers;
}
