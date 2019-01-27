import { FullDefAnon, AlgolSetAnon, isAlgolSetSingle } from "../../../types";

import makeParser from "./";

export default function parseSet(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  expr: AlgolSetAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, "set");

  if (isAlgolSetSingle(expr)) {
    const { single: pos } = expr;
    return `{[${parser.pos(pos)}]: 1}`;
  }
}
