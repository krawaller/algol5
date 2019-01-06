import * as fs from "fs-extra";
import * as path from "path";
import * as beautify from "js-beautify";
import { FullDef } from "../types";
import analyze from "./analyze";

function makeNice(obj = {}) {
  return beautify(JSON.stringify(obj).replace(/"([a-zA-Z]+)":/g, "$1:"), {
    indent_size: 2
  });
}

export default async function update(gameId, def: FullDef) {
  await Promise.all(
    Object.keys(def).map(async aspect => {
      const apath = path.join(
        __dirname,
        `./definitions/${gameId}/${aspect}.ts`
      );
      const f = await fs.readFile(apath);
      const newFile = f
        .toString()
        .replace(/ = {[\s\S]*};/, ` = ${makeNice(def[aspect])};`);
      return await fs.writeFile(apath, newFile);
    })
  );
  console.log("Updated files for", gameId);
  return analyze(def);
}
