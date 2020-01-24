import * as fs from "fs-extra";
import * as path from "path";
import prettier, { Options } from "prettier";
import { FullDefAnon } from "../../../types";
import analyze from "./analyze";

import * as prettierOpts from "../../../../prettier.config";

import { defPath } from "./_paths";
import { emptyFullDef } from "../../../common";

function makeNice(obj = {}) {
  return prettier
    .format("let x = " + JSON.stringify(obj), {
      ...(prettierOpts as Options),
      parser: "typescript",
    })
    .slice(8, -2);
}

export default async function overwrite(gameId: string, def: FullDefAnon) {
  await Promise.all(
    Object.keys(emptyFullDef).map(async aspect => {
      const apath = path.join(defPath, `${gameId}/${aspect}.ts`);
      const f = await fs.readFile(apath);
      const newFile = f
        .toString()
        .replace(
          / = {[\s\S]*};/,
          ` = ${makeNice(def[aspect as keyof FullDefAnon])};`
        );
      const code = prettier.format(newFile, { filepath: "foo.ts" });
      return await fs.writeFile(apath, code);
    })
  );
  console.log("Overwrote definitions for", gameId);
  return analyze(def);
}
