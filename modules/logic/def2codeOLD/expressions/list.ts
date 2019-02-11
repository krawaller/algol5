import * as isArray from "lodash/isArray";

import { FullDefAnon } from "../types";
import makeParser from "./";

export default function parseList(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  expression
) {
  const parse = makeParser(gameDef, player, action);
  if (!isArray(expression)) {
    console.log(typeof expression, expression);
    throw "List that wasn't array! " + expression;
  }
  const items = expression[0] === "list" ? expression[1] : expression;
  return `[${items.map(v => parse.value(v)).join(",")}]`;
}
