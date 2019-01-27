import {
  FullDefAnon,
  AlgolPosAnon,
  isAlgolPosMark,
  isAlgolPosOnlyIn
} from "../../../types";

import makeParser from "./";

export default function parsePos(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  expr: AlgolPosAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, "pos");

  if (typeof expr === "string") {
    return `MARKS.${expr}`;
  }
  if (Array.isArray(expr)) {
    switch (expr[0]) {
      case "start":
        return "STARTPOS";
      case "target":
        return "POS";
      default:
        return undefined;
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
}
