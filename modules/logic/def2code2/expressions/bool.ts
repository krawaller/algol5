import {
  FullDefAnon,
  AlgolBoolAnon,
  AlgolBoolMoreThanAnon,
  AlgolBoolSameAnon,
  AlgolBoolDifferentAnon,
  AlgolBoolSamePosAnon,
  AlgolBoolHigherAnon,
  AlgolBoolFurtherAnon,
  AlgolBoolCmndAvailableAnon,
  AlgolBoolMarkAvailableAnon,
  AlgolBoolTruthyAnon,
  AlgolBoolFalsyAnon,
  AlgolBoolAnyAtAnon,
  AlgolBoolNoneAtAnon
} from "../../../types";

import { pos2coords } from "../../../common";

import makeParser from "./";

export default function parseVal(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  expr: AlgolBoolAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, "value");

  if (Array.isArray(expr)) {
    switch (expr[0]) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return undefined;
    }
  }
  if ((expr as AlgolBoolMoreThanAnon).morethan) {
    const {
      morethan: [first, second]
    } = expr as AlgolBoolMoreThanAnon;
    return `(${parser.val(first)} > ${parser.val(second)})`;
  }
  if ((expr as AlgolBoolSameAnon).same) {
    const {
      same: [first, second]
    } = expr as AlgolBoolSameAnon;
    return `(${parser.val(first)} === ${parser.val(second)})`;
  }
  if ((expr as AlgolBoolDifferentAnon).different) {
    const {
      different: [first, second]
    } = expr as AlgolBoolDifferentAnon;
    return `(${parser.val(first)} !== ${parser.val(second)})`;
  }
  if ((expr as AlgolBoolSamePosAnon).samepos) {
    const {
      samepos: [firstPos, secondPas]
    } = expr as AlgolBoolSamePosAnon;
    return `(${parser.pos(firstPos)} === ${parser.pos(secondPas)})`;
  }
  if ((expr as AlgolBoolHigherAnon).higher) {
    const {
      higher: [firstPos, secondPos]
    } = expr as AlgolBoolHigherAnon;
    return `(BOARD.board[${parser.pos(firstPos)}].y > BOARD.board[${parser.pos(
      secondPos
    )}].y)`;
  }
  if ((expr as AlgolBoolFurtherAnon).further) {
    const {
      further: [firstPos, secondPos]
    } = expr as AlgolBoolFurtherAnon;
    return `(BOARD.board[${parser.pos(firstPos)}].x > BOARD.board[${parser.pos(
      secondPos
    )}].x)`;
  }
  if ((expr as AlgolBoolCmndAvailableAnon).cmndavailable) {
    const { cmndavailable: act } = expr as AlgolBoolCmndAvailableAnon;
    return `!!step.available[${parser.val(act)}]`;
  }
  if ((expr as AlgolBoolMarkAvailableAnon).markavailable) {
    const { markavailable: act } = expr as AlgolBoolMarkAvailableAnon;
    return `!!step.available[${parser.val(act)}]`;
  }
  if ((expr as AlgolBoolTruthyAnon).truthy) {
    const { truthy: val } = expr as AlgolBoolTruthyAnon;
    return `!!${parser.val(val)}`;
  }
  if ((expr as AlgolBoolFalsyAnon).falsy) {
    const { falsy: val } = expr as AlgolBoolFalsyAnon;
    return `!${parser.val(val)}`;
  }
  if ((expr as AlgolBoolAnyAtAnon).anyat) {
    const {
      anyat: [set, pos]
    } = expr as AlgolBoolAnyAtAnon;
    return `${parser.set(set)}[${parser.pos(pos)}]`;
  }
  if ((expr as AlgolBoolNoneAtAnon).noneat) {
    const {
      noneat: [set, pos]
    } = expr as AlgolBoolNoneAtAnon;
    return `!${parser.set(set)}[${parser.pos(pos)}]`;
  }
}
