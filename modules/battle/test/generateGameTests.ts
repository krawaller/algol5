import * as fs from "fs-extra";
import * as path from "path";

import games from "../../logic/dist";

const out = path.join(__dirname, "generatedTests");

async function setup() {
  console.log(" -------- Generating test files for games --------");
  await fs.remove(out);
  await fs.mkdir(out);

  await Promise.all(
    Object.keys(games).map(async name => {
      await fs.writeFile(
        path.join(out, name + ".test.ts"),
        `
import { runGameScripts, runGameScriptsStatic } from "../runGameScripts";
import ${name}Def from "../../../games/dist/games/${name}";
import {statefulAPI, staticAPI} from "../../dist/apis/${name}";

runGameScripts("${name}", statefulAPI, ${name}Def.scripts);
runGameScriptsStatic("${name}", staticAPI, ${name}Def.scripts);
`
      );
      console.log("Generating test file for", name);
    })
  );
  console.log(
    ` ------- ${Object.keys(games).length} game test files set up! --------`
  );
}

setup();
