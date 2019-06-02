import {
  FullDefAnon,
  AlgolIfableExpressionAnon,
  isAlgolExpressionIfElse,
  isAlgolExpressionIfActionElse,
  isAlgolExpressionIndexList,
  isAlgolExpressionPlayerCase,
  isAlgolIfableExpressionIf,
  isAlgolIfableExpressionIfPlayer,
  isAlgolIfableExpressionIfAction,
  AlgolValAnon,
  AlgolBoolAnon,
  AlgolPosAnon,
  AlgolSetAnon,
  AlgolDirsAnon,
} from "../../../../types";

type ExprReturn = string | number | undefined | boolean;

export function executeExpression<_T>(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  parser: (
    gameDef: FullDefAnon,
    player: 1 | 2,
    action: string,
    expression: _T,
    from?: string
  ) => ExprReturn,
  expr: AlgolIfableExpressionAnon<_T>,
  from?: string
): ExprReturn {
  const parse = makeParser(gameDef, player, action, from);
  const me = (expr: AlgolIfableExpressionAnon<_T>) =>
    executeExpression(gameDef, player, action, parser, expr, from);

  if (isAlgolExpressionIfElse(expr)) {
    const {
      ifelse: [test, whenTruthy, whenFalsy],
    } = expr;
    return `(${parse.bool(test)} ? ${me(whenTruthy)} : ${me(whenFalsy)})`;
  }

  if (isAlgolExpressionIfActionElse(expr)) {
    const {
      ifactionelse: [testAction, whenYes, whenNo],
    } = expr;
    return me(testAction === action ? whenYes : whenNo);
  }

  if (isAlgolExpressionPlayerCase(expr)) {
    const {
      playercase: [plr1, plr2],
    } = expr;
    return me(player === 1 ? plr1 : plr2);
  }

  if (isAlgolExpressionIndexList(expr)) {
    const {
      indexlist: [idx, ...opts],
    } = expr;
    const parsedIdx = parse.val(idx);
    if (typeof parsedIdx === "number") {
      return me(opts[parsedIdx]);
    }
    return `[${opts.map(me).join(", ")}][${parsedIdx}]`;
  }

  if (isAlgolIfableExpressionIf(expr)) {
    const {
      if: [test, val],
    } = expr;
    return `(${parse.bool(test)} ? ${me(val)} : undefined)`;
  }

  if (isAlgolIfableExpressionIfPlayer(expr)) {
    const {
      ifplayer: [forPlayer, val],
    } = expr;
    return forPlayer === player ? me(val) : "undefined";
  }

  if (isAlgolIfableExpressionIfAction(expr)) {
    const {
      ifaction: [forAction, val],
    } = expr;
    return forAction === action ? me(val) : "undefined";
  }

  return parser(gameDef, player, action, expr, from);
}

// ------- parser

import parseValue from "./parser/parser.value";
import parseBool from "./parser/parser.bool";
import parsePos from "./parser/parser.pos";
import parseSet from "./parser/parser.set";
import parseDirs from "./parser/parser.dirs";

export function makeParser(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  from?: string
) {
  const parsers = {
    val: (expr: AlgolValAnon): ExprReturn =>
      executeExpression(gameDef, player, action, parseValue, expr, from),
    bool: (expr: AlgolBoolAnon): ExprReturn =>
      executeExpression(gameDef, player, action, parseBool, expr, from),
    pos: (expr: AlgolPosAnon): ExprReturn =>
      executeExpression(gameDef, player, action, parsePos, expr, from),
    set: (expr: AlgolSetAnon): ExprReturn =>
      executeExpression(gameDef, player, action, parseSet, expr, from),
    dirs: (expr: AlgolDirsAnon): ExprReturn =>
      executeExpression(gameDef, player, action, parseDirs, expr, from),
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
