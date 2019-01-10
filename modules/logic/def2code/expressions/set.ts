import * as isArray from "lodash/isArray";
import * as tail from "lodash/tail";

import { FullDef } from "../types";
import { layerRef } from "../common";
import makeParser from "./";

export default function parseSet(
  gameDef: FullDef,
  player: 1 | 2,
  action: string,
  expression
) {
  const parse = makeParser(gameDef, player, action, "set");
  if (!isArray(expression)) {
    return layerRef(gameDef, player, action, expression);
  }
  const [type, ...details] = expression;
  switch (type) {
    case "layer": {
      const [layerName] = details;
      return layerRef(gameDef, player, action, layerName);
    }
    case "single": {
      const [pos] = details;
      return `
        (function(){
            let ret = {};
            ret[${parse.position(pos)}]=1;
            return ret;
        }())`;
    }
    case "union": {
      const sets = details;
      let ret = "",
        setdefs = sets
          .map((def, n) => "s" + n + " = " + parse.set(def))
          .join(", "),
        copies = sets
          .map((def, n) => "for(k in s" + n + "){ret[k]=1;}")
          .join(" ");
      return `
        (function(){
            let k, ret={}, ${setdefs};
            ${copies}
            return ret;
        }())`;
    }
    case "intersect": {
      const sets = details;
      let ret = "",
        setdefs = sets
          .map((def, n) => "s" + n + " = " + parse.set(def))
          .join(", "),
        test = tail(sets)
          .map((def, n) => "s" + (n + 1) + "[key]")
          .join(" && ");
      return `
        (function(){
          let ret={}, ${setdefs};
          for(let key in s0){
            if (${test}){
              ret[key]=s0[key];
            }
          }
          return ret;
        }())`;
    }
    case "subtract": {
      const sets = details;
      let ret = "",
        setdefs = sets
          .map((def, n) => "s" + n + " = " + parse.set(def))
          .join(", "),
        test = tail(sets)
          .map((def, n) => "!s" + (n + 1) + "[key]")
          .join(" && ");
      return `
        (function(){
          let ret={}, ${setdefs};
          for(let key in s0){
            if (${test}){
              ret[key]=s0[key];
            }
          }
          return ret;
        }())`;
    }
    default:
      console.log("Unknown set", expression);
      throw "UNKNOWN SET DEF! " + expression;
  }
}
