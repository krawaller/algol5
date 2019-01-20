import compileGameToCode from "../../def2code/";

import * as fs from "fs-extra";
import * as path from "path";

import * as prettier from "prettier";

import lib from "../../../games/dist/lib";

const out = path.join(__dirname + "../../generated");

export default async function compile(gameId) {
  const rules = lib[gameId];
  const rawCode = compileGameToCode(rules);
  const niceCode = prettier.format(rawCode, {
    parser: "typescript"
  });
  await fs.writeFile(path.join(out, gameId + ".ts"), niceCode);
  console.log(`Compiled ${gameId}`);
}
