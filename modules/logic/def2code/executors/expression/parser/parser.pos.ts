import {
  FullDefAnon,
  AlgolPosAnon,
  isAlgolPosMark,
  isAlgolPosOnlyIn,
  isAlgolPosBattlePos,
  isAlgolPosTurnPos,
  isAlgolPosOffset,
  isAlgolPosFromXY,
} from "../../../../../types";

import { makeParser } from "../";

export default function parsePos(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  expr: AlgolPosAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, ruleset, "pos");

  if (typeof expr === "string") {
    return `MARKS.${expr}`;
  }
  if (Array.isArray(expr)) {
    switch (expr[0]) {
      case "start":
        return "STARTPOS";
      case "target":
        return "POS";
      case "looppos":
        return "LOOPPOS";
      case "emptypos":
        return "'EMPTYPOS'";
      default:
        throw new Error("Unknown position singleton: " + expr);
    }
  }
  if (isAlgolPosMark(expr)) {
    const { mark: name } = expr;
    return `MARKS[${parser.val(name)}]`;
  }
  if (isAlgolPosOnlyIn(expr)) {
    const { onlyin: set } = expr;
    return `Object.keys(${parser.set(set)})[0]`;
  }
  if (isAlgolPosBattlePos(expr)) {
    const { battlepos: posname } = expr;
    return `BATTLEVARS[${parser.val(posname)}]`;
  }
  if (isAlgolPosTurnPos(expr)) {
    const { turnpos: posname } = expr;
    return `TURNVARS[${parser.val(posname)}]`;
  }
  if (isAlgolPosOffset(expr)) {
    const {
      offset: [pos, dir, forw = 1, right = 0],
    } = expr;
    return `offsetPos(${parser.pos(pos)}, ${parser.val(dir)}, ${parser.val(
      forw
    )}, ${parser.val(right)})`;
  }
  if (isAlgolPosFromXY(expr)) {
    const {
      fromxy: [x, y],
    } = expr;
    return `coords2pos({x: ${parser.val(x)}, y: ${parser.val(y)}})`;
  }
}
