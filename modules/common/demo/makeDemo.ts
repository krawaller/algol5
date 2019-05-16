import {
  AlgolGameAPI,
  AlgolScriptLine,
  AlgolDemo,
  AlgolAnimCompiled
} from "../../types";
import * as jdp from "jsondiffpatch";

const identifyMark = /^[a-z][0-9]+$/;

export function makeDemo(
  API: AlgolGameAPI,
  script: AlgolScriptLine<string, string>[]
): AlgolDemo {
  const actions = script.reduce(
    (mem, line) => mem.concat(line.commands),
    [] as string[]
  );
  const { initialUI, performAction } = API.newBattle();
  let ui = initialUI;
  let patches: AlgolDemo["patches"] = [];
  const anims = {};
  while (actions.length) {
    const action = (actions.shift() as unknown) as string;
    const newUI =
      action === "win" || action === "endturn"
        ? performAction("endTurn")
        : identifyMark.test(action)
        ? performAction("mark", action)
        : performAction("command", action);

    const diff = jdp.diff(
      ui.board.units,
      newUI.board.units
    ) as AlgolDemo["patches"];
    if (diff) {
      patches.push(diff);
      const newAnim: AlgolAnimCompiled = newUI.board.anim || {
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
