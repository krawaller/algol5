import { compileGameToCode } from "../../def2code/";

import * as fs from "fs-extra";
import * as path from "path";

import lib from "../../../games/dist/lib";

const out = path.join(__dirname, "../../generated");

export default async function compile(gameId) {
  const rules = lib[gameId];
  try {
    const code = compileGameToCode(rules);

    await fs.ensureDir(out);
    await fs.writeFile(path.join(out, gameId + ".ts"), code);
    console.log(`Compiled ${gameId}`);
  } catch (e) {
    console.log("Error while compiling", gameId);
    throw e;
  }
}
