import { FullDefAnon, AlgolSetAnon, isAlgolSetSingle } from "../../../types";
import { artifactLayers, terrainLayers } from "../../../common";

import makeParser from "./";

export default function parseSet(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  expr: AlgolSetAnon,
  from?: string
) {
  const parser = makeParser(gameDef, player, action, "set");

  if (typeof expr === "string") {
    if (artifactLayers(gameDef.generators)[expr]) {
      return `ARTIFACTS.${expr}`;
    }
    if (terrainLayers(gameDef.board, 1)[expr]) {
      return `TERRAIN.${expr}`;
    }
    if (expr === "board" || expr === "light" || expr === "dark") {
      return `BOARD.${expr}`;
    }
  }

  if (isAlgolSetSingle(expr)) {
    const { single: pos } = expr;
    return `{[${parser.pos(pos)}]: 1}`;
  }
}
