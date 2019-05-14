import {
  AlgolGameAPI,
  AlgolScriptLine,
  AlgolDemo,
  AlgolAnimCompiled
} from "../../types";
import * as jdp from "jsondiffpatch";

export function makeDemo(
  API: AlgolGameAPI,
  script: AlgolScriptLine<string, string>[]
): AlgolDemo {
  const commands = script.reduce((mem, line) => mem.concat(line.commands), []);

  const { initialUI, performAction } = API.newBattle();
  let ui = initialUI;
  let patches = [];
  const anims = {};
  while (commands.length) {
    const action = commands.shift();
    const newUI = performAction(action === "win" ? "endTurn" : action);
    if (action !== "endTurn" && action !== "win" && action.length > 2) {
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
        anims[patches.length] = anim;
      }
    }
    ui = newUI;
  }

  const initial = Object.keys(initialUI.board.units).reduce(
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

  return { initial, patches, anims };
}
