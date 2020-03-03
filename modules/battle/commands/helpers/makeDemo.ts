import { makeStatefulGameAPI } from "../../src";
import gameDefs from "../../../games/dist/lib";
import { GameId } from "../../../games/dist/list";
import games from "../../../logic/dist";
import { AlgolScriptLine } from "../../../types";
import * as fs from "fs-extra";
import * as path from "path";

import { makeDemo as demoMaker } from "../../../common";

const out = path.join(__dirname, "../../dist/demos");

export async function makeDemo(gameId: GameId) {
  const gameDef = gameDefs[gameId];
  const scripts = gameDef.scripts;
  const script: AlgolScriptLine<string, string>[] =
    scripts.demo || scripts[Object.keys(scripts)[0]];
  const API = makeStatefulGameAPI(
    games[gameId],
    gameDef.setups,
    gameDef.boards
  );
  const { anims, initial, patches } = demoMaker(API, script);

  await fs.ensureDir(out);

  const fileContent = `import { AlgolDemo } from "../../../types";
  export const ${gameId}Demo: AlgolDemo = {
    initial: ${JSON.stringify(initial)},
    patches: ${JSON.stringify(patches)},
    anims: ${JSON.stringify(anims)}
  };
  export default ${gameId}Demo;
  `;
  await fs.writeFile(path.join(out, `${gameId}.ts`), fileContent);
  console.log("Demo written for", gameId);
}
