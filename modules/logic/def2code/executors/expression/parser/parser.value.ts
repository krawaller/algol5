import {
  FullDefAnon,
  AlgolValAnon,
  isAlgolValMinus,
  isAlgolValValue,
  isAlgolValProd,
  isAlgolValTurnVar,
  isAlgolValBattleVar,
  isAlgolValSizeOf,
  isAlgolValRead,
  isAlgolValIdAt,
  isAlgolValHarvest,
  isAlgolValSum,
  isAlgolValPos,
  isAlgolValGridAt,
  isAlgolValGridIn,
  isAlgolValRelDir,
  isAlgolValLoopRead,
  isAlgolValPosX,
  isAlgolValPosY,
  isAlgolValAddTo,
  isAlgolValAddBitsTo,
  isAlgolValHighest,
  isAlgolValLowest,
  isAlgolValBitAnd,
  isAlgolValBitDiff,
  isAlgolValBitOr,
  isAlgolValCompareVals,
  isAlgolValCompareSets,
} from "../../../../../types";

import { makeParser } from "../";

export default function parseVal(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  expr: AlgolValAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, ruleset, "value");

  if (typeof expr === "string") {
    return `"${expr}"`;
  }
  if (typeof expr === "number") {
    return expr;
  }
  if (Array.isArray(expr)) {
    switch (expr[0]) {
      case "dir":
        return "DIR";
      case "offsetdir":
        return "+DIR[1]"; // 'because offset is "d1f2r3", so dir is index 1, always just 1 char
      case "player":
        return player;
      case "otherplayer":
        return player === 1 ? 2 : 1;
      case "walklength":
        return "WALKLENGTH";
      case "floatlength":
        return "floatdist";
      case "stopreason":
        return "STOPREASON";
      case "totalcount":
        return "TOTALCOUNT";
      case "neighbourcount":
        return "NEIGHBOURCOUNT";
      case "max":
        return "MAX";
      case "step":
        return "STEP";
      case "loopid":
        return "LOOPID";
      case "turn":
        return "TURN";
      case "countsofar":
        return "CURRENTCOUNT";
      case "boardheight":
        return "dimensions.height";
      case "boardwidth":
        return "dimensions.width";
      default:
        throw new Error("Unknown value singleton: " + expr);
    }
  }
  if (isAlgolValMinus(expr)) {
    const { minus: operands } = expr;
    return `(${operands.map(parser.val).join(" - ")})`;
  }
  if (isAlgolValValue(expr)) {
    const { value: innerExpr } = expr;
    return parser.val(innerExpr);
  }
  if (isAlgolValProd(expr)) {
    const { prod: factors } = expr;
    return `(${factors.map(parser.val).join(" * ")})`;
  }
  if (isAlgolValTurnVar(expr)) {
    const { turnvar: name } = expr;
    return `TURNVARS[${parser.val(name)}]`;
  }
  if (isAlgolValBattleVar(expr)) {
    const { battlevar: name } = expr;
    return `BATTLEVARS[${parser.val(name)}]`;
  }
  if (isAlgolValSizeOf(expr)) {
    const { sizeof: set } = expr;
    return `Object.keys(${parser.set(set)}).length`;
  }
  if (isAlgolValRead(expr)) {
    const {
      read: [layer, pos, prop],
    } = expr;
    const parsedPos = parser.pos(pos) + "";
    const parsedProp = parser.val(prop) + "";
    const posLookup = parsedPos.match(/^["']/)
      ? `.${parsedPos.replace(/(^["']|["']$)/g, "")}`
      : `[${parsedPos}]`;
    const propLookup = parsedProp.match(/^["']/)
      ? `.${parsedProp.replace(/(^["']|["']$)/g, "")}`
      : `[${parsedProp}]`;
    return `(${parser.set(layer)}${posLookup}||{})${propLookup}`;
  }
  if (isAlgolValAddTo(expr)) {
    const {
      addto: [layer, pos, prop, val],
    } = expr;
    return `(${parser.val({ read: [layer, pos, prop] })} || 0) + ${parser.val(
      val
    )}`;
  }
  if (isAlgolValAddBitsTo(expr)) {
    const {
      addbitsto: [layer, pos, prop, val],
    } = expr;
    return `(${parser.val({ read: [layer, pos, prop] })} | ${parser.val(val)})`;
  }
  if (isAlgolValIdAt(expr)) {
    const { idat: pos } = expr;
    return parser.val({ read: ["units", pos, "id"] });
  }
  if (isAlgolValLoopRead(expr)) {
    const { loopread: prop } = expr;
    return parser.val({ read: [["loopset"], ["looppos"], prop] });
  }
  if (isAlgolValHarvest(expr)) {
    const {
      harvest: [set, prop],
    } = expr;
    return `Object.entries(${parser.set(
      set
    )}).reduce((mem, [pos,obj]) => mem + obj[${parser.val(prop)}], 0)`;
  }
  if (isAlgolValSum(expr)) {
    const { sum: terms } = expr;
    return `(${terms.map(t => parser.val(t)).join(" + ")})`;
  }
  if (isAlgolValPos(expr)) {
    const { pos: pos } = expr;
    return parser.pos(pos);
  }
  if (isAlgolValGridAt(expr)) {
    const {
      gridat: [gridname, pos],
    } = expr;
    return `GRIDS[${parser.val(gridname)}][${parser.pos(pos)}]`;
  }
  if (isAlgolValGridIn(expr)) {
    const {
      gridin: [gridname, set],
    } = expr;
    return `Object.keys(${parser.set(
      set
    )}).reduce((mem,pos) => mem + GRIDS[${parser.val(gridname)}][pos], 0)`;
  }
  if (isAlgolValRelDir(expr)) {
    const {
      reldir: [dir, rel],
    } = expr;
    return `relativeDirs[${parser.val(dir)}][${parser.val(rel)}]`;
  }
  if (isAlgolValPosX(expr)) {
    const { posx: pos } = expr;
    return `BOARD.board[${parser.pos(pos)}].x`;
  }
  if (isAlgolValPosY(expr)) {
    const { posy: pos } = expr;
    return `BOARD.board[${parser.pos(pos)}].y`;
  }
  if (isAlgolValHighest(expr)) {
    const { highest } = expr;
    const nums = highest.map(n => parser.val(n)).join(", ");
    return `Math.max.apply(null, [${nums}].filter(n => !isNaN(n)))`;
  }
  if (isAlgolValLowest(expr)) {
    const { lowest } = expr;
    const nums = lowest.map(n => parser.val(n)).join(", ");
    return `Math.min.apply(null, [${nums}].filter(n => !isNaN(n)))`;
  }
  if (isAlgolValBitAnd(expr)) {
    const { bitand } = expr;
    const bits = bitand.map(n => parser.val(n)).join(" & ");
    return `(${bits})`;
  }
  if (isAlgolValBitOr(expr)) {
    const { bitor } = expr;
    const bits = bitor.map(n => parser.val(n)).join(" | ");
    return `(${bits})`;
  }
  if (isAlgolValBitDiff(expr)) {
    const { bitdiff } = expr;
    const bits = bitdiff.map(n => parser.val(n)).join(" & ~");
    return `(${bits})`;
  }
  if (isAlgolValCompareVals(expr)) {
    const {
      compareVals: [first, second],
    } = expr;
    const one = parser.val(first);
    const two = parser.val(second);
    return `whoWins(${parser.val(first)},${parser.val(second)})`;
  }
  if (isAlgolValCompareSets(expr)) {
    const {
      compareSets: [first, second],
    } = expr;
    return parser.val({ compareVals: [{ sizeof: first }, { sizeof: second }] });
  }
  throw new Error("Unknown val expression: " + JSON.stringify(expr || ""));
}
