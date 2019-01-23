import { FullDefAnon, AlgolSetAnon, AlgolSetSingleAnon } from "../../../types";

import makeParser from "./";

export default function parseSet(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  expr: AlgolSetAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, "set");

  if ((expr as AlgolSetSingleAnon).single) {
    const { single: pos } = expr as AlgolSetSingleAnon;
    return `{[${parser.pos(pos)}]: 1}`;
  }
}
