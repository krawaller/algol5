import * as fs from "fs-extra";
import * as path from "path";
import { findSuites } from "./findSuites";

const out = path.join(__dirname, "generatedGameTests");
const source = path.join(__dirname, "../generated");

async function setup() {
  console.log(" -------- Generating test files for games --------");
  await fs.remove(out);
  await fs.mkdir(out);
  const games = (await fs.readdir(source)).filter(g => g !== ".DS_Store");

  await Promise.all(
    games.map(async g => {
      const name = g.split("/")[g.split("/").length - 1].replace(/\.ts$/, "");
      await fs.writeFile(
        path.join(out, name + ".test.ts"),
        `
import { runGameScript } from "../runGameScript";
import { runGameRandomly } from "../runGameRandomly";

import ${name}Game from "../../generated/${name}";
import ${name}Def from "../../../games/dist/games/${name}";

runGameScript("${name}", ${name}Game, ${name}Def.scripts);
runGameRandomly("${name}", ${name}Game);
`
      );
      console.log("Generating test file for", name);
    })
  );
  console.log(` ------- ${games.length} game test files set up! --------`);
}

setup();
