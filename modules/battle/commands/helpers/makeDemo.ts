import { makeStatefulGameAPI, makeStaticGameAPI } from "../../src";
import gameDefs from "../../../games/dist/lib";
import { GameId } from "../../../games/dist/list";
import games from "../../../logic/dist";
import { AlgolScriptLine, AlgolGameBlobAnon, AlgolDemo } from "../../../types";
import * as fs from "fs-extra";
import * as path from "path";

import { makeDemoFromScript } from "../../../common";
import { parseSeed } from "../../../encoding/src/seed/seed.parse";
import { makeDemoFromBattle } from "../../../common/demo/makeDemoFromBattle";

const out = path.join(__dirname, "../../dist/demos");

export async function makeDemo(gameId: GameId) {
  const gameDef = gameDefs[gameId];
  const game = games[gameId];
  let demo: AlgolDemo;
  if (gameDef.meta.demo) {
    const API = makeStaticGameAPI(game);
    const save = parseSeed(gameDef.meta.demo, gameId);
    const battle = API.fromSave(save);
    demo = makeDemoFromBattle(battle);
  } else {
    const scripts = gameDef.scripts;
    const script: AlgolScriptLine<AlgolGameBlobAnon>[] = scripts[0].lines;
    const API = makeStatefulGameAPI(game);
    demo = makeDemoFromScript(API, script);
  }

  const { anims, initial, patches, endHighlight } = demo;

  await fs.ensureDir(out);

  const fileContent = `import { AlgolDemo } from "../../../types";
export const ${gameId}Demo: AlgolDemo = {
  initial: ${JSON.stringify(initial)},
  patches: ${JSON.stringify(patches)},
  anims: ${JSON.stringify(anims)}${
    endHighlight ? `,\n  endHighlight: ${JSON.stringify(endHighlight)}` : ""
  }
};
export default ${gameId}Demo;
  `;
  await fs.writeFile(path.join(out, `${gameId}.ts`), fileContent);
  console.log("Demo written for", gameId);
}
