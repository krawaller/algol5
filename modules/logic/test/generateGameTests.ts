import * as fs from "fs-extra";
import * as path from "path";

const out = path.join(__dirname, "generatedGameTests");
const source = path.join(__dirname, "../generated");

async function setup() {
  console.log(" -------- Generating test files for games --------");
  await fs.remove(out);
  await fs.mkdir(out);
  const games = (await fs.readdir(source)).filter(g => g !== ".DS_Store");

  await Promise.all(
    games.map(async g => {
      const name = g.split("/")[
        // just a comment to avoid weird prettier linebreak that eslint doesnt like
        g.split("/").length - 1
      ].replace(/\.[tj]s$/, "");
      await fs.writeFile(
        path.join(out, name + ".test.ts"),
        `
import { runGameScript } from "../runGameScript";

import ${name}Game from "../../dist/indiv/${name}";
import ${name}Def from "../../../games/dist/games/${name}";

runGameScript("${name}", ${name}Game, ${name}Def.scripts);
`
      );
      console.log("Generating test file for", name);
    })
  );
  console.log(` ------- ${games.length} game test files set up! --------`);
}

setup();
