import { AlgolBattleSave } from "../../../../types";
import { pathReplacements } from "../helpers";

export const parsePath = (
  str: string,
  method: number
): AlgolBattleSave["path"] => {
  if (method === 0) {
    let ret = str;
    // add back commas
    ret = ret.replace(/([0-9])([^0-9,])/g, "$1,$2");
    ret = ret.replace(/([^0-9,])([0-9])/g, "$1,$2");
    ret = ret.replace(/([^0-9,])([^0-9,])/g, "$1,$2");
    ret = ret.replace(/([^0-9,])([^0-9,])/g, "$1,$2");
    // replace letter with pattern
    const repl = Object.entries(pathReplacements[method]);
    for (const [char, pattern] of repl) {
      ret = ret.replace(new RegExp(char, "g"), pattern.toString());
    }
    // add brackets and arrayify! :)
    return JSON.parse(`[${ret}]`);
  }
  throw new Error("Unknown parse method");
};
