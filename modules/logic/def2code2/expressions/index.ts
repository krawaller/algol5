import { FullDefAnon, AlgolValAnon, AlgolBoolAnon } from "../../../types";

import parseValue from "./value";
import parseBool from "./bool";

export default function makeParser(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  from?: string
) {
  const parsers = {
    val: (expr: AlgolValAnon): string | number =>
      parseValue(gameDef, player, action, expr, from),
    bool: (expr: AlgolBoolAnon): string | boolean =>
      parseBool(gameDef, player, action, expr, from)
  };
  return parsers;
}
