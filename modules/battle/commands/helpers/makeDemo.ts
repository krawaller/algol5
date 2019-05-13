import { makeGameAPI } from "../../src";
import gameDefs from "../../../games/dist/lib";
import { GameId } from "../../../games/dist/list";
import games from "../../../logic/dist";
import { AlgolScriptLine, AlgolAnimCompiled } from "../../../types";
import * as jdp from "jsondiffpatch";
import * as fs from "fs-extra";
import * as path from "path";

const out = path.join(__dirname, "../../dist/demos");

export async function makeDemo(gameId: GameId) {
  const gameDef = gameDefs[gameId];
  const scripts = gameDef.scripts;
  const script: AlgolScriptLine<string, string>[] =
    scripts.demo || scripts[Object.keys(scripts)[0]];

  const commands = script.reduce((mem, line) => mem.concat(line.commands), []);

  const API = makeGameAPI(games[gameId]);
  const { initialUI, performAction } = API.newBattle();
  let ui = initialUI;
  let patches = [];
  const anims = {};
  while (commands.length) {
    const action = commands.shift();
    const newUI = performAction(action === "win" ? "endTurn" : action);
    if (gameDef.flow.commands[action]) {
      patches.push(jdp.diff(ui.board.units, newUI.board.units));
      const newAnim = newUI.board.anim || {
          enterFrom: {},
          exitTo: {},
          ghosts: []
        },
        anim: Partial<AlgolAnimCompiled> = {};
      if (newAnim.ghosts.length) {
        anim.ghosts = newAnim.ghosts;
      }
      if (Object.keys(newAnim.enterFrom).length) {
        anim.enterFrom = newAnim.enterFrom;
      }
      if (Object.keys(newAnim.exitTo).length) {
        anim.exitTo = newAnim.exitTo;
      }
      if (Object.keys(anim).length) {
        anims[patches.length - 1] = anim;
      }
    }
    ui = newUI;
  }
  await fs.ensureDir(out);

  const fixedInitialUnits = Object.keys(initialUI.board.units).reduce(
    (mem, id) => ({
      ...mem,
      [id]: Object.keys(initialUI.board.units[id])
        .filter(key => !["x", "y"].includes(key))
        .reduce(
          (m, key) => ({ ...m, [key]: initialUI.board.units[id][key] }),
          {}
        )
    }),
    {}
  );

  const fileContent = `import { AlgolDemo } from "../../../types";
export const ${gameId}Demo: AlgolDemo = {
  initial: ${JSON.stringify(fixedInitialUnits)},
  patches: ${JSON.stringify(patches)},
  anims: ${JSON.stringify(anims)}
};
export default ${gameId}Demo;
`;
  await fs.writeFile(path.join(out, `${gameId}.ts`), fileContent);
  console.log("Demo written for", gameId);
}
