import {
  FullDefAnon,
  AlgolBoolAnon,
  isAlgolBoolIsEmpty,
  isAlgolBoolNotEmpty,
  isAlgolBoolMoreThan,
  isAlgolBoolSame,
  isAlgolBoolDifferent,
  isAlgolBoolSamePos,
  isAlgolBoolHigher,
  isAlgolBoolFurther,
  isAlgolBoolCmndAvailable,
  isAlgolBoolMarkAvailable,
  isAlgolBoolTruthy,
  isAlgolBoolFalsy,
  isAlgolBoolAnyAt,
  isAlgolBoolNoneAt,
  isAlgolBoolOverlaps,
  isAlgolBoolValInList,
  isAlgolBoolAnd,
  isAlgolBoolOr,
  isAlgolBoolNot,
  isAlgolBoolOrtho,
  isAlgolBoolDiag,
  isAlgolBoolStoppedBecause,
} from "../../../../../types";

import { makeParser } from "../";

export default function parseVal(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  expr: AlgolBoolAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, ruleset, "bool");

  if (Array.isArray(expr)) {
    switch (expr[0]) {
      case "true":
        return true;
      case "false":
        return false;
      case "canEndTurn":
        return "LINKS.endTurn || LINKS.endGame";
      case "isFirstTurn":
        return "TURN === 1";
      default:
        throw new Error("Unknown bool singleton: " + expr);
    }
  }
  if (isAlgolBoolStoppedBecause(expr)) {
    const { stoppedBecause: reason } = expr;
    return parser.bool({
      same: [["stopreason"], reason],
    });
  }
  if (isAlgolBoolMoreThan(expr)) {
    const {
      morethan: [first, second],
    } = expr;
    return `(${parser.val(first)} > ${parser.val(second)})`;
  }
  if (isAlgolBoolSame(expr)) {
    const {
      same: [first, second],
    } = expr;
    return `(${parser.val(first)} === ${parser.val(second)})`;
  }
  if (isAlgolBoolDifferent(expr)) {
    const {
      different: [first, second],
    } = expr;
    return `(${parser.val(first)} !== ${parser.val(second)})`;
  }
  if (isAlgolBoolSamePos(expr)) {
    const {
      samepos: [firstPos, secondPas],
    } = expr;
    return `(${parser.pos(firstPos)} === ${parser.pos(secondPas)})`;
  }
  if (isAlgolBoolHigher(expr)) {
    const {
      higher: [firstPos, secondPos],
    } = expr;
    return `(BOARD.board[${parser.pos(firstPos)}].y > BOARD.board[${parser.pos(
      secondPos
    )}].y)`;
  }
  if (isAlgolBoolFurther(expr)) {
    const {
      further: [firstPos, secondPos],
    } = expr;
    return `(BOARD.board[${parser.pos(firstPos)}].x > BOARD.board[${parser.pos(
      secondPos
    )}].x)`;
  }
  if (isAlgolBoolCmndAvailable(expr)) {
    const { cmndavailable: act } = expr;
    return `!!LINKS.commands[${parser.val(act)}]`;
  }
  if (isAlgolBoolMarkAvailable(expr)) {
    const { markavailable: act } = expr;
    const mark = parser.val(act);
    return `!!Object.keys(LINKS.marks).find(a => LINKS.marks[a] === ${mark} + ${player})`;
  }
  if (isAlgolBoolTruthy(expr)) {
    const { truthy: val } = expr;
    return `!!${parser.val(val)}`;
  }
  if (isAlgolBoolFalsy(expr)) {
    const { falsy: val } = expr;
    return `!${parser.val(val)}`;
  }
  if (isAlgolBoolAnyAt(expr)) {
    const {
      anyat: [set, pos],
    } = expr;
    return `${parser.set(set)}[${parser.pos(pos)}]`;
  }
  if (isAlgolBoolNoneAt(expr)) {
    const {
      noneat: [set, pos],
    } = expr;
    return `!${parser.set(set)}[${parser.pos(pos)}]`;
  }
  if (isAlgolBoolIsEmpty(expr)) {
    const { isempty: set } = expr;
    return `Object.keys(${parser.set(set)}).length === 0`;
  }
  if (isAlgolBoolNotEmpty(expr)) {
    const { notempty: set } = expr;
    return `Object.keys(${parser.set(set)}).length !== 0`;
  }
  if (isAlgolBoolOverlaps(expr)) {
    const { overlaps: sets } = expr;
    return parser.bool({ notempty: { intersect: sets } });
  }
  if (isAlgolBoolValInList(expr)) {
    const {
      valinlist: [val, ...list],
    } = expr;
    return `[${list.map(v => parser.val(v)).join(", ")}].indexOf(${parser.val(
      val
    )}) !== -1`;
  }
  if (isAlgolBoolAnd(expr)) {
    const { and: conds } = expr;
    return `(${conds.map(c => parser.bool(c)).join(" && ")})`;
  }
  if (isAlgolBoolOr(expr)) {
    const { or: conds } = expr;
    return `(${conds.map(c => parser.bool(c)).join(" || ")})`;
  }
  if (isAlgolBoolNot(expr)) {
    const { not: cond } = expr;
    return `!${parser.bool(cond)}`;
  }
  if (isAlgolBoolOrtho(expr)) {
    const { ortho: val } = expr;
    return `orthoDirs.indexOf(${parser.val(val)}) !== -1`;
  }
  if (isAlgolBoolDiag(expr)) {
    const { diag: val } = expr;
    return `diagDirs.indexOf(${parser.val(val)}) !== -1`;
  }
}
