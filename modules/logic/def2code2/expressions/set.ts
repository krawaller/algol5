import {
  FullDefAnon,
  AlgolSetAnon,
  isAlgolSetSingle,
  isAlgolSetLayer
} from "../../../types";
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
    const name = expr.replace(/^"|"$/g, ""); // since might be value processed

    if (artifactLayers(gameDef.generators)[name]) {
      return `ARTIFACTS.${name}`;
    }
    if (terrainLayers(gameDef.board, 1)[name]) {
      return `TERRAIN.${name}`;
    }
    if (name === "board" || name === "light" || name === "dark") {
      return `BOARD.${name}`;
    }
    throw new Error(`Unknown layer reference: ${name}`);
  }

  if (isAlgolSetLayer(expr)) {
    const { layer: name } = expr;
    return parser.set(parser.val(name) as string);
  }

  if (isAlgolSetSingle(expr)) {
    const { single: pos } = expr;
    return `{[${parser.pos(pos)}]: 1}`;
  }
}
