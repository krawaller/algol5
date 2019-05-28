import * as fs from "fs-extra";
import * as path from "path";
import * as prettier from "prettier";
import { FullDefAnon } from "algol-types";
import analyze from "./analyze";

import { defPath } from "./_paths";
import { emptyFullDef } from "algol-common";

function makeNice(obj = {}) {
  return prettier
    .format("let x = " + JSON.stringify(obj), { parser: "typescript" })
    .slice(8, -2);
}

export default async function overwrite(gameId, def: FullDefAnon) {
  await Promise.all(
    Object.keys(emptyFullDef).map(async aspect => {
      const apath = path.join(defPath, `${gameId}/${aspect}.ts`);
      const f = await fs.readFile(apath);
      const newFile = f
        .toString()
        .replace(/ = {[\s\S]*};/, ` = ${makeNice(def[aspect])};`);
      return await fs.writeFile(apath, newFile);
    })
  );
  console.log("Overwrote definitions for", gameId);
  return analyze(def);
}
