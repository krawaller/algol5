import {
  FullDefAnon,
  AlgolSetAnon,
  isAlgolSetSingle,
  isAlgolSetLayer,
  isAlgolSetUnion,
  isAlgolSetSubtract,
  isAlgolSetIntersect,
  isAlgolSetGroupAt,
  isAlgolSetSingles,
  isAlgolSetExceptPos,
} from "../../../../../types";
import {
  emptyArtifactLayers,
  terrainLayerNamesForBook,
  emptyUnitLayers,
} from "../../../../../common";

import { makeParser } from "../";

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

    if (emptyArtifactLayers(gameDef.generators)[name]) {
      return `ARTIFACTS.${name}`;
    }
    const terrainNames = terrainLayerNamesForBook(gameDef.boards);
    if (terrainNames.includes(name)) {
      return `TERRAIN${player}.${name}`;
    }
    if (emptyUnitLayers(gameDef)[name]) {
      return `UNITLAYERS.${name}`;
    }
    if (name === "board" || name === "light" || name === "dark") {
      return `BOARD.${name}`;
    }
    throw new Error(`Unknown layer reference: ${name}`);
  }

  if (Array.isArray(expr)) {
    switch (expr[0]) {
      case "empty":
        return "emptyObj";
      case "loopset":
        return "LOOPSET";
      default:
        throw new Error(`Unknown set singleton: ${JSON.stringify(expr)}`);
    }
  }

  if (isAlgolSetLayer(expr)) {
    const { layer: name } = expr;
    return parser.set(parser.val(name) as string);
  }

  if (isAlgolSetSingle(expr)) {
    const { single: pos } = expr;
    return `{[${parser.pos(pos)}]: 1}`;
  }

  if (isAlgolSetSingles(expr)) {
    const { singles: positions } = expr;
    return `{${positions.map(p => `[${parser.pos(p)}]: emptyObj`).join(", ")}}`;
  }

  if (isAlgolSetUnion(expr)) {
    const { union: sets } = expr;
    return `{${sets.map(s => `...${parser.set(s)}`).join(", ")}}`;
  }

  if (isAlgolSetSubtract(expr)) {
    const {
      subtract: [target, ...remove],
    } = expr;
    // array of all keys in target object
    const targetKeys = `Object.keys(${parser.set(target)})`;
    // func that returns true if given key isn't in any of the remove objs
    const keyTester = `k => ${remove
      .map(r => `!(${parser.set(r)}).hasOwnProperty(k)`)
      .join(" && ")}`;
    // arr of the keys we want to keep
    const validKeys = `${targetKeys}.filter(${keyTester})`;
    // turn valid keys back into a set object
    return `${validKeys}.reduce((m, k) => ({...m, [k]: emptyObj}), {})`;
  }

  if (isAlgolSetIntersect(expr)) {
    const {
      intersect: [first, ...rest],
    } = expr;
    // build an array of all keys, including duplicates
    const keysArr = `Object.keys(${parser.set(first)})${rest
      .map(r => `.concat(Object.keys(${parser.set(r)}))`)
      .join("")}`;
    // reduce keys to an object with count per key
    const countObj = `${keysArr}.reduce((mem, k) => ({...mem, [k]: (mem[k] || 0) + 1}), {})`;
    // func that returns true if value of entry equals number of total sets
    const entryTester = `([key,n]) => n === ${rest.length + 1}`;
    // transform keys to object entries and keep only those with sufficient count
    const validEntries = `Object.entries(${countObj}).filter(${entryTester})`;
    // Turn those valid entries into an object again!
    return `${validEntries}.reduce((mem, [key]) => ({...mem, [key]: emptyObj}), {})`;
  }

  if (isAlgolSetGroupAt(expr)) {
    const { groupat: pos } = expr;
    return `UNITLAYERS[${parser.val({ read: ["units", pos, "group"] })}]`;
  }

  if (isAlgolSetExceptPos(expr)) {
    const {
      exceptpos: [set, pos],
    } = expr;
    // array of all keys in target object
    const targetKeys = `Object.keys(${parser.set(set)})`;
    // single position we want to exclude
    const exceptPos = parser.pos(pos);
    // arr of the keys we want to keep
    const validKeys = `${targetKeys}.filter(k => k !== ${exceptPos})`;
    // turn valid keys back into a set object
    return `${validKeys}.reduce((m, k) => ({...m, [k]: emptyObj}), {})`;
  }

  throw new Error(`Unknown set definition: ${JSON.stringify(expr)}`);
}
