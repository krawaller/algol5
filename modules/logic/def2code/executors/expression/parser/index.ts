import {
  FullDefAnon,
  AlgolValAnon,
  AlgolBoolAnon,
  AlgolPosAnon,
  AlgolSetAnon,
  AlgolDirsAnon
} from "../../../../../types";

import parseValue from "./parser.value";
import parseBool from "./parser.bool";
import parsePos from "./parser.pos";
import parseSet from "./parser.set";
import parseDirs from "./parser.dirs";

import { executeExpression } from "../";

export function makeParser(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  from?: string
) {
  const parsers = {
    val: (expr: AlgolValAnon): string | number =>
      executeExpression(gameDef, player, action, parseValue, expr, from),
    bool: (expr: AlgolBoolAnon): string | number =>
      executeExpression(gameDef, player, action, parseBool, expr, from),
    pos: (expr: AlgolPosAnon): string | number =>
      executeExpression(gameDef, player, action, parsePos, expr, from),
    set: (expr: AlgolSetAnon): string | number =>
      executeExpression(gameDef, player, action, parseSet, expr, from),
    dirs: (expr: AlgolDirsAnon): string | number =>
      executeExpression(gameDef, player, action, parseDirs, expr, from)
  };
  return parsers;
}

export const parserTester = <T>(
  type: "set" | "bool" | "val" | "pos" | "dirs"
) => {
  const ret = (def: FullDefAnon, player: 1 | 2, action: string, input: T) => {
    const parser: any = makeParser(def, player, action)[type];
    return parser(input);
  };
  ret.funcName = "parse" + type[0].toUpperCase() + type.slice(1);
  return ret;
};
