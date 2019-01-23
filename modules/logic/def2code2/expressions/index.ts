import { FullDefAnon, AlgolValAnon } from "../../../types";

import parseValue from "./value";

export default function makeParser(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  from?: string
) {
  const parsers = {
    val: (expr: AlgolValAnon): string | number =>
      parseValue(gameDef, player, action, expr, from)
  };
  return parsers;
}
