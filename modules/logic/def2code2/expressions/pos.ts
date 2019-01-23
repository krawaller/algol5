import { FullDefAnon, AlgolPosAnon, AlgolPosMarkAnon } from "../../../types";

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
      default:
        return undefined;
    }
  }
  if ((expr as AlgolPosMarkAnon).mark) {
    const { mark: name } = expr as AlgolPosMarkAnon;
    return `MARKS[${parser.val(name)}]`;
  }
}
