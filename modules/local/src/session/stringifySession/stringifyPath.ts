import { AlgolBattleSave } from "../../../../types";
import { pathReplacements } from "../helpers/pathReplacements";

export const stringifyPath = (
  path: AlgolBattleSave["path"],
  method: number
) => {
  if (method === 0) {
    const repl = Object.entries(pathReplacements[method]);
    let str = `,${path.toString()},`;
    // replace patterns with letter
    for (const [char, pattern] of repl) {
      const regex = new RegExp(`,${pattern.toString()},`, "g");
      str = str.replace(regex, `,${char},`);
      str = str.replace(regex, `,${char},`);
    }
    // kill pointless commas
    str = str.replace(/([^0-9,]),([0-9])/g, "$1$2");
    str = str.replace(/([0-9]),([^0-9,])/g, "$1$2");
    str = str.replace(/([^0-9,]),([^0-9,])/g, "$1$2");
    str = str.replace(/([^0-9,]),([^0-9,])/g, "$1$2");
    // kill bogus start and end commas
    str = str.slice(1, -1);

    return str;
  }
  throw new Error("Unknown stringification method");
};
